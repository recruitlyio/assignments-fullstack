import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Bot } from "lucide-react";
import { ProfileCard } from "./ProfileCard";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Message, Profile } from "../../types/types";

function Chat({
  thread_id,
  message,
  message_id,
}: {
  thread_id: string;
  message: string;
  message_id: string;
}) {
  const [thread, setThread] = useState<Message[]>([
    { message, message_id, role: "ai" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      message: newMessage,
      message_id: crypto.randomUUID(),
      role: "human" as const,
    };

    setNewMessage("");
    setThread((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id,
          message: userMessage.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setThread((prev) => [
        ...prev,
        { message: data.message, message_id: data.message_id, role: "ai" },
      ]);
      console.log(data.profile);
      setProfile(data.profile);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Add error message to thread
      setThread((prev) => [
        ...prev,
        {
          message:
            "Sorry, there was an error sending your message. Please try again.",
          message_id: crypto.randomUUID(),
          role: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full h-full justify-center gap-6 p-6 flex-wrap">
      <ProfileCard profile={profile} />

      <Card className="flex-1 w-full h-full min-w-md shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-center text-gray-700 flex items-center justify-center gap-2">
            <Bot size={20} className="text-primary" />
            Chat Thread: {thread_id.substring(0, 8)}
          </CardTitle>
        </CardHeader>

        <ScrollArea className="h-[500px] px-4">
          <CardContent className="pt-6 pb-2">
            <MessageList messages={thread} />
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>

        <CardFooter className="p-4 border-t">
          <MessageInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSend}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chat;
