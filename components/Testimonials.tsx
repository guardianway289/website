import { Icon } from "@iconify/react";

const QUOTES = [
  {
    name: "Priya Malhotra",
    role: "Parent",
    quote:
      "The moment you said I'd be able to see the van on a map, I was in. That's the one thing I've always wanted and never had.",
    icon: "ph:user-circle-bold",
  },
  {
    name: "Rohit Sharma",
    role: "Parent",
    quote:
      "Six or seven kids in a van instead of thirty on a bus? That alone would make me switch tomorrow.",
    icon: "ph:user-circle-bold",
  },
  {
    name: "Anjali Verma",
    role: "Parent",
    quote:
      "Home pick-up means one less thing I have to plan around every morning. I didn't realise how much I wanted that until you said it.",
    icon: "ph:user-circle-bold",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-card">
      <div className="container-gr">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-navy-soft">
            Early Voices
          </span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[38px]">
            What parents said when we shared the idea
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <div key={`${q.name}-${i}`} className="rounded-2xl border border-line bg-white p-7">
              <Icon icon="ph:quotes-fill" className="text-2xl text-yellow" />
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy">
                  <Icon icon={q.icon} className="text-[18px]" />
                </span>
                <div>
                  <div className="text-[13.5px] font-bold text-navy-deep">{q.name}</div>
                  <div className="text-[12px] text-ink-soft">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}