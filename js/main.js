/**
 * Main Application Entry Point
 * Initializes the portfolio website with all components and services
 */

import Foundation from './utils/dom-helpers.js';
import StorageUtils from './utils/storage.js';
import Config from './config.js';

// Import services
import clerkAuthService from './services/clerk-auth.js';
import openAIService from './services/openai-service.js';
import emailService from './services/email-service.js';
import analyticsService from './services/analytics.js';

// Import components (these will be loaded dynamically as needed)
// import BaseButton from './components/atoms/base-button.js';
// import AvatarImage from './components/atoms/avatar-image.js';
// import BadgeTag from './components/atoms/badge-tag.js';
// import IconSVG from './components/atoms/icon-svg.js';
// import LoaderSpinner from './components/atoms/loader-spinner.js';

class PortfolioApp {
  constructor() {
    this.isInitialized = false;
    this.components = new Map();
    this.services = new Map();
    this.eventListeners = new Map();
    this.sliders = new Map();
    this.modals = new Map();
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Portfolio App: Initializing...');
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeApp());
      } else {
        this.initializeApp();
      }
      
    } catch (error) {
      console.error('Portfolio App: Initialization failed', error);
    }
  }

  /**
   * Main application initialization
   */
  async initializeApp() {
    try {
      // Initialize services
      await this.initializeServices();
      
      // Initialize components
      await this.initializeComponents();
      
      // Initialize third-party libraries
      await this.initializeLibraries();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Load data
      await this.loadData();
      
      // Initialize analytics
      this.initializeAnalytics();
      
      // Update footer year
      this.updateFooterYear();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Setup error handling
      this.setupErrorHandling();
      
      this.isInitialized = true;
      console.log('Portfolio App: Initialized successfully');
      
      // Dispatch app ready event
      this.dispatchEvent('app:ready');
      
    } catch (error) {
      console.error('Portfolio App: Initialization failed', error);
      this.handleError(error);
    }
  }

  /**
   * Initialize services
   */
  async initializeServices() {
    console.log('Portfolio App: Initializing services...');
    
    // Register services
    this.services.set('auth', clerkAuthService);
    this.services.set('ai', openAIService);
    this.services.set('email', emailService);
    this.services.set('analytics', analyticsService);
    
    // Initialize auth state listener
    clerkAuthService.addAuthStateListener((user) => {
      this.handleAuthStateChange(user);
    });
    
    console.log('Portfolio App: Services initialized');
  }

  /**
   * Initialize components
   */
  async initializeComponents() {
    console.log('Portfolio App: Initializing components...');
    
    // Load components dynamically
    await this.loadComponents();
    
    // Initialize component instances
    await this.initializeComponentInstances();
    
    console.log('Portfolio App: Components initialized');
  }

  /**
   * Load components dynamically
   */
  async loadComponents() {
    const componentModules = [
      './components/atoms/base-button.js',
      './components/atoms/avatar-image.js',
      './components/atoms/badge-tag.js',
      './components/atoms/icon-svg.js',
      './components/atoms/loader-spinner.js',
      './components/molecules/service-card.js',
      './components/molecules/project-card.js',
      './components/molecules/faq-button.js',
      './components/molecules/article-preview.js',
      './components/molecules/stat-counter.js',
      './components/molecules/social-links.js',
      './components/organisms/app-header.js',
      './components/organisms/sidebar-left.js',
      './components/organisms/sidebar-right.js',
      './components/organisms/service-slider.js',
      './components/organisms/faq-slider.js',
      './components/organisms/ai-chat-inline.js',
      './components/organisms/auth-modal.js',
      './components/organisms/project-grid.js',
      './components/organisms/cal-embed.js'
    ];

    for (const modulePath of componentModules) {
      try {
        const module = await import(modulePath);
        console.log(`Portfolio App: Loaded component ${modulePath}`);
      } catch (error) {
        console.warn(`Portfolio App: Failed to load component ${modulePath}`, error);
      }
    }
  }

  /**
   * Initialize component instances
   */
  async initializeComponentInstances() {
    // Initialize header
    const header = document.getElementById('app-header');
    if (header) {
      header.innerHTML = '<app-header></app-header>';
    }

    // Initialize left sidebar
    const leftSidebar = document.getElementById('sidebar-left');
    if (leftSidebar) {
      leftSidebar.innerHTML = '<sidebar-left></sidebar-left>';
    }

    // Initialize right sidebar
    const rightSidebar = document.getElementById('sidebar-right');
    if (rightSidebar) {
      rightSidebar.innerHTML = '<sidebar-right></sidebar-right>';
    }

    // Initialize service slider
    const serviceSlider = document.getElementById('service-slider');
    if (serviceSlider) {
      serviceSlider.innerHTML = '<service-slider></service-slider>';
    }

    // Initialize FAQ slider
    const faqSlider = document.getElementById('faq-slider');
    if (faqSlider) {
      faqSlider.innerHTML = '<faq-slider></faq-slider>';
    }


    const authModal = document.getElementById('auth-modal');
    if (authModal) {
      authModal.innerHTML = '<auth-modal></auth-modal>';
    }
  }

  /**
   * Initialize third-party libraries
   */
  async initializeLibraries() {
    console.log('Portfolio App: Initializing libraries...');
    
    // Initialize AOS (Animate On Scroll)
    if (Config.isFeatureEnabled('animations')) {
      try {
        if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
          AOS.init({
            duration: Config.aos.duration,
            easing: Config.aos.easing,
            once: Config.aos.once,
            offset: Config.aos.offset,
            disable: Config.isMobile() ? 'mobile' : false
          });
        } else {
          // If AOS is not available, ensure elements with data-aos are visible
          document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '';
            el.style.transform = '';
          });
        }
      } catch (e) {
        console.error('AOS initialization failed:', e);
        // Make sure elements are visible if AOS fails
        document.querySelectorAll('[data-aos]').forEach(el => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      }
    }

    // Initialize Swiper sliders
    await this.initializeSliders();
    
    console.log('Portfolio App: Libraries initialized');
  }

  /**
   * Initialize Swiper sliders
   */
  async initializeSliders() {
    // Service slider
    const serviceSliderEl = document.querySelector('.service-slider .swiper');
    if (serviceSliderEl && typeof Swiper !== 'undefined') {
      const serviceSlider = new Swiper(serviceSliderEl, {
        ...Config.swiper.serviceSlider,
        on: {
          init: () => {
            console.log('Portfolio App: Service slider initialized');
          }
        }
      });
      this.sliders.set('service', serviceSlider);
    }

    // FAQ slider
    const faqSliderEl = document.querySelector('.faq-slider .swiper');
    if (faqSliderEl && typeof Swiper !== 'undefined') {
      const faqSlider = new Swiper(faqSliderEl, {
        ...Config.swiper.faqSlider,
        on: {
          init: () => {
            console.log('Portfolio App: FAQ slider initialized');
          }
        }
      });
      this.sliders.set('faq', faqSlider);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    console.log('Portfolio App: Setting up event listeners...');
    
    // Mobile menu toggle
    this.setupMobileMenu();
    
    // Chat modal trigger
    this.setupChatModal();
    
    // Auth modal trigger
    this.setupAuthModal();
    
    // Mobile CTA button
    this.setupMobileCTA();
    
    // FAQ chat integration
    this.setupFAQChat();
    
    // Window resize handler
    this.setupResizeHandler();
    
    // Scroll handler
    this.setupScrollHandler();
    
    console.log('Portfolio App: Event listeners setup complete');
  }

  /**
   * Setup mobile menu
   */
  setupMobileMenu() {
    console.log('Portfolio App: Setting up mobile menu...');
    
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      const hamburger = document.getElementById('mobile-menu-toggle');
      const sidebar = document.getElementById('sidebar-left');
      const overlay = document.getElementById('menu-overlay');
      
      console.log('Mobile menu elements:', { hamburger, sidebar, overlay });
      console.log('Overlay element details:', overlay ? {
        tagName: overlay.tagName,
        id: overlay.id,
        className: overlay.className,
        style: overlay.style.cssText
      } : 'Not found');
      
      // If overlay is not found, try again after a longer delay
      if (!overlay) {
        console.log('Overlay not found, retrying in 500ms...');
        setTimeout(() => {
          this.setupMobileMenu();
        }, 500);
        return;
      }
    
    if (hamburger && sidebar && overlay) {
      const toggleMenu = () => {
        console.log('Hamburger clicked!');
        const isOpen = sidebar.classList.contains('open');
        console.log('Menu is currently:', isOpen ? 'open' : 'closed');
        
        if (isOpen) {
          // Close menu
          console.log('Closing menu...');
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
          document.body.classList.remove('menu-open');
        } else {
          // Open menu
          console.log('Opening menu...');
          sidebar.classList.add('open');
          overlay.classList.add('active');
          document.body.classList.add('menu-open');
        }
        
        // Analytics tracking
        analyticsService.trackEvent('navigation', 'mobile_menu_toggle');
      };
      
      const closeMenu = () => {
        console.log('Closing menu from overlay click or escape key...');
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Analytics tracking
        analyticsService.trackEvent('navigation', 'mobile_menu_close');
      };
      
      // Hamburger click to toggle menu
      hamburger.addEventListener('click', toggleMenu);
      
      // Overlay click to close menu - DISABLED: Now handled in app-header.js
      // const overlayClickHandler = (e) => {
      //   console.log('Overlay event triggered!', e.type, e.target, e.currentTarget);
      //   console.log('Overlay active override:', overlay.classList.contains('active'));
      //   console.log('Sidebar open class:', sidebar.classList.contains('open'));
      //   
      //   // Always close menu when overlay is clicked
      //   console.log('Closing menu from overlay event:', e.type);
      //   closeMenu();
      // };

      // Add multiple event listeners for better compatibility - DISABLED
      // overlay.addEventListener('click', overlayClickHandler);
      // overlay.addEventListener('mousedown', overlayClickHandler);
      // overlay.addEventListener('touchstart', overlayClickHandler);
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
          closeMenu();
        }
      });
      
      this.eventListeners.set('mobileMenu', { toggleMenu, closeMenu });
    }
    }, 100); // Wait 100ms for DOM to be ready
  }

  /**
   * Setup inline chat
   */
  setupChatModal() {
    const openChatBtn = document.getElementById('open-chat-btn');
    const mobileCTABtn = document.getElementById('mobile-cta-btn');
    
    const focusChatInput = () => {
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
        chatInput.focus();
        if (window.analyticsService) {
          window.analyticsService.trackEvent('chat', 'input_focused');
        }
      }
    };
    
    const scrollToChat = () => {
      const chatSection = document.querySelector('.chat-section');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
        // Focus input after scroll
        setTimeout(() => {
          const chatInput = document.getElementById('chat-input');
          if (chatInput) {
            chatInput.focus();
          }
        }, 500);
        if (window.analyticsService) {
          window.analyticsService.trackEvent('chat', 'section_scrolled');
        }
      }
    };
    
    if (openChatBtn) {
      openChatBtn.addEventListener('click', focusChatInput);
    }
    
    if (mobileCTABtn) {
      mobileCTABtn.addEventListener('click', scrollToChat);
    }
    
    this.eventListeners.set('chatModal', { focusChatInput, scrollToChat });
  }

  /**
   * Setup auth modal
   */
  setupAuthModal() {
    const authModal = document.querySelector('auth-modal');
    if (authModal) {
      // Listen for auth events
      document.addEventListener('auth:required', () => {
        authModal.show();
        analyticsService.trackEvent('auth', 'modal_open');
      });
      
      this.eventListeners.set('authModal', authModal);
    }
  }

  /**
   * Setup mobile CTA
   */
  setupMobileCTA() {
    const mobileCTABar = document.getElementById('mobile-cta-bar');
    if (mobileCTABar) {
      // Show/hide CTA bar based on scroll position
      const toggleCTA = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollY > windowHeight && Config.isMobile()) {
          mobileCTABar.style.display = 'block';
        } else {
          mobileCTABar.style.display = 'none';
        }
      };
      
      window.addEventListener('scroll', Foundation.throttle(toggleCTA, 100));
      this.eventListeners.set('mobileCTA', { toggleCTA });
    }
  }

  /**
   * Setup FAQ chat integration
   */
  setupFAQChat() {
    // Listen for FAQ button clicks
    document.addEventListener('open-chat-with-question', (event) => {
      const { question } = event.detail;
      
      console.log('FAQ question clicked:', question);
      
      // Find inline chat component
      const chatInline = document.querySelector('ai-chat-inline');
      
      console.log('Chat inline found:', chatInline);
      
      if (chatInline) {
        // Scroll to chat section
        const chatSection = document.querySelector('.chat-section');
        if (chatSection) {
          chatSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Set message and send after a short delay
        setTimeout(() => {
          if (chatInline.setMessageAndSend) {
            chatInline.setMessageAndSend(question);
            console.log('Question sent to inline chat:', question);
          } else {
            console.error('setMessageAndSend method not found on chat inline');
          }
        }, 500);
        
        // Analytics tracking
        if (window.analyticsService) {
          window.analyticsService.trackEvent('chat', 'faq_question_clicked', { question });
        }
      } else {
        console.error('Chat inline not found! Available elements:', {
          'ai-chat-inline': document.querySelector('ai-chat-inline'),
          'chat-section': document.querySelector('.chat-section')
        });
      }
    });
    
    console.log('Portfolio App: FAQ chat integration setup complete');
  }

  /**
   * Setup resize handler
   */
  setupResizeHandler() {
    const handleResize = Foundation.debounce(() => {
      // Update AOS on resize
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
      
      // Update sliders on resize
      this.sliders.forEach(slider => {
        if (slider.update) {
          slider.update();
        }
      });
      
      // Analytics tracking
      analyticsService.trackEvent('technical', 'window_resize', `${window.innerWidth}x${window.innerHeight}`);
      
    }, Config.performance.debounceDelay);
    
    window.addEventListener('resize', handleResize);
    this.eventListeners.set('resize', { handleResize });
  }

  /**
   * Setup scroll handler
   */
  setupScrollHandler() {
    let scrollTimeout;
    
    const handleScroll = Foundation.throttle(() => {
      // Track scroll depth
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = Math.round((scrollY / (documentHeight - windowHeight)) * 100);
      
      // Track scroll milestones
      analyticsService.trackScrollDepth(scrollPercent);
      
      // Clear timeout and set new one
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        analyticsService.trackTimeOnPage(Math.round(scrollY / 100)); // Approximate time based on scroll
      }, 1000);
      
    }, Config.performance.throttleDelay);
    
    window.addEventListener('scroll', handleScroll);
    this.eventListeners.set('scroll', { handleScroll });
  }

  /**
   * Load application data
   */
  async loadData() {
    console.log('Portfolio App: Loading data...');
    
    try {
      // Load profile data
      await this.loadProfileData();
      
      // Load services data
      await this.loadServicesData();
      
      // Load projects data
      await this.loadProjectsData();
      
      // Load articles data
      await this.loadArticlesData();
      
      // Load FAQ data
      await this.loadFAQData();
      
      console.log('Portfolio App: Data loaded successfully');
      
    } catch (error) {
      console.error('Portfolio App: Failed to load data', error);
    }
  }

  /**
   * Load profile data
   */
  async loadProfileData() {
    try {
      const response = await fetch(Config.getAPIEndpoint('profile'));
      const data = await response.json();
      
      // Store in global state or dispatch event
      this.dispatchEvent('data:profile-loaded', data);
      
    } catch (error) {
      console.error('Portfolio App: Failed to load profile data', error);
    }
  }

  /**
   * Load services data
   */
  async loadServicesData() {
    try {
      const response = await fetch(Config.getAPIEndpoint('services'));
      const data = await response.json();
      
      this.dispatchEvent('data:services-loaded', data);
      
    } catch (error) {
      console.error('Portfolio App: Failed to load services data', error);
    }
  }

  /**
   * Load projects data
   */
  async loadProjectsData() {
    try {
      const response = await fetch(Config.getAPIEndpoint('projects'));
      const data = await response.json();
      
      this.dispatchEvent('data:projects-loaded', data);
      
    } catch (error) {
      console.error('Portfolio App: Failed to load projects data', error);
    }
  }

  /**
   * Load articles data
   */
  async loadArticlesData() {
    try {
      const response = await fetch(Config.getAPIEndpoint('articles'));
      const data = await response.json();
      
      this.dispatchEvent('data:articles-loaded', data);
      
    } catch (error) {
      console.error('Portfolio App: Failed to load articles data', error);
    }
  }

  /**
   * Load FAQ data
   */
  async loadFAQData() {
    try {
      const response = await fetch(Config.getAPIEndpoint('faq'));
      const data = await response.json();
      
      this.dispatchEvent('data:faq-loaded', data);
      
    } catch (error) {
      console.error('Portfolio App: Failed to load FAQ data', error);
    }
  }

  /**
   * Initialize analytics
   */
  initializeAnalytics() {
    if (Config.isFeatureEnabled('analytics')) {
      // Track page view
      analyticsService.trackPageView();
      
      // Track app initialization
      analyticsService.trackEvent('app', 'initialized');
      
      console.log('Portfolio App: Analytics initialized');
    }
  }

  /**
   * Update footer year dynamically
   */
  updateFooterYear() {
    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    if (Config.isFeatureEnabled('analytics')) {
      // Track page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const metrics = {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
          };
          
          analyticsService.trackPerformance(metrics);
        }, 1000);
      });
    }
  }

  /**
   * Setup error handling
   */
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError(event.error);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason);
    });
  }

  /**
   * Handle authentication state changes
   */
  handleAuthStateChange(user) {
    if (user) {
      analyticsService.trackAuth('login');
      analyticsService.setUserId(user.id);
      this.dispatchEvent('auth:login', user);
    } else {
      analyticsService.trackAuth('logout');
      this.dispatchEvent('auth:logout');
    }
  }

  /**
   * Handle errors
   */
  handleError(error) {
    console.error('Portfolio App: Error occurred', error);
    
    // Track error in analytics
    if (Config.isFeatureEnabled('analytics')) {
      analyticsService.trackError('javascript', error.message, window.location.pathname);
    }
    
    // Dispatch error event
    this.dispatchEvent('app:error', error);
    
    // Show user-friendly error message
    this.showErrorToast(Config.messages.errors.unknown);
  }

  /**
   * Show error toast
   */
  showErrorToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-danger border-0';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    
    // Add to container
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      
      // Initialize and show toast
      if (typeof bootstrap !== 'undefined') {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
          toast.remove();
        });
      }
    }
  }

  /**
   * Dispatch custom event
   */
  dispatchEvent(eventName, detail = null) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Get service instance
   */
  getService(name) {
    return this.services.get(name);
  }

  /**
   * Get slider instance
   */
  getSlider(name) {
    return this.sliders.get(name);
  }

  /**
   * Get component instance
   */
  getComponent(name) {
    return this.components.get(name);
  }
}

// Simple initialization function for immediate testing
function initializeComponents() {
  console.log('Initializing components...');
  
  // Initialize header
  const header = document.getElementById('app-header');
  if (header) {
    header.innerHTML = '<app-header></app-header>';
  }

  // Initialize left sidebar
  const leftSidebar = document.getElementById('sidebar-left');
  if (leftSidebar) {
    leftSidebar.innerHTML = '<sidebar-left></sidebar-left>';
  }

  // Initialize right sidebar
  const rightSidebar = document.getElementById('sidebar-right');
  if (rightSidebar) {
    rightSidebar.innerHTML = '<sidebar-right></sidebar-right>';
  }

  // Initialize service slider
  const serviceSlider = document.getElementById('service-slider');
  if (serviceSlider) {
    serviceSlider.innerHTML = '<service-slider></service-slider>';
  }

  // Initialize FAQ slider
  const faqSlider = document.getElementById('faq-slider');
  if (faqSlider) {
    faqSlider.innerHTML = '<faq-slider></faq-slider>';
  }
}

// Initialize the application
const app = new PortfolioApp();

// Export for use in other modules
export default app;
