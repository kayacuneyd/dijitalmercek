/**
 * Service Slider Component
 * Service slider organism with Swiper integration
 */

class ServiceSlider extends HTMLElement {
  constructor() {
    super();
    this.services = [];
  }

  connectedCallback() {
    this.loadServices();
  }

  async loadServices() {
    try {
      const response = await fetch('/data/services.json');
      const data = await response.json();
      this.services = data.services || [];
      this.render();
    } catch (error) {
      console.error('Failed to load services:', error);
      this.render();
    }
  }

  render() {
    if (this.services.length === 0) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 200px;"></div>';
      return;
    }

    this.innerHTML = `
      <div class="service-scroll" role="list">
      </div>
    `;

    // Create service cards and set data via properties
    const scroller = this.querySelector('.service-scroll');
    this.services.forEach(service => {
      const card = document.createElement('service-card');
      card.service = service;
      card.setAttribute('role', 'listitem');
      scroller.appendChild(card);
    });
  }
}

customElements.define('service-slider', ServiceSlider);
