"use client";
// The searcher's city, swapped into the page headline.
//
// The ad already says their city via {LOCATION(City)}. The page agreeing with it is message
// match, which is the highest-lift change on a landing page - 212% in the documented case, and
// 66% from the headline alone. (Jono, 2 September 2026.)
//
// Google's {loc_physical_ms} ValueTrack puts a NUMERIC geo id in the URL, never a name, and there
// is no API that converts one at request time. `code/build_geo_map.py` pulls the map once and
// ships it with the site; this reads it.
//
// The final URL in the ad must carry it:  https://you.com/lp/plumber?loc={loc_physical_ms}
import { useEffect, useState } from "react";
import geoMap from "@/lib/geo-map.json";

const MAP = geoMap as Record<string, string>;

/** The clicked-from city, or null when it cannot be resolved - which is often, so always fall back. */
export function useCity(): string | null {
  const [city, setCity] = useState<string | null>(null);
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("loc");
      if (id && MAP[id]) setCity(MAP[id]);
    } catch {
      /* a page that cannot read its own query string still has to render */
    }
  }, []);
  return city;
}

/**
 * Renders the city when it resolves, the fallback when it does not.
 *
 *   <h1>Emergency Plumber in <City fallback="Toronto" /></h1>
 *
 * The fallback is not optional and it is not "your area" - it serves for everyone Google cannot
 * place, which is a large share of traffic. Write a real place you actually cover.
 */
export function City({ fallback }: { fallback: string }) {
  const city = useCity();
  return <>{city || fallback}</>;
}
