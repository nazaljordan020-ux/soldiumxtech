import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, CheckCircle, Clock } from "lucide-react"

const burnCycles = [
  { cycle: 1, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 2, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 3, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 4, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 5, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 6, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 7, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 8, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 9, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
  { cycle: 10, tokens: "25,000,000", percentage: "2.5%", status: "pending" },
]

export function BurnSchedule() {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              SODM Burn Schedule
            </h2>
            <Flame className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            25% of SODM tokens (250,000,000 SODM) will be burned over 10 cycles,
            every 15 days for 5 months
          </p>
        </div>

        <Card className="bg-card border-border max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-foreground">Burn Cycles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      Cycle
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      Tokens Burned
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      % of Supply
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {burnCycles.map((cycle) => (
                    <tr
                      key={cycle.cycle}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-foreground font-medium">
                        #{cycle.cycle}
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {cycle.tokens} SODM
                      </td>
                      <td className="py-3 px-4 text-primary font-semibold">
                        {cycle.percentage}
                      </td>
                      <td className="py-3 px-4">
                        {cycle.status === "completed" ? (
                          <span className="inline-flex items-center gap-1 text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                All burns are on-chain and verifiable on Solana Explorer. Transaction
                hashes will be published after each burn.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
