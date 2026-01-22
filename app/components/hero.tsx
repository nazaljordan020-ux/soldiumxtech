import { Button } from "@/components/ui/button"
import { BurnCountdown } from "./burn-countdown"
import { Shield, Lock, Flame } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      {/* Animated glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm text-primary font-medium">Built on Solana</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">SOLDIUM</span>
              <br />
              <span className="text-balance">Trust-First DeFi Token</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              SOLDIUM (SODM) is built for trust. Locked liquidity, scheduled SODM burns, 
              and transparent tokenomics ensure a secure and fair ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Buy Presale
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 bg-transparent">
              Tokenomics
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center lg:text-left">Locked Liquidity</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center lg:text-left">Scheduled Burns</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground text-center lg:text-left">Verified On-Chain</span>
              </div>
            </div>
          </div>

          {/* Right content - Logo and Countdown */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <Image
                src="/images/media-20-2833-29.jpeg"
                alt="SOLDIUM Logo"
                fill
                className="object-contain relative z-10 rounded-2xl"
                priority
              />
            </div>
            
            <BurnCountdown />
          </div>
        </div>
      </div>
    </section>
  )
}
