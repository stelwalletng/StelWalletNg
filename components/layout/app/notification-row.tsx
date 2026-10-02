import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"

interface NotificationRowProps {
  unread: boolean
  type: "received" | "sent"
  counterparty: string
  amount: string
  time: string
}

function NotificationRow({ unread, type, counterparty, amount, time }: NotificationRowProps) {
  const isReceived = type === "received"

  return (
    <div className="flex items-center gap-2.5">
      <span
        className="size-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: unread ? AppColors.primaryGreen : "transparent" }}
      />

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: isReceived ? "#DCFCE7" : "#FEE2E2" }}
          >
            {isReceived ? (
              <ArrowDownLeft className="size-4 text-emerald-600" />
            ) : (
              <ArrowUpRight className="size-4 text-red-500" />
            )}
          </span>
          <div>
            <Text variant="body-sm">
              {isReceived ? "Received " : "Sent "}
              <Text as="span" variant="body-sm" weight="semibold" className={isReceived ? "text-emerald-600" : "text-red-500"}>
                {amount}
              </Text>
            </Text>
            <Text variant="caption" className="text-neutral-500">
              {counterparty}
            </Text>
          </div>
        </div>

        <Text variant="caption" className="shrink-0 text-neutral-400">
          {time}
        </Text>
      </div>
    </div>
  )
}

export { NotificationRow }
