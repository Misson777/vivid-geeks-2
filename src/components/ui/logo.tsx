import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentProps<"div">;

const Logo = ({ className, ...props }: Props) => {
  return (
    <div className={cn("text-2xl font-bold", className)} {...props}>
      <span className="text-foreground">Vivid</span>
      <span className="text-primary">Geeks</span>
    </div>
  );
};

export default Logo;
