"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { hackathons as initialHackathons, type Hackathon } from "./hackathons"

interface HackathonsContextType {
  hackathons: Hackathon[]
  addHackathon: (hackathon: Omit<Hackathon, "id" | "participants">) => void
  updateHackathon: (id: string, hackathon: Partial<Hackathon>) => void
  deleteHackathon: (id: string) => void
  getHackathonById: (id: string) => Hackathon | undefined
}

const HackathonsContext = createContext<HackathonsContextType | undefined>(undefined)

export function HackathonsProvider({ children }: { children: ReactNode }) {
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialHackathons)

  const addHackathon = (hackathon: Omit<Hackathon, "id" | "participants">) => {
    const newHackathon: Hackathon = {
      ...hackathon,
      id: `hackathon-${Date.now()}`,
      participants: 0,
    }
    setHackathons((prev) => [newHackathon, ...prev])
  }

  const updateHackathon = (id: string, updates: Partial<Hackathon>) => {
    setHackathons((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    )
  }

  const deleteHackathon = (id: string) => {
    setHackathons((prev) => prev.filter((h) => h.id !== id))
  }

  const getHackathonById = (id: string) => {
    return hackathons.find((h) => h.id === id)
  }

  return (
    <HackathonsContext.Provider
      value={{
        hackathons,
        addHackathon,
        updateHackathon,
        deleteHackathon,
        getHackathonById,
      }}
    >
      {children}
    </HackathonsContext.Provider>
  )
}

export function useHackathons() {
  const context = useContext(HackathonsContext)
  if (context === undefined) {
    throw new Error("useHackathons must be used within a HackathonsProvider")
  }
  return context
}
