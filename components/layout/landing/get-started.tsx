import Image from "next/image"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"
import { Container } from "@/components/reuseables/container"

const steps = [
  {
    title: "Connect Wallet",
    description: "Create a new wallet or import your stellar wallet",
  },
  {
    title: "Fund Wallet",
    description: "Add money to your wallet and keep your balance ready.",
  },
  {
    title: "Spend Your Money",
    description: "Send and use your assets whenever you need them.",
  },
] as const

function GetStarted() {
  return (
    <section className="w-full py-10">
      <Container>
        <div
          className="relative grid grid-cols-1 gap-10 rounded-[2.5rem] p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:h-[616px] lg:max-h-[616px]"
          style={{ backgroundColor: AppColors.neutral }}
        >
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <Text as="h2" variant="h2" className="text-center text-[32px] sm:text-[40px] font-[500]">
              Get <span className="font-serif italic">Started</span> with Ease
            </Text>

            {/* negative bottom margin so the last card pokes past the card's rounded edge, desktop only */}
            <div className="mt-6 flex flex-col gap-3 lg:-mb-52">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl px-6 py-5 text-center min-h-[134px] flex flex-col items-center justify-center"
                  style={{ backgroundColor: AppColors.lime }}
                >
                  <Text as="h3" variant="h4" className="text-[24px]">
                    {step.title}
                  </Text>
                  <Text variant="body-sm" className="mt-1 text-neutral-700 text-[18px]">
                    {step.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* image sits above the content on mobile, to the right of it from lg up */}
          <div className="relative order-1 h-64 overflow-hidden rounded-[2rem] lg:order-2 lg:h-auto lg:min-h-full">
            <Image
              src={AppImages.stelGirlBag}
              alt="Woman spending her money with StelWallet"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export { GetStarted }
