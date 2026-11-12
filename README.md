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


## Arizalar

Forma arizani ikki joyga yuboradi:

1. **`/api/lead`** — server endpoint (`netlify/functions/lead.mjs`). Arizani **Telegram bot**ga va **Google Sheets + Gmail**'ga yuboradi.
2. **Netlify Forms** — zaxira nusxa (Netlify panel → Forms).

Maxfiy qiymatlar faqat serverda, muhit o'zgaruvchilaridan o'qiladi — brauzerga yuboriladigan kodda yo'q:

| O'zgaruvchi | Nima |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather bergan bot tokeni |
| `TELEGRAM_CHAT_ID` | Ariza boradigan chat yoki guruh ID (bir nechta bo'lsa vergul bilan) |
| `GOOGLE_SCRIPT_URL` | Google Apps Script veb-ilova manzili ([sozlash](google-sheets/README.md)) |

- **Lokal:** `cp .env.example .env`, qiymatlarni yozing, `npx netlify dev` bilan ishga tushiring. `.env` git'ga tushmaydi.
- **Netlify:** Project configuration → Environment variables → shu nomlar bilan qo'shing (Scopes: Functions), keyin qayta deploy qiling.
