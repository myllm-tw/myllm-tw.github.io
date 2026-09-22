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
 * Edge Landing 的七項服務。內容整理自 news/www/ 的服務說明圖：
 *   Service01 + Service01-01 → RAG plus
 *   Service02 → 智慧身份識別與安全控管
 *   Service03 → 自動化演講摘要
 *   Service04 → RISC-V 知識小助手
 *   Service05 → 特殊資料型態智慧語言模型
 *   Service06 → 客製化邊緣裝置部署
 * 「AIoT 歷史配方經驗擷取」只出現在設計稿選單，沒有對應的說明圖。
 */
export type EdgeService = {
  id: string;
  icon: string;
  title: string;
  /** 舊站選單上的名稱，與說明圖標題不同時保留，方便對照 */
  menuTitle?: string;
  summary: string;
  body: string[];
  uses: { label: string; items: string[] };
  device?: { name: string; vendor: string; tier: string; image: string };
  visuals: { src: string; alt: string; caption: string }[];
  /** 內容的可信度註記，讓維護者知道哪些段落不是原稿文字 */
  note?: string;
};

export const edgeLanding: EdgeService[] = [
  {
    id: 'rag-plus',
    icon: 'lucide:file-search',
    title: '強化檢索生成（RAG plus）',
    summary: '在高階個人電腦上，用自然語言查詢就能在短時間內翻遍海量公司文件。',
    body: [
      '進階強化式檢索生成結合大型語言模型，可以處理技術文本、機台說明書這類大量的內部文件。',
      '一般的 RAG 框架搜尋精準度不高、文件雜訊多。RAG plus 引入四個優化模組修正這些問題，讓企業在巨量的私有資料中檢索到正確資訊。',
    ],
    uses: {
      label: '應用情境',
      items: ['智慧企業文本管理中心', '網站偵蒐與摘要', 'FAQ 智慧助手', '會議演講即時統整摘要'],
    },
    device: { name: 'Mac Studio', vendor: 'Apple', tier: '高配', image: '/images/services/rag-device.jpg' },
    visuals: [
      {
        src: '/images/services/rag-ui.jpg',
        alt: 'myLLM ChatRAG plus 的操作介面，左側是參數設定，中間顯示檢索流程，右側是找到的 PDF 文件',
        caption: 'myLLM ChatRAG plus。一次查詢依序經過搜尋、重新排序、過濾、壓縮與檢索五個步驟。',
      },
      {
        src: '/images/services/rag-plus-arch.jpg',
        alt: 'Reranker 的交叉編碼架構圖，查詢與文件的詞元經過多層全連接後輸出相關度分數',
        caption: 'Reranker 讓查詢與文件逐詞交互比對，給出更精準的相關度排序。',
      },
    ],
  },
  {
    id: 'identity',
    icon: 'lucide:shield-check',
    title: '智慧身份識別與安全控管',
    summary: '把影像與語音辨識放進樹莓派，做出不依賴雲端的即時身份驗證與安全監控。',
    body: [
      '結合影像及語音辨識技術至大型語言模型，並在資源受限的邊緣裝置上實現。',
      '使用者可以透過語音指令直接控制機械，並即時取得回饋，強化安全管理與控管能力。適用於工業安全、車用安全、個人化居家控制等場域。',
    ],
    uses: {
      label: '應用情境',
      items: ['互動式問答隨身助理', '語音辨識與合成', '即時影像身份識別', 'LLM 機械控制驅動'],
    },
    device: { name: 'Raspberry Pi 5 / 4', vendor: 'Raspberry Pi', tier: '低配', image: '/images/services/identity-demo.jpg' },
    visuals: [],
  },
  {
    id: 'speech',
    icon: 'lucide:mic',
    title: '自動化演講摘要',
    summary: '把講座、會議與影片的語音即時轉成文字，再整理成摘要。',
    body: [
      '以語音辨識取得逐字內容，交給大型語言模型統整重點，並可辨識多位講者的聲源方向。',
    ],
    uses: {
      label: '應用情境',
      items: ['即時講座摘要', '多人會議統整', '語音筆記', '影片內容總結'],
    },
    device: { name: 'Jetson Xavier', vendor: 'NVIDIA', tier: '中配', image: '/images/services/speech-device.jpg' },
    visuals: [
      {
        src: '/images/services/speech-ui.jpg',
        alt: 'intelliGo 語音辨識介面，上方是音訊波形，左下是聲源方向的極座標圖，右側是辨識結果',
        caption: 'intelliGo。同時提供語音轉文字、文字轉語音，並標示聲音來源的方向。',
      },
    ],
    note: '原說明圖的描述段落誤植了 RAG plus 的文字，此處依應用情境與介面截圖改寫，需請聯盟確認。',
  },
  {
    id: 'riscv',
    icon: 'lucide:code-xml',
    title: 'RISC-V 知識小助手',
    menuTitle: '編程知識小助手',
    summary: '以 LLAMA2-7B 為基礎、專攻 RISC-V 領域的知識助手，還能直接畫出流程圖。',
    body: [
      '這款工具具備 RISC-V 領域的專業知識，並透過硬體 AI 加速器有效降低運算成本。',
      '除了文字回答，還能生成 Mermaid 與 Wavedrom 等格式的流程圖，提供更完整的技術支援。',
    ],
    uses: {
      label: '支援的資料型態',
      items: ['Markdown', 'Mermaid', 'Wavedrom', 'Graphviz'],
    },
    device: { name: 'N3000', vendor: 'Neuchips', tier: '中配', image: '/images/services/riscv-device.jpg' },
    visuals: [
      {
        src: '/images/services/riscv-ui.jpg',
        alt: 'ASK RISC-V 介面，使用者詢問 CPU、快取與記憶體的讀取握手流程，右側產生對應的 Mermaid 時序圖',
        caption: 'ASK RISC-V。問題回答完，右側直接產出可編輯的 Mermaid 時序圖。',
      },
    ],
  },
  {
    id: 'multimodal',
    icon: 'lucide:table-2',
    title: '特殊資料型態智慧語言模型',
    menuTitle: '智慧表格語言模型',
    summary: '讓語言模型讀得懂 PDF、表格與流程圖，而不只是純文字。',
    body: [
      '聊天型開源語言模型只能接受文字輸入，遇到 PDF、表格（csv、xlsx）或本體論圖這類資料時，常常無法判讀或結果不精準。',
      '聯盟開發了一套特化的資料處理架構，搭配經過微調的語言模型。使用者上傳自己的資料，模型就能根據這些資料與使用者對話。',
    ],
    uses: {
      label: '支援的資料型態',
      items: ['PDF 資料', '圖片中的文字', '表格資料', '流程圖（Flowchart）', '本體論圖（Ontology graph）'],
    },
    visuals: [
      {
        src: '/images/services/multimodal-diagram.jpg',
        alt: '示意圖：中央的語言模型晶片連接圖片、表格、流程圖、本體論圖與電腦，使用者上傳 PDF 檔案',
        caption: '各種資料型態先經過特化處理，再交給微調後的語言模型。',
      },
    ],
  },
  {
    id: 'edge-deploy',
    icon: 'lucide:cpu',
    title: '客製化邊緣裝置部署',
    summary: '在能力不同的邊緣裝置上，找出最適合的語言模型。',
    body: [
      '聯盟針對各種大型語言模型，在邊緣裝置上評估可行性、效能與模型能力，找出最適合在邊緣運算環境中執行的組合。',
    ],
    uses: {
      label: '應用情境',
      items: ['智慧企業文本管理中心', '網站偵蒐與摘要', 'FAQ 智慧客服', '演講統整智慧助手', '智慧鏈與智慧代理人'],
    },
    device: { name: 'Jetson Orin', vendor: 'NVIDIA', tier: '中配', image: '/images/services/edge-device.jpg' },
    visuals: [
      {
        src: '/images/services/edge-agent.jpg',
        alt: 'LLM Agent 架構圖，包含任務指令、規劃提示、思考、記憶、工具、動作解析、動作與觀察環境',
        caption: 'LLM Agent 架構。模型規劃、呼叫工具、觀察結果，並把經驗寫入長短期記憶。',
      },
    ],
  },
  {
    id: 'aiot',
    icon: 'lucide:flask-conical',
    title: 'AIoT 歷史配方經驗擷取',
    summary: '從歷史生產資料中，萃取配方與製程參數的經驗知識。',
    body: ['把累積在設備與生產紀錄裡的經驗，整理成語言模型可以查詢與推理的知識。'],
    uses: { label: '應用情境', items: ['製程參數建議', '配方經驗傳承'] },
    visuals: [],
    note: '這一項只出現在設計稿的選單，沒有對應的說明圖。目前的描述與應用情境為暫擬，需請聯盟提供正式內容。',
  },
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
