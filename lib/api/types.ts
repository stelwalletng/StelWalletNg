// Types mirror the StelWalletNG OpenAPI schema at https://api.stelwallet.com/api/docs

export interface SupportedAsset {
  asset_code: string
  asset_type: string
  asset_issuer: string | null
  name: string
}

export interface BalanceItem {
  asset_code: string
  asset_type: string
  asset_issuer: string | null
  balance: string
}

export interface WalletDetail {
  public_key: string
  is_active: boolean
  sequence: number | null
  subentry_count: number
  balances: BalanceItem[]
  derived_secret_key: string | null
}

export interface WalletCreateRequest {
  fund?: boolean
}

export interface WalletCreateResponse {
  public_key: string
  secret_key: string
  passphrase: string | null
  funded: boolean
  message: string
}

export interface WalletFundRequest {
  public_key: string
}

export interface WalletFundResponse {
  success: boolean
  message: string
  public_key: string
}

export interface WalletImportRequest {
  key: string
  passphrase?: string
}

export interface WalletReceiveResponse {
  public_key: string
  qr_code: string
}

export interface TransactionHistoryItem {
  hash: string
  type: string
  asset: string
  amount: string
  counterparty: string
  created_at: string
  status: string
  explorer_url: string
}

export interface TransactionDetail {
  hash: string
  status: string
  ledger: number | null
  created_at: string
  source_account: string
  fee_charged: string
  memo: string | null
  explorer_url: string
  successful: boolean
  error: string | null
}

export interface TransactionReview {
  asset: string
  amount: string
  recipient: string
  fee: string
  memo: string | null
}

export interface TransactionBuildRequest {
  source_account: string
  destination: string
  amount: string
  asset_code?: string
  asset_issuer?: string | null
  memo?: string | null
}

export interface TransactionBuildResponse {
  xdr: string
  network_passphrase: string
  fee_stroops: number
  source_account: string
  destination: string
  amount: string
  asset_code: string
  asset_issuer: string | null
  memo: string | null
  review_summary: TransactionReview
}

export interface TransactionSubmitRequest {
  signed_xdr: string
}

export interface TransactionSubmitResponse {
  status: string
  hash: string | null
  ledger: number | null
  created_at: string | null
  explorer_url: string | null
  error: string | null
}
