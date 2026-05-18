"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export function Navbar() {
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(
        Boolean,
      ) as HTMLElement[]
      const y = window.scrollY + 120
      let current = "home"
      for (const s of sections) {
        if (s.offsetTop <= y) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-4 sm:px-6 py-3 transition-all",
            scrolled
              ? "bg-background/70 border-border backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
              : "bg-background/30 border-transparent backdrop-blur-md",
          )}
        >
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 font-mono text-sm tracking-tight text-foreground"
          >
            <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <span className="font-semibold">rohit.dev</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={cn(
                  "relative px-4 py-2 text-sm rounded-full transition-colors",
                  active === n.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => go("contact")}
              className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm hover:bg-secondary transition-colors"
            >
              Get in touch
            </button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center size-9 rounded-full border border-border bg-secondary/60"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border border-border bg-background/90 backdrop-blur-xl p-2"
            >
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm transition-colors",
                    active === n.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary",
                  )}
                >
                  {n.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
