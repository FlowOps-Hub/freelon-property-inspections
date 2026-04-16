import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendBookingConfirmation } from '@/lib/resend'
import { shortId, formatDate, getServiceLabel } from '@/lib/utils'
import { TIME_LABELS } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { client_name, client_email, client_phone, property_address, service_type, preferred_date, preferred_time, notes } = body

    // Basic server-side validation
    if (!client_name || !client_email || !client_phone || !property_address || !service_type || !preferred_date || !preferred_time) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_name,
        client_email,
        client_phone,
        property_address,
        service_type,
        preferred_date,
        preferred_time,
        notes: notes || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 })
    }

    // Send confirmation email (non-blocking — don't fail the response if email errors)
    try {
      await sendBookingConfirmation({
        to: client_email,
        clientName: client_name,
        serviceType: getServiceLabel(service_type),
        propertyAddress: property_address,
        preferredDate: formatDate(preferred_date),
        preferredTime: TIME_LABELS[preferred_time] ?? preferred_time,
        bookingId: shortId(data.id),
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
    }

    return NextResponse.json({ id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Booking POST error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
