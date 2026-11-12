# Instagram'ni Mediateka sahifasiga ulash

`/mediateka` sahifasi **@e_pro.uz** postlari va reels'larini avtomatik ko'rsatadi.
Buning uchun bitta kalit kerak: `INSTAGRAM_ACCESS_TOKEN`. U faqat serverda saqlanadi
(`.env` yoki hosting sozlamalari) va brauzerga chiqmaydi.

Token bo'lmasa sahifa baribir ishlaydi — "Instagram'da ochish" tugmasini ko'rsatadi.

## 1. Instagram akkauntini "Professional" qiling
Instagram ilovasi → **Sozlamalar → Akkaunt turi va vositalar → Professional akkauntga o'tish**
(**Biznes** yoki **Avtor** — ikkalasi ham bo'ladi). Bu bepul.

## 2. Meta ilovasini yarating
1. https://developers.facebook.com ga Facebook akkauntingiz bilan kiring → **My Apps → Create App**.
2. Foydalanish turi: **Other** → ilova turi: **Business** → nom bering (masalan `Epro sayt`).
3. Ilova panelida **Instagram** mahsulotini qo'shing → **API setup with Instagram login**.

## 3. Token oling
1. **Generate access tokens** bo'limida **Add account** → @e_pro.uz akkauntiga kiring va ruxsat bering.
2. Akkaunt yonidagi **Generate token** ni bosing → chiqqan uzun tokenni nusxalang.
   Bu **uzoq muddatli token** — 60 kun amal qiladi.

## 4. Tokenni saytga qo'ying
- **VPS / Node:** `.env` fayliga: `INSTAGRAM_ACCESS_TOKEN=...` → serverni qayta ishga tushiring.
- **Netlify / Vercel:** Environment variables → `INSTAGRAM_ACCESS_TOKEN` → qayta deploy.

Tekshirish: brauzerda `https://<domen>/api/instagram` ni oching — `"configured": true` va postlar ro'yxati chiqishi kerak.

## 5. Har 60 kunda yangilash
Token 60 kundan keyin eskiradi. Muddati tugashidan oldin shu havolani brauzerda oching
(`TOKEN` o'rniga joriy tokenni qo'ying) — u yangi 60 kunlik token qaytaradi:

```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN
```

Javobdagi `access_token` ni `.env` / hosting sozlamalariga yozing.
Token eskirsa, sahifa avtomatik "Instagram'da ochish" holatiga o'tadi — sayt buzilmaydi.
