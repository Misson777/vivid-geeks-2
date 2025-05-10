import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 disabled:pointer-events-none",
        "text-foreground text-sm shadow-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-ring focus-visible:ring-offset-chart-3 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-default disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
