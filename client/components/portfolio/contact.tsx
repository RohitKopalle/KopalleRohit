"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Github, Linkedin, Send } from "lucide-react"
import { SectionHeader } from "./section-header"

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:rohitkopalle@gmail.com",
    label: "rohitkopalle@gmail.com",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/rohitkopalle",
    label: "github.com/rohitkopalle",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/rohitkopalle",
    label: "linkedin.com/in/rohitkopalle",
  },
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<{ type: string; message: string }>({
    type: "",
    message: "",
  })
  const [sending, setSending] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: "", message: "" })
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to send message")
      setStatus({ type: "success", message: "Message sent successfully!" })
      setForm({ name: "", email: "", message: "" })
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Failed to send. Try again.",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Have a project in mind or want to connect?"
          description="Feel free to reach out. I'm open to interesting opportunities and collaborations."
          align="center"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto"
        >
          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Contact Info
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {link.name}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {link.label}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4"
          >
            <div
              className="pointer-events-none absolute -top-24 right-0 size-[300px] rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />

            <div className="relative space-y-4">
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                suppressHydrationWarning
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                suppressHydrationWarning
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                suppressHydrationWarning
                className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-vertical min-h-[120px]"
              />

              {status.message && (
                <p
                  className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                suppressHydrationWarning
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </motion.div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 text-xs font-mono text-muted-foreground border-t border-border/50 pt-8 sm:flex-row sm:items-center">
          <span className="text-center sm:text-left" suppressHydrationWarning>© {new Date().getFullYear()} Kopalle Indhra Kumara Rohit. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/rohitkopalle" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub"><Github className="size-4" /></a>
            <a href="https://linkedin.com/in/rohitkopalle" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="size-4" /></a>
            <a href="mailto:rohitkopalle@gmail.com" className="hover:text-foreground transition-colors" aria-label="Email"><Mail className="size-4" /></a>
          </div>
        </footer>
      </div>
    </section>
  )
}
