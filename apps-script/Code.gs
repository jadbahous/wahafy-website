/**
 * Marhab website — lead backend, Google Apps Script Web App.
 * Receives leads from the "Book a free demo" form and from the on-site AI
 * reception, appends them to a "Leads" sheet, and emails the owner.
 * Paste this whole file into Extensions > Apps Script on a Google Sheet,
 * then deploy as a Web App (see README.md in this folder for the steps).
 */

// Inbox that should receive enquiry notifications.
var ownerEmail = 'jad@marhab.agency';

var HEADERS = ['Time', 'Business', 'Business type', 'Name', 'Phone', 'Email', 'Website / Instagram', 'Note', 'Source'];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Bad JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    data.time || new Date().toISOString(),
    data.clientId || '',
    data.businessType || '',
    data.name || '',
    data.phone || '',
    data.email || '',
    data.website || '',
    data.note || '',
    data.source || ''
  ]);

  var subject = 'Marhab enquiry: ' + (data.name || 'Unknown') +
    (data.clientId ? ' (' + data.clientId + ')' : '') +
    (data.source === 'chat' ? ' — via chat' : '');
  var body =
    'New enquiry from the Marhab website.\n\n' +
    'Business: ' + (data.clientId || '') + '\n' +
    'Business type: ' + (data.businessType || '') + '\n' +
    'Name: ' + (data.name || '') + '\n' +
    'Phone / WhatsApp: ' + (data.phone || '') + '\n' +
    'Email: ' + (data.email || '') + '\n' +
    'Website / Instagram: ' + (data.website || '') + '\n' +
    'Message: ' + (data.note || '') + '\n' +
    'Source: ' + (data.source || '') + '\n' +
    'Time: ' + (data.time || '') + '\n';

  try {
    MailApp.sendEmail(ownerEmail, subject, body);
  } catch (err) {
    // Row is already saved even if the email fails — don't block on it.
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you sanity-check the deployed URL by opening it in a browser.
function doGet(e) {
  return ContentService.createTextOutput('Marhab lead endpoint is live.');
}
