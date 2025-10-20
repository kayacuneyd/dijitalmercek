/**
 * Loader Spinner Component
 * Loading spinner Web Component with different styles and sizes
 */

class LoaderSpinner extends HTMLElement {
  constructor() {
    super();
    this.type = 'spinner';
    this.size = 'medium';
    this.color = null;
    this.text = '';
    this.visible = false;
  }

  static get observedAttributes() {
    return [
      'type',
      'size',
      'color',
      'text',
      'visible'
    ];
  }

  connectedCallback() {
    this.render();
    this.setupVisibility();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupVisibility();
    }
  }

  render() {
    // Get attributes
    this.type = this.getAttribute('type') || 'spinner';
    this.size = this.getAttribute('size') || 'medium';
    this.color = this.getAttribute('color') || null;
    this.text = this.getAttribute('text') || '';
    this.visible = this.hasAttribute('visible');

    // Build CSS classes
    const classes = this.buildClasses();

    // Build styles
    const styles = this.buildStyles();

    // Build spinner HTML
    const spinnerHtml = this.buildSpinnerHtml();

    // Build text HTML
    const textHtml = this.buildTextHtml();

    // Render HTML
    this.innerHTML = `
      <div class="${classes}" style="${styles}" role="status" aria-live="polite">
        ${spinnerHtml}
        ${textHtml}
      </div>
    `;
  }

  buildClasses() {
    const classes = ['loader', `loader-${this.type}`, `loader-${this.size}`];

    if (this.visible) {
      classes.push('loader-visible');
    }

    return classes.join(' ');
  }

  buildStyles() {
    const styles = [];

    if (this.color) {
      styles.push(`color: ${this.color}`);
    }

    return styles.join('; ');
  }

  buildSpinnerHtml() {
    switch (this.type) {
      case 'dots':
        return this.buildDotsHtml();
      case 'pulse':
        return this.buildPulseHtml();
      case 'bars':
        return this.buildBarsHtml();
      case 'ring':
        return this.buildRingHtml();
      case 'heartbeat':
        return this.buildHeartbeatHtml();
      default:
        return this.buildSpinnerHtml();
    }
  }

  buildSpinnerHtml() {
    return `
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Yükleniyor...</span>
      </div>
    `;
  }

  buildDotsHtml() {
    return `
      <div class="spinner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }

  buildPulseHtml() {
    return `
      <div class="spinner-pulse">
        <div class="pulse-circle"></div>
        <div class="pulse-circle"></div>
        <div class="pulse-circle"></div>
      </div>
    `;
  }

  buildBarsHtml() {
    return `
      <div class="spinner-bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    `;
  }

  buildRingHtml() {
    return `
      <div class="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  buildHeartbeatHtml() {
    return `
      <div class="spinner-heartbeat">
        <div class="heartbeat-pulse"></div>
      </div>
    `;
  }

  buildTextHtml() {
    if (!this.text) return '';

    return `
      <div class="loader-text">
        ${this.text}
      </div>
    `;
  }

  setupVisibility() {
    if (this.visible) {
      this.style.display = 'flex';
      this.setAttribute('aria-hidden', 'false');
    } else {
      this.style.display = 'none';
      this.setAttribute('aria-hidden', 'true');
    }
  }

  // Public methods
  show() {
    this.visible = true;
    this.setAttribute('visible', '');
    this.setupVisibility();
  }

  hide() {
    this.visible = false;
    this.removeAttribute('visible');
    this.setupVisibility();
  }

  setType(type) {
    this.type = type;
    this.setAttribute('type', type);
    this.render();
  }

  setSize(size) {
    this.size = size;
    this.setAttribute('size', size);
    this.render();
  }

  setColor(color) {
    this.color = color;
    if (color) {
      this.setAttribute('color', color);
    } else {
      this.removeAttribute('color');
    }
    this.render();
  }

  setText(text) {
    this.text = text;
    if (text) {
      this.setAttribute('text', text);
    } else {
      this.removeAttribute('text');
    }
    this.render();
  }

  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Static utility methods
  static createSpinner(type = 'spinner', size = 'medium', text = '') {
    const spinner = document.createElement('loader-spinner');
    spinner.setAttribute('type', type);
    spinner.setAttribute('size', size);
    if (text) {
      spinner.setAttribute('text', text);
    }
    return spinner;
  }

  static createButtonSpinner(text = 'Yükleniyor...') {
    const spinner = document.createElement('loader-spinner');
    spinner.setAttribute('type', 'spinner');
    spinner.setAttribute('size', 'small');
    spinner.setAttribute('text', text);
    return spinner;
  }

  static createPageSpinner(text = 'Sayfa yükleniyor...') {
    const spinner = document.createElement('loader-spinner');
    spinner.setAttribute('type', 'ring');
    spinner.setAttribute('size', 'large');
    spinner.setAttribute('text', text);
    return spinner;
  }

  static createInlineSpinner(text = '') {
    const spinner = document.createElement('loader-spinner');
    spinner.setAttribute('type', 'dots');
    spinner.setAttribute('size', 'small');
    if (text) {
      spinner.setAttribute('text', text);
    }
    return spinner;
  }

  static createOverlaySpinner(text = 'İşlem yapılıyor...') {
    const spinner = document.createElement('loader-spinner');
    spinner.setAttribute('type', 'pulse');
    spinner.setAttribute('size', 'large');
    spinner.setAttribute('text', text);
    spinner.classList.add('loader-overlay');
    return spinner;
  }
}

// Register the custom element
customElements.define('loader-spinner', LoaderSpinner);

// Export for use in other modules
export default LoaderSpinner;
