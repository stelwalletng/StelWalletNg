import { apiClient } from "@/lib/api/client"
import type {
  WalletCreateRequest,
  WalletCreateResponse,
  WalletDetail,
  WalletFundRequest,
  WalletFundResponse,
  WalletImportRequest,
  WalletReceiveResponse,
} from "@/lib/api/types"

async function getWallet(publicKey: string) {
  const { data } = await apiClient.get<WalletDetail>(`/wallets/${publicKey}/`)
  return data
}

async function getWalletReceiveInfo(publicKey: string) {
  const { data } = await apiClient.get<WalletReceiveResponse>(`/wallets/${publicKey}/receive/`)
  return data
}

async function createWallet(payload: WalletCreateRequest = {}) {
  const { data } = await apiClient.post<WalletCreateResponse>("/wallets/create/", payload)
  return data
}

async function fundWallet(payload: WalletFundRequest) {
  const { data } = await apiClient.post<WalletFundResponse>("/wallets/fund/", payload)
  return data
}

async function importWallet(payload: WalletImportRequest) {
  const { data } = await apiClient.post<WalletDetail>("/wallets/import/", payload)
  return data
}

export { getWallet, getWalletReceiveInfo, createWallet, fundWallet, importWallet }
