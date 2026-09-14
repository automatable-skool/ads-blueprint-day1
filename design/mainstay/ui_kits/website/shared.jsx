const { Button, Icon, Badge, Card, SectionHeading, TrustBar, Stars } = window.MainstayDesignSystem_eaeaf9;

// Neutral placeholder standing in for a real photograph. No stock imagery ships
// with this system — replace each Photo with the business's own picture.
function Photo({ label, height = 320, radius = "var(--radius-lg)", style }) {
  return (
    <div style={{
      height, borderRadius: radius, background: "var(--n-100)",
      border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center",
      justifyContent: "center", textAlign: "center", padding: 20, ...style
    }}>
      <span style={{ font: "500 13px/1.5 var(--font-core)", color: "var(--n-400)", maxWidth: "28ch" }}>
        <Icon name="user" size={18} style={{ margin: "0 auto 8px", opacity: .5 }} />
        {label}
      </span>
    </div>
  );
}

function Section({ children, tone = "page", id, py }) {
  const bg = { page: "var(--surface-page)", sunken: "var(--surface-sunken)", accent: "var(--surface-accent-soft)" }[tone];
  return (
    <section id={id} style={{ background: bg, paddingBlock: py || "var(--section-y)" }}>
      <div className="ms-container">{children}</div>
    </section>
  );
}

const SERVICES = [
  { icon: "droplets", title: "Plumbing", description: "Leaks, blockages, tap and bathroom fits.", price: "From $89" },
  { icon: "thermometer", title: "Heating & boilers", description: "Repairs, servicing and gas safety checks.", price: "From $120" },
  { icon: "plug-zap", title: "Electrical", description: "Faults, rewires, sockets and EV chargers.", price: "From $95" },
  { icon: "hammer", title: "Carpentry & repairs", description: "Doors, decking, flooring, general joinery.", price: "From $75" },
  { icon: "paint-roller", title: "Decorating", description: "Interior and exterior, day or fixed rate.", price: "From $240/day" },
  { icon: "leaf", title: "Grounds & drainage", description: "Gutters, drains, patios and clearance.", price: "From $110" },
  { icon: "scale", title: "Property legals", description: "Conveyancing and landlord compliance.", price: "Fixed fee" },
  { icon: "calculator", title: "Accounts & tax", description: "Bookkeeping and self-assessment for trades.", price: "From $60/mo" }
];

const REVIEWS = [
  { quote: "Called at nine, fixed by noon, and the price was the price. No fuss.", name: "Dana R.", meta: "Ashbourne · Boiler repair" },
  { quote: "They quoted three jobs, did two the same week and booked the third around my shifts.", name: "Marcus O.", meta: "Redhill · Electrical" },
  { quote: "Turned up when they said. Cleaned up after. That's all I want from a trade.", name: "Priya S.", meta: "Kingsmoor · Bathroom fit" },
  { quote: "Our office had a leak on a Sunday. Someone answered the phone and came out.", name: "Tom H.", meta: "Carlow · Commercial" }
];

const AREAS = ["Ashbourne", "Redhill", "Carlow", "Kingsmoor", "Peveril", "Great Hale", "Stanton", "Newbridge"];

Object.assign(window, { Photo, Section, SERVICES, REVIEWS, AREAS });
