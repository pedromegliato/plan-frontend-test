import React from 'react'
import { ToastContainer } from 'react-toastify'

import type { Metadata, Viewport } from 'next'
import { Inter, Exo } from 'next/font/google'

import { Providers } from '@/components/Providers'

import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })
const exo = Exo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-exo',
})

export const metadata: Metadata = {
  title: 'Explorador de Países | Plan International',
  description:
    'Explore informações sobre países ao redor do mundo. Descubra detalhes sobre população, moedas, idiomas, regiões e muito mais.',
  keywords: [
    'países',
    'explorador de países',
    'informações geográficas',
    'continentes',
    'bandeiras',
    'atlas mundial',
    'geografia',
  ],
  authors: [{ name: 'Plan International' }],
  creator: 'Plan International',
  publisher: 'Grupo Plan Marketing',
  metadataBase: new URL('https://plan-countries-explorer.vercel.app'),
  openGraph: {
    title: 'Explorador de Países | Plan International',
    description:
      'Explore informações sobre países ao redor do mundo. Descubra detalhes sobre população, moedas, idiomas, regiões e muito mais.',
    url: 'https://plan-countries-explorer.vercel.app',
    siteName: 'Explorador de Países',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explorador de Países | Plan International',
    description: 'Explore informações sobre países ao redor do mundo.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body className={`${inter.className} ${exo.variable} overflow-x-hidden`}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
