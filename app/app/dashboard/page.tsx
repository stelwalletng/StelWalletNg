import { AppColors } from "@/assets/app_colors"
import { Container } from "@/components/reuseables/container"
import { Navbar } from "@/components/layout/app/navbar"
import { TotalBalanceCard } from "@/components/layout/app/total-balance-card"
import { WalletActions } from "@/components/layout/app/wallet-actions"
import { AssetsCard } from "@/components/layout/app/assets-card"
import { QrCodeCard } from "@/components/layout/app/qr-code-card"
import { RecentActivityCard } from "@/components/layout/app/recent-activity-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: AppColors.neutral }}>
      <Container>
        <Navbar />

        <div className="grid grid-cols-1 gap-5 pb-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex flex-1 flex-col gap-5">
                <TotalBalanceCard />
                <WalletActions />
              </div>
              <div className="w-full sm:w-[260px] sm:shrink-0">
                <QrCodeCard />
              </div>
            </div>
            <AssetsCard />
          </div>

          <RecentActivityCard />
        </div>
      </Container>
    </div>
  )
}
