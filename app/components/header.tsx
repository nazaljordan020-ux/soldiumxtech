"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Burn Schedule", href: "#burn-schedule" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Presale", href: "#presale" },
  { name: "Partnership", href: "/partnership" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/images/media-20-2833-29.jpeg"
                alt="SOLDIUM"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-xl font-bold text-foreground">SOLDIUM</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join Presale
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link href="/auth" className="w-full">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-2">
                  Join Presale
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
