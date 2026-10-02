"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWallet } from "@/lib/hooks/use-wallet"
import { assetUsdRates, getAssetBalance } from "@/lib/wallet-utils"

function TotalBalanceCard() {
  const [hidden, setHidden] = React.useState(false)
  const { wallet } = useWalletContext()
  const { data } = useWallet(wallet?.publicKey)
  const xlmBalance = getAssetBalance(data?.balances, "XLM")
  const usdcEstimate = xlmBalance * assetUsdRates.XLM

  return (
    <div className="rounded-3xl p-6" style={{ backgroundColor: AppColors.primaryGreen }}>
      <div className="flex items-center gap-1.5">
        <Text variant="body-sm" className="text-white/70">
          Total Balance
        </Text>
        <button type="button" aria-label={hidden ? "Show balance" : "Hide balance"} onClick={() => setHidden((v) => !v)}>
          {hidden ? (
            <Eye className="size-4 text-white/70" />
          ) : (
            <EyeOff className="size-4 text-white/70" />
          )}
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <Text variant="h2" weight="bold" className="text-white">
          {hidden ? "••••" : xlmBalance.toFixed(2)}
        </Text>
        <Text variant="body" className="text-white/70">
          XLM
        </Text>
      </div>

      <Text variant="body-sm" className="mt-1 text-white/70">
        {hidden ? "••••" : `≈ ${usdcEstimate.toFixed(2)}`} USDC
      </Text>

      <div className="mt-5 inline-flex rounded-full bg-black/25 px-3 py-1.5">
        <Text variant="caption" className="text-white/90">
          Today&apos;s rate: 1 XLM ≈ 0.22568814 USDC
        </Text>
      </div>
    </div>
  )
}

export { TotalBalanceCard }

