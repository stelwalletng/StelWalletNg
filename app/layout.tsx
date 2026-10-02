import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppColors } from "@/assets/app_colors";
import { QueryProvider } from "@/lib/providers/query-provider";
import { WalletProvider } from "@/lib/providers/wallet-provider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stelwallet.com"
const SITE_NAME = "StelWalletNG"
const SITE_DESCRIPTION =
  "A simple, self-custodial wallet for sending, receiving, and managing assets on the Stellar network. Create or import a Stellar wallet and stay in full control of your keys."

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../public/fonts/satoshi/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/satoshi/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/satoshi/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/satoshi/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../public/fonts/satoshi/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Your money. Your wallet. Your control.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Stellar wallet",
    "non-custodial wallet",
    "self-custodial wallet",
    "crypto wallet",
    "Stellar blockchain",
    "XLM wallet",
    "send and receive crypto",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Your money. Your wallet. Your control.`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Your money. Your wallet. Your control.`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: AppColors.darkGreen,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, satoshi.variable)}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <WalletProvider>{children}</WalletProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
