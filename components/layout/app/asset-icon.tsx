import { DollarSign, Euro, Orbit, type LucideIcon } from "lucide-react"

type AssetSymbol = "XLM" | "USDC" | "EURC"

const assetIconConfig: Record<AssetSymbol, { bg: string; icon: LucideIcon }> = {
  XLM: { bg: "#000000", icon: Orbit },
  USDC: { bg: "#2563EB", icon: DollarSign },
  EURC: { bg: "#2563EB", icon: Euro },
}

interface AssetIconProps {
  symbol: AssetSymbol
  size?: "sm" | "md"
}

function AssetIcon({ symbol, size = "md" }: AssetIconProps) {
  const { bg, icon: Icon } = assetIconConfig[symbol]

  return (
    <span
      className={size === "sm" ? "flex size-8 shrink-0 items-center justify-center rounded-full" : "flex size-9 shrink-0 items-center justify-center rounded-full"}
      style={{ backgroundColor: bg }}
    >
      <Icon className={size === "sm" ? "size-3.5 text-white" : "size-4 text-white"} />
    </span>
  )
}

export { AssetIcon, assetIconConfig }
export type { AssetSymbol }
