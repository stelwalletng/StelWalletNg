import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { AppImages } from "@/assets/app_images"
import { Text } from "@/components/reuseables/text"
import { Container } from "@/components/reuseables/container"

const socials = [
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const

const legalLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookies", href: "#" },
] as const

function Footer() {
  return (
    <footer className="w-full pt-14 lg:mt-40">
   
        <div
          className="relative  rounded-t-[3.5rem]"
          style={{ backgroundColor: AppColors.weirdBlack }}
        >
          {/* logo mark sits halfway outside the card's top edge */}
          <Image
            src={AppImages.stelIconGreen}
            alt="StelWallet"
            width={178}
            height={187}
            className="absolute left-1/2 top-0 h-14 w-auto -translate-x-1/2 -translate-y-1/2 sm:h-20"
          />

          <div className="grid grid-cols-1 gap-10 px-8 pt-20 pb-12 sm:px-12 lg:grid-cols-3">
            <div className="order-2 flex flex-col gap-3 lg:order-1">
              <Text variant="body-sm" className="text-white/40">
                Contact us
              </Text>
              <Text variant="body-sm" className="text-white/70">
                12 Admiralty Way, Lekki Phase 1,
                <br />
                Lagos, Nigeria
              </Text>
              <a href="mailto:hello@stelwallet.com" className="w-fit text-sm text-white underline underline-offset-2">
                hello@stelwallet.com
              </a>
              <Text variant="body-sm" className="text-white/70">
                +234 801 234 5678
              </Text>
            </div>

            <Text as="h2" variant="h2" className="order-1 text-center text-3xl text-white sm:text-4xl lg:order-2 lg:text-[70px]">
              Money <span className="font-serif italic" style={{ color: AppColors.lime }}>controlled</span>
              <br />
              by <span className="font-serif italic">you</span>
            </Text>

            <div className="order-3 flex flex-col items-start gap-3 lg:items-end">
              <Text variant="body-sm" className="text-white/40">
                Socials
              </Text>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
                >
                  {social.label}
                  <ArrowUpRight className="size-3.5" style={{ color: AppColors.lime }} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-between gap-3 px-8 py-4 sm:flex-row sm:px-12"
            style={{ backgroundColor: AppColors.lime }}
          >
            <Text variant="body-sm" weight="medium" className="text-neutral-900">
              © StelWallet 2026
            </Text>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-neutral-900 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
  
    </footer>
  )
}

export { Footer }
