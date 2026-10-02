import { Check } from "lucide-react"
import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"

interface StatusTimelineStepProps {
  title: string
  timestamp: string
  isLast?: boolean
}

function StatusTimelineStep({ title, timestamp, isLast = false }: StatusTimelineStepProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: AppColors.primaryGreen }}
        >
          <Check className="size-3.5 text-white" />
        </span>
        {!isLast ? <span className="w-px flex-1 bg-neutral-200" /> : null}
      </div>

      <div className="pb-6">
        <Text variant="body-sm" weight="semibold">
          {title}
        </Text>
        <Text variant="caption" className="text-neutral-500">
          {timestamp}
        </Text>
      </div>
    </div>
  )
}

export { StatusTimelineStep }
