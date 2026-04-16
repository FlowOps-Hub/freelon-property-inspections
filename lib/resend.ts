import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Freelon Property Inspections <onboarding@resend.dev>'

export async function sendBookingConfirmation({
  to,
  clientName,
  serviceType,
  propertyAddress,
  preferredDate,
  preferredTime,
  bookingId,
}: {
  to: string
  clientName: string
  serviceType: string
  propertyAddress: string
  preferredDate: string
  preferredTime: string
  bookingId: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Your Inspection Request Has Been Received',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #0A1628;">
        <div style="background: #0A1628; padding: 32px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">Freelon Property Inspections</h1>
          <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Ashland, Ohio · (419) 281-4300</p>
        </div>
        <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
          <h2 style="color: #0A1628; margin-top: 0;">Inspection Request Received</h2>
          <p>Hi ${clientName},</p>
          <p>We've received your inspection request. Todd will reach out shortly to confirm your appointment.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr style="background: #F4F5F7;">
              <td style="padding: 10px 12px; font-weight: 600; width: 40%;">Booking ID</td>
              <td style="padding: 10px 12px; font-family: monospace; font-size: 16px; color: #4A7FA5;">${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600;">Service</td>
              <td style="padding: 10px 12px;">${serviceType}</td>
            </tr>
            <tr style="background: #F4F5F7;">
              <td style="padding: 10px 12px; font-weight: 600;">Property</td>
              <td style="padding: 10px 12px;">${propertyAddress}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600;">Requested Date</td>
              <td style="padding: 10px 12px;">${preferredDate}</td>
            </tr>
            <tr style="background: #F4F5F7;">
              <td style="padding: 10px 12px; font-weight: 600;">Preferred Time</td>
              <td style="padding: 10px 12px;">${preferredTime}</td>
            </tr>
          </table>
          <p style="font-size: 14px; color: #6b7280;">Save your Booking ID — you'll need it to retrieve your completed report.</p>
        </div>
        <div style="background: #F4F5F7; padding: 20px; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0;">Freelon Property Inspections LLC · 1304 Claremont Ave, Ashland, OH 44805</p>
          <p style="margin: 6px 0 0;">(419) 281-4300</p>
        </div>
      </div>
    `,
  })
}

export async function sendReportReady({
  to,
  clientName,
  propertyAddress,
  reportUrl,
}: {
  to: string
  clientName: string
  propertyAddress: string
  reportUrl: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Your Inspection Report Is Ready',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #0A1628;">
        <div style="background: #0A1628; padding: 32px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">Freelon Property Inspections</h1>
          <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Ashland, Ohio · (419) 281-4300</p>
        </div>
        <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
          <h2 style="color: #0A1628; margin-top: 0;">Your Report Is Ready</h2>
          <p>Hi ${clientName},</p>
          <p>Your inspection report for <strong>${propertyAddress}</strong> is complete and ready to download.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${reportUrl}" style="background: #4A7FA5; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Download Your Report
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">If the button above doesn't work, copy and paste this link into your browser:</p>
          <p style="font-size: 13px; word-break: break-all; color: #4A7FA5;">${reportUrl}</p>
          <p>Questions? Call us at <strong>(419) 281-4300</strong> or reply to this email.</p>
        </div>
        <div style="background: #F4F5F7; padding: 20px; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0;">Freelon Property Inspections LLC · 1304 Claremont Ave, Ashland, OH 44805</p>
        </div>
      </div>
    `,
  })
}
