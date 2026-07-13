"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const PROBLEMS = [
  "Hours lost on long, indirect bus routes",
  "Rising, unpredictable transport costs",
  "No visibility into where your child is",
  "Unsafe or chaotic stop-and-go pickups",
];

const SOLUTIONS = [
  "Direct routing cuts travel time by 30–50%",
  "Transparent, fixed monthly pricing",
  "Live GPS &amp; dashcam feed, anytime",
  "Doorstep pickup with only 6–7 children per van",
];

export default function ProblemSolution() {
  return (
    <section className="py-24">
      <div className="container-gr">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-mint">
            The Old Way vs. Guardian Way
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px] text-balance">
            Is this your current school-run situation?
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-line bg-white p-8"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-coral/10 px-3.5 py-1.5 text-[12.5px] font-bold text-coral">
              <Icon icon="ph:x-circle-bold" /> Without Guardian Way
            </div>
            <ul className="space-y-4">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Icon icon="ph:x-bold" className="mt-1 shrink-0 text-coral" />
                  <span className="text-[15px] text-ink-soft">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl border border-navy bg-navy p-8 shadow-[0_25px_55px_-25px_rgba(21,62,117,0.55)]"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-mint/20 px-3.5 py-1.5 text-[12.5px] font-bold text-mint">
              <Icon icon="ph:check-circle-bold" /> With Guardian Way
            </div>
            <ul className="space-y-4">
              {SOLUTIONS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Icon icon="ph:check-bold" className="mt-1 shrink-0 text-yellow" />
                  <span
                    className="text-[15px] text-white/90"
                    dangerouslySetInnerHTML={{ __html: s }}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
