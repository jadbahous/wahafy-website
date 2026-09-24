/* ==========================================================================
   POST /api/chat
   Body: { messages: [{ role: 'user'|'assistant', content }] }
   Proxies to the Claude API — the key lives only here, server-side.
   If the reply carries a [[LEAD ...]] marker, the lead is saved to the
   Sheet via _lead.js and the marker is stripped before the reply goes back.
   Env vars needed on Vercel: ANTHROPIC_API_KEY, LEAD_WEBHOOK_URL.
   ========================================================================== */
import saveLead from './_lead.js';
import { CLIENT_ID, SYSTEM_PROMPT } from './_business.js';

const LEAD_RE = /\[\[LEAD\s+name="([^"]*)"\s+phone="([^"]*)"\s+note="([^"]*)"\]\]/;
const SHOW_CALENDAR_RE = /\[\[SHOW_CALENDAR\]\]/;
const MODEL = 'claude-haiku-4-5-20251001';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'No messages' });
      return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Server not configured' });
      return;
    }

    // Keep the payload small: last 16 turns, 2000 chars each, valid roles only.
    const trimmed = messages.slice(-16).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000),
    }));
    // The API requires the conversation to start with a user turn.
    while (trimmed.length && trimmed[0].role !== 'user') trimmed.shift();
    if (!trimmed.length) {
      res.status(400).json({ error: 'No user message' });
      return;
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!upstream.ok) {
      console.error('Anthropic error', upstream.status, await upstream.text());
      res.status(502).json({ error: 'Upstream error' });
      return;
    }

    const data = await upstream.json();
    let reply =
      (data.content && data.content[0] && data.content[0].text) || 'Sorry, could you say that again?';

    const showCalendar = SHOW_CALENDAR_RE.test(reply);
    if (showCalendar) {
      reply = reply.replace(SHOW_CALENDAR_RE, '').trim();
    }

    let leadCaptured = false;
    const m = reply.match(LEAD_RE);
    if (m) {
      reply = reply.replace(LEAD_RE, '').trim();
      leadCaptured = await saveLead({
        clientId: CLIENT_ID,
        name: m[1],
        phone: m[2],
        note: m[3],
        source: 'chat',
      });
    }

    res.status(200).json({ reply, leadCaptured, showCalendar });
  } catch (err) {
    console.error('chat handler error', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
