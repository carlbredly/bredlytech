import Link from "next/link";
import { Github, Instagram, Twitter } from "lucide-react";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Web Development", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "SaaS Development", href: "/services#saas" },
    { label: "AI Solutions", href: "/services#ai" },
    { label: "UI/UX Design", href: "/services#design" },
  ],
};

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/carlbredly" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/carlbredly.raw/" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/carlbredlyai" },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg" aria-label="Site footer">
      {/* Top gradient divider */}
      <div className="gradient-divider" />

      <div className="max-w-8xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        {/* Large display text */}
        <div className="overflow-hidden mb-16">
          <p
            className="font-serif font-bold text-snow/[0.06] leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            aria-hidden="true"
          >
            Bredly Technologies
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="group inline-flex flex-col leading-none mb-5">
              <span className="font-serif text-xl font-bold text-snow group-hover:text-accent transition-colors duration-200">
                Bredly
              </span>
              <span className="font-mono text-[8px] text-muted tracking-[0.22em] uppercase">
                Technologies
              </span>
            </Link>
            <p className="font-sans text-sm text-muted leading-relaxed max-w-[200px]">
              Building the future, one line at a time.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-edge rounded-xl text-muted hover:text-snow hover:border-accent/40 transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-6">
              Company
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted hover:text-snow transition-colors duration-200 link-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted hover:text-snow transition-colors duration-200 link-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim mb-6">
              Contact
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="mailto:carlbredlyrefuse@gmail.com"
                  className="font-sans text-sm text-muted hover:text-snow transition-colors duration-200"
                >
                  carlbredlyrefuse@gmail.com
                </a>
              </li>
              <li className="font-sans text-sm text-muted">
                Response within 24h
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent hover:text-snow transition-colors duration-200 group"
                >
                  Start a project
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="gradient-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-dim">
            © 2025 Bredly Technologies LLC. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <CookieSettingsButton />
            <p className="font-mono text-[11px] text-dim">
              Built with precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
