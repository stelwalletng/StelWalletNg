import type { BalanceItem, TransactionHistoryItem } from "@/lib/api/types"
import type { AssetSymbol } from "@/components/layout/app/asset-icon"
import type { TransactionStatus } from "@/components/layout/app/status-badge"

// illustrative conversion rates until a live pricing endpoint is available
const assetUsdRates: Record<AssetSymbol, number> = { XLM: 0.1975, USDC: 1, EURC: 1.08 }
const assetNames: Record<AssetSymbol, string> = { XLM: "Stellar Lumens", USDC: "USD Coin", EURC: "Euro Coin" }

function truncateAddress(address: string, size = 4) {
  if (address.length <= size * 2 + 3) return address
  return `${address.slice(0, size)}...${address.slice(-size + 1)}`
}

function getAssetBalance(balances: BalanceItem[] | undefined, symbol: AssetSymbol) {
  const match = balances?.find((item) => item.asset_code === symbol)
  return match ? Number(match.balance) : 0
}

function normalizeDirection(type: string): "received" | "sent" {
  return type.toLowerCase().includes("rece") ? "received" : "sent"
}

function normalizeStatus(status: string): TransactionStatus {
  const value = status.toLowerCase()
  if (value.includes("fail")) return "failed"
  if (value.includes("success") || value.includes("complet")) return "successful"
  return "processing"
}

function formatTxDate(isoString: string) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return isoString
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

function getDayGroupLabel(isoString: string) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return "Earlier"

  const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()
  const diffDays = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86_400_000)

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

interface MappedTransaction {
  id: string
  type: "received" | "sent"
  title: string
  counterparty: string
  assetSymbol: AssetSymbol
  assetName: string
  amount: string
  amountUsd: string
  date: string
  dayGroup: string
  status: TransactionStatus
  explorerUrl: string
}

function mapTransactionHistoryItem(item: TransactionHistoryItem): MappedTransaction {
  const direction = normalizeDirection(item.type)
  const assetSymbol = ((["XLM", "USDC", "EURC"] as const).includes(item.asset as AssetSymbol)
    ? item.asset
    : "XLM") as AssetSymbol
  const sign = direction === "received" ? "+" : "-"

  return {
    id: item.hash,
    type: direction,
    title: `${direction === "received" ? "Received" : "Sent"} ${assetSymbol}`,
    counterparty: `${direction === "received" ? "From" : "To"} ${truncateAddress(item.counterparty)}`,
    assetSymbol,
    assetName: assetNames[assetSymbol],
    amount: `${sign}${Number(item.amount).toFixed(2)} ${assetSymbol}`,
    amountUsd: `≈ $${(Number(item.amount) * assetUsdRates[assetSymbol]).toFixed(2)}`,
    date: formatTxDate(item.created_at),
    dayGroup: getDayGroupLabel(item.created_at),
    status: normalizeStatus(item.status),
    explorerUrl: item.explorer_url,
  }
}

export {
  assetUsdRates,
  truncateAddress,
  getAssetBalance,
  mapTransactionHistoryItem,
  normalizeStatus,
  formatTxDate,
  getDayGroupLabel,
}

