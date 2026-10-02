"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { WalletReadyModal } from "@/components/layout/landing/wallet-ready-modal"

interface VerifyWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// placeholder recovery phrase for layout purposes, mirrors SecureWalletModal
const recoveryWords = [
  "Spoon",
  "Colon",
  "Shame",
  "Collect",
  "Object",
  "Revolve",
  "Sprung",
  "Protect",
  "Intervene",
  "Obsolete",
  "Kettle",
  "Gate",
]

// indices of the words the user must re-type to verify they saved the phrase
const blankIndices = [1, 6, 8]

function VerifyWalletModal({ open, onOpenChange }: VerifyWalletModalProps) {
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [verifying, setVerifying] = React.useState(false)
  const [readyOpen, setReadyOpen] = React.useState(false)

  function handleVerify() {
    setVerifying(true)
    // simulated verification until real wallet verification is wired up
    window.setTimeout(() => {
      setVerifying(false)
      onOpenChange(false)
      setReadyOpen(true)
    }, 1200)
  }

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
            Verify (02/02)
          </Text>
          <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-full rounded-full" style={{ backgroundColor: AppColors.primaryGreen }} />
          </div>
        </div>

        <Dialog.Close aria-label="Close" className="flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </Dialog.Close>
      </div>

      <div className="mt-6 text-center">
        <Text as="h2" variant="h3">
          Prove it
        </Text>
        <Text variant="body-sm" className="mx-auto mt-2 max-w-sm text-neutral-500">
          To make sure you&apos;ve saved your recovery phrase, enter the
          missing words below.
        </Text>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {recoveryWords.map((word, index) => {
          const isBlank = blankIndices.includes(index)

          if (!isBlank) {
            return (
              <div
                key={word}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2.5"
                style={{ backgroundColor: AppColors.lightBlue }}
              >
                <Text variant="caption" className="text-neutral-500">
                  {index + 1}
                </Text>
                <Text variant="body-sm" weight="medium">
                  {word}
                </Text>
              </div>
            )
          }

          return (
            <div
              key={word}
              className="flex items-center gap-1.5 rounded-xl border-2 px-3 py-2.5"
              style={{ borderColor: AppColors.primaryGreen }}
            >
              <Text variant="caption" className="text-neutral-500">
                {index + 1}
              </Text>
              <input
                value={answers[index] ?? ""}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, [index]: event.target.value }))
                }
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <AppButton variant="primary" loading={verifying} onClick={handleVerify}>
          Verify
        </AppButton>
      </div>
    </Modal>

    <WalletReadyModal open={readyOpen} onOpenChange={setReadyOpen} />
    </>
  )
}

export { VerifyWalletModal }
