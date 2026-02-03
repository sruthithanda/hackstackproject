import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  TrendingUp,
  Megaphone,
  Zap,
  Target,
  Award,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import HostForm from "@/components/host-form"

export default function HostPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Host a Hackathon
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Launch Your Innovation Event
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              HackStack makes it easy to organize, manage, and promote your hackathon to thousands
              of talented developers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?type=host">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base">
                  Host a Hackathon
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#">
                <Button variant="outline" className="border-border h-12 px-8 text-base">
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Host Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Host on HackStack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Reach Talented Developers",
                description:
                  "Access a global community of developers actively seeking hackathon opportunities. Build your team from the best talent available.",
              },
              {
                icon: Megaphone,
                title: "Powerful Marketing Tools",
                description:
                  "Promote your hackathon with featured listings, direct email notifications to relevant developers, and social sharing.",
              },
              {
                icon: TrendingUp,
                title: "Increase Registrations",
                description:
                  "Our platform helps you attract more participants through smart discovery, filtering, and recommendations.",
              },
              {
                icon: Zap,
                title: "Easy Management",
                description:
                  "Manage registrations, teams, and participants all in one place. Track submissions and judge projects seamlessly.",
              },
              {
                icon: Globe,
                title: "Global Visibility",
                description:
                  "Get your hackathon in front of developers from 150+ countries. Break geographical boundaries.",
              },
              {
                icon: Award,
                title: "Build Your Brand",
                description:
                  "Establish your hackathon as a premier event. Showcase winners and build a recurring event series.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-accent mb-4" />
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: "01",
                title: "Create Your Event",
                description:
                  "Set up your hackathon with basic information: theme, dates, eligibility, prize pool, and rules.",
              },
              {
                step: "02",
                title: "Configure Registration",
                description:
                  "Customize your registration form. Specify team size limits, technical requirements, and submission guidelines.",
              },
              {
                step: "03",
                title: "Launch & Promote",
                description:
                  "Publish your hackathon and watch registrations come in. Use our promotion tools to reach more developers.",
              },
              {
                step: "04",
                title: "Manage Participation",
                description:
                  "Track teams, submissions, and progress. Communicate with participants through the platform.",
              },
              {
                step: "05",
                title: "Judge & Announce Winners",
                description: "Review submissions, judge projects, and announce winners directly on HackStack.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 pb-6 border-b border-border last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                    <span className="text-lg font-bold text-accent">{item.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Event Form */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Create Your Hackathon</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">Fill out the form below to create your event — saved locally for this demo.</p>
          <HostForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "Unlimited registrations & teams",
              "Custom judging rubrics",
              "Real-time registration analytics",
              "Team formation tools",
              "Sponsor management",
              "Prize tracking & distribution",
              "Event scheduling & reminders",
              "Submission management system",
              "Leaderboard & rankings",
              "Winner announcements",
              "Certificate generation",
              "Post-event surveys & feedback",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                participants: "Up to 50",
                features: ["Basic event setup", "Team management", "Submissions"],
              },
              {
                name: "Growth",
                price: "$99",
                period: "per hackathon",
                participants: "Up to 500",
                features: [
                  "Everything in Starter",
                  "Advanced analytics",
                  "Sponsor dashboard",
                  "Custom branding",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                participants: "Unlimited",
                features: [
                  "Everything in Growth",
                  "Dedicated support",
                  "API access",
                  "White-label option",
                ],
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`border-border relative ${plan.popular ? "border-accent bg-accent/5 md:scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-foreground">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm"> {plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.participants}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "border-border hover:bg-secondary"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: "How long does it take to set up a hackathon?",
                a: "You can create a basic hackathon in under 10 minutes. Setup takes as little as 5-10 minutes on average.",
              },
              {
                q: "Can I customize the registration form?",
                a: "Yes! You can add custom questions, specify team size requirements, and set eligibility criteria.",
              },
              {
                q: "What if I need support during my hackathon?",
                a: "Growth and Enterprise plans include email support. Enterprise includes dedicated support manager.",
              },
              {
                q: "Can I run multiple hackathons?",
                a: "Absolutely. You can create multiple hackathons on one account. Manage all of them from one dashboard.",
              },
              {
                q: "Is there a participant limit?",
                a: "Starter plan: 50 participants. Growth: 500. Enterprise: unlimited. You can upgrade anytime.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="group border-b border-border pb-6">
                <summary className="flex cursor-pointer items-center justify-between text-foreground font-medium">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Host Your Hackathon?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of hackathon organizers who use HackStack to discover talent and build amazing communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=host">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" className="border-border h-12 px-8 text-base">
                Explore Resources
              </Button>
            </Link>
          </div>
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
