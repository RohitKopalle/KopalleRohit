"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Layered parallax (background blobs)
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -160])
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 120])

  // Cinematic content exit: subtle rise, scale-down, and fade
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 0.94])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0])

  // Grid depth effect
  const gridY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background layers */}
      <motion.div
        style={{ y: gridY, opacity: gridOpacity }}
        className="absolute inset-0 bg-grid bg-grid-mask will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute -top-32 -left-32 size-[480px] rounded-full bg-primary blob will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute -bottom-32 -right-32 size-[520px] rounded-full bg-chart-3 blob will-change-transform"
        aria-hidden
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 backdrop-blur px-4 py-1.5 text-xs font-mono text-muted-foreground"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]"
        >
          Kopalle Indhra
          <br />
          <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
            Kumara Rohit
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 font-mono text-sm sm:text-base text-primary"
        >
          {"// Software Development Engineer"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          I work on solving complex problems and building efficient, scalable software systems, with a focus on performance and clean design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => go("projects")}
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            View Projects
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
          >
            <FileText className="size-4" />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-12 flex items-center justify-center gap-4 text-muted-foreground"
        >
          <a
            href="https://github.com/rohitkopalle"
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/rohitkopalle"
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:rohitkopalle@gmail.com"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-secondary/40 hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
        </motion.div>
      </motion.div>

    </section>
  )
}
