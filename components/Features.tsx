import { useRef, useState, useCallback, type ReactNode } from "react";
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
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
  Pause,
  Play,
  Activity,
  Clock,
  CheckCircle2,
  Award,
  Zap,
  TrendingDown,
  Star,
} from "lucide-react";
import { Reveal, Chapter, Counter } from "./Reveal";
import HeroDevice from "./HeroDevice";

/* ---------- Pillar data ---------- */

type VisualVariant = "groups" | "homepin" | "radar" | "shield";
type Tone = "gold" | "mint" | "navy";

interface Pillar {
  icon: LucideIcon;
  variant: VisualVariant;
  code: string;
  status: string;
  title: string;
  body: string;
  tags: string[];
  span: string;
  tone: Tone;
}

const TONE_STYLES: Record<
  Tone,
  { chip: string; text: string; dot: string; panel: string; glow: string }
> = {
  gold: {
    chip: "bg-[#FFF4D6]",
    text: "text-[#153E75]",
    dot: "#153E75",
    panel: "#FFF9EE",
    glow: "rgba(21,62,117,0.16)",
  },
  mint: {
    chip: "bg-[#E4F7F1]",
    text: "text-[#0D9488]",
    dot: "#0D9488",
    panel: "#F0FBF7",
    glow: "rgba(13,148,136,0.18)",
  },
  navy: {
    chip: "bg-[#EAF1FB]",
    text: "text-[#153E75]",
    dot: "#153E75",
    panel: "#F3F8FF",
    glow: "rgba(21,62,117,0.16)",
  },
};

