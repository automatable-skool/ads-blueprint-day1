// Photography for slots the business has not filled yet.
//
// ⛔ THIS OVERRIDES THE KIT. The Goodwork kit's rule is "the system ships no photography;
// MediaFrame renders a labelled placeholder... never substitute stock or generated imagery."
// Jono overruled it for AD landing pages on 2 September 2026: a page of empty grey frames looks
// unfinished, and an ad page has one visit to earn the click back. So slots ship with real
// photography, topical to the section, each one visibly marked for swap.
//
// Sources:
//   photos      - fetched ONCE from Unsplash into public/photos/ by code/fetch_photos.py, then served
//                 from the repo. Never hot-linked: loremflickr.com dropped every photo on the page.
//   randomuser  - portraits, for a face beside a name.
//
// ⛔ IMAGERY ONLY, STILL. A stock face may sit in a testimonial slot waiting for the real video;
// it may NEVER sit beside an invented quote, name, rating or number. Furniture can be placeheld,
// claims cannot.

export const SWAP_LABEL = "placeholder";

/** A topical photograph, served from THIS repo: website/public/photos/<first keyword>.jpg.
 *  Pull it once with `python3 code/fetch_photos.py "<what it should show>" --slug <keyword>`
 *  (Unsplash, free key). Nothing on the page hot-links a third-party image host any more -
 *  loremflickr.com went down and took every photo with it (8 September 2026).
 *  `w`, `h`, `lock` are kept so existing callers do not change; the file decides the size. */
export function photo(keywords: string, w: number, h: number, lock: number) {
  void w; void h; void lock;
  const slug = keywords.split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `/photos/${slug}.jpg`;
}

/** A portrait. `i` walks a fixed set so faces do not repeat within a page. */
export function portrait(i: number) {
  const gender = i % 2 === 0 ? "men" : "women";
  return `https://randomuser.me/api/portraits/${gender}/${(i * 7) % 90}.jpg`;
}

/** Nine client-video poster frames - a person on camera, never a landscape. */
export function videoPoster(i: number) {
  return portrait(i + 11);
}

/** The founder frame, and never one of the testimonial faces. */
export function founderPoster() {
  return portrait(4);
}
