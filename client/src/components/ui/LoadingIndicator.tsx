import React from "react";
import { cn } from "./utils";

export interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-gray-300 border-t-primary-600",
        sizeClasses[size],
        className
      )}
    />
  );
};

export default LoadingIndicator;
