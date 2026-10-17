/**
 * Sixty Leads CRM: receives leads from sixty.devmatesolutions.com and saves them in the "Leads" tab.
 *
 * Install (once), in the Sixty Leads CRM sheet:
 *   Extensions > Apps Script > replace everything with this file > Save
 *   Deploy > New deployment > type "Web app"
 *     Execute as: Me (desigeek0007@gmail.com)   Who has access: Anyone
 *   Deploy > authorize > copy the Web app URL (ends in /exec) into the website's CRM_SHEET_URL.
 *
 * Each request carries a shared key and a record_id. A row with the same Record ID is updated
 * (so one chat or call stays one row); otherwise a new row is added. Only non-empty fields are
 * written, so the sales team's own columns (Sales status, Owner, Notes) are never touched.
 */

const SECRET = 'PASTE_CRM_WEBHOOK_SECRET_HERE'; // must match CRM_WEBHOOK_SECRET on the website (see .env)
const TAB = 'Leads';

// Sheet header -> field name sent by the website
const FIELDS = {
  'Received': 'received',
  'Channel': 'channel',
  'Name': 'name',
  'Company': 'company',
  'Email': 'email',
  'WhatsApp / phone': 'phone',
  'Location': 'location',
  'Industry': 'industry',
  'Interested in': 'interest',
  'What they asked about': 'asked',
  'Lead sources': 'lead_sources',
  'Leads per month': 'monthly_leads',
  'Current CRM': 'crm',
  'Main pain': 'pain',
  'Preferred contact': 'contact_pref',
  'Demo meeting': 'meeting_time',
  'AI stage': 'stage',
  'Next step': 'next_step',
  'Record ID': 'record_id',
};
// Kept from the first time a lead was seen
const FIRST_ONLY = { 'Received': true, 'Channel': true };

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return reply({ ok: false, error: 'Bad JSON' });
  }
  if (data.key !== SECRET) return reply({ ok: false, error: 'Unauthorized' });
  if (!data.record_id) return reply({ ok: false, error: 'Missing record_id' });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
    const width = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, width).getValues()[0];
    const idCol = headers.indexOf('Record ID');
    const lastRow = sheet.getLastRow();

    // Find the existing row for this record, if any
    let rowNum = 0;
    if (idCol >= 0 && lastRow > 1) {
      const ids = sheet.getRange(2, idCol + 1, lastRow - 1, 1).getDisplayValues();
      for (let i = 0; i < ids.length; i++) {
        if (ids[i][0] === String(data.record_id)) { rowNum = i + 2; break; }
      }
    }
    const isNew = rowNum === 0;
    if (isNew) rowNum = lastRow + 1;

    // Write field by field, only where the website sent a value
    headers.forEach(function (header, i) {
      const key = FIELDS[header];
      if (!key) return;
      const value = data[key];
      if (value === undefined || value === null || String(value).trim() === '') return;
      if (!isNew && FIRST_ONLY[header] && sheet.getRange(rowNum, i + 1).getDisplayValue() !== '') return;
      sheet.getRange(rowNum, i + 1).setValue(value);
    });

    return reply({ ok: true, row: rowNum, created: isNew });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the URL in a browser to check it's deployed
function doGet() {
  return reply({ ok: true, service: 'Sixty Leads CRM' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
