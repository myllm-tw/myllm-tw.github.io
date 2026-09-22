/// <reference types="@cloudflare/workers-types" />

/**
 * 只補靜態資產服務缺的那一塊：目錄索引。
 *
 * wrangler.jsonc 把 html_handling 設為 "none"，是為了讓 /news/NEWSHome.html 這類
 * 已經寄在電子報裡的舊網址原樣回應，不被 307 導到無副檔名的版本。代價是 Cloudflare
 * 不再自動解析目錄索引，/ 與 /news/ 會找不到檔案，這支 Worker 補的就是這件事。
 *
 * Cloudflare 在請求命中靜態檔案時不會執行 Worker，所以 PDF、圖片與所有 .html
 * 仍由靜態資產直接服務，只有目錄形式的網址才會進到這裡。
 */

interface Env {
  ASSETS: Fetcher;
}

/** 路徑的最後一段有沒有副檔名，用來區分「檔案」與「目錄」 */
function looksLikeFile(pathname: string): boolean {
  return pathname.split('/').pop()?.includes('.') ?? false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // /、/news/ 這類目錄網址，補上 index.html
    if (url.pathname.endsWith('/')) {
      const index = await env.ASSETS.fetch(new Request(new URL(`${url.pathname}index.html`, url), request));
      if (index.status !== 404) return index;
    }

    // /about 這種少了尾斜線的網址，導到 /about/，避免手打網址時 404
    if (!url.pathname.endsWith('/') && !looksLikeFile(url.pathname)) {
      const index = await env.ASSETS.fetch(new URL(`${url.pathname}/index.html`, url));
      if (index.status !== 404) {
        return Response.redirect(new URL(`${url.pathname}/${url.search}`, url).toString(), 301);
      }
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // html_handling 為 none 時 not_found_handling 不會接手，404 頁在這裡回
    const notFound = await env.ASSETS.fetch(new URL('/404.html', url));
    return new Response(notFound.body, { status: 404, headers: notFound.headers });
  },
} satisfies ExportedHandler<Env>;
