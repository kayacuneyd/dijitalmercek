/**
 * Article Preview Component
 * Article preview molecule for blog posts
 */

class ArticlePreview extends HTMLElement {
  constructor() {
    super();
    this._article = null;
  }

  connectedCallback() {
    this.render();
  }

  set article(data) {
    this._article = data;
    this.render();
  }

  get article() {
    return this._article;
  }

  render() {
    if (!this._article) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 100px;"></div>';
      return;
    }

    const publishDate = new Date(this._article.date).toLocaleDateString('tr-TR');

    this.innerHTML = `
      <div class="article-preview">
        <h4 class="article-title mb-2">
          <a href="${this._article.link || '#'}" class="text-decoration-none" target="_blank" rel="noopener">
            ${this._article.title || 'Makale Başlığı'}
          </a>
        </h4>
        <div class="article-meta mb-2">
          <small class="text-muted">
            <i class="icon-calendar me-1"></i>
            ${publishDate}
            <span class="mx-2">•</span>
            <i class="icon-clock me-1"></i>
            ${this._article.readTime || '5 dk'}
          </small>
        </div>
        <p class="article-excerpt text-muted small mb-2">
          ${this._article.excerpt || 'Makale özeti...'}
        </p>
        <div class="article-stats">
          <small class="text-muted">
            <i class="icon-eye me-1"></i>
            ${this._article.views || 0} görüntüleme
            <span class="mx-2">•</span>
            <i class="icon-heart me-1"></i>
            ${this._article.likes || 0} beğeni
          </small>
        </div>
      </div>
    `;
  }
}

customElements.define('article-preview', ArticlePreview);
