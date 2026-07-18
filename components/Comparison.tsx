import { useEffect, useRef, useState } from "react";
import { Bus, Car, type LucideIcon } from "lucide-react";
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

const SEGMENTS = 10;

const FailCard = ({
  icon: Icon,
  title,
  points,
  meterLabel,
  meterValue,
  meterTone,
}: FailCardProps) => {
  const [filled, setFilled] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setFilled(meterValue), 200);
          obs.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [meterValue]);

  const tone =
    meterTone === "red"
      ? { accent: "#FF6B6B", bg: "#FFF1F1", track: "#FBE2E2" }
      : { accent: "#F59E0B", bg: "#FFF7EA", track: "#FBE9C7" };

  const activeSegments = Math.round((filled / 100) * SEGMENTS);

  return (
    <div
      ref={cardRef}
      className="group relative h-full overflow-hidden rounded-[28px] bg-white border border-[#E6EEF9] shadow-[0_8px_30px_rgba(21,62,117,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(21,62,117,0.12)]"
    >
      {/* accent rail */}
      <span
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: tone.accent }}
      />

      <div className="p-7 pl-8 md:p-9 md:pl-10">
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: tone.bg, color: tone.accent }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <h3 className="font-heading text-xl md:text-2xl font-extrabold tracking-tight text-[#111827]">
            {title}
          </h3>
        </div>

        <ul className="mt-7 space-y-5">
          {points.map((item) => (
            <li key={item.point} className="flex gap-3.5">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: tone.accent }}
              />
              <div>
                <p className="text-[15px] font-semibold leading-snug text-[#1F2937]">
                  {item.point}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#8A93A3]">
                  {item.why}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-[#EEF3FA]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]">
            <span>{meterLabel}</span>
            <span style={{ color: tone.accent }}>{meterValue}%</span>
          </div>
          <div className="mt-2.5 flex gap-1">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: i < activeSegments ? tone.accent : tone.track,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
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