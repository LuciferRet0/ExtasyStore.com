// ═══════════════════════════════════════════════════════════════════════════
// products.js — TÜM İLAN VERİLERİ (ANA SAYFA + urun.html ORTAK KAYNAK)
// ═══════════════════════════════════════════════════════════════════════════
//
// BU DOSYA NE İŞE YARAR?
// ─────────────────────
// • Prototip 2.1.html → mağaza kartlarını buradan çizer
// • urun.html         → ?slug=... ile ilgili ilanın detay sayfasını açar
//
// YENİ İLAN NASIL EKLENİR? (3 adım)
// ─────────────────────────────────
// 1) ilan-sablonu.js dosyasındaki boş şablonu kopyala
// 2) Aşağıdaki products = [ ... ] dizisinin SONUNA yapıştır
// 3) slug alanını benzersiz yap (küçük harf, tire ile: "benim-yeni-urun")
//    Ana sayfada da otomatik görünür; Satın Al linki kendiliğinden oluşur.
// 4) Tarayıcıda test et: urun.html?slug=benim-yeni-urun
//
// MEVCUT İLAN NASIL DÜZENLENİR?
// ─────────────────────────────
// Aşağıdaki dizide slug ile eşleşen kaydı bul, alanları değiştir, kaydet.
// urun.html dosyasına dokunmana gerek yok.
//
// ALAN REHBERİ (her ürün bloğundaki alanlar)
// ───────────────────────────────────────────
// slug      → URL kimliği. Örn: "ham-executor" → urun.html?slug=ham-executor
// name      → Görünen isim (kart + detay sayfası başlığı)
// cat       → Kategori kodu: "a"=Fivem  "b"=Accounts  "c"=Spoofers  "d"=Windows
// catLabel  → Detay sayfasında görünen kategori adı (ör. "Fivem Cheats")
// badge     → Etiket: "new"=YENİ  "best"=ÇOK SATAN  "expert"=EXPERT  null=etiket yok
// desc      → Kısa açıklama (kart + detay üst metin)
// longDesc  → Uzun açıklama (sadece detay sayfası altında, tek paragraf)
// ports     → Açıklama portları (detay sayfasında kutu kutu metin alanları)
//               Her port: { title, text, full }
//                 title → kutu başlığı (isteğe bağlı)
//                 text  → yazdığın açıklama (boş/null → port gizlenir)
//                 full  → true ise kutu tam genişlik (opsiyonel, varsayılan false)
//               Metinde \n kullanırsan alt satıra geçer.
// features  → Özellik listesi (detay sayfasında madde madde)
// price     → Güncel fiyat (sayı, örn: 49.99)
// was       → Eski fiyat / indirim (yoksa null)
// img       → Ana görsel URL
// logo      → Sağ alt köşe logosu (yoksa null → logo görünmez)
// logoWidth / logoHeight → Köşe logosu boyutu (px), varsayılan 32
// inStock   → true=Stokta  false=Tükendi (varsayılan true)
// images    → Galeri URL dizisi (detay sayfası)
// metaDesc  → SEO açıklaması (Google/Discord paylaşım)
// faq       → Ürün SSS [{ q, a }, ...]
// shopierUrl→ Shopier ödeme linki (SHOPIER-BAGLANTI.md)
//
// YENİ İLAN ŞABLONU (BOŞ ÇERÇEVE)
// ───────────────────────────────
// Tiago Private yapısının birebir boş hali için:
//   → ilan-sablonu.js dosyasını aç, bloğu kopyala, products dizisine yapıştır.
//
// ═══════════════════════════════════════════════════════════════════════════

