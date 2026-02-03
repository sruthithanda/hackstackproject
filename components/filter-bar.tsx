"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { domains, modes, levels, statuses } from "@/lib/hackathons"

interface FilterBarProps {
  domain: string
  mode: string
  level: string
  status: string
  onDomainChange: (value: string) => void
  onModeChange: (value: string) => void
  onLevelChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function FilterBar({
  domain,
  mode,
  level,
  status,
  onDomainChange,
  onModeChange,
  onLevelChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={domain} onValueChange={onDomainChange}>
        <SelectTrigger className="w-[140px] bg-input border-border text-foreground">
          <SelectValue placeholder="Domain" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {domains.map((d) => (
            <SelectItem key={d} value={d.toLowerCase()} className="text-foreground">
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={mode} onValueChange={onModeChange}>
        <SelectTrigger className="w-[140px] bg-input border-border text-foreground">
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {modes.map((m) => (
            <SelectItem key={m} value={m.toLowerCase()} className="text-foreground">
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={level} onValueChange={onLevelChange}>
        <SelectTrigger className="w-[140px] bg-input border-border text-foreground">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {levels.map((l) => (
            <SelectItem key={l} value={l.toLowerCase()} className="text-foreground">
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px] bg-input border-border text-foreground">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {statuses.map((s) => (
            <SelectItem key={s} value={s.toLowerCase().replace(" ", "-")} className="text-foreground">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
