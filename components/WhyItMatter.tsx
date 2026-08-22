"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Car, Bus, Clock, Sunrise, Palette, Bike, Heart } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Reveal helper ──────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Chapter header ─────────────────────────────────────────────────── */
function Chapter({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-display text-2xl md:text-3xl font-extrabold text-navy/40">
        {number}
      </span>
      <span className="h-px w-12 bg-navy/25" />
      <span className="inline-flex items-center gap-2 rounded-full bg-yellow/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-navy">
        {label}
      </span>
    </div>
  );
}

/* ─── Animated Route Concept SVG ─────────────────────────────────────── */
function RouteConcept() {
  const STOPS: [number, number][] = [
    [138, 214],
    [172, 186],
    [196, 142],
    [230, 112],
    [250, 90],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white p-5 md:p-6 shadow-[0_8px_30px_rgba(21,62,117,0.06)]"
    >
      {/* Header row */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy/70">
          The Route Difference
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 text-[11px] font-bold text-mint">
          <Clock className="h-3.5 w-3.5" strokeWidth={2.4} /> 30–50% less travel
          time
        </span>
      </div>

      {/* SVG Map */}
      <div className="relative mt-4 h-52 w-full">
        <svg
          viewBox="0 0 300 240"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow-blue" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="#153E75"
                floodOpacity="0.35"
              />
            </filter>
            <filter id="glow-red" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="#FF6B6B"
                floodOpacity="0.35"
              />
            </filter>
          </defs>

          {/* Traditional route — winding detour */}
          <path
            id="trad-route"
            d="M46 198 C 100 226, 160 218, 172 186 C 184 158, 150 150, 196 142 C 240 134, 210 96, 250 90 C 268 86, 238 60, 254 46"
            fill="none"
            stroke="#FF6B6B"
            strokeOpacity="0.6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 9"
          />

          {/* Pickup stops along traditional route */}
          {STOPS.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#fff"
              stroke="#FF6B6B"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="2.5;5;2.5"
                dur="1.8s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Direct Guardian Way route */}
          <path
            id="direct-route"
            d="M46 198 Q 118 78 254 46"
            fill="none"
            stroke="#153E75"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Traditional vehicle — slow, following detour */}
          <circle r="6" fill="#FF6B6B" filter="url(#glow-red)">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#trad-route" />
            </animateMotion>
          </circle>

          {/* Guardian Way cab — fast, direct */}
          <circle r="6.5" fill="#153E75" filter="url(#glow-blue)">
            <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto">
              <mpath href="#direct-route" />
            </animateMotion>
          </circle>

          {/* Home marker */}
          <g>
            <circle cx="46" cy="198" r="15" fill="#3cb995" />
            <path
              d="M39 199 L46 192.5 L53 199 M41 198.5 V205 H51 V198.5"
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="46"
              y="226"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#0f1b2d"
            >
              Home
            </text>
          </g>

          {/* School marker */}
          <g>
            <circle cx="254" cy="46" r="15" fill="#153E75" />
            <path
              d="M247 48 L254 44 L261 48 L254 52 Z M254 52 V56"
              fill="none"
              stroke="#FFC83D"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="254"
              y="20"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#0f1b2d"
            >
              School
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="relative flex flex-col gap-2 mt-10">
        <div className="flex items-center gap-2.5 rounded-xl bg-[#FFF1F1] border border-[#FFD9D9] px-3 py-2">
          <Bus className="h-4 w-4 text-[#FF6B6B] shrink-0" strokeWidth={2} />
          <span className="text-xs font-semibold text-ink leading-snug">
            Traditional: many stops, constant detours, overcrowded
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-[#EAF1FB] border border-navy/15 px-3 py-2">
          <Car className="h-4 w-4 text-navy shrink-0" strokeWidth={2} />
          <span className="text-xs font-semibold text-ink leading-snug">
            Guardian Way: max 7 seats, direct home-to-school
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Image Carousel ─────────────────────────────────────────────────── */
const CAROUSEL_IMAGES = [
  {
    src: "/c2.jpeg",
    alt: "A child and parent playing a board game together at home",
  },
  {
    src: "/c3.webp",
    alt: "A girl playing football on the grass at golden hour",
  },
  { src: "/c4.jpeg", alt: "A boy painting on a canvas at an easel" },
  { src: "/c1.webp", alt: "A girl painting with watercolours by the window" },
];

function ChildhoodCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % CAROUSEL_IMAGES.length),
      3500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full min-h-[320px] md:min-h-[380px] overflow-hidden rounded-3xl border border-line shadow-[0_8px_30px_rgba(21,62,117,0.08)] bg-card">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={CAROUSEL_IMAGES[index].src}
          alt={CAROUSEL_IMAGES[index].alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Benefit Cards ──────────────────────────────────────────────────── */
const BENEFITS = [
  { icon: Sunrise, label: "More Time Every Morning" },
  { icon: Palette, label: "Discover New Hobbies" },
  { icon: Bike, label: "More Playtime" },
  { icon: Heart, label: "More Family Time" },
];

function BenefitCardsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start 85%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Sequential golden ambient light opacity transforms directly bound to scroll progress (remains lit)
  const c1Ambient = useTransform(smoothProgress, [0.0, 0.25], [0, 1]);
  const c2Ambient = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);
  const c3Ambient = useTransform(smoothProgress, [0.4, 0.65], [0, 1]);
  const c4Ambient = useTransform(smoothProgress, [0.6, 0.85], [0, 1]);

  const ambientGlows = [c1Ambient, c2Ambient, c3Ambient, c4Ambient];

  return (
    <div ref={cardsRef} className="order-1 md:order-2 md:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
      {BENEFITS.map((b, i) => (
        <motion.div
          key={b.label}
          whileHover={{ scale: 1.02 }}
          className="group relative h-full overflow-hidden rounded-2xl border border-[#E6EEF9] bg-white p-4 sm:p-6 transition-transform duration-200"
        >
          {/* Golden Ambient Light backdrop (controlled by scroll progress) */}
          <motion.div
            style={{ opacity: ambientGlows[i] }}
            className="pointer-events-none absolute -inset-4 bg-gradient-to-tr from-[#FFC83D]/30 via-[#FFC83D]/15 to-transparent rounded-2xl blur-xl"
          />

          {/* Golden Corner Ambient Orb */}
          <motion.div
            style={{ opacity: ambientGlows[i] }}
            className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#FFC83D]/40 blur-2xl"
          />

          {/* Card Content */}
          <div className="relative z-10">
            <span
              className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FFC83D]/25 text-navy transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[#FFC83D]"
              style={{ animation: `iconFloat 3s ease-in-out ${i * 0.4}s infinite` }}
            >
              <b.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#153E75]" strokeWidth={2} />
            </span>
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base font-bold leading-snug text-[#111827] transition-colors duration-300 group-hover:text-[#153E75]">
              {b.label}
            </p>
            <span className="mt-1.5 sm:mt-2 block h-0.5 w-0 bg-[#FFC83D] transition-all duration-300 ease-out group-hover:w-10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main Section Export ────────────────────────────────────────────── */
export default function WhyItMatter() {
  return (
    <section
      id="why-it-matters"
      className="relative py-24 md:py-32 scroll-mt-[-40px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Chapter header */}
        <Reveal>
          <Chapter number="01" label="Why It Matters" />
        </Reveal>

        {/* Two-column: heading + route map */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: heading + copy */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-ink">
                What if your child spent{" "}
                <span className="block mt-2 text-4xl md:text-6xl text-navy">
                  less time commuting?
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-base md:text-lg text-ink-soft leading-relaxed">
                Less time on the road. More time for learning, rest, and family.{" "}
                <span className="font-bold text-navy">
                  That&apos;s the Guardian Way.
                </span>
              </p>
            </Reveal>
          </div>

          {/* Right: image carousel */}
          <Reveal delay={0.15}>
            <ChildhoodCarousel />
          </Reveal>
        </div>

        {/* Bottom: benefit cards + route concept graph */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Benefit cards (Order 1 on mobile, Order 2 on desktop) */}
          <BenefitCardsSection />

          {/* Route Concept graph (Order 2 on mobile, Order 1 on desktop) */}
          <Reveal className="order-2 md:order-1 md:col-span-5" y={24}>
            <RouteConcept />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

