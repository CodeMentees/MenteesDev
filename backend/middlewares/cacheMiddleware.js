/**
 * Cache-Control middleware for public GET responses.
 * Adds stale-while-revalidate headers so browsers/CDNs cache the response
 * and the page feels instant on repeat visits.
 *
 * @param {number} maxAge      - seconds the response is "fresh" (default 60)
 * @param {number} staleWhile  - seconds to serve stale while refetching (default 300)
 */
export const cachePublic = (maxAge = 60, staleWhile = 300) => (req, res, next) => {
  if (req.method === "GET") {
    res.set(
      "Cache-Control",
      `public, max-age=${maxAge}, stale-while-revalidate=${staleWhile}`
    );
  }
  next();
};

/**
 * No-cache for private or mutation responses.
 */
export const noCache = (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  next();
};
