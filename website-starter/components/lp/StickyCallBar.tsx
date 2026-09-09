// Mobile only (hidden on desktop by .lp-sticky in kit.css). One call button,
// one audit button, pinned above the phone's home bar.
import { Button } from "@/components/kit/Button";
import { CallLink } from "./CallLink";

export function StickyCallBar({ phone, formHref = "#audit" }: { phone: string; formHref?: string }) {
  return (
    <div className="lp-sticky">
      <CallLink phone={phone} label="Call us" variant="tertiary" fullWidth />
      <Button href={formHref} variant="primary" fullWidth>Free audit</Button>
    </div>
  );
}
