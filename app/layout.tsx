import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const shareImageAlt = 'AM Pachuca — vista previa del sitio web'

/** URL pública del sitio: necesaria para que og:image y enlaces absolutos funcionen al compartir. */
function getMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    try {
      return new URL(fromEnv)
    } catch {
      /* sigue con fallbacks */
    }
  }
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (production) {
    try {
      return new URL(`https://${production.replace(/^https?:\/\//, '')}`)
    } catch {
      /* sigue */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }
  return new URL('http://localhost:3000')
}

const siteTitle = 'AM Pachuca | Agencia de Viajes'
const siteDescription =
  'Tu agencia de viajes en Pachuca. Descubre nuestros paquetes turísticos, promociones exclusivas y los mejores destinos para tus vacaciones.'

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: siteTitle,
  description: siteDescription,
  keywords: ['viajes', 'turismo', 'Pachuca', 'paquetes turísticos', 'vacaciones', 'promociones'],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'AM Pachuca',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: shareImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
