/**
 * 邊緣裝置上的 LLM 實測數據，讀自設計稿 news/www/Service06Introduction.jpg 的兩張圖表。
 * 測試機型為 Jetson Orin。空值代表原圖沒有該組合的數據：
 * 34B 與 72B 的高精度版本放不進裝置記憶體，因此只測了量化版本。
 */
export const bits = ['4 bits', '8 bits', '16 bits'] as const;

export type BenchRow = {
  model: string;
  /** 每秒生成的 token 數，依 bits 的順序 */
  tokPerSec: (number | null)[];
  /** MMLU 準確率（%），依 bits 的順序 */
  mmlu: (number | null)[];
  /** 原圖標籤被遮住、只能讀出近似值的欄位 */
  approx?: { mmlu?: number[] };
};

export const benchmark: BenchRow[] = [
  { model: '2B', tokPerSec: [62.51, 42.7, 24.03], mmlu: [39.11, 39.94, 39.53] },
  { model: '7B', tokPerSec: [33.6, 21.27, 10.37], mmlu: [58.93, 59.13, 59.13] },
  { model: '13B', tokPerSec: [19.05, 11.35, 5.35], mmlu: [54.8, 57.54, 57.89] },
  // 34B 的 4 bits 準確率標籤被原圖圖例遮住，只能讀到 70.1，故標為近似值
  { model: '34B', tokPerSec: [8.6, 4.48, null], mmlu: [70.1, 69.82, null], approx: { mmlu: [0] } },
  { model: '72B', tokPerSec: [3.31, null, null], mmlu: [75.44, null, null] },
];

export const benchmarkDevice = 'Jetson Orin';
