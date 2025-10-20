/**
 * Application Configuration
 * Central configuration for the portfolio website
 */

const Config = {
  // Application settings
  app: {
    name: 'Freelance Web Developer Portfolio',
    version: '1.0.0',
    environment: 'development', // development, staging, production
    debug: true
  },

  // API endpoints
  api: {
    baseURL: '',
    endpoints: {
      chat: '/.netlify/functions/chat',
      profile: '/data/profile.json',
      services: '/data/services.json',
      projects: '/data/projects.json',
      articles: '/data/articles.json',
      faq: '/data/faq-templates.json'
    }
  },

  // Feature flags
  features: {
    analytics: true,
    chat: true,
    auth: true,
    email: true,
    lazyLoading: true,
    animations: true,
    serviceWorker: false
  },

  // Chat settings
  chat: {
    maxGuestMessages: 3,
    typingDelay: 1000,
    responseDelay: 1500,
    maxMessageLength: 1000,
    enableHistory: true,
    enableExport: true
  },

  // Authentication settings
  auth: {
    tokenKey: 'auth_token',
    userKey: 'user',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    autoRefresh: true
  },

  // Swiper settings
  swiper: {
    serviceSlider: {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: true,
      pagination: false,
      breakpoints: {
        320: { slidesPerView: 1.2, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 24 }
      }
    },
    faqSlider: {
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: false,
      pagination: false,
      freeMode: true,
      grabCursor: true
    }
  },

  // AOS (Animate On Scroll) settings
  aos: {
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  },

  // Performance settings
  performance: {
    lazyLoadImages: true,
    intersectionObserver: true,
    debounceDelay: 300,
    throttleDelay: 100,
    preloadCritical: true
  },

  // Responsive breakpoints
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  },

  // Storage keys
  storage: {
    user: 'user',
    authToken: 'auth_token',
    chatHistory: 'chat_history',
    guestMessageCount: 'guest_message_count',
    appPreferences: 'app_preferences',
    analyticsProperties: 'analytics_user_properties'
  },

  // Error messages
  messages: {
    errors: {
      network: 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.',
      timeout: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
      unauthorized: 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.',
      forbidden: 'Bu işlem için yetkiniz bulunmuyor.',
      notFound: 'İstenen kaynak bulunamadı.',
      serverError: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
      unknown: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'
    },
    success: {
      messageSent: 'Mesajınız başarıyla gönderildi.',
      profileUpdated: 'Profil bilgileriniz güncellendi.',
      emailSent: 'E-posta başarıyla gönderildi.',
      dataSaved: 'Verileriniz kaydedildi.'
    },
    info: {
      loading: 'Yükleniyor...',
      saving: 'Kaydediliyor...',
      processing: 'İşleniyor...',
      connecting: 'Bağlanıyor...'
    }
  },

  // Validation rules
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    minLength: {
      name: 2,
      message: 10,
      password: 6
    },
    maxLength: {
      name: 50,
      message: 1000,
      description: 500
    }
  },

  // Theme settings
  theme: {
    primary: '#2563eb',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    dark: '#111827',
    light: '#f9fafb'
  },

  // Animation settings
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  },

  // Social media links
  social: {
    github: 'https://github.com/[YOUR_GITHUB]',
    linkedin: 'https://linkedin.com/in/[YOUR_LINKEDIN]',
    twitter: 'https://twitter.com/[YOUR_TWITTER]',
    instagram: 'https://instagram.com/[YOUR_INSTAGRAM]',
    email: 'mailto:[YOUR_EMAIL]',
    whatsapp: 'https://wa.me/[YOUR_PHONE]'
  },

  // External services
  services: {
    cal: {
      link: '[YOUR_CAL_LINK]',
      enabled: true
    },
    analytics: {
      google: null, // GA4 tracking ID
      enabled: false
    }
  },

  // Development settings
  development: {
    mockDelay: 1000,
    logLevel: 'debug',
    enableHotReload: false
  },

  // Production settings
  production: {
    minify: true,
    compress: true,
    cache: true,
    cdn: false
  }
};

// Environment-specific overrides
if (typeof window !== 'undefined') {
  // Detect environment
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('netlify.app') && 
                       window.location.hostname.includes('deploy-preview');

  if (isDevelopment) {
    Config.app.environment = 'development';
    Config.app.debug = true;
    Config.features.analytics = false;
    Config.development.mockDelay = 500;
  } else {
    Config.app.environment = 'production';
    Config.app.debug = false;
    Config.features.analytics = true;
  }
}

// Utility functions
Config.get = function(path, defaultValue = null) {
  const keys = path.split('.');
  let value = this;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value;
};

Config.set = function(path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let target = this;
  
  for (const key of keys) {
    if (!target[key] || typeof target[key] !== 'object') {
      target[key] = {};
    }
    target = target[key];
  }
  
  target[lastKey] = value;
};

Config.isFeatureEnabled = function(feature) {
  return this.features[feature] === true;
};

Config.isDevelopment = function() {
  return this.app.environment === 'development';
};

Config.isProduction = function() {
  return this.app.environment === 'production';
};

Config.getAPIEndpoint = function(endpoint) {
  return this.api.baseURL + this.api.endpoints[endpoint];
};

Config.getBreakpoint = function(size) {
  return this.breakpoints[size] || 0;
};

Config.isMobile = function() {
  return window.innerWidth < this.getBreakpoint('md');
};

Config.isTablet = function() {
  const width = window.innerWidth;
  return width >= this.getBreakpoint('sm') && width < this.getBreakpoint('lg');
};

Config.isDesktop = function() {
  return window.innerWidth >= this.getBreakpoint('lg');
};

// Export for use in other modules
export default Config;
