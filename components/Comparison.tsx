"use client";

import { useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { X, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { Reveal } from "./Reveal";

const OPTIONS = [
  {
    icon: "ion:car-outline",
    code: "ROUTE_A",
    title: "Private Van",
    status: "Unverified",
    subtitle: "Often chosen because it's convenient.",
    concern: "lack of safety transparency",
    impact: 4,
    tone: {
      accent: "#EF4444",
      bg: "#FEF2F2",
      border: "#FEE2E2",
      tagBg: "#FEE2E2",
      tagText: "#991B1B",
      glow: "rgba(239,68,68,0.16)",
    },
    points: [
      "Usually unregulated & unverified",
      "Little or no live safety monitoring",
      "Driver verification isn't transparent",
    ],
  },
  {
    icon: "ion:bus-outline",
    code: "ROUTE_B",
    title: "Traditional School Bus",
    status: "Fixed schedule",
    subtitle: "Reliable for many schools — but not every family.",
    concern: "wasted travel and wait time",
    impact: 3,
    tone: {
      accent: "#F59E0B",
      bg: "#FFFBEB",
      border: "#FEF3C7",
      tagBg: "#FEF3C7",
      tagText: "#92400E",
      glow: "rgba(245,158,11,0.16)",
    },
    points: [
      "Long winding routes with multiple stops",
      "Large number of students per ride",
      "Extra 45–90 minutes lost travel time",
      "Stressful waiting at bus stops",
    ],
  },
  {
    icon: "ion:person-outline",
    code: "ROUTE_C",
    title: "Parent Drop-off",
    status: "Manual only",
    subtitle: "The safest option — but not always practical.",
    concern: "daily disruption and stress",
    impact: 2,
    tone: {
      accent: "#8B5CF6",
      bg: "#F5F3FF",
      border: "#EDE9FE",
      tagBg: "#EDE9FE",
      tagText: "#5B21B6",
      glow: "rgba(139,92,246,0.16)",
    },
    points: [
      "Takes parents' time twice every day",
      "Difficult for working or busy families",
      "Traffic jams & school gate parking stress",
    ],
  },
];

const IMPACT_MAX = 4;

export const Comparison = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth : 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(Math.max(index, 0), OPTIONS.length - 1));
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const children = el.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#F3F8FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
            Parents deserve better choices
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-4 max-w-xl text-[16px] text-[#4B5563] leading-relaxed">
            Today, most families have to choose between options that compromise either safety, comfort, or time.
          </p>
        </Reveal>

        {/* Carousel / Grid Section */}
        <div className="relative mt-12">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 md:mx-0 px-6 md:px-0 pb-6 md:pb-0 scroll-pl-6 scroll-pr-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {OPTIONS.map((opt, i) => (
              <div
                key={opt.title}
                className="snap-start shrink-0 w-[82vw] sm:w-[72vw] md:w-auto h-full first:ml-6 md:first:ml-0 last:mr-6 md:last:mr-0"
              >
                <Reveal delay={0.08 + i * 0.08} y={24} className="h-full">
                  <div
                    className="group relative h-full flex flex-col justify-between overflow-hidden rounded-[28px] bg-white border border-[#E6EEF9] border-l-4 shadow-[0_8px_30px_rgba(21,62,117,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(21,62,117,0.14)]"
                    style={{ borderLeftColor: opt.tone.accent }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${opt.tone.accent}55`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E6EEF9")}
                  >
                    {/* Signature: ambient corner glow, intensifies on hover */}
                    <div
                      className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ backgroundColor: opt.tone.glow }}
                    />

                    {/* Impact meter */}
                    {/* <div className="relative flex gap-1 px-6 pt-6 sm:px-7 sm:pt-7 md:px-8 md:pt-8">
                      {Array.from({ length: IMPACT_MAX }).map((_, seg) => (
                        <span
                          key={seg}
                          className="h-1 flex-1 rounded-full transition-colors duration-300"
                          style={{ backgroundColor: seg < opt.impact ? opt.tone.accent : "#EEF2F7" }}
                        />
                      ))}
                    </div> */}

                    <div className="relative p-6 pt-5 sm:p-7 sm:pt-6 md:p-8 md:pt-6 flex flex-col justify-between flex-1">
                      <div>
                        {/* Eyebrow: system id + live status */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                         
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: opt.tone.tagBg, color: opt.tone.tagText }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: opt.tone.accent }}
                            />
                            {opt.status}
                          </span>
                        </div>

                        {/* Header: Iconify icon + title */}
                        <div className="flex items-start gap-3.5">
                          <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                            style={{ backgroundColor: opt.tone.bg, border: `1px solid ${opt.tone.border}` }}
                          >
                            <Icon icon={opt.icon} width={24} height={24} style={{ color: opt.tone.accent }} />
                          </span>
                          <div className="flex-1 min-w-0 pt-1">
                            <h3 className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-[#111827] truncate">
                              {opt.title}
                            </h3>
                            <p className="mt-1 text-[13.5px] text-[#6B7280] italic leading-relaxed">
                              {opt.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="my-5 border-t border-dashed border-[#E6EEF9]" />

                        <ul className="space-y-3">
                          {opt.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                                style={{ backgroundColor: opt.tone.bg, color: opt.tone.accent, border: `1px solid ${opt.tone.border}` }}
                              >
                                <X className="h-3 w-3 stroke-[2.5]" />
                              </span>
                              <span className="text-[14px] sm:text-[14.5px] font-medium text-[#374151] leading-snug">
                                {pt}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#F3F4F6]">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: opt.tone.accent }} />
                          <code className="font-mono text-[11.5px] font-semibold truncate" style={{ color: opt.tone.accent }}>
                            {opt.concern}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Mobile Controls: Prev / Dots / Next */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-5">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous comparison card"
              className="flex h-15 w-15 items-center justify-center rounded-full border border-[#E6EEF9] bg-white text-[#153E75] shadow-[0_4px_14px_rgba(21,62,117,0.08)] transition-opacity disabled:opacity-30"
            >
              <ChevronLeft className="h-11 w-11" />
            </button>

            <div className="flex items-center gap-2">
              {OPTIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to comparison slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-4 bg-[#153E75]" : "w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next comparison card"
              className="flex h-15 w-15 items-center justify-center rounded-full border border-[#E6EEF9] bg-white text-[#153E75] shadow-[0_4px_14px_rgba(21,62,117,0.08)] transition-opacity disabled:opacity-30"
            >
              <ChevronRight className="h-11 w-11" />
            </button>
          </div>
        </div>

        {/* Divider + fourth choice reveal */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center">
            <span className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#153E75]/20 to-transparent" />
            <h3 className="mt-10 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-center text-[#111827]">
              There should be a <span className="text-[#153E75]">fourth choice.</span>
            </h3>
            <p className="mt-5 max-w-3xl text-center text-[16px] text-[#4B5563] leading-relaxed">
              One that doesn&apos;t ask you to compromise on safety, time, or convenience. That&apos;s exactly what we built.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};