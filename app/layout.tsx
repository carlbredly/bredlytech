import type { Metadata } from "next";
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
  title: {
    default: "Bredly Technologies LLC — Software & AI Agency",
    template: "%s | Bredly Technologies",
  },
  description:
    "We build powerful software and AI solutions for modern businesses. Custom web apps, SaaS platforms, and digital experiences that scale.",
  keywords: [
    "software agency",
    "web development",
    "AI solutions",
    "SaaS development",
    "mobile apps",
    "UI/UX design",
    "Bredly Technologies",
  ],
  authors: [{ name: "Bredly Technologies LLC" }],
  creator: "Bredly Technologies LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bredlytech.com",
    siteName: "Bredly Technologies LLC",
    title: "Bredly Technologies LLC — Software & AI Agency",
    description:
      "Custom web apps, SaaS platforms, and AI-powered experiences that scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bredly Technologies LLC — Software & AI Agency",
    creator: "@bredlytech",
  },
  robots: { index: true, follow: true },
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
