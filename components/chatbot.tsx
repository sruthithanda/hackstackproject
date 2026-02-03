"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const responses = {
  "hello": "Hi there! Welcome to HackStack. How can I help you today?",
  "hi": "Hello! I'm here to help you with hackathon information.",
  "hackathon": "Hackathons are coding competitions where developers build projects in a short time. We have many exciting ones on HackStack!",
  "signup": "To sign up, click the 'Create Account' button and fill in your details. We'll send you a welcome email!",
  "login": "Use your email and password to log in. Demo credentials: demo@hackstack.com / demo123",
  "recommend": "Try our AI-powered recommendation engine to find hackathons that match your skills!",
  "team": "You can create or join teams for hackathons. Check the team section after registering.",
  "default": "I'm still learning! For now, I can help with basic questions about HackStack. Try asking about hackathons, signup, or recommendations."
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }
  return responses.default
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm HackBot, your AI assistant for HackStack. How can I help you?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-lg border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">HackBot</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-80">
        <div className="flex-1 overflow-y-auto space-y-2 mb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded-lg text-sm ${
                message.isBot
                  ? "bg-secondary text-secondary-foreground mr-4"
                  : "bg-accent text-accent-foreground ml-4"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-1 mb-2">
          {[
            "What are hackathons?",
            "How do I register?",
            "Find teammates",
            "Prize info"
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2 py-0 border-border hover:bg-accent/10"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1"
            disabled={false}
          />
          <Button
            onClick={handleSend}
            size="sm"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
