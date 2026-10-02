import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "cn"
import { AppColors } from "@/assets/app_colors"

const appButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[68px] font-medium whitespace-nowrap transition-[filter] outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "hover:brightness-95 active:brightness-90",
        secondary: "hover:brightness-95 active:brightness-90",
        outline: "border-2 bg-transparent hover:bg-black/5 active:bg-black/10",
        ghost: "bg-transparent hover:bg-black/5 active:bg-black/10",
        destructive: "hover:brightness-95 active:brightness-90",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        default: "h-12 px-6 text-base [&_svg:not([class*='size-'])]:size-4.5",
        lg: "h-14 px-7 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

type AppButtonVariant = NonNullable<VariantProps<typeof appButtonVariants>["variant"]>

// colors come from the design system rather than the tailwind theme, so they're applied inline
const variantStyles: Record<AppButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: AppColors.primaryGreen, color: AppColors.white },
  secondary: { backgroundColor: AppColors.lime, color: AppColors.weirdBlack },
  outline: { borderColor: AppColors.primaryGreen, color: AppColors.primaryGreen },
  ghost: { color: AppColors.primaryGreen },
  destructive: { backgroundColor: AppColors.redGradient, color: AppColors.white },
}

interface AppButtonProps
  extends Omit<ButtonPrimitive.Props, "children">,
    VariantProps<typeof appButtonVariants> {
  children: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  loading?: boolean
}

function AppButton({
  className,
  variant = "primary",
  size = "default",
  iconLeft,
  iconRight,
  loading = false,
  disabled,
  children,
  style,
  ...props
}: AppButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="app-button"
      disabled={disabled || loading}
      className={cn(appButtonVariants({ variant, size, className }))}
      style={{ ...variantStyles[variant ?? "primary"], ...style }}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" /> : iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </ButtonPrimitive>
  )
}

export { AppButton, appButtonVariants }
