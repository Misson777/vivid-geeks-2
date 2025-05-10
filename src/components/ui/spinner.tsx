import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { Loader, LoaderCircle } from "lucide-react";

/** Available spinner icons */
const SPINNERS = {
  default: Loader,
  circle: LoaderCircle,
};

export type SpinnerType = keyof typeof SPINNERS | ReactElement;

/** Spinner styling variants */
const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
      lg: "h-6 w-6",
    },
    speed: {
      default: "duration-500",
      fast: "duration-300",
      slow: "duration-700",
    },
  },
  defaultVariants: {
    size: "default",
    speed: "default",
  },
});

export interface SpinnerProps
  extends ButtonHTMLAttributes<HTMLOrSVGElement>,
    VariantProps<typeof spinnerVariants> {
  spinner?: SpinnerType;
}

/** Animated loading spinner with customizable size and speed */
const Spinner = ({
  spinner = "default",
  size,
  speed,
  ...props
}: SpinnerProps) => {
  return (
    <Slot className={spinnerVariants({ size, speed })} {...props}>
      {typeof spinner === "string"
        ? React.createElement(SPINNERS[spinner])
        : spinner}
    </Slot>
  );
};

export { Spinner, spinnerVariants };
