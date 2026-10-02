"use client"

import * as React from "react"
import Image from "next/image"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { Container } from "@/components/reuseables/container"
import { ConnectWalletModal } from "@/components/layout/landing/connect-wallet-modal"

function Hero() {
  const [connectOpen, setConnectOpen] = React.useState(false)

  return (
    <section
      className="relative w-full pt-8 pb-14 sm:pb-20"
      style={{ backgroundColor: AppColors.darkGreen }}
    >
      <Container as="nav" className="flex items-center justify-between">
        <Image
          src={AppImages.stelLandingLogo}
          alt="StelWallet"
          width={150}
          height={32}
          className="h-7 w-auto"
          priority
        />
        <AppButton variant="secondary" size="sm">
          Connect Wallet
        </AppButton>
      </Container>

      <Container className="mt-16 flex justify-center">
        <div className="flex max-w-2xl flex-col items-center text-center">
          <Text variant="caption" weight="semibold" className="tracking-[0.2em] text-white/50 uppercase">
            Money made to move
          </Text>

          <Text as="h1" variant="h1" className="mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">
            Your money. Your wallet.
            <br />
            <span className="font-serif italic" style={{ color: AppColors.lime }}>
              Your control.
            </span>
          </Text>

          <Text variant="body" className="mt-6 max-w-md text-white/70">
            A simple, self-custodial wallet for sending, receiving, and managing
            assets on the Stellar network.
          </Text>

          <AppButton variant="primary" className="mt-8" onClick={() => setConnectOpen(true)}>
            Get Started
          </AppButton>
        </div>
      </Container>

      {/* negative bottom margin pulls the row up so it pokes past the section's bottom edge */}
      <Container className="relative z-10 mt-14 -mb-28 sm:-mb-36">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="relative h-56 overflow-hidden sm:h-72">
            <Image
              src={AppImages.stelGirlPhone}
              alt="Woman checking her StelWallet on her phone"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-56 overflow-hidden sm:h-72">
            <Image
              src={AppImages.stelBoyGirl}
              alt="Couple using StelWallet together"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Container>

      <ConnectWalletModal open={connectOpen} onOpenChange={setConnectOpen} />
    </section>
  )
}

export { Hero }
