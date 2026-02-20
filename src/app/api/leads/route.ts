import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, lang } = body;

    const cleanPhone = `+1${phone.replace(/\D/g, '').slice(-10)}`;

    const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: cleanPhone,
        locationId: process.env.GHL_LOCATION_ID,
        tags: ['NightLase Landing Page', lang === 'es' ? 'Spanish' : 'English'],
        source: 'Nightlase Page'
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "GHL API Error" }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}