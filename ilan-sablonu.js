// ═══════════════════════════════════════════════════════════════════════════
// YENİ İLAN ŞABLONU — BOŞ ÇERÇEVE
// ═══════════════════════════════════════════════════════════════════════════
//
// NASIL KULLANILIR?
// ─────────────────
// 1) Aşağıdaki { ... } bloğunun TAMAMINI kopyala
// 2) products.js dosyasını aç
// 3) products = [ ... ] dizisinin EN SONUNA yapıştır (son ilandan sonra virgül koy)
// 4) Tüm "Buraya ..." alanlarını doldur
// 5) slug değerini benzersiz yap (küçük harf, tire: "ornek-urun-adi")
// 6) Kaydet ve test et: urun.html?slug=SLUG-ADIN
//
// NOT: Bu dosya sadece şablondur — site bu dosyayı okumaz.
//      Gerçek ilan products.js içindeki products dizisine eklenmelidir.
//
// KATEGORİ KODLARI (cat alanı)
// ─────────────────────────────
//   "a" → Fivem Cheats      catLabel: "Fivem Cheats"
//   "b" → Accounts          catLabel: "Accounts"
//   "c" → Spoofers          catLabel: "Spoofers"
//   "d" → Windows Lisans    catLabel: "Windows Lisans"
//
// ETİKET (badge alanı)
// ────────────────────
//   "new"    → YENİ etiketi
//   "best"   → ÇOK SATAN etiketi
//   "expert" → EXPERT etiketi
//   null     → etiket yok
//
// PORT KURALLARI (ports dizisi)
// ─────────────────────────────
//   text dolu    → port sayfada görünür
//   text null    → port gizlenir (göstermek istemiyorsan null bırak)
//   full: true   → kutu tam genişlikte
//   full: false  → yarım genişlik (yan yana iki kutu)
//   Metinde alt satır için \n kullan
//
// ═══════════════════════════════════════════════════════════════════════════


// ── AŞAĞIDAKİ BLOĞU KOPYALA → products.js içindeki diziye yapıştır ──────────

{
  slug: "buraya-benzersiz-slug",              // URL: urun.html?slug=buraya-benzersiz-slug
  name: "[Buraya Ürün Adı]",                  // Mağaza kartı + detay sayfası başlığı
  cat: "a",                                   // a | b | c | d  (yukarıdaki tabloya bak)
  catLabel: "Fivem Cheats",                   // Detay sayfasında görünen kategori adı
  badge: null,                                // "new" | "best" | "expert" | null

  desc: "Buraya kısa açıklama yaz.",          // Mağaza kartı + detay üst metin
  longDesc: "Buraya uzun açıklama yaz.",      // Detay sayfası alt paragraf

  ports: [
    {
      title: "Ürün Hakkında",                 // Port 1 başlığı
      text: null,                             // Buraya açıklama yaz (null = gizli)
      full: false
    },
    {
      title: "Kurulum Adımları",              // Port 2 başlığı
      text: null,                             // Örn: "1. İndir\n2. Kur\n3. Aktive et"
      full: false
    },
    {
      title: "Önemli Notlar",                 // Port 3 başlığı
      text: null,                             // full:true → tam genişlik kutu
      full: true
    },
    {
      title: "Destek",                        // Port 4 başlığı
      text: null,                             // Kullanmayacaksan null bırak
      full: false
    }
  ],

  features: [                                 // Madde madde özellikler
    "Buraya özellik 1",
    "Buraya özellik 2",
    "Buraya özellik 3",
    "Buraya özellik 4"
  ],

  inStock: true,                              // false → Tükendi etiketi, sepete eklenemez
  images: [                                   // Galeri (boşsa img kullanılır)
    "https://buraya-gorsel-url.png"
  ],
  metaDesc: "SEO açıklaması — Google/Discord önizlemesi için.",  // SEO
  faq: [                                      // Ürün SSS (boş dizi = gizli)
    { q: "Soru buraya?", a: "Cevap buraya." }
  ],
  shopierUrl: null,                           // Shopier ödeme linki (SHOPIER-BAGLANTI.md)

  price: 0.00,                                // Güncel fiyat (sayı)
  was: null,                                  // Eski fiyat (indirim yoksa null)

  img: "https://buraya-gorsel-url.png",       // Ana ürün görseli
  imgWidth: 90,
  imgHeight: 90,

  logo: null,                                 // Köşe logosu (yoksa null)
  logoWidth: 32,
  logoHeight: 32
}

// ── KOPYALAMA BİTTİ ───────────────────────────────────────────────────────
//
// products.js'te son ilanın kapanış } satırından sonra virgül olmalı:
//
//   {
//     slug: "spoofer-lite",
//     ...
//   },          ← bu virgül olmalı
//   {           ← yapıştırdığın yeni şablon buraya gelir
//     slug: "buraya-benzersiz-slug",
//     ...
//   }
// ];
//
// Test:
//   Ana sayfa  → Prototip 2.1.html  (yeni kart otomatik görünür)
//   Detay      → urun.html?slug=buraya-benzersiz-slug
//
// ═══════════════════════════════════════════════════════════════════════════
