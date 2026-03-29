import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  OG_SHARE_IMAGE_PATH,
} from "@/lib/site-config";
import {
  Instrument_Serif,
  Playfair_Display,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { CookieConsentProvider } from "@/components/CookieConsent";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bredly Technologies LLC — Software & AI Agency",
    template: "%s | Bredly Technologies",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "software agency",
    "web development",
    "AI solutions",
    "SaaS development",
    "mobile apps",
    "UI/UX design",
    "Bredly Technologies",
  ],
  authors: [{ name: "Bredly Technologies LLC", url: SITE_URL }],
  creator: "Bredly Technologies LLC",
  publisher: "Bredly Technologies LLC",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bredly Technologies LLC",
    title: "Bredly Technologies LLC — Software & AI Agency",
    description:
      "Custom web apps, SaaS platforms, and AI-powered experiences that scale.",
    images: [
      {
        url: OG_SHARE_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "Bredly Technologies LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bredly Technologies LLC — Software & AI Agency",
    description:
      "Custom web apps, SaaS platforms, and AI-powered experiences that scale.",
    creator: "@carlbredlyai",
    images: [OG_SHARE_IMAGE_PATH],
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${playfair.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg text-snow font-sans antialiased">
        <JsonLd />
        {/* Noise grain overlay */}
        <div className="grain" aria-hidden="true" />
        {/* Custom cursor (desktop only) */}
        <CustomCursor />
        {/* Reading progress bar */}
        <ScrollProgress />
        <CookieConsentProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
