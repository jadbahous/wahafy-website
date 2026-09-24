/* ==========================================================================
   GET /api/availability?days=10
   Proxies to the Google Apps Script Web App (LEAD_WEBHOOK_URL) to fetch
   real free call slots from Jad's calendar. Responses are cached briefly
   at the edge so opening the booking card is fast after the first hit —
   a booking doesn't invalidate this cache on purpose; /api/book re-checks
   the calendar for conflicts itself right before creating the event.
   ========================================================================== */
const UPSTREAM_TIMEOUT_MS = 25000;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    res.status(500).json({ error: 'Server not configured' });
    return;
  }

  const days = req.query && req.query.days ? String(req.query.days) : '10';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${url}?action=availability&days=${encodeURIComponent(days)}`, {
      signal: controller.signal,
    });
    const data = await upstream.json();
    if (upstream.ok && data && data.ok) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
    res.status(upstream.ok ? 200 : 502).json(data);
  } catch (err) {
    console.error('availability proxy failed:', err && err.name === 'AbortError' ? 'upstream timeout' : err);
    res.setHeader('Cache-Control', 'no-store');
    res.status(504).json({ ok: false, error: 'Could not load availability' });
  } finally {
    clearTimeout(timer);
  }
}
