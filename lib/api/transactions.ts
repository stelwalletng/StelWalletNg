import { apiClient } from "@/lib/api/client"
import type {
  TransactionBuildRequest,
  TransactionBuildResponse,
  TransactionDetail,
  TransactionHistoryItem,
  TransactionSubmitRequest,
  TransactionSubmitResponse,
} from "@/lib/api/types"

async function getTransaction(txHash: string) {
  const { data } = await apiClient.get<TransactionDetail>(`/transactions/${txHash}/`)
  return data
}

async function getWalletTransactions(publicKey: string) {
  const { data } = await apiClient.get<TransactionHistoryItem[]>(`/wallets/${publicKey}/transactions/`)
  return data
}

async function buildTransaction(payload: TransactionBuildRequest) {
  const { data } = await apiClient.post<TransactionBuildResponse>("/transactions/build/", payload)
  return data
}

async function submitTransaction(payload: TransactionSubmitRequest) {
  const { data } = await apiClient.post<TransactionSubmitResponse>("/transactions/submit/", payload)
  return data
}

export { getTransaction, getWalletTransactions, buildTransaction, submitTransaction }
