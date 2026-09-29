import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Background from '@/components/motion/background'
import Cursor from '@/components/motion/cursor'
import Preloader, { introScript } from '@/components/motion/preloader'
import ScrollProgress from '@/components/motion/scroll-progress'
import Providers from '@/components/providers'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kuchuru Sai Krishna Reddy | Full-Stack & ML Developer',
  description:
    'Full-Stack Developer and Machine Learning Enthusiast. Building real-world, data-driven systems deployed in production.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
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
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
