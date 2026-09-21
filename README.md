# myLLM 網站

[www.myllm.tw](https://www.myllm.tw) 的原始檔，用 GitHub Pages 發布。

## 目錄結構

| 路徑 | 說明 |
| --- | --- |
| `index.html` | 網站入口，轉向 `/news/` |
| `news/index.html` | 網站主體：左側是選單，右側用 iframe 載入內容，預設載入 `news/www/introduction.html` |
| `news/www/` | 各項介紹頁（服務、技術、會員）與頁面用圖 |
| `news/NEWSHome.html` | 電子報首頁，iframe 載入最新一期 |
| `news/NewsHome(20240123).html`、`news/NewsHome(20240728).html` | 舊版電子報首頁，留作存檔 |
| `news/newsletter/` | 電子報 `newsletter-1.html` 到 `newsletter-19.html`，對應的 PDF 放在 `news/newsletter/files/` |
| `news/post/quiz.html` | AI 小測驗 |
| `CNAME` | 自訂網域設定，內容是 `www.myllm.tw` |

## 本機預覽

```bash
python3 -m http.server 8000
```

開 <http://localhost:8000/>，路徑行為和線上一致。這個指令只讀檔案，不會改動任何內容。

## 連結寫法

站內連結不要寫死網域。指向站內其他位置時，用以 `/` 開頭的絕對路徑，例如 `/news/newsletter/files/xxx.pdf`；換網域時才不用全站取代一遍。
