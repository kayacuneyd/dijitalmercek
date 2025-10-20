/**
 * Avatar Image Component
 * Circular profile image Web Component with lazy loading and fallback
 */

class AvatarImage extends HTMLElement {
  constructor() {
    super();
    this.src = null;
    this.alt = '';
    this.size = 'medium';
    this.shape = 'circle';
    this.lazy = true;
    this.fallback = true;
    this.observer = null;
  }

  static get observedAttributes() {
    return [
      'src',
      'alt',
      'size',
      'shape',
      'lazy',
      'fallback'
    ];
  }

  connectedCallback() {
    this.render();
    this.setupLazyLoading();
  }

  disconnectedCallback() {
    this.cleanupLazyLoading();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupLazyLoading();
    }
  }

  render() {
    // Get attributes
    this.src = this.getAttribute('src') || null;
    this.alt = this.getAttribute('alt') || '';
    this.size = this.getAttribute('size') || 'medium';
    this.shape = this.getAttribute('shape') || 'circle';
    this.lazy = this.getAttribute('lazy') !== 'false';
    this.fallback = this.getAttribute('fallback') !== 'false';

    // Build CSS classes
    const classes = this.buildClasses();

    // Build image HTML
    const imageHtml = this.buildImageHtml();

    // Render HTML
    this.innerHTML = `
      <div class="${classes}" role="img" aria-label="${this.alt}">
        ${imageHtml}
      </div>
    `;
  }

  buildClasses() {
    const classes = ['avatar', `avatar-${this.size}`, `avatar-${this.shape}`];

    if (this.lazy && !this.src) {
      classes.push('avatar-lazy');
    }

    return classes.join(' ');
  }

  buildImageHtml() {
    if (!this.src) {
      return this.buildFallbackHtml();
    }

    const loading = this.lazy ? 'lazy' : 'eager';
    const src = this.lazy ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==' : this.src;
    const dataSrc = this.lazy ? this.src : null;

    let imgHtml = `
      <img 
        src="${src}" 
        alt="${this.alt}"
        loading="${loading}"
        class="avatar-img"
    `;

    if (dataSrc) {
      imgHtml += ` data-src="${dataSrc}"`;
    }

    imgHtml += ` onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />`;

    // Add fallback
    imgHtml += this.buildFallbackHtml(true);

    return imgHtml;
  }

  buildFallbackHtml(hidden = false) {
    if (!this.fallback) return '';

    const displayStyle = hidden ? 'display: none;' : '';
    
    return `
      <div class="avatar-fallback" style="${displayStyle}">
        <span class="avatar-initials">${this.getInitials()}</span>
      </div>
    `;
  }

  getInitials() {
    if (!this.alt) return '?';
    
    const words = this.alt.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  setupLazyLoading() {
    if (!this.lazy || !this.src) return;

    // Cleanup existing observer
    this.cleanupLazyLoading();

    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe the avatar element
    this.observer.observe(this);
  }

  cleanupLazyLoading() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  loadImage() {
    const img = this.querySelector('.avatar-img');
    if (!img) return;

    const dataSrc = img.getAttribute('data-src');
    if (dataSrc) {
      img.src = dataSrc;
      img.removeAttribute('data-src');
      
      // Add loaded class when image loads
      img.addEventListener('load', () => {
        this.classList.add('avatar-loaded');
      });

      // Handle load error
      img.addEventListener('error', () => {
        this.classList.add('avatar-error');
        this.showFallback();
      });
    }
  }

  showFallback() {
    const fallback = this.querySelector('.avatar-fallback');
    if (fallback) {
      fallback.style.display = 'block';
    }
  }

  // Public methods
  setSrc(src) {
    this.src = src;
    this.setAttribute('src', src);
    this.render();
    this.setupLazyLoading();
  }

  setAlt(alt) {
    this.alt = alt;
    this.setAttribute('alt', alt);
    this.render();
  }

  setSize(size) {
    this.size = size;
    this.setAttribute('size', size);
    this.render();
  }

  setShape(shape) {
    this.shape = shape;
    this.setAttribute('shape', shape);
    this.render();
  }

  setLazy(lazy) {
    this.lazy = lazy;
    if (lazy) {
      this.setAttribute('lazy', '');
    } else {
      this.removeAttribute('lazy');
    }
    this.render();
    this.setupLazyLoading();
  }

  getImageElement() {
    return this.querySelector('.avatar-img');
  }

  getFallbackElement() {
    return this.querySelector('.avatar-fallback');
  }

  // Utility methods
  static createAvatar(src, alt, size = 'medium', shape = 'circle') {
    const avatar = document.createElement('avatar-image');
    avatar.setAttribute('src', src);
    avatar.setAttribute('alt', alt);
    avatar.setAttribute('size', size);
    avatar.setAttribute('shape', shape);
    return avatar;
  }

  static createAvatarWithInitials(initials, size = 'medium', shape = 'circle') {
    const avatar = document.createElement('avatar-image');
    avatar.setAttribute('alt', initials);
    avatar.setAttribute('size', size);
    avatar.setAttribute('shape', shape);
    avatar.setAttribute('fallback', 'true');
    return avatar;
  }
}

// Register the custom element
customElements.define('avatar-image', AvatarImage);

// Export for use in other modules
export default AvatarImage;
