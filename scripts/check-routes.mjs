/**
 * 對一個實際在跑的站台檢查路由行為，可用於本機 wrangler dev、預覽部署或正式站。
 *
 * 為什麼需要這支腳本：Cloudflare 的靜態資產會因為請求帶不帶 `Sec-Fetch-Mode: navigate`
 * 而走不同路徑。曾經發生過 curl 測全部 200、但瀏覽器開起來每頁都 404 的情況
 * （not_found_handling 設成 404-page 時，導覽請求在資產層就被判定 404，Worker 不會被呼叫）。
 * 因此每條路徑都要用兩種請求各測一次。
 *
 * 用法：node scripts/check-routes.mjs http://127.0.0.1:8787
 *      node scripts/check-routes.mjs https://www.myllm.tw
 */
const base = process.argv[2];
if (!base) {
  console.error('用法：node scripts/check-routes.mjs <baseUrl>');
  process.exit(2);
}

/** 新站頁面與必須原樣保留的舊網址，都應該回 200 */
const expect200 = [
  '/',
  '/about/',
  '/services/',
  '/newsletter/',
  '/newsletter/1/',
  '/newsletter/19/',
  '/membership/',
  '/membership/terms/',
  '/contact/',
  // 舊網址：已經寄在電子報裡，不能壞也不該被重導向
  '/news/',
  '/news/NEWSHome.html',
  '/news/post/quiz.html',
  '/news/www/introduction.html',
  '/news/newsletter/newsletter-1.html',
  '/news/newsletter/newsletter-19.html',
  '/news/newsletter/images/newsNo11/1.png',
  '/news/myLLMBanner.png',
  '/news/MemberApply1130417_v2.pdf',
  '/news/newsletter/files/AI巨頭之爭模型性能評估與較量.pdf',
];

const expect404 = ['/this-page-does-not-exist/', '/news/nope.html'];

const NAVIGATE = {
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Dest': 'document',
  Accept: 'text/html,application/xhtml+xml',
};

async function probe(path, headers) {
  const res = await fetch(new URL(encodeURI(path), base), { headers, redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location') ?? '' };
}

let failed = 0;

async function check(path, want) {
  const plain = await probe(path, {});
  const nav = await probe(path, NAVIGATE);
  const ok = plain.status === want && nav.status === want;
  // 舊網址不該被重導向，否則已寄出的連結會換掉網址
  const redirected = path.endsWith('.html') && (plain.location || nav.location);
  if (!ok || redirected) {
    failed += 1;
    const detail = redirected ? `重導向到 ${plain.location || nav.location}` : `一般 ${plain.status} / 導覽 ${nav.status}`;
    console.log(`  FAIL  ${path}  （預期 ${want}，實際 ${detail}）`);
  } else {
    console.log(`  ok    ${path}  ${plain.status}`);
  }
}

console.log(`檢查 ${base}\n`);
for (const p of expect200) await check(p, 200);
console.log('');
for (const p of expect404) await check(p, 404);

console.log(`\n${failed === 0 ? '全部通過' : `${failed} 條路徑不符預期`}`);
process.exitCode = failed === 0 ? 0 : 1;
