"use client";
// The Google tag, plus Google's website-call-conversion phone snippet.
//
// Everything downstream assumed this existed. It did not: ConversionTag on
// /thank-you checks `window.gtag` and returned early on every load, so the form
// conversion has never fired, and no forwarding number has ever been served.
// Found and fixed 1 September 2026 while building /lp/seo-audit.
//
// Order matters and is the order below:
//   1. gtag.js for NEXT_PUBLIC_GADS_ID. The Conversion Linker is built into
//      gtag.js and is on by default, so the gclid is stamped into a first-party
//      cookie without a separate tag.
//   2. Google's wcm loader, AFTER the tag. For visitors who arrived on an ad it
//      swaps the displayed number and the tel: href for a Google forwarding
//      number, which is what makes a call countable against a keyword.
//
// The swap only works if the number is plain text, in ONE format everywhere,
// with the display text and the tel: href matching. `data-wcm-number` marks
// every place the number is written so both get rewritten together.
import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL;

export function GoogleTag({ phone }: { phone: string }) {
  if (!ADS_ID) return null;
  // Google's documented phone snippet: a second config call carrying the
  // website-call action's label plus phone_conversion_number. gtag pulls in
  // call-tracking_9.js itself and rewrites every occurrence of the number -
  // display text and tel: href both - for visitors who arrived from an ad.
  // (The old wcm/loader.js + _googWcmGet path never defined the function when
  // loaded bare from gtag-era pages - found live, 1 September 2026.)
  const phoneConfig = CALL_LABEL
    ? `gtag('config', '${ADS_ID}/${CALL_LABEL}', { phone_conversion_number: '${phone}' });`
    : "";
  return (
    <>
      <Script id="gtag-src" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ADS_ID}');
        ${phoneConfig}
      `}</Script>
    </>
  );
}
