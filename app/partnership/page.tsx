"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { 
  Rocket, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Coins,
  Globe,
  Headphones,
  FileText,
  Send,
  Loader2,
  Menu,
  X
} from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Packages", href: "#packages" },
]

const services = [
  {
    icon: Coins,
    title: "Token Creation",
    description: "Custom SPL token development on Solana with your branding, supply, and tokenomics."
  },
  {
    icon: Lock,
    title: "Liquidity Locking",
    description: "Secure LP locking services to build investor trust and prevent rug pulls."
  },
  {
    icon: TrendingUp,
    title: "Launch Strategy",
    description: "Expert guidance on presale structure, pricing, and market launch timing."
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Professional landing page and dashboard for your token project."
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Telegram/Discord setup, community management, and growth strategies."
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "24/7 technical support and consultation throughout your token journey."
  }
]

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Free initial call to discuss your vision, goals, and requirements for your token project."
  },
  {
    step: "02",
    title: "Planning",
    description: "We design your tokenomics, branding, and launch strategy tailored to your needs."
  },
  {
    step: "03",
    title: "Development",
    description: "Our team creates your SPL token, smart contracts, and all technical infrastructure."
  },
  {
    step: "04",
    title: "Launch",
    description: "Coordinated launch with LP locking, marketing push, and community activation."
  }
]

const packages = [
  {
    name: "Starter",
    price: "2.5 SOL",
    description: "Perfect for new projects testing the waters",
    features: [
      "Custom SPL Token Creation",
      "Basic Tokenomics Setup",
      "1 Month LP Lock",
      "Simple Landing Page",
      "Telegram Group Setup",
      "Email Support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "7.5 SOL",
    description: "For serious projects ready to make an impact",
    features: [
      "Everything in Starter",
      "Advanced Tokenomics Design",
      "6 Month LP Lock",
      "Full Website + Dashboard",
      "Discord + Telegram Setup",
      "Marketing Kit & Graphics",
      "Priority Support",
      "Launch Coordination"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-service solution for ambitious projects",
    features: [
      "Everything in Professional",
      "Custom Smart Contracts",
      "Permanent LP Lock",
      "Advanced Dashboard Features",
      "Dedicated Account Manager",
      "Influencer Introductions",
      "Audit Coordination",
      "Ongoing Consultation"
    ],
    popular: false
  }
]

export default function PartnershipPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    projectName: "",
    description: "",
    package: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await addDoc(collection(db, "partnership_inquiries"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp()
      })
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        telegram: "",
        projectName: "",
        description: "",
        package: ""
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050a18]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050a18]/80 backdrop-blur-md border-b border-[#1e3a5f]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/media-20-2833-29.jpeg"
                  alt="SOLDIUM"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-xl font-bold text-white">SOLDIUM</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a href="#contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </a>
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-[#1e3a5f]">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#contact" className="w-full">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">
                    Get Started
                  </Button>
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-6">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Token Creation Partnership</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Launch Your Own
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Solana Token
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Partner with SOLDIUM to create, launch, and grow your own token on Solana. 
              We handle the technical complexity while you focus on building your community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#packages">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-[#1e3a5f] text-white hover:bg-[#1e3a5f] px-8 bg-transparent">
                  Free Consultation
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50+", label: "Tokens Launched" },
                { value: "100%", label: "LP Locked" },
                { value: "24/7", label: "Support" },
                { value: "0", label: "Rug Pulls" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-[#0a1628]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Full-Service Token Launch
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to create and launch a successful token project on Solana
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-[#050a18] border-[#1e3a5f] hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our streamlined process gets your token from concept to launch in as little as 48 hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-blue-600/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-blue-600/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-[#0a1628]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership Packages
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose the package that fits your project needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`relative bg-[#050a18] border-[#1e3a5f] ${
                  pkg.popular ? 'border-blue-500 ring-1 ring-blue-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-white text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-400 my-4">{pkg.price}</div>
                  <CardDescription className="text-slate-400">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact">
                    <Button 
                      className={`w-full ${
                        pkg.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, package: pkg.name }))}
                    >
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Project
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardContent className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Inquiry Submitted!</h3>
                  <p className="text-slate-400 mb-6">
                    Thank you for your interest. Our team will contact you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-[#050a18] border-[#1e3a5f] text-white placeholder:text-slate-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-[#050a18] border-[#1e3a5f] text-white placeholder:text-slate-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telegram" className="text-slate-300">Telegram Username *</Label>
                      <Input
                        id="telegram"
                        value={formData.telegram}
                        onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                        required
                        className="bg-[#050a18] border-[#1e3a5f] text-white placeholder:text-slate-500"
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectName" className="text-slate-300">Project Name *</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                        required
                        className="bg-[#050a18] border-[#1e3a5f] text-white placeholder:text-slate-500"
                        placeholder="Your Token Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="package" className="text-slate-300">Interested Package</Label>
                    <select
                      id="package"
                      value={formData.package}
                      onChange={(e) => setFormData(prev => ({ ...prev, package: e.target.value }))}
                      className="w-full h-10 px-3 rounded-md bg-[#050a18] border border-[#1e3a5f] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a package</option>
                      <option value="Starter">Starter - 2.5 SOL</option>
                      <option value="Professional">Professional - 7.5 SOL</option>
                      <option value="Enterprise">Enterprise - Custom</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-300">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      className="bg-[#050a18] border-[#1e3a5f] text-white placeholder:text-slate-500 min-h-[120px]"
                      placeholder="Tell us about your project idea, goals, and any specific requirements..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#1e3a5f]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/media-20-2833-29.jpeg"
                  alt="SOLDIUM"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-lg font-bold text-white">SOLDIUM</span>
            </div>
            <p className="text-slate-500 text-sm">
              2026 SOLDIUM. All rights reserved.
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
              Back to Main Site
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
