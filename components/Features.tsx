import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
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
          Guardian way
        </span>
        <span className="absolute left-1 bottom-0 text-[10px] font-bold text-[#9CA6B4]">
          Traditional way
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

interface ShowcaseVisualProps {
  variant: VisualVariant;
  tone: Tone;
}

const ShowcaseVisual = ({ variant, tone }: ShowcaseVisualProps) => {
  const t = TONE_STYLES[tone];

  if (variant === "groups") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <svg
          viewBox="0 0 700 360"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* Fast/direct route */}
          <path
            id="guardian-route-large"
            d="M70 100 C 210 70, 370 85, 630 105"
            fill="none"
            stroke={t.dot}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="3 14"
            opacity="0.55"
          />

          {/* Traditional long route */}
          <path
            id="traditional-route-large"
            d="M70 275 C 160 185, 255 330, 345 220 C 430 120, 520 290, 630 245"
            fill="none"
            stroke="#AAB4C3"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="3 14"
            opacity="0.65"
          />

          <circle cx="70" cy="100" r="10" fill={t.dot} />
          <circle cx="630" cy="105" r="10" fill={t.dot} />

          <circle cx="70" cy="275" r="9" fill="#AAB4C3" />
          <circle cx="630" cy="245" r="9" fill="#AAB4C3" />

          <g>
            <circle r="11" fill={t.dot}>
              <animateMotion dur="3.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#guardian-route-large" />
              </animateMotion>
            </circle>

            <circle r="22" fill={t.dot} opacity="0.14">
              <animateMotion dur="3.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#guardian-route-large" />
              </animateMotion>
            </circle>
          </g>

          <g>
            <circle r="9" fill="#AAB4C3">
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#traditional-route-large" />
              </animateMotion>
            </circle>
          </g>
        </svg>

        <div className="absolute left-[7%] top-[8%] rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
          <p className="text-xs font-bold" style={{ color: t.dot }}>
            Guardian Ride
          </p>
          <p className="mt-0.5 text-[10px] text-[#64748B]">
            Direct, optimized route
          </p>
        </div>

        <div className="absolute bottom-[5%] left-[7%] rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
          <p className="text-xs font-bold text-[#7B8797]">Traditional bus</p>
          <p className="mt-0.5 text-[10px] text-[#94A3B8]">
            Longer, crowded route
          </p>
        </div>

        <div className="absolute right-[7%] top-[18%] rounded-2xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Time saved
          </p>
          <p className="mt-1 text-xl font-black" style={{ color: t.dot }}>
            Up to 50%
          </p>
        </div>
      </div>
    );
  }

  if (variant === "homepin") {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <svg
          viewBox="0 0 700 360"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <path
            id="home-route-large"
            d="M125 245 C 230 210, 270 90, 390 120 C 510 150, 535 230, 610 105"
            fill="none"
            stroke={t.dot}
            strokeWidth="6"
            strokeDasharray="5 16"
            strokeLinecap="round"
            opacity="0.55"
          />

          <circle r="12" fill={t.dot}>
            <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#home-route-large" />
            </animateMotion>
          </circle>

          <circle r="25" fill={t.dot} opacity="0.15">
            <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#home-route-large" />
            </animateMotion>
          </circle>
        </svg>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[19%] left-[10%]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/85 shadow-xl backdrop-blur-md">
            <Home
              className="h-9 w-9"
              style={{ color: t.dot }}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-3 text-center text-xs font-bold text-[#334155]">
            Your home
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[8%] top-[15%]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white/85 shadow-xl backdrop-blur-md">
            <MapPin
              className="h-9 w-9"
              style={{ color: t.dot }}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-3 text-center text-xs font-bold text-[#334155]">
            School
          </p>
        </motion.div>

        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 rounded-full border border-white/70 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: t.dot }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: t.dot }}
              />
            </span>

            <span className="text-xs font-bold text-[#334155]">
              Door-to-door pickup
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "radar") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          className="absolute h-[min(70vw,330px)] w-[min(70vw,330px)] rounded-full border"
          style={{ borderColor: `${t.dot}20` }}
        />

        <div
          className="absolute h-[min(52vw,245px)] w-[min(52vw,245px)] rounded-full border"
          style={{ borderColor: `${t.dot}30` }}
        />

        <div
          className="absolute h-[min(34vw,160px)] w-[min(34vw,160px)] rounded-full border"
          style={{ borderColor: `${t.dot}45` }}
        />

        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="absolute h-24 w-24 rounded-full border-2"
            style={{ borderColor: t.dot }}
            initial={{ opacity: 0.6, scale: 0.4 }}
            animate={{
              opacity: [0.55, 0],
              scale: [0.4, 3.3],
            }}
            transition={{
              duration: 3,
              delay: index,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[min(66vw,310px)] w-[min(66vw,310px)] rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${t.dot}12 35deg,
              ${t.dot}50 65deg,
              transparent 95deg
            )`,
          }}
        />

        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[2rem] shadow-2xl"
          style={{
            backgroundColor: t.dot,
            boxShadow: `0 25px 60px ${t.dot}45`,
          }}
        >
          <Video className="h-10 w-10 text-white" strokeWidth={1.6} />
        </motion.div>

        <div className="absolute right-[8%] top-[12%] rounded-full border border-white/70 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
          <span className="flex items-center gap-2 text-xs font-bold text-[#334155]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6565] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6565]" />
            </span>
            Live video
          </span>
        </div>

        <div className="absolute bottom-[9%] left-[8%] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Vehicle status
          </p>
          <p className="mt-1 text-sm font-extrabold text-[#1E293B]">
            Connected and moving
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute h-36 w-36 rounded-full border-2"
          style={{ borderColor: t.dot }}
          animate={{
            scale: [0.8, 1.75],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 3,
            delay: index * 0.9,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.svg
        viewBox="0 0 180 200"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10 h-[min(58vw,270px)] w-[min(52vw,240px)]"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M90 8 L165 38 V94 C165 148 132 181 90 192 C48 181 15 148 15 94 V38 Z"
          fill="none"
          stroke={t.dot}
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  duration: 1.2,
                  ease: "easeInOut",
                },
              },
            },
          }}
        />

        <motion.path
          d="M55 98 L79 123 L129 68"
          fill="none"
          stroke={t.dot}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                delay: 0.8,
                duration: 0.7,
                ease: "easeOut",
              },
            },
          }}
        />
      </motion.svg>

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[7%] rounded-full border border-white/70 bg-white/85 px-5 py-2.5 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4" style={{ color: t.dot }} />
          <span className="text-xs font-bold text-[#334155]">
            Driver verified
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const FEATURE_DURATION = 5500;

const FeatureStatus = ({ activeIndex }: { activeIndex: number }) => {
  const content = [
    {
      label: "Route optimized",
      value: "30–50% faster",
      icon: Route,
    },
    {
      label: "Pickup confirmed",
      value: "At your doorstep",
      icon: Home,
    },
    {
      label: "Vehicle connected",
      value: "Live tracking active",
      icon: Radar,
    },
    {
      label: "Driver status",
      value: "Verified & monitored",
      icon: ShieldCheck,
    },
  ];

  const current = content[activeIndex];
  const StatusIcon = current.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.label}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.96 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
  absolute right-4 top-[88px] z-30
  hidden w-[225px]
  rounded-2xl border border-white/15
  bg-[#07182F]/85 p-4 text-white
  shadow-2xl backdrop-blur-xl
  xl:block
"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <StatusIcon className="h-5 w-5 text-[#69E6BE]" strokeWidth={1.8} />
          </span>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#69E6BE] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#69E6BE]" />
              </span>

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
                {current.label}
              </p>
            </div>

            <p className="mt-1 truncate text-sm font-bold">{current.value}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const PremiumFeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeFeature = PILLARS[activeIndex];
  const ActiveIcon = activeFeature.icon;
  const activeTone = TONE_STYLES[activeFeature.tone];

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PILLARS.length);
    }, FEATURE_DURATION);

    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion]);

  const activateFeature = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="
        relative mt-12 overflow-hidden rounded-[2rem]
        bg-[#07182F] p-3 shadow-[0_35px_100px_rgba(7,24,47,0.22)]
        md:rounded-[2.5rem] md:p-4
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background effects */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-40
          [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.13)_1px,transparent_0)]
          [background-size:24px_24px]
        "
      />

      <motion.div
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-[110px]"
        animate={{
          backgroundColor: activeTone.dot,
          opacity: 0.2,
        }}
        transition={{ duration: 0.7 }}
      />

      <motion.div
        className="pointer-events-none absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full blur-[130px]"
        animate={{
          backgroundColor:
            activeFeature.tone === "gold" ? "#FFC83D" : "#42C7A1",
          opacity: 0.12,
        }}
        transition={{ duration: 0.7 }}
      />

      <div className="relative grid grid-cols-1 gap-3 lg:min-h-[650px] lg:grid-cols-[0.72fr_1.5fr]">
        {/* Feature navigation */}
        <div className="flex flex-col rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm md:p-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FFC83D]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
                Guardian Ride Advantage
              </span>
            </span>

            <h3 className="mt-5 max-w-sm font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              One safer ride.
              <span className="block text-white/45">
                Complete peace of mind.
              </span>
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Everything parents need to follow, verify and trust every school
              journey.
            </p>
          </div>

          <div className="mt-8 flex flex-1 flex-col justify-center gap-2">
            {PILLARS.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeIndex === index;
              const tone = TONE_STYLES[feature.tone];

              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => activateFeature(index)}
                  onMouseEnter={() => activateFeature(index)}
                  className={`
                    group relative w-full overflow-hidden rounded-2xl
                    border px-4 py-4 text-left transition-colors duration-300
                    ${
                      isActive
                        ? "border-white/15 bg-white/[0.1]"
                        : "border-transparent bg-transparent hover:bg-white/[0.055]"
                    }
                  `}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.span
                      animate={{
                        backgroundColor: isActive
                          ? tone.dot
                          : "rgba(255,255,255,0.07)",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                        scale: isActive ? 1 : 0.94,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </motion.span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          text-sm font-bold transition-colors duration-300
                          ${isActive ? "text-white" : "text-white/62"}
                        `}
                      >
                        {feature.title}
                      </p>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: 4 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 overflow-hidden text-xs leading-relaxed text-white/45"
                          >
                            {feature.tags.join(" · ")}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <span
                      className={`
                        font-mono text-xs font-bold transition-colors
                        ${isActive ? "text-white/65" : "text-white/20"}
                      `}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {isActive && !reduceMotion && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: FEATURE_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                      style={{ backgroundColor: tone.dot }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/45">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              Safety at every step
            </div>

            <div className="flex items-center gap-1.5">
              {PILLARS.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => activateFeature(index)}
                  aria-label={`View ${feature.title}`}
                  className="py-2"
                >
                  <motion.span
                    animate={{
                      width: activeIndex === index ? 24 : 6,
                      opacity: activeIndex === index ? 1 : 0.25,
                    }}
                    className="block h-1.5 rounded-full bg-white"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main visual panel */}
        <motion.div
          layout
          className="
  relative min-h-[680px] overflow-hidden rounded-[1.6rem]
  border border-white/10
  sm:min-h-[700px]
  lg:min-h-[650px]
"
          animate={{
            backgroundColor: activeTone.panel,
          }}
          transition={{ duration: 0.65 }}
        >
          {/* Dot pattern */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              backgroundImage: `radial-gradient(${activeTone.dot}32 1px, transparent 1px)`,
            }}
            style={{
              backgroundSize: "22px 22px",
            }}
          />

          {/* Giant number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`number-${activeIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.055, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="
                pointer-events-none absolute -right-2 -top-8
                font-heading text-[140px] font-black leading-none
                sm:text-[190px] lg:text-[230px]
              "
              style={{ color: activeTone.dot }}
            >
              0{activeIndex + 1}
            </motion.span>
          </AnimatePresence>

          {/* Top badges */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between">
            <motion.span
              layout
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-2 shadow-sm backdrop-blur-md"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: activeTone.dot,
                  boxShadow: `0 0 0 5px ${activeTone.dot}18`,
                }}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#334155]">
                Smart mobility
              </span>
            </motion.span>

            <span className="rounded-full border border-white/60 bg-white/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#334155] backdrop-blur-md">
              Live system
            </span>
          </div>

          {/* Animated visual */}
          <div
            className="
    absolute inset-x-3 top-[72px] bottom-[250px]
    overflow-hidden rounded-[1.4rem]
    sm:inset-x-5 sm:bottom-[225px]
    lg:inset-x-7 lg:top-[86px] lg:bottom-[235px]
  "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.variant}
                initial={{
                  opacity: 0,
                  scale: 0.97,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: -12,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full"
              >
                <ShowcaseVisual
                  variant={activeFeature.variant}
                  tone={activeFeature.tone}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main content */}
          <div
            className="
    absolute bottom-0 left-0 right-0 z-20
    border-t border-white/50
    bg-gradient-to-t from-white via-white/95 to-white/70
    p-5 pt-8 backdrop-blur-md
    sm:p-7 sm:pt-9
    lg:p-8 lg:pt-10
  "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeIndex}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-xl"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{
                    backgroundColor: activeTone.dot,
                    boxShadow: `0 15px 35px ${activeTone.dot}35`,
                  }}
                >
                  <ActiveIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>

                <h4 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-[#111827] sm:text-3xl">
                  {activeFeature.title}
                </h4>

                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#4B5563] sm:text-base">
                  {activeFeature.body}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeFeature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border bg-white/60 px-3 py-1.5 text-xs font-bold backdrop-blur-sm"
                      style={{
                        color: activeTone.dot,
                        borderColor: `${activeTone.dot}22`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <FeatureStatus activeIndex={activeIndex} />
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- Pillar card ---------- */

interface PillarCardProps extends Pillar {
  isActive: boolean;
  onActivate: () => void;
}

const PillarCard = ({
  icon: Icon,
  variant,
  title,
  body,
  tags,
  tone,
  isActive,
  onActivate,
}: PillarCardProps) => {
  const t = TONE_STYLES[tone];

  return (
    <motion.article
      layout
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      animate={{
        flex: isActive ? 2.1 : 0.85,
      }}
      transition={{
        layout: {
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
        flex: {
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className={`
        group relative min-w-0 cursor-pointer overflow-hidden rounded-3xl
        border transition-[border-color,box-shadow] duration-500
        ${
          isActive
            ? "border-[#42C7A1]/50 shadow-[0_25px_65px_rgba(21,62,117,0.16)]"
            : "border-[#E6EEF9] shadow-[0_8px_25px_rgba(21,62,117,0.06)]"
        }
      `}
      style={{
        backgroundColor: isActive ? t.panel : "#FFFFFF",
      }}
      tabIndex={0}
    >
      {/* Background dot pattern */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: isActive ? 0.5 : 0.12,
        }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundImage: `radial-gradient(${t.dot}35 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />

      {/* Active background glow */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        animate={{
          opacity: isActive ? 0.22 : 0,
          scale: isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: t.dot,
        }}
      />

      <div className="relative flex h-[460px] flex-col">
        {/* Card header */}
        <div className="flex items-start gap-3 p-5 md:p-6">
          <motion.span
            layout
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
              ${t.chip} ${t.text}
            `}
            animate={{
              scale: isActive ? 1 : 0.92,
            }}
            transition={{ duration: 0.35 }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </motion.span>

          <motion.div
            className="min-w-0"
            animate={{
              opacity: 1,
            }}
          >
            <motion.h3
              layout
              className={`
                font-heading font-extrabold text-[#111827]
                ${isActive ? "text-xl md:text-2xl" : "text-base md:text-lg"}
              `}
            >
              {title}
            </motion.h3>

            <motion.div
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? "auto" : 0,
                marginTop: isActive ? 8 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <p className="max-w-md text-sm leading-relaxed text-[#4B5563] md:text-base">
                {body}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          layout
          className="relative mx-4 mb-4 flex-1 overflow-hidden rounded-2xl"
          animate={{
            backgroundColor: isActive ? t.panel : "#F8FAFC",
          }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isActive ? 1 : 0.55,
              scale: isActive ? 1 : 0.92,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex h-full items-center justify-center p-5">
              <PillarVisual variant={variant} tone={tone} />
            </div>
          </motion.div>

          {/* Number displayed on inactive cards */}
          <motion.span
            className="absolute bottom-4 right-4 font-heading text-6xl font-black"
            animate={{
              opacity: isActive ? 0 : 0.06,
            }}
            style={{ color: t.dot }}
          >
            0{PILLARS.findIndex((pillar) => pillar.title === title) + 1}
          </motion.span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            height: isActive ? "auto" : 0,
            paddingBottom: isActive ? 24 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-6"
        >
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`
                  rounded-full px-3 py-1 text-xs font-bold
                  ${t.chip} ${t.text}
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Active progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1"
          initial={false}
          animate={{
            width: isActive ? "100%" : "0%",
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            width: {
              duration: isActive ? 4 : 0.2,
              ease: "linear",
            },
            opacity: {
              duration: 0.2,
            },
          }}
          style={{
            backgroundColor: t.dot,
          }}
        />
      </div>
    </motion.article>
  );
};

const AnimatedPillarCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PILLARS.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      {/* Desktop accordion */}
      <div
        className="mt-8 hidden h-[460px] gap-4 md:flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {PILLARS.map((pillar, index) => (
          <PillarCard
            key={pillar.title}
            {...pillar}
            isActive={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="mt-5 hidden items-center justify-center gap-2 md:flex">
        {PILLARS.map((pillar, index) => (
          <button
            key={pillar.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${pillar.title}`}
            className="flex h-5 items-center justify-center"
          >
            <motion.span
              animate={{
                width: activeIndex === index ? 32 : 8,
                opacity: activeIndex === index ? 1 : 0.3,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-2 rounded-full bg-[#153E75]"
            />
          </button>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:hidden">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
            }}
          >
            <PillarCard {...pillar} isActive onActivate={() => undefined} />
          </motion.div>
        ))}
      </div>
    </>
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
        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <Reveal>
              <Chapter number="02" label="A Smarter School Journey" />
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-[#111827] md:text-6xl">
                Every journey visible.
                <span className="block text-[#153E75]">
                  Every child protected.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={16}>
            <p className="max-w-md text-base leading-relaxed text-[#64748B] lg:pb-2 lg:text-lg">
              Small-group rides, doorstep pickups, live visibility and
              professionally verified drivers—all working together in one safer
              mobility system.
            </p>
          </Reveal>
        </div>

        {/* Stats / graph */}
        {/* <Reveal delay={0.1} className="mt-12">
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
        </Reveal> */}

        {/* Pillars */}
        <Reveal delay={0.1} y={28}>
          <PremiumFeatureShowcase />
        </Reveal>

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
        {/* <Reveal delay={0.05} className="mt-20">
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
        </div> */}

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
