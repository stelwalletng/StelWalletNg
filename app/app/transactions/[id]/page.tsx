"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowDownLeft, ArrowLeft, ArrowUpRight, ExternalLink, Loader2, Orbit } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Container } from "@/components/reuseables/container"
import { Text } from "@/components/reuseables/text"
import { Navbar } from "@/components/layout/app/navbar"
import { StatusBadge } from "@/components/layout/app/status-badge"
import { DetailRow } from "@/components/layout/app/detail-row"
import { AddressWithCopy } from "@/components/layout/app/address-with-copy"
import { StatusTimelineStep } from "@/components/layout/app/status-timeline-step"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useTransaction, useWalletTransactions } from "@/lib/hooks/use-transactions"
import { mapTransactionHistoryItem, normalizeStatus, truncateAddress } from "@/lib/wallet-utils"

export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>()
  const { wallet } = useWalletContext()
  const { data: detail, isLoading: isDetailLoading } = useTransaction(params.id)
  const { data: history } = useWalletTransactions(wallet?.publicKey)

  // the detail endpoint only returns status/fee/ledger - amount/asset/counterparty come from the history list
  const summary = history?.map(mapTransactionHistoryItem).find((item) => item.id === params.id)
  const isReceived = summary?.type === "received"
  const status = detail ? normalizeStatus(detail.status) : summary?.status ?? "processing"

  if (isDetailLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center" style={{ backgroundColor: AppColors.neutral }}>
        <Loader2 className="size-6 animate-spin text-neutral-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: AppColors.neutral }}>
      <Container className="py-5">
        <Navbar />

        <Link href="/app/dashboard" className="mt-3 flex w-fit items-center gap-2 text-neutral-500 hover:text-neutral-700">
          <ArrowLeft className="size-4" />
          <Text variant="body-sm">Back Home</Text>
        </Link>

        <Text as="h1" variant="h2" className="mt-4">
          Transaction details
        </Text>

        <div className="mt-6 grid grid-cols-1 gap-5 pb-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full"
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
                      {summary?.title ?? "Transaction"}
                    </Text>
                    <Text variant="caption" className="text-neutral-500">
                      {summary?.counterparty ?? truncateAddress(detail?.source_account ?? "")}
                    </Text>
                  </div>
                </div>

                <div className="text-right">
                  <Text variant="body-sm" weight="semibold" className={isReceived ? "text-emerald-600" : "text-red-500"}>
                    {summary?.amount ?? "—"}
                  </Text>
                  <Text variant="caption" className="text-neutral-500">
                    {summary?.amountUsd ?? ""}
                  </Text>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
                <Text variant="caption" className="text-neutral-400">
                  {detail?.created_at ?? summary?.date ?? ""}
                </Text>
                <StatusBadge status={status} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Text variant="body-sm" weight="semibold">
                Transaction Information
              </Text>

              <div className="mt-2 divide-y divide-neutral-100">
                <DetailRow
                  label="Transaction ID"
                  value={
                    <Text variant="body-sm" className="text-neutral-400">
                      {truncateAddress(params.id, 8)}
                    </Text>
                  }
                />
                <DetailRow
                  label="From (Your Wallet)"
                  value={<AddressWithCopy address={detail?.source_account ?? wallet?.publicKey ?? ""} />}
                />
                <DetailRow
                  label="Asset"
                  value={
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black">
                        <Orbit className="size-3 text-white" />
                      </span>
                      <Text variant="body-sm" weight="medium">
                        {summary?.assetSymbol ?? "XLM"} ({summary?.assetName ?? "Stellar Lumens"})
                      </Text>
                    </div>
                  }
                />
                <DetailRow
                  label="Amount"
                  value={
                    <Text variant="body-sm" weight="medium">
                      {summary?.amount ?? "—"}
                    </Text>
                  }
                />
                <DetailRow
                  label="Network fee"
                  value={
                    <Text variant="body-sm" weight="medium">
                      {detail?.fee_charged ?? "—"} XLM
                    </Text>
                  }
                />
                <DetailRow
                  label="Network"
                  value={
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black">
                        <Orbit className="size-3 text-white" />
                      </span>
                      <Text variant="body-sm" weight="medium">
                        Stellar
                      </Text>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Text variant="body-sm" weight="semibold">
                Transaction Status
              </Text>

              <div className="mt-4">
                <StatusTimelineStep title="Transaction submitted" timestamp={detail?.created_at ?? ""} />
                <StatusTimelineStep
                  title={detail?.successful ? "Transaction confirmed" : detail?.error ?? "Awaiting confirmation"}
                  timestamp={detail?.ledger ? `Ledger #${detail.ledger}` : ""}
                  isLast
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Text variant="body-sm" weight="semibold">
                Actions
              </Text>
              <a
                href={detail?.explorer_url ?? summary?.explorerUrl ?? "https://stellar.expert"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-fit items-center gap-1.5"
                style={{ color: AppColors.primaryGreen }}
              >
                <Text variant="body-sm" weight="medium" color={AppColors.primaryGreen}>
                  View on Stellar expert
                </Text>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

