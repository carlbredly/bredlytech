import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work from Bredly Technologies LLC — SaaS, mobile, web, and AI projects built for scale and precision.",
  alternates: { canonical: `${SITE_URL}/portfolio` },
  openGraph: {
    title: "Portfolio — Bredly Technologies LLC",
    description:
      "Explore our case studies across SaaS, mobile, web, and AI solutions.",
    url: `${SITE_URL}/portfolio`,
  },
  twitter: {
    title: "Portfolio — Bredly Technologies LLC",
    description:
      "Explore our case studies across SaaS, mobile, web, and AI solutions.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
