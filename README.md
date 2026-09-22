# myLLM 產學聯盟網站

[www.myllm.tw](https://www.myllm.tw) 的原始碼。以 Astro 產生靜態網站，部署在 Cloudflare Workers。

## 本機開發

需要 Node.js 22.12 以上。

```bash
npm install
npm run dev
```

開 <http://localhost:4321/>。改動檔案會自動重新載入。

## 改內容要改哪裡

大部分文字不在頁面裡，而在資料檔。改資料檔，所有用到它的頁面會一起更新。

| 要改的內容 | 檔案 |
| --- | --- |
| 站名、導覽列、聯絡窗口、會員費用與權益、相關連結 | `src/config/site.ts` |
| 三大服務、Edge Landing 七項服務、評測裝置 | `src/data/services.ts` |
| 邊緣裝置實測數據 | `src/data/benchmark.ts` |
| 「超人 vs. 鋼鐵人」論述 | `src/data/empowerment.ts` |
| 電子報各期文章 | `src/data/newsletter.json`，由 `scripts/extract-newsletter.mjs` 產生 |
| 使用條款 | `src/data/terms.json`，由 `scripts/extract-terms.mjs` 產生 |

聯絡窗口與會員費用目前留空。欄位空著時，建置會印出警告，頁面也不會顯示該區塊。

## 部署

```bash
npm run verify   # 建置並檢查所有站內連結
npm run deploy   # 建置並部署到 Cloudflare Workers
```

部署需要環境變數 `CLOUDFLARE_API_TOKEN`，權限要能編輯 Workers。部署後可以對正式站檢查路由：

```bash
npm run check:routes -- https://www.myllm.tw
```

它會用一般請求與瀏覽器導覽請求各測一次，並確認舊網址沒有被重導向。

## 舊網址

19 期電子報已經寄出，信裡連到的網址不能改變。舊站的檔案原封不動放在 `public/news/`，網址維持 `/news/…`，包含 145 個 PDF。

為了讓 `/news/NEWSHome.html` 這類網址不被重導向，`wrangler.jsonc` 把 `html_handling` 設為 `none`，目錄形式的網址改由 `src/worker.ts` 處理。細節寫在兩個檔案的註解裡。

## 目錄

| 路徑 | 內容 |
| --- | --- |
| `src/pages/` | 各頁面 |
| `src/components/`、`src/layouts/` | 共用元件與版型 |
| `src/styles/` | 樣式，依色彩、元件、動效、呈現手法分檔 |
| `src/scripts/interactions.ts` | 數字跑動、捲動敘事、懸停顯圖等互動 |
| `src/worker.ts` | 補上目錄網址的解析與 404 頁 |
| `public/images/` | 新站用的圖片 |
| `public/news/` | 舊站檔案 |
| `scripts/` | 內容抽取與連結、路由檢查 |
| `docs/design-research.md` | 版面設計的依據與參考網站 |
