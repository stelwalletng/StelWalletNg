import { ImageResponse } from "next/og"
import { AppColors } from "@/assets/app_colors"

export const alt = "StelWalletNG - Your money. Your wallet. Your control."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AppColors.darkGreen,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: AppColors.white }}>
          StelWalletNG
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            color: AppColors.lime,
            textAlign: "center",
          }}
        >
          Your money. Your wallet. Your control.
        </div>
      </div>
    ),
    { ...size }
  )
}
