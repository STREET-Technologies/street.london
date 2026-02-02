import { NextRequest, NextResponse } from 'next/server';
import { submitToAirtable, TABLES } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Build fields object with only provided values
    const fields: Record<string, string> = {
      Name: data.name || '',
      Email: data.email || '',
    };

    // Add optional fields if provided
    if (data.postcode) fields['Postcode'] = data.postcode;
    if (data.phone) fields['Phone'] = data.phone;
    if (data.stores) fields['Top Stores'] = data.stores;
    if (data.referredBy) fields['Referred By'] = data.referredBy;

    const result = await submitToAirtable(TABLES.WAITLIST, fields);

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
