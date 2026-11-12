# EPRO ERP — landing sahifa

React + Vite. Uch til: oʻzbekcha, ruscha, inglizcha.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tayyor fayllar dist/ papkasida
```

## Qayerda nima

| Fayl | Nima uchun |
|---|---|
| `src/translations.js` | Barcha matnlar (UZ / RU / EN) |
| `src/config.js` | Telefon, Telegram, Instagram |
| `src/styles.css` | Ranglar (`:root` ichida) va dizayn |
| `src/components/` | Har bir boʻlim alohida komponent |
| `src/components/LeadModal.jsx` | “Bepul konsultatsiya” formasi |
| `src/assets/` | Logo va dastur skrinshotlari |


## Arizalar → Telegram bot

Forma arizani `POST /api/lead` ga yuboradi. Server tokenni o'zida ishlatib, arizani **Telegram bot**ga
(va sozlangan bo'lsa **Google Sheets + Gmail**'ga) yuboradi. Token brauzerga chiqmaydi.

Mantiq bitta faylda — `server/lead.mjs`. Har bir hosting uchun kichik "ulagich" bor:

| Hosting | Fayl | Ishga tushirish |
|---|---|---|
| **Netlify** | `netlify/functions/lead.mjs` | Repo'ni ulang — `netlify.toml` hammasini sozlaydi |
| **Vercel** | `api/lead.js` | Repo'ni import qiling (Framework: Vite) |
| **VPS / istalgan Node hosting** (cPanel Node.js, Render, Railway…) | `server.mjs` | `npm install && npm run build && npm start` |

### Muhit o'zgaruvchilari (har bir hostingda bir marta kiritiladi)

| O'zgaruvchi | Majburiy | Nima |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ha | @BotFather bergan bot tokeni |
| `TELEGRAM_CHAT_ID` | ha | Ariza boradigan chat ID (bir nechta bo'lsa vergul bilan) |
| `GOOGLE_SCRIPT_URL` | yo'q | Google Sheets + Gmail uchun ([sozlash](google-sheets/README.md)) |

- **Netlify:** Project configuration → Environment variables
- **Vercel:** Project → Settings → Environment Variables
- **VPS / Node:** loyiha papkasida `.env` fayli (`cp .env.example .env`) yoki hosting panelidagi "Environment variables"

`.env` git'ga tushmaydi — token GitHub'da ko'rinmaydi. Shuning uchun yangi hostingga qo'yganda
shu 2–3 qiymatni o'sha hosting sozlamalariga kiritish kerak.

Netlify Forms qo'shimcha zaxira sifatida faqat Netlify'da ishlaydi; boshqa hostinglarda u o'tkazib yuboriladi.
