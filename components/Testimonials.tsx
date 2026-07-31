"use client";

import { Icon } from "@iconify/react";
import { useRef, useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  tag: string;
  rating: number;
  initials: string;
  badge: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Malhotra",
    role: "Parent of 8yo",
    location: "DLF Phase 5, Gurgaon",
    quote:
      "The moment you said I'd be able to see the van live on a map with precise ETA, I was sold. Commuting on Golf Course Road during school hours used to be a complete black box.",
    tag: "Live Map Tracking",
    rating: 5,
    initials: "PM",
    badge: "Early Access Parent",
  },
  {
    name: "Rohit Sharma",
    role: "Parent of 10yo",
    location: "Sector 56, Gurgaon",
    quote:
      "Six or seven kids in a dedicated, vetted van instead of thirty overcrowded on an unmonitored bus? That alone convinced our family to switch on day one.",
    tag: "Small Batches",
    rating: 5,
    initials: "RS",
    badge: "Verified Parent",
  },
  {
    name: "Anjali Verma",
    role: "Working Mother",
    location: "Sohna Road, Gurgaon",
    quote:
      "Doorstep pick-up means one less stressful trip across Gurgaon traffic every morning. I didn't realise how much time it saves until we tried it.",
    tag: "Doorstep Pick-up",
    rating: 5,
    initials: "AV",
    badge: "Verified Parent",
  },
  {
    name: "Dr. Vikram Rao",
    role: "Father of 2",
    location: "Nirvana Country, Gurgaon",
    quote:
      "The real-time driver background checks and female attendant aboard every single ride sealed the deal for us. My daughter feels 100% safe.",
    tag: "Vetted Staff & Nanny",
    rating: 5,
    initials: "VR",
    badge: "Verified Parent",
  },
  {
    name: "Kavita Krishnan",
    role: "Parent of 7yo",
    location: "Sushant Lok 1, Gurgaon",
    quote:
      "Instant push notifications when she gets picked up and dropped inside the school gate mean I can focus at work in Cyber City without constantly worrying.",
    tag: "Gate-to-Gate Alerts",
    rating: 5,
    initials: "KK",
    badge: "Verified Parent",
  },
  {
    name: "Sameer Joshi",
    role: "Tech Lead & Dad",
    location: "Golf Course Ext, Gurgaon",
    quote:
      "The dedicated SOS button and strict speed governor tracking built directly into the parent app show how seriously Guardian Way takes security.",
    tag: "Speed Control & SOS",
    rating: 5,
    initials: "SJ",
    badge: "Early Access Parent",
  },
  {
    name: "Meera Nambiar",
    role: "Parent of 2 kids",
    location: "Sector 48, Gurgaon",
    quote:
      "Shared AC cabs with fixed route optimization reduced my kids' daily transit time to school from 60 minutes down to just 20 minutes each way!",
    tag: "Express Route",
    rating: 5,
    initials: "MN",
    badge: "Verified Parent",
  },
  {
    name: "Rajesh Nair",
    role: "Parent of 9yo",
    location: "Sector 82, Gurgaon",
    quote:
      "Flexible leave pauses in the app mean we don't pay when we take family vacations. The transparent billing model is a breath of fresh air.",
    tag: "Flexible Billing",
    rating: 5,
    initials: "RN",
    badge: "Verified Parent",
  },
  {
    name: "Sunita Menon",
    role: "Mother of 6yo",
    location: "DLF Phase 4, Gurgaon",
    quote:
      "The driver is polite, punctual to the exact minute, and the app lets me communicate with the ride manager seamlessly without sharing private numbers.",
    tag: "Private Comm",
    rating: 5,
    initials: "SM",
    badge: "Verified Parent",
  },
  {
    name: "Aman Preet Singh",
    role: "Parent of 11yo",
    location: "Sector 50, Gurgaon",
    quote:
      "Knowing my son is buckled up with speed limits enforced and live CCTV streaming available makes Guardian Way worth every single rupee.",
    tag: "Smart Safety Cabs",
    rating: 5,
    initials: "AS",
    badge: "Verified Parent",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }

    // Near the end of horizontal scroll
    if (scrollPosition >= maxScroll - 20) {
      setActiveIndex(TESTIMONIALS.length - 1);
      return;
    }

    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24 // 24px gap-6
      : 380;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), TESTIMONIALS.length - 1));
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 380;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 10) {
        // Loop back to start smoothly
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 10) {
        // Loop to end smoothly
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 380;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (index === TESTIMONIALS.length - 1) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      const targetLeft = index * cardWidth;
      container.scrollTo({
        left: Math.min(targetLeft, maxScroll),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container-gr">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-navy-soft">
              Early Voices
            </span>
            <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[40px] max-w-2xl leading-tight">
              What parents said when we shared the idea
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-bold text-ink-soft mr-2">
              <span className="text-navy-deep font-extrabold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => scroll("left")}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy-deep shadow-xs hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              <Icon icon="ph:caret-left-bold" className="text-lg" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy-deep shadow-xs hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              <Icon icon="ph:caret-right-bold" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-12 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 scrollbar-none  px-6  sm:px-8  md:px-8  lg:px-12"
        >
          {TESTIMONIALS.map((q, i) => (
            <div
              key={`${q.name}-${i}`}
              className="w-[88vw] sm:w-[380px] lg:w-[410px] shrink-0 snap-start rounded-2xl border border-line/80 bg-white p-7 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(21,62,117,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(21,62,117,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Card Top Accent Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-navy via-navy-soft to-mint absolute top-0 left-0 opacity-80 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(q.rating)].map((_, s) => (
                      <Icon
                        key={s}
                        icon="ph:star-fill"
                        className="text-base text-yellow"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-mint bg-mint-soft/80 px-2.5 py-0.5 rounded-full">
                    <Icon icon="ph:seal-check-fill" className="text-xs" />
                    {q.badge}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="mt-5 relative">
                  <Icon
                    icon="ph:quotes-fill"
                    className="text-3xl text-navy/10 absolute -top-2 -left-1 group-hover:text-yellow/30 transition-colors pointer-events-none"
                  />
                  <p className="text-[14.5px] leading-relaxed font-medium text-navy-deep relative z-10 pl-2">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="mt-8 pt-5 border-t border-line/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy via-navy-soft to-navy text-white font-extrabold text-xs tracking-wider shadow-inner shrink-0">
                    {q.initials}
                  </div>
                  <div>
                    <div className="text-[14px] font-extrabold text-navy-deep leading-tight">
                      {q.name}
                    </div>
                    <div className="text-[12px] font-medium text-ink-soft mt-0.5">
                      {q.role} &bull; {q.location}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-navy-soft bg-navy/[0.05] border border-navy/10 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 hidden sm:inline-block">
                  {q.tag}
                </span>
              </div>
            </div>
          ))}

          {/* Right Spacer for Desktop End Snap */}
          <div
            className="w-1 md:w-20 shrink-0 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Carousel Progress & Dots */}
        <div className="mt-4 flex items-center justify-between">
          {/* Progress Line */}
          <div className="hidden sm:block flex-1 max-w-xs h-1.5 bg-navy/10 rounded-full overflow-hidden mr-4">
            <div
              className="h-full bg-gradient-to-r from-navy to-mint transition-all duration-300 rounded-full"
              style={{
                width: `${((activeIndex + 1) / TESTIMONIALS.length) * 100}%`,
              }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-1.5 mx-auto sm:mx-0">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? "w-6 bg-navy"
                    : "w-2 bg-navy/20 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
