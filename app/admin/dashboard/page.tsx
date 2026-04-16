import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AdminLayout from '@/components/layout/AdminLayout'
import { shortId, formatDate, getServiceLabel } from '@/lib/utils'
import { STATUS_COLORS, STATUS_LABELS, Booking } from '@/types'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  const all = bookings ?? []
  const stats = {
    total: all.length,
    pending: all.filter((b) => b.status === 'pending').length,
    scheduled: all.filter((b) => b.status === 'scheduled').length,
    completed: all.filter((b) => b.status === 'completed').length,
  }

  const recent = all.slice(0, 5)

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of all inspections</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'text-navy' },
            { label: 'Pending Review', value: stats.pending, color: 'text-yellow-600' },
            { label: 'Scheduled', value: stats.scheduled, color: 'text-steel' },
            { label: 'Completed', value: stats.completed, color: 'text-green-600' },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Recent bookings */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-navy">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-steel text-sm underline">View all</Link>
          </div>
          {recent.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No bookings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">ID</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Client</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Service</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Date</th>
                    <th className="px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recent.map((b: Booking) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/admin/bookings/${b.id}`} className="font-mono text-steel hover:underline">
                          {shortId(b.id)}
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-navy font-medium">{b.client_name}</td>
                      <td className="px-6 py-3 text-gray-500">{getServiceLabel(b.service_type)}</td>
                      <td className="px-6 py-3 text-gray-500">{formatDate(b.preferred_date)}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                          {STATUS_LABELS[b.status]}
                        </span>
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
