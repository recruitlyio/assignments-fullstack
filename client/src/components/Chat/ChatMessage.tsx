import { Message } from "@/types";
import { Avatar } from "@/components/ui";
import { cn } from "@/components/ui/utils";

interface ChatMessageProps {
  message: Message;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-slideUp",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        size="md"
        fallback={isUser ? "U" : "A"}
        alt={isUser ? "User" : "Assistant"}
        className={
          isUser
            ? "bg-primary-100 text-primary-700"
            : "bg-secondary-100 text-secondary-700"
        }
      />
      <div className={cn("max-w-[80%]", isUser ? "text-right" : "text-left")}>
        <div
          className={cn(
            "chat-bubble",
            isUser ? "chat-bubble-user" : "chat-bubble-assistant",
            "prose prose-sm max-w-none"
          )}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: message.content.replace(/\n/g, "<br />"),
            }}
            className="break-words leading-relaxed"
          />
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
