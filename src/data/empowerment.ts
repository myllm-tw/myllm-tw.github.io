/**
 * 「基於 LLM 的企業賦能」這組論述取自設計稿 news/www/homepage03.jpg，
 * 是聯盟自己用來解釋服務價值的比喻，比抽象的效益描述具體得多。
 */
export const empowerment = {
  headline: '超人難尋，鋼鐵人可以量產',
  contrast: [
    { subject: '超人', body: '本身能力就強，這樣的員工難尋。' },
    { subject: '鋼鐵人', body: '普通人加上超級工具，這才是企業賦能員工。' },
  ],
  note: '未來屬於會使用 AI 工具的人。',
  /** 企業賦能員工要具備的能力 */
  abilities: ['研讀、綜整', '著述', '分析', '職務與職能的專業知識與經驗傳承', '決策與行動'],
} as const;
