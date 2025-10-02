// Airtable form submission handler

interface AirtableRecord {
  fields: Record<string, any>;
}

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Submit to Airtable
export async function submitToAirtable(
  tableName: string,
  data: Record<string, any>
) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Airtable credentials not configured');
    return { success: false, error: 'Configuration error' };
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            ...data,
            'Submitted At': new Date().toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Airtable error:', error);
      return { success: false, error: error.error?.message || 'Submission failed' };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return { success: false, error: 'Network error' };
  }
}

// Table names
export const TABLES = {
  WAITLIST: 'Waitlist',
  RETAILERS: 'Retailers',
  RIDERS: 'Riders',
  DOERS: 'Doers',
  CONTACT: 'Contact',
};
