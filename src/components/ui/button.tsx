import * as React from "react";
import { cn } from "@/src/lib/utils.ts";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "liquid" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variant === "liquid" &&
            "liquid-glass text-foreground hover:scale-[1.03]",
          variant === "default" &&
            "bg-foreground text-black hover:bg-white/90",
          variant === "ghost" &&
            "hover:bg-white/10 text-muted-foreground hover:text-foreground",
          variant === "outline" &&
            "border border-white/20 hover:bg-white/10 text-foreground",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
