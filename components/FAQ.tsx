"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

const FAQS = [
  {
    q: "How are drivers verified?",
    a: "Every driver undergoes police verification, document checks, a driving assessment, and behavior screening before onboarding, followed by continuous performance monitoring.",
  },
  {
    q: "Can I track my child's ride?",
    a: "Yes. You get live GPS tracking and dashcam access from pickup to drop, plus instant alerts at every step.",
  },
  {
    q: "What happens if the driver is late?",
    a: "You're notified immediately of any delay due to traffic, weather, or unforeseen circumstances, with live updates until pickup.",
  },
  {
    q: "How is payment handled?",
    a: "Payments are collected as a transparent, fixed monthly fee through secure digital payment in the app.",
  },
  {
    q: "Is the ride insured?",
    a: "Yes, every vehicle and driver partner is covered under our insurance policy for added protection.",
  },
  {
    q: "How are routes decided?",
    a: "Routes are optimized by locality with only 6–7 children per van, keeping the path as direct as possible from home to school.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14">
      <div className="container-gr max-w-3xl">
        <div className="text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-mint">
            Questions
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px]">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 divide-y divide-line rounded-2xl border border-line bg-white">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-bold text-navy-deep">{f.q}</span>
                  <Icon
                    icon="ph:caret-down-bold"
                    className={`shrink-0 text-navy transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
