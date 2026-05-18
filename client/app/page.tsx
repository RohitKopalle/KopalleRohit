import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { ContainerScroll } from "@/components/portfolio/container-scroll"
import { Projects } from "@/components/portfolio/projects"
import { Skills } from "@/components/portfolio/skills"
import { Contact } from "@/components/portfolio/contact"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"

export default function Page() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ContainerScroll />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
