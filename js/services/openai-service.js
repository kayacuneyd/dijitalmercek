/**
 * Mock OpenAI Service
 * Provides AI chat functionality with contextual Turkish responses
 */

import { StorageUtils } from '../utils/storage.js';

class OpenAIService {
  constructor() {
    this.apiKey = null;
    this.baseURL = '/.netlify/functions/chat';
    this.isInitialized = false;
    this.conversationHistory = [];
    
    this.init();
  }

  /**
   * Initialize the service
   */
  init() {
    // Load conversation history from storage
    this.conversationHistory = StorageUtils.getChatHistory();
    this.isInitialized = true;
    console.log('OpenAI Service: Initialized (Mock)');
  }

  /**
   * Send message to AI
   * @param {string} message
   * @param {object} options
   * @returns {Promise<object>}
   */
  async sendMessage(message, options = {}) {
    try {
      // Add user message to history
      const userMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      this.conversationHistory.push(userMessage);
      
      // Simulate typing delay
      await this.delay(1500);
      
      // Generate smart contextual response
      const aiResponse = this.generateSmartResponse(message);
      
      // Add AI response to history
      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      this.conversationHistory.push(aiMessage);
      
      // Save updated history
      StorageUtils.setChatHistory(this.conversationHistory);
      
      console.log('OpenAI Service: Message sent and response received');
      
      return {
        message: aiResponse,
        timestamp: aiMessage.timestamp,
        success: true
      };
      
    } catch (error) {
      console.error('OpenAI Service: Error sending message', error);
      throw error;
    }
  }

  /**
   * Generate contextual response based on message content
   * @param {string} message
   * @returns {string}
   */
  generateSmartResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Pricing related responses
    if (this.containsKeywords(lowerMessage, ['fiyat', 'ücret', 'maliyet', 'ne kadar', 'tutar', 'para'])) {
      return this.getPricingResponse();
    }
    
    // Timeline related responses
    if (this.containsKeywords(lowerMessage, ['süre', 'zaman', 'ne kadar sürede', 'tamamlanma', 'bitirme', 'hazırlama'])) {
      return this.getTimelineResponse();
    }
    
    // Technology related responses
    if (this.containsKeywords(lowerMessage, ['teknoloji', 'programlama', 'dil', 'framework', 'react', 'vue', 'angular', 'javascript', 'html', 'css'])) {
      return this.getTechnologyResponse();
    }
    
    // SEO related responses
    if (this.containsKeywords(lowerMessage, ['seo', 'arama motoru', 'google', 'optimizasyon', 'sıralama', 'arama'])) {
      return this.getSEOResponse();
    }
    
    // Mobile related responses
    if (this.containsKeywords(lowerMessage, ['mobil', 'responsive', 'telefon', 'tablet', 'uyumlu', 'mobile'])) {
      return this.getMobileResponse();
    }
    
    // E-commerce related responses
    if (this.containsKeywords(lowerMessage, ['e-ticaret', 'online mağaza', 'satış', 'alışveriş', 'woocommerce', 'shopify', 'ecommerce'])) {
      return this.getEcommerceResponse();
    }
    
    // Support related responses
    if (this.containsKeywords(lowerMessage, ['destek', 'bakım', 'güncelleme', 'yardım', 'sorun', 'problem'])) {
      return this.getSupportResponse();
    }
    
    // Portfolio related responses
    if (this.containsKeywords(lowerMessage, ['portföy', 'proje', 'örnek', 'çalışma', 'referans', 'portfolio'])) {
      return this.getPortfolioResponse();
    }
    
    // Contact related responses
    if (this.containsKeywords(lowerMessage, ['iletişim', 'görüşme', 'toplantı', 'randevu', 'konuşma', 'contact'])) {
      return this.getContactResponse();
    }
    
    // Greeting responses
    if (this.containsKeywords(lowerMessage, ['merhaba', 'selam', 'hello', 'hi', 'hey'])) {
      return this.getGreetingResponse();
    }
    
