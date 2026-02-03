"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  joinedHackathons: string[]
  teams: { hackathonId: string; teamId: string }[]
  skills: string[]
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  joinHackathon: (hackathonId: string) => Promise<{ success: boolean; error?: string }>
  leaveHackathon: (hackathonId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated user database (in production, this would be MongoDB)
const usersDB: Map<string, User & { password: string }> = new Map()

// Add demo users
usersDB.set("demo@hackstack.com", {
  id: "user-1",
  name: "Demo User",
  email: "demo@hackstack.com",
  password: "demo123",
  role: "user",
  joinedHackathons: ["1", "3"],
  teams: [{ hackathonId: "1", teamId: "team-1" }],
  skills: ["React", "TypeScript", "Node.js"],
  createdAt: "2025-12-01",
})

usersDB.set("admin@hackstack.com", {
  id: "admin-1",
  name: "Admin User",
  email: "admin@hackstack.com",
  password: "admin123",
  role: "admin",
  joinedHackathons: [],
  teams: [],
  skills: [],
  createdAt: "2025-11-01",
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("hackstack_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("hackstack_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const storedUser = usersDB.get(email)
    
    if (!storedUser) {
      return { success: false, error: "User not found" }
    }
    
    if (storedUser.password !== password) {
      return { success: false, error: "Invalid password" }
    }

    const { password: _, ...userWithoutPassword } = storedUser
    setUser(userWithoutPassword)
    localStorage.setItem("hackstack_user", JSON.stringify(userWithoutPassword))
    localStorage.setItem("hackstack_token", `jwt_${Date.now()}_${storedUser.id}`)
    
    return { success: true }
  }

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (usersDB.has(email)) {
      return { success: false, error: "Email already registered" }
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      joinedHackathons: ["1"], // Add demo hackathon
      teams: [{ hackathonId: "1", teamId: "team-1" }], // Add demo team
      skills: ["Web Development"], // Add demo skill
      createdAt: new Date().toISOString().split("T")[0],
    }

    usersDB.set(email, newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("hackstack_user", JSON.stringify(userWithoutPassword))
    localStorage.setItem("hackstack_token", `jwt_${Date.now()}_${newUser.id}`)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hackstack_user")
    localStorage.removeItem("hackstack_token")
  }

  const joinHackathon = async (hackathonId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "Please login to join this hackathon" }
    }

    if (user.joinedHackathons.includes(hackathonId)) {
      return { success: false, error: "Already joined this hackathon" }
    }

    const updatedUser = {
      ...user,
      joinedHackathons: [...user.joinedHackathons, hackathonId],
    }

    setUser(updatedUser)
    localStorage.setItem("hackstack_user", JSON.stringify(updatedUser))

    // Update in "database"
    const storedUser = usersDB.get(user.email)
    if (storedUser) {
      storedUser.joinedHackathons = updatedUser.joinedHackathons
    }

    return { success: true }
  }

  const leaveHackathon = (hackathonId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      joinedHackathons: user.joinedHackathons.filter((id) => id !== hackathonId),
      teams: user.teams.filter((t) => t.hackathonId !== hackathonId),
    }

    setUser(updatedUser)
    localStorage.setItem("hackstack_user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, joinHackathon, leaveHackathon }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
