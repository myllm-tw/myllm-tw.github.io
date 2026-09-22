/**
 * 三大核心服務與 Edge Landing 服務項目。
 * 文字整理自舊站 news/www/Member01Introduction.html，首頁與 /services 共用這份資料。
 */
export type Service = {
  id: string;
  /** lucide 圖示名稱，供 astro-icon 使用 */
  icon: string;
  title: string;
  titleEn: string;
  summary: string;
  detail: string[];
};

export const services: Service[] = [
  {
    id: 'ecosystem',
    icon: 'lucide:users-round',
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
    icon: 'lucide:gauge',
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
    icon: 'lucide:layers',
    title: '分析式與生成式 AI 平台設計',
    titleEn: 'Platform Design',
    summary: '針對特定主題設計分析式與生成式 AI 平台。',
    detail: [
      '涵蓋模型微調（fine-tune）、嵌入式組件（embedded）、檢索增強生成（RAG Plus）、智慧代理人（agent）與動態工作流程（chain）。',
      '提升業務自動化水準，在客戶服務、內容創作、資料分析等領域發揮 LLM 的潛力。',
    ],
  },
];

/**
 * Edge Landing 的服務項目，名稱與順序依設計稿 news/www/myllm-web-theme.png 的側邊選單。
 * 舊站左側選單漏了「AIoT 歷史配方經驗擷取」，此處補回。
 */
export const edgeLanding: { icon: string; title: string; description: string }[] = [
  { icon: 'lucide:file-search', title: '強化檢索生成（RAG plus）', description: '讓模型引用企業自有的文件與知識回答，答案有出處。' },
  { icon: 'lucide:shield-check', title: '智慧身份識別與安全控管', description: '在地端完成識別與權限控管，資料不外流。' },
  { icon: 'lucide:mic', title: '自動化演講摘要', description: '把演講與會議內容整理成逐字稿與摘要。' },
  { icon: 'lucide:code-xml', title: '編程知識小助手', description: '以企業內部程式碼與文件為基礎的開發輔助。' },
  { icon: 'lucide:table-2', title: '智慧表格語言模型', description: '理解表格結構，處理報表與結構化資料查詢。' },
  { icon: 'lucide:cpu', title: '客製化邊緣裝置佈署', description: '依現場條件配置可在邊緣裝置執行的模型。' },
  { icon: 'lucide:flask-conical', title: 'AIoT 歷史配方經驗擷取', description: '從歷史生產資料中萃取配方與參數的經驗知識。' },
];

/**
 * 評測用的嵌入式裝置。照片與分級取自設計稿裡的實機陳列，
 * 這是聯盟能做第三方效能評比的實體依據。
 */
export const devices: { name: string; vendor: string; tier: string }[] = [
  { name: 'Raspberry Pi 4', vendor: 'Raspberry Pi', tier: '低配' },
  { name: 'Raspberry Pi 5', vendor: 'Raspberry Pi', tier: '低配' },
  { name: 'Jetson Xavier', vendor: 'NVIDIA', tier: '中配' },
  { name: 'N3000', vendor: 'Neuchips', tier: '中配' },
  { name: 'Jetson Orin', vendor: 'NVIDIA', tier: '中配' },
  { name: 'Mac Studio', vendor: 'Apple', tier: '高配' },
];
