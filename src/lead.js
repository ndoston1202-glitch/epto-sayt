// Arizani yuborish (asosiy saytdagi modal va /ariza sahifasi uchun umumiy)
//  1) /api/lead — server endpoint: Telegram bot (+ Google Sheets). Token faqat serverda.
//  2) /__forms.html — Netlify Forms zaxira nusxa (faqat Netlify'da ishlaydi)

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

/** Reklama havolasidagi UTM belgilarini oladi (sahifa ochilganda bir marta) */
export function readUtm() {
  const params = new URLSearchParams(window.location.search)
  const utm = {}
  for (const k of UTM_KEYS) if (params.get(k)) utm[k] = params.get(k).slice(0, 100)
  if (params.get('fbclid')) utm.utm_source ||= 'facebook'
  return utm
}

/** @returns {Promise<boolean>} hech bo'lmaganda bitta kanal qabul qilsa true */
export async function submitLead(fields) {
  const body = new URLSearchParams({ 'form-name': 'lead', ...fields }).toString()
  const post = (url) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).then((res) => {
      if (!res.ok) throw new Error(res.status)
    })

  const results = await Promise.allSettled([post('/api/lead'), post('/__forms.html')])
  return results.some((r) => r.status === 'fulfilled')
}
