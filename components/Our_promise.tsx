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
    title: "To every student,",
    content: `An educational journey should be filled with joy and more time for exploration—not long, tiring journeys that leave you with zero motivation to do anything beyond your curriculum. We want to give you back that time. Time to play, learn, discover new hobbies, and spend time with your family. Every ride with Guardian Way is designed to be safe, comfortable, and full of smiles. Because studenthood should be remembered—not spent in traffic.`,
    sign: "— With love, Guardian Way",
  },
  {
    key: "parent",
    label: "I'm a Parent",
    icon: "ph:heart-bold",
    title: "To every parent,",
    content: `We know how much you do for your child, and we truly admire it. Our promise is to make one part of your day easier by providing a journey that's safe, comfortable and dependable. We want to give you peace of mind, save your child's valuable time and make every ride worthy of the trust you place in us. Your child is your world. We'll never forget that.`,
    sign: "— With care, Guardian Way",
  },
  {
    key: "school",
    label: "I Represent a School",
    icon: "ph:graduation-cap-bold",
    title: "To every educational institution,",
    content: `Your purpose is to educate, inspire and shape the future. We'll take care of the journey, so your team can focus on what matters most—your students. Whether you're simplifying transport operations or looking for a trusted transportation partner, we're here to serve with reliability and care. You shape futures. We will protect the journey.`,
    sign: "— Your trusted partner, Guardian Way",
  },
  {
    key: "driver",
    label: "I'm a Driving Partner",
    icon: "ph:steering-wheel-bold",
    title: "To every driving partner,",
    content: `You're more than a driver—you are someone families rely on. We'll always treat you with dignity, fairness, and respect while helping you earn, grow, and build a stable future with us. Together, we'll create safe journeys and lasting trust for every family we serve. Respect isn't a benefit. It's where every partnership begins.`,
    sign: "— Together, Guardian Way",
  },
  {
    key: "investor",
    label: "I'm an Investor",
    icon: "ph:chart-line-up-bold",
    title: "To every investor,",
    content: `Before we talk about numbers, we'd like to build trust. We believe the best partnerships are built on shared values, honest conversations and a common purpose. If we grow together, we'll do it responsibly—creating lasting value for our partners while making a meaningful difference in the lives of the families and communities we serve. Together, let's build something we will all be proud of.`,
    sign: "— With gratitude, Guardian Way",
  },
  {
    key: "society",
    label: "For Society",
    icon: "ph:globe-hemisphere-west-bold",
    title: "To society,",
    content: `Every student deserves a safer journey and a brighter future. By making school transportation smarter, we can reduce traffic, lower emissions, and create safer communities. As we grow, a part of our success will always go towards supporting children in need, caring for animals, and protecting the environment. A better journey today creates a better tomorrow.`,
    sign: "— For everyone, Guardian Way",
  },
];

export default function OurPromise() {
  const [active, setActive] = useState(1);
  const tab = PROMISE_TABS[active];

  return (
    <section id="our-promise" className="relative py-12 md:py-16 scroll-mt-16 bg-[#F3F8FF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-12 items-start">

          {/* Header - Top Left */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <div className="text-left">
                <Chapter number="03" label="OUR PURPOSE" />
                <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#153E75] leading-tight whitespace-nowrap">
                  A promise to everyone who trusts us.
                </h2>
                <p className="mt-4 text-[16px] text-[#4B5563] leading-relaxed">
                  Every journey begins with trust. Here&apos;s what that trust means to us.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Left Column - Tabs - Bottom Left */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {PROMISE_TABS.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border px-4 py-4 sm:px-6 sm:py-5 text-left transition-all duration-300 ${
                      active === i
                        ? "border-[#153E75] bg-[#153E75] text-white shadow-md shadow-[#153E75]/20"
                        : "border-white bg-white text-[#153E75] hover:border-[#E6EEF9] hover:shadow-sm"
                    }`}
                  >
                    <Icon icon={t.icon} className="text-xl sm:text-2xl flex-shrink-0" />
                    <span className="text-[13px] sm:text-[15px] font-semibold tracking-wide">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 lg:col-start-6 lg:row-start-2">
            <Reveal delay={0.15}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="rounded-3xl border border-white bg-white p-6 md:p-8 shadow-sm w-full">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-1 w-20 items-center justify-center rounded-[12px] bg-[#FFF8E7] text-[#153E75]">
                        <Icon icon={tab.icon} className="text-[20px]" />
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-[#153E75] mb-3">
                      {tab.title}
                    </h3>

                    <p className="text-[14px] md:text-[15px] leading-relaxed text-[#4B5563]">
                      {tab.content}
                    </p>

                    <p className="mt-5 text-[14px] font-semibold text-[#153E75] italic">
                      {tab.sign}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
