/**
 * Mock Clerk Authentication Service
 * Provides authentication functionality with localStorage-based mock implementation
 */

import { StorageUtils } from '../utils/storage.js';

class ClerkAuthService {
  constructor() {
    this.currentUser = null;
    this.isInitialized = false;
    this.authStateListeners = [];
    this.mockUsers = [
      {
        id: 'user_123',
        email: 'demo@example.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        imageUrl: 'assets/images/demo-avatar.jpg',
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString()
      }
    ];
    
    this.init();
  }

  /**
   * Initialize the auth service
   */
  init() {
    // Check for existing session
    const storedUser = StorageUtils.getUser();
    const storedToken = StorageUtils.getAuthToken();
    
    if (storedUser && storedToken) {
      this.currentUser = storedUser;
      this.notifyAuthStateChange();
    }
    
    this.isInitialized = true;
    console.log('Clerk Auth Service: Initialized (Mock)');
  }

  /**
   * Sign in with email and password
   * @param {object} credentials
   * @returns {Promise<object>}
   */
  async signIn(credentials) {
    try {
      const { email, password } = credentials;
      
      // Simulate network delay
      await this.delay(1000);
      
      // Find user in mock data
      const user = this.mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Geçersiz e-posta veya şifre');
      }
      
      // Generate mock token
      const token = this.generateMockToken(user.id);
      
      // Update user data
      const userData = {
        ...user,
        lastSignIn: new Date().toISOString()
      };
      
      // Store in localStorage
      StorageUtils.setUser(userData);
      StorageUtils.setAuthToken(token);
      
      this.currentUser = userData;
      this.notifyAuthStateChange();
      
      console.log('Clerk Auth: User signed in successfully', userData);
      
      return {
        user: userData,
        token,
        success: true
      };
      
    } catch (error) {
      console.error('Clerk Auth: Sign in error', error);
      throw error;
    }
  }

  /**
   * Sign up with email and password
   * @param {object} userData
   * @returns {Promise<object>}
   */
  async signUp(userData) {
    try {
      const { email, password, firstName, lastName } = userData;
      
      // Simulate network delay
      await this.delay(1500);
      
      // Check if user already exists
      const existingUser = this.mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Bu e-posta adresi zaten kullanımda');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password,
        firstName,
        lastName,
        imageUrl: null,
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString()
      };
      
      // Add to mock users (in real app, this would be sent to server)
      this.mockUsers.push(newUser);
      
      // Generate token and sign in
      const token = this.generateMockToken(newUser.id);
      
      // Store in localStorage
      StorageUtils.setUser(newUser);
      StorageUtils.setAuthToken(token);
      
      this.currentUser = newUser;
      this.notifyAuthStateChange();
      
      console.log('Clerk Auth: User signed up successfully', newUser);
      
      return {
        user: newUser,
        token,
        success: true
      };
      
    } catch (error) {
      console.error('Clerk Auth: Sign up error', error);
      throw error;
    }
  }

  /**
   * Sign out current user
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      // Simulate network delay
      await this.delay(500);
      
      // Clear stored data
      StorageUtils.clearUser();
      
      this.currentUser = null;
      this.notifyAuthStateChange();
      
      console.log('Clerk Auth: User signed out successfully');
      
    } catch (error) {
      console.error('Clerk Auth: Sign out error', error);
      throw error;
    }
  }

  /**
   * Get current user
   * @returns {object|null}
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Get auth token
   * @returns {string|null}
   */
  getToken() {
    return StorageUtils.getAuthToken();
  }

  /**
   * Update user profile
   * @param {object} updates
   * @returns {Promise<object>}
   */
  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('Kullanıcı giriş yapmamış');
      }
      
      // Simulate network delay
      await this.delay(800);
      
      // Update user data
      const updatedUser = {
        ...this.currentUser,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Update in mock users array
      const userIndex = this.mockUsers.findIndex(u => u.id === this.currentUser.id);
      if (userIndex !== -1) {
        this.mockUsers[userIndex] = updatedUser;
      }
      
      // Update stored data
      StorageUtils.setUser(updatedUser);
      
      this.currentUser = updatedUser;
      this.notifyAuthStateChange();
      
      console.log('Clerk Auth: Profile updated successfully', updatedUser);
      
      return updatedUser;
      
    } catch (error) {
      console.error('Clerk Auth: Profile update error', error);
      throw error;
    }
  }

  /**
   * Reset password
   * @param {string} email
   * @returns {Promise<void>}
   */
  async resetPassword(email) {
    try {
      // Simulate network delay
      await this.delay(2000);
      
      // Check if user exists
      const user = this.mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı');
      }
      
      console.log('Clerk Auth: Password reset email sent to', email);
      
      // In real app, this would send an email
      return {
        success: true,
        message: 'Şifre sıfırlama e-postası gönderildi'
      };
      
    } catch (error) {
      console.error('Clerk Auth: Password reset error', error);
      throw error;
    }
  }

  /**
   * Add auth state change listener
   * @param {function} listener
   */
  addAuthStateListener(listener) {
    if (typeof listener === 'function') {
      this.authStateListeners.push(listener);
    }
  }

  /**
   * Remove auth state change listener
   * @param {function} listener
   */
  removeAuthStateListener(listener) {
    const index = this.authStateListeners.indexOf(listener);
    if (index > -1) {
      this.authStateListeners.splice(index, 1);
    }
  }

  /**
   * Notify all auth state listeners
   */
  notifyAuthStateChange() {
    this.authStateListeners.forEach(listener => {
      try {
        listener(this.currentUser);
      } catch (error) {
        console.error('Clerk Auth: Error in auth state listener', error);
      }
    });
  }

  /**
   * Generate mock JWT token
   * @param {string} userId
   * @returns {string}
   */
  generateMockToken(userId) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }));
    const signature = btoa('mock_signature');
    
    return `${header}.${payload}.${signature}`;
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
   * Get user session info
   * @returns {object}
   */
  getSession() {
    if (!this.currentUser) {
      return null;
    }
    
    return {
      user: this.currentUser,
      token: this.getToken(),
      isAuthenticated: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    };
  }

  /**
   * Check if token is expired
   * @returns {boolean}
   */
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }

  /**
   * Refresh token (mock implementation)
   * @returns {Promise<object>}
   */
  async refreshToken() {
    if (!this.currentUser) {
      throw new Error('Kullanıcı giriş yapmamış');
    }
    
    const newToken = this.generateMockToken(this.currentUser.id);
    StorageUtils.setAuthToken(newToken);
    
    return {
      token: newToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }
}

// Create singleton instance
const clerkAuthService = new ClerkAuthService();

// Export for use in other modules
export { ClerkAuthService };
export default clerkAuthService;