const products = [
  {
    slug: "tiago-private",
    name: "[Tiago Private]",
    cat: "a",
    catLabel: "Fivem Cheats",
    badge: "new",
    desc: "TIAGOMODZ Tarafından hazırlanmış sıfır yakalanma riski içeren bir executor.",
    longDesc: "Tiago Private, FiveM için geliştirilmiş premium bir executor çözümüdür. Güncel anti-cheat bypass, stabil enjeksiyon ve düzenli güncellemeler sunar. Satın alma sonrası lisans anahtarınız anında teslim edilir.",
    ports: [
      {
        title: "Ürün Hakkında",
        text: "Tiago Private; FiveM sunucularında güvenli ve stabil çalışmak için tasarlanmış premium bir executor'dur.\nTIAGOMODZ ekibi tarafından düzenli olarak güncellenir ve test edilir.",
        full: false
      },
      {
        title: "Kurulum Adımları",
        text: "1. Satın alma sonrası lisans anahtarınızı alın\n2. İndirme linkinden dosyayı indirin\n3. Yönetici olarak çalıştırın ve anahtarı girin\n4. FiveM'i açıp menüden aktive edin",
        full: false
      },
      {
        title: "Önemli Notlar",
        text: "Her güncellemeden önce eski sürümü kaldırmanız önerilir.\nLisans anahtarınızı kimseyle paylaşmayın — tek cihaz bağlıdır.",
        full: true
      },
      {
        title: "Destek",
        text: null
      }
    ],
    features: ["Sıfır yakalanma odaklı yapı", "Düzenli güncelleme", "Anında lisans teslimi", "Kurulum rehberi dahil"],
    inStock: true,
    images: [
      "https://tiagomodz.com/images/tiago_private.jpg",
      "https://static.mysellauth.com/storage/images/797242.webp"
    ],
    metaDesc: "Tiago Private — FiveM premium executor. Anında teslim, sıfır yakalanma odaklı.",
    faq: [
      { q: "Tiago Private güvenli mi?", a: "Düzenli güncellenir ve test edilir. Satın alma sonrası destek ekibimiz yardımcı olur." },
      { q: "Lisans kaç cihazda geçerli?", a: "Tek cihaz lisansıdır. HWID bağlıdır." }
    ],
    price: 49.99,
    was: null,
    img: "https://tiagomodz.com/images/tiago_private.jpg",
    imgWidth: 90,
    imgHeight: 90,
    logo: "https://tiagomodz.com/images/logo.png",
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "ham-executor",
    name: "[Ham Executor]",
    cat: "a",
    catLabel: "Fivem Cheats",
    badge: "best",
    desc: "Yapay zekâ destekli komut dosyası oluşturma, kaynak dökümü ve olay araçlarına sahip gelişmiş FiveM Executor.",
    longDesc: "Ham Executor; AI destekli script oluşturma, kaynak dökümü ve gelişmiş olay araçlarıyla FiveM deneyiminizi bir üst seviyeye taşır. Hızlı menü, stabil performans ve geniş özellik seti.",
    ports: [
      { title: "Port 1 — Buraya başlık yaz", text: "Buraya açıklama metnini yaz...", full: false },
      { title: "Port 2 — Buraya başlık yaz", text: null, full: false },
      { title: "Port 3 — Buraya başlık yaz", text: null, full: true },
      { title: "Port 4 — Buraya başlık yaz", text: null, full: false }
    ],
    features: ["AI script oluşturucu", "Kaynak döküm araçları", "Hızlı ve stabil menü", "7/24 destek"],
    price: 39.99,
    was: null,
    img: "https://static.mysellauth.com/storage/images/797242.webp ",
    imgWidth: 110,
    imgHeight: 110,
    logo: null,
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "eulen",
    name: "[Eulen]",
    cat: "a",
    catLabel: "Fivem Cheats",
    badge: "expert",
    desc: "FiveM Spoofers ve Private Executor'lar arasında ismini yıllardır duyuran en premium executor.",
    longDesc: "Eulen, yıllardır sektörde tanınan premium bir markadır. Yüksek stabilite, gelişmiş koruma katmanları ve profesyonel destek ile öne çıkar.",
    features: ["Premium stabilite", "Uzun süreli güncelleme desteği", "Gelişmiş koruma", "Öncelikli destek"],
    price: 59.99,
    was: null,
    img: "https://cdn.discordapp.com/attachments/1501791586822918205/1517229109241970860/bvp89zn.png?ex=6a358538&is=6a3433b8&hm=8c3fa0af49ca61dfcbe05ed7e0cec46b37d072d898f41958ed97aeb23900e7cd&",
    imgWidth: 90,
    imgHeight: 90,
    logo: null,
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "fresh-rockstar",
    name: "[Fresh Rockstar]",
    cat: "b",
    catLabel: "Accounts",
    badge: "best",
    desc: "Fresh Rockstar Hesapları.",
    longDesc: "Yeni oluşturulmuş, doğrulanmış Rockstar hesapları. Anında teslimat ile hemen kullanmaya başlayın.",
    features: ["Fresh hesap garantisi", "Anında otomatik teslim", "E-posta erişimi", "Toplu alım desteği"],
    price: 0.50,
    was: 2.50,
    img: "https://cdn.discordapp.com/attachments/1501791586822918205/1517229113188815048/sm17jsm.png?ex=6a358539&is=6a3433b9&hm=562b522bd59cc546ee805ef5bdba24dab2c98d10f8f2a645edc4ebf85ad413fe&",
    imgWidth: 90,
    imgHeight: 90,
    logo: null,
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "fresh-steam",
    name: "[Fresh Steam]",
    cat: "b",
    catLabel: "Accounts",
    badge: "new",
    desc: "Fresh Steam Hesapları.",
    longDesc: "Temiz geçmişe sahip yeni Steam hesapları. Hızlı teslimat ve eksiksiz giriş bilgileri.",
    features: ["Yeni hesap", "Mail bilgisi dahil", "Anında teslim", "Uygun fiyat"],
    price: 0.09,
    was: 1.99,
    img: "https://r.resimlink.com/FcUfSXPJo0iM.png",
    imgWidth: 90,
    imgHeight: 90,
    logo: null,
    logoWidth: 28,
    logoHeight: 28
  },
  {
    slug: "fresh-discord",
    name: "[Fresh Discord]",
    cat: "b",
    catLabel: "Accounts",
    badge: null,
    desc: "Fresh Discord Hesapları.",
    longDesc: "Doğrulanmış Discord hesapları. Token ve mail bilgileri eksiksiz teslim edilir.",
    features: ["Doğrulanmış hesap", "Token + mail", "Hızlı teslimat", "Destek dahil"],
    price: 12.99,
    was: null,
    img: "https://r.resimlink.com/weDTi.png",
    imgWidth: 90,
    imgHeight: 90,
    logo: null,
    logoWidth: 24,
    logoHeight: 24
  },
  {
    slug: "redengine-privacy",
    name: "[RedEngine 5M Privacy Protector]",
    cat: "c",
    catLabel: "Spoofers",
    badge: "best",
    desc: "Kısa ürün açıklaması buraya gelecek.",
    longDesc: "RedEngine 5M Privacy Protector ile sistem kimliğinizi koruyun. Kolay kurulum ve güvenilir HWID koruması.",
    features: ["HWID koruması", "Kolay kurulum", "FiveM uyumlu", "Düzenli güncelleme"],
    price: 39.99,
    was: 59.00,
    img: "https://camo.githubusercontent.com/17885cb483c8892fb8aceeea3a77c7e3fbd605341b0f4b781aabddfceae00242/68747470733a2f2f7777772e6375737265762e636f6d2f706963732f797572696d6f642e636f6d5f36313536362e32353964376539612e77656270",
    imgWidth: 90,
    imgHeight: 90,
    logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/66108cc9b0267b2d54b1057b/0x0.png",
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "ham-spoofer",
    name: "[Ham Spoofer]",
    cat: "c",
    catLabel: "Spoofers",
    badge: null,
    desc: "Kısa ürün açıklaması buraya gelecek.",
    longDesc: "Ham Spoofer ile donanım kimliğinizi güvenle değiştirin. Ban sonrası hızlı geri dönüş için ideal.",
    features: ["Hızlı HWID reset", "Basit arayüz", "Güncel bypass", "Anında teslim"],
    price: 9.99,
    was: null,
    img: "https://i.imgur.com/8RvN26G.png",
    imgWidth: 90,
    imgHeight: 90,
    logo: "https://i.imgur.com/lrjvnzw.png",
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "spoofer-pro",
    name: "[Spoofer Pro]",
    cat: "c",
    catLabel: "Spoofers",
    badge: null,
    desc: "Kısa ürün açıklaması buraya gelecek.",
    longDesc: "Spoofer Pro, gelişmiş koruma katmanları ve geniş oyun desteği sunar.",
    features: ["Çoklu oyun desteği", "Gelişmiş spoof", "Kolay kullanım", "Destek hattı"],
    price: 9.99,
    was: null,
    img: "https://i.imgur.com/8RvN26G.png",
    imgWidth: 90,
    imgHeight: 90,
    logo: "https://i.imgur.com/lrjvnzw.png",
    logoWidth: 32,
    logoHeight: 32
  },
  {
    slug: "spoofer-lite",
    name: "[Spoofer Lite]",
    cat: "c",
    catLabel: "Spoofers",
    badge: null,
    desc: "Kısa ürün açıklaması buraya gelecek.",
    longDesc: "Spoofer Lite, bütçe dostu ve hafif bir HWID koruma çözümüdür.",
    features: ["Uygun fiyat", "Hızlı kurulum", "Temel koruma", "Anında lisans"],
    inStock: false,
    price: 9.99,
    was: null,
    img: "https://i.imgur.com/8RvN26G.png",
    imgWidth: 90,
    imgHeight: 90,
    logo: "https://i.imgur.com/lrjvnzw.png",
    logoWidth: 32,
    logoHeight: 32
  }
];

// ── urun.html bu fonksiyonu kullanır ─────────────────────────────────────
// URL'deki slug ile eşleşen ilanı bulur. Bulamazsa null döner.
function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

// ── Prototip 2.1.html "Satın Al" linklerini bu fonksiyonla oluşturur ─────
// Örn: productPageUrl("ham-executor") → "urun.html?slug=ham-executor"
function productPageUrl(slug) {
  return `urun.html?slug=${encodeURIComponent(slug)}`;
}
