import * as React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "secondary"
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "animate-spin rounded-full border-2 border-background",
          {
            "h-4 w-4 border-t-2": size === "sm",
            "h-8 w-8 border-t-3": size === "md",
            "h-12 w-12 border-t-4": size === "lg",
            "border-t-primary": variant === "default",
            "border-t-secondary": variant === "secondary",
          },
          className,
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  },
)
Spinner.displayName = "Spinner"

export { Spinner }

