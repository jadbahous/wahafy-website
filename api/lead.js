/* ==========================================================================
   POST /api/lead
   Body: { name, clientId (business name), phone, note, source }
   Backs the "Get my free demo" form on the Wahafy site itself.
   ========================================================================== */
var saveLead = require('./_lead.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  var body = req.body || {};
  if (!body.name || !body.phone) {
    res.status(400).json({ error: 'Name and phone are required' });
    return;
  }

  var ok = await saveLead({
    clientId: body.clientId,
    name: body.name,
    phone: body.phone,
    note: body.note,
    source: body.source || 'website-form'
  });

  res.status(ok ? 200 : 502).json({ ok: ok });
};
