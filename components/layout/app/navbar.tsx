"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"
import { NotificationsModal } from "@/components/layout/app/notifications-modal"
import { SettingsModal } from "@/components/layout/app/settings-modal"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWallet } from "@/lib/hooks/use-wallet"
import { getAssetBalance, truncateAddress } from "@/lib/wallet-utils"

function Navbar() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const { wallet } = useWalletContext()
  const { data } = useWallet(wallet?.publicKey)
  const xlmBalance = getAssetBalance(data?.balances, "XLM")

  return (
    <header className="flex items-center justify-between gap-3 py-5">
      <Image src={AppImages.stelwalletLogo} alt="StelWallet" width={130} height={28} className="h-6 w-auto shrink-0 sm:h-7" priority />

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-sm sm:px-2.5"
        >
          <span
            className="size-7 shrink-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" }}
          />
          <div className="text-left">
            <Text variant="caption" weight="bold" className="leading-none">
              {xlmBalance.toFixed(2)} XLM
            </Text>
            <Text variant="caption" className="hidden leading-none text-neutral-500 sm:block">
              {wallet ? truncateAddress(wallet.publicKey) : "No wallet"}
            </Text>
          </div>
          <ChevronDown className="hidden size-4 text-neutral-500 sm:block" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          onClick={() => setNotificationsOpen(true)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:size-10"
        >
          <Image src={AppImages.notificationBell} alt="" width={18} height={18} />
        </button>

        <button
          type="button"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:size-10"
        >
          <Image src={AppImages.setting} alt="" width={18} height={18} />
        </button>
      </div>

      <NotificationsModal open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  )
}

export { Navbar }

