"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/** Domaine ou URL sans schéma → https://… pour que le clic ouvre bien le site externe. */
function resolveProjectHref(raw: string): string {
  const h = raw.trim();
  if (!h) return h;
  if (h.startsWith("/")) return h;
  if (/^https?:\/\//i.test(h)) return h;
  if (h.startsWith("//")) return `https:${h}`;
  return `https://${h}`;
}

function isInternalAppPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  index?: number;
  disabled?: boolean;
  /** Cible du CTA « View Project » au survol (image). */
  href?: string;
  /** Largeurs en flex-wrap (page d’accueil) — ne pas utiliser dans une grille CSS. */
  flexItemSizing?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  category,
  index = 0,
  disabled = false,
  href,
  flexItemSizing = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const resolvedHref = href ? resolveProjectHref(href) : "";
  const ctaClass =
    "pointer-events-auto relative z-[3] font-sans text-sm font-semibold text-white bg-accent px-5 py-2.5 rounded-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-accent-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.012)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
  };

  return (
    <motion.article
      className={
        flexItemSizing
          ? "h-full w-[208px] shrink-0 snap-start md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] md:shrink"
          : "h-full"
      }
      role={flexItemSizing ? "listitem" : undefined}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={
          flexItemSizing
            ? "group flex flex-col w-[208px] md:w-full h-[395px] md:h-full border border-edge bg-surface rounded-2xl overflow-hidden hover:border-accent/35 cursor-default"
            : "group h-full border border-edge bg-surface rounded-2xl overflow-hidden hover:border-accent/35 cursor-default"
        }
        style={{
          transition:
            "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
        }}
      >
        {/* Image area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-bg">
          {/* Grid texture */}
          <div
            className="absolute inset-0 max-md:opacity-[0.12] md:opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(to right, rgba(37,99,235,0.1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
          {/* Large initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-[5rem] font-bold text-accent/8">
              {title.charAt(0)}
            </span>
          </div>
          {/* Hover overlay with CTA — lien en z-[3] + pointer-events-auto pour clic fiable */}
          <div className="absolute inset-0 z-[1] bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto max-md:opacity-100 max-md:pointer-events-auto max-md:bg-transparent">
            {href ? (
              isInternalAppPath(resolvedHref) ? (
                <Link
                  href={resolvedHref}
                  className={ctaClass}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project →
                </Link>
              ) : (
                <a
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project →
                </a>
              )
            ) : (
              <span className="font-sans text-sm font-semibold text-white bg-accent px-5 py-2.5 rounded-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                View Project →
              </span>
            )}
          </div>
          {/* Category badge — corner (sous le CTA) */}
          <div className="absolute top-4 right-4 z-[2] pointer-events-none">
            <span className="font-mono text-[9px] tracking-widest uppercase text-accent/70 border border-accent/25 bg-bg/80 px-2 py-1 w-fit rounded-[24px]">
              {category}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div
          className={
            flexItemSizing
              ? "p-8 flex-1 min-h-0 flex flex-col overflow-hidden"
              : "p-8"
          }
        >
          {/* Title + arrow */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="font-serif text-xl font-bold text-snow group-hover:text-accent transition-colors duration-200 leading-tight tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h3>
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
                disabled
                  ? "border-dim/40 text-dim/40"
                  : "border-edge text-muted group-hover:border-accent group-hover:text-accent"
              }`}
            >
              <ArrowUpRight size={13} />
            </div>
          </div>

          <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2 mb-5">
            {description}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-wider uppercase text-dim border border-edge px-2.5 py-1 w-fit"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
