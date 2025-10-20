/**
 * Storage Utility Module
 * Provides safe localStorage/sessionStorage wrappers with error handling
 */

class StorageManager {
  constructor(storageType = 'localStorage') {
    this.storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
    this.isAvailable = this.checkAvailability();
  }

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  checkAvailability() {
    try {
      const testKey = '__storage_test__';
      this.storage.setItem(testKey, 'test');
      this.storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Set item in storage
   * @param {string} key
   * @param {any} value
   * @returns {boolean}
   */
  setItem(key, value) {
    if (!this.isAvailable) {
      console.warn('Storage not available');
      return false;
    }

    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
      return true;
    } catch (e) {
      console.error('Error setting storage item:', e);
      return false;
    }
  }

  /**
   * Get item from storage
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  getItem(key, defaultValue = null) {
    if (!this.isAvailable) {
      return defaultValue;
    }

    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (e) {
      console.error('Error getting storage item:', e);
      return defaultValue;
    }
  }

  /**
   * Remove item from storage
   * @param {string} key
   * @returns {boolean}
   */
  removeItem(key) {
    if (!this.isAvailable) {
      return false;
    }

    try {
      this.storage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing storage item:', e);
      return false;
    }
  }

  /**
   * Clear all items from storage
   * @returns {boolean}
   */
  clear() {
    if (!this.isAvailable) {
      return false;
    }

    try {
      this.storage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing storage:', e);
      return false;
    }
  }

  /**
   * Get all keys from storage
   * @returns {string[]}
   */
  getKeys() {
    if (!this.isAvailable) {
      return [];
    }

    try {
      return Object.keys(this.storage);
    } catch (e) {
      console.error('Error getting storage keys:', e);
      return [];
    }
  }

  /**
   * Check if key exists in storage
   * @param {string} key
   * @returns {boolean}
   */
  hasItem(key) {
    if (!this.isAvailable) {
      return false;
    }

    return this.storage.getItem(key) !== null;
  }

  /**
   * Get storage size in bytes (approximate)
   * @returns {number}
   */
  getSize() {
    if (!this.isAvailable) {
      return 0;
    }

    try {
      let size = 0;
      for (let key in this.storage) {
        if (this.storage.hasOwnProperty(key)) {
          size += this.storage[key].length + key.length;
        }
      }
      return size;
    } catch (e) {
      console.error('Error calculating storage size:', e);
      return 0;
    }
  }
}

// Create instances
const localStorage = new StorageManager('localStorage');
const sessionStorage = new StorageManager('sessionStorage');

// Specific utility functions
const StorageUtils = {
  /**
   * Store user data
   * @param {object} userData
   */
  setUser(userData) {
    return localStorage.setItem('user', userData);
  },

  /**
   * Get user data
   * @returns {object|null}
   */
  getUser() {
    return localStorage.getItem('user');
  },

  /**
   * Clear user data
   */
  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  },

  /**
   * Store auth token
   * @param {string} token
   */
  setAuthToken(token) {
    return localStorage.setItem('auth_token', token);
  },

  /**
   * Get auth token
   * @returns {string|null}
   */
  getAuthToken() {
    return localStorage.getItem('auth_token');
  },

  /**
   * Store chat history
   * @param {array} messages
   */
  setChatHistory(messages) {
    return localStorage.setItem('chat_history', messages);
  },

  /**
   * Get chat history
   * @returns {array}
   */
  getChatHistory() {
    return localStorage.getItem('chat_history', []);
  },

  /**
   * Clear chat history
   */
  clearChatHistory() {
    localStorage.removeItem('chat_history');
  },

  /**
   * Store guest message count
   * @param {number} count
   */
  setGuestMessageCount(count) {
    return sessionStorage.setItem('guest_message_count', count);
  },

  /**
   * Get guest message count
   * @returns {number}
   */
  getGuestMessageCount() {
    return sessionStorage.getItem('guest_message_count', 0);
  },

  /**
   * Clear guest message count
   */
  clearGuestMessageCount() {
    sessionStorage.removeItem('guest_message_count');
  },

  /**
   * Store app preferences
   * @param {object} preferences
   */
  setPreferences(preferences) {
    return localStorage.setItem('app_preferences', preferences);
  },

  /**
   * Get app preferences
   * @returns {object}
   */
  getPreferences() {
    return localStorage.getItem('app_preferences', {
      theme: 'light',
      language: 'tr',
      notifications: true
    });
  },

  /**
   * Store temporary data
   * @param {string} key
   * @param {any} data
   */
  setTemp(key, data) {
    return sessionStorage.setItem(`temp_${key}`, data);
  },

  /**
   * Get temporary data
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  getTemp(key, defaultValue = null) {
    return sessionStorage.getItem(`temp_${key}`, defaultValue);
  },

  /**
   * Clear temporary data
   * @param {string} key
   */
  clearTemp(key) {
    sessionStorage.removeItem(`temp_${key}`);
  },

  /**
   * Store form data
   * @param {string} formId
   * @param {object} formData
   */
  saveFormData(formId, formData) {
    return localStorage.setItem(`form_${formId}`, formData);
  },

  /**
   * Get form data
   * @param {string} formId
   * @returns {object|null}
   */
  getFormData(formId) {
    return localStorage.getItem(`form_${formId}`);
  },

  /**
   * Clear form data
   * @param {string} formId
   */
  clearFormData(formId) {
    localStorage.removeItem(`form_${formId}`);
  }
};

// Export for use in other modules
export { localStorage, sessionStorage, StorageUtils };
export default StorageUtils;
