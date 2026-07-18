"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const STEPS = [
  { icon: "ph:user-plus-bold", title: "Register Child", desc: "Add your child &amp; pickup point in minutes." },
  { icon: "ph:identification-card-bold", title: "Driver Assigned", desc: "A verified driver is matched to your route." },
  { icon: "ph:gps-fix-bold", title: "Live Tracking", desc: "Watch the van approach in real time." },
  { icon: "ph:hand-waving-bold", title: "Pickup Confirmation", desc: "Instant alert the moment they board." },
  { icon: "ph:door-open-bold", title: "Drop Confirmation", desc: "Confirmed arrival at school gate." },
  { icon: "ph:bell-simple-ringing-bold", title: "Parent Notification", desc: "Every step, straight to your phone." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="container-gr">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-navy-soft">
            How Guardian Way Works
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px]">
            Six steps, start to finish
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-[3px] bg-gradient-to-r from-navy/10 via-navy/25 to-navy/10 lg:block" />
          <div className="grid gap-8 lg:grid-cols-6 lg:gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-navy shadow-[0_10px_25px_-10px_rgba(15,27,45,0.2)] border border-line">
                  <Icon icon={s.icon} className="text-[26px]" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-[11px] font-extrabold text-navy-deep">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-bold text-navy-deep">
                  {s.title}
                </h3>
                <p
                  className="mt-1.5 text-[13px] leading-relaxed text-ink-soft"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
