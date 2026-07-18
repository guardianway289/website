"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Reveal, Chapter } from "./Reveal";

const PROMISE_TABS = [
  {
    key: "child",
    label: "I'm a Child",
    icon: "ph:smiley-bold",
    content: `To every student, An educational journey should be filled with joy and more time for exploration—not long, tiring journeys that leave you with zero motivation to do anything beyond your curriculum. We want to give you back that time. Time to play, learn, discover new hobbies, and spend time with your family. Every ride with Guardian Way is designed to be safe, comfortable, and full of smiles. Because studenthood should be remembered—not spent in traffic.`,
    sign: "— With love, Guardian Way",
  },
  {
    key: "parent",
    label: "I'm a Parent",
    icon: "ph:heart-bold",
    content: `We know how much you do for your child, and we truly admire it. Our promise is to make one part of your day easier by providing a journey that's safe, comfortable and dependable. We want to give you peace of mind, save your child's valuable time and make every ride worthy of the trust you place in us. Your child is your world. We'll never forget that.`,
    sign: "— With care, Guardian Way",
  },
  {
    key: "school",
    label: "I Represent a School",
    icon: "ph:graduation-cap-bold",
    content: `Your purpose is to educate, inspire and shape the future. We'll take care of the journey, so your team can focus on what matters most—your students. Whether you're simplifying transport operations or looking for a trusted transportation partner, we're here to serve with reliability and care. You shape futures. We will protect the journey.`,
    sign: "— Your trusted partner, Guardian Way",
  },
  {
    key: "driver",
    label: "I'm a Driving Partner",
    icon: "ph:steering-wheel-bold",
    content: `You're more than a driver—you are someone families rely on. We'll always treat you with dignity, fairness, and respect while helping you earn, grow, and build a stable future with us. Together, we'll create safe journeys and lasting trust for every family we serve. Respect isn't a benefit. It's where every partnership begins.`,
    sign: "— Together, Guardian Way",
  },
  {
    key: "investor",
    label: "I'm an Investor",
    icon: "ph:chart-line-up-bold",
    content: `Before we talk about numbers, we'd like to build trust. We believe the best partnerships are built on shared values, honest conversations and a common purpose. If we grow together, we'll do it responsibly—creating lasting value for our partners while making a meaningful difference in the lives of the families and communities we serve. Together, let's build something we will all be proud of.`,
    sign: "— With gratitude, Guardian Way",
  },
  {
    key: "society",
    label: "For Society",
    icon: "ph:globe-hemisphere-west-bold",
    content: `Every student deserves a safer journey and a brighter future. By making school transportation smarter, we can reduce traffic, lower emissions, and create safer communities. As we grow, a part of our success will always go towards supporting children in need, caring for animals, and protecting the environment. A better journey today creates a better tomorrow.`,
    sign: "— For everyone, Guardian Way",
  },
];

export default function OurPromise() {
  const [active, setActive] = useState(0);
  const tab = PROMISE_TABS[active];

  return (
    <section id="our-promise" className="relative py-24 md:py-32 scroll-mt-16 bg-[#F3F8FF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center">
            <Chapter number="03" label="Our Promise" />
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
              A promise to everyone who trusts us.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-[16px] text-[#4B5563] leading-relaxed">
              Every journey begins with trust. Here&apos;s what that trust means to us.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-[#E6EEF9] bg-white p-1.5 shadow-sm">
              {PROMISE_TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all duration-300 ${
                    active === i
                      ? "bg-[#153E75] text-white shadow-[0_4px_14px_rgba(21,62,117,0.25)]"
                      : "text-[#4B5563] hover:text-[#153E75] hover:bg-[#F3F8FF]"
                  }`}
                >
                  <Icon icon={t.icon} className="text-[15px]" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mt-12 mx-auto max-w-3xl"
            >
              <div className="rounded-[28px] border border-[#E6EEF9] bg-white p-8 md:p-12 shadow-[0_8px_30px_rgba(21,62,117,0.05)]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D6] text-[#153E75]">
                    <Icon icon={tab.icon} className="text-[20px]" />
                  </span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#153E75]">
                    {tab.label}
                  </span>
                </div>

                <p className="text-[16px] md:text-[17px] leading-relaxed text-[#374151] whitespace-pre-line">
                  {tab.content}
                </p>

                <p className="mt-8 text-[15px] font-semibold text-[#153E75] italic">
                  {tab.sign}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