const PILLARS: Pillar[] = [
  {
    icon: Users,
    variant: "groups",
    code: "01 => RIDE OPTIMIZATION",
    status: "Max 7 riders",
    title: "Small Groups, Less Travel Time",
    body: "Optimized rides with only 6–7 students per vehicle. No overcrowding, zero detour loops, and up to 50% less time spent on the road.",
    tags: ["Max 7 per ride", "30–50% faster", "Direct routing"],
    span: "md:col-span-7",
    tone: "gold",
  },

  {
    icon: Radar,
    variant: "radar",
    code: "03 => LIVE TELEMATICS",
    status: "Live 1080p",
    title: "Complete Visibility",
    body: "Real-time GPS tracking, live dual dashcam feeds (in-cabin & road view), and instant delay alerts pushed directly to parent phones.",
    tags: ["Live GPS", "Dual dashcam", "Near-me notifications"],
    span: "md:col-span-5",
    tone: "navy",
  },
  {
    icon: ShieldCheck,
    variant: "shield",
    code: "04 => DRIVER VERIFICATION",
    status: "100% Verified",
    title: "Safety Starts with the Driver",
    body: "Police-verified, professionally trained drivers, AI-monitored driving performance, and emergency vehicle immobilization.",
    tags: ["Police-verified", "AI-monitored", "Strict background check"],
    span: "md:col-span-7",
    tone: "mint",
  },
  {
    icon: Home,
    variant: "homepin",
    code: "02 => DIRECT    PICKUP",
    status: "Home Pick Up",
    title: "Home Pick-up & Drop",
    body: "Direct pick-up & drop right from your home gate. No standing at bus stops — a stress-free morning routine for working parents.",
    tags: ["Door to door", "Zero stop delays", "Parent peace"],
    span: "md:col-span-5",
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

const STATS = [
  {
    label: "Avg. commute time",
    guardian: 22,
    traditional: 48,
    max: 60,
    unit: " min",
  },
  {
    label: "Students per vehicle",
    guardian: 7,
    traditional: 42,
    max: 50,
    unit: "",
  },
  {
    label: "Parent notified within",
    guardian: 2,
    traditional: 15,
    max: 20,
    unit: " min",
  },
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
  const improvement = Math.round((1 - guardian / traditional) * 100);

  return (
    <div ref={ref} className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-[#111827]">{label}</p>
        {improvement > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E4F7F1] px-2 py-0.5 font-mono text-[10.5px] font-bold text-[#1E9E7A]">
            −{improvement}%
          </span>
        )}
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs font-bold text-[#153E75]">
            Guardian Ride
          </span>
          <div className="flex-1 h-3 rounded-full bg-[#EAF1FB] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#153E75] to-[#2C5FA3] transition-[width] duration-1000 ease-out"
              style={{ width: inView ? `${(guardian / max) * 100}%` : "0%" }}
            />
          </div>
          <span className="w-14 text-right font-mono text-xs font-bold text-[#153E75] tabular-nums">
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
          <span className="w-14 text-right font-mono text-xs font-bold text-[#9CA6B4] tabular-nums">
            <Counter to={traditional} suffix={unit} duration={1200} />
          </span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Lively Dribbble/Awwwards-style UI visuals ---------- */

const PillarVisual = ({
  variant,
  tone,
}: {
  variant: VisualVariant;
  tone: Tone;
}) => {
  if (variant === "groups") {
    return (
      <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
        <div className="rounded-xl bg-white/95 backdrop-blur-md p-3 sm:p-3.5 shadow-[0_10px_28px_rgba(21,62,117,0.12)] border border-[#E6EEF9]">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F1F5FB]">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#FFF4D6] text-[#153E75]">
                <Car className="h-3.5 w-3.5" />
              </span>
              <p className="font-heading text-[11px] font-extrabold text-[#111827] truncate">
                Guardian Cab #GR-04
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E4F7F1] px-2 py-0.5 font-mono text-[9.5px] font-extrabold text-[#0D9488]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              6/7
            </span>
          </div>

          {/* Single comparison row */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#153E75] flex items-center gap-1">
                <Zap className="h-3 w-3 text-[#F59E0B]" /> Guardian Ride
              </span>
              <span className="font-mono text-[#0D9488] font-extrabold">
                22 min
              </span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-[#F1F5FB] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#153E75] to-[#0D9488] w-[40%]" />
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#9CA6B4]">Traditional Bus</span>
              <span className="font-mono text-[#9CA6B4] line-through">
                55 min
              </span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-[#F1F5FB] overflow-hidden">
              <div className="h-full rounded-full bg-[#CBD5E1] w-full" />
            </div>
          </div>

          {/* Avatars + saved-time chip */}
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#F1F5FB]">
            <div className="flex items-center -space-x-1.5">
              {["AR", "KL", "MI", "ST"].map((initials) => (
                <span
                  key={initials}
                  className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gradient-to-br from-[#153E75] to-[#2C5FA3] text-[8.5px] font-extrabold text-white ring-2 ring-white"
                >
                  {initials}
                </span>
              ))}
              <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#FFF4D6] text-[8px] font-extrabold text-[#92400E] ring-2 ring-white">
                +2
              </span>
            </div>

            <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF4D6] px-2 py-1 text-[9.5px] font-extrabold text-[#153E75]">
              <TrendingDown className="h-3 w-3 text-[#0D9488]" />
              33 min saved
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "homepin") {
    return (
      <div className="relative w-full max-w-[360px] p-2">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0F2E56] to-[#153E75] p-4 text-white shadow-[0_14px_36px_rgba(15,46,86,0.28)] border border-white/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs text-[#2DD4BF] ring-1 ring-white/20">
                <Home className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[12px] font-extrabold text-white">
                  Home Pick-up
                </p>
                <p className="text-[10px] text-[#A5C3EB]">
                  42 Maple Ave · Sector 54
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#0D9488]/30 px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#2DD4BF] border border-[#0D9488]/40">
              0 meter Walk
            </span>
          </div>

          <div className="mt-3.5 relative h-20 w-full rounded-xl bg-[#091C36] overflow-hidden border border-white/10 p-3 flex flex-col justify-between">
            <svg
              viewBox="0 0 300 60"
              className="absolute inset-0 h-full w-full opacity-20"
            >
              <path
                d="M0 20 H300 M0 40 H300 M100 0 V60 M200 0 V60"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="relative flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#2DD4BF]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2DD4BF] animate-ping" />
                <span>Driver Arriving at Gate</span>
              </div>
              <span className="font-mono text-[10px] text-[#A5C3EB]">
                ETA: 7:15 AM
              </span>
            </div>

            <div className="relative flex items-center justify-between text-[10px] text-[#D1E3F8] z-10">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#FFC83D]" /> Pick-up: House
                Gate
              </span>
              <span className="flex items-center gap-1 text-[#2DD4BF] font-extrabold">
                <CheckCircle2 className="h-3 w-3" /> No Bus Stop Wait
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "radar") {
    return (
      <div className="relative w-full max-w-[360px] p-2">
        <div className="relative rounded-2xl bg-[#091527] p-4 text-white shadow-[0_14px_36px_rgba(9,21,39,0.32)] border border-white/15">
          <div className="flex items-center justify-between text-[10.5px] font-mono border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-1.5 text-[#FF5A5F] font-extrabold">
              <span className="h-2 w-2 rounded-full bg-[#FF5A5F] animate-pulse" />
              LIVE DUAL FEED
            </div>
            <span className="text-[#8FA9C9]">1080p 60FPS</span>
          </div>

          <div className="relative h-20 w-full rounded-xl bg-gradient-to-r from-[#11243E] to-[#1D3A63] p-3 flex flex-col justify-between border border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8FA9C9]">
              <span>SPEED: 38 KM/H</span>
              <span className="text-[#2DD4BF] font-extrabold">
                GPS SIGNAL 100%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-extrabold text-white backdrop-blur-xs border border-white/15">
                <Video className="h-3 w-3 text-[#2DD4BF]" /> In-Cabin & Road Cam
              </span>
              <span className="text-[9.5px] text-[#A0BCE0] font-mono">
                ID: GR-CAB-04
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-xs text-[10.5px] text-white border border-white/10">
            <BellRing className="h-4 w-4 text-[#FFC83D] shrink-0" />
            <span className="truncate font-bold">
              Near Home — 2 mins away (Parent notified)
            </span>
          </div>
        </div>
      </div>
    );
  }

  // shield / driver scorecard
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px]">
      <div className="rounded-xl bg-white/95 backdrop-blur-md p-3 sm:p-3.5 md:p-4 shadow-[0_10px_28px_rgba(21,62,117,0.12)] border border-[#E4F7F1]">
        <div className="flex items-center justify-between gap-2 pb-2 md:pb-2.5 border-b border-[#F1F5FB]">
          <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
            <div className="relative flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#153E75] to-[#2C5FA3] text-[10px] md:text-xs font-extrabold text-white shadow-sm">
              VK
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full bg-[#0D9488] text-[8px] md:text-[9px] text-white ring-2 ring-white font-bold">
                ✓
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-heading text-[11px] md:text-sm font-extrabold text-[#111827] truncate">
                Virender kumar
              </h4>
              <span className="font-mono text-[9px] md:text-[10.5px] font-bold text-[#153E75] bg-[#EAF1FB] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                Senior Driver
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="font-mono text-xs md:text-sm font-extrabold text-[#F59E0B] flex items-center gap-1 justify-end whitespace-nowrap">
              <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-[#F59E0B]" /> 4.98
            </span>
            <span className="text-[8.5px] md:text-[10px] text-[#9CA6B4] whitespace-nowrap">
              Parent Rating
            </span>
          </div>
        </div>

        <p className="mt-2 md:mt-2.5 text-[9.5px] md:text-[11.5px] text-[#6B7280] leading-snug">
          7+ yrs commercial driving · 1,200+ safe rides
        </p>

        <div className="mt-2.5 md:mt-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2">
          <div className="flex items-center gap-1 md:gap-1.5 rounded-lg bg-[#E4F7F1] px-2 py-1.5 md:px-2.5 md:py-2 text-[9px] md:text-[11px] font-extrabold text-[#0D9488] whitespace-nowrap">
            <BadgeCheck className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5 rounded-lg bg-[#EAF1FB] px-2 py-1.5 md:px-2.5 md:py-2 text-[9px] md:text-[11px] font-extrabold text-[#153E75] whitespace-nowrap">
            <ShieldCheck className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
            <span>BG Checked</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5 rounded-lg bg-[#FFF4D6] px-2 py-1.5 md:px-2.5 md:py-2 text-[9px] md:text-[11px] font-extrabold text-[#92400E] whitespace-nowrap col-span-2 sm:col-span-1 justify-center">
            <Award className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
            <span>AI Monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Pillar horizontal scroll with arrows ---------- */

const PillarScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-8">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#153E75]">
          <span className="h-2 w-2 rounded-full bg-[#3CB995] animate-pulse" />
          <span>04 SAFETY PILLARS</span>
        </div>

        {/* High-Contrast Navigation Buttons (Desktop only at top) */}
        <div className="hidden md:flex items-center gap-3.5">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll pillars left"
            className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0C2545] text-white border border-[#0C2545] shadow-lg hover:bg-[#153E75] transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="h-6.5 w-6.5 sm:h-7 sm:w-7" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll pillars right"
            className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0C2545] text-white border border-[#0C2545] shadow-lg hover:bg-[#153E75] transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="h-6.5 w-6.5 sm:h-7 sm:w-7" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pt-2 pb-4 snap-x snap-mandatory -mx-6 px-6 md:-mx-12 md:px-12 scroll-pl-6 md:scroll-pl-12 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {PILLARS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.07}
            y={24}
            className="snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[420px] lg:w-[440px]"
          >
            <PillarCard {...p} />
          </Reveal>
        ))}
      </div>

      {/* Navigation Buttons (Mobile below cards) */}
      <div className="flex md:hidden items-center justify-center gap-5 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll pillars left"
          className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0C2545] text-white border border-[#0C2545] shadow-lg hover:bg-[#153E75] transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="h-6.5 w-6.5 sm:h-7 sm:w-7" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll pillars right"
          className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0C2545] text-white border border-[#0C2545] shadow-lg hover:bg-[#153E75] transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="h-6.5 w-6.5 sm:h-7 sm:w-7" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

/* ---------- Pillar card ---------- */

const PillarCard = ({
  icon: Icon,
  variant,
  code,
  status,
  title,
  body,
  tags,
  tone,
}: Pillar) => {
  const t = TONE_STYLES[tone];
  return (
    <div
      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-[28px] bg-white border border-[#D6DFE9] shadow-[0_8px_30px_rgba(21,62,117,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(21,62,117,0.16)]"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${t.dot}66`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D6DFE9")}
    >
      {/* Signature ambient glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: t.glow }}
      />

      {/* Terminal-style header bar */}
      <div className="relative flex items-center justify-between bg-[#0F2E56] px-6 py-3.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: t.dot }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: t.dot }}
            />
          </span>
          <span className="font-mono text-[10.5px] font-semibold tracking-[0.14em] text-[#BFD3EC] uppercase">
            {code}
          </span>
        </div>
        <span className="font-mono text-[10.5px] font-bold tracking-wide text-[#42C7A1] bg-[#42C7A1]/10 px-2.5 py-0.5 rounded-full border border-[#42C7A1]/20">
          {status}
        </span>
      </div>

      {/* Visual panel with lively UI component */}
      <div
        className="relative h-56 sm:h-60 overflow-hidden flex items-center justify-center p-4"
        style={{ backgroundColor: t.panel }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(${t.dot}33 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        {[
          "top-3 left-3 border-t-2 border-l-2 rounded-tl-md",
          "top-3 right-3 border-t-2 border-r-2 rounded-tr-md",
          "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-md",
          "bottom-3 right-3 border-b-2 border-r-2 rounded-br-md",
        ].map((pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute h-3.5 w-3.5 opacity-30 transition-opacity duration-300 group-hover:opacity-90 ${pos}`}
            style={{ borderColor: t.dot }}
          />
        ))}
        <div className="relative z-10 w-full flex justify-center items-center transition-transform duration-300 group-hover:scale-[1.02] h-75">
          <PillarVisual variant={variant} tone={tone} />
        </div>
      </div>

      {/* Body content */}
      <div className="relative p-4 sm:p-7 md:p-8 flex flex-col justify-between flex-1">
        <div>
          <h3 className="flex items-center gap-3.5 font-heading text-lg sm:text-xl font-extrabold text-[#111827]">
            <span
              className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl ${t.chip} ${t.text} shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            {title}
          </h3>
          <p className="mt-3 text-[13.5px] sm:text-[14.5px] text-[#4B5563] leading-relaxed">
            {body}
          </p>
        </div>

        <div className="pt-4 border-t border-[#F3F4F6] flex flex-col gap-1.5">
          {/* Row 1: Tag 1 & Tag 2 */}
          <div className="flex flex-row items-center gap-1.5 sm:gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-extrabold whitespace-nowrap ${t.chip} ${t.text}`}
              >
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                {tag}
              </span>
            ))}
          </div>

          {/* Row 2: Tag 3 */}
          {tags[2] && (
            <div className="flex flex-row items-center">
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-extrabold whitespace-nowrap ${t.chip} ${t.text}`}
              >
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                {tags[2]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

/* ---------- Main section ---------- */

export const Features = () => {
  return (
    <section id="features" className="relative py-24 md:py-32 -scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <Chapter number="02" label="Why Guardian Way Is Different" />
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

        {/* Pillars — Bento Grid on Desktop / Carousel on Mobile */}
        <PillarScroll />

        {/* Live tracking + smart tech */}
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
            <div className="h-full rounded-3xl gw-card p-8 mt-15">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#153E75]">
                Smart tech for smoother commuting
              </p>
              <div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto overscroll-contain pr-1 sm:max-h-none sm:overflow-visible sm:pr-0"
                style={{ scrollbarWidth: "thin" }}
              >
                {TECH.map((t, i) => (
                  <Reveal key={t.title} delay={0.08 + i * 0.05} y={20}>
                    <div className="group h-32 rounded-2xl bg-[#F3F8FF] border border-[#E6EEF9] p-5 hover:bg-white hover:shadow-[0_12px_30px_rgba(21,62,117,0.08)] transition-all">
                      <t.icon
                        className="h-6 w-6 text-[#153E75] group-hover:scale-110 transition-transform"
                        strokeWidth={1.75}
                      />
                      <p className="mt-3 text-sm font-semibold leading-snug text-[#111827]">
                        {t.title}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-[#E6EEF9] bg-white py-6">
        <style>{`
          @keyframes gw-marquee-ltr { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
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
