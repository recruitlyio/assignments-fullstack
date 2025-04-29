import React, { HTMLAttributes } from "react";
import { cn } from "./utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = "md", children, ...props }, ref) => {
    const elevationClasses = {
      none: "border border-gray-200",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
    };

    return (
      <div
        className={cn(
          "bg-white rounded-lg",
          elevationClasses[elevation],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
