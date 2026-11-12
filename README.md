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

Forma arizani Netlify Forms'ga yuboradi, `netlify/functions/submission-created.mjs` esa uni serverdan Google Sheets + Gmail'ga uzatadi.
Google qismini sozlash: [`google-sheets/README.md`](google-sheets/README.md).
