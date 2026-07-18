"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

const LAYERS = [
  { icon: "ph:identification-badge-bold", title: "Driver Verification", desc: "Police checks, document &amp; behavior screening." },
  { icon: "ph:wrench-bold", title: "Vehicle Inspection", desc: "Every van audited before it hits the road." },
  { icon: "ph:gps-fix-bold", title: "Live GPS", desc: "Continuous location tracking on every trip." },
  { icon: "ph:video-camera-bold", title: "Dashcam", desc: "In-cabin &amp; road-facing recording, always on." },
  { icon: "ph:siren-bold", title: "Emergency SOS", desc: "One-tap alert reaches our response team." },
  { icon: "ph:brain-bold", title: "AI Route Monitoring", desc: "Flags detours, delays &amp; unsafe driving." },
  { icon: "ph:bell-ringing-bold", title: "Parent Notifications", desc: "Pickup, arrival &amp; delay alerts in real time." },
  { icon: "ph:squares-four-bold", title: "School Dashboard", desc: "Attendance &amp; transport visibility for schools." },
];

const RING_COLORS = ["#153E75", "#2c5590", "#3cb995", "#ffc83d", "#153E75", "#2c5590", "#3cb995", "#ffc83d"];

export default function SafetyRings() {
  const [active, setActive] = useState<number | null>(null);
  const size = 460;
  const cx = size / 2;
  const cy = size / 2;
  const baseR = 34;
  const step = 26;

  return (
    <section id="safety" className="py-24 overflow-hidden">
      <div className="container-gr">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-mint">
            Our Signature Safety System
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px] text-balance">
            8 Layers of Safety, wrapped around every ride
          </h2>
          <p className="mt-4 text-[15.5px] text-ink-soft">
            We don&rsquo;t just say &ldquo;our safety is good.&rdquo; Hover a layer to see exactly how it protects your child.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* concentric rings */}
          <div className="relative mx-auto w-full max-w-[460px] aspect-square">
            <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
              {LAYERS.map((_, i) => {
                const r = baseR + i * step;
                const isActive = active === i;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={RING_COLORS[i]}
                    strokeOpacity={active === null ? 0.28 : isActive ? 0.95 : 0.12}
                    strokeWidth={isActive ? 5 : 2.5}
                    strokeDasharray={i % 2 === 0 ? "1 0" : "10 6"}
                    style={{ transition: "stroke-opacity 300ms ease, stroke-width 300ms ease" }}
                  />
                );
              })}
              <circle cx={cx} cy={cy} r={baseR - 8} fill="#153E75" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-yellow shadow-[0_0_0_8px_rgba(21,62,117,0.08)]">
                <Image src="/logo.png" alt="Gurdain Way Logo" height={100} width={100}/>
              </div>
            </div>
            {active !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-1/2 top-[10px] -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-navy shadow border border-line"
              >
                Layer {active + 1}
              </motion.div>
            )}
          </div>

          {/* layer list */}
          <div className="grid gap-3 sm:grid-cols-2">
            {LAYERS.map((l, i) => (
              <button
                key={l.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                  active === i
                    ? "border-navy bg-navy text-white shadow-[0_18px_35px_-18px_rgba(21,62,117,0.5)] -translate-y-0.5"
                    : "border-line bg-white"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[19px] ${
                    active === i ? "bg-white/15 text-yellow" : "bg-card text-navy"
                  }`}
                >
                  <Icon icon={l.icon} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-extrabold ${active === i ? "text-yellow" : "text-navy-soft"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[14.5px] font-bold">{l.title}</h3>
                  </div>
                  <p
                    className={`mt-1 text-[12.5px] leading-snug ${
                      active === i ? "text-white/80" : "text-ink-soft"
                    }`}
                    dangerouslySetInnerHTML={{ __html: l.desc }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
