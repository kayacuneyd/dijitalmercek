/**
 * Project Grid Component
 * Project grid organism for displaying portfolio projects
 */

class ProjectGrid extends HTMLElement {
  constructor() {
    super();
    this.projects = [];
    this.currentPage = 1;
    this.projectsPerPage = 6;
  }

  connectedCallback() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      const response = await fetch('/data/projects.json');
      const data = await response.json();
      this.projects = data.projects || [];
      this.render();
    } catch (error) {
      console.error('Failed to load projects:', error);
      this.render();
    }
  }

  render() {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    const currentProjects = this.projects.slice(startIndex, endIndex);

    this.innerHTML = `
      <div class="project-grid-container">
        <!-- Grid Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h4 mb-0">Portfolyo Projeleri</h2>
          <div class="project-count text-muted">
            ${startIndex + 1}-${Math.min(endIndex, this.projects.length)} / ${this.projects.length}
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="row g-4" id="projects-grid">
          ${currentProjects.length > 0 ? '' : '<div class="col-12"><div class="text-center text-muted py-5">Henüz proje bulunmuyor.</div></div>'}
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-center mt-4" id="pagination-container">
          ${this.renderPagination()}
        </div>

        <!-- Load More Button (Alternative) -->
        <div class="text-center mt-4">
          <button class="btn btn-outline-primary" id="load-more-btn" style="display: none;">
            Daha Fazla Göster
          </button>
        </div>
      </div>
    `;

    // Create project cards dynamically
    this.createProjectCards(currentProjects);
    this.attachEventListeners();
  }

  createProjectCards(projects) {
    const grid = this.querySelector('#projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach(project => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';
      
      const card = document.createElement('project-card');
      card.project = project;
      
      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  renderPagination() {
    const totalPages = Math.ceil(this.projects.length / this.projectsPerPage);
    
    if (totalPages <= 1) return '';

    let paginationHtml = '<nav><ul class="pagination pagination-sm">';

    // Previous button
    paginationHtml += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}>
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        paginationHtml += `
          <li class="page-item ${i === this.currentPage ? 'active' : ''}">
            <button class="page-link" data-page="${i}">${i}</button>
          </li>
        `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        paginationHtml += '<li class="page-item disabled"><span class="page-link">...</span></li>';
      }
    }

    // Next button
    paginationHtml += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}>
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    `;

    paginationHtml += '</ul></nav>';
    return paginationHtml;
  }

  attachEventListeners() {
    // Pagination buttons
    const paginationButtons = this.querySelectorAll('[data-page]');
    paginationButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const page = parseInt(e.target.dataset.page);
        if (page && page !== this.currentPage && page >= 1 && page <= Math.ceil(this.projects.length / this.projectsPerPage)) {
          this.goToPage(page);
        }
      });
    });

    // Load more button
    const loadMoreBtn = this.querySelector('#load-more-btn');
    loadMoreBtn?.addEventListener('click', () => {
      this.loadMoreProjects();
    });

    // Project card clicks
    this.addEventListener('click', (e) => {
      const projectCard = e.target.closest('project-card');
      if (projectCard) {
        const projectId = projectCard.querySelector('[data-project-id]')?.dataset.projectId;
        if (projectId) {
          this.handleProjectClick(projectId);
        }
      }
    });
  }

  goToPage(page) {
    this.currentPage = page;
    this.render();
    
    // Scroll to top of grid
    this.scrollIntoView({ behavior: 'smooth' });
  }

  loadMoreProjects() {
    // Alternative implementation for infinite scroll
    this.projectsPerPage += 6;
    this.render();
  }

  handleProjectClick(projectId) {
    // Dispatch event for project click
    this.dispatchEvent(new CustomEvent('project-click', {
      detail: { projectId },
      bubbles: true
    }));
  }

  // Public methods for external control
  setProjects(projects) {
    this.projects = projects;
    this.currentPage = 1;
    this.render();
  }

  addProject(project) {
    this.projects.unshift(project);
    this.render();
  }

  removeProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.render();
  }
}

customElements.define('project-grid', ProjectGrid);
