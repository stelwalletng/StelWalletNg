import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const textVariants = cva("font-satoshi", {
  variants: {
    variant: {
      h1: "text-4xl font-bold leading-tight tracking-tight",
      h2: "text-3xl font-bold leading-tight tracking-tight",
      h3: "text-2xl font-semibold leading-snug",
      h4: "text-xl font-semibold leading-snug",
      "body-lg": "text-lg leading-relaxed",
      body: "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      caption: "text-xs leading-normal",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>

// element used when `as` isn't provided, keyed by variant
const defaultElement: Record<TextVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  caption: "span",
}

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
  color?: string
}

function Text({ as, variant = "body", weight, color, className, style, ...props }: TextProps) {
  const Component = as ?? defaultElement[variant ?? "body"]
  return (
    <Component
      data-slot="text"
      className={cn(textVariants({ variant, weight, className }))}
      style={color ? { color, ...style } : style}
      {...props}
    />
  )
}

export { Text, textVariants }
