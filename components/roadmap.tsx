import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Flame, TrendingUp, Globe } from "lucide-react"

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation & Launch",
    icon: Rocket,
    items: [
      "Deploy SPL token smart contract",
      "Manual presale setup",
      "Add liquidity to Solana DEX & lock LP",
      "Publish burn schedule & wallet addresses",
    ],
  },
  {
    phase: "Phase 2",
    title: "Scheduled SODM Burns",
    icon: Flame,
    items: [
      "Execute 15-day SODM burns",
      "Publish transaction hashes",
      "Airdrop campaigns",
      "Community engagement",
    ],
  },
  {
    phase: "Phase 3",
    title: "Growth & Expansion",
    icon: TrendingUp,
    items: [
      "Complete SODM burn program",
      "Apply for ecosystem listings",
      "Staking and utility integration",
      "Listings on major exchanges",
    ],
  },
  {
    phase: "Phase 4",
    title: "Long-Term Vision",
    icon: Globe,
    items: [
      "Governance planning",
      "Ecosystem development",
      "Transparent community updates",
      "Expanded rewards programs",
    ],
  },
]

export function Roadmap() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our journey to building a trusted DeFi ecosystem on Solana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <Card
              key={phase.phase}
              className="bg-card border-border hover:border-primary/50 transition-colors relative"
            >
              <div className="absolute -top-3 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {phase.phase}
                </span>
              </div>
              <CardHeader className="pt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <phase.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{phase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
