'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/lib/schema';
import { sendBookingAction } from '@/app/actions/booking';

export default function BookingForm() {
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventType: 'Wedding',
      guestCount: 100,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setStatus({ type: 'loading' });

    // Try Server Action primary path
    const res = await sendBookingAction(data);

    if (res.success) {
      setStatus({
        type: 'success',
        message: 'Thank you! Your booking request has been received. We will get back to you shortly.',
      });
      reset();
      return;
    }

    // Fallback path: API Route
    try {
      const apiRes = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const apiData = await apiRes.json();

      if (apiRes.ok && apiData.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your booking request has been sent successfully.',
        });
        reset();
      } else {
        throw new Error(apiData.error || 'Failed to send via fallback service.');
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again or reach out directly via email.',
      });
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-stone-900/40 backdrop-blur-md border border-amber-500/20 shadow-2xl text-stone-100 font-serif">
      <div className="text-center mb-8">
        <span className="text-amber-400 uppercase tracking-widest text-xs font-sans font-semibold">Reserve Your Date</span>
        <h2 className="text-3xl md:text-4xl font-light text-stone-50 mt-1">Capture Your Story</h2>
        <p className="text-stone-400 text-sm font-sans mt-2">Fine art wedding & event photography coverage.</p>
      </div>

      {status.type === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-sans text-sm text-center">
          {status.message}
        </div>
      )}

      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 font-sans text-sm text-center">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
        {/* Honeypot anti-spam field */}
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('website_hp')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Full Name *</label>
            <input
              {...register('name')}
              placeholder="e.g., Jane Doe"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.name && <p className="text-amber-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Email Address *</label>
            <input
              type="email"
              {...register('email')}
              placeholder="jane@example.com"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.email && <p className="text-amber-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Phone Number *</label>
            <input
              {...register('phone')}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.phone && <p className="text-amber-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Event Type *</label>
            <select
              {...register('eventType')}
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday">Birthday</option>
            </select>
            {errors.eventType && <p className="text-amber-500 text-xs mt-1">{errors.eventType.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Event Date *</label>
            <input
              type="date"
              {...register('eventDate')}
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.eventDate && <p className="text-amber-500 text-xs mt-1">{errors.eventDate.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Location / Venue *</label>
            <input
              {...register('location')}
              placeholder="City or Venue"
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.location && <p className="text-amber-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Guest Count *</label>
            <input
              type="number"
              {...register('guestCount')}
              className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {errors.guestCount && <p className="text-amber-500 text-xs mt-1">{errors.guestCount.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">Your Message or Vision</label>
          <textarea
            rows={4}
            {...register('message')}
            placeholder="Tell us about your wedding timeline, theme, or special requests..."
            className="w-full px-4 py-3 bg-stone-950/60 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold tracking-wider uppercase text-xs rounded-lg transition-all duration-300 shadow-lg shadow-amber-950/50 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
        </button>
      </form>
    </section>
  );
}

