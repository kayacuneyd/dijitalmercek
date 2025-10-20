/**
 * FAQ Slider Component
 * FAQ slider organism with horizontal scrolling buttons
 */

class FAQSlider extends HTMLElement {
  constructor() {
    super();
    this.faqs = [];
    this.swiper = null;
  }

  connectedCallback() {
    this.loadFAQs();
  }

  async loadFAQs() {
    try {
      const response = await fetch('/data/faq-templates.json');
      const data = await response.json();
      this.faqs = data.faqs || [];
      this.render();
      this.initializeSwiper();
    } catch (error) {
      console.error('Failed to load FAQs:', error);
      this.render();
    }
  }

  render() {
    if (this.faqs.length === 0) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 48px;"></div>';
      return;
    }

    this.innerHTML = `
      <div class="swiper faq-swiper">
        <div class="swiper-wrapper" id="faqs-wrapper">
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    `;

    // Create FAQ buttons dynamically
    const wrapper = this.querySelector('#faqs-wrapper');
    this.faqs.forEach(faq => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      
      const button = document.createElement('faq-button');
      button.faq = faq;
      
      slide.appendChild(button);
      wrapper.appendChild(slide);
    });

    this.attachEventListeners();
  }

  initializeSwiper() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper not loaded');
      return;
    }

    this.swiper = new Swiper(this.querySelector('.faq-swiper'), {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 12
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 16
        }
      }
    });
  }

  attachEventListeners() {
    this.addEventListener('faq-click', (event) => {
      const { faq } = event.detail;
      this.handleFAQClick(faq);
    });
  }

  handleFAQClick(faq) {
    // Dispatch event to open AI chat with the question
    this.dispatchEvent(new CustomEvent('open-chat-with-question', {
      detail: { question: faq.question },
      bubbles: true
    }));
  }
}

customElements.define('faq-slider', FAQSlider);
