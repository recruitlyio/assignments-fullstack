import { Avatar } from "../ui/avatar";
import { Bot, User } from "lucide-react";
import { Message } from "../../types/types";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg.message_id} message={msg} />
      ))}
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const isHuman = message.role === "human";

  return (
    <div className={`flex ${isHuman ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-3 max-w-[80%] ${
          isHuman ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <MessageAvatar role={message.role} />
        <MessageBubble message={message.message} role={message.role} />
      </div>
    </div>
  );
}

function MessageAvatar({ role }: { role: "ai" | "human" }) {
  const isHuman = role === "human";

  return (
    <Avatar
      className={`h-8 w-8 flex justify-center items-center ${
        isHuman ? "bg-blue-500" : "bg-primary"
      }`}
    >
      {isHuman ? (
        <User className="h-4 w-4 text-white" />
      ) : (
        <Bot className="h-4 w-4 text-white" />
      )}
    </Avatar>
  );
}

function MessageBubble({
  message,
  role,
}: {
  message: string;
  role: "ai" | "human";
}) {
  const isHuman = role === "human";

  return (
    <div
      className={`rounded-lg px-4 py-2 text-md ${
        isHuman ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {message}
    </div>
  );
}
