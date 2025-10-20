/**
 * Auth Modal Component
 * Authentication modal organism with mock Clerk integration
 */

class AuthModal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="modal fade" id="authModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <span class="me-2">🔐</span>
                Giriş Yap
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
            </div>
            <div class="modal-body">
              <!-- Login Form -->
              <form id="auth-form">
                <div class="mb-3">
                  <label for="email" class="form-label">E-posta Adresi</label>
                  <input type="email" class="form-control" id="email" 
                         placeholder="ornek@email.com" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Şifre</label>
                  <input type="password" class="form-control" id="password" 
                         placeholder="••••••••" required>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="remember-me">
                  <label class="form-check-label" for="remember-me">
                    Beni hatırla
                  </label>
                </div>
                <button type="submit" class="btn btn-primary w-100" id="login-button">
                  <span class="spinner-border spinner-border-sm d-none me-2" id="login-spinner"></span>
                  Giriş Yap
                </button>
              </form>

              <!-- Demo Notice -->
              <div class="alert alert-info mt-3">
                <strong>Demo Modu:</strong> Herhangi bir e-posta ve şifre ile giriş yapabilirsiniz.
                <br><small>Örnek: demo@example.com / demo123</small>
              </div>

              <!-- Error Message -->
              <div class="alert alert-danger d-none" id="error-message">
                <strong>Hata:</strong> <span id="error-text"></span>
              </div>

              <!-- Success Message -->
              <div class="alert alert-success d-none" id="success-message">
                <strong>Başarılı!</strong> Giriş yapıldı.
              </div>
            </div>
            <div class="modal-footer">
              <small class="text-muted">
                Demo amaçlı mock authentication kullanılmaktadır.
              </small>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const form = this.querySelector('#auth-form');
    const loginButton = this.querySelector('#login-button');
    const spinner = this.querySelector('#login-spinner');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleLogin();
    });

    // Demo auto-fill
    const emailInput = this.querySelector('#email');
    const passwordInput = this.querySelector('#password');
    
    emailInput?.addEventListener('focus', () => {
      if (!emailInput.value) {
        emailInput.value = 'demo@example.com';
      }
    });

    passwordInput?.addEventListener('focus', () => {
      if (!passwordInput.value) {
        passwordInput.value = 'demo123';
      }
    });

    // Modal events
    const modal = this.querySelector('#authModal');
    modal?.addEventListener('hidden.bs.modal', () => {
      this.isOpen = false;
      this.resetForm();
    });
  }

  async handleLogin() {
    const email = this.querySelector('#email')?.value;
    const password = this.querySelector('#password')?.value;
    const loginButton = this.querySelector('#login-button');
    const spinner = this.querySelector('#login-spinner');
    const errorMessage = this.querySelector('#error-message');
    const successMessage = this.querySelector('#success-message');

    if (!email || !password) {
      this.showError('Lütfen tüm alanları doldurun.');
      return;
    }

    // Show loading state
    loginButton?.setAttribute('disabled', 'true');
    spinner?.classList.remove('d-none');
    this.hideMessages();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication - always succeeds in demo mode
      const mockUser = {
        id: 'user_demo_123',
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('user_auth_token', 'mock_jwt_token_demo');
      localStorage.setItem('current_user_data', JSON.stringify(mockUser));

      // Show success
      this.showSuccess();

      // Dispatch success event
      this.dispatchEvent(new CustomEvent('auth:success', {
        detail: { user: mockUser },
        bubbles: true
      }));

      // Close modal after delay
      setTimeout(() => {
        this.hide();
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      this.showError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      // Hide loading state
      loginButton?.removeAttribute('disabled');
      spinner?.classList.add('d-none');
    }
  }

  showError(message) {
    const errorMessage = this.querySelector('#error-message');
    const errorText = this.querySelector('#error-text');
    
    if (errorMessage && errorText) {
      errorText.textContent = message;
      errorMessage.classList.remove('d-none');
      
      // Hide success message
      const successMessage = this.querySelector('#success-message');
      successMessage?.classList.add('d-none');
    }
  }

  showSuccess() {
    const successMessage = this.querySelector('#success-message');
    
    if (successMessage) {
      successMessage.classList.remove('d-none');
      
      // Hide error message
      const errorMessage = this.querySelector('#error-message');
      errorMessage?.classList.add('d-none');
    }
  }

  hideMessages() {
    const errorMessage = this.querySelector('#error-message');
    const successMessage = this.querySelector('#success-message');
    
    errorMessage?.classList.add('d-none');
    successMessage?.classList.add('d-none');
  }

  resetForm() {
    const form = this.querySelector('#auth-form');
    const errorMessage = this.querySelector('#error-message');
    const successMessage = this.querySelector('#success-message');
    
    form?.reset();
    errorMessage?.classList.add('d-none');
    successMessage?.classList.add('d-none');
  }

  show() {
    const modal = this.querySelector('#authModal');
    if (modal && typeof bootstrap !== 'undefined') {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
      this.isOpen = true;
    }
  }

  hide() {
    const modal = this.querySelector('#authModal');
    if (modal && typeof bootstrap !== 'undefined') {
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal?.hide();
      this.isOpen = false;
    }
  }
}

customElements.define('auth-modal', AuthModal);
