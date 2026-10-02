import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_STELWALLET_API_URL ?? "https://api.stelwallet.com/api"
const API_KEY = process.env.NEXT_PUBLIC_STELWALLET_API_KEY

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
  },
})

export { apiClient }
