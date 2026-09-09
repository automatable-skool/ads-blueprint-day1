import type { Metadata } from "next";
import { site } from "@/lib/site.config";

// NEVER let this page be indexed. If it shows up in search results,
// people land here without converting and your conversion count becomes fiction.
export const metadata: Metadata = {
  title: "Thank you",
  description: "We've got your request.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYou() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Got it - thanks.</h1>

      {/* THE most important line on this page. A specific time beats "soon" every time. */}
      <p className="mt-4 text-lg">
        We'll call you back <strong>within 30 minutes</strong> during business hours.
      </p>

      <p className="mt-6 text-gray-600">Don't want to wait?</p>
      <a
        href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
        className="mt-2 inline-block rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white"
      >
        Call {site.phone}
      </a>

      {/*
        CONVERSION TRACKING FIRES HERE. This is why the page exists.
        /landing-page wires the real snippet in. Until it does, nothing is measured.
        - Google Ads conversion tag
        - GA4 event
        - Any Meta / LinkedIn pixel
        Keep it on page load, not on a click.
      */}
    </div>
  );
}
