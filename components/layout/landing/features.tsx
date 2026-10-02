import Image from "next/image"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"
import { Container } from "@/components/reuseables/container"

const features = [
  {
    image: AppImages.stelWallet,
    title: "Receive with ease",
    description: "Share your wallet address or QR code and receive assets directly into your wallet.",
    highlighted: false,
  },
  {
    image: AppImages.stelMoneyHand,
    title: "Send with confidence",
    description: "Send Stellar assets to another wallet with a simple, straightforward flow.",
    highlighted: true,
  },
  {
    image: AppImages.stelOpenSafe,
    title: "Stay in control",
    description: "Your wallet belongs to you. Your recovery phrase gives you access to your funds.",
    highlighted: false,
  },
] as const

function Features() {
  return (
    <section className="w-full py-20 lg:mt-20">
      <Container>
        <Text as="h2" variant="h2" className="text-[32px] sm:text-[40px] lg:text-[48px] font-[500]">
          Blockchain without the complexity.
        </Text>
        <Text variant="body" className="mt-3 max-w-lg text-neutral-500">
          StelWallet makes managing your digital assets simple, so you can focus
          on what matters — sending, receiving, and spending your money.
        </Text>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col lg:h-[434px] lg:w-[400px] items-center rounded-3xl px-6 py-10 text-center"
              style={{ backgroundColor: feature.highlighted ? AppColors.lime : AppColors.neutral }}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={312}
                height={208}
                className="h-auto w-full max-w-[220px] object-contain sm:max-w-[312px]"
              />
              <Text as="h3" variant="h4" className="mt-6 text-[28px]">
                {feature.title}
              </Text>
              <Text variant="body-sm" className="mt-2 text-neutral-600 text-[18px]">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Features }
