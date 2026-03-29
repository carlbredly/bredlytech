"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  BrainCircuit,
  Paintbrush,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  BrainCircuit,
  Paintbrush,
};

interface BentoTileProps {
  iconName: string;
  title: string;
  description: string;
  tag: string;
  featured?: boolean;
  index?: number;
}

function BentoTile({
  iconName,
  title,
  description,
  tag,
  featured = false,
  index = 0,
}: BentoTileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[iconName] ?? Globe;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.setProperty("--mouse-x", `${x}%`);
    glow.style.setProperty("--mouse-y", `${y}%`);

    // Subtle 3D tilt
    const tiltX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const tiltY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(900px) rotateY(${tiltX * 5}deg) rotateX(${-tiltY * 5}deg) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={featured ? "md:col-span-2" : ""}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bento-card relative h-full min-h-[220px] border border-edge bg-surface rounded-2xl p-10 overflow-hidden group hover:border-accent/40 cursor-default"
        style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease" }}
      >
        {/* Radial mouse-follow glow */}
        <div
          ref={glowRef}
          className="bento-glow"
          aria-hidden="true"
        />

        {/* Featured animated background lines */}
        {featured && (
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(to right, rgba(37,99,235,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />
        )}

        {/* Icon */}
        <div
          className={`mb-6 w-12 h-12 flex items-center justify-center border rounded-sm transition-all duration-300 ${
            featured
              ? "border-accent/40 bg-accent/10"
              : "border-edge bg-white/[0.03] group-hover:border-accent/30 group-hover:bg-accent/5"
          }`}
        >
          <Icon
            size={20}
            className={featured ? "text-accent" : "text-muted group-hover:text-accent transition-colors duration-300"}
          />
        </div>

        {/* Content */}
        <h3
          className={`font-serif font-bold tracking-tight mb-3 ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>

        <p className="font-sans text-sm text-muted leading-relaxed mb-8 max-w-sm">
          {description}
        </p>

        {/* Tag — bottom */}
        <div className="absolute bottom-6 left-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-dim border border-dim/40 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        </div>

        {/* Arrow — bottom-right */}
        <div className="absolute bottom-5 right-8 text-dim group-hover:text-accent transition-colors duration-300 text-sm font-mono">
          →
        </div>
      </div>
    </motion.div>
  );
}

// Data defined here to avoid server→client function-ref issues
const tiles: BentoTileProps[] = [
  {
    iconName: "BrainCircuit",
    title: "AI Solutions",
    description:
      "Custom LLM integrations, RAG pipelines, and intelligent automation that give your product an unfair advantage.",
    tag: "Featured",
    featured: true,
  },
  {
    iconName: "Globe",
    title: "Web Development",
    description:
      "High-performance web apps built for scale, speed, and conversion.",
    tag: "Core",
  },
  {
    iconName: "Smartphone",
    title: "Mobile Apps",
    description:
      "Cross-platform experiences that feel native on iOS and Android.",
    tag: "Core",
  },
  {
    iconName: "LayoutDashboard",
    title: "SaaS Development",
    description:
      "End-to-end SaaS with multi-tenancy, billing, and infrastructure built to grow.",
    tag: "Core",
  },
  {
    iconName: "Paintbrush",
    title: "UI/UX Design",
    description:
      "Editorial design systems that communicate trust and sophistication.",
    tag: "Core",
  },
];

export default function ServiceBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiles.map((tile, i) => (
        <BentoTile key={tile.title} {...tile} index={i} />
      ))}
    </div>
  );
}
