import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Momentum Partners Blog', template: '%s — Momentum Partners' },
  description: 'Mortgage insights and property finance tips for New Zealand homeowners and first home buyers.',
  openGraph: {
    siteName: 'Momentum Partners',
    locale: 'en_NZ',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
