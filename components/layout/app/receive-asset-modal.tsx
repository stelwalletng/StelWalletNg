"use client"

import * as React from "react"
import Image from "next/image"
import { Check, Copy, Loader2, QrCode, Share2 } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWalletReceiveInfo } from "@/lib/hooks/use-wallet"

interface ReceiveAssetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ReceiveAssetModal({ open, onOpenChange }: ReceiveAssetModalProps) {
  const [copied, setCopied] = React.useState(false)
  const { wallet } = useWalletContext()
  const { data, isLoading } = useWalletReceiveInfo(open ? wallet?.publicKey : undefined)

  const walletAddress = data?.public_key ?? wallet?.publicKey ?? ""
  const qrSrc = data?.qr_code
    ? data.qr_code.startsWith("data:") ? data.qr_code : `data:image/png;base64,${data.qr_code}`
    : null

  async function handleCopy() {
    await navigator.clipboard?.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ text: walletAddress })
    } else {
      await handleCopy()
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="max-w-[380px]">
      <Text as="h2" variant="h4">
        Receive Asset
      </Text>

      <div className="mt-6 flex flex-col items-center text-center">
        <Text variant="body-sm" weight="semibold">
          Your Stellar Wallet
        </Text>
        <Text variant="caption" className="mt-1 max-w-xs text-neutral-500">
          You can deposit any tokens supported by Stellar to this address.
        </Text>

        <div className="mt-6 flex size-[12.5rem] items-center justify-center rounded-2xl bg-neutral-50 p-4">
          {isLoading ? (
            <Loader2 className="size-8 animate-spin text-neutral-400" />
          ) : qrSrc ? (
            <Image src={qrSrc} alt="Wallet address QR code" width={176} height={176} className="size-full object-contain" unoptimized />
          ) : (
            <QrCode className="size-28 text-neutral-900" strokeWidth={1} />
          )}
        </div>

        <div className="mt-5 flex w-full items-center gap-2 rounded-2xl bg-neutral-100 px-3 py-2.5">
          <span
            className="size-6 shrink-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" }}
          />
          <Text variant="caption" weight="medium" className="text-left break-all">
            {walletAddress || "No wallet connected"}
          </Text>
        </div>

        <div className="mt-4 flex w-full gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!walletAddress}
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 transition-colors disabled:opacity-50"
            style={{ backgroundColor: copied ? AppColors.primaryGreen : AppColors.black }}
          >
            <Text variant="body-sm" weight="medium" className="text-white">
              {copied ? "Copied!!" : "Copy"}
            </Text>
            {copied ? <Check className="size-4 text-white" /> : <Copy className="size-4 text-white" />}
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={!walletAddress}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-2.5 disabled:opacity-50"
          >
            <Text variant="body-sm" weight="medium" className="text-white">
              Share
            </Text>
            <Share2 className="size-4 text-white" />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export { ReceiveAssetModal }

