"use client"

import Image from "next/image"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"

function AddressWithCopy({ address }: { address: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-5 shrink-0 rounded-full"
        style={{ background: "linear-gradient(135deg, #2DD4BF 0%, #7C3AED 100%)" }}
      />
      <Text variant="body-sm" weight="medium">
        {address}
      </Text>
      <button type="button" aria-label="Copy address" onClick={() => navigator.clipboard?.writeText(address)}>
        <Image src={AppImages.copy} alt="" width={14} height={14} className="size-3.5 opacity-60" />
      </button>
    </div>
  )
}

export { AddressWithCopy }
