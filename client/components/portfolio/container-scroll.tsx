"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Code2, Sparkles, Layers } from "lucide-react"

/**
 * Aceternity-style container scroll: a 3D-tilted card that rotates flat
 * and scales up as the user scrolls. Adapted to the portfolio theme.
 */
export function ContainerScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScrollAnimation
        titleComponent={
          <>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-px w-6 bg-primary" />
              Engineering in Motion
            </div>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Built for correctness, performance, <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
                and scale.
              </span>
            </h2>
          </>
        }
      >
        <PreviewSurface />
      </ContainerScrollAnimation>
    </div>
  )
}

function ContainerScrollAnimation({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const scaleDimensions = (): [number, number] => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-border p-2 md:p-6 bg-card rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-secondary/40 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}

function PreviewSurface() {
  return (
    <div className="relative h-full w-full rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-primary/70" />
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          ~/portfolio · main
        </div>
        <div className="size-4" />
      </div>

      <div className="relative flex-1 grid gap-4 p-4 sm:p-8 sm:grid-cols-3 overflow-auto">
        <FeatureTile
          icon={Code2}
          eyebrow="01 / Code"
          title="Clean architecture"
          description="Modular, typed, testable. Designed to evolve without breaking."
        />
        <FeatureTile
          icon={Sparkles}
          eyebrow="02 / Craft"
          title="Performance-driven interfaces"
          description="Interfaces designed with clarity, responsiveness, and usability in mind."
        />
        <FeatureTile
          icon={Layers}
          eyebrow="03 / Systems"
          title="Scalable systems"
          description="Backed by reliable storage, observability, and clear data flow."
        />

        <div className="sm:col-span-3 rounded-xl border border-border bg-secondary/40 p-5 font-mono text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <div className="text-primary">{"// system.ts"}</div>
          <div>
            <span className="text-chart-2">export</span>{" "}
            <span className="text-chart-2">async function</span>{" "}
            <span className="text-foreground">build</span>
            {"(spec: Spec): Promise<Result> {"}
          </div>
          <div className="pl-4">
            <span className="text-chart-2">const</span>{" "}
            <span className="text-foreground">plan</span>
            {" = "}
            <span className="text-chart-2">await</span>{" "}
            <span className="text-foreground">analyze</span>
            {"(spec)"}
          </div>
          <div className="pl-4">
            <span className="text-chart-2">const</span>{" "}
            <span className="text-foreground">artifact</span>
            {" = "}
            <span className="text-chart-2">await</span>{" "}
            <span className="text-foreground">compile</span>
            {"(plan, { strict: true })"}
          </div>
          <div className="pl-4">
            <span className="text-chart-2">return</span>{" "}
            <span className="text-foreground">deploy</span>
            {"(artifact)"}
          </div>
          <div>{"}"}</div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
    </div>
  )
}

function FeatureTile({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof Code2
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
          <Icon className="size-4" />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </div>
      </div>
      <div className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {title}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
