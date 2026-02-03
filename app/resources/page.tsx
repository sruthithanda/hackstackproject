import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  FileText,
  MessageSquare,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Resources
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Hackathon Preparation Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to prepare for, participate in, and win a hackathon.
            </p>
          </div>
        </div>
      </section>

      {/* Main Resources Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Guides */}
            <div className="lg:col-span-2 space-y-8">
              {/* Team Formation Guide */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Users className="h-6 w-6 text-accent mb-3" />
                      <CardTitle className="text-foreground text-xl">Team Formation Guide</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Building the right team is crucial for hackathon success. This guide covers everything from finding
                    teammates to managing team dynamics.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-foreground">Key Sections:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Finding and vetting teammates</li>
                      <li>• Team size recommendations (typically 2-5 people)</li>
                      <li>• Dividing responsibilities: frontend, backend, design, PM</li>
                      <li>• Communication tools: Slack, Discord, GitHub</li>
                      <li>• Managing team conflicts under pressure</li>
                      <li>• Post-hackathon team opportunities</li>
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-border w-full"
                    onClick={() => alert("Team Formation Guide PDF download feature coming soon!")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Guide
                  </Button>
                </CardContent>
              </Card>

              {/* Submission Checklist */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CheckCircle2 className="h-6 w-6 text-accent mb-3" />
                      <CardTitle className="text-foreground text-xl">Submission Checklist</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Don't let a missing detail cost you the competition. Use this checklist before submitting your
                    project.
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-foreground mb-3">Before Submission:</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        "Code pushed to GitHub with clear README",
                        "Live demo/deployed application accessible",
                        "Project runs without errors locally",
                        "All dependencies documented",
                        "Clear and concise project description",
                        "Tech stack clearly specified",
                        "Demo video (if required)",
                        "All team members added to submission",
                        "Respects hackathon theme/requirements",
                        "No copyright/license violations",
                        "Following code of conduct",
                      ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <input type="checkbox" className="rounded" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Tips */}
              <Card className="border-border">
                <CardHeader>
                  <div>
                    <Lightbulb className="h-6 w-6 text-accent mb-3" />
                    <CardTitle className="text-foreground text-xl">Preparation Tips</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Choose the Right Hackathon",
                        desc: "Pick one that aligns with your interests and skill level. Look at previous winners and judge experience.",
                      },
                      {
                        title: "Plan Your Project in Advance",
                        desc: "Have 2-3 project ideas ready. Brainstorm during the kickoff, but be prepared to decide quickly.",
                      },
                      {
                        title: "Learn the Tech Stack",
                        desc: "Familiarize yourself with key technologies before the hackathon. Learn during coding, not from scratch.",
                      },
                      {
                        title: "Set Realistic Goals",
                        desc: "Plan for MVP + 1-2 features. Shipping a complete basic project beats an incomplete ambitious one.",
                      },
                      {
                        title: "Sleep & Health Matter",
                        desc: "Don't neglect sleep entirely. A 4-hour nap is better than grinding all 24-48 hours straight.",
                      },
                      {
                        title: "Network & Have Fun",
                        desc: "Hackathons are about community. Talk to other developers, judges, and sponsors. Enjoy the experience!",
                      },
                    ].map((tip, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Links */}
            <div className="space-y-6">
              <Card className="border-border bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      title: "Pitch Your Project",
                      desc: "Learn to present your hackathon project in 2-3 minutes",
                      icon: MessageSquare,
                      href: "/resources#pitch",
                    },
                    {
                      title: "Create a Great README",
                      desc: "Best practices for documenting your project",
                      icon: FileText,
                      href: "/resources#readme",
                    },
                    {
                      title: "Build a Demo Video",
                      desc: "Showcase your project with an engaging video",
                      icon: Download,
                      href: "/resources#video",
                    },
                  ].map((resource, idx) => (
                    <Link href={resource.href} key={idx} className="block p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <resource.icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{resource.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Popular Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "React",
                      "Node.js",
                      "Python",
                      "Vue.js",
                      "TypeScript",
                      "MongoDB",
                      "PostgreSQL",
                      "Docker",
                      "AWS",
                      "Firebase",
                      "Next.js",
                      "Tailwind CSS",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground text-center"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for? Our community is here to help.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-border w-full"
                    onClick={() => alert("Community chat feature coming soon!")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Community
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-border w-full"
                    onClick={() => alert("Email support: support@hackstack.com")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Learning Paths by Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Beginner",
                duration: "2-4 hours",
                topics: [
                  "Understanding hackathon format",
                  "Choosing your first hackathon",
                  "Basic project planning",
                  "Working in a team",
                  "Deploying your first app",
                ],
              },
              {
                level: "Intermediate",
                duration: "4-6 hours",
                topics: [
                  "Advanced project architecture",
                  "API integration",
                  "Database design",
                  "Full-stack development",
                  "Winning strategies",
                ],
              },
              {
                level: "Advanced",
                duration: "6+ hours",
                topics: [
                  "Machine learning projects",
                  "Blockchain development",
                  "Real-time applications",
                  "Scaling considerations",
                  "Pitching to investors",
                ],
              },
            ].map((path, idx) => (
              <Card key={idx} className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">{path.level}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{path.duration}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {path.topics.map((topic, tidx) => (
                      <li key={tidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-1">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Join Your First Hackathon?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse thousands of hackathons on HackStack and find one that's right for you.
          </p>
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
              Browse Hackathons
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 HackStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
