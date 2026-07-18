import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0E2F56] pt-20 pb-8 text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Brand & Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-[22px] font-bold">
              <Image 
                src="/icon.png" 
                alt="Guardian Way Logo" 
                width={36} 
                height={36} 
                className="h-9 w-auto object-contain rounded-full" 
              />
              <span className="text-white tracking-wide">
                Guardian <span className="text-[#FFC107]">Way</span>
              </span>
            </div>
            
            <p className="mt-5 max-w-[340px] text-[13px] text-white/70 leading-relaxed font-light">
              Premium smart school cabs. Safe rides, trusted drivers, complete transparency — because your child's journey deserves more than just transportation.
            </p>
            
            <button className="mt-6 rounded-full bg-[#FFC107] px-6 py-2.5 text-[13px] font-bold text-[#153E75] hover:bg-[#FFD54F] transition-colors shadow-sm">
              Get In Touch
            </button>
          </div>

          {/* Middle Column - Explore */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              EXPLORE
            </h4>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a href="#" className="text-[13px] text-white/70 hover:text-white transition-colors font-light">
                  Why It Matters
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/70 hover:text-white transition-colors font-light">
                  Why Guardian Way
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/70 hover:text-white transition-colors font-light">
                  Our Purpose
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              CONTACT
            </h4>
            <ul className="mt-6 space-y-3.5">
              <li className="flex items-start gap-3 text-[13px] text-white/70 font-light">
                <Icon icon="ph:phone-bold" className="text-[#FFC107] text-[16px] mt-0.5 shrink-0" />
                <span>Phone / WhatsApp — coming soon</span>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-white/70 font-light">
                <Icon icon="ph:envelope-simple-bold" className="text-[#FFC107] text-[16px] mt-0.5 shrink-0" />
                <span>Email — coming soon</span>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-white/70 font-light">
                <Icon icon="ph:map-pin-bold" className="text-[#FFC107] text-[16px] mt-0.5 shrink-0" />
                <span>Gurugram, Haryana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-20 flex flex-col md:flex-row items-end justify-between border-t border-white/10 pt-6">
          <div className="hidden md:block">
            <h1 className="text-5xl lg:text-7xl font-black text-white/[0.04] tracking-tighter leading-none select-none">
              GUARDIAN WAY
            </h1>
          </div>
          
          <div className="w-full md:w-auto text-center md:text-right text-[11px] text-white/50 pb-2">
            <p>&copy; 2026 Guardian Way · Safety First, Always.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