    // Default response
    return this.getDefaultResponse();
  }

  generateContextualResponse(message) {
    return this.generateSmartResponse(message);
  }

  /**
   * Check if message contains any of the keywords
   * @param {string} message
   * @param {string[]} keywords
   * @returns {boolean}
   */
  containsKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  /**
   * Get pricing related response
   * @returns {string}
   */
  getPricingResponse() {
    const responses = [
      "Web sitesi fiyatlandırması projenizin kapsamına göre değişir. Basit kurumsal siteler 2.500 TL'den, e-ticaret siteleri 4.000 TL'den başlar. Detaylı teklif için projenizin gereksinimlerini belirtmeniz gerekir.",
      "Fiyatlandırma, sitenizin özelliklerine, tasarım karmaşıklığına ve geliştirme süresine göre belirlenir. Size özel teklif hazırlamak için hangi tür web sitesi istediğinizi anlatabilir misiniz?",
      "Web geliştirme fiyatlarımız şeffaf ve rekabetçi. Temel paketlerimiz 2.500 TL'den başlıyor. Daha detaylı bilgi için projenizin özelliklerini paylaşabilir misiniz?"
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get timeline related response
   * @returns {string}
   */
  getTimelineResponse() {
    const responses = [
      "Proje süresi, web sitenizin karmaşıklığına göre değişir. Basit kurumsal siteler 2-3 hafta, e-ticaret siteleri 4-6 hafta sürer. Hızlı teslimat için öncelikli geliştirme paketlerimiz de mevcuttur.",
      "Geliştirme süremiz projenizin kapsamına bağlıdır. Standart web siteleri 2-4 hafta arasında tamamlanır. Acil projeler için express geliştirme hizmeti sunuyoruz.",
      "Web sitesi teslim süreleri: Kurumsal siteler 2-3 hafta, e-ticaret 4-6 hafta, özel uygulamalar 6-12 hafta. Size özel bir zaman çizelgesi hazırlayabilirim."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get technology related response
   * @returns {string}
   */
  getTechnologyResponse() {
    const responses = [
      "Modern web teknolojileri kullanıyorum: HTML5, CSS3, JavaScript, React, Vue.js, Node.js, PHP, MySQL. Projenizin gereksinimlerine en uygun teknolojiyi seçiyoruz.",
      "Güncel teknoloji stack'im: Frontend için React/Vue.js, backend için Node.js/PHP, veritabanı için MySQL/MongoDB. Her proje için en optimal çözümü sunuyorum.",
      "HTML5, CSS3, JavaScript, React, Vue.js, Node.js, PHP, MySQL, WordPress, WooCommerce gibi teknolojilerle çalışıyorum. Hangi teknoloji ile ilgili detay istiyorsunuz?"
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get SEO related response
   * @returns {string}
   */
  getSEOResponse() {
    const responses = [
      "Evet, tüm web sitelerimde SEO optimizasyonu dahildir. Google Analytics, Search Console kurulumu, meta tag optimizasyonu, hız optimizasyonu ve içerik optimizasyonu yapıyorum.",
      "SEO optimizasyonu web sitenizin arama motorlarında üst sıralarda yer alması için kritik. Teknik SEO, içerik optimizasyonu ve performans iyileştirmeleri dahil kapsamlı SEO hizmeti sunuyorum.",
      "SEO hizmetlerim: Teknik SEO analizi, anahtar kelime araştırması, içerik optimizasyonu, site hızı iyileştirme, Google Analytics kurulumu. SEO paketlerim ayrıca da mevcuttur."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get mobile related response
   * @returns {string}
   */
  getMobileResponse() {
    const responses = [
      "Evet, tüm web sitelerim responsive tasarımla mobil uyumludur. Mobile-first yaklaşımı benimsiyorum ve tüm cihazlarda mükemmel görünüm sağlıyorum.",
      "Mobil uyumluluk zorunludur. Web siteleriniz telefon, tablet ve desktop'ta aynı kalitede çalışır. Touch-friendly tasarım ve hızlı yükleme süreleri garanti ediyorum.",
      "Responsive tasarım ile web siteniz tüm cihazlarda mükemmel görünür. Mobile-first yaklaşımı, touch-friendly arayüz ve optimize edilmiş performans sunuyorum."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get e-commerce related response
   * @returns {string}
   */
  getEcommerceResponse() {
    const responses = [
      "E-ticaret siteleri uzmanlık alanım. WooCommerce, Shopify, özel e-ticaret çözümleri geliştiriyorum. Ödeme entegrasyonları, envanter yönetimi, kargo entegrasyonları dahil.",
      "Online mağaza geliştirme konusunda deneyimliyim. WooCommerce ve Shopify ile profesyonel e-ticaret siteleri kuruyorum. Satış artırıcı özellikler ve SEO optimizasyonu dahil.",
      "E-ticaret çözümlerim: WooCommerce kurulumu, ödeme sistemleri entegrasyonu, envanter yönetimi, kargo entegrasyonları, mobil mağaza optimizasyonu. Hangi e-ticaret platformunu tercih ediyorsunuz?"
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get support related response
   * @returns {string}
   */
  getSupportResponse() {
    const responses = [
      "Site bakım ve güncelleme hizmetlerim mevcuttur. Güvenlik güncellemeleri, yedekleme, performans izleme ve 7/24 teknik destek sunuyorum. Aylık bakım paketlerim 500 TL'den başlıyor.",
      "Web sitenizin sürekli güncel ve güvenli kalması için bakım hizmetleri sunuyorum. Güvenlik güncellemeleri, yedekleme, hız optimizasyonu ve teknik destek dahil.",
      "Site bakım hizmetlerim: Güvenlik güncellemeleri, otomatik yedekleme, performans izleme, içerik güncellemeleri, teknik destek. Aylık bakım paketlerim mevcuttur."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get portfolio related response
   * @returns {string}
   */
  getPortfolioResponse() {
    const responses = [
      "Portföyümde 50+ tamamlanmış proje bulunuyor. E-ticaret, kurumsal siteler, mobil uygulamalar ve özel projeler geliştirdim. Projelerimi sağ tarafta inceleyebilirsiniz.",
      "Çeşitli sektörlerden projeler geliştirdim: moda e-ticaret, restoran rezervasyon sistemi, eğitim platformu, hastane yönetim sistemi. Detayları için portföy bölümüme bakabilirsiniz.",
      "Portföyümde kurumsal siteler, e-ticaret platformları, mobil uygulamalar ve özel yazılımlar var. 5 yıllık deneyimimle farklı sektörlerden başarılı projeler tamamladım."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get contact related response
   * @returns {string}
   */
  getContactResponse() {
    const responses = [
      "İletişim için e-posta, WhatsApp veya LinkedIn üzerinden ulaşabilirsiniz. Hızlı yanıt için WhatsApp'ı tercih edebilirsiniz. Görüşme planlamak için Cal.com linkimi kullanabilirsiniz.",
      "Projenizi görüşmek için WhatsApp, e-posta veya LinkedIn'den iletişime geçebilirsiniz. 2 saat içinde yanıt veriyorum. Ücretsiz danışmanlık için görüşme planlayabiliriz.",
      "İletişim bilgilerim profil bölümünde. WhatsApp en hızlı iletişim yolu. Proje detaylarını görüşmek için ücretsiz 30 dakikalık görüşme planlayabiliriz."
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get default response
   * @returns {string}
   */
  getGreetingResponse() {
    const responses = [
      "Merhaba! Size nasıl yardımcı olabilirim? Web geliştirme, e-ticaret, SEO, mobil uygulama geliştirme gibi konularda sorularınızı yanıtlayabilirim.",
      "Selam! Web geliştirme hizmetlerim hakkında bilgi almak istiyorsanız, size yardımcı olabilirim. Hangi konuda detay istiyorsunuz?",
      "Merhaba! Projeniz hakkında konuşalım! Web sitesi, e-ticaret, mobil uygulama veya başka bir proje mi planlıyorsunuz? Size en uygun çözümü sunabilirim."
    ];
    return this.getRandomResponse(responses);
  }

  getDefaultResponse() {
    const responses = [
      "Size nasıl yardımcı olabilirim? Web geliştirme, tasarım, SEO optimizasyonu veya teknik destek konularında sorularınızı bekliyorum.",
      "Web geliştirme konularında size yardımcı olmaktan memnuniyet duyarım. Hangi konuda bilgi almak istiyorsunuz?",
      "Projeniz hakkında daha detaylı bilgi verebilir misiniz? Size en uygun çözümü sunabilirim.",
      "Web geliştirme, e-ticaret, SEO veya başka bir konuda sorularınızı yanıtlayabilirim. Hangi konuda yardıma ihtiyacınız var?"
    ];
    return this.getRandomResponse(responses);
  }

  /**
   * Get random response from array
   * @param {string[]} responses
   * @returns {string}
   */
  getRandomResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
    StorageUtils.clearChatHistory();
    console.log('OpenAI Service: Conversation history cleared');
  }

  /**
   * Get conversation history
   * @returns {array}
   */
  getHistory() {
    return this.conversationHistory;
  }

  /**
   * Simulate network delay
   * @param {number} ms
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Export conversation as text
   * @returns {string}
   */
  exportConversation() {
    return this.conversationHistory.map(msg => {
      const role = msg.role === 'user' ? 'Kullanıcı' : 'Asistan';
      const time = new Date(msg.timestamp).toLocaleString('tr-TR');
      return `[${time}] ${role}: ${msg.content}`;
    }).join('\n\n');
  }

  /**
   * Get conversation summary
   * @returns {object}
   */
  getConversationSummary() {
    const userMessages = this.conversationHistory.filter(msg => msg.role === 'user');
    const aiMessages = this.conversationHistory.filter(msg => msg.role === 'assistant');
    
    return {
      totalMessages: this.conversationHistory.length,
      userMessages: userMessages.length,
      aiMessages: aiMessages.length,
      duration: this.conversationHistory.length > 0 ? 
        new Date(this.conversationHistory[this.conversationHistory.length - 1].timestamp) - 
        new Date(this.conversationHistory[0].timestamp) : 0
    };
  }
}

// Create singleton instance
const openAIService = new OpenAIService();

// Export for use in other modules
export { OpenAIService };
export default openAIService;
