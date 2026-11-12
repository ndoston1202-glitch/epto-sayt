// Vercel: GET /api/instagram  (mantiq: server/instagram.mjs)
import { instagramResponse } from '../server/instagram.mjs'

export default async function handler(req, res) {
  const { status, json } = await instagramResponse((k) => process.env[k])
  if (status === 200) res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
  res.status(status).json(json)
}
