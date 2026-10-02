"use client"

import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { ActivityRow } from "@/components/layout/app/activity-row"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWalletTransactions } from "@/lib/hooks/use-transactions"
import { mapTransactionHistoryItem } from "@/lib/wallet-utils"

function RecentActivityCard() {
  const { wallet } = useWalletContext()
  const { data, isLoading } = useWalletTransactions(wallet?.publicKey)
  const activity = (data ?? []).slice(0, 7).map(mapTransactionHistoryItem)

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Text variant="body-sm" weight="semibold">
          Recent activity
        </Text>
        <Link href="/app/transactions" className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700">
          <Text variant="caption">View all</Text>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-neutral-400" />
          </div>
        ) : activity.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <Text variant="body-sm" className="text-neutral-400">
              No activity yet.
            </Text>
          </div>
        ) : (
          activity.map((item) => (
            <ActivityRow
              key={item.id}
              id={item.id}
              type={item.type}
              title={item.title}
              counterparty={item.counterparty}
              amount={item.amount}
              date={item.date}
            />
          ))
        )}
      </div>
    </div>
  )
}

export { RecentActivityCard }

