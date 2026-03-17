import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, lang } = body;

    // Standardizing phone format to E.164
    const cleanPhone = `+1${phone.replace(/\D/g, '').slice(-10)}`;

    const [ghlResponse, seebResponse] = await Promise.all([
      fetch('https://services.leadconnectorhq.com/contacts/upsert', {
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
          tags: ['Implant Lead', lang === 'es' ? 'Spanish' : 'English'],
          source: 'Implants Funnel'
        }),
      }),

      fetch('https://api.seeb.ai/api/v1/webhook/outbound/6998c24d6c47d28eb827bb40', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Seeb-Secret': process.env.SEEB_AI_PASSWORD! 
        },
        body: JSON.stringify({
          parsing: "default",
          scheduledTime: new Date().toISOString(), 
          data: [{ 
            first_name: firstName, 
            last_name: lastName, 
            phone_number: cleanPhone, 
            email, 
            description: "We have a dedicated full-floor specialty office called 'Tribeca Dental Studio4Kids.' It features board-certified pediatric dentists, whimsical decor, and entertainment. We focus on 'happy visits' to prevent dental anxiety in children.",
            metadata: {
              source: "implant_funnel",
              priority: "high",
              serviceType: "pediatrics",
            }
          }]
        }),
      })
    ]);

    if (!ghlResponse.ok) console.error("GHL Sync Error:", await ghlResponse.text());
    if (!seebResponse.ok) console.error("Seeb.ai Sync Error:", await seebResponse.text());

    return NextResponse.json({ 
      success: ghlResponse.ok && seebResponse.ok,
      details: {
        crm: ghlResponse.ok,
        ai_outbound: seebResponse.ok
      }
    });

  } catch (error) {
    console.error("Critical API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}