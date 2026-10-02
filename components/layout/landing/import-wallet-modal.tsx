"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { WalletReadyModal } from "@/components/layout/landing/wallet-ready-modal"
import { useImportWallet } from "@/lib/hooks/use-wallet"
import { useWalletContext } from "@/lib/providers/wallet-provider"

interface ImportWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ImportWalletModal({ open, onOpenChange }: ImportWalletModalProps) {
  const [secretKey, setSecretKey] = React.useState("")
  const [passphrase, setPassphrase] = React.useState("")
  const [readyOpen, setReadyOpen] = React.useState(false)
  const { setWallet } = useWalletContext()
  const importWallet = useImportWallet()

  const isComplete = secretKey.trim().length > 0

  async function handleConfirm() {
    try {
      const result = await importWallet.mutateAsync({
        key: secretKey.trim(),
        passphrase: passphrase.trim() || undefined,
      })
      setWallet({ publicKey: result.public_key, secretKey: secretKey.trim() })
      onOpenChange(false)
      setReadyOpen(true)
    } catch {
      // error surfaced below via importWallet.isError
    }
  }

  return (
    <>
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showClose={false}
      className="max-w-[480px]"
      footer={
        <div className="flex items-center justify-center gap-2">
          <Text variant="body-sm" className="text-neutral-600">
            Your recovery phrase stays on your device. StelWallet never stores it.
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

        <div className="text-center">
          <Text as="h2" variant="h4">
            Import your Wallet
          </Text>
          <Text variant="caption" className="mt-1 text-neutral-500">
            Enter your Stellar secret key to restore your wallet.
          </Text>
        </div>

        <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </Dialog.Close>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <textarea
          value={secretKey}
          onChange={(event) => setSecretKey(event.target.value)}
          placeholder="Enter your secret key (starts with S...)"
          rows={3}
          className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-white px-3 py-2.5 font-mono text-sm outline-none focus-within:border-[#488544]"
        />
        <input
          value={passphrase}
          onChange={(event) => setPassphrase(event.target.value)}
          placeholder="Passphrase (optional)"
          className="w-full rounded-xl border-2 border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus-within:border-[#488544]"
        />
      </div>

      {importWallet.isError ? (
        <Text variant="caption" className="mt-3 text-red-500">
          We couldn&apos;t import that wallet. Double-check your secret key and try again.
        </Text>
      ) : null}

      <div className="mt-6 flex justify-center">
        <AppButton
          variant="primary"
          loading={importWallet.isPending}
          disabled={!isComplete}
          onClick={handleConfirm}
        >
          {importWallet.isPending ? "Confirming" : "Confirm"}
        </AppButton>
      </div>
    </Modal>

    <WalletReadyModal
      open={readyOpen}
      onOpenChange={setReadyOpen}
      title="Your wallet is ready"
      description="Your existing Stellar wallet has been imported successfully."
      walletLabel="Stellar Wallet"
    />
    </>
  )
}

export { ImportWalletModal }

