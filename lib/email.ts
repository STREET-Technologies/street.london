// Transactional email — Resend integration for marketing-site form confirmations.
// One email is sent per form submission (waitlist, retailers, rider, doers, contact).
// Failures are logged but do NOT fail the form submission — the Airtable write is
// the source of truth; an email failure shouldn't show the user an error.

import { Resend } from 'resend';

export type FormType = 'waitlist' | 'retailers' | 'rider' | 'doers' | 'contact';

type EmailContent = {
  subject: string;
  preheader: string;
  heading: string;
  body: string;
};

const CONTENT: Record<FormType, EmailContent> = {
  waitlist: {
    subject: "You're on the STREET waitlist",
    preheader: "We'll let you know the moment STREET is live in your area.",
    heading: "You're on the list.",
    body:
      "Thanks for joining the STREET waitlist. We're building the easiest way to shop London's high street, and you'll be among the first to hear when we go live in your neighbourhood.<br/><br/>" +
      "In the meantime, follow us on <a href=\"https://www.instagram.com/st.reet.app/\" style=\"color:#000;text-decoration:underline;\">Instagram</a> for updates and behind-the-scenes from the build.",
  },
  retailers: {
    subject: 'Your STREET retailer application has been received',
    preheader: 'Our team will review your application and be in touch shortly.',
    heading: 'Application received.',
    body:
      "Thanks for applying to sell on STREET. We've received your retailer application and our team will be in touch shortly to discuss next steps and get your shop onboarded.<br/><br/>" +
      "If you have any questions in the meantime, just reply to this email.",
  },
  rider: {
    subject: 'Your STREET courier application has been received',
    preheader: "We'll be in touch shortly about your courier application.",
    heading: 'Thanks for applying.',
    body:
      "We've received your application to become a STREET courier. Our team will review the details and be in touch shortly with next steps.<br/><br/>" +
      "If you have any questions in the meantime, just reply to this email.",
  },
  doers: {
    subject: 'Welcome to the STREET squad',
    preheader: "We'll be in touch about the ambassador programme.",
    heading: 'Welcome to the squad.',
    body:
      "Thanks for joining the STREET ambassador programme. We're excited to have you helping shape London's instant-delivery culture from day one.<br/><br/>" +
      "We'll be in touch shortly with details about early access, rewards, and what's coming next. Follow us on <a href=\"https://www.instagram.com/st.reet.app/\" style=\"color:#000;text-decoration:underline;\">Instagram</a> for the latest.",
  },
  contact: {
    subject: 'We got your message',
    preheader: "Thanks for reaching out — we'll respond shortly.",
    heading: 'We got your message.',
    body:
      "Thanks for getting in touch. Someone from the STREET team will read your message and respond as soon as possible — usually within one business day.<br/><br/>" +
      "If your enquiry is urgent, you can reach us directly at <a href=\"mailto:hi@street.london\" style=\"color:#000;text-decoration:underline;\">hi@street.london</a>.",
  },
};

function renderHtml({ heading, body, preheader, name }: { heading: string; body: string; preheader: string; name?: string }): string {
  const greeting = name ? `Hi ${escapeHtml(name.split(' ')[0])},` : 'Hi,';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f7f3ed;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#000;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f7f3ed;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3ed;padding:40px 20px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
        <tr>
          <td style="padding:32px 40px 0;">
            <div style="font-family:Arial Black,Helvetica,sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;color:#000;line-height:1;">STREET<span style="color:#CDFF00;">.</span></div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 8px;">
            <div style="display:inline-block;width:48px;height:4px;background:#CDFF00;border-radius:2px;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 40px 0;">
            <h1 style="margin:0;font-family:Arial Black,Helvetica,sans-serif;font-weight:900;font-size:28px;line-height:1.2;color:#000;letter-spacing:-0.01em;">${escapeHtml(heading)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 0;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333;">${greeting}</p>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#333;">${body}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 40px;">
            <p style="margin:0;font-size:16px;line-height:1.6;color:#000;font-weight:600;">— Team STREET</p>
          </td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin-top:24px;">
        <tr>
          <td align="center" style="font-size:12px;line-height:1.5;color:#666;padding:0 20px;">
            STREET Technologies &middot; 62 Sutherland Avenue, London W9 2QU<br/>
            <a href="https://street.london" style="color:#666;text-decoration:underline;">street.london</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function renderText({ heading, body, name }: { heading: string; body: string; name?: string }): string {
  const greeting = name ? `Hi ${name.split(' ')[0]},` : 'Hi,';
  const plainBody = body.replace(/<br\/?>/g, '\n').replace(/<[^>]+>/g, '');
  return `STREET\n\n${heading}\n\n${greeting}\n\n${plainBody}\n\n— Team STREET\n\n--\nSTREET Technologies\n62 Sutherland Avenue, London W9 2QU\nhttps://street.london`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const FROM = process.env.EMAIL_FROM || 'STREET <hi@street.london>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'hi@street.london';

export async function sendConfirmationEmail({
  to,
  type,
  name,
}: {
  to: string;
  type: FormType;
  name?: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API;
  if (!apiKey) {
    console.warn('[email] RESEND_API not set — skipping confirmation email');
    return { success: false, error: 'Email service not configured' };
  }

  const content = CONTENT[type];
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      replyTo: REPLY_TO,
      subject: content.subject,
      html: renderHtml({ heading: content.heading, body: content.body, preheader: content.preheader, name }),
      text: renderText({ heading: content.heading, body: content.body, name }),
    });

    if (result.error) {
      console.error('[email] Resend returned error:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('[email] Failed to send confirmation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
