import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Bredly Technologies LLC — project inquiries, partnerships, and quotes. We respond within 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact — Bredly Technologies LLC",
    description:
      "Start a conversation about your web app, SaaS, mobile, or AI project.",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    title: "Contact — Bredly Technologies LLC",
    description:
      "Start a conversation about your web app, SaaS, mobile, or AI project.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
