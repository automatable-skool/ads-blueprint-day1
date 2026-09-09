// The homepage IS the chosen style's template - pixel for pixel.
//
// Jono's ruling (1 September 2026, re-confirmed 3 September): the design
// template IS the site. Nothing here gets redesigned, simplified, or rebuilt
// "from config". `site.style` picks which template renders, and /api-setup
// swaps the demo words inside app/<style>/page.tsx for the real business -
// words, links and photos only, never the layout.
//
// The red NOT READY banner on top is the only thing this file adds. It reads
// lib/site.config.ts and stays up until the config holds real values, so a
// half-personalized site cannot quietly ship to Google's reviewer.

import BoldHome from "./bold/page";
import CalmHome from "./calm/page";
import { site } from "@/lib/site.config";
import { NotReadyBanner } from "@/components/site/Chrome";

export default function Page() {
  return (
    <>
      <NotReadyBanner />
      {site.style === "calm" ? <CalmHome /> : <BoldHome />}
    </>
  );
}
