"use client"

import { useState, useMemo } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterBar } from "@/components/filter-bar"
import { HackathonCard } from "@/components/hackathon-card"
import { useHackathons } from "@/lib/hackathons-context"

export function HackathonGrid() {
  const [search, setSearch] = useState("")
  const [domain, setDomain] = useState("all")
  const [mode, setMode] = useState("all")
  const [level, setLevel] = useState("all")
  const [status, setStatus] = useState("all")

  const { hackathons } = useHackathons()

  const filteredHackathons = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    const isFiltered = search || domain !== "all" || mode !== "all" || level !== "all" || status !== "all"

    if (!isFiltered) {
      // No filters applied - show all hackathons
      return hackathons
    }

    // STAGE 1: Try strict filtering (all criteria must match)
    let results = hackathons.filter((hackathon) => {
      const matchesSearch =
        !search ||
        hackathon.title.toLowerCase().includes(lowerSearch) ||
        hackathon.description.toLowerCase().includes(lowerSearch) ||
        hackathon.organizer.toLowerCase().includes(lowerSearch) ||
        hackathon.domain.toLowerCase().includes(lowerSearch) ||
        hackathon.techStack.some((tech) => tech.toLowerCase().includes(lowerSearch))

      const matchesDomain =
        domain === "all" || hackathon.domain.toLowerCase() === domain.toLowerCase()

      const matchesMode =
        mode === "all" || 
        hackathon.mode === mode.toLowerCase() || 
        (mode === "in-person" && hackathon.mode === "in-person")

      const matchesLevel =
        level === "all" || hackathon.level === level.toLowerCase() || hackathon.level === "all"

      const matchesStatus =
        status === "all" ||
        (status === "open" && hackathon.status === "open") ||
        (status === "closing-soon" && hackathon.status === "closing-soon") ||
        (status === "ended" && hackathon.status === "ended")

      return matchesSearch && matchesDomain && matchesMode && matchesLevel && matchesStatus
    })

    // STAGE 2: If no results, progressively relax filters
    if (results.length === 0 && search) {
      // Try matching on search term with at least 1 filter category
      results = hackathons.filter((hackathon) => {
        const hasSearchMatch =
          hackathon.title.toLowerCase().includes(lowerSearch) ||
          hackathon.description.toLowerCase().includes(lowerSearch) ||
          hackathon.domain.toLowerCase().includes(lowerSearch) ||
          hackathon.techStack.some((tech) => tech.toLowerCase().includes(lowerSearch))

        // Match on domain if specified
        const domainMatches = domain === "all" || hackathon.domain.toLowerCase() === domain.toLowerCase()

        return hasSearchMatch && (domain === "all" || domainMatches)
      })
    }

    // STAGE 3: If still no results, show all hackathons matching just the search
    if (results.length === 0 && search) {
      results = hackathons.filter((hackathon) =>
        hackathon.title.toLowerCase().includes(lowerSearch) ||
        hackathon.description.toLowerCase().includes(lowerSearch) ||
        hackathon.domain.toLowerCase().includes(lowerSearch) ||
        hackathon.organizer.toLowerCase().includes(lowerSearch) ||
        hackathon.techStack.some((tech) => tech.toLowerCase().includes(lowerSearch))
      )
    }

    // STAGE 4: Last resort - show all hackathons
    return results.length > 0 ? results : hackathons
  }, [hackathons, search, domain, mode, level, status])

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          domain={domain}
          mode={mode}
          level={level}
          status={status}
          onDomainChange={setDomain}
          onModeChange={setMode}
          onLevelChange={setLevel}
          onStatusChange={setStatus}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredHackathons.length}</span> hackathons
        </p>
      </div>

      {filteredHackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
