// Instagram postlarini olish (Instagram API with Instagram Login).
// Token faqat serverda: INSTAGRAM_ACCESS_TOKEN muhit o'zgaruvchisi.
// Natija 10 daqiqa xotirada saqlanadi — Instagram limitlariga tushmaslik uchun.

const API = 'https://graph.instagram.com'
const TTL = 10 * 60 * 1000
let cache = { at: 0, data: null }

export async function getInstagram(env) {
  const token = env('INSTAGRAM_ACCESS_TOKEN')
  if (!token) return { configured: false }
  if (cache.data && Date.now() - cache.at < TTL) return cache.data

  const q = (path, fields) => `${API}${path}?fields=${fields}&access_token=${encodeURIComponent(token)}`
  const [profileRes, mediaRes] = await Promise.all([
    fetch(q('/me', 'username,name,profile_picture_url,media_count,followers_count')),
    fetch(q('/me/media', 'id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp') + '&limit=30'),
  ])
  if (!profileRes.ok || !mediaRes.ok) {
    const err = await (profileRes.ok ? mediaRes : profileRes).json().catch(() => ({}))
    // Tokenni loglamaymiz — faqat Instagram izohini
    throw new Error(`Instagram ${profileRes.status}/${mediaRes.status}: ${err?.error?.message || 'xato'}`)
  }
  const profile = await profileRes.json()
  const media = await mediaRes.json()

  const data = {
    configured: true,
    profile: {
      username: profile.username,
      name: profile.name || profile.username,
      picture: profile.profile_picture_url || null,
      posts: profile.media_count ?? null,
      followers: profile.followers_count ?? null,
    },
    items: (media.data || []).map((m) => ({
      id: m.id,
      type: m.media_product_type === 'REELS' ? 'reel' : m.media_type === 'VIDEO' ? 'video' : m.media_type === 'CAROUSEL_ALBUM' ? 'album' : 'image',
      image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
      caption: (m.caption || '').slice(0, 300),
      link: m.permalink,
      date: m.timestamp,
    })).filter((m) => m.image),
  }
  cache = { at: Date.now(), data }
  return data
}

/** Barcha ulagichlar uchun umumiy javob */
export async function instagramResponse(env) {
  try {
    return { status: 200, json: await getInstagram(env) }
  } catch (e) {
    console.error(e.message)
    return { status: 502, json: { configured: true, error: 'instagram_unavailable' } }
  }
}
