// Infinite marquee testimonial component — CSS animation only (no JS)
// Two copies of items for seamless loop

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Bredly Technologies delivered a platform that exceeded every expectation. The technical depth and attention to detail is genuinely world-class.",
    name: "Marcus Reynolds",
    role: "CTO",
    company: "NovaSphere Inc.",
  },
  {
    quote:
      "From day one they understood our vision and built exactly what we needed, on time and under budget. Couldn't recommend more highly.",
    name: "Sofia Andersen",
    role: "Founder",
    company: "Kova Digital",
  },
  {
    quote:
      "The AI integration they shipped transformed our internal workflows. We're saving 20+ hours per week thanks to their solution.",
    name: "James Park",
    role: "Product Manager",
    company: "Zenith Labs",
  },
  {
    quote:
      "Their code quality is exceptional. Every system they built has scaled flawlessly as we've grown 10x in users.",
    name: "Priya Nair",
    role: "VP Engineering",
    company: "Meridian Group",
  },
  {
    quote:
      "The design language they created for us became the foundation of our entire brand. We get compliments on our UI constantly.",
    name: "Daniel Osei",
    role: "CEO",
    company: "Luminary Studio",
  },
];

function TestimonialCard({ quote, name, role, company }: Testimonial) {
  return (
    <article className="testimonial-card flex-shrink-0 w-[380px] bg-surface rounded-2xl p-8 mr-6">
      <blockquote>
        <p className="font-sans text-sm text-snow/70 leading-[1.8] mb-6">
          &ldquo;{quote}&rdquo;
        </p>
        <footer>
          <cite className="not-italic">
            <span className="block font-serif text-base font-semibold text-snow tracking-tight">
              {name}
            </span>
            <span className="font-mono text-[10px] text-muted tracking-wider">
              {role} · {company}
            </span>
          </cite>
        </footer>
      </blockquote>
    </article>
  );
}

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <div
      className="overflow-hidden"
      aria-label="Client testimonials"
      role="region"
    >
      <div className="marquee-track">
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}
