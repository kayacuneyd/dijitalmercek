/**
 * DOM Helper Utilities
 * Collection of utility functions for DOM manipulation
 */

class DOMHelpers {
  /**
   * Create an element with optional classes and content
   * @param {string} tag - HTML tag name
   * @param {string|string[]} classes - CSS classes
   * @param {string|HTMLElement} content - Element content
   * @param {object} attributes - HTML attributes
   * @returns {HTMLElement}
   */
  static createElement(tag, classes = '', content = '', attributes = {}) {
    const element = document.createElement(tag);
    
    // Add classes
    if (classes) {
      const classList = Array.isArray(classes) ? classes : classes.split(' ');
      element.classList.add(...classList);
    }
    
    // Add content
    if (content) {
      if (typeof content === 'string') {
        element.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        element.appendChild(content);
      }
    }
    
    // Add attributes
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    return element;
  }

  /**
   * Toggle class on element
   * @param {HTMLElement} element
   * @param {string} className
   * @param {boolean} force - Force add/remove
   */
  static toggleClass(element, className, force = null) {
    if (element && className) {
      element.classList.toggle(className, force);
    }
  }

  /**
   * Add multiple classes to element
   * @param {HTMLElement} element
   * @param {string|string[]} classes
   */
  static addClasses(element, classes) {
    if (element && classes) {
      const classList = Array.isArray(classes) ? classes : classes.split(' ');
      element.classList.add(...classList);
    }
  }

  /**
   * Remove multiple classes from element
   * @param {HTMLElement} element
   * @param {string|string[]} classes
   */
  static removeClasses(element, classes) {
    if (element && classes) {
      const classList = Array.isArray(classes) ? classes : classes.split(' ');
      element.classList.remove(...classList);
    }
  }

  /**
   * Check if element has class
   * @param {HTMLElement} element
   * @param {string} className
   * @returns {boolean}
   */
  static hasClass(element, className) {
    return element && element.classList.contains(className);
  }

  /**
   * Find element by selector
   * @param {string} selector
   * @param {HTMLElement} context - Search context
   * @returns {HTMLElement|null}
   */
  static find(selector, context = document) {
    return context.querySelector(selector);
  }

  /**
   * Find all elements by selector
   * @param {string} selector
   * @param {HTMLElement} context - Search context
   * @returns {NodeList}
   */
  static findAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  /**
   * Get element by ID
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  static getById(id) {
    return document.getElementById(id);
  }

  /**
   * Get elements by class name
   * @param {string} className
   * @param {HTMLElement} context - Search context
   * @returns {HTMLCollection}
   */
  static getByClass(className, context = document) {
    return context.getElementsByClassName(className);
  }

  /**
   * Show element
   * @param {HTMLElement} element
   */
  static show(element) {
    if (element) {
      element.style.display = '';
      element.removeAttribute('hidden');
    }
  }

  /**
   * Hide element
   * @param {HTMLElement} element
   */
  static hide(element) {
    if (element) {
      element.style.display = 'none';
      element.setAttribute('hidden', '');
    }
  }

  /**
   * Toggle element visibility
   * @param {HTMLElement} element
   */
  static toggleVisibility(element) {
    if (element) {
      if (element.style.display === 'none' || element.hasAttribute('hidden')) {
        this.show(element);
      } else {
        this.hide(element);
      }
    }
  }

  /**
   * Add event listener with automatic cleanup
   * @param {HTMLElement} element
   * @param {string} event
   * @param {function} handler
   * @param {object} options
   * @returns {function} Cleanup function
   */
  static addEventListener(element, event, handler, options = {}) {
    if (element && typeof handler === 'function') {
      element.addEventListener(event, handler, options);
      
      // Return cleanup function
      return () => {
        element.removeEventListener(event, handler, options);
      };
    }
    return () => {};
  }

  /**
   * Remove event listener
   * @param {HTMLElement} element
   * @param {string} event
   * @param {function} handler
   */
  static removeEventListener(element, event, handler) {
    if (element && typeof handler === 'function') {
      element.removeEventListener(event, handler);
    }
  }

  /**
   * Add click event listener
   * @param {HTMLElement} element
   * @param {function} handler
   * @returns {function} Cleanup function
   */
  static onClick(element, handler) {
    return this.addEventListener(element, 'click', handler);
  }

  /**
   * Add scroll event listener with throttling
   * @param {HTMLElement} element
   * @param {function} handler
   * @param {number} throttle - Throttle delay in ms
   * @returns {function} Cleanup function
   */
  static onScroll(element, handler, throttle = 100) {
    const throttledHandler = this.throttle(handler, throttle);
    return this.addEventListener(element, 'scroll', throttledHandler);
  }

  /**
   * Add resize event listener with throttling
   * @param {HTMLElement} element
   * @param {function} handler
   * @param {number} throttle - Throttle delay in ms
   * @returns {function} Cleanup function
   */
  static onResize(element, handler, throttle = 100) {
    const throttledHandler = this.throttle(handler, throttle);
    return this.addEventListener(element, 'resize', throttledHandler);
  }

  /**
   * Debounce function
   * @param {function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @param {boolean} immediate - Execute immediately on first call
   * @returns {function} Debounced function
   */
  static debounce(func, delay, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
      if (callNow) func.apply(this, args);
    };
  }

  /**
   * Throttle function
   * @param {function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Wait for element to exist in DOM
   * @param {string} selector
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<HTMLElement>}
   */
  static waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = this.find(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = this.find(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element
   * @param {number} threshold - Visibility threshold (0-1)
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return vertInView && horInView;
  }

  /**
   * Scroll element into view
   * @param {HTMLElement} element
   * @param {object} options - Scroll options
   */
  static scrollIntoView(element, options = {}) {
    if (element && element.scrollIntoView) {
      const defaultOptions = {
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      };
      element.scrollIntoView({ ...defaultOptions, ...options });
    }
  }

  /**
   * Get element position relative to document
   * @param {HTMLElement} element
   * @returns {object} Position object with top, left, width, height
   */
  static getPosition(element) {
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height
    };
  }

  /**
   * Clone element
   * @param {HTMLElement} element
   * @param {boolean} deep - Deep clone
   * @returns {HTMLElement}
   */
  static clone(element, deep = true) {
    return element ? element.cloneNode(deep) : null;
  }

  /**
   * Remove element from DOM
   * @param {HTMLElement} element
   */
  static remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Insert element after another element
   * @param {HTMLElement} newElement
   * @param {HTMLElement} existingElement
   */
  static insertAfter(newElement, existingElement) {
    if (newElement && existingElement && existingElement.parentNode) {
      existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
    }
  }

  /**
   * Get computed style value
   * @param {HTMLElement} element
   * @param {string} property
   * @returns {string}
   */
  static getStyle(element, property) {
    if (element && window.getComputedStyle) {
      return window.getComputedStyle(element).getPropertyValue(property);
    }
    return '';
  }

  /**
   * Set element style
   * @param {HTMLElement} element
   * @param {object} styles - Style object
   */
  static setStyle(element, styles) {
    if (element && styles) {
      Object.entries(styles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    }
  }
}

// Export for use in other modules
export default DOMHelpers;
