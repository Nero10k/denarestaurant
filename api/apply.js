// Careers application handler for DENA's.
// Classic Vercel Node.js (req, res) function. The browser sends the CV as a
// base64 data URL inside a JSON body (auto-parsed by Vercel), which we decode
// and store — together with the application details — in Vercel Blob storage.
//
// Required env var (auto-added when you create a Blob store with a read-write token):
//   BLOB_READ_WRITE_TOKEN

import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB decoded (base64 inflates ~33%; keeps us under the 4.5 MB body limit)

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel parses JSON bodies automatically; guard in case it arrives as a string.
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    // Honeypot: silently accept spam bots without storing anything.
    if (str(body._honey)) {
      return res.status(200).json({ ok: true });
    }

    const fields = {
      firstName: str(body.firstName),
      lastName: str(body.lastName),
      email: str(body.email),
      phone: str(body.phone),
      role: str(body.role),
      availability: str(body.availability),
      languages: str(body.languages),
      age: str(body.age),
      message: str(body.message),
    };

    if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone) {
      return res.status(400).json({ error: 'Please fill in your name, email and phone.' });
    }

    const rawB64 = str(body.cvBase64);
    if (!rawB64) {
      return res.status(400).json({ error: 'Please attach your CV.' });
    }
    // Strip a possible "data:...;base64," prefix.
    const comma = rawB64.indexOf(',');
    const b64 = rawB64.startsWith('data:') && comma !== -1 ? rawB64.slice(comma + 1) : rawB64;
    const buffer = Buffer.from(b64, 'base64');

    if (!buffer.length) {
      return res.status(400).json({ error: 'The uploaded CV file is empty.' });
    }
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: 'That file is too large. Please keep your CV under 3 MB.' });
    }

    // Cryptographically random id → the CV lives at an unguessable URL.
    const id = randomUUID();
    const ext = (str(body.cvName).split('.').pop() || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '') || 'pdf';

    // Store the CV file (generic filename — no personal data in the URL).
    const cvBlob = await put(`applications/${id}/cv.${ext}`, buffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType: str(body.cvType) || 'application/octet-stream',
    });

    // Store the application record alongside it.
    const record = {
      id,
      ...fields,
      cvUrl: cvBlob.url,
      cvFileName: str(body.cvName) || `cv.${ext}`,
      cvSize: buffer.length,
      submittedAt: new Date().toISOString(),
    };
    await put(`applications/${id}/record.json`, JSON.stringify(record, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Application handler error:', err);
    return res.status(500).json({ error: 'Something went wrong on our end. Please try again in a moment.' });
  }
}
