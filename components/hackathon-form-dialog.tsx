"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useHackathons } from "@/lib/hackathons-context"
import { domains, type Hackathon } from "@/lib/hackathons"

interface HackathonFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hackathon: Hackathon | null
}

const defaultFormData = {
  title: "",
  organizer: "",
  description: "",
  fullDescription: "",
  prize: "",
  status: "open" as const,
  mode: "online" as const,
  level: "all" as const,
  domain: "AI/ML",
  techStack: "",
  startDate: "",
  endDate: "",
  eligibility: "",
  teamSizeMin: "1",
  teamSizeMax: "5",
  daysLeft: "30",
}

export function HackathonFormDialog({
  open,
  onOpenChange,
  hackathon,
}: HackathonFormDialogProps) {
  const { toast } = useToast()
  const { addHackathon, updateHackathon } = useHackathons()
  const [formData, setFormData] = useState(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (hackathon) {
      setFormData({
        title: hackathon.title,
        organizer: hackathon.organizer,
        description: hackathon.description,
        fullDescription: hackathon.fullDescription,
        prize: hackathon.prize,
        status: hackathon.status,
        mode: hackathon.mode,
        level: hackathon.level,
        domain: hackathon.domain,
        techStack: hackathon.techStack.join(", "),
        startDate: hackathon.startDate,
        endDate: hackathon.endDate,
        eligibility: hackathon.eligibility,
        teamSizeMin: hackathon.teamSize.min.toString(),
        teamSizeMax: hackathon.teamSize.max.toString(),
        daysLeft: hackathon.daysLeft.toString(),
      })
    } else {
      setFormData(defaultFormData)
    }
  }, [hackathon, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.organizer || !formData.description) {
      toast({ title: "Please fill in all required fields", variant: "destructive" })
      return
    }

    setIsSubmitting(true)

    const hackathonData = {
      title: formData.title,
      organizer: formData.organizer,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      prize: formData.prize || "$0",
      status: formData.status,
      mode: formData.mode,
      level: formData.level,
      domain: formData.domain,
      image: "/placeholder.svg?height=200&width=400",
      techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      startDate: formData.startDate || new Date().toISOString().split("T")[0],
      endDate: formData.endDate || new Date().toISOString().split("T")[0],
      eligibility: formData.eligibility || "Open to all",
      teamSize: {
        min: Number.parseInt(formData.teamSizeMin) || 1,
        max: Number.parseInt(formData.teamSizeMax) || 5,
      },
      daysLeft: Number.parseInt(formData.daysLeft) || 30,
    }

    if (hackathon) {
      updateHackathon(hackathon.id, hackathonData)
      toast({ title: "Hackathon updated successfully" })
    } else {
      addHackathon(hackathonData)
      toast({ title: "Hackathon created successfully" })
    }

    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {hackathon ? "Edit Hackathon" : "Create New Hackathon"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {hackathon
              ? "Update the hackathon details below."
              : "Fill in the details to create a new hackathon."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="AI Innovation Challenge"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer" className="text-foreground">
                Organizer *
              </Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="TechCorp"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Short Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="A brief description of the hackathon..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription" className="text-foreground">
              Full Description
            </Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="A detailed description of the hackathon..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prize" className="text-foreground">
                Prize
              </Label>
              <Input
                id="prize"
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="$50,000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain" className="text-foreground">
                Domain
              </Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => setFormData({ ...formData, domain: value })}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {domains.filter((d) => d !== "All").map((domain) => (
                    <SelectItem key={domain} value={domain} className="text-foreground">
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: "open" | "closing-soon" | "ended") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="open" className="text-foreground">Open</SelectItem>
                  <SelectItem value="closing-soon" className="text-foreground">Closing Soon</SelectItem>
                  <SelectItem value="ended" className="text-foreground">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mode" className="text-foreground">
                Mode
              </Label>
              <Select
                value={formData.mode}
                onValueChange={(value: "online" | "in-person" | "hybrid") =>
                  setFormData({ ...formData, mode: value })
                }
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="online" className="text-foreground">Online</SelectItem>
                  <SelectItem value="in-person" className="text-foreground">In-Person</SelectItem>
                  <SelectItem value="hybrid" className="text-foreground">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-foreground">
                Level
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value: "beginner" | "intermediate" | "advanced" | "all") =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">All Levels</SelectItem>
                  <SelectItem value="beginner" className="text-foreground">Beginner</SelectItem>
                  <SelectItem value="intermediate" className="text-foreground">Intermediate</SelectItem>
                  <SelectItem value="advanced" className="text-foreground">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysLeft" className="text-foreground">
                Days Left
              </Label>
              <Input
                id="daysLeft"
                type="number"
                value={formData.daysLeft}
                onChange={(e) => setFormData({ ...formData, daysLeft: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-foreground">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-foreground">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamSizeMin" className="text-foreground">
                Min Team Size
              </Label>
              <Input
                id="teamSizeMin"
                type="number"
                value={formData.teamSizeMin}
                onChange={(e) => setFormData({ ...formData, teamSizeMin: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSizeMax" className="text-foreground">
                Max Team Size
              </Label>
              <Input
                id="teamSizeMax"
                type="number"
                value={formData.teamSizeMax}
                onChange={(e) => setFormData({ ...formData, teamSizeMax: e.target.value })}
                className="bg-input border-border text-foreground"
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-foreground">
              Tech Stack (comma-separated)
            </Label>
            <Input
              id="techStack"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="React, Node.js, Python"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eligibility" className="text-foreground">
              Eligibility
            </Label>
            <Input
              id="eligibility"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="Open to all developers worldwide"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting
                ? "Saving..."
                : hackathon
                  ? "Update Hackathon"
                  : "Create Hackathon"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
