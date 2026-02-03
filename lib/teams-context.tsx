"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Team {
  id: string
  name: string
  hackathonId: string
  leaderId: string
  members: { userId: string; name: string; email: string }[]
  maxSize: number
  createdAt: string
}

interface TeamsContextType {
  teams: Team[]
  getTeamsForHackathon: (hackathonId: string) => Team[]
  getUserTeam: (hackathonId: string) => Team | undefined
  createTeam: (name: string, hackathonId: string, maxSize: number) => Promise<{ success: boolean; error?: string }>
  joinTeam: (teamId: string) => Promise<{ success: boolean; error?: string }>
  leaveTeam: (teamId: string) => void
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined)

// Simulated teams database
const initialTeams: Team[] = [
  {
    id: "team-1",
    name: "AI Innovators",
    hackathonId: "1",
    leaderId: "user-1",
    members: [
      { userId: "user-1", name: "Demo User", email: "demo@hackstack.com" },
    ],
    maxSize: 5,
    createdAt: "2026-01-15",
  },
  {
    id: "team-2",
    name: "Blockchain Builders",
    hackathonId: "2",
    leaderId: "user-2",
    members: [
      { userId: "user-2", name: "Alice Smith", email: "alice@example.com" },
      { userId: "user-3", name: "Bob Jones", email: "bob@example.com" },
    ],
    maxSize: 4,
    createdAt: "2026-01-20",
  },
]

export function TeamsProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const { user } = useAuth()

  const getTeamsForHackathon = (hackathonId: string) => {
    return teams.filter((team) => team.hackathonId === hackathonId)
  }

  const getUserTeam = (hackathonId: string) => {
    if (!user) return undefined
    return teams.find(
      (team) =>
        team.hackathonId === hackathonId &&
        team.members.some((m) => m.userId === user.id)
    )
  }

  const createTeam = async (name: string, hackathonId: string, maxSize: number): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "Please login to create a team" }
    }

    const existingTeam = getUserTeam(hackathonId)
    if (existingTeam) {
      return { success: false, error: "You are already in a team for this hackathon" }
    }

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name,
      hackathonId,
      leaderId: user.id,
      members: [{ userId: user.id, name: user.name, email: user.email }],
      maxSize,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTeams((prev) => [...prev, newTeam])
    return { success: true }
  }

  const joinTeam = async (teamId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "Please login to join a team" }
    }

    const team = teams.find((t) => t.id === teamId)
    if (!team) {
      return { success: false, error: "Team not found" }
    }

    if (team.members.length >= team.maxSize) {
      return { success: false, error: "Team is full" }
    }

    if (team.members.some((m) => m.userId === user.id)) {
      return { success: false, error: "You are already in this team" }
    }

    const existingTeam = getUserTeam(team.hackathonId)
    if (existingTeam) {
      return { success: false, error: "You are already in another team for this hackathon" }
    }

    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? {
              ...t,
              members: [...t.members, { userId: user.id, name: user.name, email: user.email }],
            }
          : t
      )
    )

    return { success: true }
  }

  const leaveTeam = (teamId: string) => {
    if (!user) return

    setTeams((prev) =>
      prev
        .map((team) => {
          if (team.id !== teamId) return team
          const newMembers = team.members.filter((m) => m.userId !== user.id)
          if (newMembers.length === 0) return null
          return {
            ...team,
            members: newMembers,
            leaderId: team.leaderId === user.id ? newMembers[0].userId : team.leaderId,
          }
        })
        .filter((team): team is Team => team !== null)
    )
  }

  return (
    <TeamsContext.Provider
      value={{
        teams,
        getTeamsForHackathon,
        getUserTeam,
        createTeam,
        joinTeam,
        leaveTeam,
      }}
    >
      {children}
    </TeamsContext.Provider>
  )
}

export function useTeams() {
  const context = useContext(TeamsContext)
  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamsProvider")
  }
  return context
}
