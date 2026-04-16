import AdminLayout from '@/components/layout/AdminLayout'

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-navy mb-2">Settings</h1>
        <p className="text-gray-500 text-sm mb-8">Admin settings and configuration.</p>

        <div className="card p-8 text-center text-gray-400">
          <p className="text-4xl mb-3">⚙️</p>
          <p className="font-medium text-navy">Coming in a future update</p>
          <p className="text-sm mt-1">Email templates, business hours, and service pricing will be configurable here.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
