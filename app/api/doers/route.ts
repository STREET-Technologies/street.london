import { NextRequest, NextResponse } from 'next/server';
import { submitToAirtable, TABLES } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await submitToAirtable(TABLES.DOERS, {
      Name: data.name,
      Postcode: data.postcode,
      Email: data.email,
      Phone: data.phone,
      Age: data.age,
      'Social Handles': data.socialHandles || '',
      'Referral Source': data.referralSource || '',
      'Communication Channels': data.communicationChannels.join(', '),
      Motivation: data.motivation,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
