import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createWallet, fundWallet, getWallet, getWalletReceiveInfo, importWallet } from "@/lib/api/wallets"
import type { WalletCreateRequest, WalletFundRequest, WalletImportRequest } from "@/lib/api/types"

function useWallet(publicKey: string | undefined) {
  return useQuery({
    queryKey: ["wallet", publicKey],
    queryFn: () => getWallet(publicKey as string),
    enabled: Boolean(publicKey),
  })
}

function useWalletReceiveInfo(publicKey: string | undefined) {
  return useQuery({
    queryKey: ["wallet", publicKey, "receive"],
    queryFn: () => getWalletReceiveInfo(publicKey as string),
    enabled: Boolean(publicKey),
  })
}

function useCreateWallet() {
  return useMutation({
    mutationFn: (payload: WalletCreateRequest = {}) => createWallet(payload),
  })
}

function useImportWallet() {
  return useMutation({
    mutationFn: (payload: WalletImportRequest) => importWallet(payload),
  })
}

function useFundWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: WalletFundRequest) => fundWallet(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["wallet", variables.public_key] })
    },
  })
}

export { useWallet, useWalletReceiveInfo, useCreateWallet, useImportWallet, useFundWallet }
