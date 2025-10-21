/**
 * Storage Utility Module
 * Provides safe localStorage/sessionStorage wrappers with error handling
 */

class StorageManager {
  constructor(storageType = 'localStorage') {
    this.storageType = storageType === 'sessionStorage' ? 'sessionStorage' : 'localStorage';
    this._inMemory = Object.create(null);
    this.isAvailable = this.checkAvailability();
  }

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  checkAvailability() {
    try {
      // Ensure window and corresponding storage exist
      if (typeof window === 'undefined') return false;
      const storageObj = this._getStorageObject();
      if (!storageObj) return false;
      const testKey = '__storage_test__';
      storageObj.setItem(testKey, 'test');
      storageObj.removeItem(testKey);
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
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      const storageObj = this._getStorageObject();
      if (storageObj) {
        storageObj.setItem(key, serializedValue);
        return true;
      }

      // Fallback to in-memory store
      this._inMemory[key] = serializedValue;
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
    try {
      const storageObj = this._getStorageObject();
      let item = null;
      if (storageObj) {
        item = storageObj.getItem(key);
      } else if (Object.prototype.hasOwnProperty.call(this._inMemory, key)) {
        item = this._inMemory[key];
      }

      if (item === null || typeof item === 'undefined') {
        return defaultValue;
      }

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item);
      } catch (err) {
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
    try {
      const storageObj = this._getStorageObject();
      if (storageObj) {
        storageObj.removeItem(key);
        return true;
      }

      if (Object.prototype.hasOwnProperty.call(this._inMemory, key)) {
        delete this._inMemory[key];
        return true;
      }

      return false;
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
    try {
      const storageObj = this._getStorageObject();
      if (storageObj) {
        storageObj.clear();
        return true;
      }

      this._inMemory = Object.create(null);
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
    try {
      const storageObj = this._getStorageObject();
      if (storageObj) {
        return Object.keys(storageObj);
      }

      return Object.keys(this._inMemory);
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
    try {
      const storageObj = this._getStorageObject();
      if (storageObj) {
        return storageObj.getItem(key) !== null;
      }

      return Object.prototype.hasOwnProperty.call(this._inMemory, key);
    } catch (e) {
      console.error('Error checking storage item:', e);
      return false;
    }
  }

  /**
   * Get storage size in bytes (approximate)
   * @returns {number}
   */
  getSize() {
    try {
      const storageObj = this._getStorageObject();
      let size = 0;
      if (storageObj) {
        for (let key in storageObj) {
          if (Object.prototype.hasOwnProperty.call(storageObj, key)) {
            size += storageObj[key].length + key.length;
          }
        }
      } else {
        for (let key in this._inMemory) {
          if (Object.prototype.hasOwnProperty.call(this._inMemory, key)) {
            size += this._inMemory[key].length + key.length;
          }
        }
      }
      return size;
    } catch (e) {
      console.error('Error calculating storage size:', e);
      return 0;
    }
  }

  /**
   * Internal helper to safely get the underlying storage object (window.localStorage/sessionStorage)
   */
  _getStorageObject() {
    try {
      if (typeof window === 'undefined') return null;
      if (this.storageType === 'localStorage' && window.localStorage) return window.localStorage;
      if (this.storageType === 'sessionStorage' && window.sessionStorage) return window.sessionStorage;
      return null;
    } catch (e) {
      return null;
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
