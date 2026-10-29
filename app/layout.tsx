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

const BASE_URL = "https://www.guardianway.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Guardian Way | Premium Smart School Cabs — Gurugram",
    template: "%s | Guardian Way",
  },

  description:
    "Guardian Way is Gurugram's #1 student mobility and safety platform. Police-verified drivers, live GPS tracking, dashcam access, and small-group smart vans built for school commutes. Book your child's safe ride today.",

  keywords: [
    "Guardian Way",
    "guardianway",
    "guardian way gurugram",
    "school transport Gurugram",
    "school cab Gurugram",
    "safe school cab",
    "student transportation Gurugram",
    "school van tracking",
    "school bus Gurgaon",
    "kids cab Gurugram",
    "school commute service",
    "child safe transport",
    "GPS tracked school cab",
    "smart school van",
    "school ride Gurugram",
    "police verified driver",
    "dashcam school cab",
    "school transport near me",
    "premium school cab service",
  ],

  authors: [{ name: "Guardian Way", url: BASE_URL }],
  creator: "Guardian Way",
  publisher: "Guardian Way",

  applicationName: "Guardian Way",
  category: "Transportation",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Guardian Way",
    title: "Guardian Way | Premium Smart School Cabs — Gurugram",
    description:
      "Gurugram's safest school transport. Police-verified drivers, live GPS tracking, dashcam access & small-group smart vans. Book your child's ride today.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Guardian Way — Premium Smart School Cabs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Guardian Way | Premium Smart School Cabs — Gurugram",
    description:
      "Gurugram's safest school transport. Police-verified drivers, live GPS, dashcam & smart vans for school commutes.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Add your Google Search Console verification code here:
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  // },
};

/* JSON-LD Structured Data for rich Google results */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Guardian Way",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  description:
    "Premium smart school cab service in Gurugram. Police-verified drivers, live GPS tracking, dashcam access, and small-group smart vans for safe school commutes.",
  telephone: "+91-9090119355",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Gurugram",
  },
  serviceType: "School Transportation Service",
  priceRange: "₹₹",
  sameAs: [
    // Add your social media URLs here:
    // "https://www.instagram.com/guardianway",
    // "https://www.facebook.com/guardianway",
    // "https://www.linkedin.com/company/guardianway",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
