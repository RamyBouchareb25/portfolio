import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ramy Bouchareb - DevOps Full-Stack Developer",
    template: "%s | Ramy Bouchareb",
  },
  description:
    "DevOps-focused Full-Stack Developer with expertise in Next.js, TypeScript, Docker, and Kubernetes. Building modern web applications with CI/CD and cloud-native tools.",
  keywords: [
    "DevOps",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "NestJS",
    "Cloud Native",
  ],
  authors: [{ name: "Ramy Bouchareb" }],
  creator: "Ramy Bouchareb",
  publisher: "Ramy Bouchareb",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndoe.dev",
    title: "Ramy Bouchareb - DevOps Full-Stack Developer",
    description: "DevOps-focused Full-Stack Developer with expertise in Next.js, TypeScript, Docker, and Kubernetes.",
    siteName: "Ramy Bouchareb Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ramy Bouchareb - DevOps Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramy Bouchareb - DevOps Full-Stack Developer",
    description: "DevOps-focused Full-Stack Developer with expertise in Next.js, TypeScript, Docker, and Kubernetes.",
    images: ["/og-image.jpg"],
    creator: "@johndoe",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://johndoe.dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
