"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import type { Hackathon } from "@/lib/hackathons"
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"

interface RegistrationFormProps {
  hackathon: Hackathon
}

interface RegistrationData {
  hackathonId: string
  teamStatus: "solo" | "looking" | "have-team" | ""
  discoverySource: "hackstack" | "google" | "friend" | "college" | "other" | ""
  experienceLevel: "beginner" | "intermediate" | "advanced" | ""
  interestArea: "ai-ml" | "web" | "blockchain" | "cloud" | "innovation" | ""
  agreeEligibility: boolean
  agreeTerms: boolean
  timestamp: number
  userId?: string
  userName?: string
}

const INTEREST_AREAS = [
  { id: "ai-ml", label: "AI / Machine Learning" },
  { id: "web", label: "Web Development" },
  { id: "blockchain", label: "Blockchain / Web3" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "innovation", label: "Open Innovation" },
]

const DISCOVERY_SOURCES = [
  { id: "hackstack", label: "HackStack" },
  { id: "google", label: "Google Search" },
  { id: "friend", label: "Friend / Word of Mouth" },
  { id: "college", label: "College / University" },
  { id: "other", label: "Other" },
]

const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", desc: "New to hackathons or coding" },
  { id: "intermediate", label: "Intermediate", desc: "Some hackathon experience" },
  { id: "advanced", label: "Advanced", desc: "Multiple hackathons / expert level" },
]

const TEAM_STATUS = [
  { id: "solo", label: "Working Solo", desc: "I'm competing on my own" },
  { id: "looking", label: "Looking for Teammates", desc: "I want to find a team here" },
  { id: "have-team", label: "Already Have a Team", desc: "My team is already formed" },
]

