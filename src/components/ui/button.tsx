"use client";
import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { type ReactNode, useRef, useState, useEffect, Fragment } from "react";
import { Spinner } from "./spinner";

/** Represents a single ripple instance in the button */
type RippleInstance = {
  x: number;
  y: number;
  size: number;
  id: number;
  color: string;
  opacity: number;
};

/** Default configuration for ripple effect */
const DEFAULT_RIPPLE = {
  duration: 0.65, // in seconds for framer-motion
  opacity: 0.25,
} as const;

type ButtonRippleOptions = typeof DEFAULT_RIPPLE &
  Partial<{
    color: string;
  }>;

/** Style variants for the button component */
const buttonVariants = cva(
  "inline-flex items-center gap-1.5 cursor-pointer justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:from-primary/90 hover:to-primary",
        destructive:
          "bg-gradient-to-r from-destructive/70 to-destructive text-destructive-foreground hover:from-destructive/80 hover:to-destructive",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        "destructive-outline":
          "border border-destructive hover:bg-destructive/10 text-destructive",
        secondary:
          "bg-gradient-to-r from-secondary/70 to-secondary text-secondary-foreground hover:from-secondary/80 hover:to-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline underline-offset-4 hover:text-foreground transition-colors",
        success:
          "bg-gradient-to-r from-success/70 to-success text-success-foreground hover:from-success/80 hover:to-success",
        warning:
          "bg-gradient-to-r from-warning/70 to-warning text-warning-foreground hover:from-warning/80 hover:to-warning",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      radius: {
        none: "rounded-none",
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  },
);

type ButtonBaseProps = Omit<
  React.ComponentProps<"button">,
  keyof VariantProps<typeof buttonVariants>
>;

/** Props for the Button component */
type ButtonProps = Omit<ButtonBaseProps, "children"> &
  VariantProps<typeof buttonVariants> & {
    /** Enable/disable ripple effect with optional configuration */
    ripple?: ButtonRippleOptions | boolean;
    /** Enable/disable scale effect on press with optional scale amount */
    scaleOnActive?: number | boolean;
    /** Show loading state with optional custom loading indicator */
    loading?: boolean | ReactNode;
    /** Button content */
    children: ReactNode;
  };

/** Interactive button component with ripple and scale effects */
function Button({
  className,
  variant,
  size,
  ripple = true,
  disabled,
  loading,
  children,
  radius,
  scaleOnActive = true,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const [lastButtonWidth, setLastButtonWidth] = useState<number | null>(null);
  const isDisabled = disabled || Boolean(loading);

  // Preserve button width during loading state
  useEffect(() => {
    if (!buttonRef.current) return;

    if (loading) {
      setButtonWidth(lastButtonWidth);
    } else {
      setLastButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [lastButtonWidth, loading]);

  const rippleOptions: ButtonRippleOptions =
    typeof ripple === "object"
      ? { ...DEFAULT_RIPPLE, ...ripple }
      : DEFAULT_RIPPLE;

  return (
    <button
      className={cn(
        "relative overflow-hidden",
        buttonVariants({ variant, size, radius }),
        variant !== "link" && scaleOnActive && "scale-100 active:scale-[0.97]",
        className,
      )}
      onClick={props.onClick}
      ref={buttonRef}
      style={{ ...(buttonWidth ? { minWidth: `${buttonWidth}px` } : {}) }}
      disabled={isDisabled}
      {...props}
    >
      {variant !== "link" && <Ripple {...rippleOptions} />}
      <AnimatePresence mode="wait">
        <Fragment key={loading ? "loading" : "content"}>
          {!loading ? (
            children
          ) : typeof loading === "boolean" ? (
            <Spinner />
          ) : (
            (loading as ReactNode)
          )}
        </Fragment>
      </AnimatePresence>
    </button>
  );
}

type RippleProps = ButtonRippleOptions;

const Ripple = (rippleOptions: RippleProps) => {
  const nextId = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<RippleInstance[]>([]);
  const durationMs =
    (rippleOptions?.duration || DEFAULT_RIPPLE.duration) * 1000;
  const addRipple = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    const button = ref.current?.parentElement as HTMLButtonElement;
    const { clientX, clientY } = "touches" in event ? event.touches[0] : event;
    const computedStyle = window.getComputedStyle(button);
    const textColor = rippleOptions?.color || computedStyle.color;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.5;

    const newRipple: RippleInstance = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      size,
      id: nextId.current++,
      color: textColor,
      opacity: rippleOptions?.opacity || DEFAULT_RIPPLE.opacity,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((currentRipples) =>
        currentRipples.filter((ripple) => ripple.id !== newRipple.id),
      );
    }, durationMs + 100);
  };

  useEffect(() => {
    const parent = ref.current?.parentElement;

    if (!parent) return;

    (parent as HTMLButtonElement)?.addEventListener("mousedown", (e) => {
      addRipple(e as unknown as React.MouseEvent<HTMLButtonElement>);
    });

    (parent as HTMLButtonElement)?.addEventListener("touchstart", (e) => {
      addRipple(e as unknown as React.TouchEvent<HTMLButtonElement>);
    });

    return () => {
      (parent as HTMLButtonElement)?.removeEventListener("mousedown", (e) => {
        addRipple(e as unknown as React.MouseEvent<HTMLButtonElement>);
      });
      (parent as HTMLButtonElement)?.removeEventListener("touchstart", (e) => {
        addRipple(e as unknown as React.TouchEvent<HTMLButtonElement>);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <span ref={ref} className="absolute h-full w-full">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: ripple.opacity }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: rippleOptions?.duration || DEFAULT_RIPPLE.duration,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "absolute",
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "50%",
              backgroundColor: ripple.color,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ))}
      </span>
    </AnimatePresence>
  );
};

export { Button, type ButtonProps, buttonVariants, Ripple, type RippleProps };
