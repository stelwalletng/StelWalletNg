import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Text } from "@/components/reuseables/text"

interface SettingsRowProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value?: string
  onClick?: () => void
}

function SettingsRow({ icon, title, subtitle, value, onClick }: SettingsRowProps) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-3 py-3 text-left">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <Text variant="body-sm" weight="semibold">
            {title}
          </Text>
          <Text variant="caption" className="text-neutral-500">
            {subtitle}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-1 text-neutral-400">
        {value ? (
          <Text variant="body-sm" className="text-neutral-500">
            {value}
          </Text>
        ) : null}
        <ChevronRight className="size-4" />
      </div>
    </button>
  )
}

export { SettingsRow }
