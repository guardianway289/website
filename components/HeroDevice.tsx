"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

function useCountdown(startSeconds: number) {
  const [seconds, setSeconds] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? startSeconds : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [startSeconds]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function useJitter(base: number, range: number, intervalMs = 1800) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setVal(Math.round(base + (Math.random() * 2 - 1) * range));
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, range, intervalMs]);
  return val;
}

function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return time ?? "08:14";
}

export default function HeroDevice() {
  const [tab, setTab] = useState<"map" | "cam">("map");
  const eta = useCountdown(4 * 60 + 32);
  const speed = useJitter(24, 4);
  const clock = useClock();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none lg:w-[360px]"
    >
      {/* device frame */}
      <div className="relative rounded-[38px] bg-navy-deep p-[10px] shadow-[0_35px_80px_-25px_rgba(12,37,69,0.55)]">
        <div className="grain absolute inset-0 rounded-[38px] pointer-events-none" />
        {/* notch */}
        <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[110px] -translate-x-1/2 rounded-full bg-navy-deep" />

        <div className="relative overflow-hidden rounded-[28px] bg-[#eef4fb]">
          {/* status bar */}
          <div className="relative z-10 flex items-center justify-between bg-navy-deep px-5 pb-2 pt-3 text-white">
            <span className="text-[11px] font-bold tabular-nums">{clock}</span>
            <div className="flex items-center gap-1.5">
              <Icon icon="ph:cell-signal-full-bold" className="text-[13px]" />
              <Icon icon="ph:wifi-high-bold" className="text-[13px]" />
              <Icon icon="ph:battery-full-bold" className="text-[15px]" />
            </div>
          </div>

          {/* app header */}
          <div className="relative z-10 flex items-center justify-between bg-navy-deep px-5 pb-4">
            <div>
              <div className="text-[13px] font-extrabold text-white">Guardian Way</div>
              <div className="text-[10.5px] text-white/50">Trip in progress</div>
            </div>
            <div className="flex rounded-full bg-white/10 p-1">
              {(["map", "cam"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative rounded-full px-3 py-1.5 text-[10.5px] font-bold transition-colors ${
                    tab === t ? "text-navy-deep" : "text-white/70"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="hero-device-tab"
                      className="absolute inset-0 rounded-full bg-yellow"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t === "map" ? "Live Map" : "Dashcam"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* screen content */}
          <div className="relative h-[300px]">
            <AnimatePresence mode="wait">
              {tab === "map" ? (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 360 260" className="h-full w-full">
                    <defs>
                      <pattern id="mapgrid" width="26" height="26" patternUnits="userSpaceOnUse">
                        <path d="M26 0H0V26" fill="none" stroke="#d7e3f3" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="360" height="260" fill="url(#mapgrid)" />
                    {/* decorative streets */}
                    <path d="M-10 60 H370" stroke="#dbe6f4" strokeWidth="9" />
                    <path d="M-10 180 H370" stroke="#dbe6f4" strokeWidth="6" />
                    <path d="M110 -10 V270" stroke="#dbe6f4" strokeWidth="6" />
                    <path d="M270 -10 V270" stroke="#dbe6f4" strokeWidth="9" />

                    {/* route */}
                    <motion.path
                      d="M40 220 C 110 220, 90 110, 170 110 S 250 55, 330 40"
                      fill="none"
                      stroke="#153E75"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="1 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                    />

                    {/* home pin */}
                    <g transform="translate(40 220)">
                      <circle r="9" fill="#FFC83D" stroke="white" strokeWidth="2.5" />
                      <circle r="16" fill="#FFC83D" opacity="0.25" />
                    </g>
                    {/* school pin */}
                    <g transform="translate(330 40)">
                      <circle r="9" fill="#3cb995" stroke="white" strokeWidth="2.5" />
                      <circle r="16" fill="#3cb995" opacity="0.25" />
                    </g>

                    {/* moving van */}
                    <g>
                      <circle r="13" fill="#153E75" opacity="0.18">
                        <animateMotion
                          dur="5.5s"
                          repeatCount="indefinite"
                          path="M40 220 C 110 220, 90 110, 170 110 S 250 55, 330 40"
                        />
                        <animate attributeName="r" values="10;18;10" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                      <g>
                        <animateMotion
                          dur="5.5s"
                          repeatCount="indefinite"
                          path="M40 220 C 110 220, 90 110, 170 110 S 250 55, 330 40"
                        />
                        <circle r="11" fill="#153E75" stroke="#FFC83D" strokeWidth="2.5" />
                        <text x="0" y="4" textAnchor="middle" fontSize="11" fill="#FFC83D">
                          🚐
                        </text>
                      </g>
                    </g>
                  </svg>

                  {/* trip info card */}
                  <div className="absolute inset-x-3 bottom-1 flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-2 shadow-[0_10px_25px_-10px_rgba(15,27,45,0.35)] backdrop-blur">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-extrabold text-yellow">
                      RS
                    </div>
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-navy-deep">Ravi Sharma · HR26 AB 4521</div>
                      <div className="text-[10.5px] text-ink-soft">{speed} km/h · on schedule</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-extrabold tabular-nums text-navy">{eta}</div>
                      <div className="text-[9.5px] font-semibold uppercase tracking-wide text-ink-soft">ETA</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cam"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 overflow-hidden bg-[#0c1524]"
                >
                  {/* road perspective */}
                  <svg viewBox="0 0 360 260" className="h-full w-full">
                    <defs>
                      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#1c3155" />
                        <stop offset="1" stopColor="#0c1524" />
                      </linearGradient>
                    </defs>
                    <rect width="360" height="150" fill="url(#sky)" />
                    <polygon points="0,260 360,260 230,150 130,150" fill="#1a2438" />
                    <polygon points="150,260 210,260 190,150 170,150" fill="#2a3550" />
                    {[0, 1, 2].map((i) => (
                      <motion.rect
                        key={i}
                        x="176"
                        width="8"
                        height="26"
                        fill="#e8c34a"
                        initial={{ y: 150 + i * 45 }}
                        animate={{ y: [150 + i * 45, 280] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.47 }}
                      />
                    ))}
                  </svg>

                  {/* REC indicator */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1">
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-coral"
                    />
                    <span className="text-[10px] font-bold text-white">REC</span>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white/80">
                    {clock} · Cabin Cam
                  </div>

                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-black/45 px-3.5 py-3 backdrop-blur">
                    <Icon icon="ph:video-camera-bold" className="text-yellow" />
                    <div className="text-[11.5px] font-semibold text-white/90">
                      Dual-angle feed &middot; road + cabin &middot; available to parents
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* route footer strip */}
          <div className="relative z-10 flex items-center justify-between bg-white px-5 py-3">
            <div>
              <div className="text-[9.5px] font-bold uppercase tracking-wider text-ink-soft/70">Home</div>
              <div className="text-[11.5px] font-bold text-navy-deep">Sohna Road</div>
            </div>
            <Icon icon="mdi:bus-school" className="text-lg text-navy" />
            <div className="text-right">
              <div className="text-[9.5px] font-bold uppercase tracking-wider text-ink-soft/70">School</div>
              <div className="text-[11.5px] font-bold text-navy-deep">DPS Sector 45</div>
            </div>
          </div>
        </div>
      </div>

      {/* floating live-tracking card — click to jump to Live Map */}
      <motion.button
        onClick={() => setTab("map")}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-18 left-2 flex w-[196px] items-center gap-2 rounded-2xl border border-line bg-white p-3.5 text-left shadow-[0_20px_45px_-15px_rgba(15,27,45,0.25)] transition-transform hover:-translate-y-0.5 sm:-left-10"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-soft text-mint">
          <Icon icon="ph:gps-fix-bold" />
        </span>
        <div>
          <div className="text-[12px] font-bold text-navy">Live GPS Active</div>
          <div className="text-[10.5px] text-ink-soft">{eta} to pickup</div>
        </div>
      </motion.button>

      {/* floating verified badge — click to jump to Dashcam */}
      {/* <motion.button
        onClick={() => setTab("cam")}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute -top-15 -right-4 flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-[0_20px_45px_-15px_rgba(15,27,45,0.25)] transition-transform hover:-translate-y-0.5 sm:-right-8"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow/20 text-yellow-deep">
          <Icon icon="ph:shield-check-bold" />
        </span>
        <div className="text-left text-[12px] font-bold leading-tight text-navy">
          Driver
          <br />
          Verified
        </div>
      </motion.button> */}
    </motion.div>
  );
}
