"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Droplets, Users, Gift, Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const allocations = [
  {
    name: "Presale",
    percentage: 40,
    tokens: "400,000,000",
    icon: Coins,
    color: "bg-primary",
    wallet: "8e4GdTky86JdLpTUfCjWXcZqv7GuXkMDSkFMUGnNfsL3",
  },
  {
    name: "LP Tokens LOCKED",
    percentage: 25,
    tokens: "250,000,000",
    icon: Droplets,
    color: "bg-accent",
    wallet: "FqNj9NhbA6LAcYhrSeaY5HeNsBtUKM9u6pi51qHZ9c1g",
  },
  {
    name: "Tokens allocated for burns",
    percentage: 25,
    tokens: "250,000,000",
    icon: Droplets,
    color: "bg-accent",
    wallet: "FqNj9NhbA6LAcYhrSeaY5HeNsBtUKM9u6pi51qHZ9c1g",
  },
  {
    name: "Marketing",
    percentage: 5,
    tokens: "50,000,000",
    icon: Users,
    color: "bg-secondary",
    wallet: "GsAWKLeuX16Q6FuVn9kCJggbmCCz48EMFGNB2UfhmeAK",
  },
  {
    name: "Airdrop & Rewards",
    percentage: 5,
    tokens: "50,000,000",
    icon: Gift,
    color: "bg-muted",
    wallet: "AuYeJob9d7LcQNFkta5vtGxXAxcmcNszFM8uJaYUACap",
  },
]

export function Tokenomics() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const copyToClipboard = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    setCopiedWallet(wallet);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const truncateWallet = (wallet: string) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  return (
    <section id="tokenomics" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tokenomics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Total Supply: 1,000,000,000 SODM - Transparent and verifiable on Solana
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {allocations.map((item) => (
            <Card
              key={item.name}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-1">
                  {item.percentage}%
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.tokens} SODM</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-slate-400 bg-[#0f2340] px-2 py-1 rounded">
                    {truncateWallet(item.wallet)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-[#1e3a5f]"
                    onClick={() => copyToClipboard(item.wallet)}
                  >
                    {copiedWallet === item.wallet ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <a
                    href={`https://solscan.io/account/${item.wallet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Allocation Table */}
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="text-foreground">Token Allocation Details</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-[#0f2340]">
                    <th className="text-left text-sm font-semibold text-slate-300 px-6 py-4">Allocation</th>
                    <th className="text-left text-sm font-semibold text-slate-300 px-6 py-4">Percentage</th>
                    <th className="text-left text-sm font-semibold text-slate-300 px-6 py-4">Token Count (1B Supply)</th>
                    <th className="text-left text-sm font-semibold text-slate-300 px-6 py-4">Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((item, index) => (
                    <tr 
                      key={item.name} 
                      className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-[#0a1220]'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded ${item.color}`}>
                            <item.icon className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <span className="font-medium text-foreground">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-primary font-bold">{item.percentage}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-foreground">{item.tokens} SODM</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="text-xs text-slate-400 bg-[#0f2340] px-2 py-1 rounded font-mono">
                            {truncateWallet(item.wallet)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-slate-400 hover:text-white hover:bg-[#1e3a5f]"
                            onClick={() => copyToClipboard(item.wallet)}
                          >
                            {copiedWallet === item.wallet ? (
                              <Check className="h-3.5 w-3.5 text-green-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <a
                            href={`https://solscan.io/account/${item.wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-primary transition-colors p-1"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
