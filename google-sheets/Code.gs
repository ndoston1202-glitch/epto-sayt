/**
 * EPRO sayt arizalari -> Google Sheets + Gmail
 *
 * Saytdagi "Bepul konsultatsiya" formasi shu skriptga POST so'rov yuboradi.
 * Skript har bir arizani jadvalga yangi qator qilib yozadi va
 * skript egasining Gmail manziliga xat yuboradi.
 */

// Skript jadval ichidan (Kengaytmalar → Apps Script) ochilgan bo'lsa, bo'sh qoldiring.
// Alohida yaratilgan bo'lsa, jadval ID sini yozing: docs.google.com/spreadsheets/d/<ID>/edit
const SHEET_ID = ''
const SHEET_NAME = 'Arizalar'
const HEADERS = ['Sana', 'Ism', 'Telefon', 'Kompaniya', 'Til', 'Holat', 'Manba', 'Reklama']
// Xat boshqa manzilga ham borsin desangiz, shu yerga vergul bilan yozing
const EXTRA_EMAILS = ''

function doPost(e) {
  const p = (e && e.parameter) || {}

  // Bot himoyasi: yashirin maydon to'ldirilgan bo'lsa, e'tiborsiz qoldiramiz
  if (p['bot-field']) return ok()

  const name = clean(p.name)
  const phone = clean(p.phone)
  if (!name || !phone) return ok()

  const company = clean(p.company)
  const lang = clean(p.language)
  const source = clean(p.source)
  const utm = clean(p.utm)
  const date = Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm')

  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const sheet = getSheet()
    // "'" belgisi qiymatni matn sifatida saqlaydi (+998... formula bo'lib qolmasligi uchun)
    sheet.appendRow([date, txt(name), txt(phone), txt(company), lang, 'Yangi', txt(source), txt(utm)])
  } finally {
    lock.releaseLock()
  }

  sendMail({ date, name, phone, company, lang, source, utm })
  return ok()
}

// Brauzerda URL ochilganda ishlayotganini ko'rsatadi
function doGet() {
  return ContentService.createTextOutput('EPRO arizalar skripti ishlayapti')
}

function getSpreadsheet() {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet()
  if (!ss) throw new Error('Jadval topilmadi: SHEET_ID ga jadval ID sini yozing')
  return ss
}

function getSheet() {
  const ss = getSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  // Sarlavhalar: yangi varaqda yoziladi, eski varaqda yetishmayotgan ustunlar qo'shiladi
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() < HEADERS.length) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#eaf1ff')
    sheet.setFrozenRows(1)
  }
  return sheet
}

function sendMail(d) {
  const owner = Session.getEffectiveUser().getEmail()
  const to = [owner, EXTRA_EMAILS].filter(String).join(',')
  const sheetUrl = getSpreadsheet().getUrl()
  const row = (k, v) =>
    '<tr><td style="padding:6px 12px;color:#666">' + k + '</td><td style="padding:6px 12px"><b>' + esc(v || '—') + '</b></td></tr>'

  MailApp.sendEmail({
    to: to,
    subject: 'EPRO: yangi ariza — ' + d.name,
    htmlBody:
      '<h2 style="color:#0a4dff;font-family:sans-serif">Yangi ariza</h2>' +
      '<table style="font-family:sans-serif;font-size:15px">' +
      row('Sana', d.date) +
      row('Ism', d.name) +
      row('Telefon', d.phone) +
      row('Kompaniya', d.company) +
      row('Til', d.lang) +
      row('Manba', d.source) +
      row('Reklama', d.utm) +
      '</table>' +
      '<p style="font-family:sans-serif"><a href="' + sheetUrl + '">Barcha arizalar jadvali</a></p>',
  })
}

function clean(v) {
  return String(v || '').trim().slice(0, 200)
}
function txt(v) {
  return v ? "'" + v : ''
}
function esc(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}
function ok() {
  return ContentService.createTextOutput('ok')
}

// Sinov uchun: Apps Script muharririda shu funksiyani ishga tushiring
function testLead() {
  doPost({ parameter: { name: 'Sinov', phone: '+998 90 000 00 00', company: 'Test MChJ', language: 'uz' } })
}
