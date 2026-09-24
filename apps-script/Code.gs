/**
 * Marhab website — lead + booking backend, Google Apps Script Web App.
 * Receives leads from the "Book a free demo" form and from the on-site AI
 * reception, appends them to a "Leads" sheet, and emails the owner.
 * Also reports free/busy call slots (doGet ?action=availability) and books
 * a chosen slot as a real calendar event (doPost action:"book").
 * Paste this whole file into Extensions > Apps Script on a Google Sheet,
 * then deploy as a Web App (see README.md in this folder for the steps).
 */

// Inbox that should receive enquiry + booking notifications.
var ownerEmail = 'jad@marhab.agency';

var HEADERS = ['Time', 'Business', 'Business type', 'Name', 'Phone', 'Email', 'Website / Instagram', 'Note', 'Source'];

/* ── Booking config ──────────────────────────────────────────────
   Demo calls are booked onto their own calendar (kept separate from
   Jad's personal events), but availability is checked against BOTH
   that calendar and his primary one, so a slot is only ever offered
   if it's genuinely free on both. ── */
var demoCalendarName = 'Marhab Demo Calls';
var timezone = 'Asia/Qatar';
var slotMinutes = 20; // matches "A 20-minute call" on the Contact page
var lookaheadDays = 10;

// Qatar business week: Sunday–Thursday. Friday/Saturday offer no slots.
// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
function getBusinessHoursForDay(dayOfWeek) {
  if (dayOfWeek === 5 || dayOfWeek === 6) return null;
  return { start: 10, end: 18 };
}

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'Bad JSON' });
  }

  if (data.action === 'book') {
    return handleBook(data);
  }
  return handleLead(data);
}

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'availability') {
    return handleAvailability(e);
  }
  // Lets you sanity-check the deployed URL by opening it in a browser.
  return ContentService.createTextOutput('Marhab lead endpoint is live.');
}

/* ── Leads (plain, non-booking) ──────────────────────────────────── */
function handleLead(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
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

  notifyOwner(subject, body);

  return jsonOutput({ ok: true });
}

/* ── Availability ─────────────────────────────────────────────────
   One calendar query per calendar for the whole window, then overlap
   checks in memory (querying per slot was far slower and hit quota
   limits fast). Busy ranges are the union of the primary calendar
   (so demo calls never collide with Jad's real life) and the demo
   calendar itself (so two visitors can't grab the same call time). ── */
function handleAvailability(e) {
  var days = parseInt((e.parameter && e.parameter.days) || String(lookaheadDays), 10);
  if (!(days > 0) || days > 31) days = lookaheadDays;

  var now = new Date();
  var windowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  var windowEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, 0, 0, 0);
  var busyRanges = getBusyRanges(windowStart, windowEnd);

  function isBusy(startMs, endMs) {
    for (var i = 0; i < busyRanges.length; i++) {
      if (busyRanges[i].s < endMs && busyRanges[i].e > startMs) return true;
    }
    return false;
  }

  var result = [];
  for (var d = 0; d < days; d++) {
    var day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d);
    var hours = getBusinessHoursForDay(day.getDay());
    if (!hours) continue; // Friday / Saturday — no calls offered

    var slots = [];
    var slotStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours.start, 0, 0);
    var dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours.end, 0, 0);

    while (slotStart < dayEnd) {
      var slotEnd = new Date(slotStart.getTime() + slotMinutes * 60000);
      if (slotStart > now) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          label: Utilities.formatDate(slotStart, timezone, 'h:mm a'),
          available: !isBusy(slotStart.getTime(), slotEnd.getTime())
        });
      }
      slotStart = slotEnd;
    }

    if (slots.length > 0) {
      result.push({
        date: Utilities.formatDate(day, timezone, 'yyyy-MM-dd'),
        dateLabel: Utilities.formatDate(day, timezone, 'EEE, MMM d'),
        slots: slots
      });
    }
  }

  return jsonOutput({ ok: true, days: result });
}

/* ── Booking ──────────────────────────────────────────────────────── */
function handleBook(data) {
  if (!data.start || !data.end || !data.name || !data.phone) {
    return jsonOutput({ ok: false, error: 'Missing start, end, name, or phone' });
  }

  var start = new Date(data.start);
  var end = new Date(data.end);

  // Re-check right before booking to avoid a race with someone else grabbing
  // the same slot between the visitor loading the calendar and confirming.
  var busyRanges = getBusyRanges(start, end);
  var conflict = busyRanges.some(function (r) { return r.s < end.getTime() && r.e > start.getTime(); });
  if (conflict) {
    return jsonOutput({ ok: false, error: 'That time was just taken — please pick another.' });
  }

  var title = 'Marhab demo call — ' + data.name;
  var description =
    'Name: ' + (data.name || '') + '\n' +
    'Phone: ' + (data.phone || '') + '\n' +
    'Business: ' + (data.clientId || '') + '\n' +
    'Note: ' + (data.note || '') + '\n' +
    'Booked via marhab.agency chat.';

  getDemoCalendar().createEvent(title, start, end, { description: description });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([
    new Date().toISOString(),
    data.clientId || 'marhab',
    '',
    data.name || '',
    data.phone || '',
    '',
    '',
    'Booked: ' + Utilities.formatDate(start, timezone, 'EEE MMM d, h:mm a'),
    'booking'
  ]);

  notifyOwner(
    'New demo call booked: ' + data.name,
    'A visitor booked a call on marhab.agency.\n\n' +
      'Name: ' + (data.name || '') + '\n' +
      'Phone: ' + (data.phone || '') + '\n' +
      'When: ' + Utilities.formatDate(start, timezone, 'EEE MMM d, h:mm a') + ' (Doha time)\n' +
      'Note: ' + (data.note || '') + '\n'
  );

  return jsonOutput({ ok: true });
}

/* ── Shared helpers ──────────────────────────────────────────────── */

// Busy time ranges (ms since epoch) across the primary calendar and the
// demo-calls calendar, merged. Skips all-day events (out-of-office style
// markers shouldn't block a whole day of call slots).
function getBusyRanges(start, end) {
  var ranges = [];
  [CalendarApp.getDefaultCalendar(), getDemoCalendar()].forEach(function (cal) {
    cal.getEvents(start, end)
      .filter(function (ev) { return !ev.isAllDayEvent(); })
      .forEach(function (ev) {
        ranges.push({ s: ev.getStartTime().getTime(), e: ev.getEndTime().getTime() });
      });
  });
  return ranges;
}

// Finds the dedicated demo-calls calendar, creating it the first time
// this runs so no manual setup is needed in Google Calendar itself.
function getDemoCalendar() {
  var existing = CalendarApp.getCalendarsByName(demoCalendarName);
  if (existing.length > 0) return existing[0];
  return CalendarApp.createCalendar(demoCalendarName);
}

function notifyOwner(subject, body) {
  try {
    MailApp.sendEmail(ownerEmail, subject, body);
  } catch (err) {
    // Row is already saved even if the email fails — don't block on it.
  }
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
