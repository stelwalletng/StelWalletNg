"use client"

import * as React from "react"
import { AlertTriangle, Check, ExternalLink, Loader2 } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { DetailRow } from "@/components/layout/app/detail-row"
import { AddressWithCopy } from "@/components/layout/app/address-with-copy"
import { StatusBadge } from "@/components/layout/app/status-badge"
import type { AssetSymbol } from "@/components/layout/app/asset-icon"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useSubmitTransaction } from "@/lib/hooks/use-transactions"
import { signTransactionXdr } from "@/lib/stellar"

interface ReviewTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  xdr: string
  networkPassphrase: string
  amount: string
  assetSymbol: AssetSymbol
  usdEstimate: string
  fee: string
  feeUsd: string
  addressDisplay: string
  contactName?: string
}

type Phase = "review" | "signing" | "submitting" | "success" | "error"

function ReviewTransactionModal({
  open,
  onOpenChange,
  xdr,
  networkPassphrase,
  amount,
  assetSymbol,
  usdEstimate,
  fee,
  feeUsd,
  addressDisplay,
  contactName,
}: ReviewTransactionModalProps) {
  const [phase, setPhase] = React.useState<Phase>("review")
  const [errorMessage, setErrorMessage] = React.useState("")
  const { wallet } = useWalletContext()
  const submitTransaction = useSubmitTransaction()

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
    if (!next) {
      setTimeout(() => setPhase("review"), 200)
    }
  }

  async function handleConfirm() {
    if (!wallet) return

    try {
      setPhase("signing")
      const signedXdr = signTransactionXdr(xdr, networkPassphrase, wallet.secretKey)

      setPhase("submitting")
      const result = await submitTransaction.mutateAsync({ signed_xdr: signedXdr })

      if (result.error || result.status?.toLowerCase().includes("fail")) {
        setErrorMessage(result.error ?? "The transaction failed to submit.")
        setPhase("error")
        return
      }

      setPhase("success")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong signing your transaction.")
      setPhase("error")
    }
  }

  return (
    <Modal open={open} onOpenChange={handleOpenChange} showClose={false} className="max-w-[380px]">
      <div className="flex items-center justify-between">
        <Text as="h2" variant="h4">
          {phase === "success" ? "Transaction" : "Review Transaction"}
        </Text>
        <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </Dialog.Close>
      </div>

      {phase === "submitting" ? (
        <div className="mt-10 flex flex-col items-center gap-4 pb-6 text-center">
          <Loader2 className="size-12 animate-spin" style={{ color: AppColors.primaryGreen }} />
          <Text variant="body-sm" weight="semibold">
            Submitting Transaction
          </Text>
          <Text variant="caption" className="text-neutral-500">
            Please wait while we broadcast your transaction.
          </Text>
        </div>
      ) : phase === "error" ? (
        <div className="mt-10 flex flex-col items-center gap-4 pb-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="size-6 text-red-500" />
          </span>
          <div>
            <Text variant="body-sm" weight="semibold">
              Transaction failed
            </Text>
            <Text variant="caption" className="mt-1 max-w-xs text-neutral-500">
              {errorMessage}
            </Text>
          </div>
          <AppButton variant="primary" onClick={() => setPhase("review")}>
            Try again
          </AppButton>
        </div>
      ) : (
        <>
          {phase === "success" ? (
            <div className="mt-4 flex flex-col items-center gap-2 text-center">
              <span className="flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.primaryGreen }}>
                <Check className="size-6 text-white" />
              </span>
              <Text variant="body-sm" weight="semibold">
                Transaction Successful
              </Text>
              <Text variant="caption" className="text-neutral-500">
                Your asset has been sent
              </Text>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <Text variant="caption" className="text-neutral-500">
                Sending
              </Text>
              <Text variant="h2" weight="bold" className="mt-1">
                {amount} <Text as="span" variant="body" className="text-neutral-400">{assetSymbol}</Text>
              </Text>
              <Text variant="caption" className="text-neutral-500">
                ≈ {usdEstimate} USDC
              </Text>
            </div>
          )}

          <div className="mt-6 divide-y divide-neutral-100">
            {phase === "success" ? (
              <DetailRow
                label="Amount"
                value={
                  <div>
                    <Text variant="body-sm" weight="medium">{amount} {assetSymbol.toLowerCase()}</Text>
                    <Text variant="caption" className="text-neutral-500">≈ {usdEstimate} USDC</Text>
                  </div>
                }
              />
            ) : null}

            <DetailRow
              label="Sending to"
              value={<AddressWithCopy address={addressDisplay} />}
            />
            {contactName ? (
              <div className="-mt-2 pb-2 text-right">
                <Text variant="caption" className="text-neutral-500">{contactName}</Text>
              </div>
            ) : null}

            <DetailRow
              label="Fee"
              value={
                <div>
                  <Text variant="body-sm" weight="medium">{fee} xlm</Text>
                  <Text variant="caption" className="text-neutral-500">≈{feeUsd} USDC</Text>
                </div>
              }
            />

            {phase === "success" ? (
              <DetailRow label="Status" value={<StatusBadge status="successful" />} />
            ) : null}
          </div>

          {phase === "success" ? (
            <div className="mt-4 flex flex-col items-center gap-3">
              <a
                href={submitTransaction.data?.explorer_url ?? "https://stellar.expert"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <Text variant="body-sm" weight="medium" color={AppColors.primaryGreen}>
                  View on Stellar Expert
                </Text>
                <ExternalLink className="size-3.5" style={{ color: AppColors.primaryGreen }} />
              </a>
              {contactName ? null : (
                <button type="button">
                  <Text variant="caption" weight="medium" color={AppColors.primaryGreen} className="underline">
                    Save Address
                  </Text>
                </button>
              )}
            </div>
          ) : (
            <AppButton
              variant="primary"
              className="mt-6 w-full"
              loading={phase === "signing"}
              onClick={handleConfirm}
            >
              {phase === "signing" ? "Signing Transaction" : "Confirm & Send"}
            </AppButton>
          )}
        </>
      )}
    </Modal>
  )
}

export { ReviewTransactionModal }

