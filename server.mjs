// Oddiy Node server (VPS, cPanel Node.js, Render, Railway va h.k.):
//   npm run build && npm start
// dist/ papkasidagi saytni ko'rsatadi va POST /api/lead ni qayta ishlaydi.
// Maxfiy qiymatlar .env faylidan yoki hosting sozlamalaridan olinadi.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleLead, parseBody } from './server/lead.mjs'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const DIST = resolve(ROOT, 'dist')
const PORT = Number(process.env.PORT) || 3000

// .env ni yuklash (hosting o'zi bergan qiymatlar ustun turadi)
const envFile = join(ROOT, '.env')
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i)
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2')
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.txt': 'text/plain',
}

// Oddiy cheklov: bitta IP'dan daqiqasiga 5 ta ariza
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < 60_000)
  list.push(now)
  hits.set(ip, list)
  return list.length > 5
}

async function readText(req, limit = 10_000) {
  let data = ''
  for await (const chunk of req) {
    data += chunk
    if (data.length > limit) throw new Error('too_large')
  }
  return data
}

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'Content-Type': type })
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body))
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')

  if (url.pathname === '/api/lead') {
    if (req.method !== 'POST') return send(res, 405, { ok: false })
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress
    if (limited(ip)) return send(res, 429, { ok: false, error: 'too_many' })
    let body
    try {
      body = parseBody(await readText(req), req.headers['content-type'] || '')
    } catch {
      return send(res, 400, { ok: false, error: 'bad_request' })
    }
    const { status, json } = await handleLead(body, (k) => process.env[k])
    return send(res, status, json)
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method Not Allowed', 'text/plain')

  // Statik fayllar (dist/ dan tashqariga chiqishga yo'l qo'ymaymiz)
  let file = normalize(join(DIST, decodeURIComponent(url.pathname)))
  if (file !== DIST && !file.startsWith(DIST + sep)) return send(res, 403, 'Forbidden', 'text/plain')
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
  } catch {
    file = join(DIST, 'index.html')
  }
  try {
    const data = await readFile(file)
    const cache = file.includes(`${DIST}/assets/`) ? 'public, max-age=31536000, immutable' : 'no-cache'
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': cache })
    res.end(req.method === 'HEAD' ? undefined : data)
  } catch {
    send(res, 404, 'Not Found', 'text/plain')
  }
}).listen(PORT, () => console.log(`EPRO sayti: http://localhost:${PORT}`))
