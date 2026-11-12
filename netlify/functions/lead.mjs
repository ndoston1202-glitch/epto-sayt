// Netlify: POST /api/lead  (mantiq: server/lead.mjs)
import { handleLead, parseBody } from '../../server/lead.mjs'

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
  let body
  try {
    body = parseBody(await req.text(), req.headers.get('content-type') || '')
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }
  const { status, json } = await handleLead(body, (k) => Netlify.env.get(k))
  return Response.json(json, { status })
}

export const config = {
  path: '/api/lead',
  method: 'POST',
  // Bitta IP'dan daqiqasiga 5 tadan ortiq ariza yuborilmasin
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
}
