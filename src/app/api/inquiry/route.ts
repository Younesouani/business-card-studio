import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initializing the Resend SDK safely
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request: Request) {
  console.log("=== API ROUTE TRIGGERED SUCCESSFULLY ===");
  
  try {
    const body = await request.json();
    
    // Unpack variables directly from the object securely
    const name = body.name;
    const email = body.email;
    const selectedPackage = body.package;
    const vision = body.vision;

    // Validate incoming payload blocks strictly
    if (!name || !email || !vision) {
      return NextResponse.json(
        { error: 'Required fields missing: Name, Email, or Vision must be completed.' }, 
        { status: 400 }
      );
    }

    // Fire data to the target mailbox using Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'unesouani007@gmail.com',
      subject: `New Commission Request: ${name}`,
      text: `
New Wedding Commission Inquiry

Client Name: ${name}
Client Email: ${email}
Selected Package: ${selectedPackage || 'Not Specified'}

Creative Vision Details:
${vision}
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    console.error('!! RESEND CRASH ERROR !! ->', error);
    return NextResponse.json(
      { error: error?.message || 'Internal transmission exception occurred.' }, 
      { status: 500 }
    );
  }
}

