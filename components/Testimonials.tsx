"use client";

import { Icon } from "@iconify/react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Malhotra",
    role: "Parent of 8yo",
    location: "DLF Phase 5, Gurgaon",
    quote:
      "The school bus comes too early. My child starts the day feeling tired. A shorter route would make a real difference.",
    rating: 5,
    initials: "PM",
  },
  {
    name: "Rohit Sharma",
    role: "Parent of 10yo",
    location: "Sector 56, Gurgaon",
    quote:
      "I wish there was a transport service with fewer stops and more personal attention.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Anjali Verma",
    role: "Working Mother",
    location: "Sohna Road, Gurgaon",
    quote:
      "Home pickup would make our mornings so much less stressful. We wouldn't have to rush to a pickup point every day.",
    rating: 5,
    initials: "AV",
  },
  {
    name: "Dr. Vikram Rao",
    role: "Father of 2",
    location: "Nirvana Country, Gurgaon",
    quote:
      "If someone picked up my child directly from home, I'd finally have 20–30 minutes in the morning for myself—maybe for yoga, a walk, or even a peaceful cup of tea.",
    rating: 5,
    initials: "VR",
  },
  {
    name: "Kavita Krishnan",
    role: "Parent of 7yo",
    location: "Sushant Lok 1, Gurgaon",
    quote:
      "Knowing my child is travelling safely would help me focus better when I'm at the office.",
    rating: 5,
    initials: "KK",
  },
  {
    name: "Sameer Joshi",
    role: "Tech Lead & Dad",
    location: "Golf Course Ext, Gurgaon",
    quote:
      "Live journey updates would save us from constantly calling drivers to check where the vehicle is.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Meera Nambiar",
    role: "Parent of 2 kids",
    location: "Sector 48, Gurgaon",
    quote:
      "“Safety is my biggest concern. I just want to know my child has reached safely.",
    rating: 5,
    initials: "MN",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container-gr">
        <div>
          <div>
            <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-tight text-navy-deep sm:text-[40px] max-w-2xl leading-tight">
              What parents told us
            </h2>
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-navy-soft">
              Thoughts shared by parents when we told the idea of guardian way
            </span>
          </div>

        </div>

        <div className="testimonials-marquee mt-12 overflow-hidden py-4">
          <div className="testimonials-marquee-track flex w-max gap-6">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 gap-6"
                aria-hidden={copy === 1}
              >
                {TESTIMONIALS.map((q, i) => (
                  <div
                    key={`${copy}-${q.name}-${i}`}
                    className="w-[88vw] sm:w-95 lg:w-102.5 shrink-0 rounded-2xl border border-line/80 bg-white p-7 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(21,62,117,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(21,62,117,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="h-1.5 w-full bg-linear-to-r from-navy via-navy-soft to-mint absolute top-0 left-0 opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(q.rating)].map((_, s) => (
                            <Icon
                              key={s}
                              icon="ph:star-fill"
                              className="text-base text-yellow"
                            />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-mint bg-mint-soft/80 px-2.5 py-0.5 rounded-full border border-green-500">
                          <Icon icon="ph:seal-check-fill" className="text-sm" />
                        </span>
                      </div>

                      <div className="mt-5 relative">
                        <p className="text-[14.5px] leading-relaxed font-medium text-navy-deep relative z-10 pl-2">
                          &ldquo;{q.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-line/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-navy via-navy-soft to-navy text-white font-extrabold text-xs tracking-wider shadow-inner shrink-0">
                          {q.initials}
                        </div>
                        <div>
                          <div className="text-[14px] font-extrabold text-navy-deep leading-tight">
                            {q.name}
                          </div>
                          <div className="text-[12px] font-medium text-ink-soft mt-0.5">
                            {q.role} &bull; {q.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
