"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  Trophy,
  Calendar,
} from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useHackathons } from "@/lib/hackathons-context"
import { HackathonFormDialog } from "@/components/hackathon-form-dialog"
import type { Hackathon } from "@/lib/hackathons"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading } = useAuth()
  const { hackathons, deleteHackathon } = useHackathons()
  const [search, setSearch] = useState("")
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/")
      toast({ title: "Access denied", description: "Admin only.", variant: "destructive" })
    }
  }, [user, isLoading, router, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const filteredHackathons = hackathons.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.organizer.toLowerCase().includes(search.toLowerCase()) ||
      h.domain.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: hackathons.length,
    open: hackathons.filter((h) => h.status === "open").length,
    closingSoon: hackathons.filter((h) => h.status === "closing-soon").length,
    ended: hackathons.filter((h) => h.status === "ended").length,
    totalParticipants: hackathons.reduce((sum, h) => sum + h.participants, 0),
  }

  const handleDelete = (id: string) => {
    deleteHackathon(id)
    toast({ title: "Hackathon deleted successfully" })
  }

  const handleEdit = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setEditingHackathon(null)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">
                Manage hackathons and platform settings
              </p>
            </div>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hackathon
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Hackathons</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.open}</p>
                  <p className="text-xs text-muted-foreground">Open</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.closingSoon}</p>
                  <p className="text-xs text-muted-foreground">Closing Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.ended}</p>
                  <p className="text-xs text-muted-foreground">Ended</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalParticipants.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hackathons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Title</TableHead>
                  <TableHead className="text-muted-foreground">Domain</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Prize</TableHead>
                  <TableHead className="text-muted-foreground">Participants</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHackathons.map((hackathon) => (
                  <TableRow key={hackathon.id} className="border-border">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{hackathon.title}</p>
                        <p className="text-xs text-muted-foreground">{hackathon.organizer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-foreground border-border">
                        {hackathon.domain}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          hackathon.status === "open"
                            ? "bg-accent text-accent-foreground"
                            : hackathon.status === "closing-soon"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {hackathon.status === "open"
                          ? "Open"
                          : hackathon.status === "closing-soon"
                            ? "Closing Soon"
                            : "Ended"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{hackathon.prize}</TableCell>
                    <TableCell className="text-foreground">
                      {hackathon.participants.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(hackathon)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-foreground">
                                Delete Hackathon
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                Are you sure you want to delete &quot;{hackathon.title}&quot;? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-border text-foreground">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(hackathon.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <HackathonFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          hackathon={editingHackathon}
        />
      </main>
    </div>
  )
}
