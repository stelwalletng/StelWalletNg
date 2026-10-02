import * as React from "react"
import { Text } from "@/components/reuseables/text"

interface DetailRowProps {
  label: string
  value: React.ReactNode
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <Text variant="body-sm" className="text-neutral-500">
        {label}
      </Text>
      <div className="text-right">{value}</div>
    </div>
  )
}

export { DetailRow }
