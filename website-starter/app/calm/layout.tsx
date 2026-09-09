// DEV ONLY. This is the calm design template for a fictional business - the
// source /standard-pages and /landing-page copy sections from. It must never
// be reachable on a live site: a Google reviewer finding a fake company on the
// domain reads as a fake business. Never remove this guard.

import { notFound } from "next/navigation";

export default function CalmTemplateLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}
