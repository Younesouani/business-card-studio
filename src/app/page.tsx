import BookingForm from '@/components/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-amber-100 font-serif mb-4">
          Visual Storytelling & Fine Art Photography
        </h1>
        <p className="text-stone-400 text-lg font-sans max-w-xl mx-auto">
          Capturing unforgettable moments for Weddings, Engagements, and Exclusive Events.
        </p>
      </div>

      <BookingForm />
    </main>
  );
}
	
