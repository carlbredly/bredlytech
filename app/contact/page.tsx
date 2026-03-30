"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type ProjectType =
  | ""
  | "Web Development"
  | "Mobile App"
  | "SaaS Platform"
  | "AI Solution"
  | "UI/UX Design"
  | "Other";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  message: string;
}

const initialData: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) {
      e.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Invalid email";
    }
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          projectType: form.projectType,
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setStatus("idle");
        if (data.error === "server_config") {
          setSubmitError(
            "Le service est mal configuré côté serveur. Contactez l’administrateur du site (variables Supabase sur l’hébergeur)."
          );
        } else if (data.error === "save_failed") {
          setSubmitError(
            "Envoi impossible pour le moment. Réessayez plus tard ou écrivez-nous par email."
          );
        } else {
          setSubmitError("Vérifiez les champs et réessayez.");
        }
        return;
      }
      setStatus("success");
      setForm(initialData);
    } catch {
      setStatus("idle");
      setSubmitError("Erreur réseau. Vérifiez votre connexion.");
    }
  };

  return (
    <>
      {/* ── Page Header ───────────────────────────────────── */}
      <section className="pt-40 pb-16 px-6 lg:px-8" aria-labelledby="contact-title">
        <div className="max-w-8xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
              Get in Touch
            </p>
            <h1
              id="contact-title"
              className="font-serif font-bold text-snow leading-[1.04]"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s build
              <br />
              <span className="font-display italic text-accent">
                something.
              </span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <div className="gradient-divider mx-6 lg:mx-8" />

      {/* ── Main Section ──────────────────────────────────── */}
      <section
        className="py-[80px] md:py-[120px] px-6 lg:px-8"
        aria-label="Contact information and form"
      >
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* ── Left: Info ──────────────────────────────────── */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="left">
              <div className="lg:sticky lg:top-28 space-y-10">
                <div>
                  <h2
                    className="font-serif font-bold text-snow mb-4 leading-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Start the conversation.
                  </h2>
                  <p className="font-sans text-sm text-muted leading-[1.8]">
                    Tell us about your project and we&apos;ll respond within 24
                    hours with a thoughtful reply — not a generic template.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-edge rounded-xl mt-0.5">
                      <Mail size={13} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-dim mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:carlbredlyrefuse@gmail.com"
                        className="font-sans text-sm text-snow hover:text-accent transition-colors duration-200"
                      >
                        carlbredlyrefuse@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-edge rounded-xl mt-0.5">
                      <Clock size={13} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-dim mb-1">
                        Response
                      </p>
                      <p className="font-sans text-sm text-snow">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Process steps */}
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-dim mb-5">
                    What Happens Next
                  </p>
                  <ol className="space-y-4" role="list">
                    {[
                      "We review your message and scope.",
                      "We schedule a discovery call.",
                      "We send a tailored proposal.",
                      "We get to work.",
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-accent flex-shrink-0 w-5">
                          0{i + 1}
                        </span>
                        <span className="font-sans text-sm text-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Form ─────────────────────────────────── */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right" delay={0.1}>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-24 px-8 border border-accent/25 bg-accent/5 rounded-2xl text-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 flex items-center justify-center border border-accent/30 bg-accent/10 rounded-full mb-8">
                      <CheckCircle size={28} className="text-accent" />
                    </div>
                    <h3
                      className="font-serif font-bold text-snow mb-3"
                      style={{ fontSize: "1.8rem", letterSpacing: "-0.03em" }}
                    >
                      Message Received.
                    </h3>
                    <p className="font-sans text-sm text-muted max-w-md mb-10 leading-[1.8]">
                      Thanks for reaching out. We&apos;ll review your message
                      and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setSubmitError(null);
                      }}
                      className="font-mono text-[10px] uppercase tracking-widest text-muted border border-edge rounded-xl px-6 py-3 hover:text-snow hover:border-accent/40 transition-all duration-200"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="space-y-10"
                  >
                    {submitError && (
                      <p
                        className="font-sans text-sm text-red-400 border border-red-400/25 bg-red-400/5 rounded-xl px-4 py-3"
                        role="alert"
                      >
                        {submitError}
                      </p>
                    )}
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name */}
                      <div>
                        <div className="input-field">
                          <label htmlFor="name">
                            Full Name <span className="text-accent">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Carl Bredly"
                            aria-required="true"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-2 font-mono text-[9px] text-red-400 tracking-wide" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <div className="input-field">
                          <label htmlFor="email">
                            Email <span className="text-accent">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            aria-required="true"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 font-mono text-[9px] text-red-400 tracking-wide" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Company + Project Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Company */}
                      <div className="input-field">
                        <label htmlFor="company">
                          Company{" "}
                          <span className="normal-case font-sans text-[10px] text-dim tracking-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                        />
                      </div>

                      {/* Project Type */}
                      <div className="input-field">
                        <label htmlFor="projectType">Project Type</label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          className="cursor-pointer"
                          style={{ color: form.projectType ? "var(--color-snow)" : "var(--color-dim)" }}
                        >
                          <option value="" className="bg-surface">
                            Select a service...
                          </option>
                          {[
                            "Web Development",
                            "Mobile App",
                            "SaaS Platform",
                            "AI Solution",
                            "UI/UX Design",
                            "Other",
                          ].map((opt) => (
                            <option key={opt} value={opt} className="bg-surface text-snow">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="input-field">
                        <label htmlFor="message">
                          Message <span className="text-accent">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project — what you're building, your timeline, budget range, and any technical context."
                          aria-required="true"
                          style={{ resize: "none" }}
                        />
                      </div>
                      {errors.message && (
                        <p className="mt-2 font-mono text-[9px] text-red-400 tracking-wide" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-dim">
                        No spam. No cold sales. Ever.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-white font-sans font-semibold text-sm rounded-xl hover:bg-accent-glow disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                        aria-label={
                          status === "loading"
                            ? "Sending..."
                            : "Send message"
                        }
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform duration-200"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