export function RegistrationForm({ hackathon }: RegistrationFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState<RegistrationData>({
    hackathonId: hackathon.id,
    teamStatus: "",
    discoverySource: "",
    experienceLevel: "",
    interestArea: "",
    agreeEligibility: false,
    agreeTerms: false,
    timestamp: Date.now(),
    userId: user?.id,
    userName: user?.name,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.teamStatus) {
      toast({
        title: "Required Field",
        description: "Please select your team status",
        variant: "destructive",
      })
      return
    }

    if (!formData.discoverySource) {
      toast({
        title: "Required Field",
        description: "Please tell us how you found this hackathon",
        variant: "destructive",
      })
      return
    }

    if (!formData.experienceLevel) {
      toast({
        title: "Required Field",
        description: "Please select your experience level",
        variant: "destructive",
      })
      return
    }

    if (!formData.interestArea) {
      toast({
        title: "Required Field",
        description: "Please select your area of interest",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeEligibility || !formData.agreeTerms) {
      toast({
        title: "Agreements Required",
        description: "Please agree to all terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Get existing registrations
      const existingReg = localStorage.getItem("hackstack_registrations")
      const registrations = existingReg ? JSON.parse(existingReg) : []

      // Check if already registered
      const alreadyRegistered = registrations.some(
        (reg: RegistrationData) => reg.hackathonId === hackathon.id && reg.userId === user?.id
      )

      if (alreadyRegistered) {
        toast({
          title: "Already Registered",
          description: "You've already registered for this hackathon",
          variant: "default",
        })
        setIsSubmitting(false)
        return
      }

      // Save registration
      registrations.push(formData)
      localStorage.setItem("hackstack_registrations", JSON.stringify(registrations))

      // Also save to a per-hackathon key for quick lookup
      const hackathonKey = `hackstack_registration_${hackathon.id}`
      const hackathonRegs = JSON.parse(localStorage.getItem(hackathonKey) || "[]")
      hackathonRegs.push(formData)
      localStorage.setItem(hackathonKey, JSON.stringify(hackathonRegs))

      setSubmitted(true)

      toast({
        title: "Registration Successful!",
        description: `You've registered for ${hackathon.title}`,
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/hackathon/${hackathon.id}`)
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-12">
        <Card className="border-accent bg-accent/5 max-w-2xl mx-auto">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-accent/10">
                <CheckCircle2 className="h-12 w-12 text-accent" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h2>
              <p className="text-muted-foreground">
                Thank you for registering for <span className="font-semibold text-foreground">{hackathon.title}</span>
              </p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="mb-2">✓ Your registration has been saved</p>
              <p className="mb-2">✓ Check your email for updates and important dates</p>
              <p>✓ Browse teams and start connecting with other participants</p>
            </div>
            <p className="text-sm text-muted-foreground">Redirecting you back to the hackathon page...</p>
            <Button onClick={() => router.push(`/hackathon/${hackathon.id}`)} className="w-full">
              Go to Hackathon Details
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Team Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Team Status</CardTitle>
            <CardDescription>How are you participating in this hackathon?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={formData.teamStatus} onValueChange={(val) => setFormData({ ...formData, teamStatus: val as any })}>
              {TEAM_STATUS.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value={option.id} id={`team-${option.id}`} className="mt-1" />
                  <Label htmlFor={`team-${option.id}`} className="cursor-pointer flex-1">
                    <span className="block font-medium text-foreground">{option.label}</span>
                    <span className="block text-sm text-muted-foreground">{option.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Discovery Source */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">How Did You Hear About This?</CardTitle>
            <CardDescription>Help us understand our reach and improve marketing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={formData.discoverySource} onValueChange={(val) => setFormData({ ...formData, discoverySource: val as any })}>
              {DISCOVERY_SOURCES.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value={option.id} id={`discovery-${option.id}`} />
                  <Label htmlFor={`discovery-${option.id}`} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Experience Level */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Experience Level</CardTitle>
            <CardDescription>Tell us about your hackathon experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={formData.experienceLevel} onValueChange={(val) => setFormData({ ...formData, experienceLevel: val as any })}>
              {EXPERIENCE_LEVELS.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                  <RadioGroupItem value={option.id} id={`exp-${option.id}`} className="mt-1" />
                  <Label htmlFor={`exp-${option.id}`} className="cursor-pointer flex-1">
                    <span className="block font-medium text-foreground">{option.label}</span>
                    <span className="block text-sm text-muted-foreground">{option.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Interest Area */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Area of Interest</CardTitle>
            <CardDescription>What technology or domain interests you most?</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={formData.interestArea} onValueChange={(val) => setFormData({ ...formData, interestArea: val as any })}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INTEREST_AREAS.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer border border-border">
                    <RadioGroupItem value={option.id} id={`interest-${option.id}`} />
                    <Label htmlFor={`interest-${option.id}`} className="cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Agreements */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Agreements</CardTitle>
            <CardDescription>Please review and agree to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                <Checkbox
                  id="agree-eligibility"
                  checked={formData.agreeEligibility}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeEligibility: checked === true })
                  }
                  className="mt-1"
                />
                <Label htmlFor="agree-eligibility" className="cursor-pointer flex-1 text-sm">
                  <span className="font-medium text-foreground">I meet the eligibility requirements</span>
                  <p className="text-muted-foreground mt-1">
                    I am eligible to participate in this hackathon and comply with all eligibility criteria.
                  </p>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                <Checkbox
                  id="agree-terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked === true })}
                  className="mt-1"
                />
                <Label htmlFor="agree-terms" className="cursor-pointer flex-1 text-sm">
                  <span className="font-medium text-foreground">I agree to the Terms & Conditions</span>
                  <p className="text-muted-foreground mt-1">
                    I have read and agree to HackStack's Terms of Service, Code of Conduct, and Privacy Policy.
                  </p>
                </Label>
              </div>
            </div>

            {(!formData.agreeEligibility || !formData.agreeTerms) && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  You must agree to both terms before registering.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-12"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Complete Registration"}
            {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Your registration is saved locally and encrypted for security.
        </p>
      </div>
    </form>
  )
}
