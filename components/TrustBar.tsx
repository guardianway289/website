import { Icon } from "@iconify/react";

const ITEMS = [
  { icon: "ph:shield-check-bold", label: "Background Verified Drivers" },
  { icon: "ph:gps-fix-bold", label: "Live GPS Tracking" },
  { icon: "ph:video-camera-bold", label: "Dashcam Access" },
  { icon: "ph:siren-bold", label: "Emergency SOS" },
  // { icon: "ph:person-simple-bold", label: "Female Guardian Support" },
  { icon: "ph:map-trifold-bold", label: "School Verified Routes" },
  { icon: "ph:bell-ringing-bold", label: "Check-In &amp; Check-Out Alerts" },
];

export default function TrustBar() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-line bg-navy-deep py-4">
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap">
              <Icon icon={item.icon} className="text-[18px] text-yellow" />
              <span
                className="text-[13.5px] font-semibold text-white/85"
                dangerouslySetInnerHTML={{ __html: item.label }}
              />
              <span className="ml-8 h-1 w-1 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
