"use client"

import { useState } from "react"
import { Users, Plus, UserPlus, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useTeams, type Team } from "@/lib/teams-context"
import type { Hackathon } from "@/lib/hackathons"

interface TeamSectionProps {
  hackathon: Hackathon
}

export function TeamSection({ hackathon }: TeamSectionProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const { getTeamsForHackathon, getUserTeam, createTeam, joinTeam, leaveTeam } = useTeams()
  const [teamName, setTeamName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const teams = getTeamsForHackathon(hackathon.id)
  const userTeam = getUserTeam(hackathon.id)

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast({ 
        title: "Team Name Required",
        description: "Please enter a name for your team",
        variant: "destructive" 
      })
      return
    }

    if (teamName.length > 50) {
      toast({ 
        title: "Name Too Long",
        description: "Team name must be 50 characters or less",
        variant: "destructive" 
      })
      return
    }

    setIsCreating(true)
    const result = await createTeam(teamName, hackathon.id, hackathon.teamSize.max)
    setIsCreating(false)

    if (result.success) {
      toast({ 
        title: "Team Created!",
        description: `${teamName} has been created successfully`
      })
      setTeamName("")
      setCreateDialogOpen(false)
    } else {
      toast({ 
        title: "Failed to Create Team",
        description: result.error || "An error occurred", 
        variant: "destructive" 
      })
    }
  }

  const handleJoinTeam = async (teamId: string) => {
    const result = await joinTeam(teamId)
    const team = teams.find(t => t.id === teamId)
    if (result.success) {
      toast({ 
        title: "Joined Successfully!",
        description: `You joined ${team?.name}`
      })
    } else {
      toast({ 
        title: "Cannot Join Team",
        description: result.error || "An error occurred", 
        variant: "destructive" 
      })
    }
  }

  const handleLeaveTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId)
    const isLeader = team?.leaderId === user?.id
    leaveTeam(teamId)
    toast({ 
      title: isLeader ? "Team Disbanded" : "Left Team",
      description: isLeader ? "Your team has been disbanded" : `You left ${team?.name}`
    })
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-accent" />
          Teams
        </CardTitle>
        {!userTeam && (
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-1" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create a New Team</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Form a team for this hackathon. Team size must be between {hackathon.teamSize.min} and {hackathon.teamSize.max} members.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-accent/10 border border-accent/30 rounded p-3 text-sm">
                  <p className="text-foreground font-medium mb-1">Team Size Requirements:</p>
                  <p className="text-muted-foreground">Minimum: {hackathon.teamSize.min} • Maximum: {hackathon.teamSize.max} members</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-foreground">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value.slice(0, 50))}
                    placeholder="e.g., Code Warriors, Innovation Labs"
                    maxLength={50}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">{teamName.length}/50 characters</p>
                </div>
                <Button
                  onClick={handleCreateTeam}
                  disabled={isCreating || !teamName.trim()}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isCreating ? "Creating Team..." : "Create Team"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {userTeam ? (
          <YourTeamCard team={userTeam} userId={user?.id} onLeave={handleLeaveTeam} />
        ) : teams.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Join an existing team or create your own
            </p>
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onJoin={handleJoinTeam}
                maxSize={hackathon.teamSize.max}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No teams yet. Be the first to create one!
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function YourTeamCard({
  team,
  userId,
  onLeave,
}: {
  team: Team
  userId?: string
  onLeave: (teamId: string) => void
}) {
  const isLeader = team.leaderId === userId
  const availableSlots = team.maxSize - team.members.length

  return (
    <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground text-lg">{team.name}</h4>
          {isLeader && <span className="text-xs text-accent font-medium">You are the team lead</span>}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">
            {team.members.length}/{team.maxSize} Members
          </div>
          {availableSlots > 0 && (
            <div className="text-xs text-muted-foreground">
              {availableSlots} slot{availableSlots !== 1 ? 's' : ''} available
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4 p-3 bg-background/50 rounded">
        {team.members.map((member, idx) => (
          <div key={member.userId} className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              {member.userId === team.leaderId && (
                <Crown className="h-4 w-4 text-amber-400" title="Team Lead" />
              )}
              {!isLeader && member.userId === team.leaderId && (
                <span className="inline-block w-1 h-1 bg-accent rounded-full" />
              )}
            </div>
            <span className="text-foreground font-medium">{member.name}</span>
            <span className="text-muted-foreground text-xs">({member.email})</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLeave(team.id)}
          className="flex-1 text-destructive border-destructive/50 hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4 mr-1" />
          {isLeader ? "Disband" : "Leave"}
        </Button>
      </div>
    </div>
  )
}

function TeamCard({
  team,
  onJoin,
  maxSize,
}: {
  team: Team
  onJoin: (teamId: string) => void
  maxSize: number
}) {
  const isFull = team.members.length >= maxSize
  const availableSlots = maxSize - team.members.length
  const fillPercentage = (team.members.length / maxSize) * 100

  return (
    <div className="p-4 bg-secondary/50 border border-border rounded-lg hover:border-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">{team.name}</h4>
        <div className="text-right">
          <div className="text-xs font-medium text-muted-foreground">
            {team.members.length}/{maxSize}
          </div>
          {!isFull && (
            <div className="text-xs text-accent">
              {availableSlots} slot{availableSlots !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-1 mb-3 max-h-24 overflow-y-auto">
        {team.members.map((member) => (
          <div key={member.userId} className="flex items-center gap-2 text-sm">
            {member.userId === team.leaderId && (
              <Crown className="h-3.5 w-3.5 text-amber-400" title="Team Lead" />
            )}
            {member.userId !== team.leaderId && (
              <span className="inline-block w-1 h-1 bg-muted rounded-full" />
            )}
            <span className="text-muted-foreground text-xs truncate">{member.name}</span>
          </div>
        ))}
      </div>

      {/* Capacity Bar */}
      <div className="mb-3">
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all ${isFull ? 'bg-orange-500' : 'bg-accent'}`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Join Button */}
      <Button
        size="sm"
        variant={isFull ? "outline" : "default"}
        disabled={isFull}
        onClick={() => onJoin(team.id)}
        className={isFull ? "w-full cursor-not-allowed" : "w-full bg-accent text-accent-foreground hover:bg-accent/90"}
      >
        <UserPlus className="h-4 w-4 mr-1" />
        {isFull ? "Team Full" : "Join Team"}
      </Button>
    </div>
  )
}
