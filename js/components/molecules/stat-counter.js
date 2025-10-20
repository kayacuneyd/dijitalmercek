/**
 * Stat Counter Component
 * Stat counter molecule for displaying statistics
 */

class StatCounter extends HTMLElement {
  constructor() {
    super();
    this._stat = null;
  }

  connectedCallback() {
    this.render();
  }

  set stat(data) {
    this._stat = data;
    this.render();
  }

  get stat() {
    return this._stat;
  }

  render() {
    if (!this._stat) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 80px;"></div>';
      return;
    }

    this.innerHTML = `
      <div class="stat-counter text-center">
        <div class="stat-icon mb-2">
          <span class="fs-2">${this._stat.icon || '📊'}</span>
        </div>
        <div class="stat-number h4 mb-1 fw-bold text-primary">
          ${this._stat.number || '0'}${this._stat.suffix || ''}
        </div>
        <div class="stat-label text-muted small">
          ${this._stat.label || 'İstatistik'}
        </div>
      </div>
    `;
  }
}

customElements.define('stat-counter', StatCounter);
