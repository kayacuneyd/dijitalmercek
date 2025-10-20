/**
 * Badge Tag Component
 * Flexible badge/tag Web Component for skills, categories, and labels
 */

class BadgeTag extends HTMLElement {
  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'medium';
    this.removable = false;
    this.clickable = false;
    this.icon = null;
    this.color = null;
    this.backgroundColor = null;
  }

  static get observedAttributes() {
    return [
      'variant',
      'size',
      'removable',
      'clickable',
      'icon',
      'color',
      'background-color'
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
    this.removable = this.hasAttribute('removable');
    this.clickable = this.hasAttribute('clickable');
    this.icon = this.getAttribute('icon') || null;
    this.color = this.getAttribute('color') || null;
    this.backgroundColor = this.getAttribute('background-color') || null;

    // Build CSS classes
    const classes = this.buildClasses();

    // Build icon HTML
    const iconHtml = this.buildIconHtml();

    // Build remove button HTML
    const removeButtonHtml = this.buildRemoveButtonHtml();

    // Build content
    const content = this.buildContent(iconHtml, removeButtonHtml);

    // Build styles
    const styles = this.buildStyles();

    // Render HTML
    this.innerHTML = `
      <span class="${classes}" style="${styles}" role="${this.clickable ? 'button' : 'text'}" tabindex="${this.clickable ? '0' : '-1'}">
        ${content}
      </span>
    `;
  }

  buildClasses() {
    const classes = ['badge', `badge-${this.variant}`, `badge-${this.size}`];

    if (this.removable) {
      classes.push('badge-removable');
    }

    if (this.clickable) {
      classes.push('badge-clickable');
    }

    if (this.icon) {
      classes.push('badge-with-icon');
    }

    return classes.join(' ');
  }

  buildIconHtml() {
    if (!this.icon) return '';

    const iconClass = this.icon.startsWith('icon-') ? this.icon : `icon-${this.icon}`;
    return `<i class="${iconClass} me-1" aria-hidden="true"></i>`;
  }

  buildRemoveButtonHtml() {
    if (!this.removable) return '';

    return `
      <button type="button" class="badge-remove" aria-label="Kaldır">
        <i class="icon-close" aria-hidden="true"></i>
      </button>
    `;
  }

  buildContent(iconHtml, removeButtonHtml) {
    let content = '';

    // Add icon
    if (this.icon) {
      content += iconHtml;
    }

    // Add text content
    content += this.textContent || this.innerHTML;

    // Add remove button
    if (this.removable) {
      content += removeButtonHtml;
    }

    return content;
  }

  buildStyles() {
    const styles = [];

    if (this.color) {
      styles.push(`color: ${this.color}`);
    }

    if (this.backgroundColor) {
      styles.push(`background-color: ${this.backgroundColor}`);
    }

    return styles.join('; ');
  }

  attachEventListeners() {
    const badge = this.querySelector('.badge');
    if (!badge) return;

    // Click event for clickable badges
    if (this.clickable) {
      badge.addEventListener('click', this.handleClick.bind(this));
      badge.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    // Remove button event
    const removeButton = this.querySelector('.badge-remove');
    if (removeButton) {
      removeButton.addEventListener('click', this.handleRemove.bind(this));
    }
  }

  removeEventListeners() {
    const badge = this.querySelector('.badge');
    if (!badge) return;

    badge.removeEventListener('click', this.handleClick.bind(this));
    badge.removeEventListener('keydown', this.handleKeydown.bind(this));

    const removeButton = this.querySelector('.badge-remove');
    if (removeButton) {
      removeButton.removeEventListener('click', this.handleRemove.bind(this));
    }
  }

  handleClick(event) {
    if (!this.clickable) return;

    // Don't trigger if remove button was clicked
    if (event.target.closest('.badge-remove')) return;

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('badge-click', {
      detail: {
        variant: this.variant,
        size: this.size,
        text: this.textContent.trim(),
        removable: this.removable
      },
      bubbles: true
    }));
  }

  handleKeydown(event) {
    if (!this.clickable) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  handleRemove(event) {
    event.preventDefault();
    event.stopPropagation();

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('badge-remove', {
      detail: {
        variant: this.variant,
        size: this.size,
        text: this.textContent.trim()
      },
      bubbles: true
    }));

    // Remove the badge element
    this.remove();
  }

  // Public methods
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

  setRemovable(removable) {
    this.removable = removable;
    if (removable) {
      this.setAttribute('removable', '');
    } else {
      this.removeAttribute('removable');
    }
    this.render();
  }

  setClickable(clickable) {
    this.clickable = clickable;
    if (clickable) {
      this.setAttribute('clickable', '');
    } else {
      this.removeAttribute('clickable');
    }
    this.render();
  }

  setIcon(icon) {
    this.icon = icon;
    if (icon) {
      this.setAttribute('icon', icon);
    } else {
      this.removeAttribute('icon');
    }
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

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    if (backgroundColor) {
      this.setAttribute('background-color', backgroundColor);
    } else {
      this.removeAttribute('background-color');
    }
    this.render();
  }

  getText() {
    return this.textContent.trim();
  }

  setText(text) {
    this.textContent = text;
    this.render();
  }

  // Static utility methods
  static createBadge(text, variant = 'primary', size = 'medium') {
    const badge = document.createElement('badge-tag');
    badge.setAttribute('variant', variant);
    badge.setAttribute('size', size);
    badge.textContent = text;
    return badge;
  }

  static createSkillBadge(skill, level = null) {
    const badge = document.createElement('badge-tag');
    badge.setAttribute('variant', 'outline');
    badge.setAttribute('size', 'medium');
    badge.setAttribute('icon', 'code');
    
    const text = level ? `${skill} (${level})` : skill;
    badge.textContent = text;
    
    return badge;
  }

  static createCategoryBadge(category, icon = null) {
    const badge = document.createElement('badge-tag');
    badge.setAttribute('variant', 'secondary');
    badge.setAttribute('size', 'small');
    
    if (icon) {
      badge.setAttribute('icon', icon);
    }
    
    badge.textContent = category;
    return badge;
  }

  static createStatusBadge(status, type = 'info') {
    const badge = document.createElement('badge-tag');
    badge.setAttribute('variant', type);
    badge.setAttribute('size', 'small');
    
    // Set appropriate icon based on status
    const statusIcons = {
      'online': 'check-circle',
      'offline': 'x-circle',
      'busy': 'clock',
      'away': 'pause-circle'
    };
    
    if (statusIcons[status]) {
      badge.setAttribute('icon', statusIcons[status]);
    }
    
    badge.textContent = status;
    return badge;
  }

  static createRemovableBadge(text, variant = 'primary', size = 'medium') {
    const badge = document.createElement('badge-tag');
    badge.setAttribute('variant', variant);
    badge.setAttribute('size', size);
    badge.setAttribute('removable', '');
    badge.textContent = text;
    return badge;
  }
}

// Register the custom element
customElements.define('badge-tag', BadgeTag);

// Export for use in other modules
export default BadgeTag;
