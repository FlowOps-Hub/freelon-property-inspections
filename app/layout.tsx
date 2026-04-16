import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Freelon Property Inspections',
  description:
    'Professional home, condo, radon, termite, water, and commercial inspections in Ashland, Ohio. Book online today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
