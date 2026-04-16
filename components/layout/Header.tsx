'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-gold font-bold text-lg tracking-tight">Freelon Property Inspections</span>
            <span className="text-xs text-gray-400">Ashland, Ohio</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="/report-lookup" className="text-gray-300 hover:text-white transition-colors">Get Your Report</Link>
            <Link href="/book" className="btn-gold text-sm py-2 px-5 rounded-lg font-semibold transition-colors">
              Book Inspection
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-navy-light space-y-3 text-sm">
            <Link href="/services" className="block text-gray-300 hover:text-white py-2" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/report-lookup" className="block text-gray-300 hover:text-white py-2" onClick={() => setOpen(false)}>Get Your Report</Link>
            <Link href="/book" className="block btn-gold text-center py-2 px-5 rounded-lg font-semibold" onClick={() => setOpen(false)}>
              Book Inspection
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
