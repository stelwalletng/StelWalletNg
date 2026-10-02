"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, DollarSign, Globe, Shield, X } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { RecoveryPhraseGrid } from "@/components/reuseables/recovery-phrase-grid"
import { SettingsRow } from "@/components/layout/app/settings-row"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "main" | "currency" | "recovery"

const currencies = [
  { code: "USD", label: "USD (US Dollar)", flag: "🇺🇸" },
  { code: "NGN", label: "NGN (Naira)", flag: "🇳🇬" },
]

// placeholder recovery phrase for layout purposes, mirrors SecureWalletModal
const recoveryWords = [
  "Spoon", "Colon", "Shame", "Collect",
  "Object", "Revolve", "Sprung", "Protect",
  "Intervene", "Obsolete", "Kettle", "Gate",
]

function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [step, setStep] = React.useState<Step>("main")
  const [currency, setCurrency] = React.useState("USD")

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
    if (!next) {
      // reset to the main view for the next time this modal opens
      setTimeout(() => setStep("main"), 200)
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      showClose={false}
      className={step === "recovery" ? "max-w-[480px]" : "max-w-[380px]"}
      footer={
        step === "recovery" ? (
          <div className="flex items-center justify-center gap-2">
            <Text variant="body-sm" className="text-neutral-600">
              StelWallet do not store your recovery phrase. Keep it safe.
            </Text>
            <Image src={AppImages.circledQuestion} alt="More info" width={16} height={16} />
          </div>
        ) : undefined
      }
    >
      <div className="flex items-center justify-between">
        {step !== "main" ? (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => setStep("main")}
            className="flex size-9 items-center justify-center rounded-full bg-black text-white"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <span />
        )}

        <Text as="h2" variant="h4">
          {step === "main" && "Settings"}
          {step === "currency" && "Select Currency"}
          {step === "recovery" && "Recovery Phrase"}
        </Text>

        <button
          type="button"
          aria-label="Close"
          onClick={() => handleOpenChange(false)}
          className="flex size-9 items-center justify-center rounded-full"
        >
          <X className="size-5" />
        </button>
      </div>

      {step === "main" ? (
        <div className="mt-4">
          <Text variant="caption" weight="semibold" className="tracking-wide text-neutral-400 uppercase">
            Preference
          </Text>
          <div className="mt-1">
            <SettingsRow
              icon={
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.primaryGreen }}>
                  <DollarSign className="size-4 text-white" />
                </span>
              }
              title="Display currency"
              subtitle="Currency on wallet"
              value={currencies.find((c) => c.code === currency)?.label}
              onClick={() => setStep("currency")}
            />
            <SettingsRow
              icon={
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.primaryGreen }}>
                  <Globe className="size-4 text-white" />
                </span>
              }
              title="Language"
              subtitle="Display language"
              value="ENG"
            />
          </div>

          <Text variant="caption" weight="semibold" className="mt-3 tracking-wide text-neutral-400 uppercase">
            Security
          </Text>
          <div className="mt-1">
            <SettingsRow
              icon={
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.primaryGreen }}>
                  <Shield className="size-4 text-white" />
                </span>
              }
              title="Recovery phrase"
              subtitle="Reveal recovery phrase"
              onClick={() => setStep("recovery")}
            />
          </div>
        </div>
      ) : null}

      {step === "currency" ? (
        <div className="mt-4">
          <Text variant="body-sm" className="text-neutral-500">
            Choose the currency used to display prices and balance across the app.
          </Text>

          <div className="mt-4 flex flex-col gap-2">
            {currencies.map((item) => {
              const isSelected = item.code === currency
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setCurrency(item.code)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                  style={{ backgroundColor: isSelected ? AppColors.lightBlue : "transparent" }}
                >
                  <span className="text-lg">{item.flag}</span>
                  <Text variant="body-sm" weight={isSelected ? "semibold" : "medium"}>
                    {item.label}
                  </Text>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {step === "recovery" ? (
        <div className="mt-6">
          <div className="text-center">
            <Text variant="body-sm" className="mx-auto max-w-sm text-neutral-500">
              Write down your recovery phrase and keep it somewhere safe. You&apos;ll
              need it to restore your wallet if you lose access.
            </Text>
          </div>

          <div className="mt-6">
            <RecoveryPhraseGrid words={recoveryWords} />
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export { SettingsModal }
