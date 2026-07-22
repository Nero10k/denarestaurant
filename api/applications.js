// Returns all stored applications as JSON, for the private admin page.
// Classic Vercel Node.js (req, res) function.
// Protected by a secret key you set in Vercel:  ADMIN_KEY
// Called as:  /api/applications?key=YOUR_SECRET

import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const key = (req.query && req.query.key) || '';

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ error: 'ADMIN_KEY is not configured on the server.' });
  }
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { blobs } = await list({ prefix: 'applications/' });
    const recordBlobs = blobs.filter((b) => b.pathname.endsWith('record.json'));

    const records = await Promise.all(
      recordBlobs.map(async (b) => {
        try {
          const r = await fetch(b.url);
          return await r.json();
        } catch {
          return null;
        }
      })
    );

    const data = records
      .filter(Boolean)
      .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));

    return res.status(200).json({ count: data.length, applications: data });
  } catch (err) {
    console.error('List applications error:', err);
    return res.status(500).json({ error: 'Could not load applications.' });
  }
}
