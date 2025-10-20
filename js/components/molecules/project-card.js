/**
 * Project Card Component
 * Project card molecule for displaying portfolio projects
 */

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this._project = null;
  }

  connectedCallback() {
    this.render();
  }

  set project(data) {
    this._project = data;
    this.render();
  }

  get project() {
    return this._project;
  }

  render() {
    if (!this._project) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 250px;"></div>';
      return;
    }

    const techBadges = this._project.techStack ? 
      this._project.techStack.map(tech => `<span class="badge bg-secondary me-1 mb-1">${tech}</span>`).join('') : '';

    this.innerHTML = `
      <div class="card project-card h-100">
        <div class="project-image position-relative">
          <img src="${this._project.image || 'assets/images/projects/default.jpg'}" 
               alt="${this._project.title}" 
               class="card-img-top" 
               style="height: 180px; object-fit: cover;"
               loading="lazy">
          <div class="project-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <button class="btn btn-primary btn-sm" data-project-id="${this._project.id}">
              <i class="icon-eye me-1"></i>
              Görüntüle
            </button>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title h6 mb-2">${this._project.title || 'Proje'}</h3>
          <p class="card-text text-muted small mb-3">${this._project.description || 'Açıklama'}</p>
          <div class="project-tech mb-3">
            ${techBadges}
          </div>
          <div class="project-meta d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="icon-calendar me-1"></i>
              2024
            </small>
            <small class="text-muted">
              <i class="icon-clock me-1"></i>
              N/A
            </small>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);
