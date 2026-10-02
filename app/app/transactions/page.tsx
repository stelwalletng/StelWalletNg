"use client"

import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Container } from "@/components/reuseables/container"
import { Text } from "@/components/reuseables/text"
import { TransactionFilters } from "@/components/layout/app/transaction-filters"
import { TransactionRow } from "@/components/layout/app/transaction-row"
import { TransactionPagination } from "@/components/layout/app/transaction-pagination"
import { Navbar } from "@/components/layout/app/navbar"
import { useWalletContext } from "@/lib/providers/wallet-provider"
import { useWalletTransactions } from "@/lib/hooks/use-transactions"
import { mapTransactionHistoryItem } from "@/lib/wallet-utils"

export default function TransactionHistoryPage() {
  const { wallet } = useWalletContext()
  const { data, isLoading } = useWalletTransactions(wallet?.publicKey)
  const transactions = (data ?? []).map(mapTransactionHistoryItem)

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: AppColors.neutral }}>
      <Container className="">
         <Navbar />
        <Link href="/app/dashboard" className="flex py-8 w-fit items-center gap-2 text-neutral-500 hover:text-neutral-700">
          <ArrowLeft className="size-4" />
          <Text variant="body-sm">Back Home</Text>
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <Text as="h1" variant="h2">
            Transaction History
          </Text>
          <Text variant="body-sm" className="mt-1 text-neutral-500">
            View and manage all your wallet activity
          </Text>

          <div className="mt-6">
            <TransactionFilters />
          </div>

          <div className="mt-6 grid grid-cols-[1.8fr_1.4fr_1.2fr_1fr_0.9fr] gap-4 border-b border-neutral-100 pb-3">
            {["Type", "Asset", "Amount", "Date", "Status"].map((heading) => (
              <Text key={heading} variant="caption" weight="medium" className="text-neutral-400 uppercase">
                {heading}
              </Text>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-neutral-400" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Text variant="body-sm" className="text-neutral-400">
                No transactions yet.
              </Text>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} {...transaction} />
              ))}
            </div>
          )}

          <div className="mt-6">
            <TransactionPagination shown={transactions.length} total={transactions.length} page={1} />
          </div>
        </div>
      </Container>
    </div>
  )
}

