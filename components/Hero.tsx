"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MeshBackground from "./MeshBackground";

// ── Magnetic CTA (raf pour limiter getBoundingClientRect) ───
interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

function MagneticLink({ href, children, className = "" }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let lastEvent: MouseEvent | null = null;

    const apply = () => {
      rafId = 0;
      if (!lastEvent) return;
      const e = lastEvent;
      lastEvent = null;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMove = (e: MouseEvent) => {
      lastEvent = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const handleLeave = () => {
      lastEvent = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      style={{
        transition:
          "transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.2s, color 0.2s",
      }}
    >
      {children}
    </Link>
  );
}

// ── Word-by-word text reveal ─────────────────────────────────
interface WordRevealProps {
  text: string;
  startDelay?: number;
  className?: string;
  italic?: boolean;
}

function WordReveal({
  text,
  startDelay = 0,
  className = "",
  italic = false,
}: WordRevealProps) {
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: startDelay + i * 0.04,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block mr-[0.2em] ${italic ? "italic" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Hero ─────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="relative isolate min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Animated mesh gradient */}
      <MeshBackground />

      {/* Faint blue grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/35 bg-accent/8 font-mono text-[11px] text-accent/85 tracking-wider">
            <span className="text-accent text-xs">✦</span>
            Now accepting new clients
          </span>
        </motion.div>

        {/* Headline — 3 lines with word-by-word reveal */}
        <h1
          className="font-serif font-bold leading-[1.04] tracking-tight mb-8"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
        >
          <span className="block text-snow">
            <WordReveal text="We build software" startDelay={0.1} />
          </span>
          {/* Italic line — Instrument Serif, accent blue */}
          <span className="block font-display text-accent">
            <WordReveal text="that scales." startDelay={0.32} italic />
          </span>
          <span className="block text-snow">
            <WordReveal text="for modern businesses." startDelay={0.52} />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[1.1rem] md:text-lg text-muted max-w-lg mx-auto leading-[1.75] mb-12"
        >
          Custom web apps, SaaS platforms, and AI-powered experiences.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-28"
        >
          <MagneticLink
            href="/contact"
            className="btn-shimmer group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-white font-sans font-semibold text-sm rounded-xl hover:bg-accent-glow"
          >
            Start a Project
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </MagneticLink>

          <Link
            href="/portfolio"
            className="font-sans text-sm text-muted hover:text-snow transition-colors duration-200 inline-flex items-center gap-1.5 group"
          >
            View our work
            <span className="group-hover:translate-y-0.5 transition-transform duration-200">
              ↓
            </span>
          </Link>
        </motion.div>

        {/* Trusted-by logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.65 }}
          className="flex flex-col items-center gap-5"
        >
          <p className="font-mono text-[10px] text-dim tracking-[0.25em] uppercase">
            Trusted by teams at →
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["AIverse", "Faynme", "Nvoice", "NyouzRadio", "Gruztchik Co"].map(
              (name) => (
                <span
                  key={name}
                  className="font-mono text-[11px] md:text-xs text-dim hover:text-muted transition-colors duration-300"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-dim/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
