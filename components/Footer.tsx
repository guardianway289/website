import { Icon } from "@iconify/react";
import Image from "next/image";

const FOOTER_COLS = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Investor Relations"],
  },
  {
    title: "Guardian Way",
    links: ["For Parents", "For Schools", "Safety Promise", "Become a Driver"],
  },
  {
    title: "Support",
    links: ["Contact Us", "FAQs", "Privacy Policy", "Terms of Service"],
  },
];

export default function CTAFooter() {
  return (
    <>
      

      <footer className="border-t border-line bg-navy-deep pt-16 pb-8 text-white/70">
        <div className="container-gr">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center text-yellow">
                  {/* <Icon icon="ph:shield-check-fill" className="text-[22px]" /> */}
                  <Image src="/logo.png" alt="logo image" height={50} width={50} className="rounded-full"/>
                </span>
                <span className="font-display text-[15px] font-extrabold tracking-tight text-white">
                  GUARDIAN WAY
                </span>
              </div>
              <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed">
                A student mobility &amp; safety platform for Gurugram
                families &mdash; not a cab company.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[13.5px]">
                <Icon icon="ph:map-pin-bold" className="text-yellow" />
                Gurugram, Haryana
              </div>
              <div className="mt-2 flex items-center gap-2 text-[13.5px]">
                <Icon icon="ph:envelope-simple-bold" className="text-yellow" />
                guardianride.info@gmail.com
              </div>
            </div>

            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-extrabold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[13.5px] hover:text-yellow transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[12.5px] sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Guardian Way. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {["ph:instagram-logo-bold", "ph:linkedin-logo-bold", "ph:facebook-logo-bold"].map(
                (icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Icon icon={icon} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
