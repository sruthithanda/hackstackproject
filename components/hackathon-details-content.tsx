"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Code2,
  Building2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { TeamSection } from "@/components/team-section"
import type { Hackathon } from "@/lib/hackathons"

interface HackathonDetailsContentProps {
  hackathon: Hackathon
}

export function HackathonDetailsContent({ hackathon }: HackathonDetailsContentProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, joinHackathon } = useAuth()
  const [isJoining, setIsJoining] = useState(false)

  const isJoined = user?.joinedHackathons.includes(hackathon.id)

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

  const getLevelLabel = (level: Hackathon["level"]) => {
    if (level === "all") return "All Levels"
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleJoinHackathon = async () => {
    if (!user) {
      toast({ 
        title: "Login Required",
        description: "Please login to join this hackathon",
        variant: "destructive" 
      })
      router.push(`/login?redirect=/hackathon/${hackathon.id}`)
      return
    }

    if (isJoined) {
      toast({ 
        title: "Already Joined",
        description: "You have already joined this hackathon",
        variant: "default"
      })
      return
    }

    if (hackathon.status === "ended") {
      toast({ 
        title: "Registration Closed",
        description: "This hackathon has ended",
        variant: "destructive"
      })
      return
    }

    setIsJoining(true)
    const result = await joinHackathon(hackathon.id)
    setIsJoining(false)

    if (result.success) {
      toast({ 
        title: "Success!",
        description: "You have successfully joined the hackathon",
      })
    } else {
      toast({ 
        title: "Error",
        description: result.error || "Failed to join hackathon", 
        variant: "destructive" 
      })
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Hackathons
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Section */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-[3/1] bg-secondary relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={getStatusColor(hackathon.status)}>
                  {getStatusLabel(hackathon.status)}
                </Badge>
                <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground">
                  {hackathon.domain}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
                {hackathon.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Building2 className="h-4 w-4" />
                <span>Organized by {hackathon.organizer}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {hackathon.fullDescription}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Code2 className="h-5 w-5 text-accent" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hackathon.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-foreground border-border bg-secondary/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{hackathon.eligibility}</p>
            </CardContent>
          </Card>

          {/* Team Section - Only show if user has joined */}
          {isJoined && <TeamSection hackathon={hackathon} />}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Card */}
          <Card className="bg-card border-border sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-accent" />
                <span className="text-2xl font-bold text-foreground">{hackathon.prize}</span>
                <span className="text-muted-foreground">in prizes</span>
              </div>

              {isJoined ? (
                <div className="flex items-center gap-2 mb-4 p-3 bg-accent/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="text-accent font-medium">You have joined this hackathon</span>
                </div>
              ) : hackathon.status === "ended" ? (
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">This hackathon has ended</span>
                </div>
              ) : null}

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                disabled={hackathon.status === "ended" || isJoining || isJoined}
                onClick={handleJoinHackathon}
              >
                {isJoining
                  ? "Joining..."
                  : isJoined
                    ? "Already Joined"
                    : hackathon.status === "ended"
                      ? "View Results"
                      : "Join Hackathon"}
              </Button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Participants</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {hackathon.participants.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Start Date</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {formatDate(hackathon.startDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>End Date</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {formatDate(hackathon.endDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Time Left</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {hackathon.status === "ended" ? "Ended" : `${hackathon.daysLeft} days`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Mode</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {getModeLabel(hackathon.mode)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Code2 className="h-4 w-4" />
                    <span>Level</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {getLevelLabel(hackathon.level)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Team Size</span>
                  </div>
                  <span className="text-foreground font-medium">
                    {hackathon.teamSize.min}-{hackathon.teamSize.max} members
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
