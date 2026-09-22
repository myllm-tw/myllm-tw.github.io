/**
 * 從舊站的 news/www/MemberAgreement.html 抽出使用條款，輸出 src/data/terms.json。
 *
 * 舊頁是一份純文字條款，分成十二章、每章數條，部分條款有 a) b) c) 子項。
 * 這支腳本把它轉成結構化資料，讓新站能正確排版、可被搜尋，也能跟著深淺模式變色。
 *
 * 條款內容本身不做任何改寫，只做結構切分。
 *
 * 用法：node scripts/extract-terms.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'public/news/www/MemberAgreement.html';
const OUT = 'src/data/terms.json';

const raw = readFileSync(SRC, 'utf8');

const text = raw
  .replace(/<(script|style|head)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/<br\s*\/?>|<\/p>|<\/div>|<\/li>|<\/h\d>|<\/tr>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"');

const lines = text
  .split('\n')
  .map((l) => l.replace(/\s+/g, ' ').trim())
  .filter((l) => l.length > 1);

const CHAPTER = /^([一二三四五六七八九十]+)、(.+)$/;
const NUMBERED = /^(\d+)\.(.+)$/;
const SUB = /^([a-z])\)(.+)$/;

const sections = [];
let title = '';

for (const line of lines) {
  const chapter = line.match(CHAPTER);
  if (chapter) {
    sections.push({ heading: line.replace(/[:：]$/, ''), items: [] });
    continue;
  }
  if (!sections.length) {
    // 章節開始之前的那一行是整份文件的標題
    if (!title) title = line;
    continue;
  }
  const section = sections[sections.length - 1];
  const sub = line.match(SUB);
  if (sub && section.items.length) {
    const last = section.items[section.items.length - 1];
    last.sub = [...(last.sub ?? []), line];
    continue;
  }
  const numbered = line.match(NUMBERED);
  section.items.push({ text: numbered ? line : line, numbered: Boolean(numbered) });
}

writeFileSync(OUT, `${JSON.stringify({ title, sections }, null, 2)}\n`);

const items = sections.reduce((n, s) => n + s.items.length, 0);
const subs = sections.reduce((n, s) => n + s.items.reduce((m, i) => m + (i.sub?.length ?? 0), 0), 0);
console.log(`寫入 ${OUT}`);
console.log(`  標題：${title}`);
console.log(`  ${sections.length} 章、${items} 條、${subs} 個子項`);
for (const s of sections) console.log(`    ${s.heading}（${s.items.length} 條）`);
