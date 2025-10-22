/**
 * AI Chat Inline Component
 * Inline chat organism with guest mode restrictions and OpenAI integration
 */

class AIChatInline extends HTMLElement {
  constructor() {
    super();
    this.isOpen = true; // Always open since it's inline
    this.messages = [];
    this.guestMessageCount = 0;
    this.maxGuestMessages = 3;
    this.isTyping = false;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    this.loadChatHistory();
    this.updateUsageDisplay();
  }

  render() {
    this.innerHTML = `
      <div class="chat-widget border rounded p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 id="chat-heading" class="h5 mb-0">
            <span class="me-2">🤖</span>
            AI Asistan
          </h2>
          <div class="chat-controls">
            <button type="button" class="btn btn-outline-secondary btn-sm" id="export-chat">
              📄 Dışa Aktar
            </button>
          </div>
        </div>
        
        <!-- Guest Mode Warning -->
        <div class="alert alert-info d-none" id="guest-warning">
          <strong>Misafir Modu:</strong> En fazla ${this.maxGuestMessages} mesaj gönderebilirsiniz. 
          <a href="#" id="auth-link" class="alert-link">Giriş yapın</a> daha fazla konuşmak için.
        </div>

        <!-- Chat Messages -->
        <div id="chat-messages" class="chat-messages mb-3" style="height: 400px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1rem; background-color: var(--bg-secondary);">
          <div class="message ai-message">
            <div class="message-content">
              <div class="message-text">
                Merhaba! Size nasıl yardımcı olabilirim? Web geliştirme, projeleriniz veya hizmetlerim hakkında sorularınızı yanıtlayabilirim.
              </div>
              <div class="message-time">Şimdi</div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="typing-indicator d-none" id="typing-indicator">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span class="typing-text">AI yazıyor...</span>
        </div>

        <!-- Message Input -->
        <div class="message-input">
          <div class="input-group">
            <input type="text" class="form-control" id="chat-input" 
                   placeholder="Mesajınızı yazın..." 
                   maxlength="500" aria-label="Mesaj">
            <button class="btn btn-primary" type="button" id="chat-send-btn">
              <span class="send-icon">📤</span>
            </button>
          </div>
          <small class="text-muted mt-1">
            Misafir: <span id="guest-count">0</span>/${this.maxGuestMessages} mesaj
          </small>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const sendButton = this.querySelector('#chat-send-btn');
    const messageInput = this.querySelector('#chat-input');
    const exportButton = this.querySelector('#export-chat');
    const authLink = this.querySelector('#auth-link');

    // Send message
    sendButton?.addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter key to send
    messageInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Export chat
    exportButton?.addEventListener('click', () => {
      this.exportChat();
    });

    // Auth link
    authLink?.addEventListener('click', (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('auth:required', { bubbles: true }));
    });
  }

  async sendMessage() {
    const messageInput = this.querySelector('#chat-input');
    const messageText = messageInput?.value?.trim();

    if (!messageText || this.isTyping) return;

    // Check guest limits
    const limitCheck = window.StorageUtils?.canSendMessage() || { canSend: true };
    if (!limitCheck.canSend) {
      this.showLimitWarning(limitCheck.reason, limitCheck.timeUntilReset);
      return;
    }

    // Clear input
    messageInput.value = '';

    // Add user message
    this.addMessage('user', messageText);

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Send to AI service
      const response = await window.openAIService?.sendMessage(messageText);
      
      if (response && response.success) {
        this.addMessage('ai', response.message);
      } else {
        this.addMessage('ai', 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Chat error:', error);
      this.addMessage('ai', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      this.hideTypingIndicator();
    }

    // Update usage
    if (window.StorageUtils) {
      window.StorageUtils.incrementChatUsage();
      this.updateUsageDisplay();
    }
  }

  addMessage(role, content) {
    const messagesContainer = this.querySelector('#chat-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const time = new Date().toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text">${content}</div>
        <div class="message-time">${time}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history
    this.messages.push({ role, content, timestamp: new Date().toISOString() });
    if (window.StorageUtils) {
      window.StorageUtils.setChatHistory(this.messages);
    }
  }

  showTypingIndicator() {
    const indicator = this.querySelector('#typing-indicator');
    if (indicator) {
      indicator.classList.remove('d-none');
    }
  }

  hideTypingIndicator() {
    const indicator = this.querySelector('#typing-indicator');
    if (indicator) {
      indicator.classList.add('d-none');
    }
  }

  showLimitWarning(reason, timeUntilReset) {
    const warning = this.querySelector('#guest-warning');
    if (warning) {
      warning.classList.remove('d-none');
      warning.innerHTML = `
        <strong>Limit Aşıldı:</strong> ${reason}
        ${timeUntilReset ? ` (${timeUntilReset} sonra tekrar deneyin)` : ''}
        <a href="#" id="auth-link" class="alert-link">Giriş yapın</a> sınırsız konuşmak için.
      `;
    }
  }

  updateUsageDisplay() {
    const guestCount = this.querySelector('#guest-count');
    if (guestCount && window.StorageUtils) {
      const usage = window.StorageUtils.getChatUsage();
      guestCount.textContent = usage.dailyCount || 0;
    }
  }

  loadChatHistory() {
    if (window.StorageUtils) {
      this.messages = window.StorageUtils.getChatHistory() || [];
      this.renderHistory();
    }
  }

  renderHistory() {
    const messagesContainer = this.querySelector('#chat-messages');
    if (!messagesContainer || this.messages.length === 0) return;

    // Clear existing messages except the first welcome message
    const welcomeMessage = messagesContainer.querySelector('.message.ai-message');
    messagesContainer.innerHTML = '';
    if (welcomeMessage) {
      messagesContainer.appendChild(welcomeMessage);
    }

    // Render history
    this.messages.forEach(msg => {
      if (msg.role !== 'system') {
        this.addMessage(msg.role, msg.content);
      }
    });
  }

  exportChat() {
    if (this.messages.length === 0) {
      alert('Dışa aktarılacak mesaj bulunamadı.');
      return;
    }

    const chatText = this.messages
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role === 'user' ? 'Sen' : 'AI'}: ${msg.content}`)
      .join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sohbet-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    alert('Sohbet dışa aktarıldı!');
  }

  // Public method to focus input (for FAQ integration)
  focusInput() {
    const messageInput = this.querySelector('#chat-input');
    if (messageInput) {
      messageInput.focus();
    }
  }

  // Public method to set message and send (for FAQ integration)
  setMessageAndSend(message) {
    const messageInput = this.querySelector('#chat-input');
    if (messageInput) {
      messageInput.value = message;
      setTimeout(() => {
        this.sendMessage();
      }, 100);
    }
  }
}

customElements.define('ai-chat-inline', AIChatInline);
