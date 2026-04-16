import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AdminLayout from '@/components/layout/AdminLayout'
import { shortId, formatDate, getServiceLabel } from '@/lib/utils'
import { STATUS_COLORS, STATUS_LABELS, Booking, BookingStatus } from '@/types'

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createClient()
  const statusFilter = searchParams.status as BookingStatus | undefined

  let query = supabase.from('bookings').select('*').order('created_at', { ascending: false })
  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: bookings } = await query
  const all = bookings ?? []

  const statuses: (BookingStatus | '')[] = ['', 'pending', 'scheduled', 'in_progress', 'completed', 'cancelled']

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Bookings</h1>
            <p className="text-gray-500 text-sm mt-1">{all.length} booking{all.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {statuses.map((s) => (
            <Link
              key={s || 'all'}
              href={s ? `/admin/bookings?status=${s}` : '/admin/bookings'}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                (s === '' && !statusFilter) || s === statusFilter
                  ? 'bg-navy text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-steel'
              }`}
            >
              {s ? STATUS_LABELS[s as BookingStatus] : 'All'}
            </Link>
          ))}
        </div>

        <div className="card overflow-hidden">
          {all.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">ID</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Client</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Property</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Service</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Date</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {all.map((b: Booking) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-steel">{shortId(b.id)}</td>
                      <td className="px-6 py-3">
                        <p className="font-medium text-navy">{b.client_name}</p>
                        <p className="text-xs text-gray-400">{b.client_email}</p>
                      </td>
                      <td className="px-6 py-3 text-gray-500 max-w-[200px] truncate">{b.property_address}</td>
                      <td className="px-6 py-3 text-gray-500">{getServiceLabel(b.service_type)}</td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">{formatDate(b.preferred_date)}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                          {STATUS_LABELS[b.status]}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Link href={`/admin/bookings/${b.id}`} className="text-steel text-xs font-medium hover:underline">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
