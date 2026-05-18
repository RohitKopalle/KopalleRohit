"use client"

import useSWR from "swr"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Github, ExternalLink, AlertCircle, FolderOpen, RotateCw } from "lucide-react"
import { SectionHeader } from "./section-header"
import type { Project } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch projects")
    return r.json()
  })

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [isFlipped, setIsFlipped] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative h-[340px] sm:h-[360px] perspective-[1200px] cursor-pointer sm:cursor-default will-change-transform"
      onHoverStart={() => mounted && setIsFlipped(true)}
      onHoverEnd={() => mounted && setIsFlipped(false)}
      onClick={() => mounted && setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT SIDE (Old portfolio style) */}
        <div
          className="absolute inset-0 flex flex-col h-full rounded-[20px] border border-border/80 bg-card p-6 sm:p-7 shadow-sm"
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex-1 font-sans">
              {project.title || (project as any).name}
            </h3>
          </div>

          <p className="text-[0.95rem] sm:text-base text-muted-foreground leading-[1.7] flex-1 mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-end justify-between gap-4 mt-auto">
            {project.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-3 py-1 text-[11px] sm:text-xs font-medium text-[#3b82f6] whitespace-nowrap"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile flip hint */}
            <div className="sm:hidden shrink-0 flex items-center justify-center size-8 rounded-full bg-secondary/80 text-muted-foreground border border-border/50 shadow-sm backdrop-blur">
              <RotateCw className="size-4" />
            </div>
          </div>
        </div>

        {/* BACK SIDE (Old portfolio style structure) */}
        <div
          className="absolute inset-0 flex flex-col h-full rounded-[20px] border border-border/80 bg-card p-6 sm:p-7 shadow-sm"
          style={{
            transform: "rotateY(180deg) translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-4 font-sans">
            Project Overview
          </h3>
          
          <p className="text-[0.95rem] sm:text-base text-muted-foreground leading-[1.7] flex-1">
            Dive deeper into the implementation details. Explore the source code architecture or view the deployed application.
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            {(project.github || (project as any).githubUrl) && (
              <a
                href={project.github || (project as any).githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#3b82f6] px-4 py-2.5 sm:py-3 text-sm font-medium hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                <Github className="size-[18px] sm:size-4" />
                View Source Code
              </a>
            )}
            {(project.demo || (project as any).liveUrl) && (
              <a
                href={project.demo || (project as any).liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#a78bfa] px-4 py-2.5 sm:py-3 text-sm font-medium hover:bg-[#8B5CF6] hover:text-white transition-colors"
              >
                <ExternalLink className="size-[18px] sm:size-4" />
                Visit Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export function Projects() {
  const { data, error, isLoading, mutate } = useSWR<{ projects?: Project[] } | Project[]>(
    `${API_URL}/projects`,
    fetcher,
    { revalidateOnFocus: false },
  )

  // Handle both array response and { projects: [] } response formats
  const projects = Array.isArray(data) ? data : (data?.projects || [])

  return (
    <section id="projects" className="relative py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects"
          description="A selection of projects I've built — from full-stack applications to developer tools."
        />

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl border border-border bg-card/40 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
              <AlertCircle className="size-7" />
            </div>
            <p className="text-lg font-medium mb-2">
              Could not load projects
            </p>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              There was an issue connecting to the server. Please check your connection and try again.
            </p>
            <button
              onClick={() => mutate()}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p._id || p.title || (p as any).name} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <FolderOpen className="size-7" />
            </div>
            <p className="text-lg font-medium mb-2">
              No projects yet
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              Projects will appear here once they're added to the database. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
