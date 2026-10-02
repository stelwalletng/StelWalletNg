"use client"

import * as React from "react"
import Image from "next/image"
import { CheckCheck, Loader2 } from "lucide-react"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { NotificationRow } from "@/components/layout/app/notification-row"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWalletTransactions } from "@/lib/hooks/use-transactions"
import { mapTransactionHistoryItem } from "@/lib/wallet-utils"

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const { wallet } = useWalletContext()
  const { data, isLoading } = useWalletTransactions(wallet?.publicKey)
  const [readIds, setReadIds] = React.useState<Set<string>>(new Set())

  const notifications = (data ?? []).slice(0, 10).map(mapTransactionHistoryItem)
  const hasUnread = notifications.some((item) => !readIds.has(item.id))
  const groups = Array.from(new Set(notifications.map((item) => item.dayGroup)))

  return (
    <Modal open={open} onOpenChange={onOpenChange} closePosition="top-right" className="max-w-[380px]">
      <div className="flex items-center justify-between">
        <Text as="h2" variant="h4">
          Notifications
        </Text>
        <button
          type="button"
          disabled={!hasUnread}
          onClick={() => setReadIds(new Set(notifications.map((item) => item.id)))}
          className="flex items-center gap-1 disabled:opacity-40"
        >
          <CheckCheck className="size-3.5" style={hasUnread ? { color: "#16A34A" } : undefined} />
          <Text variant="caption" weight="medium" className={hasUnread ? "" : "text-neutral-400"} color={hasUnread ? "#16A34A" : undefined}>
            Mark all read
          </Text>
        </button>
      </div>

      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="size-6 animate-spin text-neutral-400" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-neutral-100">
            <Image src={AppImages.notificationBell} alt="" width={28} height={28} />
          </span>
          <div>
            <Text variant="body-sm" weight="semibold">
              No notification yet
            </Text>
            <Text variant="caption" className="mt-1 text-neutral-500">
              Your transactions will appear here.
            </Text>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group}>
              <Text variant="caption" className="text-neutral-400">
                {group}
              </Text>
              <div className="mt-3 flex flex-col gap-4">
                {notifications
                  .filter((item) => item.dayGroup === group)
                  .map((item) => (
                    <NotificationRow
                      key={item.id}
                      unread={!readIds.has(item.id)}
                      type={item.type}
                      counterparty={item.counterparty}
                      amount={item.amount.replace(/^[+-]/, "")}
                      time={item.date}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}


export { NotificationsModal }
