"use client";

import { motion, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const floatUp: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatDown: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5,
    },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;
const LINES = ["Student", "Transportation,", "Reimagined."];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-30 pb-16 lg:pt-39 lg:pb-24 min-h-[90vh]"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#fffbf4] via-[#fafbfd] to-[#f5f9fc]" />
      </div>

      <div className="container-gr grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-28 items-center">
        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <h1 className="font-heading font-extrabold tracking-tight leading-[1.12] text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] text-[#111827]">
              {LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.1 + i * 0.12 }}
                  >
                    {i === 2 ? (
                      <span className="bg-gradient-to-r from-[#153E75] via-[#1D5FA8] to-[#E9A81B] bg-clip-text text-transparent">
                        Reimagined.
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-bold text-navy"
          >
            <span>Safe Rides.</span>
            <span className="text-yellow font-extrabold text-[18px]">•</span>
            <span>Happy Kids.</span>
            <span className="text-yellow font-extrabold text-[18px]">•</span>
            <span>Peace of Mind.</span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-[500px] text-[16px] leading-relaxed text-ink-soft font-medium"
          >
            Premium student transportation, designed to save time.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(21,62,117,0.4)] transition-all hover:bg-navy-deep hover:-translate-y-0.5"
            >
              Get In Touch
              <Icon icon="ph:arrow-right-bold" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-[15px] font-bold text-navy shadow-sm transition-all hover:bg-bg/50 hover:-translate-y-0.5"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-4"
          >
            {[
              { n: "Max 7", l: "students per XL Cab" },
              { n: "30&ndash;50%", l: "less travel time" },
              { n: "100%", l: "safety & verified drivers" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="font-display text-[26px] font-extrabold text-navy-deep leading-tight"
                  dangerouslySetInnerHTML={{ __html: s.n }}
                />
                <div className="text-[13px] font-medium text-ink-soft mt-0.5">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: kids image and floating badges */}
        <div className="relative mx-auto w-full max-w-150 lg:max-w-none pt-8 lg:pt-0">
          {/* Ambient colorful glow behind the image */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#3cb995]/15 via-[#153e75]/10 to-[#ffc83d]/20 rounded-[40px] blur-3xl opacity-75 -z-10" />

          {/* Main Image Container */}
          <div className="relative rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(15,27,45,0.12)]">
            <img
              src="https://images.pexels.com/photos/4473498/pexels-photo-4473498.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Happy kids sitting safely buckled inside a car"
              className="w-full lg:aspect-[1.12] object-cover rounded-[32px]"
            />
          </div>

          {/* Badge 1: Verified & Safe (Top Left) */}
          <motion.div
            variants={floatUp}
            animate="animate"
            className="absolute -left-6 top-[15%] flex items-center gap-3 rounded-2xl border border-line/40 bg-white/95 p-3.5 shadow-[0_20px_40px_rgba(15,27,45,0.1)] backdrop-blur-sm sm:-left-10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
              <Icon icon="ph:shield-check-fill" className="text-[22px]" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-navy-deep leading-tight">
                Verified & Safe
              </div>
              <div className="text-[11px] font-medium text-ink-soft mt-0.5 leading-tight font-body">
                Buckled up, every ride
              </div>
            </div>
          </motion.div>

          {/* Badge 2: Up to 50% less (Bottom Right) */}
          <motion.div
            variants={floatDown}
            animate="animate"
            className="absolute -right-4 bottom-[12%] flex items-center gap-3 rounded-2xl border border-line/40 bg-white/95 p-3.5 shadow-[0_20px_40px_rgba(15,27,45,0.1)] backdrop-blur-sm sm:-right-8"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow-deep">
              <Icon icon="ph:clock-fill" className="text-[22px]" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-navy-deep leading-tight font-display">
                Up to 50% less
              </div>
              <div className="text-[11px] font-medium text-ink-soft mt-0.5 leading-tight font-body">
                travel time
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
