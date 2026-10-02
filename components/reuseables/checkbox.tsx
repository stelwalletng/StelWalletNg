"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import { cn } from "cn"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"

interface CheckboxProps extends Omit<CheckboxPrimitive.Root.Props, "children"> {
  label?: React.ReactNode
}

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const checkbox = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-neutral-300 bg-white transition-colors data-checked:border-transparent",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex size-full items-center justify-center rounded-[4px] data-unchecked:hidden"
        style={{ backgroundColor: AppColors.primaryGreen }}
      >
        <Check className="size-3.5 text-white" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return checkbox

  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      {checkbox}
      <Text variant="body-sm">{label}</Text>
    </label>
  )
}

export { Checkbox }
