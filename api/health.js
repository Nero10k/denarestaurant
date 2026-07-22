// Diagnostic probe — classic Vercel Node.js (req, res) signature, no imports.
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    style: 'node-reqres',
    hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    hasAdminKey: Boolean(process.env.ADMIN_KEY),
  });
}
