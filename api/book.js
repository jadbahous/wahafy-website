/* ==========================================================================
   POST /api/book
   Body: { start, end, name, phone, note }
   Proxies to the Google Apps Script Web App (LEAD_WEBHOOK_URL) with
   action:"book" — creates a real calendar event for the chosen slot and
   logs the booking as a lead in the same sheet as everything else. The
   Apps Script re-checks the slot is still free right before creating the
   event, so a race with another visitor booking the same slot is caught
   server-side, not just in the UI.
   ========================================================================== */
import { CLIENT_ID } from './_business.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  if (!body.start || !body.end || !body.name || !body.phone) {
    res.status(400).json({ error: 'start, end, name, and phone are required' });
    return;
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    res.status(500).json({ error: 'Server not configured' });
    return;
  }

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        action: 'book',
        clientId: CLIENT_ID,
        start: body.start,
        end: body.end,
        name: body.name,
        phone: body.phone,
        note: body.note || '',
      }),
    });
    const data = await upstream.json();
    res.status(upstream.ok ? 200 : 502).json(data);
  } catch (err) {
    console.error('book proxy failed:', err);
    res.status(502).json({ ok: false, error: 'Could not complete booking' });
  }
}
