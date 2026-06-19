// English product content — merged when lang === "en"
const PRODUCT_I18N = {
  "tiago-private": {
    desc: "A zero-detection executor built by TIAGOMODZ.",
    longDesc: "Tiago Private is a premium FiveM executor with up-to-date anti-cheat bypass, stable injection, and regular updates. Your license key is delivered instantly after purchase.",
    features: ["Zero-detection focused", "Regular updates", "Instant license delivery", "Setup guide included"],
    metaDesc: "Tiago Private — Premium FiveM executor. Instant delivery, zero-detection focused.",
    ports: [
      { title: "About the Product", text: "Tiago Private is a premium executor designed for safe, stable use on FiveM servers.\nMaintained and tested regularly by the TIAGOMODZ team.", full: false },
      { title: "Setup Steps", text: "1. Receive your license key after purchase\n2. Download the file from the link\n3. Run as administrator and enter your key\n4. Open FiveM and activate from the menu", full: false },
      { title: "Important Notes", text: "We recommend removing the old version before each update.\nDo not share your license key — it is bound to a single device.", full: true },
      { title: "Support", text: null }
    ],
    faq: [
      { q: "Is Tiago Private safe?", a: "It is updated and tested regularly. Our support team will help you after purchase." },
      { q: "How many devices is the license valid for?", a: "Single-device license. HWID locked." }
    ]
  },
  "ham-executor": {
    desc: "Advanced FiveM executor with AI script creation, resource dumping, and event tools.",
    longDesc: "Ham Executor elevates your FiveM experience with AI-powered script creation, resource dumping, and advanced event tools. Fast menu, stable performance, and a wide feature set.",
    features: ["AI script builder", "Resource dump tools", "Fast and stable menu", "24/7 support"],
    ports: [
      { title: "About the Product", text: "Ham Executor elevates your FiveM experience with an AI-powered script engine, advanced resource dumping tools, and event tools. Fast menu, low latency, and high stability.", full: false },
      { title: "Setup Steps", text: "1. Receive your license key after purchase\n2. Download the latest version from the link\n3. Run as administrator and enter your key\n4. Launch FiveM and activate from the menu", full: false },
      { title: "Important Notes", text: "The AI script builder, resource dump, and event tools are for educational purposes only.\nWe recommend removing the old version before each update.", full: true },
      { title: "Support", text: null, full: false }
    ]
  },
  "eulen": {
    desc: "The most premium executor, well-known among FiveM spoofers and private executors for years.",
    longDesc: "Eulen is a premium brand recognized in the industry for years. It stands out with high stability, advanced protection layers, and professional support.",
    features: ["Premium stability", "Long-term update support", "Advanced protection", "Priority support"]
  },
  "fresh-rockstar": {
    desc: "Fresh Rockstar accounts.",
    longDesc: "Newly created, verified Rockstar accounts. Start using them immediately with instant delivery.",
    features: ["Fresh account guarantee", "Instant auto delivery", "Email access", "Bulk purchase support"]
  },
  "fresh-steam": {
    desc: "Fresh Steam accounts.",
    longDesc: "New Steam accounts with a clean history. Fast delivery and complete login credentials.",
    features: ["New account", "Email included", "Instant delivery", "Affordable price"]
  },
  "fresh-discord": {
    desc: "Fresh Discord accounts.",
    longDesc: "Verified Discord accounts. Token and email details delivered in full.",
    features: ["Verified account", "Token + email", "Fast delivery", "Support included"]
  },
  "redengine-privacy": {
    desc: "Advanced HWID protection and privacy protector for FiveM.",
    longDesc: "Protect your system identity with RedEngine 5M Privacy Protector. Easy setup and reliable HWID protection.",
    features: ["HWID protection", "Easy setup", "FiveM compatible", "Regular updates"]
  },
  "ham-spoofer": {
    desc: "Lightweight and fast spoofer solution for HWID protection.",
    longDesc: "Safely change your hardware identity with Ham Spoofer. Ideal for a quick return after a ban.",
    features: ["Fast HWID reset", "Simple interface", "Up-to-date bypass", "Instant delivery"]
  },
  "spoofer-pro": {
    desc: "Advanced protection layers and broad game support spoofer.",
    longDesc: "Spoofer Pro offers advanced protection layers and broad game support.",
    features: ["Multi-game support", "Advanced spoofing", "Easy to use", "Support line"]
  },
  "spoofer-lite": {
    desc: "Budget-friendly and lightweight HWID protection solution.",
    longDesc: "Spoofer Lite is a budget-friendly, lightweight HWID protection solution.",
    features: ["Affordable price", "Quick setup", "Basic protection", "Instant license"]
  }
};

function applyProductI18n(product, lang) {
  if (lang !== "en" || !product) return product;
  const tr = PRODUCT_I18N[product.slug];
  const catLabel = getCatLabel(product.cat);
  const base = { ...product, catLabel: catLabel || product.catLabel };
  if (!tr) return base;
  return {
    ...base,
    desc: tr.desc ?? base.desc,
    longDesc: tr.longDesc ?? base.longDesc,
    features: tr.features ?? base.features,
    metaDesc: tr.metaDesc ?? base.metaDesc,
    faq: tr.faq ?? base.faq,
    ports: tr.ports ?? base.ports
  };
}
