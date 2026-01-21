/**
 * Donation Form Handler
 * Submits donation data to the HORFI API
 * 
 * @author House of Refuge Foundation, Inc.
 * @version 1.0.0
 */

(function() {
  'use strict';

  // API Configuration
  // Using CORS proxy for development - remove proxy in production when server has CORS enabled
  const API_BASE = 'https://panel.horfi.online/api/donations';
  const CORS_PROXY = 'https://corsproxy.io/?';
  const API_ENDPOINT = CORS_PROXY + encodeURIComponent(API_BASE);

  // Valid donation types
  const VALID_DONATION_TYPES = ['one-time', 'monthly', 'annual', 'in-kind', 'sponsorship'];

  // ===========================================
  // SPAM PROTECTION CONFIGURATION
  // ===========================================
  const SPAM_CONFIG = {
    minSubmitTime: 3000,           // Minimum time (ms) before form can be submitted (3 seconds)
    maxSubmitsPerHour: 3,          // Maximum submissions per hour from same browser
    rateLimitWindow: 3600000,      // Rate limit window in ms (1 hour)
    storageKey: 'donation_submissions' // localStorage key for tracking submissions
  };

  // Track when form was loaded
  let formLoadTime = null;

  /**
   * Check if honeypot field is filled (indicates bot)
   * @param {HTMLFormElement} form - The form element
   * @returns {boolean} True if spam detected
   */
  function isHoneypotFilled(form) {
    const honeypot = form.querySelector('[name="website"]');
    return honeypot && honeypot.value.trim() !== '';
  }

  /**
   * Check if form was submitted too quickly (indicates bot)
   * @returns {boolean} True if submitted too fast
   */
  function isSubmittedTooFast() {
    if (!formLoadTime) return false;
    const elapsed = Date.now() - formLoadTime;
    return elapsed < SPAM_CONFIG.minSubmitTime;
  }

  /**
   * Get submission history from localStorage
   * @returns {Array} Array of submission timestamps
   */
  function getSubmissionHistory() {
    try {
      const data = localStorage.getItem(SPAM_CONFIG.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Save submission timestamp to localStorage
   */
  function recordSubmission() {
    try {
      const history = getSubmissionHistory();
      history.push(Date.now());
      localStorage.setItem(SPAM_CONFIG.storageKey, JSON.stringify(history));
    } catch (e) {
      // localStorage not available, continue anyway
    }
  }

  /**
   * Check if user has exceeded rate limit
   * @returns {boolean} True if rate limited
   */
  function isRateLimited() {
    const history = getSubmissionHistory();
    const now = Date.now();
    const windowStart = now - SPAM_CONFIG.rateLimitWindow;
    
    // Count submissions within the rate limit window
    const recentSubmissions = history.filter(time => time > windowStart);
    
    // Clean up old entries
    if (recentSubmissions.length !== history.length) {
      try {
        localStorage.setItem(SPAM_CONFIG.storageKey, JSON.stringify(recentSubmissions));
      } catch (e) {
        // Ignore storage errors
      }
    }
    
    return recentSubmissions.length >= SPAM_CONFIG.maxSubmitsPerHour;
  }

  /**
   * Perform all spam checks
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} { isSpam: boolean, reason: string }
   */
  function checkForSpam(form) {
    // Check 1: Honeypot field
    if (isHoneypotFilled(form)) {
      console.warn('Spam detected: Honeypot field filled');
      return { isSpam: true, reason: 'Invalid submission detected.' };
    }

    // Check 2: Time-based validation
    if (isSubmittedTooFast()) {
      console.warn('Spam detected: Form submitted too quickly');
      return { isSpam: true, reason: 'Please take a moment to fill out the form completely.' };
    }

    // Check 3: Rate limiting
    if (isRateLimited()) {
      console.warn('Spam detected: Rate limit exceeded');
      return { isSpam: true, reason: 'Too many submissions. Please try again later.' };
    }

    return { isSpam: false, reason: '' };
  }

  /**
   * Sanitize input string
   * @param {string} str - Input string
   * @returns {string} Sanitized string
   */
  function sanitizeString(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str.trim();
    return div.innerHTML;
  }

  /**
   * Sanitize phone number
   * @param {string} phone - Phone number input
   * @returns {string|null} Sanitized phone or null
   */
  function sanitizePhone(phone) {
    if (!phone) return null;
    return phone.trim().replace(/[^0-9+\-\s()]/g, '') || null;
  }

  /**
   * Validate email format
   * @param {string} email - Email address
   * @returns {boolean} Is valid email
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Collect and sanitize form data
   * @param {HTMLFormElement} form - The form element
   * @returns {Object} Sanitized form data
   */
  function collectFormData(form) {
    const formData = new FormData(form);
    
    return {
      name: sanitizeString(formData.get('name')),
      email: sanitizeString(formData.get('email')),
      phoneNumber: sanitizePhone(formData.get('phoneNumber')),
      donationType: sanitizeString(formData.get('donationType')),
      amount: formData.get('amount') ? parseFloat(formData.get('amount')) : null,
      message: sanitizeString(formData.get('message')) || null,
      status: 'PENDING'
    };
  }

  /**
   * Validate form data
   * @param {Object} data - Form data object
   * @returns {Array} Array of error messages
   */
  function validateFormData(data) {
    const errors = [];

    // Validate name (required, min 2 characters)
    if (!data.name) {
      errors.push('Full name is required.');
    } else if (data.name.length < 2) {
      errors.push('Name must be at least 2 characters long.');
    } else if (data.name.length > 100) {
      errors.push('Name must not exceed 100 characters.');
    }

    // Validate email (required, valid format)
    if (!data.email) {
      errors.push('Email address is required.');
    } else if (!isValidEmail(data.email)) {
      errors.push('Please provide a valid email address.');
    }

    // Validate phone number (optional, but if provided must be valid)
    if (data.phoneNumber && data.phoneNumber.length < 7) {
      errors.push('Please provide a valid phone number.');
    }

    // Validate donation type (required)
    if (!data.donationType) {
      errors.push('Please select a donation type.');
    } else if (!VALID_DONATION_TYPES.includes(data.donationType)) {
      errors.push('Please select a valid donation type.');
    }

    // Validate amount (optional, but if provided must be positive)
    if (data.amount !== null && data.amount < 0) {
      errors.push('Donation amount must be a positive number.');
    }

    // Validate message length
    if (data.message && data.message.length > 1000) {
      errors.push('Message must not exceed 1000 characters.');
    }

    return errors;
  }

  /**
   * Send donation data to API
   * @param {Object} data - Validated donation data
   * @returns {Promise<Object>} API response
   */
  async function submitDonation(data) {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(responseData.message || `Server error: ${response.status}`);
    }

    return responseData;
  }

  /**
   * Show form feedback message
   * @param {HTMLFormElement} form - The form element
   * @param {string} type - Message type ('loading', 'error', 'success')
   * @param {string} message - Optional custom message
   */
  function showMessage(form, type, message = '') {
    const loadingEl = form.querySelector('.loading');
    const errorEl = form.querySelector('.error-message');
    const successEl = form.querySelector('.sent-message');

    // Hide all messages first
    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    successEl.style.display = 'none';

    switch (type) {
      case 'loading':
        loadingEl.style.display = 'block';
        break;
      case 'error':
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        break;
      case 'success':
        if (message) successEl.textContent = message;
        successEl.style.display = 'block';
        break;
      case 'hide':
        // All already hidden
        break;
    }
  }

  /**
   * Add validation styling to form fields
   * @param {HTMLFormElement} form - The form element
   * @param {boolean} isValid - Whether field is valid
   * @param {string} fieldName - Name of the field
   */
  function setFieldValidation(form, fieldName, isValid) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.remove('is-valid', 'is-invalid');
      field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    }
  }

  /**
   * Clear all validation styling
   * @param {HTMLFormElement} form - The form element
   */
  function clearValidation(form) {
    form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
  }

  /**
   * Initialize donation form
   */
  function initDonationForm() {
    const form = document.getElementById('donation-form');
    
    if (!form) {
      console.warn('Donation form not found');
      return;
    }

    // Record form load time for spam protection
    formLoadTime = Date.now();

    // Remove the action attribute to prevent traditional form submission
    form.removeAttribute('action');

    // Add real-time validation on blur
    const requiredFields = ['name', 'email', 'donationType'];
    requiredFields.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.addEventListener('blur', function() {
          const tempData = collectFormData(form);
          const errors = validateFormData(tempData);
          const fieldErrors = errors.filter(e => e.toLowerCase().includes(fieldName.toLowerCase().replace('donationtype', 'donation type')));
          setFieldValidation(form, fieldName, fieldErrors.length === 0 && this.value);
        });
      }
    });

    // Email validation on input
    const emailField = form.querySelector('[name="email"]');
    if (emailField) {
      emailField.addEventListener('input', function() {
        if (this.value && isValidEmail(this.value)) {
          setFieldValidation(form, 'email', true);
        }
      });
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Clear previous validation
      clearValidation(form);
      showMessage(form, 'hide');

      // ========== SPAM PROTECTION CHECK ==========
      const spamCheck = checkForSpam(form);
      if (spamCheck.isSpam) {
        showMessage(form, 'error', spamCheck.reason);
        return;
      }

      // Collect and validate data
      const formData = collectFormData(form);
      const errors = validateFormData(formData);

      if (errors.length > 0) {
        showMessage(form, 'error', errors.join(' '));
        
        // Mark invalid fields
        if (errors.some(e => e.toLowerCase().includes('name'))) {
          setFieldValidation(form, 'name', false);
        }
        if (errors.some(e => e.toLowerCase().includes('email'))) {
          setFieldValidation(form, 'email', false);
        }
        if (errors.some(e => e.toLowerCase().includes('donation type'))) {
          setFieldValidation(form, 'donationType', false);
        }
        
        return;
      }

      // Show loading state
      showMessage(form, 'loading');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
      }

      try {
        // Submit to API
        await submitDonation(formData);
        
        // Record successful submission for rate limiting
        recordSubmission();
        
        // Show success message
        showMessage(form, 'success');
        
        // Reset form
        form.reset();
        clearValidation(form);
        
        // Reset form load time for next submission
        formLoadTime = Date.now();

        // Scroll to success message
        form.querySelector('.sent-message').scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (error) {
        console.error('Donation submission error:', error);
        showMessage(form, 'error', error.message || 'An error occurred. Please try again later.');
      } finally {
        // Re-enable submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Donation';
        }
      }
    });

    console.log('Donation form initialized successfully');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonationForm);
  } else {
    initDonationForm();
  }

})();
