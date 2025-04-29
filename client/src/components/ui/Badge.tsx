import React from "react";
import { cn } from "./utils";

export interface BadgeProps {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className,
}) => {
  const variantClasses = {
    default: "bg-gray-500 text-white",
    primary: "bg-primary-500 text-white",
    secondary: "bg-secondary-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  const sizeClasses = {
    sm: "text-xs py-0 px-2 h-5",
    md: "text-xs py-1 px-3 h-6",
    lg: "text-sm py-1 px-4 h-7",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
