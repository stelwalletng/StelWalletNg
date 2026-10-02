import { ChevronLeft, ChevronRight } from "lucide-react"
import { Text } from "@/components/reuseables/text"

interface TransactionPaginationProps {
  shown: number
  total: number
  page: number
}

function TransactionPagination({ shown, total, page }: TransactionPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="caption" className="text-neutral-500">
        Showing {shown} of {total}
      </Text>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="flex size-8 items-center justify-center rounded-lg border border-neutral-200">
          <Text variant="caption" weight="semibold">
            {page}
          </Text>
        </span>
        <button
          type="button"
          aria-label="Next page"
          className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

export { TransactionPagination }
