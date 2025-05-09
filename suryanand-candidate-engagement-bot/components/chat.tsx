"use client"

import { useChat } from "ai/react"
import { useState, useEffect, useRef } from "react"
import type { Message, CandidateInfo } from "@/types"
import { extractCandidateInfo } from "@/lib/extract-info"
import CandidateSummary from "./candidate-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, User, Bot } from "lucide-react"

interface ChatProps {
  initialCandidateInfo?: CandidateInfo
}

export default function Chat({ initialCandidateInfo }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: initialCandidateInfo
      ? [
          {
            id: "system-info",
            role: "system",
            content: `Initial candidate information: ${JSON.stringify(initialCandidateInfo)}`,
          },
        ]
      : [],
  })

  const [showSummary, setShowSummary] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Extract candidate information from messages and merge with initial info
  const candidateInfo = initialCandidateInfo
    ? {
        ...initialCandidateInfo,
        ...extractCandidateInfo(messages as Message[]),
        confidence: {
          ...initialCandidateInfo.confidence,
          ...extractCandidateInfo(messages as Message[]).confidence,
        },
      }
    : extractCandidateInfo(messages as Message[])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initial greeting message
  useEffect(() => {
    if (messages.length <= (initialCandidateInfo ? 1 : 0)) {
      const greeting = initialCandidateInfo?.name
        ? `👋 Hi ${initialCandidateInfo.name}! I'm the TechInnovate Solutions AI assistant. Thanks for sharing your information. I see you're currently a ${initialCandidateInfo.currentRole || "professional"}. I'm here to tell you more about our Senior Software Engineer position and answer any questions you might have. How can I help you today?`
        : "👋 Hi there! I'm the TechInnovate Solutions AI assistant. I'm here to tell you about our Senior Software Engineer position and learn more about your background. How can I help you today?"

      const initialMessage = {
        id: "initial-message",
        role: "assistant",
        content: greeting,
      }

      // Add the initial message to the chat
      setMessages((prev) => [...prev, initialMessage])
    }
  }, [initialCandidateInfo, messages.length, setMessages])

  return (
    <div className="flex flex-col h-[80vh]">
      <Card className="flex-1 overflow-hidden flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages
              .filter((m) => m.role !== "system")
              .map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                    max-w-[80%] rounded-lg p-4
                    ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}
                  `}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      <span className="font-medium">{message.role === "user" ? "You" : "AI Assistant"}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowSummary(!showSummary)}>
              {showSummary ? "Hide" : "Show"} Summary
            </Button>
          </form>
        </div>
      </Card>

      {showSummary && (
        <div className="mt-4">
          <CandidateSummary candidateInfo={candidateInfo} />
        </div>
      )}
    </div>
  )
}
