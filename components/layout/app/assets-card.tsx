"use client"

import { Text } from "@/components/reuseables/text"
import { AssetRow } from "@/components/layout/app/asset-row"
import { AssetIcon } from "@/components/layout/app/asset-icon"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWallet } from "@/lib/hooks/use-wallet"
import { assetUsdRates, getAssetBalance } from "@/lib/wallet-utils"

const assetMeta = [
  { symbol: "XLM" as const, symbolName: "Stellar Lumens" },
  { symbol: "USDC" as const, symbolName: "USD Coin" },
  { symbol: "EURC" as const, symbolName: "Euro Coin" },
]

function AssetsCard() {
  const { wallet } = useWalletContext()
  const { data } = useWallet(wallet?.publicKey)

  const totalUsd = assetMeta.reduce(
    (sum, { symbol }) => sum + getAssetBalance(data?.balances, symbol) * assetUsdRates[symbol],
    0
  )

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Text variant="body-sm" weight="semibold">
          Your assets
        </Text>
        <Text variant="caption" className="text-neutral-500">
          Total value: ≈ ${totalUsd.toFixed(2)} USD
        </Text>
      </div>

      <div className="mt-2 divide-y divide-neutral-100">
        {assetMeta.map(({ symbol, symbolName }) => {
          const balance = getAssetBalance(data?.balances, symbol)
          return (
            <AssetRow
              key={symbol}
              name={symbol}
              symbol={symbolName}
              amount={`${balance.toFixed(2)} ${symbol}`}
              value={`≈ $${(balance * assetUsdRates[symbol]).toFixed(2)} USD`}
              icon={<AssetIcon symbol={symbol} />}
            />
          )
        })}
      </div>
    </div>
  )
}

export { AssetsCard }

