import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { buildTransaction, getTransaction, getWalletTransactions, submitTransaction } from "@/lib/api/transactions"
import type { TransactionBuildRequest, TransactionSubmitRequest } from "@/lib/api/types"

function useTransaction(txHash: string | undefined) {
  return useQuery({
    queryKey: ["transaction", txHash],
    queryFn: () => getTransaction(txHash as string),
    enabled: Boolean(txHash),
  })
}

function useWalletTransactions(publicKey: string | undefined) {
  return useQuery({
    queryKey: ["wallet", publicKey, "transactions"],
    queryFn: () => getWalletTransactions(publicKey as string),
    enabled: Boolean(publicKey),
  })
}

function useBuildTransaction() {
  return useMutation({
    mutationFn: (payload: TransactionBuildRequest) => buildTransaction(payload),
  })
}

function useSubmitTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TransactionSubmitRequest) => submitTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] })
    },
  })
}

export { useTransaction, useWalletTransactions, useBuildTransaction, useSubmitTransaction }
