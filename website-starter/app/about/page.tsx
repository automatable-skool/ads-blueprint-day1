// The About page IS the chosen style's template about page - pixel for pixel.
// /api-setup swaps the demo words inside app/<style>/about/page.tsx for the
// real business (story, owner, founding year, credentials, address - Google's
// reviewer checks the address is visible text). Never redesign the layout.

import BoldAbout from "../bold/about/page";
import CalmAbout from "../calm/about/page";
import { site } from "@/lib/site.config";
import { NotReadyBanner } from "@/components/site/Chrome";

export const metadata = { title: "About" };

export default function Page() {
  return (
    <>
      <NotReadyBanner />
      {site.style === "calm" ? <CalmAbout /> : <BoldAbout />}
    </>
  );
}
