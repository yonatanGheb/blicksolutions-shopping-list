import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";

const checkboxVariants = cva(
  "flex shrink-0 items-center justify-center rounded border-2 border-border bg-background outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
  {
    variants: {
        variant: {
            default: "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ",
            outline: "",
            solid:
                "data-[state=checked]:bg-foreground data-[state=checked]:text-background",
        },
        size: {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

export const Checkbox = ({
    className,
    size,
    variant,
    ...props
}: CheckboxProps) => (
    <CheckboxPrimitive.Root
        className={cn(
            checkboxVariants({
                size,
                variant,
            }),
            className,
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator className="flex size-full items-center justify-center text-current">
            <Check className="size-[0.85em] stroke-[3]" aria-hidden />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
);