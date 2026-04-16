import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { shortId } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { email, booking_id } = await req.json()
    if (!email || !booking_id) {
      return NextResponse.json({ error: 'Email and booking ID are required.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Fetch all bookings matching this email (avoid leaking whether an email exists)
    const { data, error } = await supabase
      .from('bookings')
      .select('id, client_name, property_address, report_url, status')
      .eq('client_email', email.toLowerCase().trim())

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'No booking found with that email and ID.' }, { status: 404 })
    }

    // Match by shortId (first 8 chars of UUID, uppercase)
    const match = data.find((b) => shortId(b.id) === booking_id.toUpperCase())

    if (!match) {
      return NextResponse.json({ error: 'No booking found with that email and ID.' }, { status: 404 })
    }

    return NextResponse.json({
      client_name: match.client_name,
      property_address: match.property_address,
      report_url: match.report_url,
      status: match.status,
    })
  } catch (err) {
    console.error('Report lookup error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
