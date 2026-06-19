# Shopier Bağlantı Rehberi — ExtasyStore

Bu dosya, siteni **Shopier** ödeme sistemine bağlaman için adım adım rehberdir.

---

## Ön koşullar

1. [Shopier](https://www.shopier.com) hesabı aç
2. Mağaza / satıcı profilini tamamla
3. Shopier panelinden **API Key** al

---

## Adım 1 — store-config.js dosyasını düzenle

`store-config.js` dosyasını aç ve `shopier` bölümünü güncelle:

```javascript
shopier: {
  enabled: true,
  apiKey: "SHOPIER-API-KEY-BURAYA",
  paymentUrl: "https://www.shopier.com/ShowProduct/api_pay4.php"
}
```

---

## Adım 2 — Her ürün için Shopier ürün linki (önerilen yöntem)

Shopier'de her dijital ürün için ayrı ödeme linki oluşturabilirsin.

1. Shopier panel → Ürün ekle
2. Fiyat, açıklama ve teslimat ayarlarını yap
3. Oluşan linki kopyala
4. `products.js` içinde ilgili ürüne ekle:

```javascript
{
  slug: "tiago-private",
  name: "[Tiago Private]",
  // ... diğer alanlar
  shopierUrl: "https://www.shopier.com/ShowProduct/XXXXX"
}
```

5. `store.js` içindeki `checkout` fonksiyonunu şu şekilde güncelle:

```javascript
checkout(items, singleProduct) {
  if (singleProduct && singleProduct.shopierUrl) {
    window.location.href = singleProduct.shopierUrl;
    return;
  }
  // sepet için Shopier sepet entegrasyonu veya ilk ürün linki...
}
```

---

## Adım 3 — API ile otomatik ödeme formu (gelişmiş)

Shopier API dokümantasyonuna göre POST formu oluşturulur:

```html
<form id="shopierForm" method="POST" action="https://www.shopier.com/ShowProduct/api_pay4.php">
  <input type="hidden" name="API_key" value="API_KEYIN" />
  <input type="hidden" name="product_name" value="Ürün Adı" />
  <input type="hidden" name="product_price" value="49.99" />
  <input type="hidden" name="buyer_name" value="" />
  <input type="hidden" name="buyer_email" value="" />
  <!-- Shopier'in istediği diğer alanlar -->
</form>
```

> **Not:** Shopier'in güncel API alanları zaman zaman değişir. Resmi dokümantasyonu kontrol et:
> https://www.shopier.com (Satıcı paneli → API / Entegrasyon)

---

## Adım 4 — Callback / webhook (teslimat otomasyonu)

Dijital ürün teslimi için:

1. Shopier panelinde **callback URL** ayarla (ör. `https://seninsiten.com/api/shopier-callback`)
2. Ödeme onaylandığında Shopier bu URL'e istek atar
3. Backend'in (Node.js, PHP vb.) lisans anahtarını e-posta veya panel üzerinden göndermesi gerekir

**Önemli:** Şu anki prototip statik HTML/JS'tir — gerçek otomatik teslimat için bir **backend sunucusu** şarttır.

---

## Adım 5 — Test

1. Shopier **test modu** varsa önce onu kullan
2. Küçük tutarlı test satın alması yap
3. Ödeme sonrası yönlendirme ve e-posta teslimatını kontrol et

---

## Hızlı prototip (şimdilik)

Shopier bağlanana kadar site şu şekilde çalışır:

- **Satın Al** → bilgi mesajı + tutar gösterimi
- **Ödemeye Geç** (sepet) → aynı stub mesajı

`store-config.js` → `enabled: true` yaptığında ve API key girince mesaj güncellenir.

---

## Destek

- Shopier destek: Shopier panel içinden
- ExtasyStore Discord: https://discord.gg/7E5pbp4yWz

---

## Özet checklist

- [ ] Shopier hesabı açıldı
- [ ] API Key alındı
- [ ] `store-config.js` güncellendi
- [ ] Her ürüne `shopierUrl` eklendi (veya API formu yazıldı)
- [ ] Test ödemesi yapıldı
- [ ] (Opsiyonel) Backend callback kuruldu → otomatik teslimat
