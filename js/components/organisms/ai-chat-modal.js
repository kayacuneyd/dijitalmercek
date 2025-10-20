/**
 * AI Chat Modal Component
 * Chat modal organism with guest mode restrictions and OpenAI integration
 */

class AIChatModal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.messages = [];
    this.guestMessageCount = 0;
    this.maxGuestMessages = 3;
    this.isTyping = false;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    this.loadChatHistory();
  }

  render() {
    this.innerHTML = `
      <div class="modal fade" id="aiChatModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <span class="me-2">🤖</span>
                AI Asistan
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
            </div>
            <div class="modal-body">
              <!-- Guest Mode Warning -->
              <div class="alert alert-info d-none" id="guest-warning">
                <strong>Misafir Modu:</strong> En fazla ${this.maxGuestMessages} mesaj gönderebilirsiniz. 
                <a href="#" id="auth-link" class="alert-link">Giriş yapın</a> daha fazla konuşmak için.
              </div>

              <!-- Chat Messages -->
              <div class="chat-messages" id="chat-messages">
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
              <div class="message-input mt-3">
                <div class="input-group">
                  <input type="text" class="form-control" id="message-input" 
                         placeholder="Mesajınızı yazın..." 
                         maxlength="500">
                  <button class="btn btn-primary" type="button" id="send-button">
                    <span class="send-icon">📤</span>
                  </button>
                </div>
                <small class="text-muted mt-1">
                  Misafir: ${this.guestMessageCount}/${this.maxGuestMessages} mesaj
                </small>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" id="export-chat">
                📄 Sohbeti Dışa Aktar
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const sendButton = this.querySelector('#send-button');
    const messageInput = this.querySelector('#message-input');
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

    // Modal events
    const modal = this.querySelector('#aiChatModal');
    modal?.addEventListener('hidden.bs.modal', () => {
      this.isOpen = false;
    });
  }

  loadChatHistory() {
    const history = localStorage.getItem('chat_history');
    if (history) {
      this.messages = JSON.parse(history);
      this.updateGuestMessageCount();
      this.renderMessages();
    }
  }

  saveChatHistory() {
    localStorage.setItem('chat_history', JSON.stringify(this.messages));
  }

  updateGuestMessageCount() {
    this.guestMessageCount = this.messages.filter(msg => msg.role === 'user').length;
    this.updateGuestWarning();
  }

  updateGuestWarning() {
    const warning = this.querySelector('#guest-warning');
    const messageInput = this.querySelector('#message-input');
    const sendButton = this.querySelector('#send-button');

    if (this.guestMessageCount >= this.maxGuestMessages) {
      warning?.classList.remove('d-none');
      messageInput?.setAttribute('disabled', 'true');
      messageInput?.setAttribute('placeholder', 'Giriş yapın daha fazla mesaj göndermek için...');
      sendButton?.setAttribute('disabled', 'true');
    } else {
      warning?.classList.add('d-none');
      messageInput?.removeAttribute('disabled');
      messageInput?.setAttribute('placeholder', 'Mesajınızı yazın...');
      sendButton?.removeAttribute('disabled');
    }
  }

  async sendMessage() {
    const messageInput = this.querySelector('#message-input');
    const messageText = messageInput?.value?.trim();

    if (!messageText || this.isTyping) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    this.messages.push(userMessage);
    this.guestMessageCount++;
    this.updateGuestMessageCount();
    this.renderMessages();
    this.saveChatHistory();

    // Clear input
    messageInput.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Simulate AI response
      await this.getAIResponse();
    } catch (error) {
      console.error('Error getting AI response:', error);
      this.addAIMessage('Üzgünüm, şu anda bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      this.hideTypingIndicator();
    }
  }

  async getAIResponse() {
    // Mock AI response with delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      "Bu konuda size nasıl yardımcı olabilirim? Detaylı bilgi için lütfen iletişime geçin.",
      "Harika bir soru! Bu projeler için genellikle modern teknolojiler kullanıyorum.",
      "Size özel bir teklif hazırlayabilirim. Projenizin detaylarını paylaşır mısınız?",
      "Bu konuda deneyimim var. Size en uygun çözümü sunabilirim.",
      "Projenizi hayata geçirmek için buradayım. Hangi aşamada yardıma ihtiyacınız var?"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    this.addAIMessage(randomResponse);
  }

  addAIMessage(content) {
    const aiMessage = {
      role: 'assistant',
      content: content,
      timestamp: new Date().toISOString()
    };

    this.messages.push(aiMessage);
    this.renderMessages();
    this.saveChatHistory();
  }

  showTypingIndicator() {
    const indicator = this.querySelector('#typing-indicator');
    indicator?.classList.remove('d-none');
    this.isTyping = true;
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = this.querySelector('#typing-indicator');
    indicator?.classList.add('d-none');
    this.isTyping = false;
  }

  renderMessages() {
    const messagesContainer = this.querySelector('#chat-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

    // Initial AI message
    messagesContainer.innerHTML = `
      <div class="message ai-message">
        <div class="message-content">
          <div class="message-text">
            Merhaba! Size nasıl yardımcı olabilirim? Web geliştirme, projeleriniz veya hizmetlerim hakkında sorularınızı yanıtlayabilirim.
          </div>
          <div class="message-time">Şimdi</div>
        </div>
      </div>
    `;

    // Render chat history
    this.messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${message.role}-message`;

      const time = new Date(message.timestamp).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">${message.content}</div>
          <div class="message-time">${time}</div>
        </div>
      `;

      messagesContainer.appendChild(messageDiv);
    });

    this.scrollToBottom();
  }

  scrollToBottom() {
    const messagesContainer = this.querySelector('#chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  exportChat() {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: this.messages,
      exportType: 'chat_transcript'
    };

    // Dispatch event to email service
    this.dispatchEvent(new CustomEvent('export-chat', {
      detail: chatData,
      bubbles: true
    }));

    // Show success message
    alert('Sohbet dışa aktarıldı! E-posta adresinize gönderilecek.');
  }

  show() {
    const modal = this.querySelector('#aiChatModal');
    if (modal && typeof bootstrap !== 'undefined') {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
      this.isOpen = true;
    }
  }

  hide() {
    const modal = this.querySelector('#aiChatModal');
    if (modal && typeof bootstrap !== 'undefined') {
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal?.hide();
      this.isOpen = false;
    }
  }
}

customElements.define('ai-chat-modal', AIChatModal);
