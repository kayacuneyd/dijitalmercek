/**
 * App Header Component
 * Main header organism with navigation and mobile menu
 */

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.isMenuOpen = false;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid">
          <!-- Brand/Logo -->
          <a class="navbar-brand fw-bold" href="#">
            <span class="text-primary">CKWEB.DEV</span>
          </a>

          <!-- Auth Button -->
          <div class="ms-auto me-3">
            <button class="btn btn-outline-primary btn-sm d-flex align-items-center" id="auth-btn">
              <span class="auth-icon">👤</span>
              <span class="auth-text ms-2 d-none d-lg-inline">Giriş Yap</span>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="navbar-toggler d-lg-none" type="button" id="mobile-menu-toggle">
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Navigation Links -->
          <div class="navbar-nav d-none d-lg-flex">
            <a class="nav-link" href="#services">Hizmetler</a>
            <a class="nav-link" href="#projects">Projeler</a>
            <a class="nav-link" href="#about">Hakkımda</a>
            <a class="nav-link" href="#contact">İletişim</a>
          </div>
        </div>
      </nav>
    `;
  }

  attachEventListeners() {
    const mobileToggle = this.querySelector('#mobile-menu-toggle');
    const authBtn = this.querySelector('#auth-btn');

    // Mobile menu toggle
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        console.log('Hamburger clicked from app-header!');
        const sidebar = document.getElementById('sidebar-left');
        const overlay = document.getElementById('menu-overlay');
        
        if (sidebar && overlay) {
          const isOpen = sidebar.classList.contains('open');
          
          if (isOpen) {
            // Close menu
            console.log('Closing menu...');
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
          } else {
            // Open menu
            console.log('Opening menu...');
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
          }
        }
      });
    }

    if (authBtn) {
      authBtn.addEventListener('click', () => {
        this.handleAuthClick();
      });
    }

    // Overlay click to close menu
    const overlay = document.getElementById('menu-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        console.log('Overlay clicked from app-header!');
        const sidebar = document.getElementById('sidebar-left');
        
        if (sidebar && sidebar.classList.contains('open')) {
          // Close menu
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }


  handleAuthClick() {
    // Dispatch auth event
    this.dispatchEvent(new CustomEvent('auth:required', {
      bubbles: true
    }));
  }
}

customElements.define('app-header', AppHeader);
