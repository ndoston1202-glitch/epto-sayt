// Netlify: GET /api/instagram  (mantiq: server/instagram.mjs)
import { instagramResponse } from '../../server/instagram.mjs'

export default async () => {
  const { status, json } = await instagramResponse((k) => Netlify.env.get(k))
  return Response.json(json, {
    status,
    // CDN 10 daqiqa saqlaydi — funksiya har so'rovda ishlamaydi
    headers: status === 200 ? { 'Cache-Control': 'public, max-age=300', 'Netlify-CDN-Cache-Control': 'public, s-maxage=600' } : {},
  })
}

export const config = { path: '/api/instagram', method: 'GET' }
