import { NextRequest, NextResponse } from 'next/server';
import { submitToAirtable, TABLES } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await submitToAirtable(TABLES.CONTACT, {
      Name: data.name,
      Email: data.email,
      Message: data.message,
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
