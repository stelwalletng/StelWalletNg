import { apiClient } from "@/lib/api/client"
import type { SupportedAsset } from "@/lib/api/types"

async function getSupportedAssets() {
  const { data } = await apiClient.get<SupportedAsset[]>("/assets/")
  return data
}

export { getSupportedAssets }
