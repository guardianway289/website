import { useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";
import {
  Users, Home, Radar, ShieldCheck, MapPin, Video, Route,
  BadgeCheck, Car, Smartphone, BellRing, Sparkles, ChevronDown,
  CheckCircle2, Play, Pause, Phone, Mail, MapPinned, type LucideIcon,
} from "lucide-react";
import { Reveal, Chapter, Counter } from "./Reveal";
import HeroDevice from "./HeroDevice";
import Image from "next/image";

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
  details: string[];
  span: string;
  tint: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Users,
    title: "Small Groups, Less Travel Time",
    body: "Optimized rides with only 6–7 students. No overcrowding, direct routing and 30–50% less time on the road.",
    details: [
      "No overcrowding — every child enjoys a comfortable ride.",
      "Direct routing from your locality to school, cutting travel time by up to 30–50%.",
      "More time in the morning to prepare your child without rushing.",
      "Earlier drop-offs, giving children more time to relax, do homework, or play.",
    ],
    span: "md:col-span-7",
    tint: "bg-[#FFF4D6] text-[#153E75]",
  },
  {
    icon: Home,
    title: "Home Pick-up",
    body: "Direct pick-up & drop right from your home. No waiting at bus stops — a smoother start for working parents.",
    details: [
      "Direct pick-up and drop-off from your doorstep.",
      "No waiting at the bus stops.",
      "Saves valuable time for working parents and helps ensure a smoother start to the day.",
    ],
    span: "md:col-span-5",
    tint: "bg-[#E4F7F1] text-[#42C7A1]",
  },
  {
    icon: Radar,
    title: "Complete Visibility",
    body: "Real-time GPS, live dashcam feeds inside & outside the vehicle, and instant delay notifications.",
    details: [
      "Real-time GPS tracking for parents.",
      "Access to live dashcam feeds from inside and outside the vehicle.",
      "Immediate notifications in case of delays due to traffic, weather, or unforeseen circumstances.",
      "Transparent communication through live updates, for complete peace of mind.",
    ],
    span: "md:col-span-5",
    tint: "bg-[#EAF1FB] text-[#153E75]",
  },
  {
    icon: ShieldCheck,
    title: "Safety Starts with the Driver",
    body: "Police-verified, professionally trained drivers, AI-monitored performance and emergency vehicle immobilization.",
    details: [
      "Comprehensive background verification and police checks before onboarding.",
      "Continuous driver performance monitoring through AI-powered dashcams and parent feedback.",
      "Professionally trained drivers focused on child safety and responsible driving.",
      "Emergency vehicle immobilization capability for enhanced security.",
    ],
    span: "md:col-span-7",
    tint: "bg-[#E4F7F1] text-[#42C7A1]",
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

const StatRow = ({ label, guardian, traditional, max, unit = "" }: StatRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="py-5">
      <p className="text-sm font-bold text-[#111827] mb-3">{label}</p>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs font-bold text-[#153E75]">Guardian Ride</span>
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
          <span className="w-28 shrink-0 text-xs font-semibold text-[#9CA6B4]">Traditional Bus</span>
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

/* ---------- Expandable pillar card ---------- */

const PillarCard = ({ icon: Icon, title, body, details }: Pillar) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="group h-full rounded-3xl gw-card p-8 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(21,62,117,0.1)] transition-all">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4D6] text-[#153E75] group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-6 font-heading text-2xl font-extrabold text-[#111827]">{title}</h3>
      <p className="mt-3 text-[#4B5563] leading-relaxed max-w-lg">{body}</p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#153E75] hover:text-[#42C7A1] transition-colors"
        aria-expanded={open}
      >
        {open ? "Hide details" : "See how it works"}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="mt-4 space-y-2.5 pt-4 border-t border-[#EEF3FA]">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#42C7A1]" strokeWidth={2} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
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
          <span className="text-xs font-bold text-[#153E75]">Guardian Ride</span>
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
            <text x="42" y="34" fontSize="9" fill="#153E75" fontWeight="700">Home</text>
          </g>
          <g>
            <circle cx="190" cy="270" r="7" fill="#FFC83D" />
            <text x="150" y="288" fontSize="9" fill="#153E75" fontWeight="700">School</text>
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
            <p className="text-xs font-bold text-[#111827]">Arriving in 4 min</p>
            <p className="text-[10px] text-[#9CA6B4]">Van #GR-014 · Driver verified</p>
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
    <div className="relative h-full rounded-3xl overflow-hidden border border-[#E6EEF9] shadow-[0_8px_30px_rgba(21,62,117,0.06)] bg-black group min-h-[280px] md:min-h-[420px]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1200"
        muted
        loop
        playsInline
        onClick={toggle}
        onEnded={() => setPlaying(false)}
        // TODO: replace with your own clip, e.g. src="/videos/guardian-ride-demo.mp4"
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
          {playing ? <Pause className="h-7 w-7" strokeWidth={2} /> : <Play className="h-7 w-7 translate-x-0.5" strokeWidth={2} />}
        </span>
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">
        {/* <p className="text-xs font-bold uppercase tracking-widest text-[#FFC83D]">60-second walkthrough</p>
        <h3 className="mt-1 font-heading text-lg md:text-xl font-extrabold text-white max-w-xs">
          See a Guardian Ride pick-up, start to finish
        </h3> */}
      </div>
    </div>
  );
};

/* ---------- Contact CTA ---------- */

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
        <Reveal><Chapter number="02" label="Why Guardian Ride Is Different" /></Reveal>
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
              <StatRow label="Students sharing one ride" guardian={7} traditional={35} max={35} />
              <StatRow label="Avg. commute time (minutes)*" guardian={25} traditional={50} max={50} unit=" min" />
            </div>
            <p className="mt-2 text-xs text-[#9CA6B4]">
              *Estimated from typical Gurugram routes; actual time depends on distance and traffic.
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
                {/* <LiveTrackingMock /> */}
                <HeroDevice/>
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
                <t.icon className="h-6 w-6 text-[#153E75] group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                <p className="mt-4 text-sm font-semibold leading-snug text-[#111827]">{t.title}</p>
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#FFC83D]">Trusted Partners for Institutions</p>
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

        {/* Contact CTA */}
        {/* <Reveal delay={0.05} className="mt-20">
          <div className="rounded-3xl bg-[#0F2E56] p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT.map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FFC83D]">
                  <c.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{c.label}</p>
                  <p className="mt-0.5 font-bold text-white">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal> */}
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-[#E6EEF9] bg-white py-6">
        <style>{`
          @keyframes gw-marquee-ltr {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0%); }
          }
          .gw-marquee-track {
            display: flex;
            width: max-content;
            animation: gw-marquee-ltr 28s linear infinite;
          }
          .gw-marquee-track:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .gw-marquee-track { animation: none; }
          }
        `}</style>
        <div className="gw-marquee-track">
          {[...PARTNER_VALUES, ...PARTNER_VALUES].map((v, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-heading text-xl md:text-2xl font-extrabold text-[#153E75] px-8">
              {v}
              <span className="mx-8 text-[#FFC83D]">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};