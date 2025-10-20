/**
 * Service Card Component
 * Service card molecule for displaying service offerings
 */

class ServiceCard extends HTMLElement {
  constructor() {
    super();
    this._service = null;
  }

  connectedCallback() {
    this.render();
  }

  set service(data) {
    this._service = data;
    this.render();
  }

  get service() {
    return this._service;
  }

  render() {
    if (!this._service) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 200px;"></div>';
      return;
    }

    this.innerHTML = `
      <div class="card service-card h-100">
        <div class="card-body d-flex flex-column">
          <div class="service-icon mb-3">
            <i class="icon-${this._service.id || 'code'} fs-1 text-primary"></i>
          </div>
          <h3 class="card-title h5 mb-3">${this._service.title || 'Servis'}</h3>
          <p class="card-text text-muted flex-grow-1">${this._service.description || 'Açıklama'}</p>
          <div class="service-footer mt-auto">
            <div class="service-price mb-2">
              <small class="text-success fw-semibold">Fiyat bilgisi için iletişime geçin</small>
            </div>
            <div class="service-delivery mb-3">
              <small class="text-muted">
                <i class="icon-clock me-1"></i>
                Süre belirtilmemiş
              </small>
            </div>
            <button class="btn btn-outline-primary btn-sm w-100" data-service-id="${this._service.id}">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('service-card', ServiceCard);
