/**
 * 全站的互動行為。每一項都是漸進增強：
 * 伺服器輸出的 HTML 已是最終狀態，沒有這支腳本時頁面內容完整、只是沒有動作。
 * 使用者設定「減少動態效果」時，數字直接顯示最終值、清單不跟隨游標。
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Live Ticker：[data-ticker] 元素進入畫面時，數字從 0 滾動到 data-to。
 * HTML 裡原本就寫著最終值，這裡只在動畫期間改寫文字。
 */
function runTicker(el: HTMLElement) {
  const raw = el.dataset.to ?? el.textContent ?? '0';
  const to = Number.parseFloat(raw);
  if (!Number.isFinite(to)) return;
  const decimals = (raw.split('.')[1] ?? '').length;
  const duration = 1400;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = (to * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const tickers = document.querySelectorAll<HTMLElement>('[data-ticker]');
if (!reduceMotion && tickers.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        runTicker(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.5 },
  );
  tickers.forEach((el) => io.observe(el));
}

/**
 * Sticky Storytelling：[data-story] 容器裡的 [data-step] 捲到畫面中央時，
 * 把它的序號寫到容器的 data-active，由 CSS 決定固定側顯示哪一格。
 */
document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
  const steps = story.querySelectorAll<HTMLElement>('[data-step]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) story.dataset.active = (entry.target as HTMLElement).dataset.step;
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((s) => io.observe(s));
});

/**
 * Hover Reveal List：滑到 [data-reveal-row] 時，浮動圖片換成該列的 data-img 並跟著游標。
 * 只在有滑鼠的裝置啟用；觸控裝置與減少動態效果時不作用。
 */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
document.querySelectorAll<HTMLElement>('[data-reveal-list]').forEach((list) => {
  const float = list.querySelector<HTMLImageElement>('[data-reveal-img]');
  if (!float || !canHover || reduceMotion) return;

  let x = 0;
  let y = 0;
  let raf = 0;
  const place = () => {
    float.style.transform = `translate3d(${x + 28}px, ${y - 90}px, 0)`;
    raf = 0;
  };

  list.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
    },
    { passive: true },
  );

  list.querySelectorAll<HTMLElement>('[data-reveal-row]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      const src = row.dataset.img;
      if (!src) {
        float.classList.remove('is-on');
        return;
      }
      if (float.getAttribute('src') !== src) float.src = src;
      float.alt = row.dataset.alt ?? '';
      float.classList.add('is-on');
    });
  });
  list.addEventListener('pointerleave', () => float.classList.remove('is-on'));
});
