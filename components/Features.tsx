import { useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";
import {
  Users,
  Home,
  Radar,
  ShieldCheck,
  MapPin,
  Video,
  Route,
  BadgeCheck,
  Car,
  Smartphone,
  BellRing,
  Sparkles,
  Phone,
  Mail,
  MapPinned,
  type LucideIcon,
  Pause,
  Play,
} from "lucide-react";
import { Reveal, Chapter, Counter } from "./Reveal";
import HeroDevice from "./HeroDevice";
import Image from "next/image";

/* ---------- Pillar data ---------- */

type VisualVariant = "groups" | "homepin" | "radar" | "shield";
type Tone = "gold" | "mint" | "navy";

interface Pillar {
  icon: LucideIcon;
  variant: VisualVariant;
  title: string;
  body: string;
  tags: string[];
  span: string;
  tone: Tone;
}

const TONE_STYLES: Record<
  Tone,
  { chip: string; text: string; dot: string; panel: string }
> = {
  gold: {
    chip: "bg-[#FFF4D6]",
    text: "text-[#153E75]",
    dot: "#153E75",
    panel: "#FFF8E7",
  },
  mint: {
    chip: "bg-[#E4F7F1]",
    text: "text-[#42C7A1]",
    dot: "#42C7A1",
    panel: "#F0FBF7",
  },
  navy: {
    chip: "bg-[#EAF1FB]",
    text: "text-[#153E75]",
    dot: "#153E75",
    panel: "#F3F8FF",
  },
};

const PILLARS: Pillar[] = [
  {
    icon: Users,
    variant: "groups",
    title: "Small Groups, Less Travel Time",
    body: "Optimized rides with only 6–7 students. No overcrowding, direct routing and 30–50% less time on the road.",
    tags: ["Max 7 per ride", "30–50% faster"],
    span: "md:col-span-7",
    tone: "gold",
  },
  {
    icon: Home,
    variant: "homepin",
    title: "Home Pick-up",
    body: "Direct pick-up & drop right from your home. No waiting at bus stops — a smoother start for working parents.",
    tags: ["Door to door", "Zero stop delays"],
    span: "md:col-span-5",
    tone: "mint",
  },
  {
    icon: Radar,
    variant: "radar",
    title: "Complete Visibility",
    body: "Real-time GPS, live dashcam feeds inside & outside the vehicle, and instant delay notifications.",
    tags: ["Live GPS", "In-cabin camera"],
    span: "md:col-span-5",
    tone: "navy",
  },
  {
    icon: ShieldCheck,
    variant: "shield",
    title: "Safety Starts with the Driver",
    body: "Police-verified, professionally trained drivers, AI-monitored performance and emergency vehicle immobilization.",
    tags: ["Police-verified", "AI-monitored"],
    span: "md:col-span-7",
    tone: "mint",
  },
];

interface TechItem {
  icon: LucideIcon;
  title: string;
}

const TECH: TechItem[] = [
  { icon: MapPin, title: "Live GPS & Geofencing" },
  { icon: Video, title: "Real-Time Video Surveillance" },
  { icon: Route, title: "AI Route Optimization" },
  { icon: BadgeCheck, title: "Verified Drivers (Scorecard)" },
  { icon: Car, title: "Audited Vehicles" },
  { icon: Smartphone, title: "Parental Mobile App" },
  { icon: BellRing, title: "Instant Alerts & Notifications" },
  { icon: Sparkles, title: "Near-Me Notifications" },
];

const PARTNER_VALUES = [
  "Seamless Mobility Management",
  "You Focus on Education, We Deliver Safe Transportation",
  "Enhanced School Brand Visibility",
  "Reliable, Professional Staff",
  "Child Protection & Care, Everywhere",
];

/* ---------- Animated comparison bars ---------- */

interface StatRowProps {
  label: string;
  guardian: number;
  traditional: number;
  max: number;
  unit?: string;
}

const StatRow = ({
  label,
  guardian,
  traditional,
  max,
  unit = "",
}: StatRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="py-5">
      <p className="text-sm font-bold text-[#111827] mb-3">{label}</p>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs font-bold text-[#153E75]">
            Guardian Ride
          </span>
          <div className="flex-1 h-3 rounded-full bg-[#EAF1FB] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#153E75] transition-[width] duration-1000 ease-out"
              style={{ width: inView ? `${(guardian / max) * 100}%` : "0%" }}
            />
          </div>
          <span className="w-14 text-right text-xs font-bold text-[#153E75] tabular-nums">
            <Counter to={guardian} suffix={unit} duration={1200} />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs font-semibold text-[#9CA6B4]">
            Traditional Bus
          </span>
          <div className="flex-1 h-3 rounded-full bg-[#F1F5FB] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D8DEE8] transition-[width] duration-1000 ease-out"
              style={{ width: inView ? `${(traditional / max) * 100}%` : "0%" }}
            />
          </div>
          <span className="w-14 text-right text-xs font-bold text-[#9CA6B4] tabular-nums">
            <Counter to={traditional} suffix={unit} duration={1200} />
          </span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Bespoke animated illustrations, one per pillar ---------- */

const PillarVisual = ({
  variant,
  tone,
}: {
  variant: VisualVariant;
  tone: Tone;
}) => {
  const t = TONE_STYLES[tone];

  if (variant === "groups") {
    return (
      <div className="relative mx-auto h-full w-full max-w-[320px]">
        <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full">
          <path
            d="M14 30 L 286 30"
            stroke={t.dot}
            strokeWidth="2"
            strokeDasharray="1 7"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M14 112 C 80 55, 130 158, 190 96 S 260 46, 286 62"
            stroke="#B9C2D0"
            strokeWidth="2"
            strokeDasharray="1 7"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
        <span
          className="gw-dot-fast absolute h-3 w-3 rounded-full"
          style={{ backgroundColor: t.dot, boxShadow: `0 0 0 4px ${t.dot}22` }}
        />
        <span className="gw-dot-slow absolute h-2 w-2 rounded-full bg-[#9CA6B4]" />
        <span
          className="absolute left-1 top-1 text-[10px] font-bold"
          style={{ color: t.dot }}
        >
          Guardian
        </span>
        <span className="absolute left-1 bottom-0 text-[10px] font-bold text-[#9CA6B4]">
          Traditional
        </span>
      </div>
    );
  }

  if (variant === "homepin") {
    return (
      <div className="relative mx-auto h-full w-full max-w-[220px]">
        <svg viewBox="0 0 220 140" className="absolute inset-0 h-full w-full">
          <path
            d="M24 24 L 196 116"
            stroke={t.dot}
            strokeWidth="2"
            strokeDasharray="1 7"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
        <span className="absolute left-3 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <Home className="h-4 w-4" style={{ color: t.dot }} strokeWidth={2} />
        </span>
        <span className="absolute right-3 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <MapPin
            className="h-4 w-4"
            style={{ color: t.dot }}
            strokeWidth={2}
          />
        </span>
        <span
          className="gw-dot-home absolute h-3 w-3 rounded-full"
          style={{ backgroundColor: t.dot, boxShadow: `0 0 0 4px ${t.dot}22` }}
        />
      </div>
    );
  }

  if (variant === "radar") {
    return (
      <div className="relative mx-auto flex h-full w-full max-w-[220px] items-center justify-center">
        <span
          className="gw-ripple-ring absolute h-10 w-10 rounded-full border-2"
          style={{ borderColor: t.dot, animationDelay: "0s" }}
        />
        <span
          className="gw-ripple-ring absolute h-10 w-10 rounded-full border-2"
          style={{ borderColor: t.dot, animationDelay: "0.8s" }}
        />
        <span
          className="gw-ripple-ring absolute h-10 w-10 rounded-full border-2"
          style={{ borderColor: t.dot, animationDelay: "1.6s" }}
        />
        <span
          className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: t.dot }}
        >
          <Video className="h-4 w-4 text-white" strokeWidth={2} />
        </span>
        <span
          className="absolute right-5 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold shadow"
          style={{ color: t.dot }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B] animate-pulse" />{" "}
          LIVE
        </span>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[180px] items-center justify-center">
      <svg viewBox="0 0 100 110" className="h-24 w-24">
        <path
          className="gw-shield-path"
          d="M50 4 L92 20 V52 C92 82 74 100 50 106 C26 100 8 82 8 52 V20 Z"
          fill="none"
          stroke={t.dot}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
        />
        <path
          className="gw-check-path"
          d="M32 54 L45 68 L70 38"
          fill="none"
          stroke={t.dot}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
    </div>
  );
};

/* ---------- Pillar card ---------- */

const PillarCard = ({
  icon: Icon,
  variant,
  title,
  body,
  tags,
  tone,
}: Pillar) => {
  const t = TONE_STYLES[tone];
  return (
    <div className="group h-full overflow-hidden rounded-3xl gw-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,62,117,0.1)]">
      <div
        className="relative h-40 md:h-44 overflow-hidden"
        style={{ backgroundColor: t.panel }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(${t.dot}33 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative flex h-full items-center justify-center p-4">
          <PillarVisual variant={variant} tone={tone} />
        </div>
      </div>

      <div className="p-7 md:p-8">
        <h3 className="flex items-center gap-2 font-heading text-xl md:text-2xl font-extrabold text-[#111827]">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.chip} ${t.text}`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          {title}
        </h3>
        <p className="mt-2.5 text-[#4B5563] leading-relaxed">{body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs font-bold ${t.chip} ${t.text}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Live tracking phone mockup (animated route) ---------- */

const LiveTrackingMock = () => (
  <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[280px]">
    <div className="rounded-[2.5rem] border-8 border-[#111827] bg-white shadow-2xl overflow-hidden">
      <div className="h-6 bg-[#111827] flex items-center justify-center">
        <span className="h-1.5 w-16 rounded-full bg-[#374151]" />
      </div>
      <div className="relative h-[420px] bg-[#EAF1FB] px-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#153E75]">
            Guardian Ride
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#42C7A1]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#42C7A1] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#42C7A1]" />
            </span>
            LIVE
          </span>
        </div>

        <svg viewBox="0 0 220 300" className="mt-3 w-full">
          <path
            id="routePath"
            d="M30 30 C 90 70, 40 140, 110 170 S 190 240, 190 270"
            fill="none"
            stroke="#153E75"
            strokeWidth="3"
            strokeDasharray="6 6"
            opacity="0.3"
          />
          <g>
            <circle cx="30" cy="30" r="7" fill="#42C7A1" />
            <text x="42" y="34" fontSize="9" fill="#153E75" fontWeight="700">
              Home
            </text>
          </g>
          <g>
            <circle cx="190" cy="270" r="7" fill="#FFC83D" />
            <text x="150" y="288" fontSize="9" fill="#153E75" fontWeight="700">
              School
            </text>
          </g>
          <circle r="6" fill="#153E75">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
              <mpath href="#routePath" />
            </animateMotion>
          </circle>
        </svg>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white shadow-lg p-3 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF4D6] text-[#153E75]">
            <BellRing className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-xs font-bold text-[#111827]">
              Arriving in 4 min
            </p>
            <p className="text-[10px] text-[#9CA6B4]">
              Van #GR-014 · Driver verified
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Video showcase ---------- */

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
    setPlaying(!playing);
  };

  return (
    <div className="relative h-full rounded-3xl overflow-hidden border border-[#E6EEF9] shadow-[0_8px_30px_rgba(21,62,117,0.06)] bg-black group min-h-70 md:min-h-105 mt-5">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1200"
        muted
        loop
        playsInline
        onClick={toggle}
        onEnded={() => setPlaying(false)}
        src="/video.mp4"
      />
      <button
        type="button"
        onClick={toggle}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/25 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#153E75] shadow-lg hover:scale-110 transition-transform">
          {playing ? (
            <Pause className="h-7 w-7" strokeWidth={2} />
          ) : (
            <Play className="h-7 w-7 translate-x-0.5" strokeWidth={2} />
          )}
        </span>
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
    </div>
  );
};

/* ---------- Contact CTA (unused block kept as-is) ---------- */

const CONTACT: { icon: LucideIcon; label: string; value: ReactNode }[] = [
  { icon: Phone, label: "Call / WhatsApp", value: "+91 9090119355" },
  { icon: Mail, label: "Email", value: "guardianride.info@gmail.com" },
  { icon: MapPinned, label: "Location", value: "Gurugram, Haryana" },
];

/* ---------- Main section ---------- */

export const Features = () => {
  return (
    <section id="features" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <Chapter number="02" label="Why Guardian Ride Is Different" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-[#111827]">
            More than just transportation.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-[#4B5563]">
            Safe, smart and stress-free school commutes for modern families.
          </p>
        </Reveal>

        {/* Stats / graph */}
        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-3xl gw-card p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#153E75]">
              The numbers parents care about
            </p>
            <div className="mt-4 divide-y divide-[#EEF3FA]">
              <StatRow
                label="Students sharing one ride"
                guardian={7}
                traditional={35}
                max={35}
              />
              <StatRow
                label="Avg. commute time (minutes)*"
                guardian={25}
                traditional={50}
                max={50}
                unit=" min"
              />
            </div>
            <p className="mt-2 text-xs text-[#9CA6B4]">
              *Estimated from typical Gurugram routes; actual time depends on
              distance and traffic.
            </p>
          </div>
        </Reveal>

        {/* Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} y={24} className={p.span}>
              <PillarCard {...p} />
            </Reveal>
          ))}
        </div>

        {/* Live tracking + video */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <Reveal className="md:col-span-5" y={24}>
            <div className="h-full rounded-3xl gw-card p-8 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#153E75]">
                Track it live
              </p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-[#111827] max-w-xs">
                Watch the route, not just wait for a text.
              </h3>
              <div className="mt-6">
                <HeroDevice />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-7" y={24}>
            <VideoShowcase />
          </Reveal>
        </div>

        {/* Tech */}
        <Reveal delay={0.05} className="mt-20">
          <p className="text-xs md:text-sm uppercase tracking-[0.16em] text-[#153E75] font-bold">
            Smart tech for smarter commuting
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {TECH.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05} y={20}>
              <div className="group h-full rounded-2xl bg-[#F3F8FF] border border-[#E6EEF9] p-4 md:p-6 hover:bg-white hover:shadow-[0_12px_30px_rgba(21,62,117,0.08)] transition-all">
                <t.icon
                  className="h-6 w-6 text-[#153E75] group-hover:scale-110 transition-transform"
                  strokeWidth={1.75}
                />
                <p className="mt-4 text-sm font-semibold leading-snug text-[#111827]">
                  {t.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trusted partners */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <Reveal className="md:col-span-6" y={24}>
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-[#E6EEF9] shadow-[0_8px_30px_rgba(21,62,117,0.06)]">
              <img
                src="https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Modern school campus with students"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E56]/80 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FFC83D]">
                  Trusted Partners for Institutions
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold text-white max-w-sm">
                  We extend your duty of care beyond the school gate.
                </h3>
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTNER_VALUES.slice(0, 4).map((v, i) => (
              <Reveal key={v} delay={i * 0.06} y={20}>
                <div className="h-full rounded-2xl gw-card p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F7F1] text-[#42C7A1]">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 font-semibold text-[#111827]">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-[#E6EEF9] bg-white py-6">
        <style>{`
          @keyframes gw-marquee-ltr { from { transform: translateX(-50%); } to { transform: translateX(0%); } }
          .gw-marquee-track { display: flex; width: max-content; animation: gw-marquee-ltr 28s linear infinite; }
          .gw-marquee-track:hover { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) { .gw-marquee-track { animation: none; } }
        `}</style>
        <div className="gw-marquee-track">
          {[...PARTNER_VALUES, ...PARTNER_VALUES].map((v, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap font-heading text-xl md:text-2xl font-extrabold text-[#153E75] px-8"
            >
              {v}
              <span className="mx-8 text-[#FFC83D]">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
