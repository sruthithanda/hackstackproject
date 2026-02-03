"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Mail,
  Calendar,
  Trophy,
  Users,
  ExternalLink,
  Code2,
} from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useTeams } from "@/lib/teams-context"
import { hackathons, getHackathonById } from "@/lib/hackathons"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, leaveHackathon } = useAuth()
  const { getUserTeam } = useTeams()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const joinedHackathonDetails = user.joinedHackathons
    .map((id) => getHackathonById(id))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-accent-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  
                  {user.role === "admin" && (
                    <Badge className="bg-amber-500/20 text-amber-400 mb-4">Admin</Badge>
                  )}

                  <div className="w-full space-y-3 mt-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">Joined {user.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{user.joinedHackathons.length} hackathons</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {user.skills.length > 0 && (
              <Card className="bg-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                    <Code2 className="h-5 w-5 text-accent" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-foreground border-border"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Hackathons */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Trophy className="h-5 w-5 text-accent" />
                  My Hackathons
                </CardTitle>
              </CardHeader>
              <CardContent>
                {joinedHackathonDetails.length > 0 ? (
                  <div className="space-y-4">
                    {joinedHackathonDetails.map((hackathon) => {
                      if (!hackathon) return null
                      const team = getUserTeam(hackathon.id)
                      
                      return (
                        <div
                          key={hackathon.id}
                          className="p-4 bg-secondary/50 border border-border rounded-lg"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">
                                  {hackathon.title}
                                </h3>
                                <Badge
                                  className={
                                    hackathon.status === "open"
                                      ? "bg-accent text-accent-foreground"
                                      : hackathon.status === "closing-soon"
                                        ? "bg-amber-500/20 text-amber-400"
                                        : "bg-muted text-muted-foreground"
                                  }
                                >
                                  {hackathon.status === "open"
                                    ? "Open"
                                    : hackathon.status === "closing-soon"
                                      ? "Closing Soon"
                                      : "Ended"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {hackathon.organizer} - {hackathon.domain}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Trophy className="h-4 w-4 text-accent" />
                                  <span className="text-foreground">{hackathon.prize}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {team ? (
                                      <span className="text-accent">Team: {team.name}</span>
                                    ) : (
                                      "No team yet"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/hackathon/${hackathon.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-border text-foreground hover:bg-secondary bg-transparent"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => leaveHackathon(hackathon.id)}
                                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                              >
                                Leave
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You haven&apos;t joined any hackathons yet.
                    </p>
                    <Link href="/">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Browse Hackathons
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.joinedHackathons.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Hackathons</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.teams.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Teams</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {user.skills.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Skills</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-accent">0</p>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
