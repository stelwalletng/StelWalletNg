"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { useWalletContext } from "@/lib/providers/wallet-provider"

interface WalletReadyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGoToDashboard?: () => void
  title?: string
  description?: string
  walletLabel?: string
}

function WalletReadyModal({
  open,
  onOpenChange,
  onGoToDashboard,
  title = "Your wallet is ready",
  description = "Your wallet has been created and secured.",
  walletLabel = "New Wallet",
}: WalletReadyModalProps) {
  const router = useRouter()
  const { wallet } = useWalletContext()

  const truncatedAddress = wallet
    ? `${wallet.publicKey.slice(0, 4)}...${wallet.publicKey.slice(-3)}`
    : "GABC...XYZ"

  function handleGoToDashboard() {
    onGoToDashboard?.()
    router.push("/app/dashboard")
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="max-w-[460px]">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-20 items-center justify-center">
          <Image
            src={AppImages.confetti}
            alt=""
            fill
            className="object-cover"
          />
          <span
            className="relative flex size-14 items-center justify-center rounded-full"
            style={{ backgroundColor: AppColors.primaryGreen }}
          >
            <Check className="size-7 text-white" />
          </span>
        </div>

        <Text as="h2" variant="h3" className="mt-4">
          {title}
        </Text>
        <Text variant="body-sm" className="mt-1 text-neutral-500">
          {description}
        </Text>

        <div className="mt-6 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span
              className="size-9 shrink-0 rounded-full"
              style={{ background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" }}
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <Text variant="body-sm" weight="semibold">
                  {truncatedAddress}
                </Text>
                <span className="size-1.5 rounded-full" style={{ backgroundColor: AppColors.primaryGreen }} />
              </div>
              <Text variant="caption" className="text-neutral-500">
                {walletLabel}
              </Text>
            </div>
          </div>
          <Text variant="body-sm" weight="semibold">
            $0.00
          </Text>
        </div>

        <AppButton variant="primary" className="mt-6 w-full" onClick={handleGoToDashboard}>
          Go to dashboard
        </AppButton>
      </div>
    </Modal>
  )
}

export { WalletReadyModal }

