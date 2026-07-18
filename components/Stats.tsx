"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 99.8, suffix: "%", decimals: 1, label: "On-time pickups" },
  { value: 100, suffix: "%", decimals: 0, label: "Verified drivers" },
  { value: 24, suffix: "×7", decimals: 0, label: "Support" },
  { value: 0, suffix: "", decimals: 0, label: "Compromise on safety" },
];

function CountUp({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 bg-navy-deep">
      <div className="container-gr">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-[36px] font-extrabold text-yellow sm:text-[44px]">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[13.5px] font-semibold text-white/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
