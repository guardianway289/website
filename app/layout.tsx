import type { Metadata } from "next";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guardian Way | Premium Smart School Cabs — Gurugram",
  description:
    "Guardian Way is Gurugram's student mobility and safety platform. Police-verified drivers, live GPS tracking, dashcam access, and small-group smart vans built for school commutes.",
  keywords: [
    "school transport Gurugram",
    "safe school cab",
    "student transportation",
    "Guardian Way",
    "school van tracking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
