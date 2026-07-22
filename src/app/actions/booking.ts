'use server';

import { resend } from '@/lib/resend';
import { bookingSchema, BookingFormData } from '@/lib/schema';

export async function sendBookingAction(formData: BookingFormData) {
  try {
    // Check honeypot
    if (formData.website_hp && formData.website_hp.length > 0) {
      return { success: true }; // Silent rejection for bots
    }

    const data = bookingSchema.parse(formData);
    const recipient = process.env.BOOKING_RECIPIENT_EMAIL || 'Foonefoine@gmail.com';

    const response = await resend.emails.send({
      from: 'Studio Booking <onboarding@resend.dev>',
      to: [recipient],
      subject: `✨ New ${data.eventType} Inquiry from ${data.name}`,
      html: `
        <h2>New Studio Booking Request</h2>
        <p><strong>Client:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Event:</strong> ${data.eventType}</p>
        <p><strong>Date:</strong> ${data.eventDate}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Guests:</strong> ${data.guestCount}</p>
        <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
      `,
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit form.' };
  }
}

