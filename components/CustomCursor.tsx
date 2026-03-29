"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SEL =
  "a, button, [role='button'], input, textarea, select, label";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    /** Capture delegation: avoids stacking mouseenter/mouseleave on every DOM mutation (Framer, etc.). */
    const onMouseOverCapture = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest(INTERACTIVE_SEL)) {
        document.body.classList.add("cursor-expand");
      }
    };

    const onMouseOutCapture = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const rel = e.relatedTarget;
      if (rel instanceof Node && t.contains(rel)) return;
      const boundary = t.closest(INTERACTIVE_SEL);
      if (!boundary) return;
      if (rel instanceof Node && boundary.contains(rel)) return;
      document.body.classList.remove("cursor-expand");
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOverCapture, true);
    document.addEventListener("mouseout", onMouseOutCapture, true);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOverCapture, true);
      document.removeEventListener("mouseout", onMouseOutCapture, true);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("cursor-expand");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
