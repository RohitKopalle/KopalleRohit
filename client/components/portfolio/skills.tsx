"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionHeader } from "./section-header"
import {
  Code2,
  Globe,
  Layers,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react"

type Category = {
  title: string
  icon: LucideIcon
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    icon: Code2,
    items: ["Java", "Python", "C"],
  },
  {
    title: "Web",
    icon: Globe,
    items: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    items: ["React.js", "Next.js", "Tailwind CSS", "Chart.js"],
  },
  {
    title: "Backend & Database",
    icon: Database,
    items: ["MongoDB", "MySQL", "Firebase", "Supabase", "REST APIs"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Render", "Vercel"],
  },
]

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Icon className="size-5" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          {category.title}
        </h3>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {category.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + i * 0.04 }}
            className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            {item}
          </motion.span>
        ))}
      </div>

      <div
        className="pointer-events-none absolute -bottom-12 -right-12 size-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      />
    </motion.div>
  )
}

const ALL_SKILLS = [
  "Java",
  "Python",
  "C",
  "JavaScript",
  "HTML",
  "CSS",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Chart.js",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Supabase",
  "REST APIs",
  "Git",
  "GitHub",
  "Render",
  "Vercel",
]

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills & Technologies"
          description="Tools and technologies I use to bring ideas to life."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.title} category={c} index={i} />
          ))}
        </div>

        {/* Marquee strip */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex w-max animate-marquee whitespace-nowrap py-4">
            {[...ALL_SKILLS, ...ALL_SKILLS].map((s, i) => (
              <span
                key={i}
                className="mx-6 font-mono text-sm text-muted-foreground"
              >
                <span className="text-primary mr-3">◆</span>
                {s}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  )
}
