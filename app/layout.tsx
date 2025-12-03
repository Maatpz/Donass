import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DonaS - Seja a Dona de Si ✨",
  description: "Moda sensual e moderna com confecção própria. Peças que combinam sofisticação, conforto e leveza.",
  keywords: "moda feminina, confecção própria, roupas femininas, moda sensual, DonaS",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.jpg",
  },
  openGraph: {
    title: "DonaS - Seja a Dona de Si ✨",
    description: "Moda sensual e moderna com confecção própria",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
