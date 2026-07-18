"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const LINKS = [
  { label: "Why It Matters", href: "#why-it-matters" },
  { label: "Why Guardian Way", href: "#features" },
  { label: "Our Promise", href: "#our-promise" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-line shadow-[0_1px_0_0_rgba(15,27,45,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-gr flex items-center justify-between h-19">
        {/* Mockup Shield Logo & Text */}
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="logo image" height={200} width={200}/>
        </a>

        {/* Navigation Links + CTA */}
        <div className="hidden lg:flex items-center gap-8 relative">
          <div className="absolute -inset-4 -right-2 bg-[#FFC83D]/20 blur-2xl rounded-full -z-10" />
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14.5px] font-semibold text-slate-700 hover:text-navy transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-navy px-6 py-2.5 text-[14.5px] font-bold text-white hover:bg-navy-deep transition-colors shadow-[0_4px_14px_rgba(21,62,117,0.25)]"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-navy"
        >
          <Icon icon={open ? "ph:x-bold" : "ph:list-bold"} className="text-2xl" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-bg border-t border-line">
          <ul className="container-gr py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[15px] font-semibold text-ink border-b border-line/70"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full bg-navy px-4 py-3 text-[14.5px] font-bold text-white shadow-[0_4px_14px_rgba(21,62,117,0.25)]"
              >
                Get In Touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
