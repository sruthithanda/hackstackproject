"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search hackathons..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-input border-border h-11 text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}
