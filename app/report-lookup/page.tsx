'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { shortId } from '@/lib/utils'

interface ReportResult {
  client_name: string
  property_address: string
  report_url: string | null
  status: string
}

export default function ReportLookupPage() {
  const [email, setEmail] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [result, setResult] = useState<ReportResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !bookingId.trim()) {
      setError('Please enter both your email and booking ID.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/report-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), booking_id: bookingId.trim().toUpperCase() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No matching booking found.')
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-navy py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Get Your Inspection Report</h1>
        <p className="text-gray-300">Enter the email you used to book and your Booking ID.</p>
      </section>

      <section className="flex-1 py-12 px-4 bg-gray-surface">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div>
              <label className="label" htmlFor="email">Email Address</label>
              <input id="email" type="email" className="input" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
            <div>
              <label className="label" htmlFor="bookingId">Booking ID</label>
              <input id="bookingId" type="text" className="input font-mono uppercase tracking-widest"
                value={bookingId} onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                placeholder="e.g. A3F82B1C" maxLength={8} />
              <p className="text-xs text-gray-400 mt-1">Found in your confirmation email.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Looking up…
                </>
              ) : 'Find My Report'}
            </button>
          </form>

          {result && (
            <div className="card p-6 mt-6">
              <h2 className="font-semibold text-navy mb-1">{result.client_name}</h2>
              <p className="text-gray-500 text-sm mb-4">{result.property_address}</p>

              {result.report_url ? (
                <a href={result.report_url} target="_blank" rel="noopener noreferrer"
                  className="btn-primary block text-center">
                  Download Your Report
                </a>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  <strong>Report not yet available.</strong><br />
                  Your inspection status is <span className="font-semibold capitalize">{result.status}</span>.
                  You&apos;ll receive an email when your report is ready.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
