/**
 * Right Sidebar Component
 * Right sidebar organism with projects and articles
 */

class SidebarRight extends HTMLElement {
  constructor() {
    super();
    this.projects = [];
    this.articles = [];
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      // Load projects
      const projectsResponse = await fetch('/data/projects.json');
      const projectsData = await projectsResponse.json();
      this.projects = projectsData.projects?.slice(0, 2) || [];

      // Load articles
      const articlesResponse = await fetch('/data/articles.json');
      const articlesData = await articlesResponse.json();
      this.articles = articlesData.articles?.slice(0, 2) || [];

      this.render();
    } catch (error) {
      console.error('Failed to load sidebar data:', error);
      this.render();
    }
  }

  render() {
    // Projects and articles will be created dynamically

    this.innerHTML = `
      <div class="sidebar-content p-4">
        <!-- Cal.com Widget - Moved to top -->
        <section class="calendar-section mb-5">
          <div class="card">
            <div class="card-body text-center">
              <h4 class="h6 mb-3">Görüşme Planla</h4>
              <p class="text-muted small mb-3">Projenizi konuşmak için ücretsiz görüşme planlayın</p>
              <button class="btn btn-primary w-100" id="schedule-meeting">
                <i class="icon-calendar me-2"></i>
                Görüşme Planla
              </button>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section class="projects-section mb-5">
          <h3 class="h5 mb-3">Son Projeler</h3>
          <div class="row g-3" id="projects-container">
            <div class="col-12"><div class="loading-placeholder" style="height: 200px;"></div></div>
          </div>
          <div class="text-center mt-3">
            <button class="btn btn-outline-primary btn-sm">Daha Fazla Gör</button>
          </div>
        </section>

        <!-- Articles Section -->
        <section class="articles-section mb-5">
          <h3 class="h5 mb-3">Son Makaleler</h3>
          <div class="articles-list" id="articles-container">
            <div class="loading-placeholder" style="height: 300px;"></div>
          </div>
          <div class="text-center mt-3">
            <button class="btn btn-outline-primary btn-sm">Tüm Makaleler</button>
          </div>
        </section>
      </div>
    `;

    // Create projects dynamically
    const projectsContainer = this.querySelector('#projects-container');
    if (projectsContainer && this.projects.length > 0) {
      projectsContainer.innerHTML = '';
      this.projects.slice(0, 2).forEach(project => {
        const col = document.createElement('div');
        col.className = 'col-12 mb-3';
        
        const card = document.createElement('project-card');
        card.project = project;
        
        col.appendChild(card);
        projectsContainer.appendChild(col);
      });
    }

    // Create articles dynamically
    const articlesContainer = this.querySelector('#articles-container');
    if (articlesContainer && this.articles.length > 0) {
      articlesContainer.innerHTML = '';
      this.articles.slice(0, 2).forEach(article => {
        const preview = document.createElement('article-preview');
        preview.article = article;
        articlesContainer.appendChild(preview);
      });
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    const scheduleBtn = this.querySelector('#schedule-meeting');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('schedule-meeting', {
          bubbles: true
        }));
      });
    }
  }
}

customElements.define('sidebar-right', SidebarRight);
