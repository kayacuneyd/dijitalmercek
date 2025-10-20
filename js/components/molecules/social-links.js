/**
 * Social Links Component
 * Social links molecule for social media links
 */

class SocialLinks extends HTMLElement {
  constructor() {
    super();
    this._links = [];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  set links(data) {
    this._links = data;
    this.render();
  }

  get links() {
    return this._links;
  }

  render() {
    if (!this._links || this._links.length === 0) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 40px;"></div>';
      return;
    }

    const linksHtml = this._links.map(link => `
      <a href="${link.url}" 
         class="social-link btn btn-outline-primary btn-sm me-2 mb-2" 
         target="_blank" 
         rel="noopener"
         data-platform="${link.platform}">
        <span class="me-1">${link.icon || '🔗'}</span>
        ${link.label || link.platform}
      </a>
    `).join('');

    this.innerHTML = `
      <div class="social-links">
        ${linksHtml}
      </div>
    `;
  }

  attachEventListeners() {
    const links = this.querySelectorAll('.social-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const platform = e.currentTarget.dataset.platform;
        this.dispatchEvent(new CustomEvent('social-click', {
          detail: { platform },
          bubbles: true
        }));
      });
    });
  }
}

customElements.define('social-links', SocialLinks);
