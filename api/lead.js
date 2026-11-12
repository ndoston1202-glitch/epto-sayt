// Vercel: POST /api/lead  (mantiq: server/lead.mjs)
import { handleLead, parseBody } from '../server/lead.mjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')
  let body = req.body
  try {
    if (typeof body === 'string' || Buffer.isBuffer(body)) body = parseBody(String(body), req.headers['content-type'] || '')
  } catch {
    return res.status(400).json({ ok: false, error: 'bad_request' })
  }
  const { status, json } = await handleLead(body, (k) => process.env[k])
  res.status(status).json(json)
}
