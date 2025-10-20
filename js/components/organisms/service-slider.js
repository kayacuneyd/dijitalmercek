/**
 * Service Slider Component
 * Service slider organism with Swiper integration
 */

class ServiceSlider extends HTMLElement {
  constructor() {
    super();
    this.services = [];
    this.swiper = null;
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
      this.initializeSwiper();
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
      <div class="swiper service-swiper">
        <div class="swiper-wrapper" id="services-wrapper">
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    `;

    // Create service cards and set data via properties
    const wrapper = this.querySelector('#services-wrapper');
    this.services.forEach(service => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      
      const card = document.createElement('service-card');
      card.service = service;
      
      slide.appendChild(card);
      wrapper.appendChild(slide);
    });
  }

  initializeSwiper() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper not loaded');
      return;
    }

    this.swiper = new Swiper(this.querySelector('.service-swiper'), {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 16
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }
}

customElements.define('service-slider', ServiceSlider);
