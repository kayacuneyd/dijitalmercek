/**
 * Base Button Component
 * Customizable button Web Component with variants and states
 */

class BaseButton extends HTMLElement {
  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'medium';
    this.disabled = false;
    this.loading = false;
    this.icon = null;
    this.iconPosition = 'left';
    this.originalContent = '';
  }

  static get observedAttributes() {
    return [
      'variant',
      'size',
      'disabled',
      'loading',
      'icon',
      'icon-position',
      'href',
      'type'
    ];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Get attributes
    this.variant = this.getAttribute('variant') || 'primary';
    this.size = this.getAttribute('size') || 'medium';
    this.disabled = this.hasAttribute('disabled');
    this.loading = this.hasAttribute('loading');
    this.icon = this.getAttribute('icon') || null;
    this.iconPosition = this.getAttribute('icon-position') || 'left';
    const href = this.getAttribute('href');
    const type = this.getAttribute('type') || 'button';

    // Store original content if not already stored
    if (!this.originalContent) {
      this.originalContent = this.innerHTML.trim();
    }

    // Build CSS classes
    const classes = this.buildClasses();

    // Build icon HTML
    const iconHtml = this.buildIconHtml();

    // Build content
    const content = this.buildContent(iconHtml);

    // Determine tag name
    const tagName = href ? 'a' : 'button';

    // Build attributes
    const attributes = this.buildAttributes(href, type);

    // Render HTML
    this.innerHTML = `
      <${tagName} class="${classes}" ${attributes}>
        ${content}
      </${tagName}>
    `;
  }

  buildClasses() {
    const classes = ['btn', `btn-${this.variant}`, `btn-${this.size}`];

    if (this.disabled) {
      classes.push('disabled');
    }

    if (this.loading) {
      classes.push('loading');
    }

    return classes.join(' ');
  }

  buildIconHtml() {
    if (!this.icon) return '';

    const iconClass = this.icon.startsWith('icon-') ? this.icon : `icon-${this.icon}`;
    return `<i class="${iconClass}" aria-hidden="true"></i>`;
  }

  buildContent(iconHtml) {
    let content = '';

    if (this.loading) {
      content = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Yükleniyor...
      `;
    } else {
      if (this.icon && this.iconPosition === 'left') {
        content += `${iconHtml} `;
      }

      content += this.originalContent || this.textContent || '';

      if (this.icon && this.iconPosition === 'right') {
        content += ` ${iconHtml}`;
      }
    }

    return content;
  }

  buildAttributes(href, type) {
    const attributes = [];

    if (href) {
      attributes.push(`href="${href}"`);
    } else {
      attributes.push(`type="${type}"`);
    }

    if (this.disabled) {
      attributes.push('disabled');
    }

    if (this.hasAttribute('aria-label')) {
      attributes.push(`aria-label="${this.getAttribute('aria-label')}"`);
    }

    if (this.hasAttribute('aria-describedby')) {
      attributes.push(`aria-describedby="${this.getAttribute('aria-describedby')}"`);
    }

    return attributes.join(' ');
  }

  attachEventListeners() {
    const button = this.querySelector('button, a');
    if (button) {
      button.addEventListener('click', this.handleClick.bind(this));
      button.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  removeEventListeners() {
    const button = this.querySelector('button, a');
    if (button) {
      button.removeEventListener('click', this.handleClick.bind(this));
      button.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled,
        loading: this.loading
      },
      bubbles: true
    }));
  }

  handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('button-activate', {
        detail: {
          variant: this.variant,
          size: this.size,
          disabled: this.disabled,
          loading: this.loading,
          key: event.key
        },
        bubbles: true
      }));
    }
  }

  // Public methods
  setLoading(loading) {
    this.loading = loading;
    if (loading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
    this.render();
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    this.render();
  }

  setVariant(variant) {
    this.variant = variant;
    this.setAttribute('variant', variant);
    this.render();
  }

  setSize(size) {
    this.size = size;
    this.setAttribute('size', size);
    this.render();
  }

  setIcon(icon, position = 'left') {
    this.icon = icon;
    this.iconPosition = position;
    this.setAttribute('icon', icon);
    this.setAttribute('icon-position', position);
    this.render();
  }

  getButtonElement() {
    return this.querySelector('button, a');
  }

  focus() {
    const button = this.getButtonElement();
    if (button) {
      button.focus();
    }
  }

  blur() {
    const button = this.getButtonElement();
    if (button) {
      button.blur();
    }
  }
}

// Register the custom element
customElements.define('base-button', BaseButton);

// Export for use in other modules
export default BaseButton;
