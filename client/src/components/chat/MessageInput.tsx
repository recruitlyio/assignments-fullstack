import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export function MessageInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading,
}: MessageInputProps) {
  return (
    <div className="flex w-full gap-2">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1"
        disabled={isLoading}
      />
      <Button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="px-4"
      >
        {isLoading ? <LoadingSpinner /> : <Send className="h-4 w-4" />}
      </Button>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
  );
}
