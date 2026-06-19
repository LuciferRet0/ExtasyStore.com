const LANG = {
  tr: {
    products: "Ürünler", compare: "Karşılaştır", reviews: "Yorumlar", faq: "SSS",
    search: "Ürün ara...", cart: "Sepet", favorites: "Favoriler", theme: "Tema",
    inStock: "Stokta", outOfStock: "Tükendi", addCart: "Sepete Ekle", buyNow: "Satın Al",
    related: "Benzer Ürünler", share: "Paylaş", copied: "Link kopyalandı!",
    trust1: "Anında Teslimat", trust2: "Güvenli Ödeme", trust3: "7/24 Destek", trust4: "Test Edildi",
    delivery: "Teslimat Süreci", step1: "Satın Al", step2: "Ödeme Onayı", step3: "Anahtar Teslimi",
    coupon: "Kupon kodu", apply: "Uygula", discount: "İndirim", total: "Toplam",
    emptyCart: "Sepetiniz boş", goShop: "Mağazaya Git", checkout: "Ödemeye Geç",
    recentBuy: "az önce satın aldı", joinCommunity: "Topluluğa Katıl",
    productCompare: "Ürün Karşılaştırma", selectCompare: "Karşılaştırmak için ürün seçin",
    admin: "Admin", export: "Dışa Aktar", import: "İçe Aktar", save: "Kaydet",
    productFaq: "Ürün SSS", features: "Öne çıkan özellikler", backStore: "Mağazaya Dön",
    paymentSoon: "Ödeme sistemi (Shopier)", shopierInfo: "Shopier bağlantısı için SHOPIER-BAGLANTI.md dosyasına bakın.",
    home: "Ana Sayfa", all: "Tümü", off: "indirim"
  },
  en: {
    products: "Products", compare: "Compare", reviews: "Reviews", faq: "FAQ",
    search: "Search products...", cart: "Cart", favorites: "Favorites", theme: "Theme",
    inStock: "In Stock", outOfStock: "Sold Out", addCart: "Add to Cart", buyNow: "Buy Now",
    related: "Related Products", share: "Share", copied: "Link copied!",
    trust1: "Instant Delivery", trust2: "Secure Payment", trust3: "24/7 Support", trust4: "Tested",
    delivery: "Delivery Process", step1: "Purchase", step2: "Payment Confirm", step3: "Key Delivery",
    coupon: "Coupon code", apply: "Apply", discount: "Discount", total: "Total",
    emptyCart: "Your cart is empty", goShop: "Go to Store", checkout: "Checkout",
    recentBuy: "just purchased", joinCommunity: "Join Community",
    productCompare: "Product Comparison", selectCompare: "Select products to compare",
    admin: "Admin", export: "Export", import: "Import", save: "Save",
    productFaq: "Product FAQ", features: "Key Features", backStore: "Back to Store",
    paymentSoon: "Payment (Shopier)", shopierInfo: "See SHOPIER-BAGLANTI.md for Shopier setup.",
    home: "Home", all: "All", off: "off"
  }
};

function t(key) {
  const lang = Store.getLang();
  return (LANG[lang] && LANG[lang][key]) || LANG.tr[key] || key;
}
