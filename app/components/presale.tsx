"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Calculator, ArrowRight } from "lucide-react"

const PRESALE_PRICE = 0.00005

export function Presale() {
  const [amount, setAmount] = useState("")
  const tokensToReceive = amount ? (parseFloat(amount) / PRESALE_PRICE).toLocaleString() : "0"

  return (
    <section id="presale" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join the Presale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Be an early supporter of SOLDIUM. Get SODM tokens at the presale price of $0.00005
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Calculator Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-foreground">Token Calculator</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">
                  Amount (USD)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
                <p className="text-sm text-muted-foreground mb-1">You will receive</p>
                <p className="text-3xl font-bold text-primary">{tokensToReceive}</p>
                <p className="text-sm text-muted-foreground">SODM Tokens</p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Presale Price: $0.00005 per SODM
              </p>
            </CardContent>
          </Card>

          {/* Presale Info Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-foreground">Presale Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-foreground font-semibold">$0.00005</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Allocation</span>
                  <span className="text-foreground font-semibold">400,000,000 SODM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-semibold">Solana</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-primary font-semibold">Active</span>
                </div>
              </div>

              <Link href="/auth" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  Join Presale
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                By participating, you agree to our terms. All transactions are verifiable on Solana.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
