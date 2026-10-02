"use client"

import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"
import { FilterModal } from "@/components/layout/app/filter-modal"

const tabs = ["All", "Sent", "Received", "Failed"] as const

function TransactionFilters() {
  const [active, setActive] = React.useState<(typeof tabs)[number]>("All")
  const [filterOpen, setFilterOpen] = React.useState(false)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = tab === active
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className="rounded-full px-4 py-1.5 transition-colors"
              style={{ backgroundColor: isActive ? AppColors.lime : "transparent" }}
            >
              <Text
                variant="body-sm"
                weight={isActive ? "semibold" : "medium"}
                className={isActive ? "" : "text-neutral-500"}
              >
                {tab}
              </Text>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2.5">
          <Search className="size-4 text-neutral-400" />
          <input
            placeholder="Search by address or transaction ID"
            className="w-64 bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>
        <button
          type="button"
          aria-label="Filter"
          onClick={() => setFilterOpen(true)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100"
        >
          <SlidersHorizontal className="size-4 text-neutral-600" />
        </button>
      </div>

      <FilterModal open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  )
}

export { TransactionFilters }
