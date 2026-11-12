// Server endpoint: POST /api/lead
// Brauzer arizani shu yerga yuboradi. Maxfiy kalitlar faqat serverda,
// muhit o'zgaruvchilaridan (.env / Netlify Environment variables) o'qiladi
// va brauzerga hech qachon chiqmaydi.
//
//   TELEGRAM_BOT_TOKEN  — @BotFather bergan token
//   TELEGRAM_CHAT_ID    — ariza boradigan chat/guruh ID (bir nechta bo'lsa vergul bilan)
//   GOOGLE_SCRIPT_URL   — Google Apps Script veb-ilova manzili (Sheets + Gmail)

const MAX = 200
const clean = (v) => String(v ?? '').trim().slice(0, MAX)
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

async function readBody(req) {
  const type = req.headers.get('content-type') || ''
  if (type.includes('application/json')) return req.json()
  return Object.fromEntries(new URLSearchParams(await req.text()))
}

async function sendTelegram(lead) {
  const token = Netlify.env.get('TELEGRAM_BOT_TOKEN')
  const chatIds = (Netlify.env.get('TELEGRAM_CHAT_ID') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (!token || chatIds.length === 0) throw new Error('Telegram sozlanmagan (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)')

  const text = [
    '🆕 <b>EPRO: yangi ariza</b>',
    '',
    `👤 <b>Ism:</b> ${esc(lead.name)}`,
    `📞 <b>Telefon:</b> ${esc(lead.phone)}`,
    lead.company && `🏢 <b>Kompaniya:</b> ${esc(lead.company)}`,
    `🌐 <b>Til:</b> ${esc(lead.language || '—')}`,
    `🕒 ${lead.date}`,
  ]
    .filter(Boolean)
    .join('\n')

  await Promise.all(
    chatIds.map(async (chat_id) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      })
      if (!res.ok) {
        // Telegram javobidagi izohni loglaymiz — tokenni emas
        const info = await res.json().catch(() => ({}))
        throw new Error(`Telegram ${res.status}: ${info.description || 'xato'}`)
      }
    }),
  )
}

async function sendGoogle(lead) {
  const url = Netlify.env.get('GOOGLE_SCRIPT_URL')
  if (!url) throw new Error('GOOGLE_SCRIPT_URL sozlanmagan')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ name: lead.name, phone: lead.phone, company: lead.company, language: lead.language }),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`Google ${res.status}`)
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  let body
  try {
    body = await readBody(req)
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Bot himoyasi: yashirin maydon to'ldirilgan bo'lsa, jim qabul qilamiz
  if (body['bot-field']) return Response.json({ ok: true })

  const lead = {
    name: clean(body.name),
    phone: clean(body.phone),
    company: clean(body.company),
    language: clean(body.language),
    date: new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' }),
  }
  if (!lead.name || lead.phone.replace(/\D/g, '').length < 7) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const [tg, google] = await Promise.allSettled([sendTelegram(lead), sendGoogle(lead)])
  if (tg.status === 'rejected') console.error('Telegram:', tg.reason?.message)
  if (google.status === 'rejected') console.error('Google:', google.reason?.message)

  const ok = tg.status === 'fulfilled' || google.status === 'fulfilled'
  return Response.json(
    { ok, telegram: tg.status === 'fulfilled', google: google.status === 'fulfilled' },
    { status: ok ? 200 : 502 },
  )
}

export const config = {
  path: '/api/lead',
  method: 'POST',
  // Bitta IP'dan daqiqasiga 5 tadan ortiq ariza yuborilmasin
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
}
