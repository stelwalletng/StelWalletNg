"use client"

import * as React from "react"

interface WalletState {
  publicKey: string
  secretKey: string
}

interface WalletContextValue {
  wallet: WalletState | null
  isHydrated: boolean
  setWallet: (wallet: WalletState) => void
  clearWallet: () => void
}

const WalletContext = React.createContext<WalletContextValue | null>(null)
const STORAGE_KEY = "stelwallet.wallet"

function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWalletState] = React.useState<WalletState | null>(null)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setWalletState(JSON.parse(stored))
      } catch {
        // ignore corrupt storage
      }
    }
    setIsHydrated(true)
  }, [])

  const setWallet = React.useCallback((next: WalletState) => {
    setWalletState(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const clearWallet = React.useCallback(() => {
    setWalletState(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = React.useMemo(
    () => ({ wallet, isHydrated, setWallet, clearWallet }),
    [wallet, isHydrated, setWallet, clearWallet]
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

function useWalletContext() {
  const ctx = React.useContext(WalletContext)
  if (!ctx) throw new Error("useWalletContext must be used within a WalletProvider")
  return ctx
}

export { WalletProvider, useWalletContext }
export type { WalletState }
