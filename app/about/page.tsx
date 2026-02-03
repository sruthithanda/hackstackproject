import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  Users,
  Zap,
  Globe,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                About HackStack
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Connecting Innovators Globally
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              HackStack is the world's largest platform for discovering and participating in hackathons. We connect
              talented developers, designers, and innovators with the best hackathon opportunities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Discover",
                  description:
                    "Help developers find hackathons that match their interests, skills, and goals—from AI to Web3, from local to global.",
                },
                {
                  icon: Users,
                  title: "Connect",
                  description:
                    "Build communities where innovators meet, collaborate, and learn from each other. Form teams and build lasting relationships.",
                },
                {
                  icon: Zap,
                  title: "Innovate",
                  description:
                    "Create opportunities for people to push their limits, learn new skills, and build projects that matter to the world.",
                },
              ].map((mission, idx) => (
                <div key={idx} className="text-center">
                  <mission.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{mission.title}</h3>
                  <p className="text-muted-foreground">{mission.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">The Problem We Solve</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-secondary/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Before HackStack</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>❌ Hackathons scattered across dozens of websites</li>
                <li>❌ Hard to discover opportunities matching your skills</li>
                <li>❌ Difficulty finding teammates and managing registrations</li>
                <li>❌ Organizers with limited reach and outdated tools</li>
                <li>❌ Talented developers missing incredible opportunities</li>
              </ul>
            </div>
            <div className="bg-accent/5 border border-accent/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">With HackStack</h3>
              <ul className="space-y-2">
                {[
                  "All hackathons in one place",
                  "Smart filtering by domain, mode, level",
                  "Built-in team formation tools",
                  "Streamlined registration for participants",
                  "Modern platform for organizers",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "Demo",
                label: "Participants",
                icon: Users,
              },
              {
                number: "2500+",
                label: "Hackathons Listed",
                icon: Globe,
              },
              {
                number: "$2.5B",
                label: "Total Prizes Awarded",
                icon: TrendingUp,
              },
              {
                number: "150+",
                label: "Countries Represented",
                icon: Globe,
              },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Inclusivity",
                description:
                  "Everyone deserves a chance to innovate and compete. We welcome developers at all skill levels from all backgrounds.",
                icon: Heart,
              },
              {
                title: "Transparency",
                description:
                  "We believe in honest communication. Clear information about hackathons, rules, and opportunities builds trust.",
                icon: CheckCircle2,
              },
              {
                title: "Innovation",
                description:
                  "We constantly improve our platform to make discovering, participating in, and hosting hackathons easier.",
                icon: Zap,
              },
              {
                title: "Community",
                description:
                  "Hackathons are about people. We foster communities where developers connect, learn, and grow together.",
                icon: Users,
              },
            ].map((value, idx) => (
              <Card key={idx} className="border-border">
                <CardHeader>
                  <value.icon className="h-8 w-8 text-accent mb-3" />
                  <CardTitle className="text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Built by Hackathon Enthusiasts</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Our team consists of experienced developers, designers, and organizers who have participated in hundreds of
            hackathons. We understand what participants and organizers need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                bio: "10+ years in tech, organized 50+ hackathons",
              },
              {
                name: "Alex Rodriguez",
                role: "Head of Engineering",
                bio: "Former hackathon participant, 5 wins",
              },
              {
                name: "Maya Patel",
                role: "Product Lead",
                bio: "UX expert, passionate about community building",
              },
              {
                name: "James Morrison",
                role: "Community Manager",
                bio: "Hackathon organizer turned platform advocate",
              },
            ].map((member, idx) => (
              <Card key={idx} className="border-border text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg font-bold text-accent-foreground">{member.name.charAt(0)}</span>
                  </div>
                  <CardTitle className="text-foreground">{member.name}</CardTitle>
                  <p className="text-sm text-accent mt-2">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Journey</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { year: "2020", event: "HackStack founded by 4 hackathon enthusiasts" },
              { year: "2021", event: "Reached 100K developers on platform" },
              { year: "2022", event: "Launched team formation tools and organizer dashboard" },
              { year: "2023", event: "Expanded to 150+ countries (demo project)" },
              { year: "2024", event: "Added advanced analytics and AI-powered matching" },
              { year: "2026", event: "Celebrating millions of connections made" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-2">
                    <span className="text-accent-foreground font-bold">{idx + 1}</span>
                  </div>
                  {idx < 5 && <div className="w-0.5 h-16 bg-border" />}
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-foreground">{item.year}</h4>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're looking for your first hackathon or ready to host the next big event, HackStack is here to
            support your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base">
                Browse Hackathons
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/host">
              <Button variant="outline" className="border-border h-12 px-8 text-base">
                Host a Hackathon
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: "Product",
                links: ["Browse", "Host", "Resources"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Contact"],
              },
              {
                title: "Follow",
                links: ["Twitter", "Discord", "GitHub"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 HackStack. Built with ❤️ by hackathon enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
