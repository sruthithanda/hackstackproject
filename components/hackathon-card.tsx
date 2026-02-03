"use client"

import Link from "next/link"
import { useState } from "react"
import { Users, Clock, MapPin, Trophy, Code2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import type { Hackathon } from "@/lib/hackathons"

interface HackathonCardProps {
  hackathon: Hackathon
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { user, joinHackathon } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [joinMessage, setJoinMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const isJoined = user?.joinedHackathons.includes(hackathon.id) ?? false

  const handleJoinClick = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (isJoined) {
      setJoinMessage({ type: "error", text: "You've already registered for this hackathon" })
      return
    }

    // Navigate to registration page
    window.location.href = `/register?id=${hackathon.id}`
  }

  const getStatusColor = (status: Hackathon["status"]) => {
    switch (status) {
      case "open":
        return "bg-accent text-accent-foreground"
      case "closing-soon":
        return "bg-amber-500/20 text-amber-400"
      case "ended":
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: Hackathon["status"]) => {
    switch (status) {
      case "open":
        return "Open"
      case "closing-soon":
        return "Closing Soon"
      case "ended":
        return "Ended"
    }
  }

  const getModeLabel = (mode: Hackathon["mode"]) => {
    return mode === "online" ? "Online" : mode === "in-person" ? "In-Person" : "Hybrid"
  }

  return (
    <>
      <div className="group bg-card border border-border rounded-lg overflow-hidden transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
        <Link href={`/hackathon/${hackathon.id}`}>
          <div className="aspect-[2/1] bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className={getStatusColor(hackathon.status)}>
                {getStatusLabel(hackathon.status)}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground">
                {hackathon.domain}
              </Badge>
            </div>
          </div>
        </Link>

        <div className="p-5">
          <div className="mb-3">
            <Link href={`/hackathon/${hackathon.id}`}>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors text-balance">
                {hackathon.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">by {hackathon.organizer}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {hackathon.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {hackathon.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs font-normal text-muted-foreground border-border">
                {tech}
              </Badge>
            ))}
            {hackathon.techStack.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-border">
                +{hackathon.techStack.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-foreground font-medium">{hackathon.prize}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{hackathon.participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{getModeLabel(hackathon.mode)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>
                {hackathon.status === "ended"
                  ? "Ended"
                  : `${hackathon.daysLeft} days left`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4" />
              <span>{hackathon.teamSize.min}-{hackathon.teamSize.max} members</span>
            </div>
          </div>

          {joinMessage && (
            <div className={`text-sm p-2 rounded mb-3 text-center ${
              joinMessage.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}>
              {joinMessage.text}
            </div>
          )}

          <div className="flex gap-2">
            <Link href={`/hackathon/${hackathon.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
              >
                View Details
              </Button>
            </Link>
            <Button
              onClick={handleJoinClick}
              disabled={hackathon.status === "ended" || isJoining}
              className={`flex-1 ${
                isJoined
                  ? "bg-green-600/20 text-green-600 dark:text-green-400 hover:bg-green-600/30"
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              }`}
            >
              {isJoining && <span className="animate-spin mr-2">⟳</span>}
              {hackathon.status === "ended" ? "Results" : isJoined ? "✓ Joined" : "Join"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Login Required</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Please login or create an account to join this hackathon.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Link href={`/login?redirect=/register?id=${hackathon.id}`} onClick={() => setShowLoginPrompt(false)} className="w-full block">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href={`/signup?redirect=/register?id=${hackathon.id}`} onClick={() => setShowLoginPrompt(false)} className="w-full block">
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                Create Account
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
