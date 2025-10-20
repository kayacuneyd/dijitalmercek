/**
 * API Client Utility
 * Provides fetch wrapper with error handling, loading states, and interceptors
 */

class APIClient {
  constructor(baseURL = '', options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    this.interceptors = {
      request: [],
      response: []
    };
  }

  /**
   * Add request interceptor
   * @param {function} interceptor
   */
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  /**
   * Add response interceptor
   * @param {function} interceptor
   */
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  /**
   * Execute request interceptors
   * @param {object} config
   * @returns {object}
   */
  async executeRequestInterceptors(config) {
    let modifiedConfig = { ...config };
    
    for (const interceptor of this.interceptors.request) {
      if (typeof interceptor === 'function') {
        modifiedConfig = await interceptor(modifiedConfig);
      }
    }
    
    return modifiedConfig;
  }

  /**
   * Execute response interceptors
   * @param {Response} response
   * @returns {Response}
   */
  async executeResponseInterceptors(response) {
    let modifiedResponse = response;
    
    for (const interceptor of this.interceptors.response) {
      if (typeof interceptor === 'function') {
        modifiedResponse = await interceptor(modifiedResponse);
      }
    }
    
    return modifiedResponse;
  }

  /**
   * Create timeout promise
   * @param {number} timeout
   * @returns {Promise}
   */
  createTimeoutPromise(timeout) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Build URL with query parameters
   * @param {string} url
   * @param {object} params
   * @returns {string}
   */
  buildURL(url, params = {}) {
    const fullURL = this.baseURL ? `${this.baseURL}${url}` : url;
    
    if (Object.keys(params).length === 0) {
      return fullURL;
    }
    
    const urlObj = new URL(fullURL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        urlObj.searchParams.append(key, value);
      }
    });
    
    return urlObj.toString();
  }

  /**
   * Make HTTP request
   * @param {string} url
   * @param {object} options
   * @returns {Promise}
   */
  async request(url, options = {}) {
    try {
      // Merge options with defaults
      const config = {
        ...this.defaultOptions,
        ...options,
        headers: {
          ...this.defaultOptions.headers,
          ...options.headers
        }
      };

      // Execute request interceptors
      const modifiedConfig = await this.executeRequestInterceptors(config);
      
      // Build full URL
      const fullURL = this.buildURL(url, modifiedConfig.params);
      
      // Create request options
      const requestOptions = {
        method: modifiedConfig.method || 'GET',
        headers: modifiedConfig.headers,
        body: modifiedConfig.body,
        ...modifiedConfig
      };
      
      // Remove custom options
      delete requestOptions.timeout;
      delete requestOptions.params;
      
      // Create timeout promise if timeout is specified
      const timeoutPromise = modifiedConfig.timeout 
        ? this.createTimeoutPromise(modifiedConfig.timeout)
        : null;
      
      // Make request with optional timeout
      const response = timeoutPromise
        ? await Promise.race([
            fetch(fullURL, requestOptions),
            timeoutPromise
          ])
        : await fetch(fullURL, requestOptions);
      
      // Execute response interceptors
      const modifiedResponse = await this.executeResponseInterceptors(response);
      
      // Check if response is ok
      if (!modifiedResponse.ok) {
        throw new Error(`HTTP ${modifiedResponse.status}: ${modifiedResponse.statusText}`);
      }
      
      // Parse response based on content type
      const contentType = modifiedResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await modifiedResponse.json();
      } else if (contentType && contentType.includes('text/')) {
        return await modifiedResponse.text();
      } else {
        return modifiedResponse;
      }
      
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} url
   * @param {object} params
   * @param {object} options
   * @returns {Promise}
   */
  get(url, params = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'GET',
      params
    });
  }

  /**
   * POST request
   * @param {string} url
   * @param {object} data
   * @param {object} options
   * @returns {Promise}
   */
  post(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   * @param {string} url
   * @param {object} data
   * @param {object} options
   * @returns {Promise}
   */
  put(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * PATCH request
   * @param {string} url
   * @param {object} data
   * @param {object} options
   * @returns {Promise}
   */
  patch(url, data = {}, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   * @param {string} url
   * @param {object} options
   * @returns {Promise}
   */
  delete(url, options = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE'
    });
  }

  /**
   * Upload file
   * @param {string} url
   * @param {FormData} formData
   * @param {object} options
   * @returns {Promise}
   */
  upload(url, formData, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type header to let browser set it with boundary
        ...this.defaultOptions.headers,
        ...options.headers
      }
    });
  }
}

/**
 * Create API client instance with default configuration
 */
const createAPIClient = (baseURL = '', options = {}) => {
  const client = new APIClient(baseURL, options);
  
  // Add default request interceptor for auth token
  client.addRequestInterceptor((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Add default response interceptor for error handling
  client.addResponseInterceptor(async (response) => {
    if (response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Redirect to login or show auth modal
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return response;
  });
  
  return client;
};

/**
 * Utility functions for common API operations
 */
const APIUtils = {
  /**
   * Fetch JSON data with error handling
   * @param {string} url
   * @param {object} options
   * @returns {Promise}
   */
  async fetchJSON(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch JSON Error:', error);
      throw error;
    }
  },

  /**
   * Post JSON data
   * @param {string} url
   * @param {object} data
   * @param {object} options
   * @returns {Promise}
   */
  async postJSON(url, data, options = {}) {
    return this.fetchJSON(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Handle API errors consistently
   * @param {Error} error
   * @returns {object}
   */
  handleError(error) {
    console.error('API Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        type: 'network',
        message: 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.',
        original: error
      };
    }
    
    if (error.message.includes('timeout')) {
      return {
        type: 'timeout',
        message: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
        original: error
      };
    }
    
    if (error.message.includes('HTTP 401')) {
      return {
        type: 'unauthorized',
        message: 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.',
        original: error
      };
    }
    
    if (error.message.includes('HTTP 403')) {
      return {
        type: 'forbidden',
        message: 'Bu işlem için yetkiniz bulunmuyor.',
        original: error
      };
    }
    
    if (error.message.includes('HTTP 404')) {
      return {
        type: 'not_found',
        message: 'İstenen kaynak bulunamadı.',
        original: error
      };
    }
    
    if (error.message.includes('HTTP 500')) {
      return {
        type: 'server_error',
        message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
        original: error
      };
    }
    
    return {
      type: 'unknown',
      message: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
      original: error
    };
  },

  /**
   * Retry failed requests
   * @param {function} requestFn
   * @param {number} maxRetries
   * @param {number} delay
   * @returns {Promise}
   */
  async retry(requestFn, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        
        // Don't retry on certain error types
        if (error.message.includes('HTTP 401') || 
            error.message.includes('HTTP 403') ||
            error.message.includes('HTTP 404')) {
          break;
        }
        
        // Wait before retrying
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError;
  }
};

// Create default API client instance
const apiClient = createAPIClient();

// Export for use in other modules
export { APIClient, createAPIClient, APIUtils, apiClient };
export default apiClient;
