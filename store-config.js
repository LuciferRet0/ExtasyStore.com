// Site genel ayarları — Discord, ödeme, kupon kodları
const STORE_CONFIG = {
  siteName: "ExtasyStore",
  discordUrl: "https://discord.gg/7E5pbp4yWz",
  currency: "€",

  // Shopier — gerçek bağlantı için SHOPIER-BAGLANTI.md dosyasına bak
  shopier: {
    enabled: false,
    apiKey: "BURAYA-SHOPIER-API-KEY",
    paymentUrl: "https://www.shopier.com/ShowProduct/api_pay4.php"
  },

  // Kupon kodları: kod → indirim yüzdesi
  coupons: {
    EXTASY10: 10,
    WELCOME5: 5,
    VIP20: 20
  },

  compareMax: 2,
  relatedCount: 3
};
