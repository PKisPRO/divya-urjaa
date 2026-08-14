import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { INSTAGRAM_URL, SITE_URL, brand } from "@/data/content";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Divya Urjaa — Sacred Diyas by Rajasthan Women Artisans",
    template: "%s · Divya Urjaa",
  },
  description:
    "Urjaa Deepak — handcrafted cow dung diyas by 50+ women artisans. Purifies air, elevates pooja, supports rural livelihoods. An initiative of Chetnagram Sansthan.",
  keywords: [
    "urjaa deepak",
    "cow dung diya",
    "natural deepak",
    "handmade diya rajasthan",
    "divya urjaa",
    "havan",
    "pooja diya",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    url: SITE_URL,
    title: "Divya Urjaa — Sacred Diyas by Rajasthan Women Artisans",
    description: "Sacred diyas. Real impact.",
    images: [
      {
        url: "/images/hero/hero-flame-poster.jpg",
        width: 1080,
        height: 1920,
        alt: "An Urjaa Deepak burning on a copper plate at a home altar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya Urjaa",
    description: "Sacred diyas. Real impact.",
    images: ["/images/hero/hero-flame-poster.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#114350",
  colorScheme: "light",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Divya Urjaa",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/lockup.png`,
  description:
    "Handcrafted Urjaa Deepak diyas made by 50+ women artisans in rural Rajasthan. An initiative of Chetnagram Sansthan.",
  email: "info.divyaurja@gmail.com",
  sameAs: [INSTAGRAM_URL],
  parentOrganization: {
    "@type": "NGO",
    name: "Chetnagram Sansthan",
    foundingDate: "2015",
  },
  foundingDate: "2016",
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
