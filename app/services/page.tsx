import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five disciplines: Web Development, Mobile Apps, SaaS, AI Solutions, UI/UX Design — built for scale.",
};

const services = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    description: [
      "We build web applications that don't just function — they perform. From high-conversion marketing sites to complex platforms processing millions of transactions, every system we deliver is architectured for the long term.",
      "Our stack is modern by philosophy: Next.js for server-rendered performance, TypeScript for safety across the entire codebase, and PostgreSQL or MongoDB depending on your data model and access patterns. Every deployment target is cloud-native — Vercel, AWS, or GCP.",
      "We obsess over the metrics that matter: Core Web Vitals, accessibility compliance, semantic SEO, and progressive enhancement. Your web presence is often the first impression — we make it count.",
    ],
    benefits: [
      "Server-side rendering with sub-second LCP on every page",
      "Pixel-perfect, WCAG 2.1 AA accessible UI across all viewports",
      "SEO architecture that compounds organic traffic over time",
    ],
    useCases: [
      "Corporate websites and marketing platforms",
      "E-commerce and transactional web apps",
      "Internal tools, dashboards, and admin panels",
      "Customer portals and self-service platforms",
      "Developer documentation and editorial sites",
    ],
  },
  {
    id: "mobile",
    number: "02",
    title: "Mobile App Development",
    description: [
      "Mobile is where your users live. We build cross-platform applications with React Native that feel native on iOS and Android — not like a website wrapped in a shell. Performance parity with native Swift and Kotlin is our baseline.",
      "Our mobile process begins with deep constraint analysis before any code is written. We design for real-world conditions: intermittent connectivity, battery limitations, platform-specific gesture vocabularies, and small screen real estate. Apps built for demos that fail in production are not our style.",
      "From push notifications to offline-first sync, in-app purchases to biometric authentication, camera to wearable integrations — we cover the full spectrum of native device capability through React Native and Expo's mature ecosystem.",
    ],
    benefits: [
      "Single codebase shipping to both iOS and Android App Stores",
      "Native-feeling gestures, animations, and platform conventions",
      "Offline-first data architecture for reliability anywhere",
    ],
    useCases: [
      "Consumer mobile products and lifestyle apps",
      "Field operations and logistics tooling",
      "Healthcare, fitness, and wellness apps",
      "Marketplace and social networking apps",
      "Enterprise mobility and internal tooling",
    ],
  },
  {
    id: "saas",
    number: "03",
    title: "SaaS Development",
    description: [
      "Building a SaaS product from scratch is among the most technically demanding endeavors in software. Multi-tenancy isolation, role-based permissions, Stripe subscription billing with dunning logic, webhook systems, real-time collaboration features — the complexity is deceptive and it compounds fast.",
      "We've built SaaS products from zero to paying customers more times than we can count. We know where the traps are. We architect systems with strict data isolation per tenant, metered usage tracking, and background job processing that won't bring down your main application thread.",
      "Our engagement always starts by aligning your pricing model with your data model. Changing this after launch is extraordinarily expensive. We design with the end state in mind from day one.",
    ],
    benefits: [
      "Secure multi-tenant data isolation from the database layer up",
      "Stripe billing, subscriptions, metered usage, and trial logic",
      "Background processing and webhook infrastructure built to scale",
    ],
    useCases: [
      "B2B SaaS tools and productivity platforms",
      "Analytics and reporting dashboards",
      "Workflow automation and no-code builders",
      "API-first products and developer platforms",
      "Marketplace and two-sided network platforms",
    ],
  },
  {
    id: "ai",
    number: "04",
    title: "AI Solutions",
    description: [
      "We build AI features that solve real business problems in production — not proof-of-concept demos that hallucinate under pressure. Our AI work is grounded in software engineering discipline: robust error handling, fallback strategies, evaluation harnesses, and cost monitoring.",
      "Our specializations include LLM integrations across all major model providers (OpenAI, Anthropic, Google), Retrieval-Augmented Generation pipelines over proprietary data, fine-tuning for domain-specific tasks, and agentic systems that can reason, plan, and take actions autonomously.",
      "We measure everything: accuracy benchmarks, latency budgets, token cost per operation, and user satisfaction. AI products built without evaluation infrastructure are just expensive guesses.",
    ],
    benefits: [
      "Production-grade LLM integrations with retry, fallback, and rate limiting",
      "RAG pipelines with vector search for accurate retrieval over private data",
      "Evaluation harnesses that measure quality and catch regressions",
    ],
    useCases: [
      "AI customer support and intelligent chatbots",
      "Document intelligence and automated data extraction",
      "Content generation and summarization at scale",
      "Personalization engines and recommendation systems",
      "Agentic workflows and multi-step reasoning pipelines",
    ],
  },
  {
    id: "design",
    number: "05",
    title: "UI/UX Design",
    description: [
      "Design is the first product decision. We approach UI/UX as the discipline that sits at the intersection of cognitive psychology, systems thinking, and editorial aesthetics. Interfaces we design communicate something specific and intentional about your brand — never generic.",
      "Our design process is rigorous: competitive landscape research, user journey mapping, information architecture, low-fidelity wireframes, high-fidelity Figma prototypes, and a developer handoff documentation that engineers can build from without ambiguity or guesswork.",
      "We design systems, not screens. Every component we produce is built to be extended, reused, and maintained. Design tokens, responsive behavior specifications, accessibility annotations, interaction states — all documented, all shipped.",
    ],
    benefits: [
      "Research-driven UX grounded in real user behavior data",
      "Developer-ready Figma with variants, tokens, and annotations",
      "Complete design systems covering every state, breakpoint, and edge case",
    ],
    useCases: [
      "Brand identity and visual language development",
      "Web app, SaaS, and dashboard product design",
      "Mobile app UX and interaction design",
      "Design system creation from scratch",
      "UX audits and product experience redesigns",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="pt-40 pb-20 px-6 lg:px-8"
        aria-labelledby="page-title"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
              What We Offer
            </p>
            <h1
              id="page-title"
              className="font-serif font-bold text-snow leading-[1.04]"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Services built
              <br />
              <span className="font-display italic text-accent">
                for impact.
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 font-sans text-lg text-muted max-w-2xl leading-[1.75]">
              Five disciplines. One team. Delivered with engineering precision
              and editorial design sensibility.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Service Sections ──────────────────────────────── */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-[80px] md:py-[120px] px-6 lg:px-8 ${idx % 2 !== 0 ? "bg-surface/40" : ""}`}
          aria-labelledby={`service-${service.id}-title`}
        >
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left: Number + Meta */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <ScrollReveal direction="left">
                  <div className="section-number mb-2">{service.number}</div>
                  <h2
                    id={`service-${service.id}-title`}
                    className="font-serif font-bold text-snow mb-8 leading-tight"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {service.title}
                  </h2>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-4 mb-8" role="list">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle
                          size={15}
                          className="text-accent mt-0.5 flex-shrink-0"
                        />
                        <span className="font-sans text-sm text-muted leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Use cases */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-4">
                      Use Cases
                    </p>
                    <ul className="flex flex-col gap-2.5" role="list">
                      {service.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0 mt-[7px]" />
                          <span className="font-sans text-sm text-muted">
                            {uc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Description */}
              <div className="lg:col-span-8">
                <ScrollReveal direction="right" delay={0.1}>
                  <div className="space-y-6">
                    {service.description.map((para, i) => (
                      <p
                        key={i}
                        className="font-sans text-base text-snow/70 leading-[1.85]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="mt-12 pt-10 border-t border-edge">
                    <Link
                      href="/contact"
                      className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent text-white font-sans font-semibold text-sm rounded-xl hover:bg-accent-glow transition-colors duration-200"
                    >
                      Discuss This Service
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {idx < services.length - 1 && (
            <div className="max-w-8xl mx-auto">
              <div className="gradient-divider mt-20" />
            </div>
          )}
        </section>
      ))}

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
              Not sure where to start?
            </h2>
            <p className="font-sans text-muted mb-10">
              Book a free discovery call. We&apos;ll map out the right
              approach for your specific project.
            </p>
            <Link
              href="/contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-10 py-4 bg-accent text-white font-sans font-semibold text-base rounded-xl hover:bg-accent-glow transition-colors duration-200"
            >
              Book a Discovery Call
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
