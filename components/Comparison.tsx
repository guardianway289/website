import { useState, useEffect } from "react";
import { X, Bus, Car, ChevronDown, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

interface FailPoint {
  point: string;
  why: string;
}

const PRIVATE_VAN: FailPoint[] = [
  {
    point: "Often operates without the required permits",
    why: "No permit means no accountability if something goes wrong on the road.",
  },
  {
    point: "Limited regulatory oversight",
    why: "Nobody is routinely checking the vehicle, the driver, or the route.",
  },
  {
    point: "Inconsistent driver verification",
    why: "Background checks happen occasionally, not for every driver on every trip.",
  },
  {
    point: "Overcrowding to maximise earnings",
    why: "More kids per trip means less space, less seating, less supervision.",
  },
  {
    point: "Basic or no safety infrastructure",
    why: "No cameras, no GPS tracking, no fire extinguisher, no first-aid kit on board.",
  },
  {
    point: "Minimal transparency for families",
    why: "Parents rarely know who's driving, which route, or where their child is.",
  },
];

const TRADITIONAL: FailPoint[] = [
  {
    point: "Large student groups",
    why: "30–35 children share one bus, with one adult keeping an eye on all of them.",
  },
  {
    point: "Longer routes with multiple stops",
    why: "Every extra stop adds minutes your child spends just sitting and waiting.",
  },
  {
    point: "Early morning pick-ups",
    why: "Routes are built around the bus schedule, not your child's sleep.",
  },
  {
    point: "Hours lost every week commuting",
    why: "Multiply the extra minutes by every school day, every week, every year.",
  },
  {
    point: "Less flexibility for families",
    why: "One fixed time, one fixed route — no room for your day to change.",
  },
  {
    point: "One route for everyone",
    why: "The bus optimises for the fleet, not for the shortest ride for your child.",
  },
  {
    point: "Bus stop pick-ups instead of home pick-ups",
    why: "Kids still walk to a stop, often alone, before the journey even begins.",
  },
];

interface FailCardProps {
  icon: LucideIcon;
  title: string;
  points: FailPoint[];
  meterLabel: string;
  meterValue: number;
  meterTone: "red" | "amber";
}

const FailCard = ({
  icon: Icon,
  title,
  points,
  meterLabel,
  meterValue,
  meterTone,
}: FailCardProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 350);
    return () => clearTimeout(t);
  }, []);

  const toneColor = meterTone === "red" ? "#FF6B6B" : "#F59E0B";

  return (
    <div className="h-full rounded-3xl bg-white border border-[#E6EEF9] p-7 shadow-[0_8px_30px_rgba(21,62,117,0.05)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(21,62,117,0.1)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1F1] text-[#FF6B6B]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-heading text-xl font-extrabold text-[#111827]">{title}</h3>
      </div>

      <ul className="mt-6 space-y-1">
        {points.map((item, i) => {
          const open = openIndex === i;
          return (
            <li key={item.point}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-start gap-3 text-left rounded-xl px-2 py-2 -mx-2 transition-colors duration-200 hover:bg-[#F7FAFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B]/40"
                aria-expanded={open}
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FFE3E3]">
                  <X className="h-3 w-3 text-[#FF6B6B]" strokeWidth={3} />
                </span>
                <span className="flex-1 text-sm text-[#4B5563]">{item.point}</span>
                <ChevronDown
                  className={`h-4 w-4 mt-0.5 shrink-0 text-[#9CA6B4] transition-transform duration-300 ${
                    open ? "rotate-180 text-[#FF6B6B]" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pl-7 pr-2 pb-3 text-[13px] leading-relaxed text-[#8A93A3]">
                    {item.why}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-5 border-t border-[#EEF3FA]">
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]">
          <span>{meterLabel}</span>
          <span style={{ color: toneColor }}>{meterValue}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-[#F1F5FB] overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-1000 ease-out"
            style={{ width: filled ? `${meterValue}%` : "0%", backgroundColor: toneColor }}
          />
        </div>
      </div>
    </div>
  );
};

export const Comparison = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#F3F8FF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal delay={0.05}>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-[#111827]">
            Children deserve a better way to travel.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center">
            <div className="rounded-2xl bg-white border border-[#E6EEF9] px-6 py-5 max-w-2xl text-center shadow-[0_8px_30px_rgba(21,62,117,0.05)]">
              <p className="text-[#4B5563]">
                Most families rely on one of two common transportation options. Both
                solve the journey — but neither is designed to make it shorter, more
                comfortable, or centered around the child&apos;s daily experience.
              </p>
            </div>
            <span className="h-10 w-px bg-[#153E75]/15" />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#9CA6B4] mb-4">
            Tap any point to see why it matters
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <Reveal delay={0.1} y={24}>
            <FailCard
              icon={Car}
              title="Private Van Services"
              points={PRIVATE_VAN}
              meterLabel="Safety score"
              meterValue={20}
              meterTone="red"
            />
          </Reveal>
          <Reveal delay={0.18} y={24}>
            <FailCard
              icon={Bus}
              title="Traditional School Transport"
              points={TRADITIONAL}
              meterLabel="Flexibility score"
              meterValue={35}
              meterTone="amber"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};