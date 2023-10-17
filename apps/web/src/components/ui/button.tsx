import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "inline-flex flex-grow-0 items-center gap-2 whitespace-nowrap justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        black: "bg-black text-white hover:bg-black/90",
        white: "bg-white text-black hover:bg-white/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm font-medium",
        sm: "h-9 rounded-md px-3 py-1.5 text-xs font-medium",
        lg: "h-11 rounded-md px-8 text-base font-semibold",
        xl: "h-14 rounded-md px-10 text-lg font-semibold",
        "2xl": "h-16 rounded-md px-12 text-xl font-semibold",
        icon: "h-8 w-8 md:h-10 md:w-10 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    loading: boolean;
  }
>(({ loading, children, ...props }, ref) => {
  return (
    <Button ref={ref} {...props}>
      {loading ? <Spinner className="text-white" /> : children}
    </Button>
  );
});
LoadingButton.displayName = "Loading Button";

export { Button, LoadingButton, buttonVariants };
