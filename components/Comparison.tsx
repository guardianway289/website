import { Car, Bus, CircleUserRound } from "lucide-react";
import { Reveal } from "./Reveal";

const OPTIONS = [
  {
    icon: Car,
    emoji: "🚐",
    title: "Private Van",
    subtitle: "Often chosen because it's convenient.",
    tone: { accent: "#FF6B6B", bg: "#FFF1F1" },
    points: [
      "Usually unregulated",
      "Little or no safety monitoring",
      "Driver verification isn't always transparent",
    ],
  },
  {
    icon: Bus,
    emoji: "🚌",
    title: "Traditional School Bus",
    subtitle: "Reliable for many schools — but not every family.",
    tone: { accent: "#F59E0B", bg: "#FFF7EA" },
    points: [
      "Long routes",
      "Large number of students",
      "Extra travel time",
      "Waiting at bus stops",
    ],
  },
  {
    icon: CircleUserRound,
    emoji: "🚗",
    title: "Parent Drop-off",
    subtitle: "The safest — but not always practical.",
    tone: { accent: "#8B5CF6", bg: "#F3F0FF" },
    points: [
      "Takes parents' time every day",
      "Difficult for working families",
      "Traffic and parking stress",
    ],
  },
];

export const Comparison = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#F3F8FF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827]">
            Parents deserve better choices
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-4 max-w-xl text-[16px] text-[#4B5563] leading-relaxed">
            Today, most families have to choose between options that compromise either safety, comfort, or time.
          </p>
        </Reveal>

        {/* Three cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {OPTIONS.map((opt, i) => (
            <Reveal key={opt.title} delay={0.08 + i * 0.08} y={24}>
              <div className="group relative h-full overflow-hidden rounded-[24px] bg-white border border-[#E6EEF9] shadow-[0_8px_30px_rgba(21,62,117,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(21,62,117,0.12)]">
                {/* accent rail */}
                <span
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: opt.tone.accent }}
                />

                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl"
                      style={{ backgroundColor: opt.tone.bg }}
                    >
                      {opt.emoji}
                    </span>
                    <h3 className="font-heading text-lg md:text-xl font-extrabold tracking-tight text-[#111827]">
                      {opt.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[14px] text-[#6B7280] italic">
                    {opt.subtitle}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {opt.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-[14px] leading-none" style={{ color: opt.tone.accent }}>
                          &#10005;
                        </span>
                        <span className="text-[14.5px] font-medium text-[#374151] leading-snug">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Divider + fourth choice reveal */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-center">
            <span className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#153E75]/20 to-transparent" />
            <h3 className="mt-10 font-display text-3xl md:text-5xl font-extrabold tracking-tight text-center text-[#111827]">
              There should be a{" "}
              <span className="text-[#153E75]">fourth choice.</span>
            </h3>
            <p className="mt-5 max-w-3xl text-center text-[16px] text-[#4B5563] leading-relaxed">
              One that doesn&apos;t ask you to compromise on safety, time, or convenience.That&apos;s exactly what we built.
            </p>
            {/* <a
              href="#features"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153E75] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-8px_rgba(21,62,117,0.4)] transition-all hover:bg-[#0c2545] hover:-translate-y-0.5"
            >
              Discover Guardian Way
            </a> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
