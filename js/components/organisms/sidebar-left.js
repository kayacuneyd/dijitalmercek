/**
 * Left Sidebar Component
 * Profile sidebar organism with user info and stats
 */

class SidebarLeft extends HTMLElement {
  constructor() {
    super();
    this.profile = null;
  }

  connectedCallback() {
    this.loadProfile();
    this.render();
  }

  async loadProfile() {
    try {
      const response = await fetch('/data/profile.json');
      this.profile = await response.json();
      this.render();
    } catch (error) {
      console.error('Failed to load profile:', error);
      this.render();
    }
  }

  render() {
    if (!this.profile) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 400px;"></div>';
      return;
    }

    // Stats, skills, and social will be created dynamically

    this.innerHTML = `
      <div class="sidebar-content p-4">
        <!-- Close Button (Mobile Only) -->
        <div class="d-lg-none mb-3">
          <button class="btn btn-outline-secondary btn-sm w-100" id="close-sidebar-btn">
            <span class="me-2">✕</span>Kapat
          </button>
        </div>

        <!-- Profile Section -->
        <div class="profile-section text-center mb-4">
          <avatar-image 
            src="https://kayacuneyt.com/assets/images/kayacuneyt.jpeg" 
            alt="${this.profile.personal?.name || 'Profile'}"
            size="large">
          </avatar-image>
          <h2 class="h5 mt-3 mb-1">${this.profile.personal?.name || '[YOUR_NAME]'}</h2>
          <p class="text-muted small mb-2">${this.profile.personal?.title || 'Freelance Web Developer'}</p>
          <p class="text-muted small">${this.profile.personal?.bio || 'Bio bilgisi...'}</p>
        </div>

        <!-- Stats Section -->
        <div class="stats-section mb-4">
          <div class="row g-3" id="stats-container">
            <div class="loading-placeholder" style="height: 80px;"></div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="skills-section mb-4">
          <h4 class="h6 mb-3">Yetenekler</h4>
          <div class="skills-list" id="skills-container">
            <div class="loading-placeholder" style="height: 40px;"></div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="social-section mb-4" id="social-container">
          <div class="loading-placeholder" style="height: 60px;"></div>
        </div>

        <!-- Availability -->
        <div class="availability-section">
          <div class="d-flex align-items-center">
            <span class="badge bg-success me-2">●</span>
            <small class="text-muted">${this.profile.personal?.status || 'Proje almaya açık'}</small>
          </div>
        </div>
      </div>
    `;

    // Create stats dynamically
    const statsContainer = this.querySelector('#stats-container');
    if (statsContainer && this.profile.stats) {
      statsContainer.innerHTML = '';
      this.profile.stats.slice(0, 4).forEach(stat => {
        const col = document.createElement('div');
        col.className = 'col-6';
        
        const counter = document.createElement('stat-counter');
        counter.stat = stat;
        
        col.appendChild(counter);
        statsContainer.appendChild(col);
      });
    }

    // Create skills dynamically
    const skillsContainer = this.querySelector('#skills-container');
    if (skillsContainer && this.profile.skills) {
      skillsContainer.innerHTML = '';
      this.profile.skills.slice(0, 8).forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-light text-dark me-1 mb-1';
        badge.textContent = skill.name || skill;
        skillsContainer.appendChild(badge);
      });
    }

    // Create social links dynamically
    const socialContainer = this.querySelector('#social-container');
    if (socialContainer && this.profile.social) {
      socialContainer.innerHTML = '';
      this.profile.social.filter(s => s.primary).forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'btn btn-outline-primary btn-sm w-100 mb-2';
        link.target = '_blank';
        link.innerHTML = `<span class="me-2">${social.icon}</span>${social.label}`;
        socialContainer.appendChild(link);
      });
    }

    // Add close button event listener
    const closeBtn = this.querySelector('#close-sidebar-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        console.log('Close button clicked!');
        // Close the mobile menu
        const sidebar = document.getElementById('sidebar-left');
        const overlay = document.getElementById('menu-overlay');
        
        if (sidebar && overlay) {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }
}

customElements.define('sidebar-left', SidebarLeft);
