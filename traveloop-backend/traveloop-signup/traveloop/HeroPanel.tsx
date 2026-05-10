import { Compass, MapPin, Calendar, Wallet, Share2, Map } from "lucide-react";

const features = [
  { icon: Map, title: "Multi-city trip planning", desc: "Hop between destinations seamlessly." },
  { icon: MapPin, title: "Add cities & activities", desc: "Build your route, your way." },
  { icon: Calendar, title: "Day-wise itinerary", desc: "Every day, perfectly mapped." },
  { icon: Wallet, title: "Budget calculation", desc: "Track spending in real time." },
  { icon: Share2, title: "Share with friends", desc: "Plan together, travel together." },
];

export function HeroPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-none lg:rounded-[2rem] p-8 sm:p-12 lg:p-14 flex flex-col justify-between"
      style={{ backgroundImage: "var(--gradient-hero)" }}>
      {/* Decorative shapes */}
      <DecorBg />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Compass className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Traveloop
          </span>
        </div>

        <div className="mt-10 sm:mt-14 max-w-md">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.1] font-bold tracking-tight text-foreground">
            Plan smarter.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>
              Travel together.
            </span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-sm">
            Your shared canvas for unforgettable trips — from the first city pin to the last sunset.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex items-start gap-3 rounded-2xl bg-card/70 backdrop-blur border border-border/50 px-4 py-3 hover:bg-card transition shadow-sm hover:shadow-[var(--shadow-soft)]"
          >
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecorBg() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[var(--sky)] opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[var(--sand)] opacity-50 blur-3xl" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 600 600" fill="none" aria-hidden="true"
      >
        <path d="M40 480 C 160 380, 220 420, 320 320 S 520 180, 580 80"
          stroke="currentColor" className="text-primary" strokeWidth="1.5"
          strokeDasharray="4 8" strokeLinecap="round" fill="none" />
        <circle cx="40" cy="480" r="5" className="fill-primary" />
        <circle cx="320" cy="320" r="4" className="fill-primary" />
        <circle cx="580" cy="80" r="5" className="fill-primary" />
      </svg>
    </>
  );
}
