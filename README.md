# EPRO — landing sayt

Epro ERP (ombor, kassa, analitika, HR) uchun sayt. React + Vite, uch til: oʻzbekcha, ruscha, inglizcha.

| Sahifa | Nima |
|---|---|
| `/` | Asosiy landing |
| `/ariza` | Instagram / Facebook reklamasi uchun ariza sahifasi |
| `/mediateka` | Instagram postlari va reels (@e_pro.uz) |

Ariza qoldirilganda u **Telegram bot**ga keladi (ixtiyoriy: Google Sheets + Gmail ham).

---

## 1. Tez boshlash

```bash
npm install
cp .env.example .env     # ichiga TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni yozing
npm run dev              # http://localhost:5173 — faqat dizayn (ariza yuborilmaydi)
npm run build && npm start   # http://localhost:3000 — to'liq sayt, ariza botga boradi
```

Node.js 18 yoki undan yangi kerak.

## 2. Serverga joylash

Kod GitHub'dan istalgan hostingga qo'yiladi. Ariza botga borishi uchun hosting **server kodini
ishga tushira olishi** kerak:

| Hosting | Qanday |
|---|---|
| **VPS** (Ubuntu va h.k.) yoki **Node.js hosting** (Render, Railway, cPanel "Node.js App") | `npm install && npm run build && npm start` |
| **Vercel** | Repo'ni import qiling (Framework: Vite) |
| **Netlify** | Repo'ni ulang — `netlify.toml` hammasini sozlaydi |
| Oddiy PHP hosting / GitHub Pages | Sayt ochiladi, lekin ariza botga **bormaydi** (server yo'q) |

### Muhit o'zgaruvchilari

Har bir hostingda bir marta kiritiladi. `.env` git'ga tushmaydi — tokenlar GitHub'da ko'rinmaydi.

| O'zgaruvchi | Majburiy | Nima |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ha | @BotFather bergan bot tokeni |
| `TELEGRAM_CHAT_ID` | ha | Ariza boradigan chat ID (bir nechta bo'lsa vergul bilan) |
| `GOOGLE_SCRIPT_URL` | yo'q | Google Sheets + Gmail ([sozlash](google-sheets/README.md)) |
| `INSTAGRAM_ACCESS_TOKEN` | yo'q | Mediateka uchun ([sozlash](docs/INSTAGRAM.md)) |
| `PORT` | yo'q | Node server porti (standart: 3000) |

- **VPS / Node:** loyiha papkasidagi `.env` fayli yoki hosting panelidagi "Environment variables"
- **Vercel:** Project → Settings → Environment Variables
- **Netlify:** Project configuration → Environment variables

## 3. Matn va ma'lumotlarni o'zgartirish

| Nimani | Qayerda |
|---|---|
| Barcha matnlar (UZ / RU / EN) | `src/translations.js` |
| Telefon, Telegram, Instagram | `src/config.js` → `contacts` |
| Raqamlar (100+, 500+ …) | `src/config.js` → `stats` (izohlari `translations.js` → `stats.items`) |
| Hududlar ro'yxati | `src/config.js` → `regions` |
| Ranglar | `src/styles.css` → `:root` |
| Logo, skrinshotlar | `src/assets/` |
| Favicon, ulashish rasmi (og:image) | `public/` |

## 4. Reklama sahifasi `/ariza`

Reklamada shu havolani qo'ying. Qaysi kampaniyadan kelganini botda ko'rish uchun UTM qo'shing:

```
https://e-pro.uz/ariza?utm_source=instagram&utm_campaign=noyabr_aksiya
```

Botdagi xabar:

```
🆕 EPRO: yangi ariza
👤 Ism: Ali
📞 Telefon: +998 90 123 45 67
📍 Manba: ariza sahifasi
📣 Reklama: instagram · noyabr_aksiya
```

## 5. Loyiha tuzilishi

```
index.html, ariza/, mediateka/   sahifalar (Vite kirish nuqtalari)
src/
  main.jsx, ariza.jsx, mediateka.jsx   har bir sahifaning ishga tushishi
  App.jsx                asosiy sahifa bo'limlari tartibi
  components/            bo'limlar (Hero, Stats, Modules, …), LeadModal, LeadPage, MediaPage
  lead.js                arizani yuborish (modal va /ariza uchun umumiy)
  i18n.jsx               til tanlash (localStorage'da eslab qoladi)
  translations.js, config.js, icons.jsx, styles.css
server/
  lead.mjs               ariza → Telegram (+ Google Sheets) — umumiy mantiq
  instagram.mjs          Instagram postlari — umumiy mantiq
server.mjs               Node server: dist/ ni ko'rsatadi + /api/* (VPS uchun)
api/                     Vercel ulagichlari
netlify/functions/       Netlify ulagichlari
google-sheets/           Apps Script (Sheets + Gmail) va yo'riqnoma
docs/INSTAGRAM.md        Instagram tokenini olish
design/                  logoning asl fayli (saytda ishlatilmaydi)
```

API: `POST /api/lead` (ariza), `GET /api/instagram` (postlar).
Netlify'da qo'shimcha zaxira sifatida Netlify Forms ham ishlaydi; boshqa hostinglarda u o'tkazib yuboriladi.
