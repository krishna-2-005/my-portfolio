import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import RevealObserver from '@/components/reveal-observer'
import { siteDescription, siteTitle, siteUrl } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

/** Marks JS as available before first paint, so .reveal elements only hide when they can be revealed. */
const jsFlag = `document.documentElement.classList.add('js')`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Kuchuru Sai Krishna Reddy — Portfolio',
  authors: [{ name: 'Kuchuru Sai Krishna Reddy', url: 'https://github.com/krishna-2-005' }],
  keywords: ['Kuchuru Sai Krishna Reddy', 'Full-Stack Developer', 'Machine Learning', 'Data Science', 'NMIMS Hyderabad', 'Portfolio'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Kuchuru Sai Krishna Reddy',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0d0e11',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <Toaster theme="dark" position="bottom-right" closeButton />
        <Analytics />
      </body>
    </html>
  )
}
