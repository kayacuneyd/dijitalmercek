/**
 * FAQ Button Component
 * FAQ button molecule for quick questions
 */

class FAQButton extends HTMLElement {
  constructor() {
    super();
    this._faq = null;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  set faq(data) {
    this._faq = data;
    this.render();
  }

  get faq() {
    return this._faq;
  }

  render() {
    if (!this._faq) {
      this.innerHTML = '<div class="loading-placeholder" style="height: 48px; width: 200px;"></div>';
      return;
    }

    const question = this._faq.question.length > 50 ? 
      this._faq.question.substring(0, 47) + '...' : 
      this._faq.question;

    this.innerHTML = `
      <button class="btn btn-outline-primary faq-button" data-faq-id="${this._faq.id}">
        <i class="icon-message-circle me-2"></i>
        ${question}
      </button>
    `;
  }

  attachEventListeners() {
    const button = this.querySelector('.faq-button');
    if (button) {
      button.addEventListener('click', () => {
        this.handleClick();
      });
    }
  }

  handleClick() {
    // Dispatch event to parent component
    this.dispatchEvent(new CustomEvent('faq-click', {
      detail: {
        faq: this._faq,
        question: this._faq.question
      },
      bubbles: true
    }));
  }
}

customElements.define('faq-button', FAQButton);
