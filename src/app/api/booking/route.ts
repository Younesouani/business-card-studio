import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { bookingSchema } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website_hp) {
      return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 200 });
    }

    const validatedData = bookingSchema.parse(body);
    const recipient = process.env.BOOKING_RECIPIENT_EMAIL || 'Foonefoine@gmail.com';

    const emailResponse = await resend.emails.send({
      from: 'Studio Booking <onboarding@resend.dev>',
      to: [recipient],
      subject: `✨ New Booking Request: ${validatedData.eventType} - ${validatedData.name}`,
      html: `
        <div style="font-family: serif, sans-serif; padding: 20px; color: #222; max-width: 600px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #4a3e3d; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">New Photography Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Client Name:</td><td>${validatedData.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${validatedData.email}">${validatedData.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${validatedData.phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Event Type:</td><td><strong>${validatedData.eventType}</strong></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Event Date:</td><td>${validatedData.eventDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Location:</td><td>${validatedData.location}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Guest Count:</td><td>${validatedData.guestCount}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #faf8f5; border-left: 4px solid #d4af37;">
            <strong>Client Note:</strong>
            <p style="margin-top: 5px; white-space: pre-wrap;">${validatedData.message || 'No additional details provided.'}</p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      return NextResponse.json({ error: emailResponse.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: emailResponse.data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error processing booking.' },
      { status: 500 }
    );
  }
}

