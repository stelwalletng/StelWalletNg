"use client"

import * as React from "react"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { AppButton } from "@/components/reuseables/button"
import { Checkbox } from "@/components/reuseables/checkbox"

interface FilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply?: (filters: { status: string[]; assets: string[] }) => void
}

const statusOptions = ["Successful", "Processing", "Failed"]
const assetOptions = ["XLM", "USDC", "EURC"]

function FilterModal({ open, onOpenChange, onApply }: FilterModalProps) {
  const [status, setStatus] = React.useState<string[]>([])
  const [assets, setAssets] = React.useState<string[]>([])

  function toggle(list: string[], setList: (next: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  function handleClear() {
    setStatus([])
    setAssets([])
  }

  function handleApply() {
    onApply?.({ status, assets })
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange} closePosition="top-right" className="max-w-[340px]">
      <Text as="h2" variant="h4">
        Filter
      </Text>

      <div className="mt-5">
        <Text variant="caption" weight="semibold" className="tracking-wide text-neutral-400 uppercase">
          Status
        </Text>
        <div className="mt-3 flex flex-col gap-3">
          {statusOptions.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={status.includes(option)}
              onCheckedChange={() => toggle(status, setStatus, option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Text variant="caption" weight="semibold" className="tracking-wide text-neutral-400 uppercase">
          Assets
        </Text>
        <div className="mt-3 flex flex-col gap-3">
          {assetOptions.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={assets.includes(option)}
              onCheckedChange={() => toggle(assets, setAssets, option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <AppButton variant="outline" className="flex-1" onClick={handleClear}>
          Clear filter
        </AppButton>
        <AppButton variant="primary" className="flex-1" onClick={handleApply}>
          Apply filter
        </AppButton>
      </div>
    </Modal>
  )
}

export { FilterModal }
