"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function HostForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [mode, setMode] = useState("online")
  const [prize, setPrize] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [contact, setContact] = useState("")
  const [status, setStatus] = useState<null | string>(null)

  function reset() {
    setTitle("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setMode("online")
    setPrize("")
    setTeamSize("")
    setContact("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !startDate || !endDate || !contact) {
      setStatus("Please fill required fields: title, dates, contact")
      return
    }

    const event = {
      id: `host_${Date.now()}`,
      title,
      description,
      startDate,
      endDate,
      mode,
      prize,
      teamSize,
      contact,
      createdAt: new Date().toISOString(),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("hostedHackathons") || "[]")
      existing.unshift(event)
      localStorage.setItem("hostedHackathons", JSON.stringify(existing))
      setStatus("Saved — your event is stored locally.")
      reset()
    } catch (err) {
      setStatus("Failed to save event locally.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
      {status && <div className="text-sm text-accent">{status}</div>}
      <div>
        <label className="block text-sm font-medium text-foreground">Event Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Short Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Start Date *</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">End Date *</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2">
            <option value="online">Online</option>
            <option value="in-person">In-person</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Prize</label>
          <input value={prize} onChange={(e) => setPrize(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Max Team Size</label>
          <input value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Contact Email *</label>
        <input value={contact} onChange={(e) => setContact(e.target.value)} type="email" className="mt-1 block w-full rounded-md border bg-background px-3 py-2" />
      </div>

      <div className="flex gap-3">
        <Button className="bg-accent text-accent-foreground" type="submit">Save Event</Button>
        <Button variant="outline" onClick={(e: any) => { e.preventDefault(); reset(); setStatus(null); }}>Reset</Button>
      </div>
    </form>
  )
}
