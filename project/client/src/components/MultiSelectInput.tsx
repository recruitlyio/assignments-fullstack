
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelectInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter",
  className,
}: MultiSelectInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      // Add the item if it doesn't already exist
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveItem = (item: string) => {
    onChange(value.filter((i) => i !== item));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 bg-background border rounded-md min-h-10 items-center">
        {value.map((item) => (
          <Badge key={item} variant="secondary" className="flex items-center gap-1">
            {item}
            <X
              className="h-3 w-3 cursor-pointer hover:text-destructive"
              onClick={() => handleRemoveItem(item)}
            />
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] border-none shadow-none focus-visible:ring-0 p-0 h-6"
          placeholder={value.length === 0 ? placeholder : ""}
        />
      </div>
      <p className="text-xs text-muted-foreground">Press Enter to add</p>
    </div>
  );
}
