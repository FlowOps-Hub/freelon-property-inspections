import { Suspense } from 'react'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { shortId, formatDate, getServiceLabel } from '@/lib/utils'
import { TIME_LABELS } from '@/types'

async function ConfirmationContent({ id }: { id: string }) {
  const supabase = createAdminClient()
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !booking) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Booking not found. Please check your confirmation email.</p>
        <Link href="/" className="text-steel underline mt-4 block">Return home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Request Received!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Todd will reach out to confirm your appointment. Check your email for a confirmation.
        </p>

        <div className="bg-navy rounded-lg p-5 mb-6 text-left">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Booking ID</p>
          <p className="text-gold font-bold text-2xl font-mono">{shortId(booking.id)}</p>
          <p className="text-gray-400 text-xs mt-1">Save this — you&apos;ll need it to retrieve your report.</p>
        </div>

        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-2 pr-4 text-gray-500 font-medium">Name</td>
              <td className="py-2 text-navy">{booking.client_name}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-500 font-medium">Service</td>
              <td className="py-2 text-navy">{getServiceLabel(booking.service_type)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-500 font-medium">Property</td>
              <td className="py-2 text-navy">{booking.property_address}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-500 font-medium">Requested Date</td>
              <td className="py-2 text-navy">{formatDate(booking.preferred_date)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 text-gray-500 font-medium">Preferred Time</td>
              <td className="py-2 text-navy">{TIME_LABELS[booking.preferred_time]}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 space-y-3">
          <Link href="/" className="btn-primary block text-center">Return to Home</Link>
          <Link href="/report-lookup" className="text-steel text-sm underline">Look up your report later</Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const { id } = searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 py-12 px-4 bg-gray-surface">
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading…</div>}>
          {id ? (
            <ConfirmationContent id={id} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No booking ID provided. <Link href="/book" className="text-steel underline">Book an inspection.</Link>
            </div>
          )}
        </Suspense>
      </section>
      <Footer />
    </div>
  )
}
