import { useQuery } from "@tanstack/react-query"
import { getSupportedAssets } from "@/lib/api/assets"

function useSupportedAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: getSupportedAssets,
  })
}

export { useSupportedAssets }
