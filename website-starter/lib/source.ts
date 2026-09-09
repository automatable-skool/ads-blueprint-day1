// Where did this visitor come from? Captured once on landing, carried on
// every form post and every phone tap, so the lead arrives in GoHighLevel
// with its gclid and keyword attached. That is what makes Enhanced
// Conversions and offline imports possible later.
export const SOURCE_KEY = "lead_source";

const URL_KEYS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "keyword", "campaign", "adgroup", "matchtype", "device", "network", "creative",
] as const;

export type LeadSource = Partial<Record<(typeof URL_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  landed_at?: string;
};

export function readSource(): LeadSource {
  try {
    const raw = window.sessionStorage.getItem(SOURCE_KEY);
    return raw ? (JSON.parse(raw) as LeadSource) : {};
  } catch {
    return {};
  }
}

// Merge, never clobber: a later page view without a gclid must not erase the
// gclid from the click that brought them in.
export function captureSource(): LeadSource {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: LeadSource = {};
  for (const key of URL_KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v;
  }
  const existing = readSource();
  const merged: LeadSource = {
    ...existing,
    ...fromUrl,
    landing_page: existing.landing_page ?? window.location.pathname,
    referrer: existing.referrer ?? document.referrer,
    landed_at: existing.landed_at ?? new Date().toISOString(),
  };
  try {
    window.sessionStorage.setItem(SOURCE_KEY, JSON.stringify(merged));
  } catch {
    // Private mode or storage blocked: the form still submits, just without history.
  }
  return merged;
}
