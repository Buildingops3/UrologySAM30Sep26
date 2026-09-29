/**
 * EVA Pharma Saudi | Urology SAM Survey
 * Final-submission tracking only.
 *
 * One row per submitted respondent in the Responses sheet.
 * No Events sheet and no pre-submission activity tracking.
 *
 * Setup:
 * 1) Open the target Google Sheet.
 * 2) Extensions > Apps Script.
 * 3) Paste this file and Save.
 * 4) Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5) Use the /exec URL in index.html (already filled in for the URL supplied).
 */

const HEADERS = [
  'Timestamp',
  'Session ID',
  'First Name',
  'Last Name',
  'Email',
  'Mobile Number',
  'Region',
  'Consent',
  'Scientific Agenda Rating',
  'Overall Program Rating',
  'Preferred Next SAM Location',
  'Future SAM Improvements',
  'WhatsApp Clicked',
  'WhatsApp Clicked At',
  'Submitted At'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.session_id) throw new Error('Missing session_id');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = getResponsesSheet_(ss);
    const lastRow = sh.getLastRow();
    const ids = lastRow > 1
      ? sh.getRange(2, 2, lastRow - 1, 1).getValues().flat().map(String)
      : [];
    const existingIndex = ids.indexOf(String(d.session_id));

    // Preserve the original server timestamp if this is a WhatsApp update.
    let timestamp;
    if (existingIndex >= 0) {
      timestamp = sh.getRange(existingIndex + 2, 1).getValue();
    } else {
      timestamp = new Date();
    }

    const row = [
      timestamp,
      d.session_id || '',
      d.first_name || '',
      d.last_name || '',
      d.email || '',
      d.mobile || '',
      d.region === 'Other' && d.region_other ? d.region_other : (d.region || ''),
      d.consent || '',
      d.q1_scientific_agenda || '',
      d.q2_overall_program || '',
      d.q3_next_sam_location || '',
      d.q4_improvements || '',
      d.whatsapp_clicked || 'No',
      d.whatsapp_clicked_at || '',
      d.submitted_at || ''
    ];

    if (existingIndex >= 0) {
      sh.getRange(existingIndex + 2, 1, 1, HEADERS.length).setValues([row]);
    } else {
      sh.appendRow(row);
    }

    return ContentService.createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function getResponsesSheet_(ss) {
  let sh = ss.getSheetByName('Responses');
  if (!sh) sh = ss.insertSheet('Responses');

  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#7A1A6C')
      .setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
  }
  return sh;
}
