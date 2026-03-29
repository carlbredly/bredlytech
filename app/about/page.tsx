import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, ShieldCheck, Zap, Award, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bredly Technologies LLC — our story, mission, founder Carl Bredly, and the values that drive every project.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About — Bredly Technologies LLC",
    description:
      "Our story, mission, and the values behind every web, SaaS, and AI project.",
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: "About — Bredly Technologies LLC",
    description:
      "Our story, mission, and the values behind every web, SaaS, and AI project.",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "We stay at the frontier of technology so our clients don't have to. We evaluate, experiment, adopt what works, and discard what doesn't.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    body: "We communicate honestly about timelines, scope, and trade-offs. No overpromising. No handwaving. Just straight talk.",
  },
  {
    icon: Zap,
    title: "Speed",
    body: "Speed is a feature. We move with urgency at every stage — discovery, design, development, and delivery — without cutting corners.",
  },
  {
    icon: Award,
    title: "Excellence",
    body: "We hold ourselves to a standard most agencies don't bother reaching. Every project is an opportunity to make something truly great.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <section className="pt-40 pb-20 px-6 lg:px-8" aria-labelledby="about-title">
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
              Who We Are
            </p>
            <h1
              id="about-title"
              className="font-serif font-bold text-snow leading-[1.04]"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Built by engineers.
              <br />
              <span className="font-display italic text-accent">
                Driven by craft.
              </span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Company Intro ─────────────────────────────────── */}
      <section className="py-[100px] md:py-[120px] px-6 lg:px-8" aria-labelledby="intro-heading">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal direction="left">
              <h2
                id="intro-heading"
                className="font-serif font-bold text-snow leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                We are a team of engineers and designers obsessed with building
                software that matters.
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-5 font-sans text-snow/65 leading-[1.85] text-base">
                <p>
                  Bredly Technologies LLC is a boutique software agency built on
                  a single conviction: the best technology products are built by
                  small, focused, highly skilled teams who care deeply about
                  their work.
                </p>
                <p>
                  We partner with early-stage startups validating their first
                  product, growth-stage companies scaling their infrastructure,
                  and established businesses modernizing legacy systems. What
                  they share is an ambition to build something meaningful through
                  technology.
                </p>
                <p>
                  Our team brings expertise across full-stack web development,
                  cross-platform mobile, cloud infrastructure, machine learning
                  pipelines, and editorial product design. No departmental
                  silos — every team member understands the full product
                  lifecycle.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Mission Statement ─────────────────────────────── */}
      <section
        className="py-[100px] md:py-[140px] px-6 lg:px-8 bg-surface/30"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-8">
                Our Mission
              </p>
              <h2
                id="mission-heading"
                className="font-serif font-bold text-snow leading-[1.1]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                &ldquo;To help businesses grow through technology that is{" "}
                <span className="font-display italic text-accent">
                  powerful, scalable,
                </span>{" "}
                and beautifully crafted.&rdquo;
              </h2>
            </div>
          </ScrollReveal>

          {/* Metric row */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-edge">
              {[
                { value: "50+", label: "Projects Shipped" },
                { value: "30+", label: "Satisfied Clients" },
                { value: "5+", label: "Years Building" },
                { value: "100%", label: "Client Retention" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-serif font-bold text-snow mb-2"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.04em" }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Founder Section ───────────────────────────────── */}
      <section className="py-[100px] md:py-[120px] px-6 lg:px-8" aria-labelledby="founder-heading">
        <div className="max-w-8xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              The Founder
            </p>
            <h2
              id="founder-heading"
              className="font-serif font-bold text-snow"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Meet the person behind the work.
            </h2>
          </ScrollReveal>

          {/* Founder card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Avatar card */}
            <ScrollReveal direction="left" className="md:col-span-4">
              <div className="relative border border-edge bg-surface rounded-2xl p-10 overflow-hidden">
                {/* Top gradient border */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-blue), transparent)",
                  }}
                  aria-hidden="true"
                />
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center mb-8">
                  <span className="font-serif text-3xl font-bold text-accent/60">
                    CB
                  </span>
                </div>
                <h3
                  className="font-serif font-bold text-snow mb-1 leading-tight"
                  style={{ fontSize: "1.6rem", letterSpacing: "-0.03em" }}
                >
                  Carl Bredly
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                  Founder & Software Engineer
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/carlbredly.raw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-wider text-muted border border-edge rounded-lg px-3 py-1.5 hover:text-snow hover:border-accent/40 transition-all duration-200"
                  >
                    Instagram →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="right" delay={0.1} className="md:col-span-8">
              <div className="space-y-5 font-sans text-snow/65 leading-[1.85] text-base">
                <p>
                  Carl Bredly is a software engineer and entrepreneur who has
                  spent the past five years building production software across
                  industries ranging from fintech to healthcare to e-commerce.
                  He founded Bredly Technologies LLC on the conviction that
                  elite software craftsmanship should be accessible to ambitious
                  teams of every size.
                </p>
                <p>
                  His background spans full-stack web development, cloud
                  architecture on AWS and GCP, and emerging AI/ML integrations.
                  Carl brings a product-first mindset to every engagement:
                  understanding the business problem deeply before touching a
                  keyboard, and measuring success by user outcomes — not lines
                  of code shipped.
                </p>
                <p>
                  Outside of building products, Carl writes and speaks about
                  software architecture, system design, and the intersection of
                  technology and business strategy. He is driven by the belief
                  that great software is one of the highest-leverage investments
                  any business can make.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent text-white font-sans font-semibold text-sm rounded-xl hover:bg-accent-glow transition-colors duration-200"
                >
                  Get in Touch
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Values ────────────────────────────────────────── */}
      <section
        className="py-[100px] md:py-[120px] px-6 lg:px-8 bg-surface/30"
        aria-labelledby="values-heading"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              How We Operate
            </p>
            <h2
              id="values-heading"
              className="font-serif font-bold text-snow"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Our values.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 0.08}>
                <div className="group h-full border border-edge bg-surface rounded-2xl p-10 hover:border-accent/35 transition-all duration-300">
                  <div className="mb-6 w-11 h-11 flex items-center justify-center border border-edge rounded-xl bg-white/[0.03] group-hover:border-accent/35 group-hover:bg-accent/8 transition-all duration-300">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <h3
                    className="font-serif text-xl font-bold text-snow mb-3 tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-[1.8]">
                    {body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section className="py-[120px] px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2
              className="font-serif font-bold text-snow mb-5"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s work together.
            </h2>
            <p className="font-sans text-muted mb-10">
              Whether you have a fully-formed spec or just a napkin sketch,
              we&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-10 py-4 bg-accent text-white font-sans font-semibold text-base rounded-xl hover:bg-accent-glow transition-colors duration-200"
            >
              Start a Conversation
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
