/**
 * Builds a real, keyword-matched seafood photo URL (via LoremFlickr's tagged
 * Flickr photo pool) instead of a generic/unrelated placeholder image.
 * `lock` pins a specific photo so the same product/category is stable across
 * reloads instead of showing a different random match every time.
 */
export function seafoodImage(keywords: string, lock: number, size = 1000): string {
  return `https://loremflickr.com/${size}/${size}/${encodeURIComponent(keywords)}?lock=${lock}`;
}
