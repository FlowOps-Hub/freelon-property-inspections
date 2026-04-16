'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/components/layout/AdminLayout'
import { shortId, formatDate, getServiceLabel } from '@/lib/utils'
import { TIME_LABELS, STATUS_LABELS, STATUS_COLORS, Booking, BookingStatus } from '@/types'

const STATUSES: BookingStatus[] = ['pending', 'scheduled', 'in_progress', 'completed', 'cancelled']

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [status, setStatus] = useState<BookingStatus>('pending')
  const [notes, setNotes] = useState('')
  const [reportUrl, setReportUrl] = useState('')

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBooking(data)
        setStatus(data.status)
        setNotes(data.notes ?? '')
        setReportUrl(data.report_url ?? '')
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load booking.')
        setLoading(false)
      })
  }, [id])

  async function handleSave() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes, report_url: reportUrl || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save.')
      setBooking(data)
      setSuccess(
        status === 'completed' && reportUrl
          ? 'Saved! Report-ready email sent to client.'
          : 'Changes saved.'
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-400">Loading…</div>
      </AdminLayout>
    )
  }

  if (!booking) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-500">
          Booking not found. <Link href="/admin/bookings" className="text-steel underline">Back to bookings</Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/bookings" className="text-gray-400 hover:text-navy text-sm">← Bookings</Link>
          <span className="text-gray-300">/</span>
          <span className="font-mono text-steel font-medium">{shortId(booking.id)}</span>
          <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status]}`}>
            {STATUS_LABELS[booking.status]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client info (read-only) */}
          <div className="card p-6">
            <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-4">Client Information</h2>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-gray-400">Name</dt><dd className="text-navy font-medium">{booking.client_name}</dd></div>
              <div><dt className="text-gray-400">Email</dt><dd className="text-navy">{booking.client_email}</dd></div>
              <div><dt className="text-gray-400">Phone</dt><dd className="text-navy">{booking.client_phone}</dd></div>
            </dl>
          </div>

          {/* Inspection details (read-only) */}
          <div className="card p-6">
            <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-4">Inspection Details</h2>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-gray-400">Property</dt><dd className="text-navy font-medium">{booking.property_address}</dd></div>
              <div><dt className="text-gray-400">Service</dt><dd className="text-navy">{getServiceLabel(booking.service_type)}</dd></div>
              <div><dt className="text-gray-400">Preferred Date</dt><dd className="text-navy">{formatDate(booking.preferred_date)}</dd></div>
              <div><dt className="text-gray-400">Preferred Time</dt><dd className="text-navy">{TIME_LABELS[booking.preferred_time]}</dd></div>
              {booking.notes && (
                <div><dt className="text-gray-400">Client Notes</dt><dd className="text-navy">{booking.notes}</dd></div>
              )}
            </dl>
          </div>
        </div>

        {/* Admin controls */}
        <div className="card p-6 mt-6 space-y-5">
          <h2 className="font-semibold text-navy text-sm uppercase tracking-wide">Update Booking</h2>

          <div>
            <label className="label">Status</label>
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value as BookingStatus)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Report URL <span className="text-gray-400 font-normal">(paste Supabase Storage URL after uploading PDF)</span></label>
            <input type="url" className="input" value={reportUrl}
              onChange={(e) => setReportUrl(e.target.value)}
              placeholder="https://your-project.supabase.co/storage/v1/object/public/reports/..." />
            {status === 'completed' && reportUrl && (
              <p className="text-xs text-green-600 mt-1">✓ Saving with status "Completed" will email the report link to the client.</p>
            )}
          </div>

          <div>
            <label className="label">Internal Notes</label>
            <textarea rows={3} className="input resize-none" value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes visible only to admin…" />
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">{success}</div>}

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving…
                </>
              ) : 'Save Changes'}
            </button>
            <button onClick={() => router.back()} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
