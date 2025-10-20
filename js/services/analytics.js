/**
 * Analytics Service
 * Provides event tracking and analytics functionality (mock implementation)
 */

import { StorageUtils } from '../utils/storage.js';

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.trackingId = null;
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.pageViews = 0;
    
    this.init();
  }

  /**
   * Initialize the service
   */
  init() {
    // In real implementation, this would come from environment variables
    this.trackingId = 'GA_MOCK_ID';
    this.isInitialized = true;
    
    // Track initial page view
    this.trackPageView();
    
    console.log('Analytics Service: Initialized (Mock)');
  }

  /**
   * Track page view
   * @param {string} page - Page path
   * @param {string} title - Page title
   */
  trackPageView(page = null, title = null) {
    const event = {
      type: 'page_view',
      page: page || window.location.pathname,
      title: title || document.title,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    this.events.push(event);
    this.pageViews++;
    
    console.log('Analytics: Page view tracked', event);
  }

  /**
   * Track custom event
   * @param {string} category
   * @param {string} action
   * @param {string} label
   * @param {number} value
   */
  trackEvent(category, action, label = null, value = null) {
    const event = {
      type: 'event',
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      page: window.location.pathname
    };
    
    this.events.push(event);
    
    console.log('Analytics: Event tracked', event);
  }

  /**
   * Track button click
   * @param {string} buttonId
   * @param {string} buttonText
   * @param {string} location
   */
  trackButtonClick(buttonId, buttonText, location = null) {
    this.trackEvent('button', 'click', `${buttonId}: ${buttonText}`, null);
    
    // Additional button-specific tracking
    this.trackEvent('engagement', 'button_click', location || window.location.pathname);
  }

  /**
   * Track form submission
   * @param {string} formId
   * @param {string} formType
   * @param {boolean} success
   */
  trackFormSubmission(formId, formType, success = true) {
    this.trackEvent('form', success ? 'submit_success' : 'submit_error', formType, null);
    
    if (success) {
      this.trackEvent('conversion', 'form_submission', formType);
    }
  }

  /**
   * Track modal open/close
   * @param {string} modalId
   * @param {string} action - 'open' or 'close'
   */
  trackModal(modalId, action) {
    this.trackEvent('modal', action, modalId);
  }

  /**
   * Track slider interaction
   * @param {string} sliderId
   * @param {string} action - 'slide' or 'navigation'
   * @param {number} slideIndex
   */
  trackSlider(sliderId, action, slideIndex = null) {
    this.trackEvent('slider', action, sliderId, slideIndex);
  }

  /**
   * Track chat interaction
   * @param {string} action - 'open', 'send_message', 'close'
   * @param {string} messageType - 'user' or 'ai'
   */
  trackChat(action, messageType = null) {
    this.trackEvent('chat', action, messageType);
  }

  /**
   * Track authentication
   * @param {string} action - 'login', 'logout', 'signup'
   * @param {string} method - 'email', 'social'
   */
  trackAuth(action, method = null) {
    this.trackEvent('auth', action, method);
  }

  /**
   * Track social media click
   * @param {string} platform
   * @param {string} action - 'click', 'share'
   */
  trackSocial(platform, action = 'click') {
    this.trackEvent('social', action, platform);
  }

  /**
   * Track download
   * @param {string} fileName
   * @param {string} fileType
   */
  trackDownload(fileName, fileType) {
    this.trackEvent('download', 'file', `${fileName}.${fileType}`);
  }

  /**
   * Track external link click
   * @param {string} url
   * @param {string} linkText
   */
  trackExternalLink(url, linkText) {
    this.trackEvent('external_link', 'click', linkText);
  }

  /**
   * Track scroll depth
   * @param {number} percentage
   */
  trackScrollDepth(percentage) {
    // Only track significant scroll depths
    const milestones = [25, 50, 75, 90, 100];
    if (milestones.includes(percentage)) {
      this.trackEvent('engagement', 'scroll', `${percentage}%`);
    }
  }

  /**
   * Track time on page
   * @param {number} seconds
   */
  trackTimeOnPage(seconds) {
    // Track time milestones
    const milestones = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m
    if (milestones.includes(seconds)) {
      this.trackEvent('engagement', 'time_on_page', `${seconds}s`);
    }
  }

  /**
   * Track search query
   * @param {string} query
   * @param {number} resultCount
   */
  trackSearch(query, resultCount = null) {
    this.trackEvent('search', 'query', query, resultCount);
  }

  /**
   * Track error
   * @param {string} errorType
   * @param {string} errorMessage
   * @param {string} location
   */
  trackError(errorType, errorMessage, location = null) {
    this.trackEvent('error', errorType, errorMessage, null);
    
    // Additional error tracking
    this.trackEvent('technical', 'error', location || window.location.pathname);
  }

  /**
   * Set user ID
   * @param {string} userId
   */
  setUserId(userId) {
    this.userId = userId;
    console.log('Analytics: User ID set', userId);
  }

  /**
   * Track user property
   * @param {string} property
   * @param {any} value
   */
  setUserProperty(property, value) {
    this.trackEvent('user', 'property_set', property);
    
    // Store user properties in localStorage for demo
    const userProperties = StorageUtils.getItem('analytics_user_properties', {});
    userProperties[property] = value;
    StorageUtils.setItem('analytics_user_properties', userProperties);
  }

  /**
   * Track conversion
   * @param {string} conversionType
   * @param {number} value
   * @param {string} currency
   */
  trackConversion(conversionType, value = null, currency = 'TRY') {
    this.trackEvent('conversion', conversionType, currency, value);
  }

  /**
   * Get analytics data
   * @returns {object}
   */
  getAnalyticsData() {
    return {
      events: this.events,
      sessionId: this.sessionId,
      userId: this.userId,
      pageViews: this.pageViews,
      totalEvents: this.events.length,
      sessionStart: this.events[0]?.timestamp,
      lastActivity: this.events[this.events.length - 1]?.timestamp
    };
  }

  /**
   * Get event statistics
   * @returns {object}
   */
  getEventStats() {
    const stats = {
      total: this.events.length,
      byType: {},
      byCategory: {},
      byAction: {},
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    };

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    this.events.forEach(event => {
      const eventDate = new Date(event.timestamp);
      
      // Count by type
      stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
      
      // Count by category (for events)
      if (event.category) {
        stats.byCategory[event.category] = (stats.byCategory[event.category] || 0) + 1;
      }
      
      // Count by action (for events)
      if (event.action) {
        stats.byAction[event.action] = (stats.byAction[event.action] || 0) + 1;
      }
      
      // Count by time period
      if (eventDate.toDateString() === today.toDateString()) {
        stats.today++;
      }
      if (eventDate > weekAgo) {
        stats.thisWeek++;
      }
      if (eventDate > monthAgo) {
        stats.thisMonth++;
      }
    });

    return stats;
  }

  /**
   * Clear analytics data
   */
  clearData() {
    this.events = [];
    this.pageViews = 0;
    this.sessionId = this.generateSessionId();
    console.log('Analytics: Data cleared');
  }

  /**
   * Generate session ID
   * @returns {string}
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track performance metrics
   * @param {object} metrics
   */
  trackPerformance(metrics) {
    Object.entries(metrics).forEach(([metric, value]) => {
      this.trackEvent('performance', metric, null, value);
    });
  }

  /**
   * Track user engagement
   * @param {string} engagementType
   * @param {object} data
   */
  trackEngagement(engagementType, data = {}) {
    this.trackEvent('engagement', engagementType, JSON.stringify(data));
  }

  /**
   * Export analytics data
   * @returns {string}
   */
  exportData() {
    const analyticsData = this.getAnalyticsData();
    return JSON.stringify(analyticsData, null, 2);
  }

  /**
   * Track heatmap data (mock)
   * @param {number} x
   * @param {number} y
   * @param {string} element
   */
  trackHeatmap(x, y, element) {
    // In real implementation, this would send to heatmap service
    console.log('Analytics: Heatmap data', { x, y, element });
  }

  /**
   * Track user journey
   * @param {string} step
   * @param {object} data
   */
  trackUserJourney(step, data = {}) {
    this.trackEvent('journey', step, JSON.stringify(data));
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

// Export for use in other modules
export { AnalyticsService };
export default analyticsService;
