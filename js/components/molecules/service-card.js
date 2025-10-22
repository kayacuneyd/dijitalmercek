/**
 * Service Card Component
 * Service card molecule for displaying service offerings
 */

class ServiceCard extends HTMLElement {
  constructor() {
    super();
    this._service = null;
  }

  connectedCallback() {
    this.render();
  }

  set service(data) {
    this._service = data;
    this.render();
  }

  get service() {
    return this._service;
  }

  render() {
    if (!this._service) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 200px;"></div>';
      return;
    }

    const { title, description, icon } = this._service;
    const summary = this.formatSummary(description);
    const iconMarkup = this.createIconMarkup(icon, title);

    this.innerHTML = `
      <article class="card service-card service-card--compact h-100" tabindex="0">
        <div class="card-body">
          <div class="service-icon mb-3">
            ${iconMarkup}
          </div>
          <h3 class="service-card-title h5 mb-2">${title || 'Servis'}</h3>
          <p class="service-summary text-muted">${summary}</p>
        </div>
      </article>
    `;

    this.setupIconFallback();
  }

  formatSummary(text) {
    if (!text || typeof text !== 'string') {
      return 'Bu hizmet hakkında detaylar yakında eklenecek.';
    }

    const sentenceMatch = text.match(/[^.!?]+[.!?]/);
    if (sentenceMatch) {
      return sentenceMatch[0].trim();
    }

    return `${text.trim()}.`;
  }

  createIconMarkup(iconPath, title) {
    const fallbackSymbol = this.getIconFallbackSymbol();

    if (iconPath) {
      const safeTitle = title || 'servis';
      return `
        <span class="service-icon-wrapper">
          <img src="${iconPath}" alt="${safeTitle} ikon" class="service-icon-img" loading="lazy">
          <span class="service-icon-fallback" aria-hidden="true" hidden>${fallbackSymbol}</span>
        </span>
      `;
    }

    return `<span class="service-icon-fallback" aria-hidden="true">${fallbackSymbol}</span>`;
  }

  setupIconFallback() {
    const image = this.querySelector('.service-icon-img');
    const fallback = this.querySelector('.service-icon-fallback[hidden]');

    if (!image || !fallback) {
      return;
    }

    const showFallback = () => {
      fallback.hidden = false;
      image.setAttribute('hidden', '');
    };

    image.addEventListener('error', showFallback, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
    }
  }

  getIconFallbackSymbol() {
    const icons = {
      'web-development': '💻',
      'ui-ux-design': '🎨',
      'ecommerce': '🛒',
      'mobile-app': '📱',
      'seo-optimization': '📈',
      'maintenance': '🛠️',
      'wordpress': '📰',
      'api-development': '🔗'
    };

    return icons[this._service?.id] || '⚙️';
  }
}

customElements.define('service-card', ServiceCard);
