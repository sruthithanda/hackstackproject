import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HackathonNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hackathon Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The hackathon you are looking for does not exist, may have been removed, or the ID is invalid. Please check the URL and try again.
        </p>
        <Link href="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2 mx-auto">
            <ArrowLeft className="h-4 w-4" />
            Back to All Hackathons
          </Button>
        </Link>
      </div>
    </div>
  )
}
