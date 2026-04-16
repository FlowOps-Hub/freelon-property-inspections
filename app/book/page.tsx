'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SERVICE_LABELS, TIME_LABELS, ServiceType } from '@/types'

interface FormData {
  client_name: string
  client_email: string
  client_phone: string
  property_address: string
  service_type: ServiceType | ''
  preferred_date: string
  preferred_time: 'morning' | 'afternoon' | 'evening' | ''
  notes: string
}

const initialForm: FormData = {
  client_name: '',
  client_email: '',
  client_phone: '',
  property_address: '',
  service_type: '',
  preferred_date: '',
  preferred_time: '',
  notes: '',
}

export default function BookPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.client_name.trim()) e.client_name = 'Name is required.'
    if (!form.client_email.trim()) e.client_email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email)) e.client_email = 'Enter a valid email.'
    if (!form.client_phone.trim()) e.client_phone = 'Phone number is required.'
    if (!form.property_address.trim()) e.property_address = 'Property address is required.'
    if (!form.service_type) e.service_type = 'Please select a service.'
    if (!form.preferred_date) e.preferred_date = 'Preferred date is required.'
    if (!form.preferred_time) e.preferred_time = 'Please select a time preference.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      router.push(`/confirmation?id=${data.id}`)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function field(name: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-navy py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Book an Inspection</h1>
        <p className="text-gray-300">Fill out the form below and Todd will confirm your appointment shortly.</p>
      </section>

      <section className="flex-1 py-12 px-4 bg-gray-surface">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card p-8 space-y-6" noValidate>

            {/* Contact info */}
            <div>
              <h2 className="text-navy font-semibold text-base mb-4 pb-2 border-b border-gray-200">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="label" htmlFor="client_name">Full Name</label>
                  <input id="client_name" type="text" className={`input ${errors.client_name ? 'border-red-400' : ''}`}
                    value={form.client_name} onChange={(e) => field('client_name', e.target.value)} placeholder="Jane Smith" />
                  {errors.client_name && <p className="text-red-500 text-xs mt-1">{errors.client_name}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label" htmlFor="client_email">Email Address</label>
                    <input id="client_email" type="email" className={`input ${errors.client_email ? 'border-red-400' : ''}`}
                      value={form.client_email} onChange={(e) => field('client_email', e.target.value)} placeholder="jane@example.com" />
                    {errors.client_email && <p className="text-red-500 text-xs mt-1">{errors.client_email}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="client_phone">Phone Number</label>
                    <input id="client_phone" type="tel" className={`input ${errors.client_phone ? 'border-red-400' : ''}`}
                      value={form.client_phone} onChange={(e) => field('client_phone', e.target.value)} placeholder="(419) 555-1234" />
                    {errors.client_phone && <p className="text-red-500 text-xs mt-1">{errors.client_phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Property & service */}
            <div>
              <h2 className="text-navy font-semibold text-base mb-4 pb-2 border-b border-gray-200">Property &amp; Service</h2>
              <div className="space-y-4">
                <div>
                  <label className="label" htmlFor="property_address">Property Address</label>
                  <input id="property_address" type="text" className={`input ${errors.property_address ? 'border-red-400' : ''}`}
                    value={form.property_address} onChange={(e) => field('property_address', e.target.value)}
                    placeholder="123 Maple St, Ashland, OH 44805" />
                  {errors.property_address && <p className="text-red-500 text-xs mt-1">{errors.property_address}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="service_type">Service Type</label>
                  <select id="service_type" className={`input ${errors.service_type ? 'border-red-400' : ''}`}
                    value={form.service_type} onChange={(e) => field('service_type', e.target.value)}>
                    <option value="">Select a service…</option>
                    {(Object.entries(SERVICE_LABELS) as [ServiceType, string][]).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type}</p>}
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div>
              <h2 className="text-navy font-semibold text-base mb-4 pb-2 border-b border-gray-200">Scheduling Preference</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="preferred_date">Preferred Date</label>
                  <input id="preferred_date" type="date" className={`input ${errors.preferred_date ? 'border-red-400' : ''}`}
                    value={form.preferred_date} min={minDate} onChange={(e) => field('preferred_date', e.target.value)} />
                  {errors.preferred_date && <p className="text-red-500 text-xs mt-1">{errors.preferred_date}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="preferred_time">Preferred Time</label>
                  <select id="preferred_time" className={`input ${errors.preferred_time ? 'border-red-400' : ''}`}
                    value={form.preferred_time} onChange={(e) => field('preferred_time', e.target.value)}>
                    <option value="">Select a time…</option>
                    {(Object.entries(TIME_LABELS) as [string, string][]).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  {errors.preferred_time && <p className="text-red-500 text-xs mt-1">{errors.preferred_time}</p>}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="label" htmlFor="notes">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea id="notes" rows={3} className="input resize-none"
                value={form.notes} onChange={(e) => field('notes', e.target.value)}
                placeholder="Anything Todd should know about the property or inspection…" />
            </div>

            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {serverError}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                'Submit Inspection Request'
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              After submitting, you&apos;ll receive a confirmation email with your Booking ID.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
