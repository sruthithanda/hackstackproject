"use client"

import Link from "next/link"
import { ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useHackathons } from "@/lib/hackathons-context"

export function HackathoonsDropdown() {
  const { hackathons } = useHackathons()
  
  // Get featured hackathons (open ones first, then by popularity)
  const featuredHackathons = hackathons
    .filter((h) => h.status !== "ended")
    .sort((a, b) => {
      if (a.status === "open" && b.status !== "open") return -1
      if (a.status !== "open" && b.status === "open") return 1
      return (b.participants || 0) - (a.participants || 0)
    })
    .slice(0, 8)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Hackathons
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          Featured Hackathons
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {featuredHackathons.map((hackathon) => (
          <Link key={hackathon.id} href={`/hackathon/${hackathon.id}`}>
            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
              <span className="font-medium text-sm text-foreground">{hackathon.title}</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{hackathon.domain}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  hackathon.status === "open" 
                    ? "bg-green-500/20 text-green-700 dark:text-green-400" 
                    : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                }`}>
                  {hackathon.status === "open" ? "Open" : "Closing Soon"}
                </span>
              </div>
            </DropdownMenuItem>
          </Link>
        ))}
        
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem className="cursor-pointer">
            <span className="text-accent font-medium">View All Hackathons</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
