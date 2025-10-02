# Airtable Setup Guide (Easy CSV Import Method)

## Step 1: Create Airtable Account
1. Go to [airtable.com](https://airtable.com) and sign up (free)
2. Create a new workspace called "STREET"

## Step 2: Import CSV Templates
For each form, create a table by importing the CSV:

1. Click "Add a base" → "Import a spreadsheet"
2. Upload the CSV from `airtable-templates/` folder:
   - `waitlist.csv` → Creates "Waitlist" table
   - `retailers.csv` → Creates "Retailers" table
   - `riders.csv` → Creates "Riders" table
   - `doers.csv` → Creates "Doers" table
   - `contact.csv` → Creates "Contact" table

**That's it!** All fields are automatically created with the correct names.

## Step 3: Get API Credentials

### Get API Key:
1. Click your profile icon (top right)
2. Go to "Developer Hub"
3. Click "Create token"
4. Name it "STREET Website"
5. Give it access to your base
6. Add scopes: `data.records:read` and `data.records:write`
7. Copy the token

### Get Base ID:
1. Go to [airtable.com/api](https://airtable.com/api)
2. Click your base
3. The Base ID is in the introduction section or URL

## Step 4: Configure Environment Variables
Create a `.env.local` file:

```env
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

## Step 5: Done! 🎉

All form submissions will automatically go to Airtable where you can:
- ✅ View in a beautiful spreadsheet interface
- ✅ Filter, sort, and search submissions
- ✅ Export to CSV anytime
- ✅ Create custom views (by date, status, etc.)
- ✅ Set up automations (email notifications, Slack alerts, etc.)
- ✅ Share with your team

## Field Types Reference

If you want to customize field types in Airtable after import:

- **Email fields** → Change to "Email" type for click-to-email
- **Phone fields** → Change to "Phone number" type for click-to-call
- **Submitted At** → Change to "Date & time" type
- **Multiple Locations** → Change to "Single select" with options: Yes, No
- **Ride Type** → Change to "Single select" with options: Bike, Scooter, Car
- **Age** → Change to "Number" type
- **Message/Motivation** → Change to "Long text" type
