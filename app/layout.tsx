import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Background from '@/components/motion/background'
import Cursor from '@/components/motion/cursor'
import Preloader from '@/components/motion/preloader'
import ScrollProgress from '@/components/motion/scroll-progress'
import Providers from '@/components/providers'
import { Toaster } from 'sonner'
import { introScript } from '@/lib/intro'
import { siteDescription, siteTitle, siteUrl } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

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
  themeColor: '#0b0c14',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{'.preloader{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <Background />
        <Providers>
          <Preloader />
          <ScrollProgress />
          {children}
          <Cursor />
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
