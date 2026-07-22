// Deletes one application (its CV + record) from Vercel Blob storage.
// Classic Vercel Node.js (req, res) function.
// Protected by ADMIN_KEY. Called as POST /api/delete  with JSON { key, id }.

import { list, del } from '@vercel/blob';

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ error: 'ADMIN_KEY is not configured on the server.' });
  }
  if (str(body.key) !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Only allow safe id characters (UUIDs are hex + dashes) to prevent path traversal.
  const id = str(body.id).replace(/[^a-zA-Z0-9-]/g, '');
  if (!id) {
    return res.status(400).json({ error: 'Missing application id.' });
  }

  try {
    // Remove every blob stored under this application's folder (CV + record.json).
    const { blobs } = await list({ prefix: `applications/${id}/` });
    if (!blobs.length) {
      return res.status(404).json({ error: 'Application not found.' });
    }
    await del(blobs.map((b) => b.url));
    return res.status(200).json({ ok: true, deleted: blobs.length });
  } catch (err) {
    console.error('Delete application error:', err);
    return res.status(500).json({ error: 'Could not delete the application.' });
  }
}
