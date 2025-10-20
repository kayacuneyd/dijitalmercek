/**
 * Netlify Serverless Function - Chat API
 * Mock OpenAI integration for Turkish responses
 */

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed',
        message: 'Only POST requests are supported'
      })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { messages, userInfo } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Bad request',
          message: 'Messages array is required'
        })
      };
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content || '';

    // Generate contextual response
    const response = generateContextualResponse(userMessage);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Return response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: response,
        timestamp: new Date().toISOString(),
        success: true,
        model: 'mock-gpt-4',
        usage: {
          prompt_tokens: userMessage.length,
          completion_tokens: response.length,
          total_tokens: userMessage.length + response.length
        }
      })
    };

  } catch (error) {
    console.error('Chat API Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your request',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

/**
 * Generate contextual response based on message content
 * @param {string} message - User message
 * @returns {string} - AI response
 */
function generateContextualResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Pricing related responses
  if (containsKeywords(lowerMessage, ['fiyat', 'ücret', 'maliyet', 'ne kadar', 'tutar'])) {
    return getPricingResponse();
  }

  // Timeline related responses
  if (containsKeywords(lowerMessage, ['süre', 'zaman', 'ne kadar sürede', 'tamamlanma', 'bitirme'])) {
    return getTimelineResponse();
  }

  // Technology related responses
  if (containsKeywords(lowerMessage, ['teknoloji', 'programlama', 'dil', 'framework', 'react', 'vue', 'angular'])) {
    return getTechnologyResponse();
  }

  // SEO related responses
  if (containsKeywords(lowerMessage, ['seo', 'arama motoru', 'google', 'optimizasyon', 'sıralama'])) {
    return getSEOResponse();
  }

  // Mobile related responses
  if (containsKeywords(lowerMessage, ['mobil', 'responsive', 'telefon', 'tablet', 'uyumlu'])) {
    return getMobileResponse();
  }

  // E-commerce related responses
  if (containsKeywords(lowerMessage, ['e-ticaret', 'online mağaza', 'satış', 'alışveriş', 'woocommerce', 'shopify'])) {
    return getEcommerceResponse();
  }

  // Support related responses
  if (containsKeywords(lowerMessage, ['destek', 'bakım', 'güncelleme', 'yardım', 'sorun'])) {
    return getSupportResponse();
  }

  // Portfolio related responses
  if (containsKeywords(lowerMessage, ['portföy', 'proje', 'örnek', 'çalışma', 'referans'])) {
    return getPortfolioResponse();
  }

  // Contact related responses
  if (containsKeywords(lowerMessage, ['iletişim', 'görüşme', 'toplantı', 'randevu', 'konuşma'])) {
    return getContactResponse();
  }

  // Default response
  return getDefaultResponse();
}

/**
 * Check if message contains any of the keywords
 * @param {string} message - Message to check
 * @param {string[]} keywords - Keywords to search for
 * @returns {boolean}
 */
function containsKeywords(message, keywords) {
  return keywords.some(keyword => message.includes(keyword));
}

/**
 * Get pricing related response
 * @returns {string}
 */
function getPricingResponse() {
  const responses = [
    "Web sitesi fiyatlandırması projenizin kapsamına göre değişir. Basit kurumsal siteler 2.500 TL'den, e-ticaret siteleri 4.000 TL'den başlar. Detaylı teklif için projenizin gereksinimlerini belirtmeniz gerekir.",
    "Fiyatlandırma, sitenizin özelliklerine, tasarım karmaşıklığına ve geliştirme süresine göre belirlenir. Size özel teklif hazırlamak için hangi tür web sitesi istediğinizi anlatabilir misiniz?",
    "Web geliştirme fiyatlarımız şeffaf ve rekabetçi. Temel paketlerimiz 2.500 TL'den başlıyor. Daha detaylı bilgi için projenizin özelliklerini paylaşabilir misiniz?"
  ];
  return getRandomResponse(responses);
}

/**
 * Get timeline related response
 * @returns {string}
 */
function getTimelineResponse() {
  const responses = [
    "Proje süresi, web sitenizin karmaşıklığına göre değişir. Basit kurumsal siteler 2-3 hafta, e-ticaret siteleri 4-6 hafta sürer. Hızlı teslimat için öncelikli geliştirme paketlerimiz de mevcuttur.",
    "Geliştirme süremiz projenizin kapsamına bağlıdır. Standart web siteleri 2-4 hafta arasında tamamlanır. Acil projeler için express geliştirme hizmeti sunuyoruz.",
    "Web sitesi teslim süreleri: Kurumsal siteler 2-3 hafta, e-ticaret 4-6 hafta, özel uygulamalar 6-12 hafta. Size özel bir zaman çizelgesi hazırlayabilirim."
  ];
  return getRandomResponse(responses);
}

/**
 * Get technology related response
 * @returns {string}
 */
function getTechnologyResponse() {
  const responses = [
    "Modern web teknolojileri kullanıyorum: HTML5, CSS3, JavaScript, React, Vue.js, Node.js, PHP, MySQL. Projenizin gereksinimlerine en uygun teknolojiyi seçiyoruz.",
    "Güncel teknoloji stack'im: Frontend için React/Vue.js, backend için Node.js/PHP, veritabanı için MySQL/MongoDB. Her proje için en optimal çözümü sunuyorum.",
    "HTML5, CSS3, JavaScript, React, Vue.js, Node.js, PHP, MySQL, WordPress, WooCommerce gibi teknolojilerle çalışıyorum. Hangi teknoloji ile ilgili detay istiyorsunuz?"
  ];
  return getRandomResponse(responses);
}

/**
 * Get SEO related response
 * @returns {string}
 */
function getSEOResponse() {
  const responses = [
    "Evet, tüm web sitelerimde SEO optimizasyonu dahildir. Google Analytics, Search Console kurulumu, meta tag optimizasyonu, hız optimizasyonu ve içerik optimizasyonu yapıyorum.",
    "SEO optimizasyonu web sitenizin arama motorlarında üst sıralarda yer alması için kritik. Teknik SEO, içerik optimizasyonu ve performans iyileştirmeleri dahil kapsamlı SEO hizmeti sunuyorum.",
    "SEO hizmetlerim: Teknik SEO analizi, anahtar kelime araştırması, içerik optimizasyonu, site hızı iyileştirme, Google Analytics kurulumu. SEO paketlerim ayrıca da mevcuttur."
  ];
  return getRandomResponse(responses);
}

/**
 * Get mobile related response
 * @returns {string}
 */
function getMobileResponse() {
  const responses = [
    "Evet, tüm web sitelerim responsive tasarımla mobil uyumludur. Mobile-first yaklaşımı benimsiyorum ve tüm cihazlarda mükemmel görünüm sağlıyorum.",
    "Mobil uyumluluk zorunludur. Web siteleriniz telefon, tablet ve desktop'ta aynı kalitede çalışır. Touch-friendly tasarım ve hızlı yükleme süreleri garanti ediyorum.",
    "Responsive tasarım ile web siteniz tüm cihazlarda mükemmel görünür. Mobile-first yaklaşımı, touch-friendly arayüz ve optimize edilmiş performans sunuyorum."
  ];
  return getRandomResponse(responses);
}

/**
 * Get e-commerce related response
 * @returns {string}
 */
function getEcommerceResponse() {
  const responses = [
    "E-ticaret siteleri uzmanlık alanım. WooCommerce, Shopify, özel e-ticaret çözümleri geliştiriyorum. Ödeme entegrasyonları, envanter yönetimi, kargo entegrasyonları dahil.",
    "Online mağaza geliştirme konusunda deneyimliyim. WooCommerce ve Shopify ile profesyonel e-ticaret siteleri kuruyorum. Satış artırıcı özellikler ve SEO optimizasyonu dahil.",
    "E-ticaret çözümlerim: WooCommerce kurulumu, ödeme sistemleri entegrasyonu, envanter yönetimi, kargo entegrasyonları, mobil mağaza optimizasyonu. Hangi e-ticaret platformunu tercih ediyorsunuz?"
  ];
  return getRandomResponse(responses);
}

/**
 * Get support related response
 * @returns {string}
 */
function getSupportResponse() {
  const responses = [
    "Site bakım ve güncelleme hizmetlerim mevcuttur. Güvenlik güncellemeleri, yedekleme, performans izleme ve 7/24 teknik destek sunuyorum. Aylık bakım paketlerim 500 TL'den başlıyor.",
    "Web sitenizin sürekli güncel ve güvenli kalması için bakım hizmetleri sunuyorum. Güvenlik güncellemeleri, yedekleme, hız optimizasyonu ve teknik destek dahil.",
    "Site bakım hizmetlerim: Güvenlik güncellemeleri, otomatik yedekleme, performans izleme, içerik güncellemeleri, teknik destek. Aylık bakım paketlerim mevcuttur."
  ];
  return getRandomResponse(responses);
}

/**
 * Get portfolio related response
 * @returns {string}
 */
function getPortfolioResponse() {
  const responses = [
    "Portföyümde 50+ tamamlanmış proje bulunuyor. E-ticaret, kurumsal siteler, mobil uygulamalar ve özel projeler geliştirdim. Projelerimi sağ tarafta inceleyebilirsiniz.",
    "Çeşitli sektörlerden projeler geliştirdim: moda e-ticaret, restoran rezervasyon sistemi, eğitim platformu, hastane yönetim sistemi. Detayları için portföy bölümüme bakabilirsiniz.",
    "Portföyümde kurumsal siteler, e-ticaret platformları, mobil uygulamalar ve özel yazılımlar var. 5 yıllık deneyimimle farklı sektörlerden başarılı projeler tamamladım."
  ];
  return getRandomResponse(responses);
}

/**
 * Get contact related response
 * @returns {string}
 */
function getContactResponse() {
  const responses = [
    "İletişim için e-posta, WhatsApp veya LinkedIn üzerinden ulaşabilirsiniz. Hızlı yanıt için WhatsApp'ı tercih edebilirsiniz. Görüşme planlamak için Cal.com linkimi kullanabilirsiniz.",
    "Projenizi görüşmek için WhatsApp, e-posta veya LinkedIn'den iletişime geçebilirsiniz. 2 saat içinde yanıt veriyorum. Ücretsiz danışmanlık için görüşme planlayabiliriz.",
    "İletişim bilgilerim profil bölümünde. WhatsApp en hızlı iletişim yolu. Proje detaylarını görüşmek için ücretsiz 30 dakikalık görüşme planlayabiliriz."
  ];
  return getRandomResponse(responses);
}

/**
 * Get default response
 * @returns {string}
 */
function getDefaultResponse() {
  const responses = [
    "Merhaba! Size nasıl yardımcı olabilirim? Web geliştirme, e-ticaret, SEO, mobil uygulama geliştirme gibi konularda sorularınızı yanıtlayabilirim.",
    "Web geliştirme hizmetlerim hakkında bilgi almak istiyorsanız, size yardımcı olabilirim. Hangi konuda detay istiyorsunuz?",
    "Projeniz hakkında konuşalım! Web sitesi, e-ticaret, mobil uygulama veya başka bir proje mi planlıyorsunuz? Size en uygun çözümü sunabilirim.",
    "Merhaba! Freelance web developer olarak 5 yıllık deneyimimle size hizmet veriyorum. Projeniz hakkında sorularınızı yanıtlayabilirim.",
    "Size nasıl yardımcı olabilirim? Web geliştirme, tasarım, SEO optimizasyonu veya teknik destek konularında sorularınızı bekliyorum."
  ];
  return getRandomResponse(responses);
}

/**
 * Get random response from array
 * @param {string[]} responses
 * @returns {string}
 */
function getRandomResponse(responses) {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}
