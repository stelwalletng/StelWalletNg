import type { Metadata } from "next"

// wallet dashboard/transactions are per-user data, keep them out of search results
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return children
}
