import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

import "@/styles/globals.css"
import { Footer, Navbar } from "@/components"
import { StateProvider } from "@/contexts/StateContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gadget Store",
  description: "...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          <div className="layout">
            <header>
              <Navbar />
            </header>

            <main className="main-container">{children}</main>

            <footer>
              <Footer />
            </footer>
          </div>

          <Toaster />
        </StateProvider>
      </body>
    </html>
  )
}
