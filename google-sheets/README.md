# Arizalarni Google Sheets va Gmail'ga ulash

Saytdagi "Bepul konsultatsiya" formasi to'ldirilganda ariza:
- **Google Sheets** jadvaliga yangi qator bo'lib yoziladi (sana, ism, telefon, kompaniya, til, holat);
- **Gmail**'ingizga xat bo'lib keladi.

Taxminan 5 daqiqa vaqt oladi.

## 1. Jadval yarating
1. https://sheets.google.com ga kiring (arizalar keladigan Gmail akkaunt bilan).
2. **Bo'sh jadval** yarating, nomini masalan `EPRO arizalar` qo'ying.

## 2. Skriptni qo'shing
1. Jadvalda **Kengaytmalar → Apps Script** (Extensions → Apps Script) ni bosing.
2. Ochilgan oynadagi bor kodni o'chirib, `Code.gs` faylidagi kodni to'liq joylashtiring.
3. **Saqlash** (💾) ni bosing.

## 3. Sinab ko'ring va ruxsat bering
1. Yuqoridagi ro'yxatdan `testLead` funksiyasini tanlab, **Run (▶)** ni bosing.
2. Google ruxsat so'raydi: akkauntingizni tanlang → **Advanced → Go to ... (unsafe)** → **Allow**.
   (Bu sizning o'zingiz yozgan skriptingiz, shuning uchun Google shunday ogohlantiradi.)
3. Jadvalda `Arizalar` varag'i va "Sinov" qatori paydo bo'lishi, Gmail'ga xat kelishi kerak.

## 4. Veb-ilova sifatida joylang
1. O'ng yuqorida **Deploy → New deployment** ni bosing.
2. Turi: ⚙️ → **Web app**.
3. **Execute as:** `Me`
4. **Who has access:** `Anyone`
5. **Deploy** ni bosing va chiqqan **Web app URL** ni nusxalang
   (`https://script.google.com/macros/s/.../exec` ko'rinishida).

## 5. URL'ni saytga qo'ying
URL'ni menga yuboring yoki `netlify/functions/submission-created.mjs` faylidagi qatorga yozing:

```js
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec'
```

Keyin sayt qayta joylanadi.

## Eslatmalar
- Kodni o'zgartirsangiz: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. URL o'zgarmaydi.
- Xat boshqa manzilga ham borsin desangiz, `EXTRA_EMAILS` ga yozing.
- Gmail kuniga ~100 ta xat cheklovi bor (oddiy akkaunt) — landing uchun yetarli.
