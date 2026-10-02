import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"

type TransactionStatus = "successful" | "failed" | "processing"

const statusStyles: Record<TransactionStatus, { bg: string; color: string; label: string }> = {
  successful: { bg: "#DCFCE7", color: "#059669", label: "Successful" },
  failed: { bg: "#FEE2E2", color: "#EF4444", label: "Failed" },
  processing: { bg: AppColors.lightOrange, color: AppColors.orange, label: "Processing" },
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const { bg, color, label } = statusStyles[status]

  return (
    <span className="inline-flex rounded-full px-3 py-1" style={{ backgroundColor: bg }}>
      <Text variant="caption" weight="semibold" color={color}>
        {label}
      </Text>
    </span>
  )
}

export { StatusBadge }
export type { TransactionStatus }
