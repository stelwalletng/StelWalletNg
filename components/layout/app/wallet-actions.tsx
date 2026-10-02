"use client"

import * as React from "react"
import Image from "next/image"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"
import { SendAssetModal } from "@/components/layout/app/send-asset-modal"
import { ReceiveAssetModal } from "@/components/layout/app/receive-asset-modal"

const actions = [
  { label: "Receive", icon: AppImages.receive },
  { label: "Send", icon: AppImages.send },
] as const

function WalletActions() {
  const [sendOpen, setSendOpen] = React.useState(false)
  const [receiveOpen, setReceiveOpen] = React.useState(false)

  return (
    <div className="grid grid-cols-2 gap-5">
      {actions.map(({ label, icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => {
            if (label === "Send") setSendOpen(true)
            if (label === "Receive") setReceiveOpen(true)
          }}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white py-4 shadow-sm transition-colors hover:bg-neutral-50"
        >
          <Image src={icon} alt="" width={20} height={20} className="size-5" />
          <Text variant="body-sm" weight="medium">
            {label}
          </Text>
        </button>
      ))}

      <SendAssetModal open={sendOpen} onOpenChange={setSendOpen} />
      <ReceiveAssetModal open={receiveOpen} onOpenChange={setReceiveOpen} />
    </div>
  )
}

export { WalletActions }


