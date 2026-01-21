import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Tokenomics } from "@/components/tokenomics"
import { BurnSchedule } from "@/components/burn-schedule"
import { Roadmap } from "@/components/roadmap"
import { Presale } from "@/components/presale"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section id="tokenomics">
        <Tokenomics />
      </section>
      <section id="burn-schedule">
        <BurnSchedule />
      </section>
      <section id="roadmap">
        <Roadmap />
      </section>
      <Presale />
      <Footer />
    </main>
  )
}
