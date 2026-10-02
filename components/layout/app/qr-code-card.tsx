"use client"

import { QrCode, Copy } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"
import { AppImages } from "@/assets/app_images"
import Image from "next/image"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWalletReceiveInfo } from "@/lib/hooks/use-wallet"
import { truncateAddress } from "@/lib/wallet-utils"

function QrCodeCard() {
  const { wallet } = useWalletContext()
  const { data } = useWalletReceiveInfo(wallet?.publicKey)
  const qrSrc = data?.qr_code
    ? data.qr_code.startsWith("data:") ? data.qr_code : `data:image/png;base64,${data.qr_code}`
    : null

  return (
    <div className="flex flex-col rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex flex-1 items-center justify-center rounded-2xl bg-neutral-50 p-6">
        {qrSrc ? (
          <Image src={qrSrc} alt="Wallet address QR code" width={112} height={112} className="size-full object-contain" unoptimized />
        ) : (
          <QrCode className="size-28 text-neutral-900" strokeWidth={1} />
        )}
      </div>

      <div
        className="mt-4 flex items-center justify-between rounded-2xl px-3 py-2.5"
        style={{ backgroundColor: AppColors.lightBlue }}
      >
        <div className="flex items-center gap-2">
          <span
            className="size-6 shrink-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" }}
          />
          <Text variant="body-sm" weight="medium">
            {wallet ? truncateAddress(wallet.publicKey) : "No wallet"}
          </Text>
        </div>
        <button
          type="button"
          aria-label="Copy wallet address"
          onClick={() => wallet && navigator.clipboard?.writeText(wallet.publicKey)}
        >
          <Image src={AppImages.copy} alt="Copy" width={16} height={16} className="size-4 text-neutral-600" />
        </button>
      </div>
    </div>
  )
}

export { QrCodeCard }

