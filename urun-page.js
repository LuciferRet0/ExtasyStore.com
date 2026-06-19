// urun.html — ürün detay sayfası mantığı
function renderProductPage() {
  const root = document.getElementById('pageRoot');
  const slug = new URLSearchParams(location.search).get('slug');
  const product = slug ? Store.getProduct(slug) : null;

  if (!product) {
    document.title = t('seoNotFoundTitle');
    root.innerHTML = `
      <div class="not-found">
        <h1>${t('productNotFound')}</h1>
        <p>${t('productNotFoundDesc')}</p>
        <a href="index.html#products" class="btn btn-primary">${t('goShop')} →</a>
      </div>`;
    return;
  }

  Store.applySeo({
    title: `${product.name} — ExtasyStore`,
    desc: product.metaDesc,
    image: (product.images[0] || product.img || '').trim(),
    url: location.href
  });

  const disc = Store.discountPercent(product);
  const coupon = Store.getCoupon();
  const logoHtml = product.logo
    ? `<img class="logo-corner" src="${product.logo}" alt="" style="width:${product.logoWidth ?? 32}px;height:${product.logoHeight ?? 32}px;" />`
    : '';

  root.innerHTML = `
    <nav class="breadcrumb" data-i18n-aria="breadcrumbLabel" aria-label="${t('breadcrumbLabel')}">
      <a href="index.html">${t('home')}</a><span>/</span>
      <a href="${Store.categoryUrl(product.cat)}">${t('products')}</a><span>/</span>
      <span>${product.name}</span>
    </nav>

    <section class="product-page">
      <div class="product-layout">
        <div class="product-visual">
          ${Store.detailBadgesHtml(product)}
          <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
            ${Store.galleryHtml(product)}
          </div>
          ${logoHtml}
        </div>
        <div class="product-info">
          <a href="${Store.categoryUrl(product.cat)}" class="cat-tag">${product.catLabel}</a>
          <h1 class="product-title">${product.name}</h1>
          <p class="product-desc">${product.desc}</p>

          ${Store.trustBadgesHtml()}
          ${Store.timelineHtml()}

          <div class="price-box">
            <span class="price-from">${t('price')}</span>
            <div class="price-row">
              <span class="now" id="priceNow">${Store.formatPrice(product.price)}</span>
              ${product.was ? `<span class="was">${Store.formatPrice(product.was)}</span>` : ''}
              ${disc ? `<span class="badge discount" style="position:static;">-${disc}%</span>` : ''}
            </div>
            <p class="delivery-note"><span>●</span> ${t('trust1')}</p>

            <div class="coupon-row">
              <input type="text" id="couponInput" placeholder="${t('coupon')}" />
              <button type="button" class="btn btn-ghost" id="couponBtn">${t('apply')}</button>
            </div>
            <p class="coupon-msg" id="couponMsg"></p>

            ${product.inStock ? `
              <button type="button" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;" id="buyBtn">${t('buyNow')} — ${Store.formatPrice(product.price)}</button>
              <button type="button" class="btn btn-ghost" style="width:100%;justify-content:center;" id="addCartBtn">${t('addCart')}</button>
            ` : `<button class="btn btn-ghost" style="width:100%;" disabled>${t('outOfStock')}</button>`}
            <button type="button" class="btn btn-ghost" style="width:100%;justify-content:center;" id="shareBtn">🔗 ${t('share')}</button>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn btn-ghost icon-btn-sm${Store.isFav(slug) ? ' active' : ''}" id="favBtn" data-fav-slug="${slug}" style="width:auto;padding:10px 16px;">♥</button>
              <button type="button" class="btn btn-ghost icon-btn-sm${Store.getCompare().includes(slug) ? ' compare-on' : ''}" id="cmpBtn" data-compare-slug="${slug}" style="width:auto;padding:10px 16px;">⇔ ${t('compare')}</button>
            </div>
          </div>

          <div class="features">
            <h3 data-i18n="features">${t('features')}</h3>
            <ul>${product.features.map(f => `<li>${f}</li>`).join('')}</ul>
          </div>
        </div>
      </div>

      ${product.longDesc ? `<p class="long-desc">${product.longDesc}</p>` : ''}
      ${renderPorts(product.ports)}
      ${Store.productFaqHtml(product.faq)}
      <div id="relatedProducts"></div>
    </section>
  `;

  Store.bindGallery(root);
  Store.bindFaqAccordion(root);
  Store.renderRelated(slug, document.getElementById('relatedProducts'));

  document.getElementById('shareBtn')?.addEventListener('click', () => Store.shareProduct(slug));
  document.getElementById('favBtn')?.addEventListener('click', () => Store.toggleFav(slug));
  document.getElementById('cmpBtn')?.addEventListener('click', () => Store.toggleCompare(slug));
  document.getElementById('addCartBtn')?.addEventListener('click', () => Store.addToCart(slug));

  document.getElementById('buyBtn')?.addEventListener('click', () => {
    Store.checkout(null, product);
  });

  document.getElementById('couponBtn')?.addEventListener('click', () => {
    const code = document.getElementById('couponInput').value;
    const res = Store.applyCoupon(code);
    const msg = document.getElementById('couponMsg');
    if (res.ok) {
      const newPrice = Store.discountedTotal(product.price);
      document.getElementById('priceNow').textContent = Store.formatPrice(newPrice);
      msg.className = 'coupon-msg ok';
      msg.textContent = `${t('discount')}: %${res.percent} (${code.toUpperCase()})`;
    } else {
      msg.className = 'coupon-msg err';
      msg.textContent = t('invalidCoupon');
    }
  });
}

function renderPorts(ports) {
  if (!ports || !ports.length) return '';
  const active = ports.filter(p => p && p.text && String(p.text).trim());
  if (!active.length) return '';
  return `<div class="detail-ports">${active.map((port, i) => `
    <article class="port-card${port.full ? ' full' : ''}">
      <span class="port-label">${t('portLabel')} ${i + 1}</span>
      ${port.title ? `<h3 class="port-title">${port.title}</h3>` : ''}
      <div class="port-body">${port.text.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('')}</div>
    </article>`).join('')}</div>`;
}

  document.addEventListener('DOMContentLoaded', () => {
    Store.init({ recentPurchases: true, activePage: 'product' });
    renderProductPage();
    window.onLangChange = function() {
      renderProductPage();
    };
  });
