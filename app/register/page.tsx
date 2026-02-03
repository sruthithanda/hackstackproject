"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useHackathons } from "@/lib/hackathons-context"
import { useAuth } from "@/lib/auth-context"
import { RegistrationForm } from "@/components/registration-form"
import type { Hackathon } from "@/lib/hackathons"
import { AlertCircle, ArrowLeft, LogIn } from "lucide-react"

export default function RegisterPage() 
{
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getHackathonById } = useHackathons()
  const { user, isLoading } = useAuth()
  const [hackathon, setHackathon] = useState<Hackathon | null>(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const role = searchParams.get("role");

  const hackathonId = searchParams.get("id")

  useEffect(() => {
    if (isLoading) return

    if (!hackathonId) {
      setError("No hackathon ID provided. Please go back and try again.")
      setPageLoading(false)
      return
    }

    const found = getHackathonById(hackathonId)
    if (!found) {
      setError("Hackathon not found. This hackathon may no longer exist.")
      setPageLoading(false)
      return
    }

    setHackathon(found)
    setPageLoading(false)
  }, [hackathonId, getHackathonById, isLoading])

  // Loading state
  if (pageLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="space-y-4 text-center">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
              <div className="h-4 w-64 bg-muted rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error states
  if (error || !hackathon) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Hackathons
            </Link>

            <Card className="border-destructive bg-destructive/5">
              <CardContent className="pt-8 space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-destructive/10">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Unable to Load Registration</h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {error || "This hackathon could not be found. It may have been removed or the link is invalid."}
                  </p>
                </div>
                <Link href="/">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse All Hackathons
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Link
              href={`/hackathon/${hackathon.id}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {hackathon.title}
            </Link>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    You need to be logged in to register for a hackathon.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Creating an account is free and only takes a minute. Your account helps us match you with
                    teammates and recommend hackathons you'll love.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href={`/login?redirect=/register?id=${hackathon.id}`} className="block">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href={`/signup?redirect=/register?id=${hackathon.id}`} className="block">
                    <Button variant="outline" className="w-full border-border h-12">
                      Create New Account
                    </Button>
                  </Link>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to HackStack's Terms of Service and Privacy Policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Hackathon Ended
  if (hackathon.status === "ended") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Link
              href={`/hackathon/${hackathon.id}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {hackathon.title}
            </Link>

            <Card className="border-border">
              <CardContent className="pt-8 space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-muted">
                    <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Registration Closed</h1>
                  <p className="text-muted-foreground">
                    This hackathon has ended. Registrations are no longer being accepted.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">You can still:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ View hackathon details and winners</li>
                    <li>✓ See submissions from participants</li>
                    <li>✓ Find upcoming hackathons similar to this one</li>
                  </ul>
                </div>
                <Link href={`/hackathon/${hackathon.id}`}>
                  <Button variant="outline" className="border-border">
                    View Hackathon Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Main registration page
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href={`/hackathon/${hackathon.id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {hackathon.title}
        </Link>

        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Register for {hackathon.title}</h1>
            <p className="text-lg text-muted-foreground">
              Complete this short form to officially register for the hackathon. You can update your information anytime.
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Prize Pool", value: hackathon.prize },
              { label: "Team Size", value: `${hackathon.teamSize.min}-${hackathon.teamSize.max}` },
              { label: "Participants", value: hackathon.participants.toLocaleString() },
              { label: "Days Left", value: hackathon.daysLeft > 0 ? `${hackathon.daysLeft} days` : "Ended" },
            ].map((info, idx) => (
              <Card key={idx} className="border-border bg-secondary/30">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-lg font-semibold text-foreground">{info.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <RegistrationForm hackathon={hackathon} />

        {/* Footer Info */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Questions?</h4>
              <p>Check our FAQ or reach out to the organizers directly through HackStack.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Privacy</h4>
              <p>Your data is encrypted and only shared with hackathon organizers and HackStack.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">No Spam</h4>
              <p>We only send updates about hackathons you've registered for.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
