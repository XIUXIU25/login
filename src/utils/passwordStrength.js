/*
 * Author: Chunjingwen(Aria) Cui
 * Created: Tue Mar 11 2025
 * Updated: Tue Mar 11 2025
 */

/**
 * Check the strength of a password
 * @param {string} password - The password to be checked
 * @returns {Object} - The strength of the password
 */
export const checkPasswordStrength = (password) => {
    let strength = 0;
    let criteria = {
      length: false,
      casing: false,
      special: false
    };
  
    // Criteria for password's length
    if (password.length >= 6) {
      strength += 1;
      criteria.length = true;
    }
  
    // Criteria for password's casing
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 1;
      criteria.casing = true;
    }
  
    // Criteria for password's special characters
    if (/\d/.test(password) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) {
      strength += 1;
      criteria.special = true;
    }
  
    // Determine the strength level
    let strengthLevel = '';
    if (strength === 1) {
      strengthLevel = 'Weak';
    } else if (strength === 2) {
      strengthLevel = 'Medium';
    } else if (strength === 3) {
      strengthLevel = 'Strong';
    } else {
      strengthLevel = '';
    }
  
    return {
      level: strengthLevel,
      criteria: criteria,
      score: strength
    };
  };