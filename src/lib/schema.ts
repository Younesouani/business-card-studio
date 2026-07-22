import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  eventType: z.enum(['Wedding', 'Engagement', 'Birthday'], {
    required_error: 'Please select an event type',
  }),
  eventDate: z.string().min(1, 'Please select a date'),
  location: z.string().min(3, 'Please provide the venue or city location'),
  guestCount: z.coerce.number().min(1, 'Guest count must be at least 1'),
  message: z.string().optional(),
  // Honeypot field for basic spam protection (must remain empty)
  website_hp: z.string().max(0, 'Spam detected').optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

