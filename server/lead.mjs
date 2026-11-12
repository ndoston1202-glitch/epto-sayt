// Arizani qayta ishlashning umumiy mantig'i — barcha hostinglar shu faylni ishlatadi:
//   Netlify  → netlify/functions/lead.mjs
//   Vercel   → api/lead.js
//   VPS/Node → server.mjs
//
// Maxfiy qiymatlar muhit o'zgaruvchilaridan o'qiladi (brauzerga chiqmaydi):
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GOOGLE_SCRIPT_URL (ixtiyoriy)

const MAX = 200
const clean = (v) => String(v ?? '').trim().slice(0, MAX)
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

async function sendTelegram(lead, env) {
  const token = env('TELEGRAM_BOT_TOKEN')
  const chatIds = (env('TELEGRAM_CHAT_ID') || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (!token || chatIds.length === 0) throw new Error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID sozlanmagan')

  const text = [
    '🆕 <b>EPRO: yangi ariza</b>',
    '',
    `👤 <b>Ism:</b> ${esc(lead.name)}`,
    `📞 <b>Telefon:</b> ${esc(lead.phone)}`,
    lead.company && `🏢 <b>Kompaniya:</b> ${esc(lead.company)}`,
    `🌐 <b>Til:</b> ${esc(lead.language || '—')}`,
    lead.source && `📍 <b>Manba:</b> ${esc(lead.source)}`,
    lead.utm && `📣 <b>Reklama:</b> ${esc(lead.utm)}`,
    `🕒 ${lead.date}`,
  ].filter(Boolean).join('\n')

  await Promise.all(
    chatIds.map(async (chat_id) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      })
      if (!res.ok) {
        // Telegram izohini loglaymiz — tokenni emas
        const info = await res.json().catch(() => ({}))
        throw new Error(`Telegram ${res.status}: ${info.description || 'xato'}`)
      }
    }),
  )
}

async function sendGoogle(lead, env) {
  const url = env('GOOGLE_SCRIPT_URL')
  if (!url) return 'skipped'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ name: lead.name, phone: lead.phone, company: lead.company, language: lead.language, source: lead.source, utm: lead.utm }),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`Google ${res.status}`)
}

/**
 * @param {Record<string, any>} body  — forma maydonlari
 * @param {(key: string) => string | undefined} env — muhit o'zgaruvchisini o'qish
 * @returns {Promise<{ status: number, json: object }>}
 */
export async function handleLead(body, env) {
  body = body || {}
  // Bot himoyasi: yashirin maydon to'ldirilgan bo'lsa, jim qabul qilamiz
  if (body['bot-field']) return { status: 200, json: { ok: true } }

  const lead = {
    name: clean(body.name),
    phone: clean(body.phone),
    company: clean(body.company),
    language: clean(body.language),
    source: clean(body.source),
    // Reklama belgilari: utm_source / utm_campaign / ... → "instagram · cpc · yanvar_aksiya"
    utm: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .map((k) => clean(body[k]))
      .filter(Boolean)
      .join(' · '),
    date: new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' }),
  }
  if (!lead.name || lead.phone.replace(/\D/g, '').length < 7) {
    return { status: 422, json: { ok: false, error: 'invalid' } }
  }

  const [tg, google] = await Promise.allSettled([sendTelegram(lead, env), sendGoogle(lead, env)])
  if (tg.status === 'rejected') console.error('Telegram:', tg.reason?.message)
  if (google.status === 'rejected') console.error('Google:', google.reason?.message)

  // Telegram — asosiy kanal: u ishlasa, ariza qabul qilingan hisoblanadi
  const ok = tg.status === 'fulfilled' || (google.status === 'fulfilled' && google.value !== 'skipped')
  return {
    status: ok ? 200 : 502,
    json: { ok, telegram: tg.status === 'fulfilled', google: google.status === 'fulfilled' && google.value !== 'skipped' },
  }
}

/** urlencoded yoki JSON matnni obyektga aylantiradi */
export function parseBody(text, contentType = '') {
  if (contentType.includes('application/json')) return JSON.parse(text || '{}')
  return Object.fromEntries(new URLSearchParams(text))
}
