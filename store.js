const Store = {
  KEYS: {
    cart: "extasy_cart",
    favs: "extasy_favs",
    compare: "extasy_compare",
    theme: "extasy_theme",
    lang: "extasy_lang",
    coupon: "extasy_coupon",
    productsOverride: "extasy_products_override"
  },

  _coupon: null,

  init(options = {}) {
    this.applyTheme(this.getTheme());
    this.applyLang(this.getLang());
    this.ensureToastWrap();
    if (options.nav !== false) this.renderNavExtras(options.activePage || "");
    if (options.recentPurchases) this.startRecentPurchases();
    if (options.discordLinks !== false) this.bindDiscordLinks();
    this.handleCategoryFromUrl();
    this.updateBadges();
  },

  getProducts() {
    let list = typeof products !== "undefined" ? products : [];
    try {
      const override = localStorage.getItem(this.KEYS.productsOverride);
      if (override) list = JSON.parse(override);
    } catch (e) {}
    return list.map(p => this.enrichProduct(p));
  },

  enrichProduct(p) {
    const img = (p.img || "").trim();
    return {
      ...p,
      inStock: p.inStock !== false,
      images: p.images && p.images.length ? p.images : (img ? [img] : []),
      faq: p.faq || [],
      metaDesc: p.metaDesc || p.desc || ""
    };
  },

  getProduct(slug) {
    return this.getProducts().find(p => p.slug === slug) || null;
  },

  discountPercent(p) {
    if (!p.was || p.was <= p.price) return 0;
    return Math.round((1 - p.price / p.was) * 100);
  },

  formatPrice(n) {
    return n.toFixed(2) + (STORE_CONFIG.currency || "€");
  },

  getLang() { return localStorage.getItem(this.KEYS.lang) || "tr"; },
  setLang(l) { localStorage.setItem(this.KEYS.lang, l); this.applyLang(l); },
  toggleLang() { this.setLang(this.getLang() === "tr" ? "en" : "tr"); },

  applyLang(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (LANG[l] && LANG[l][key]) el.textContent = LANG[l][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (LANG[l] && LANG[l][key]) el.placeholder = LANG[l][key];
    });
  },

  getTheme() { return localStorage.getItem(this.KEYS.theme) || "dark"; },
  setTheme(t) { localStorage.setItem(this.KEYS.theme, t); this.applyTheme(t); },
  toggleTheme() { this.setTheme(this.getTheme() === "dark" ? "light" : "dark"); },

  applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = t === "dark" ? "☀" : "☾";
  },

  _readJsonArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  },

  _normalizeCart(raw) {
    const map = new Map();
    for (const item of raw) {
      if (!item || typeof item.slug !== "string") continue;
      if (!this.getProduct(item.slug)) continue;
      const qty = Math.max(1, Number(item.qty) || 1);
      map.set(item.slug, (map.get(item.slug) || 0) + qty);
    }
    return [...map.entries()].map(([slug, qty]) => ({ slug, qty }));
  },

  _normalizeFavs(raw) {
    const seen = new Set();
    const favs = [];
    for (const slug of raw) {
      if (typeof slug !== "string" || seen.has(slug)) continue;
      if (!this.getProduct(slug)) continue;
      seen.add(slug);
      favs.push(slug);
    }
    return favs;
  },

  /* ── Sepet ── */
  getCart() {
    const raw = this._readJsonArray(this.KEYS.cart);
    const cart = this._normalizeCart(raw);
    if (JSON.stringify(cart) !== JSON.stringify(raw)) {
      localStorage.setItem(this.KEYS.cart, JSON.stringify(cart));
    }
    return cart;
  },
  saveCart(c) {
    const cart = this._normalizeCart(Array.isArray(c) ? c : []);
    localStorage.setItem(this.KEYS.cart, JSON.stringify(cart));
    this.updateBadges();
  },

  addToCart(slug, qty = 1) {
    const p = this.getProduct(slug);
    if (!p || !p.inStock) return false;
    const cart = this.getCart();
    const i = cart.findIndex(x => x.slug === slug);
    if (i >= 0) cart[i].qty += qty;
    else cart.push({ slug, qty });
    this.saveCart(cart);
    this.toast(p.name + " → " + t("cart"));
    return true;
  },

  updateCartQty(slug, qty) {
    let cart = this.getCart();
    if (qty <= 0) cart = cart.filter(x => x.slug !== slug);
    else {
      const i = cart.findIndex(x => x.slug === slug);
      if (i >= 0) cart[i].qty = qty;
    }
    this.saveCart(cart);
  },

  removeFromCart(slug) { this.updateCartQty(slug, 0); },

  cartTotal() {
    return this.getCart().reduce((sum, item) => {
      const p = this.getProduct(item.slug);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },

  cartCount() {
    return this.getCart().reduce((s, i) => s + i.qty, 0);
  },

  /* ── Favoriler ── */
  getFavs() {
    const raw = this._readJsonArray(this.KEYS.favs);
    const favs = this._normalizeFavs(raw);
    if (JSON.stringify(favs) !== JSON.stringify(raw)) {
      localStorage.setItem(this.KEYS.favs, JSON.stringify(favs));
    }
    return favs;
  },
  isFav(slug) { return this.getFavs().includes(slug); },
  toggleFav(slug) {
    let favs = this.getFavs();
    if (favs.includes(slug)) favs = favs.filter(s => s !== slug);
    else favs.push(slug);
    localStorage.setItem(this.KEYS.favs, JSON.stringify(favs));
    this.updateBadges();
    document.querySelectorAll(`[data-fav-slug="${slug}"]`).forEach(btn => {
      btn.classList.toggle("active", favs.includes(slug));
    });
    if (typeof window.refreshFavorites === "function") window.refreshFavorites();
  },

  /* ── Karşılaştırma ── */
  getCompare() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.compare)) || []; }
    catch { return []; }
  },
  toggleCompare(slug) {
    let list = this.getCompare();
    if (list.includes(slug)) list = list.filter(s => s !== slug);
    else {
      if (list.length >= STORE_CONFIG.compareMax) {
        list.shift();
      }
      list.push(slug);
    }
    localStorage.setItem(this.KEYS.compare, JSON.stringify(list));
    this.updateCompareBar();
    document.querySelectorAll(`[data-compare-slug="${slug}"]`).forEach(btn => {
      btn.classList.toggle("compare-on", list.includes(slug));
    });
  },

  clearCompare() {
    localStorage.setItem(this.KEYS.compare, "[]");
    this.updateCompareBar();
    document.querySelectorAll("[data-compare-slug]").forEach(btn => btn.classList.remove("compare-on"));
  },

  updateCompareBar() {
    let bar = document.getElementById("compareBar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "compareBar";
      bar.className = "compare-bar wrap";
      document.body.appendChild(bar);
    }
    const slugs = this.getCompare();
    if (!slugs.length) { bar.classList.remove("show"); return; }
    bar.classList.add("show");
    bar.innerHTML = `
      <div class="compare-bar-items">
        <strong>${t("productCompare")}:</strong>
        ${slugs.map(slug => {
          const p = this.getProduct(slug);
          return p ? `<span class="compare-chip">${p.name}<button type="button" data-rm-compare="${slug}">×</button></span>` : "";
        }).join("")}
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" id="clearCompare">Temizle</button>
        <a href="index.html#product-compare" class="btn btn-primary">${t("compare")}</a>
      </div>
    `;
    bar.querySelectorAll("[data-rm-compare]").forEach(btn => {
      btn.onclick = () => this.toggleCompare(btn.dataset.rmCompare);
    });
    const clearBtn = document.getElementById("clearCompare");
    if (clearBtn) clearBtn.onclick = () => this.clearCompare();
  },

  renderCompareTable(container) {
    if (!container) return;
    const slugs = this.getCompare();
    const items = slugs.map(s => this.getProduct(s)).filter(Boolean);
    if (items.length < 2) {
      container.innerHTML = `<p style="color:var(--text-dim);padding:20px 0;">${t("selectCompare")} (max ${STORE_CONFIG.compareMax})</p>`;
      return;
    }
    const rows = [
      ["", ...items.map(p => `<a href="${productPageUrl(p.slug)}">${p.name}</a>`)],
      [t("products"), ...items.map(p => p.catLabel)],
      ["Fiyat", ...items.map(p => this.formatPrice(p.price))],
      [t("discount"), ...items.map(p => this.discountPercent(p) ? `%${this.discountPercent(p)}` : "—")],
      [t("inStock"), ...items.map(p => p.inStock ? t("inStock") : t("outOfStock"))],
      [t("features"), ...items.map(p => (p.features || []).slice(0, 4).join(", "))]
    ];
    container.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          ${rows.map((row, ri) => `
            <tr>
              ${row.map((cell, ci) => ri === 0 && ci === 0 ? `<th></th>` : ri === 0 ? `<th>${cell}</th>` : ci === 0 ? `<td class="label">${cell}</td>` : `<td>${cell}</td>`).join("")}
            </tr>
          `).join("")}
        </table>
      </div>
    `;
  },

  /* ── Kupon ── */
  getCoupon() {
    if (this._coupon) return this._coupon;
    try { return JSON.parse(localStorage.getItem(this.KEYS.coupon)); } catch { return null; }
  },
  applyCoupon(code) {
    const c = (code || "").trim().toUpperCase();
    if (STORE_CONFIG.coupons[c]) {
      this._coupon = { code: c, percent: STORE_CONFIG.coupons[c] };
      localStorage.setItem(this.KEYS.coupon, JSON.stringify(this._coupon));
      return { ok: true, percent: this._coupon.percent };
    }
    this._coupon = null;
    localStorage.removeItem(this.KEYS.coupon);
    return { ok: false };
  },
  discountedTotal(base) {
    const c = this.getCoupon();
    if (!c) return base;
    return base * (1 - c.percent / 100);
  },

  /* ── SEO ── */
  applySeo({ title, desc, image, url }) {
    document.title = title;
    const setMeta = (name, content, prop) => {
      if (!content) return;
      let el = document.querySelector(prop ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (prop) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", image, true);
    setMeta("og:url", url || location.href, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
  },

  /* ── Arama ── */
  searchProducts(query) {
    const q = (query || "").toLowerCase().trim();
    if (!q) return this.getProducts();
    return this.getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.catLabel.toLowerCase().includes(q)
    );
  },

  /* ── Benzer ürünler ── */
  getRelated(slug, count = STORE_CONFIG.relatedCount) {
    const p = this.getProduct(slug);
    if (!p) return [];
    return this.getProducts()
      .filter(x => x.slug !== slug && x.cat === p.cat)
      .slice(0, count);
  },

  /* ── Ödeme (Shopier stub) ── */
  checkout(items, singleProduct) {
    const total = singleProduct
      ? singleProduct.price
      : items.reduce((s, i) => {
          const p = this.getProduct(i.slug);
          return s + (p ? p.price * i.qty : 0);
        }, 0);
    const finalTotal = this.discountedTotal(total);

    if (singleProduct && singleProduct.shopierUrl) {
      window.location.href = singleProduct.shopierUrl;
      return;
    }

    if (STORE_CONFIG.shopier.enabled && STORE_CONFIG.shopier.apiKey !== "BURAYA-SHOPIER-API-KEY") {
      alert("Shopier yönlendirmesi — SHOPIER-BAGLANTI.md dosyasındaki adımları tamamlayın.\n\nTutar: " + this.formatPrice(finalTotal));
      return;
    }
    alert(
      t("shopierInfo") + "\n\n" +
      (singleProduct ? singleProduct.name : t("cart")) + "\n" +
      t("total") + ": " + this.formatPrice(finalTotal)
    );
  },

  /* ── Paylaş ── */
  shareProduct(slug) {
    const url = location.origin + location.pathname.replace(/[^/]*$/, "") + productPageUrl(slug);
    const shareUrl = url.startsWith("http") ? url : productPageUrl(slug);
    navigator.clipboard.writeText(shareUrl).then(() => this.toast(t("copied"))).catch(() => {
      prompt(t("share"), shareUrl);
    });
  },

  /* ── Discord ── */
  bindDiscordLinks() {
    document.querySelectorAll("[data-discord], .btn-discord, .cta-discord").forEach(el => {
      if (el.tagName === "A") el.href = STORE_CONFIG.discordUrl;
      else el.onclick = () => window.open(STORE_CONFIG.discordUrl, "_blank");
    });
  },

  handleCategoryFromUrl() {
    const hash = location.hash;
    const m = hash.match(/[?&]cat=([a-d])/);
    if (m && typeof applyFilters === "function") {
      setTimeout(() => {
        const pill = document.querySelector(`.pill[data-cat="${m[1]}"]`);
        if (pill) pill.click();
      }, 100);
    }
  },

  categoryUrl(cat) {
    return `index.html#products?cat=${cat}`;
  },

  /* ── Nav ── */
  renderNavExtras(activePage) {
    const toolsSlot = document.getElementById("navTools");
    if (!toolsSlot || document.getElementById("storeNavExtras")) return;

    const extras = document.createElement("div");
    extras.id = "storeNavExtras";
    extras.innerHTML = `
      <input type="search" class="nav-search" id="navSearch" data-i18n-placeholder="search" placeholder="${t("search")}" />
      <div class="nav-tools-group">
        <button type="button" class="lang-toggle" id="langToggle">${this.getLang().toUpperCase()}</button>
        <button type="button" class="theme-toggle" id="themeToggle">${this.getTheme() === "dark" ? "☀" : "☾"}</button>
        <a href="sepet.html" class="nav-icon-btn" title="${t("cart")}">🛒<span class="nav-badge" id="cartBadge">0</span></a>
        <a href="index.html#favorites" class="nav-icon-btn" title="${t("favorites")}">♥<span class="nav-badge" id="favBadge">0</span></a>
        <a href="admin.html" class="nav-icon-btn" title="${t("admin")}">⚙</a>
      </div>
    `;
    toolsSlot.appendChild(extras);

    document.getElementById("langToggle").onclick = () => {
      this.toggleLang();
      document.getElementById("langToggle").textContent = this.getLang().toUpperCase();
    };
    document.getElementById("themeToggle").onclick = () => this.toggleTheme();

    const search = document.getElementById("navSearch");
    if (search) {
      search.addEventListener("input", () => {
        if (typeof onStoreSearch === "function") onStoreSearch(search.value);
      });
    }
    this.updateBadges();
    this.updateCompareBar();
  },

  updateBadges() {
    const cb = document.getElementById("cartBadge");
    const fb = document.getElementById("favBadge");
    const cartN = this.cartCount();
    const favN = this.getFavs().length;
    if (cb) {
      cb.textContent = String(cartN);
      cb.classList.toggle("is-zero", cartN === 0);
    }
    if (fb) {
      fb.textContent = String(favN);
      fb.classList.toggle("is-zero", favN === 0);
    }
  },

  /* ── Toast / son satın alma ── */
  ensureToastWrap() {
    if (!document.getElementById("toastWrap")) {
      const w = document.createElement("div");
      w.id = "toastWrap";
      w.className = "toast-wrap";
      document.body.appendChild(w);
    }
  },

  toast(msg) {
    this.ensureToastWrap();
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.getElementById("toastWrap").appendChild(el);
    setTimeout(() => el.remove(), 3500);
  },

  startRecentPurchases() {
    const names = ["xNightRaven", "v4peGod_47", "ghostbyte99", "lux3Run", "pixel_dr1ft"];
    const show = () => {
      const prods = this.getProducts();
      if (!prods.length) return;
      const p = prods[Math.floor(Math.random() * prods.length)];
      const n = names[Math.floor(Math.random() * names.length)];
      this.toast(`★ ${n} — ${p.name.replace(/[\[\]]/g, "")} ${t("recentBuy")}`);
    };
    setTimeout(show, 8000);
    setInterval(show, 22000);
  },

  /* ── Kart render yardımcıları ── */
  promoBadgeHtml(p) {
    let html = "";
    if (p.badge === "new") html += `<span class="badge new">YENİ</span>`;
    if (p.badge === "best") html += `<span class="badge best">ÇOK SATAN</span>`;
    if (p.badge === "expert") html += `<span class="badge expert">EXPERT</span>`;
    const disc = this.discountPercent(p);
    if (disc) html += `<span class="badge discount">-${disc}%</span>`;
    return html;
  },

  stockBadgeHtml(p) {
    return p.inStock
      ? `<span class="badge stock-ok">${t("inStock")}</span>`
      : `<span class="badge stock-no">${t("outOfStock")}</span>`;
  },

  badgeHtml(p) {
    return this.promoBadgeHtml(p) + this.stockBadgeHtml(p);
  },

  detailBadgesHtml(p) {
    return `
      <div class="product-detail-badges card-top-badges" style="position:absolute;top:16px;left:16px;">
        ${this.promoBadgeHtml(p)}
      </div>
      <div class="card-stock-badge" style="bottom:16px;left:16px;top:auto;">
        ${this.stockBadgeHtml(p)}
      </div>`;
  },

  productCardHtml(p) {
    const favActive = this.isFav(p.slug) ? " active" : "";
    const cmpActive = this.getCompare().includes(p.slug) ? " compare-on" : "";
    return `
      <div class="product-card${p.inStock ? "" : " out-of-stock"}" data-cat="${p.cat}" data-slug="${p.slug}">
        <div class="product-thumb" style="background:linear-gradient(135deg,var(--surface-2),var(--bg));position:relative;padding:0;overflow:hidden;">
          <div class="card-top-badges">${this.promoBadgeHtml(p)}</div>
          <div class="card-stock-badge">${this.stockBadgeHtml(p)}</div>
          <div class="card-quick-actions">
            <button type="button" class="icon-btn-sm${favActive}" data-fav-slug="${p.slug}" title="${t("favorites")}">♥</button>
            <button type="button" class="icon-btn-sm${cmpActive}" data-compare-slug="${p.slug}" title="${t("compare")}">⇔</button>
          </div>
          <a href="${productPageUrl(p.slug)}">
            <img loading="lazy" src="${(p.img || "").trim()}" alt="${p.name}" style="max-width:90px;max-height:90px;margin:auto;display:block;border-radius:9px;box-shadow:0 2px 10px #0004;" />
          </a>
          ${p.logo ? `<img src="${p.logo}" alt="" style="width:${p.logoWidth || 32}px;height:${p.logoHeight || 32}px;position:absolute;right:8px;bottom:8px;border-radius:7px;border:1.5px solid #0002;background:#fff1;object-fit:cover;" />` : ""}
        </div>
        <div class="product-body">
          <a href="${productPageUrl(p.slug)}"><h4>${p.name}</h4></a>
          <p>${p.desc}</p>
          <div>
            <span class="price-from">Fiyat</span>
            <div class="price-row">
              <span class="now">${this.formatPrice(p.price)}</span>
              ${p.was ? `<span class="was">${this.formatPrice(p.was)}</span>` : ""}
            </div>
          </div>
          <div class="product-card-actions">
            ${p.inStock ? `<button type="button" class="btn btn-ghost" data-add-cart="${p.slug}">${t("addCart")}</button>` : ""}
            <a href="${productPageUrl(p.slug)}" class="btn btn-primary">${t("buyNow")}</a>
          </div>
        </div>
      </div>
    `;
  },

  bindProductCards(container) {
    if (!container) return;
    container.querySelectorAll("[data-add-cart]").forEach(btn => {
      btn.onclick = () => this.addToCart(btn.dataset.addCart);
    });
    container.querySelectorAll("[data-fav-slug]").forEach(btn => {
      btn.onclick = e => { e.preventDefault(); e.stopPropagation(); this.toggleFav(btn.dataset.favSlug); };
    });
    container.querySelectorAll("[data-compare-slug]").forEach(btn => {
      btn.onclick = e => { e.preventDefault(); e.stopPropagation(); this.toggleCompare(btn.dataset.compareSlug); };
    });
  },

  renderRelated(slug, container) {
    if (!container) return;
    const related = this.getRelated(slug);
    if (!related.length) { container.innerHTML = ""; return; }
    container.innerHTML = `
      <h2 class="section-title" style="margin-top:48px;font-family:var(--display);">${t("related")}</h2>
      <div class="related-grid">
        ${related.map(p => `
          <a href="${productPageUrl(p.slug)}" class="related-card">
            <img src="${(p.images[0] || p.img || "").trim()}" alt="${p.name}" />
            <div><h4>${p.name}</h4><span class="price">${this.formatPrice(p.price)}</span></div>
          </a>
        `).join("")}
      </div>
    `;
  },

  trustBadgesHtml() {
    return `
      <div class="trust-row">
        <div class="trust-item"><span>⚡</span>${t("trust1")}</div>
        <div class="trust-item"><span>🔒</span>${t("trust2")}</div>
        <div class="trust-item"><span>💬</span>${t("trust3")}</div>
        <div class="trust-item"><span>✓</span>${t("trust4")}</div>
      </div>
    `;
  },

  timelineHtml() {
    return `
      <div class="timeline">
        <div class="timeline-step"><div class="timeline-dot">1</div><span>${t("step1")}</span></div>
        <div class="timeline-step"><div class="timeline-dot">2</div><span>${t("step2")}</span></div>
        <div class="timeline-step"><div class="timeline-dot">3</div><span>${t("step3")}</span></div>
      </div>
    `;
  },

  galleryHtml(p, mainId = "galleryMain") {
    const imgs = p.images && p.images.length ? p.images : [(p.img || "").trim()];
    return `
      <img class="gallery-main" id="${mainId}" src="${imgs[0]}" alt="${p.name}" />
      ${imgs.length > 1 ? `
        <div class="gallery-thumbs">
          ${imgs.map((src, i) => `
            <img class="gallery-thumb${i === 0 ? " active" : ""}" src="${src.trim()}" alt="" data-gallery-target="${mainId}" />
          `).join("")}
        </div>
      ` : ""}
    `;
  },

  bindGallery(root) {
    (root || document).querySelectorAll(".gallery-thumb").forEach(thumb => {
      thumb.onclick = () => {
        const main = document.getElementById(thumb.dataset.galleryTarget);
        if (main) main.src = thumb.src;
        thumb.parentElement.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
      };
    });
  },

  productFaqHtml(faqList) {
    if (!faqList || !faqList.length) return "";
    return `
      <div class="features" style="margin-top:24px;">
        <h3>${t("productFaq")}</h3>
        <div class="faq-list" style="margin-top:12px;">
          ${faqList.map((f, i) => `
            <div class="faq-item" data-faq-i="${i}">
              <button type="button" class="faq-q">${f.q}<span class="chev">+</span></button>
              <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  bindFaqAccordion(root) {
    const list = (root || document).querySelector(".faq-list");
    if (!list || list._bound) return;
    list._bound = true;
    list.addEventListener("click", e => {
      const btn = e.target.closest(".faq-q");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("open");
      list.querySelectorAll(".faq-item").forEach(it => {
        it.classList.remove("open");
        it.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  }
};
