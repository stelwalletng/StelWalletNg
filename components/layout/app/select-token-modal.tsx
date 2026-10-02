"use client"

import { ArrowLeft, Search, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { AppColors } from "@/assets/app_colors"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AssetIcon, type AssetSymbol } from "@/components/layout/app/asset-icon"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWallet } from "@/lib/hooks/use-wallet"
import { assetUsdRates, getAssetBalance } from "@/lib/wallet-utils"

interface TokenOption {
  symbol: AssetSymbol
  name: string
}

const tokens: TokenOption[] = [
  { symbol: "XLM", name: "Stellar Lumens" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "EURC", name: "Euro Coin" },
]

interface SelectTokenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected: AssetSymbol
  onSelect: (symbol: AssetSymbol) => void
}

function SelectTokenModal({ open, onOpenChange, selected, onSelect }: SelectTokenModalProps) {
  const { wallet } = useWalletContext()
  const { data } = useWallet(wallet?.publicKey)

  return (
    <Modal open={open} onOpenChange={onOpenChange} showClose={false} className="max-w-[380px]">
      <div className="flex items-center justify-between">
        <button type="button" aria-label="Go back" onClick={() => onOpenChange(false)}>
          <ArrowLeft className="size-5" />
        </button>
        <Text as="h2" variant="h4">
          Select Token
        </Text>
        <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </Dialog.Close>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2.5">
        <Search className="size-4 text-neutral-400" />
        <input
          placeholder="Search Token"
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {tokens.map((token) => {
          const isSelected = token.symbol === selected
          const balance = getAssetBalance(data?.balances, token.symbol)
          return (
            <button
              key={token.symbol}
              type="button"
              onClick={() => {
                onSelect(token.symbol)
                onOpenChange(false)
              }}
              className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 transition-colors"
              style={{ backgroundColor: isSelected ? AppColors.lightBlue : "transparent" }}
            >
              <div className="flex items-center gap-3">
                <AssetIcon symbol={token.symbol} />
                <div className="text-left">
                  <Text variant="body-sm" weight="semibold">
                    {token.symbol}
                  </Text>
                  <Text variant="caption" className="text-neutral-500">
                    {token.name}
                  </Text>
                </div>
              </div>
              <div className="text-right">
                <Text variant="body-sm" weight="semibold">
                  {balance.toFixed(2)} {token.symbol}
                </Text>
                <Text variant="caption" className="text-neutral-500">
                  ≈ ${(balance * assetUsdRates[token.symbol]).toFixed(2)} USD
                </Text>
              </div>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

export { SelectTokenModal, tokens }
export type { TokenOption }
