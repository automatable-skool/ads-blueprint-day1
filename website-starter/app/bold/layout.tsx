// DEV ONLY. This is the bold design template for a fictional trades business -
// the source /standard-pages and /landing-page copy sections from. It must
// never be reachable on a live site: a Google reviewer finding a fake plumbing
// company on the domain reads as a fake business. Never remove this guard.

import { notFound } from "next/navigation";

export default function BoldTemplateLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}
