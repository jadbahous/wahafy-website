/* ==========================================================================
   Shared lead-saving helper. Forwards a captured lead to the Google Apps
   Script Web App URL (stored as the LEAD_WEBHOOK_URL environment variable),
   which appends it to the Marhab "Leads" Google Sheet and emails Jad.
   ========================================================================== */
export default async function saveLead(lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.error('LEAD_WEBHOOK_URL is not set — lead was not saved:', lead);
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        clientId: lead.clientId || 'marhab',
        businessType: lead.businessType || '',
        name: lead.name || '',
        phone: lead.phone || '',
        email: lead.email || '',
        website: lead.website || '',
        note: lead.note || '',
        source: lead.source || 'website-form',
        time: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('saveLead failed:', err);
    return false;
  }
}
