import Image from "next/image"
import Link from "next/link"
import { Twitter, Send, Globe, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/media-20-2833-29.jpeg"
                  alt="SOLDIUM"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold text-foreground">SOLDIUM</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              SOLDIUM (SODM) is built for trust. Locked liquidity, scheduled SODM burns, 
              and transparent tokenomics ensure a secure and fair ecosystem.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/intent/follow?screen_name=SoldiumX"
                className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors"
                aria-label="X"
              >
                <Twitter className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors"
                aria-label="Tokenomics"
              >
                <FileText className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#tokenomics" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#burn-schedule" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Burn Schedule
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#presale" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Presale
                </a>
              </li>
            </ul>
          </div>

          {/* Token Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Token Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground">
                <span className="text-foreground">Symbol:</span> SODM
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground">Network:</span> Solana
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground">Supply:</span> 1B SODM
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground">Decimals:</span> 9
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SOLDIUM. All rights reserved. | Built on Solana
          </p>
        </div>
      </div>
    </footer>
  )
}
