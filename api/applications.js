// Returns all stored applications as JSON, for the private admin page.
// Protected by a secret key you set in Vercel:  ADMIN_KEY
// Called as:  /api/applications?key=YOUR_SECRET

import { list } from '@vercel/blob';

export const config = { runtime: 'edge' };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export default async function handler(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';

  if (!process.env.ADMIN_KEY) {
    return json({ error: 'ADMIN_KEY is not configured on the server.' }, 500);
  }
  if (key !== process.env.ADMIN_KEY) {
    return json({ error: 'Unauthorized' }, 401);
  }

  try {
    const { blobs } = await list({ prefix: 'applications/' });
    const recordBlobs = blobs.filter((b) => b.pathname.endsWith('record.json'));

    const records = await Promise.all(
      recordBlobs.map(async (b) => {
        try {
          const res = await fetch(b.url);
          return await res.json();
        } catch {
          return null;
        }
      })
    );

    const data = records
      .filter(Boolean)
      .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));

    return json({ count: data.length, applications: data });
  } catch (err) {
    console.error('List applications error:', err);
    return json({ error: 'Could not load applications.' }, 500);
  }
}
