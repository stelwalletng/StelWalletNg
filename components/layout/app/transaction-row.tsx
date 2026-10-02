import * as React from "react"
import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { StatusBadge, type TransactionStatus } from "@/components/layout/app/status-badge"
import { AssetIcon, type AssetSymbol } from "@/components/layout/app/asset-icon"

interface TransactionRowProps {
  id: string
  type: "received" | "sent"
  title: string
  counterparty: string
  assetSymbol: AssetSymbol
  assetName: string
  amount: string
  amountUsd: string
  date: string
  status: TransactionStatus
}

function TransactionRow({
  id,
  type,
  title,
  counterparty,
  assetSymbol,
  assetName,
  amount,
  amountUsd,
  date,
  status,
}: TransactionRowProps) {
  const isReceived = type === "received"

  return (
    <Link
      href={`/app/transactions/${id}`}
      className="grid grid-cols-[1.8fr_1.4fr_1.2fr_1fr_0.9fr] items-center gap-4 py-4 transition-colors hover:bg-neutral-50"
    >
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
          <Text variant="body-sm" weight="semibold">
            {title}
          </Text>
          <Text variant="caption" className="text-neutral-500">
            {counterparty}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AssetIcon symbol={assetSymbol} size="sm" />
        <div>
          <Text variant="body-sm" weight="semibold">
            {assetSymbol}
          </Text>
          <Text variant="caption" className="text-neutral-500">
            {assetName}
          </Text>
        </div>
      </div>

      <div>
        <Text variant="body-sm" weight="semibold" className={isReceived ? "text-emerald-600" : "text-red-500"}>
          {amount}
        </Text>
        <Text variant="caption" className="text-neutral-500">
          {amountUsd}
        </Text>
      </div>

      <Text variant="body-sm" className="text-neutral-500">
        {date}
      </Text>

      <div>
        <StatusBadge status={status} />
      </div>
    </Link>
  )
}

export { TransactionRow }
