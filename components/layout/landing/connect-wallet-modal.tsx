"use client"

import * as React from "react"
import Image from "next/image"
import { Tooltip } from "@base-ui/react/tooltip"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Modal } from "@/components/reuseables/modal"
import { Text } from "@/components/reuseables/text"
import { SecureWalletModal } from "@/components/layout/landing/secure-wallet-modal"
import { ImportWalletModal } from "@/components/layout/landing/import-wallet-modal"
import { useCreateWallet } from "@/lib/hooks/use-wallet"
import { useWalletContext } from "@/lib/providers/wallet-provider"

interface ConnectWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type OptionKey = "create" | "import"

const options = [
  {
    key: "create" as const,
    selectedIcon: AppImages.walletSelected,
    unselectedIcon: AppImages.walletUnselected,
    title: "Create Wallet",
    description: "New to StelWallet? Create a wallet and get started.",
  },
  {
    key: "import" as const,
    selectedIcon: AppImages.walletClosedSelected,
    unselectedIcon: AppImages.walletClosedUnselected,
    title: "Import Wallet",
    description: "Already have a Stellar wallet? Import it to continue.",
  },
] satisfies { key: OptionKey; selectedIcon: string; unselectedIcon: string; title: string; description: string }[]

function ConnectWalletModal({ open, onOpenChange }: ConnectWalletModalProps) {
  const [selected, setSelected] = React.useState<OptionKey | null>(null)
  const [secureOpen, setSecureOpen] = React.useState(false)
  const [importOpen, setImportOpen] = React.useState(false)
  const { setWallet } = useWalletContext()
  const createWallet = useCreateWallet()

  async function handleSelect(key: OptionKey) {
    setSelected(key)

    if (key === "import") {
      onOpenChange(false)
      setImportOpen(true)
      return
    }

    try {
      const result = await createWallet.mutateAsync({ fund: true })
      setWallet({ publicKey: result.public_key, secretKey: result.secret_key })
      onOpenChange(false)
      setSecureOpen(true)
    } catch {
      // error surfaced below via createWallet.isError
    }
  }

  return (
    <>
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-[800px] sm:h-[400px]"
      footer={
        <Tooltip.Provider>
          <Tooltip.Root>
            <div className="flex items-center justify-center gap-2">
              <Text variant="body-sm" className="text-neutral-600">
                StelWallet is currently available on the Stellar network
              </Text>
              <Tooltip.Trigger className="flex size-4 items-center justify-center">
                <Image src={AppImages.circledQuestion} alt="More info" width={16} height={16} />
              </Tooltip.Trigger>
            </div>
            <Tooltip.Portal>
              <Tooltip.Positioner side="top" sideOffset={10}>
                <Tooltip.Popup className="max-w-[260px] rounded-xl bg-white p-3 text-xs leading-relaxed text-neutral-600 shadow-lg">
                  StelWallet currently supports the Stellar network only. Make
                  sure you&apos;re using a Stellar wallet address and supported
                  Stellar assets.
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      }
    >
     <div className="w-full flex flex-col h-full items-center justify-center">
         <div className="text-center">
        <Text as="h2" variant="h3" className="text-[22px] sm:text-[28px] font-bold">
          Get started with StelWallet
        </Text>
        <Text variant="body-sm" className="mt-2 text-neutral-500 text-[18px] max-w-[400px]">
          Create a new wallet or import an existing Stellar wallet.
        </Text>
      </div>

      {createWallet.isError ? (
        <Text variant="caption" className="mt-3 text-red-500">
          Couldn&apos;t create a wallet right now. Please try again.
        </Text>
      ) : null}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-neutral-200">
        {options.map(({ key, selectedIcon, unselectedIcon, title, description }) => {
          const isSelected = selected === key
          const isLoading = createWallet.isPending && key === "create"
          return (
            <button
              key={key}
              type="button"
              disabled={createWallet.isPending}
              onClick={() => handleSelect(key)}
              className="flex items-center gap-2 px-4 text-center min-h-[99px] rounded-[24px] transition-colors disabled:opacity-60"
              style={{ backgroundColor: isSelected ? AppColors.lime : "transparent" }}
            >
              <span
                className="flex h-[67px] w-[67px] items-center justify-center rounded-xl transition-colors"
                style={{ backgroundColor: isSelected ? AppColors.black : AppColors.lightBlue }}
              >
                <Image
                  src={isSelected ? selectedIcon : unselectedIcon}
                  alt={title}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <div className="text-left">
                <Text variant="body-sm" weight="semibold" className="text-[18px]">
                  {isLoading ? "Creating wallet..." : title}
                </Text>
                <Text variant="caption" className="text-neutral-500">
                  {description}
                </Text>
              </div>
            </button>
          )
        })}
      </div>
     </div>
    </Modal>

    <SecureWalletModal
      open={secureOpen}
      onOpenChange={setSecureOpen}
      secretKey={createWallet.data?.secret_key ?? ""}
      passphrase={createWallet.data?.passphrase ?? ""}
      message={createWallet.data?.message}
    />
    <ImportWalletModal open={importOpen} onOpenChange={setImportOpen} />
    </>
  )
}

export { ConnectWalletModal }
