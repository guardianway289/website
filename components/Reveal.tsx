import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: EASE, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

interface OverlineProps {
  children: ReactNode;
  className?: string;
}

export const Overline = ({ children, className = "" }: OverlineProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full bg-[#FFF4D6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#153E75] ${className}`}
  >
    {children}
  </span>
);

interface ChapterProps {
  number: string | number;
  label: ReactNode;
}

export const Chapter = ({ number, label }: ChapterProps) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="font-heading text-2xl md:text-3xl font-extrabold text-[#153E75]/40">{number}</span>
    <span className="h-px w-12 bg-[#153E75]/25" />
    <Overline className="text-sm md:text-base px-4 py-1.5 tracking-[0.16em]">{label}</Overline>
  </div>
);

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const Counter = ({ to, suffix = "", prefix = "", duration = 1600, className = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};