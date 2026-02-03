"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { HackathonDetailsContent } from "@/components/hackathon-details-content"
import { useHackathons } from "@/lib/hackathons-context"
import type { Hackathon } from "@/lib/hackathons"

export default function HackathonDetailsPage() {
  const params = useParams()
  const { getHackathonById } = useHackathons()
  const [hackathon, setHackathon] = useState<Hackathon | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const id = params.id as string

  useEffect(() => {
    // Simulate minimal loading time for better UX
    const timer = setTimeout(() => {
      const found = getHackathonById(id)
      setHackathon(found || null)
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [id, getHackathonById])

  // Loading state
  if (isLoading) {
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

  // Hackathon not found - trigger 404
  if (hackathon === null) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HackathonDetailsContent hackathon={hackathon} />
    </div>
  )
}
