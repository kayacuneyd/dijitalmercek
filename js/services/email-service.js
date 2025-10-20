/**
 * Mock Email Service
 * Provides email functionality with EmailJS integration (mock implementation)
 */

import { StorageUtils } from '../utils/storage.js';

class EmailService {
  constructor() {
    this.isInitialized = false;
    this.serviceId = null;
    this.templateId = null;
    this.publicKey = null;
    this.emailQueue = [];
    
    this.init();
  }

  /**
   * Initialize the service
   */
  init() {
    // In real implementation, these would come from environment variables
    this.serviceId = 'service_mock';
    this.templateId = 'template_mock';
    this.publicKey = 'public_key_mock';
    
    this.isInitialized = true;
    console.log('Email Service: Initialized (Mock)');
  }

  /**
   * Send chat transcript via email
   * @param {object} conversationData
   * @returns {Promise<object>}
   */
  async sendChatTranscript(conversationData) {
    try {
      // Simulate network delay
      await this.delay(1500);
      
      const emailData = {
        to: conversationData.userEmail || 'demo@example.com',
        subject: 'Sohbet Geçmişi - Web Geliştirme Danışmanlığı',
        conversation: conversationData.messages,
        timestamp: new Date().toISOString(),
        userInfo: conversationData.userInfo || {}
      };
      
      // Log the email payload (in real app, this would be sent via EmailJS)
      console.log('Email Service: Chat transcript email payload:', emailData);
      
      // Store in email queue for demo purposes
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'chat_transcript',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Chat transcript sent successfully');
      
      return {
        success: true,
        message: 'Sohbet geçmişi e-postanıza gönderildi',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error sending chat transcript', error);
      throw error;
    }
  }

  /**
   * Send quote request email
   * @param {object} quoteData
   * @returns {Promise<object>}
   */
  async sendQuoteRequest(quoteData) {
    try {
      // Simulate network delay
      await this.delay(2000);
      
      const emailData = {
        to: 'info@example.com', // Developer's email
        subject: `Teklif Talebi - ${quoteData.projectType || 'Web Geliştirme'}`,
        from: quoteData.email,
        name: quoteData.name,
        phone: quoteData.phone,
        projectType: quoteData.projectType,
        budget: quoteData.budget,
        timeline: quoteData.timeline,
        description: quoteData.description,
        requirements: quoteData.requirements,
        timestamp: new Date().toISOString()
      };
      
      // Log the email payload
      console.log('Email Service: Quote request email payload:', emailData);
      
      // Store in email queue
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'quote_request',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Quote request sent successfully');
      
      return {
        success: true,
        message: 'Teklif talebiniz başarıyla gönderildi. 24 saat içinde size dönüş yapacağım.',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error sending quote request', error);
      throw error;
    }
  }

  /**
   * Send contact form email
   * @param {object} contactData
   * @returns {Promise<object>}
   */
  async sendContactForm(contactData) {
    try {
      // Simulate network delay
      await this.delay(1200);
      
      const emailData = {
        to: 'info@example.com',
        subject: `İletişim Formu - ${contactData.subject || 'Genel İletişim'}`,
        from: contactData.email,
        name: contactData.name,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message,
        timestamp: new Date().toISOString()
      };
      
      // Log the email payload
      console.log('Email Service: Contact form email payload:', emailData);
      
      // Store in email queue
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'contact_form',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Contact form sent successfully');
      
      return {
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error sending contact form', error);
      throw error;
    }
  }

  /**
   * Send project inquiry email
   * @param {object} inquiryData
   * @returns {Promise<object>}
   */
  async sendProjectInquiry(inquiryData) {
    try {
      // Simulate network delay
      await this.delay(1800);
      
      const emailData = {
        to: 'info@example.com',
        subject: `Proje İletişimi - ${inquiryData.projectName || 'Yeni Proje'}`,
        from: inquiryData.email,
        name: inquiryData.name,
        company: inquiryData.company,
        phone: inquiryData.phone,
        projectName: inquiryData.projectName,
        projectType: inquiryData.projectType,
        budget: inquiryData.budget,
        timeline: inquiryData.timeline,
        description: inquiryData.description,
        requirements: inquiryData.requirements,
        timestamp: new Date().toISOString()
      };
      
      // Log the email payload
      console.log('Email Service: Project inquiry email payload:', emailData);
      
      // Store in email queue
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'project_inquiry',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Project inquiry sent successfully');
      
      return {
        success: true,
        message: 'Proje iletişiminiz başarıyla gönderildi. Detaylı teklif için size dönüş yapacağım.',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error sending project inquiry', error);
      throw error;
    }
  }

  /**
   * Send newsletter subscription email
   * @param {string} email
   * @returns {Promise<object>}
   */
  async subscribeNewsletter(email) {
    try {
      // Simulate network delay
      await this.delay(800);
      
      const emailData = {
        to: 'newsletter@example.com',
        subject: 'Yeni Bülten Abonesi',
        subscriberEmail: email,
        timestamp: new Date().toISOString()
      };
      
      // Log the email payload
      console.log('Email Service: Newsletter subscription email payload:', emailData);
      
      // Store in email queue
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'newsletter_subscription',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Newsletter subscription sent successfully');
      
      return {
        success: true,
        message: 'Bülten aboneliğiniz başarıyla oluşturuldu. Teşekkür ederiz!',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error subscribing to newsletter', error);
      throw error;
    }
  }

  /**
   * Send welcome email to new user
   * @param {object} userData
   * @returns {Promise<object>}
   */
  async sendWelcomeEmail(userData) {
    try {
      // Simulate network delay
      await this.delay(1000);
      
      const emailData = {
        to: userData.email,
        subject: 'Hoş Geldiniz - Web Geliştirme Hizmetleri',
        name: userData.firstName || userData.name,
        timestamp: new Date().toISOString()
      };
      
      // Log the email payload
      console.log('Email Service: Welcome email payload:', emailData);
      
      // Store in email queue
      this.emailQueue.push({
        id: this.generateEmailId(),
        type: 'welcome_email',
        data: emailData,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      console.log('Email Service: Welcome email sent successfully');
      
      return {
        success: true,
        message: 'Hoş geldiniz e-postası gönderildi',
        emailId: emailData.id
      };
      
    } catch (error) {
      console.error('Email Service: Error sending welcome email', error);
      throw error;
    }
  }

  /**
   * Get email queue (for demo purposes)
   * @returns {array}
   */
  getEmailQueue() {
    return this.emailQueue;
  }

  /**
   * Clear email queue
   */
  clearEmailQueue() {
    this.emailQueue = [];
    console.log('Email Service: Email queue cleared');
  }

  /**
   * Generate unique email ID
   * @returns {string}
   */
  generateEmailId() {
    return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Format conversation for email
   * @param {array} messages
   * @returns {string}
   */
  formatConversationForEmail(messages) {
    return messages.map(msg => {
      const role = msg.role === 'user' ? 'Kullanıcı' : 'Asistan';
      const time = new Date(msg.timestamp).toLocaleString('tr-TR');
      return `[${time}] ${role}: ${msg.content}`;
    }).join('\n\n');
  }

  /**
   * Create email template data
   * @param {string} type
   * @param {object} data
   * @returns {object}
   */
  createEmailTemplate(type, data) {
    const baseTemplate = {
      from_name: data.name || 'Ziyaretçi',
      from_email: data.email || 'noreply@example.com',
      timestamp: new Date().toISOString(),
      website_url: window.location.origin
    };

    switch (type) {
      case 'chat_transcript':
        return {
          ...baseTemplate,
          to_email: data.userEmail || 'demo@example.com',
          conversation_text: this.formatConversationForEmail(data.messages || []),
          total_messages: data.messages ? data.messages.length : 0
        };

      case 'quote_request':
        return {
          ...baseTemplate,
          project_type: data.projectType || 'Web Geliştirme',
          budget_range: data.budget || 'Belirtilmedi',
          timeline: data.timeline || 'Belirtilmedi',
          project_description: data.description || 'Belirtilmedi',
          requirements: data.requirements || 'Belirtilmedi'
        };

      case 'contact_form':
        return {
          ...baseTemplate,
          subject: data.subject || 'Genel İletişim',
          message: data.message || 'Mesaj içeriği belirtilmedi',
          phone: data.phone || 'Belirtilmedi'
        };

      default:
        return baseTemplate;
    }
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
   * Get email statistics
   * @returns {object}
   */
  getEmailStats() {
    const stats = {
      total: this.emailQueue.length,
      byType: {},
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    };

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    this.emailQueue.forEach(email => {
      const emailDate = new Date(email.timestamp);
      
      // Count by type
      stats.byType[email.type] = (stats.byType[email.type] || 0) + 1;
      
      // Count by time period
      if (emailDate.toDateString() === today.toDateString()) {
        stats.today++;
      }
      if (emailDate > weekAgo) {
        stats.thisWeek++;
      }
      if (emailDate > monthAgo) {
        stats.thisMonth++;
      }
    });

    return stats;
  }
}

// Create singleton instance
const emailService = new EmailService();

// Export for use in other modules
export { EmailService };
export default emailService;
