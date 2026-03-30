import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  Layers,
  Rocket,
  ArrowRight,
  Star,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import ProjectCard from "@/components/ProjectCard";
import Marquee from "@/components/Marquee";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Bredly Technologies LLC — Software & AI Agency",
  description:
    "We build powerful software and AI solutions for modern businesses. Custom web apps, SaaS platforms, and digital experiences that scale.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: "Bredly Technologies LLC — Software & AI Agency",
    description:
      "Custom web apps, SaaS platforms, and digital experiences that scale.",
  },
};

const whyUs = [
  {
    icon: CheckCircle,
    title: "Quality Craftsmanship",
    body: "We don\u2019t ship mediocre work. Every line of code and every pixel is deliberate, tested, and built to last for years.",
  },
  {
    icon: Layers,
    title: "Built to Scale",
    body: "Architecture that grows with your business \u2014 from first user to enterprise scale, without a painful rewrite.",
  },
  {
    icon: Rocket,
    title: "Fast Turnaround",
    body: "From concept to launch, we move fast. Execution velocity is our most powerful competitive advantage.",
  },
];

const projects = [
  {
    title: "AIverse",
    description:
      "Reference directory of AI tools: instant search, advanced filters, interactive global map, and community upvotes — so every developer, marketer, and entrepreneur can find the right tool in under 30 seconds..",
    tags: ["React", "TypeScript", "Vite", "Supabase"],
    category: "SaaS",
    href: "https://aiverse-tawny.vercel.app",
    image: "/images/aiverse.png",
    imageAlt: "Aiverse",
  
  },
  {
    title: "MB Retouch Academy",
    description:
      "Online Training Platform — a modern web application enabling the management, delivery, and tracking of digital courses for students and administrators.",
    tags: ["React", "Typescript", "TailwindCSS", "Supabase"],
    category: "Web",
    href: "https://retouchacademy.vercel.app/",
    image: "/images/retouchacademy.png",
    imageAlt: "MB Retouch Academy",
  },
  {
    title: "Nvoice",
    description:
      "modern, user-friendly web application that allows users to create, customize, and download professional invoices in PDF format..",
    tags: ["HTML5", "CSS3", "Vanilla", "jsPDF"],
    category: "Web",
    href: "https://nvoice-gamma.vercel.app",
    image: "/images/nvoice.png",
    imageAlt: "Nvoice",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <Hero />

      {/* ── Services Bento ────────────────────────────────── */}
      <section
        className="py-[100px] md:py-[160px] px-6 lg:px-8"
        aria-labelledby="services-heading"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="font-serif font-bold text-snow leading-tight max-w-xl"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Five disciplines, one obsession.
            </h2>
          </ScrollReveal>

          <ServiceBento />

          <ScrollReveal delay={0.3} className="mt-10 flex justify-end">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-snow transition-colors duration-200"
            >
              All services
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Why Choose Us ─────────────────────────────────── */}
      <section
        className="py-[100px] md:py-[160px] px-6 lg:px-8"
        aria-labelledby="why-heading"
      >
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <ScrollReveal
              direction="left"
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                Our Approach
              </p>
              <h2
                id="why-heading"
                className="font-serif font-bold text-snow leading-tight"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Why teams choose Bredly.
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-8 space-y-0 divide-y divide-edge">
              {whyUs.map(({ icon: Icon, title, body }, i) => (
                <ScrollReveal key={title} delay={i * 0.1} className="group py-10 first:pt-0">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 mt-1 w-10 h-10 flex items-center justify-center border border-edge rounded-xl bg-white/[0.03] group-hover:border-accent/35 group-hover:bg-accent/8 transition-all duration-300">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
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
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Featured Projects ──────────────────────────────── */}
      <section
        className="py-[100px] md:py-[160px] px-6 lg:px-8"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                Selected Work
              </p>
              <h2
                id="projects-heading"
                className="font-serif font-bold text-snow leading-tight"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Projects we&apos;re proud of.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-snow transition-colors duration-200 flex-shrink-0"
            >
              Full portfolio
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </ScrollReveal>

          <div className="relative -mx-6 md:mx-auto md:w-[839px] md:max-w-full">
            {/* Fades latéraux mobile : gradient long et sans stop « via » pour éviter les bandes dures */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 md:hidden bg-[linear-gradient(90deg,var(--color-bg),transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 md:hidden bg-[linear-gradient(270deg,var(--color-bg),transparent)]"
            />
            <div
              className="flex flex-nowrap gap-4 overflow-x-auto md:overflow-x-visible overscroll-x-contain snap-x snap-mandatory md:snap-none min-h-[155px] w-full max-w-full px-6 pb-2 md:px-0 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label="Projets mis en avant"
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={i}
                  flexItemSizing
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ── Testimonials Marquee ───────────────────────────── */}
      {/*<section
        className="py-[100px] md:py-[160px]"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-8 mb-16">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              Client Stories
            </p>
            <h2
              id="testimonials-heading"
              className="font-serif font-bold text-snow leading-tight"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Trusted by builders.
            </h2>
          </ScrollReveal>
        </div>
        {/* Marquee extends full width */}
        {/*<Marquee />
       </section>*/}
      

      <div className="gradient-divider" />

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section
        className="py-[100px] md:py-[160px] px-6 lg:px-8 text-center"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-6">
              Next Step
            </p>
            <h2
              id="cta-heading"
              className="font-serif font-bold text-snow leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to build something great?
            </h2>
            <p className="font-sans text-lg text-muted mb-12 leading-relaxed">
              Let&apos;s turn your idea into a product.
            </p>
            <Link
              href="/contact"
              className="btn-shimmer group inline-flex items-center gap-3 px-10 py-4 bg-accent text-white font-sans font-semibold text-base rounded-xl hover:bg-accent-glow transition-colors duration-200"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
