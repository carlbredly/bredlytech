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

interface ServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({
  iconName,
  title,
  description,
  index = 0,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[iconName] ?? Globe;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full border border-edge bg-surface rounded-2xl p-8 overflow-hidden hover:border-accent/40 cursor-default"
        style={{
          transition:
            "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
        }}
      >
        {/* Hover glow layer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(37,99,235,0.3), 0 0 40px rgba(37,99,235,0.05)",
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div className="mb-6 w-11 h-11 flex items-center justify-center border border-edge rounded-xl bg-white/[0.03] group-hover:border-accent/35 group-hover:bg-accent/8 transition-all duration-300">
          <Icon size={18} className="text-muted group-hover:text-accent transition-colors duration-300" />
        </div>

        {/* Text */}
        <h3
          className="font-serif text-lg font-bold text-snow mb-3 tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>
        <p className="font-sans text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
