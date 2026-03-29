"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-2xl border-b border-edge"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto w-full px-6 lg:px-8 flex items-center justify-between">
          {/* Logo — stacked */}
          <Link
            href="/"
            className="group flex flex-col leading-none"
            aria-label="Bredly Technologies — Home"
          >
            <span className="font-serif text-[1.15rem] font-bold text-snow tracking-tight group-hover:text-accent transition-colors duration-200">
              Bredly
            </span>
            <span className="font-mono text-[8px] text-muted tracking-[0.22em] uppercase leading-none">
              Technologies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-sm transition-colors duration-200 group ${
                  pathname === link.href
                    ? "text-snow"
                    : "text-muted hover:text-snow"
                }`}
              >
                {link.label}
                {/* Active dot indicator */}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="font-sans text-sm font-medium px-5 py-2 rounded-full border border-accent/60 text-snow hover:bg-accent hover:border-accent transition-all duration-200"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile — animated hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`absolute block h-px w-5 bg-snow transition-all duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-px bg-snow transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"
              }`}
            />
            <span
              className={`absolute block h-px w-5 bg-snow transition-all duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 32px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 48px) 32px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 32px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-5xl font-bold tracking-tight transition-colors duration-200 ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-snow hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-sans font-semibold text-base rounded-full"
                >
                  Start a Project →
                </Link>
              </motion.div>
            </nav>

            {/* Mono label bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 font-mono text-xs text-dim tracking-widest uppercase"
            >
              Bredly Technologies LLC
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
