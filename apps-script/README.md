# Lead sheet + email notifier (Google Apps Script)

Backs the "Get my free demo" form on the Wahafy site. Free, no API key, runs
entirely under your own Google account.

## One-time setup (about 5 minutes)

1. Go to **sheets.google.com** and create a new blank spreadsheet. Name it
   something like `Wahafy — Leads`.
2. In the sheet, go to **Extensions → Apps Script**. A new tab opens with a
   code editor.
3. Delete the placeholder code in `Code.gs` and paste in the contents of
   `Code.gs` from this folder.
4. Click **Deploy → New deployment**. Click the gear icon next to
   "Select type" and choose **Web app**.
   - Description: `wahafy lead endpoint`
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**. The first time, Google will ask you to authorize the
   script — click through the "Google hasn't verified this app" warning
   (it's your own script, this is expected) and allow it.
6. Copy the **Web app URL** it gives you (ends in `/exec`). That's your
   `LEAD_WEBHOOK_URL`.
7. Add that URL as an environment variable in Vercel: Project → Settings →
   Environment Variables → new variable named `LEAD_WEBHOOK_URL`, value is
   the URL you copied. Redeploy after adding it.

## Testing it

Once deployed, every submitted enquiry adds a row to a `Leads` tab in the
sheet (created automatically on first use) and emails jad.bahous@gmail.com.
If a submission doesn't show up, check the Apps Script "Executions" log
(left sidebar in the Apps Script editor) for errors.
