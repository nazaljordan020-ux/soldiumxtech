"use client"

import { useState, useEffect } from "react"
import { Flame } from "lucide-react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Default fallback date if Firebase is not configured
const DEFAULT_BURN_DATE = "2026-02-23T00:00:00Z"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownSettings {
  nextBurnDate: string
  burnAmount: string
  burnInterval: string
}

export function BurnCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isBurnTime, setIsBurnTime] = useState(false)
  const [settings, setSettings] = useState<CountdownSettings>({
    nextBurnDate: DEFAULT_BURN_DATE,
    burnAmount: "25,000,000 SODM",
    burnInterval: "15 days",
  })

  // Fetch countdown settings from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "countdown"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          setSettings({
            nextBurnDate: data.nextBurnDate || DEFAULT_BURN_DATE,
            burnAmount: data.burnAmount || "25,000,000 SODM",
            burnInterval: data.burnInterval || "15 days",
          })
        }
      },
      (error) => {
        // If there's an error (e.g., no permission), use default settings
        console.log("Using default countdown settings")
      }
    )

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const burnDate = new Date(settings.nextBurnDate)
      const now = new Date()
      const diff = burnDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsBurnTime(true)
        return
      }

      setIsBurnTime(false)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [settings.nextBurnDate])

  if (isBurnTime) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-3 rounded-xl bg-primary/20 px-6 py-4 border border-primary/30">
          <Flame className="h-8 w-8 text-primary animate-pulse" />
          <span className="text-2xl font-bold text-primary">LP Burn in Progress!</span>
          <Flame className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Flame className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Burns Begin After Presale Ends</h3>
        <Flame className="h-6 w-6 text-primary" />
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>

      <p className="text-center text-muted-foreground mt-6 text-sm">
        {settings.burnAmount} will be burned every {settings.burnInterval}
      </p>
    </div>
  )
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-card border border-border shadow-lg shadow-primary/10">
        <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}
