import { NextRequest, NextResponse } from 'next/server';
import { submitToAirtable, TABLES } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await submitToAirtable(TABLES.RETAILERS, {
      'First Name': data.firstName,
      'Last Name': data.lastName,
      'Shop Name': data.shopName,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      Website: data.website || '',
      Categories: data.categories.join(', '),
      'Multiple Locations': data.multipleLocations,
      'Inventory System': data.inventorySystem || '',
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
