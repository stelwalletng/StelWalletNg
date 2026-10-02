import { AppColors } from "@/assets/app_colors"
import { Text } from "@/components/reuseables/text"

interface RecoveryPhraseGridProps {
  words: string[]
}

function RecoveryPhraseGrid({ words }: RecoveryPhraseGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {words.map((word, index) => (
        <div
          key={word}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2.5"
          style={{ backgroundColor: AppColors.lightBlue }}
        >
          <Text variant="caption" className="text-neutral-500">
            {index + 1}
          </Text>
          <Text variant="body-sm" weight="medium">
            {word}
          </Text>
        </div>
      ))}
    </div>
  )
}

export { RecoveryPhraseGrid }
