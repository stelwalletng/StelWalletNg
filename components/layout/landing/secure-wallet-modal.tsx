"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, Copy, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { RecoveryPhraseGrid } from "@/components/reuseables/recovery-phrase-grid"
import { WalletReadyModal } from "@/components/layout/landing/wallet-ready-modal"

interface SecureWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  secretKey: string
  passphrase: string
  message?: string
}

function SecureWalletModal({ open, onOpenChange, secretKey, passphrase, message }: SecureWalletModalProps) {
  const [readyOpen, setReadyOpen] = React.useState(false)
  const recoveryWords = passphrase.trim().split(/\s+/).filter(Boolean)

  return (
    <>
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showClose={false}
      className="max-w-[620px]"
      footer={
        <div className="flex items-center justify-center gap-2">
          <Text variant="body-sm" className="text-neutral-600">
            StelWallet do not store your recovery phrase. Keep it safe.
          </Text>
          <Image src={AppImages.circledQuestion} alt="More info" width={16} height={16} />
        </div>
      }
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => onOpenChange(false)}
          className="flex size-9 items-center justify-center rounded-full bg-black text-white"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex max-w-[10rem] flex-1 flex-col items-center gap-1.5">
          <Text variant="caption" weight="medium" className="text-neutral-500">
            Create Wallet (01/02)
          </Text>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: AppColors.primaryGreen }} />
          </div>
        </div>

        <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </Dialog.Close>
      </div>

      <div className="mt-6 text-center">
        <Text as="h2" variant="h3">
          Secure your Wallet
        </Text>
        <Text variant="body-sm" className="mx-auto mt-2 max-w-sm text-neutral-500">
          Write down your secret key and recovery phrase, and keep them
          somewhere safe. You&apos;ll need them to restore your wallet if you
          lose access.
        </Text>
      </div>

      <div
        className="mt-6 flex items-center justify-between gap-2 rounded-2xl px-4 py-3"
        style={{ backgroundColor: AppColors.lightBlue }}
      >
        <Text variant="body-sm" weight="medium" className="font-mono break-all">
          {secretKey}
        </Text>
        <button
          type="button"
          aria-label="Copy secret key"
          onClick={() => navigator.clipboard?.writeText(secretKey)}
          className="shrink-0"
        >
          <Copy className="size-4 text-neutral-600" />
        </button>
      </div>

      {recoveryWords.length > 0 ? (
        <div className="mt-4">
          <RecoveryPhraseGrid words={recoveryWords} />
        </div>
      ) : null}

      {message ? (
        <Text variant="caption" className="mt-4 text-center text-neutral-500">
          {message}
        </Text>
      ) : null}

      <AppButton
        variant="primary"
        className="mt-6 w-full"
        onClick={() => {
          onOpenChange(false)
          setReadyOpen(true)
        }}
      >
        I&apos;ve saved my recovery details
      </AppButton>
    </Modal>

    <WalletReadyModal open={readyOpen} onOpenChange={setReadyOpen} />
    </>
  )
}

export { SecureWalletModal }

