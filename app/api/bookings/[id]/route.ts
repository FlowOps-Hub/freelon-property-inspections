import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { sendReportReady } from '@/lib/resend'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const { data, error } = await supabase.from('bookings').select('*').eq('id', params.id).single()
  if (error || !data) return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

    const body = await req.json()
    const { status, report_url, notes } = body

    const updates: Record<string, unknown> = {}
    if (status !== undefined) updates.status = status
    if (report_url !== undefined) updates.report_url = report_url
    if (notes !== undefined) updates.notes = notes

    const adminClient = createAdminClient()
    const { data, error } = await adminClient
      .from('bookings')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error || !data) return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 })

    // If status = completed and report_url exists, send report-ready email
    if (status === 'completed' && data.report_url) {
      try {
        await sendReportReady({
          to: data.client_email,
          clientName: data.client_name,
          propertyAddress: data.property_address,
          reportUrl: data.report_url,
        })
      } catch (emailErr) {
        console.error('Report email failed:', emailErr)
      }
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Booking PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
