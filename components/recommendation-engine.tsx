"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  recommendHackathons,
  UserProfile,
  RecommendationResult,
} from "@/lib/recommendation-engine"
import { useHackathons } from "@/lib/hackathons-context"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function RecommendationEngine() {
  const { hackathons } = useHackathons()
  const [isOpen, setIsOpen] = useState(false)
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([])
  const [hasAnswered, setHasAnswered] = useState(false)

  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    experienceLevel: "Intermediate",
    preferredMode: "hybrid",
    previousParticipation: false,
    teamPreference: "Looking for team",
    availability: "Medium",
  })

  const handleGenerateRecommendations = () => {
    if (userProfile.skills.length === 0) {
      alert("Please select at least one skill!")
      return
    }

    const recs = recommendHackathons(userProfile, hackathons)
    setRecommendations(recs)
    setHasAnswered(true)
  }

  const toggleSkill = (skill: string) => {
    setUserProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const skillOptions = [
    "Web",
    "Mobile",
    "AI",
    "Blockchain",
    "Cloud",
    "IoT",
    "Data Science",
    "Gaming",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          size="lg"
        >
          <Sparkles className="h-5 w-5" />
          Get AI Recommendations
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Personalized Hackathon Recommendations
          </DialogTitle>
        </DialogHeader>

        {!hasAnswered ? (
          <div className="space-y-6 py-6">
            {/* Skills Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">What are your skills?</Label>
              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={userProfile.skills.includes(skill)}
                      onCheckedChange={() => toggleSkill(skill)}
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Experience Level</Label>
              <RadioGroup
                value={userProfile.experienceLevel}
                onValueChange={(value: any) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    experienceLevel: value,
                  }))
                }
              >
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={level} id={level} />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Preferred Mode */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Preferred Mode</Label>
              <RadioGroup
                value={userProfile.preferredMode}
                onValueChange={(value: any) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    preferredMode: value,
                  }))
                }
              >
                {["online", "in-person", "hybrid"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={mode} id={mode} />
                    <span className="text-sm">{mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Team Preference */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Team Preference</Label>
              <RadioGroup
                value={userProfile.teamPreference}
                onValueChange={(value: any) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    teamPreference: value,
                  }))
                }
              >
                {["Solo", "Looking for team", "Have team"].map((pref) => (
                  <label key={pref} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={pref} id={pref} />
                    <span className="text-sm">{pref}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Availability</Label>
              <RadioGroup
                value={userProfile.availability}
                onValueChange={(value: any) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    availability: value,
                  }))
                }
              >
                {["Low", "Medium", "High"].map((avail) => (
                  <label key={avail} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={avail} id={avail} />
                    <span className="text-sm">{avail}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Previous Participation */}
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={userProfile.previousParticipation}
                onCheckedChange={(checked) =>
                  setUserProfile((prev) => ({
                    ...prev,
                    previousParticipation: checked as boolean,
                  }))
                }
              />
              <span className="text-sm">I've participated in hackathons before</span>
            </label>

            <Button
              onClick={handleGenerateRecommendations}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 text-base font-semibold"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Recommendations
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-6">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Based on your profile, here are the best hackathons for you:
              </p>
            </div>

            {recommendations.map((rec, idx) => (
              <Card key={rec.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{rec.title}</h3>
                        <Badge variant="secondary" className="ml-auto">
                          {rec.confidenceScore}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                      <Link href={`/hackathon/${rec.id}`}>
                        <Button variant="outline" size="sm" className="border-border gap-2">
                          View Details
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-accent">#{idx + 1}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={() => setHasAnswered(false)}
              variant="outline"
              className="w-full border-border"
            >
              Refine Preferences
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
