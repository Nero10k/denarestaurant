// Careers application handler for DENA's.
// Receives the form + CV file, stores everything in Vercel Blob (your own storage),
// and optionally emails you a notification if SMTP env vars are set.
//
// Required env var (auto-added when you create a Blob store in Vercel):
//   BLOB_READ_WRITE_TOKEN
//
// Optional env vars for email notifications (your own mailbox's SMTP):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO

import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

export const config = { runtime: 'nodejs' };

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (serverless request body limit is ~4.5 MB)

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const form = await request.formData();

    // Honeypot: silently accept spam bots without storing anything.
    if (str(form.get('_honey'))) {
      return json({ ok: true });
    }

    const fields = {
      firstName: str(form.get('firstName')),
      lastName: str(form.get('lastName')),
      email: str(form.get('email')),
      phone: str(form.get('phone')),
      role: str(form.get('role')),
      availability: str(form.get('availability')),
      age: str(form.get('age')),
      message: str(form.get('message')),
    };

    if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone) {
      return json({ error: 'Please fill in your name, email and phone.' }, 400);
    }

    const file = form.get('cv');
    if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') {
      return json({ error: 'Please attach your CV.' }, 400);
    }
    if (file.size === 0) {
      return json({ error: 'The uploaded CV file is empty.' }, 400);
    }
    if (file.size > MAX_BYTES) {
      return json({ error: 'That file is too large. Please keep your CV under 4 MB.' }, 413);
    }

    // Cryptographically random id → the CV lives at an unguessable URL.
    const id = randomUUID();
    const ext = (file.name.split('.').pop() || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '') || 'pdf';

    // Store the CV file itself (generic filename — no personal data in the URL).
    const cvBlob = await put(`applications/${id}/cv.${ext}`, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type || 'application/octet-stream',
    });

    // Store the application record alongside it.
    const record = {
      id,
      ...fields,
      cvUrl: cvBlob.url,
      cvFileName: file.name,
      cvSize: file.size,
      submittedAt: new Date().toISOString(),
    };
    await put(`applications/${id}/record.json`, JSON.stringify(record, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    // Fire-and-forget email notification (only if SMTP is configured).
    try {
      await notify(record);
    } catch (err) {
      console.error('Notification email failed:', err);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Application handler error:', err);
    return json({ error: 'Something went wrong on our end. Please try again in a moment.' }, 500);
  }
}

async function notify(record) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return; // Not configured — skip silently.

  const nodemailer = (await import('nodemailer')).default;
  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `New job application from the DENA's careers page:`,
    ``,
    `Name:         ${record.firstName} ${record.lastName}`,
    `Email:        ${record.email}`,
    `Phone:        ${record.phone}`,
    `Role:         ${record.role || '-'}`,
    `Availability: ${record.availability || '-'}`,
    `Age:          ${record.age || '-'}`,
    ``,
    `Message:`,
    record.message || '(none)',
    ``,
    `CV: ${record.cvUrl}`,
    ``,
    `Submitted: ${record.submittedAt}`,
  ];

  await transporter.sendMail({
    from: `"DENA's Careers" <${SMTP_USER}>`,
    to: NOTIFY_TO || 'info@dena-restaurant.com',
    replyTo: record.email,
    subject: `New job application: ${record.firstName} ${record.lastName}`,
    text: lines.join('\n'),
  });
}
