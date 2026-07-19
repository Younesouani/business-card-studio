import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initializing the Resend SDK with our server-side environmental variables safely
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export async function POST(request: Request) {

  console.log("API HIT!");
  try {
    const body = await request.json();
    const { name, email, package: selectedPackage, vision } = body;

    // Validate incoming payload blocks
    if (!name || !email || !vision) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    // Fire data to the target mailbox using strictly valid sandbox strings
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Kept strictly clean for sandbox authorization rules
      to: 'unesouani007@gmail.com',
      subject: `New Commission Request: ${name}`,
      text: `
        New Wedding Commission Inquiry

        Client Name: ${name}
        Client Email: ${email}
        Selected Package: ${selectedPackage}

        Creative Vision Details:
        ${vision}
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    // This forces Termux to print the exact crash report to your terminal screen
    console.error('!! RESEND CRASH ERROR !! ->', error);
    return NextResponse.json({ error: error.message || 'Internal Security Error' }, { status: 500 });
  }
}

