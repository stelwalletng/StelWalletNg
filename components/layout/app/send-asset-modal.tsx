"use client"

import * as React from "react"
import { Check, ChevronDown, Contact, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { AppColors } from "@/assets/app_colors"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { AssetIcon, type AssetSymbol } from "@/components/layout/app/asset-icon"
import { SelectTokenModal } from "@/components/layout/app/select-token-modal"
import { ReviewTransactionModal } from "@/components/layout/app/review-transaction-modal"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWallet } from "@/lib/hooks/use-wallet"
import { useBuildTransaction } from "@/lib/hooks/use-transactions"
import { assetUsdRates, getAssetBalance } from "@/lib/wallet-utils"
import type { TransactionBuildResponse } from "@/lib/api/types"

interface SendAssetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// mock address book until real contact resolution is wired up
const knownContacts: Record<string, string> = {
  "0x771526Cc0433fE178548b0c9F0686f97142b86302": "Jon Bee",
}

const percentOptions = ["25%", "50%", "75%", "Max"] as const

function SendAssetModal({ open, onOpenChange }: SendAssetModalProps) {
  const [asset, setAsset] = React.useState<AssetSymbol>("XLM")
  const [address, setAddress] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [activePercent, setActivePercent] = React.useState<(typeof percentOptions)[number] | null>(null)
  const [selectTokenOpen, setSelectTokenOpen] = React.useState(false)
  const [reviewOpen, setReviewOpen] = React.useState(false)
  const [buildResult, setBuildResult] = React.useState<TransactionBuildResponse | null>(null)
  const [buildError, setBuildError] = React.useState("")

  const { wallet } = useWalletContext()
  const { data: walletDetail } = useWallet(wallet?.publicKey)
  const buildTransaction = useBuildTransaction()

  const balance = getAssetBalance(walletDetail?.balances, asset)
  const trimmedAddress = address.trim()
  const isValidAddress = trimmedAddress.length > 15
  const contactName = knownContacts[trimmedAddress]

  function handlePercent(option: (typeof percentOptions)[number]) {
    setActivePercent(option)
    const fraction = option === "Max" ? 1 : Number(option.replace("%", "")) / 100
    setAmount((balance * fraction).toFixed(2))
  }

  async function handleContinue() {
    if (!isValidAddress || Number(amount) <= 0 || !wallet) return

    setBuildError("")
    try {
      const result = await buildTransaction.mutateAsync({
        source_account: wallet.publicKey,
        destination: trimmedAddress,
        amount,
        asset_code: asset,
      })
      setBuildResult(result)
      onOpenChange(false)
      setReviewOpen(true)
    } catch (error) {
      setBuildError(error instanceof Error ? error.message : "Couldn't prepare this transaction. Please try again.")
    }
  }

  const canContinue = isValidAddress && Number(amount) > 0 && Number(amount) <= balance

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange} showClose={false} className="max-w-[380px]">
        <div className="flex items-center justify-between">
          <Text as="h2" variant="h4">
            Send Asset
          </Text>
          <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
            <X className="size-5" />
          </Dialog.Close>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Text variant="caption" className="text-neutral-500">
            Available Balance
          </Text>
          <button
            type="button"
            onClick={() => setSelectTokenOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-neutral-100 py-1 pr-2 pl-1"
          >
            <AssetIcon symbol={asset} size="sm" />
            <Text variant="caption" weight="semibold">
              {asset}
            </Text>
            <ChevronDown className="size-3.5 text-neutral-500" />
          </button>
        </div>

        <div className="mt-1 flex items-baseline gap-1.5">
          <Text variant="h2" weight="bold">
            {balance.toFixed(2)}
          </Text>
          <Text variant="body" className="text-neutral-400">
            {asset}
          </Text>
        </div>
        <Text variant="caption" className="text-neutral-500">
          ≈ ${(balance * assetUsdRates[asset]).toFixed(2)} USD
        </Text>

        <div className="mt-5">
          <div className="relative flex items-center rounded-xl bg-neutral-100 px-3 py-3">
            {trimmedAddress && (isValidAddress || contactName) ? (
              <span
                className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-full"
                style={contactName ? { background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" } : { backgroundColor: AppColors.primaryGreen }}
              >
                {contactName ? null : <Check className="size-3 text-white" />}
              </span>
            ) : null}
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter Address"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
            {trimmedAddress ? (
              <button type="button" aria-label="Clear address" onClick={() => setAddress("")}>
                <X className="size-4 text-neutral-400" />
              </button>
            ) : (
              <Contact className="size-4 shrink-0 text-neutral-400" />
            )}
          </div>

          {contactName ? (
            <Text variant="caption" className="mt-1.5 text-neutral-500">
              {contactName}
            </Text>
          ) : isValidAddress ? (
            <Text variant="caption" weight="medium" className="mt-1.5" color={AppColors.primaryGreen}>
              Valid stellar address
            </Text>
          ) : (
            <Text variant="caption" className="mt-1.5 text-neutral-400">
              Enter a stellar address or choose from your contact
            </Text>
          )}
        </div>

        <div className="mt-4 flex items-center rounded-xl bg-neutral-100 px-3 py-3">
          <input
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value)
              setActivePercent(null)
            }}
            placeholder="Enter Amount"
            inputMode="decimal"
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
          <Text variant="caption" weight="semibold" className="text-neutral-500">
            {asset}
          </Text>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {percentOptions.map((option) => {
            const isActive = activePercent === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => handlePercent(option)}
                className="rounded-full py-2 transition-colors"
                style={{ backgroundColor: isActive ? AppColors.lime : "#F3F3F3" }}
              >
                <Text variant="caption" weight="medium">
                  {option}
                </Text>
              </button>
            )
          })}
        </div>

        {buildError ? (
          <Text variant="caption" className="mt-3 text-red-500">
            {buildError}
          </Text>
        ) : null}

        <AppButton
          variant="primary"
          className="mt-6 w-full"
          disabled={!canContinue}
          loading={buildTransaction.isPending}
          onClick={handleContinue}
        >
          Continue
        </AppButton>
      </Modal>

      <SelectTokenModal open={selectTokenOpen} onOpenChange={setSelectTokenOpen} selected={asset} onSelect={setAsset} />

      {buildResult ? (
        <ReviewTransactionModal
          open={reviewOpen}
          onOpenChange={setReviewOpen}
          xdr={buildResult.xdr}
          networkPassphrase={buildResult.network_passphrase}
          amount={amount}
          assetSymbol={asset}
          usdEstimate={(Number(amount || 0) * assetUsdRates[asset]).toFixed(2)}
          fee={buildResult.review_summary.fee}
          feeUsd={(Number(buildResult.review_summary.fee) * assetUsdRates.XLM).toFixed(4)}
          addressDisplay={trimmedAddress}
          contactName={contactName}
        />
      ) : null}
    </>
  )
}

export { SendAssetModal }

