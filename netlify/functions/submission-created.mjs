// Netlify Forms'ga yangi ariza tushganda avtomatik ishga tushadi (Akismet tekshiruvidan o'tgan arizalar).
// Arizani Google Apps Script'ga uzatadi: u Google Sheets'ga yozadi va Gmail'ga xat yuboradi.
// Serverdan yuborilgani uchun brauzer cheklovlari (CORS, reklama blokerlari) xalaqit bermaydi.

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby8_P7yRsK1F67EK9KyBbxPBFUS8KVVAj6UJKYV6xj5wvLiCegiVoD6oI4umNeek1PeaA/exec'

export default async (req) => {
  const { payload } = await req.json()
  if (payload?.form_name !== 'lead') return new Response('skip')

  const d = payload.data || {}
  const body = new URLSearchParams({
    name: d.name || '',
    phone: d.phone || '',
    company: d.company || '',
    language: d.language || '',
  })

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      redirect: 'follow',
    })
    const text = await res.text()
    console.log('Google Apps Script:', res.status, text.slice(0, 200))
  } catch (err) {
    console.error('Google Apps Script xatosi:', err)
  }
  return new Response('ok')
}
