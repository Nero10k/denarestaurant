// Careers application handler for DENA's.
// Receives the form + CV file and stores everything in Vercel Blob (your own storage).
// Runs on the Edge runtime (native Request/Response + multipart formData support).
//
// Required env var (auto-added when you create a Blob store with a read-write token):
//   BLOB_READ_WRITE_TOKEN

import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

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
    const id = crypto.randomUUID();
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

    return json({ ok: true });
  } catch (err) {
    console.error('Application handler error:', err);
    return json({ error: 'Something went wrong on our end. Please try again in a moment.' }, 500);
  }
}
