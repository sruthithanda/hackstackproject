import Link from "next/link"
import { Header } from "@/components/header"
import { HackathonGrid } from "@/components/hackathon-grid"
import { RecommendationEngine } from "@/components/recommendation-engine"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Zap,
  Users,
  Trophy,
  Globe,
  TrendingUp,
  Code,
  Lightbulb,
  Award,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <p className="text-sm font-medium text-accent">✨ College Team Project</p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
              Find Your Next <span className="text-accent">Hackathon</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
              Discover exciting hackathons worldwide. Build innovative projects, win prizes worth $2.5B+, and join a community of passionate developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <RecommendationEngine />
              <Link href="/#browse">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 h-12 px-8 text-base font-semibold">
                  Browse All
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
              <div>
                <p className="text-3xl font-bold text-accent">Demo</p>
                <p className="text-sm text-muted-foreground">Project</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">2,500+</p>
                <p className="text-sm text-muted-foreground">Hackathons</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">$2.5B+</p>
                <p className="text-sm text-muted-foreground">In Prizes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HackStack Section */}
      <section className="py-20 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why HackStack?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to find, join, and succeed in hackathons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Discover hackathons from 150+ countries in one place"
              },
              {
                icon: Zap,
                title: "Smart Filtering",
                description: "Find hackathons by domain, mode, level, and status"
              },
              {
                icon: Users,
                title: "Team Building",
                description: "Form teams and collaborate with other developers"
              },
              {
                icon: Trophy,
                title: "Win Prizes",
                description: "Compete and win amazing prizes and recognition"
              },
            ].map((feature, idx) => (
              <Card key={idx} className="border-border bg-background">
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Hackathons Section */}
      <section id="browse" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trending Hackathons</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the most popular and upcoming hackathons this month
            </p>
          </div>

          <HackathonGrid />

          <div className="text-center mt-12">
            <Link href="/">
              <Button variant="outline" className="border-border">
                View All Hackathons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Browse",
                description: "Discover hackathons that match your skills and interests"
              },
              {
                step: "2",
                title: "Register",
                description: "Sign up and provide your details for the hackathon"
              },
              {
                step: "3",
                title: "Build",
                description: "Form teams and develop your innovative project idea"
              },
              {
                step: "4",
                title: "Win",
                description: "Submit your project and compete for amazing prizes"
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: TrendingUp, label: "Success Rate", value: "92%" },
              { icon: Code, label: "Technologies", value: "500+" },
              { icon: Lightbulb, label: "Ideas Launched", value: "10K+" },
              { icon: Award, label: "Project", value: "Demo" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <stat.icon className="h-8 w-8 text-accent mx-auto" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Loved by Developers</h2>
            <p className="text-lg text-muted-foreground">
              See what developers are saying about HackStack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Alex Chen",
                role: "Full-Stack Developer",
                content: "HackStack made it so easy to find hackathons that match my skills. Won my first hackathon using this platform!",
                avatar: "AC"
              },
              {
                name: "Sarah Johnson",
                role: "Product Designer",
                content: "The best platform for discovering hackathons. Great UX and the team matching feature is amazing.",
                avatar: "SJ"
              },
              {
                name: "Mike Patel",
                role: "ML Engineer",
                content: "Found incredible hackathons focused on AI/ML. The filtering system is incredibly helpful.",
                avatar: "MP"
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-semibold text-accent">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Find Your Next Hackathon?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers discovering and building at hackathons worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                  Start Browsing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">HackStack</h3>
              <p className="text-sm text-muted-foreground">
                The ultimate platform for discovering and winning hackathons worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Browse</Link></li>
                <li><Link href="/host" className="hover:text-foreground">Host</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 HackStack. Built for developers, by developers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  )
}
