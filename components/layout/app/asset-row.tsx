import * as React from "react"
import { Text } from "@/components/reuseables/text"

interface AssetRowProps {
  icon: React.ReactNode
  name: string
  symbol: string
  amount: string
  value: string
}

function AssetRow({ icon, name, symbol, amount, value }: AssetRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <Text variant="body-sm" weight="semibold">
            {name}
          </Text>
          <Text variant="caption" className="text-neutral-500">
            {symbol}
          </Text>
        </div>
      </div>

      <div className="text-right">
        <Text variant="body-sm" weight="semibold">
          {amount}
        </Text>
        <Text variant="caption" className="text-neutral-500">
          {value}
        </Text>
      </div>
    </div>
  )
}

export { AssetRow }
