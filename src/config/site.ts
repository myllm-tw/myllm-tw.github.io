/**
 * 站台的單一資料來源。頁面、導覽列、頁尾、meta 標籤都從這裡取值，
 * 不要在各頁重複寫站名、聯絡方式或網址。
 * 網域本身定義在 astro.config.mjs 的 site，用 Astro.site 取用。
 */
export const site = {
  name: 'myLLM 產學聯盟',
  shortName: 'myLLM.tw',
  tagline: '大型語言模型產學聯盟',
  description:
    '國立陽明交通大學人工智慧系統檢測中心主辦的大型語言模型產學聯盟，提供 LLM 企業賦能、Edge Landing 落地服務、模型評測與 AI 電子報。',
  org: '國立陽明交通大學 人工智慧系統檢測中心',
  orgShort: 'NYCU 人工智慧系統檢測中心',
  funding: '國科會補助計畫',
  /** 分享預覽圖，相對站台根目錄；Base.astro 會補上絕對網域 */
  ogImage: '/news/myLLMBanner.png',
  copyright: 'Copyright © 2022-2024 NeuroScope, NTCU, All Rights Reserved',
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** 外部或舊站連結，導覽列會標示並在新分頁開啟 */
  external?: boolean;
};

export const nav: NavItem[] = [
  { label: '關於聯盟', href: '/about/' },
  { label: '核心服務', href: '/services/' },
  { label: '電子報', href: '/newsletter/' },
  { label: '成為會員', href: '/membership/' },
  { label: '聯絡我們', href: '/contact/' },
];

/**
 * 聯絡資訊。舊站（含 news/www/ 各頁與 19 期電子報）完全沒有記載窗口、電話、
 * 地址或信箱，所以這裡保持空字串，等實際資料補上。
 *
 * /contact/ 頁面只會顯示有值的欄位；全部為空時建置會印出警告，避免這一頁
 * 帶著空白內容上線。請勿填入未經確認的資料。
 */
export const contact = {
  /** 窗口姓名與職稱，例如「王小明 專案經理」 */
  person: '',
  phone: '',
  email: '',
  address: '',
  /** Google 地圖嵌入網址，留空則不顯示地圖 */
  mapEmbed: '',
} as const;

export const hasContactInfo = Object.values(contact).some((v) => v !== '');

/** 會員費用與權益也還沒有可引用的來源，補上後 /membership/ 會自動顯示 */
export const membership = {
  /** 例如「年費 3 萬元」；留空則不顯示費用區塊 */
  fee: '',
  /** 會員權利，留空陣列則不顯示 */
  benefits: [] as string[],
  /** 入會資格說明 */
  eligibility: '',
  /** 申請表，舊站既有的檔案 */
  applicationForm: '/news/MemberApply1130417_v2.pdf',
} as const;

/**
 * 相關連結。網址取自舊站既有的外部連結，並已逐一確認仍可開啟（2026-09-22 實測皆為 200）。
 */
export const relatedLinks: { label: string; note: string; href: string }[] = [
  {
    label: '國家科學及技術委員會',
    note: '本聯盟的補助單位',
    href: 'https://www.nstc.gov.tw/',
  },
  {
    label: '國立陽明交通大學',
    note: '主辦學校',
    href: 'https://www.nycu.edu.tw/',
  },
  {
    label: '人工智慧系統檢測中心',
    note: '聯盟的主辦單位頁面',
    href: 'https://www.nycu.edu.tw/nycu/ch/app/artwebsite/view?module=artwebsite&id=463&serno=48e29b4a-9d7e-40fb-a7b1-dc4b44f380b4',
  },
  {
    label: 'NeuralScope',
    note: '相關研究平台',
    href: 'https://neuralscope.org/mobile/',
  },
];
