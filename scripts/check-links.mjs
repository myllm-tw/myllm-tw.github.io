/**
 * 檢查建置產物 dist/ 裡的站內連結是否都有對應檔案。
 *
 * 這個站有兩套並存的網址：新站的頁面（/about/ 這種帶尾斜線的目錄形式）與舊站
 * 原封不動保留的檔案（/news/**，包含 145 個 PDF）。兩者都必須能開，所以每次
 * 改版都應該跑這支腳本，而不是靠人工點。
 *
 * 用法：npm run build && node scripts/check-links.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const DIST = 'dist';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/**
 * 把連結解析成 dist 裡的實體檔案。
 * 絕對路徑（/news/x.pdf）相對於 dist 根目錄；相對路徑（files/x.pdf）相對於
 * 引用它的那個檔案所在的目錄 —— 舊站的電子報大量使用相對路徑，不能略過。
 */
function resolve(ref, fromFile) {
  const pathname = decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if (!pathname) return 'skip';
  const baseDir = ref.startsWith('/') ? DIST : dirname(fromFile);
  const target = ref.startsWith('/') ? join(DIST, pathname) : join(baseDir, pathname);
  const candidates = pathname.endsWith('/')
    ? [join(target, 'index.html')]
    : [target, join(target, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const broken = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    // 外部連結、協定相對網址、錨點與 data: 不在檢查範圍
    if (/^(https?:)?\/\//.test(ref) || /^(mailto:|tel:|data:|javascript:|#)/.test(ref)) continue;
    if (!ref || ref === '/') continue;
    checked += 1;
    if (!resolve(ref, file)) {
      broken.push({ from: file.replace(`${DIST}/`, ''), to: ref });
    }
  }
}

console.log(`檢查 ${htmlFiles.length} 個 HTML、${checked} 個站內連結`);
if (broken.length === 0) {
  console.log('沒有失效連結');
} else {
  console.log(`失效連結 ${broken.length} 個：`);
  const shown = new Set();
  for (const b of broken) {
    const key = b.to;
    if (shown.has(key)) continue;
    shown.add(key);
    console.log(`  ${b.to}\n      來自 ${b.from}`);
  }
  process.exitCode = 1;
}
