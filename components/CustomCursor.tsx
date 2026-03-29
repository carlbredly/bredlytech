"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SEL =
  "a, button, [role='button'], input, textarea, select, label";

/** Seuil en px² : en dessous, l’anneau est considéré aligné → plus de rAF (évite ~60 appels/s en continu). */
const RING_STOP_EPS2 = 0.36;

function setCursorTransform(el: HTMLDivElement | null, x: number, y: number) {
  if (!el) return;
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function eventTargetToElement(t: EventTarget | null): Element | null {
  if (t instanceof Element) return t;
  if (t instanceof Text && t.parentElement) return t.parentElement;
  return null;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const cursorExpandedRef = useRef(false);
  const lastHitRef = useRef<Element | null>(null);
  const ringInitializedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const scheduleRingTick = () => {
      if (rafRef.current !== 0) return;
      if (document.visibilityState === "hidden") return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      if (document.visibilityState === "hidden") {
        rafRef.current = 0;
        return;
      }

      const { x, y } = mouse.current;
      ring.current.x = lerp(ring.current.x, x, 0.38);
      ring.current.y = lerp(ring.current.y, y, 0.38);
      setCursorTransform(ringRef.current, ring.current.x, ring.current.y);

      const dx = x - ring.current.x;
      const dy = y - ring.current.y;
      if (dx * dx + dy * dy > RING_STOP_EPS2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouse.current.x = x;
      mouse.current.y = y;
      lastHitRef.current = eventTargetToElement(e.target);

      setCursorTransform(dotRef.current, x, y);

      if (!ringInitializedRef.current) {
        ring.current.x = x;
        ring.current.y = y;
        setCursorTransform(ringRef.current, x, y);
        ringInitializedRef.current = true;
      }

      const hit = lastHitRef.current;
      const nextExpand = !!(hit && hit.closest(INTERACTIVE_SEL));
      if (nextExpand !== cursorExpandedRef.current) {
        cursorExpandedRef.current = nextExpand;
        document.body.classList.toggle("cursor-expand", nextExpand);
      }

      scheduleRingTick();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden" && rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current !== 0) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      cursorExpandedRef.current = false;
      ringInitializedRef.current = false;
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
