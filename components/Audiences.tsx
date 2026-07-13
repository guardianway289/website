"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const TABS = [
  {
    key: "schools",
    label: "For Schools",
    icon: "ph:graduation-cap-bold",
    heading: "A transportation partner your school can stand behind",
    desc: "We work hand-in-hand with schools to deliver safe, professional transport that reflects your standards of care.",
    points: [
      { icon: "ph:chart-line-down-bold", text: "Fewer transport complaints reaching your office" },
      { icon: "ph:check-square-offset-bold", text: "Digital attendance &amp; check-in/out monitoring" },
      { icon: "ph:squares-four-bold", text: "A live transportation dashboard for your admin team" },
      { icon: "ph:user-circle-bold", text: "A dedicated relationship manager, always reachable" },
      { icon: "ph:file-text-bold", text: "Compliance-ready digital reports on demand" },
    ],
    cta: "Explore School Partnerships",
  },
  {
    key: "drivers",
    label: "Driver Partners",
    icon: "ph:steering-wheel-bold",
    heading: "Drive with purpose, earn with dignity",
    desc: "Join a fleet built on training, respect, and steady income &mdash; ferrying children who depend on you.",
    points: [
      { icon: "ph:currency-inr-bold", text: "Predictable weekly income on fixed short routes" },
      { icon: "ph:shield-plus-bold", text: "Vehicle &amp; personal insurance coverage" },
      { icon: "ph:chalkboard-teacher-bold", text: "Child-safety training before your first ride" },
      { icon: "ph:seal-check-bold", text: "Transparent verification &amp; onboarding process" },
    ],
    cta: "Apply as a Driver Partner",
  },
  {
    key: "investors",
    label: "Investors",
    icon: "ph:chart-line-up-bold",
    heading: "A scalable platform in an under-served market",
    desc: "Not another cab aggregator &mdash; a recurring-revenue mobility layer built specifically for school commutes.",
    points: [
      { icon: "ph:buildings-bold", text: "Large addressable market across urban school districts" },
      { icon: "ph:map-trifold-bold", text: "City-by-city expansion playbook, route-density led" },
      { icon: "ph:repeat-bold", text: "Recurring subscription revenue with high retention" },
      { icon: "ph:cpu-bold", text: "Proprietary routing, tracking &amp; safety technology stack" },
    ],
    cta: "Request Investor Deck",
  },
];

export default function Audiences() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section id="schools" className="py-24">
      <div className="container-gr">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-mint">
            Beyond the Ride
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px]">
            Built for everyone the school run touches
          </h2>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-line bg-card p-1.5">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors ${
                  active === i ? "bg-navy text-white" : "text-ink-soft hover:text-navy"
                }`}
              >
                <Icon icon={t.icon} className="text-[16px]" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-10 rounded-[28px] border border-line bg-white p-8 lg:grid-cols-2 lg:p-12"
          >
            <div>
              <h3 className="font-display text-[24px] font-extrabold text-navy-deep text-balance">
                {tab.heading}
              </h3>
              <p
                className="mt-4 text-[15px] leading-relaxed text-ink-soft"
                dangerouslySetInnerHTML={{ __html: tab.desc }}
              />
              <a
                href="#trial"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3.5 text-[14px] font-bold text-navy-deep"
              >
                {tab.cta}
                <Icon icon="ph:arrow-right-bold" />
              </a>
            </div>
            <div className="grid content-start gap-3">
              {tab.points.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-3 rounded-xl bg-card px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy">
                    <Icon icon={p.icon} className="text-[17px]" />
                  </span>
                  <span
                    className="text-[14px] font-medium text-ink"
                    dangerouslySetInnerHTML={{ __html: p.text }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
