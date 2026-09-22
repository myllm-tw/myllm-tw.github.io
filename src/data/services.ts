/**
 * 三大核心服務與 Edge Landing 服務項目。
 * 文字整理自舊站 news/www/Member01Introduction.html，首頁與 /services 共用這份資料。
 */
export type Service = {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  detail: string[];
};

export const services: Service[] = [
  {
    id: 'ecosystem',
    title: 'LLM 生態圈交流',
    titleEn: 'Ecosystem',
    summary: '成為 AI 知識使用者與供應者之間的橋樑。',
    detail: [
      '舉辦 LLM 普適化的教育課程、展會、專業研討會，以及圍繞產業應用與智慧製造等重要議題的技術交流會。',
      '為學術界、產業界與 AI 愛好者提供學習和交流的平台，推動 AI 技術的創新與應用。',
    ],
  },
  {
    id: 'benchmark',
    title: 'LLM 平台落地測試、評估與優化',
    titleEn: 'Benchmarking',
    summary: '以獨立第三方角色，提供 AI 系統的效能評估與基準測試。',
    detail: [
      '協助國內外產業執行 AI 系統效能評價、Benchmarking，並配對組合最適的 Edge Landing 平台。',
      '客戶能準確辨識系統的優勢與待改進處，據以優化技術方案、提升整體效能表現。',
    ],
  },
  {
    id: 'platform',
    title: '分析式與生成式 AI 平台設計',
    titleEn: 'Platform Design',
    summary: '針對特定主題設計分析式與生成式 AI 平台。',
    detail: [
      '涵蓋模型微調（fine-tune）、嵌入式組件（embedded）、檢索增強生成（RAG Plus）、智慧代理人（agent）與動態工作流程（chain）。',
      '提升業務自動化水準，在客戶服務、內容創作、資料分析等領域發揮 LLM 的潛力。',
    ],
  },
];

/** Edge Landing 的六項服務，對應舊站左側選單 */
export const edgeLanding: { title: string; description: string }[] = [
  { title: 'RAG plus', description: '檢索增強生成，讓模型能引用企業自有知識回答。' },
  { title: '身份識別與安全控管', description: '在地端完成識別與權限控管，資料不外流。' },
  { title: '自動化演講摘要', description: '將演講與會議內容自動整理成逐字稿與摘要。' },
  { title: '編程知識小助手', description: '以企業內部程式碼與文件為基礎的開發輔助。' },
  { title: '智慧表格語言模型', description: '理解表格結構，處理報表與結構化資料查詢。' },
  { title: '客製化邊緣裝置佈署', description: '依現場條件配置可在邊緣裝置執行的模型。' },
];
