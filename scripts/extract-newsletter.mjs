/**
 * 從舊站的電子報 HTML 抽出結構化資料，輸出 src/data/newsletter.json。
 *
 * 舊站的 19 期電子報是 email 排版工具產生的 HTML，內容被包在大量行內樣式裡。
 * 這支腳本把每期的文章標題與對應 PDF 抽出來，讓新站的電子報頁能列出實際內容，
 * 而不只是 19 個檔案連結。期號與年月則從 NEWSHome.html 的選單取得。
 *
 * 舊 HTML 不會再變動，所以這支腳本只需要在遷移時跑一次；保留它是為了讓這份
 * 資料的來源可以被追溯與重新產生。
 *
 * 用法：node scripts/extract-newsletter.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const NEWS_DIR = 'public/news';

/**
 * 舊站 HTML 漏連的文章，依 PDF 封面標記的期數補回。
 *
 * 第 4 期：HTML 內文提到了「邊緣運算與人工智慧如何創新融合」這篇，卻沒有放連結。
 * 該 PDF 封面標記為 JANUARY, 2024 NO4.，與第 4 期其他 PDF 一致，因此補進第 4 期。
 *
 * 不補的情況（留此註記避免日後又被當成遺漏）：files/ 裡另有三份「如何讓照片開口說話」
 * 檔名帶空格的版本，封面標記為 MAR, 2024 / NO.10，已被第 11 期連結的 NO.11 版本取代
 * （內容改寫過，頁數與檔案大小都不同），屬於舊稿，不應重複出現在網站上。
 */
/**
 * 舊站少數連結直接拿檔名當顯示文字，抽出來會是「…核心.pdf」這種標題。
 * 這裡用該 PDF 內頁的正式標題取代，key 是抽取到的原始文字。
 */
const TITLE_FIXES = {
  '人工智慧硬體平台打造高效AI訓練與推理的核心.pdf':
    '人工智慧硬體平台：打造高效 AI 訓練與推理的核心',
};

const SUPPLEMENTS = {
  4: [
    {
      title: '邊緣運算與人工智慧的創新融合：推動企業結構與運作方式的變革',
      pdf: '/news/newsletter/files/邊緣運算與人工智慧的創新融合推動企業結構與運作方式的變革.pdf',
    },
  ],
};
const OUT = 'src/data/newsletter.json';

/** 去掉標籤、還原實體、收斂空白 */
function plain(fragment) {
  return fragment
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, ' ')
    .trim();
}

/** 從 NEWSHome.html 的選單取得每期的年月，例如 { 19: '2024.09' } */
function readIssueDates() {
  const html = readFileSync(`${NEWS_DIR}/NEWSHome.html`, 'utf8');
  const dates = {};
  const re = /href="[^"]*newsletter-(\d+)\.html"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const m of html.matchAll(re)) {
    const no = Number(m[1]);
    const label = plain(m[2]);
    const date = label.match(/(\d{4})\.(\d{2})/);
    if (date && !dates[no]) dates[no] = `${date[1]}.${date[2]}`;
  }
  return dates;
}

/** 從單一期的 HTML 抽出文章清單 */
function readArticles(no) {
  const file = `${NEWS_DIR}/newsletter/newsletter-${no}.html`;
  if (!existsSync(file)) return [];
  const html = readFileSync(file, 'utf8');
  // 1~16 期寫成相對路徑 files/x.pdf，17~19 期是絕對路徑 /news/newsletter/files/x.pdf，
  // 兩種都收，並統一正規化成絕對路徑。
  const re = /<a[^>]*href="((?:\/news\/newsletter\/)?files\/[^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi;
  const byHref = new Map();
  for (const m of html.matchAll(re)) {
    const href = m[1].startsWith('/') ? m[1] : `/news/newsletter/${m[1]}`;
    const title = plain(m[2]);
    // 同一個 PDF 會出現兩次（圖片連結與文字連結），只取有文字的那次
    if (title.length > 4 && !byHref.has(href)) byHref.set(href, TITLE_FIXES[title] ?? title);
  }
  const found = [...byHref].map(([href, title]) => ({ title, pdf: href }));
  const extra = (SUPPLEMENTS[no] ?? []).filter((s) => !byHref.has(s.pdf));
  return [...found, ...extra];
}

const dates = readIssueDates();
const issues = Object.keys(dates)
  .map(Number)
  .sort((a, b) => b - a)
  .map((no) => ({ no, date: dates[no], articles: readArticles(no) }));

writeFileSync(OUT, `${JSON.stringify(issues, null, 2)}\n`);

const withArticles = issues.filter((i) => i.articles.length > 0).length;
const total = issues.reduce((n, i) => n + i.articles.length, 0);
console.log(`寫入 ${OUT}`);
console.log(`  ${issues.length} 期，其中 ${withArticles} 期抽到文章，共 ${total} 篇`);
for (const i of issues) {
  console.log(`  第 ${String(i.no).padStart(2)} 期  ${i.date}  ${i.articles.length} 篇`);
}
