"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

type Category = "All" | "Web" | "Mobile" | "SaaS" | "AI";

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

const categories: Category[] = ["All", "Web", "Mobile", "SaaS", "AI"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <section
        className="pt-40 pb-16 px-6 lg:px-8"
        aria-labelledby="portfolio-title"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
              Selected Work
            </p>
            <h1
              id="portfolio-title"
              className="font-serif font-bold text-snow leading-[1.04]"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Our Work
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 font-sans text-lg text-muted max-w-xl leading-[1.75]">
              A curated selection across industries and disciplines. Every
              product built with precision and purpose.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filter Bar ────────────────────────────────────── */}
      <section
        className="pb-12 px-6 lg:px-8"
        aria-label="Filter by category"
      >
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Project category filters"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                  className={`font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 border rounded-full transition-all duration-200 ${
                    active === cat
                      ? "bg-accent border-accent text-white"
                      : "border-edge text-muted hover:border-accent/40 hover:text-snow bg-transparent"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span
                      className={`ml-2 ${active === cat ? "text-white/60" : "text-dim"}`}
                    >
                      {projects.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Projects Grid ─────────────────────────────────── */}
      <section className="pb-[120px] px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-24">
              <p className="font-sans text-muted">
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <div className="gradient-divider mx-6 lg:mx-8" />
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
              Want to see your project here?
            </h2>
            <p className="font-sans text-muted mb-10">
              Let&apos;s build something worth showcasing.
            </p>
            <a
              href="/contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-10 py-4 bg-accent text-white font-sans font-semibold text-base rounded-xl hover:bg-accent-glow transition-colors duration-200"
            >
              Start a Conversation
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
