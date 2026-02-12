/**
 * Form validation utilities for TechKino website
 * Supports Russian text input and email validation
 */

/**
 * Contact form data structure
 */
export interface ContactFormData {
	name: string;
	company?: string;
	email: string;
	phone?: string;
	service?: string;
	message: string;
}

/**
 * Form validation errors structure
 * Each field contains an error message in Russian
 */
export interface FormValidationErrors {
	name?: string;
	email?: string;
	phone?: string;
	message?: string;
}

/**
 * Validates email format
 * Supports standard email patterns including Russian domain extensions
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
	if (!email || email.trim().length === 0) {
		return false;
	}

	// Email validation regex
	// Supports:
	// - Standard email formats
	// - International characters in local part
	// - Russian domain extensions (.ru, .su, .рф, etc.)
	// - Plus signs and dots in local part
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Zа-яА-ЯёЁ]{2,}$/u;

	return emailRegex.test(email.trim());
}

/**
 * Validates required field
 * Checks for non-empty, non-whitespace values
 * Supports Russian text input
 * @param value - Value to validate
 * @returns true if value is present and valid, false otherwise
 */
export function validateRequired(value: string): boolean {
	return value !== null && value !== undefined && value.trim().length > 0;
}

/**
 * Validates phone number format
 * Supports Russian phone numbers with various formats
 * @param phone - Phone number to validate (optional field)
 * @returns true if phone is valid or empty, false otherwise
 */
export function validatePhone(phone?: string): boolean {
	// Phone is optional, so empty is valid
	if (!phone || phone.trim().length === 0) {
		return true;
	}

	// Remove all non-digit characters
	const digits = phone.replace(/\D/g, '');

	// Russian phone numbers should be 11 digits (including country code)
	// Or 10 digits without country code
	return digits.length === 11 || digits.length === 10;
}

/**
 * Validates name field
 * Checks for non-empty name with minimum length
 * Supports Russian characters
 * @param name - Name to validate
 * @returns true if name is valid, false otherwise
 */
export function validateName(name: string): boolean {
	if (!validateRequired(name)) {
		return false;
	}

	// Name should be at least 2 characters
	return name.trim().length >= 2;
}

/**
 * Validates message field
 * Checks for non-empty message with minimum length
 * Supports Russian text
 * @param message - Message to validate
 * @returns true if message is valid, false otherwise
 */
export function validateMessage(message: string): boolean {
	if (!validateRequired(message)) {
		return false;
	}

	// Message should be at least 10 characters
	return message.trim().length >= 10;
}

/**
 * Validates entire contact form
 * Returns detailed error messages in Russian for each invalid field
 * @param formData - Contact form data to validate
 * @returns Object containing error messages for invalid fields
 */
export function validateForm(formData: ContactFormData): FormValidationErrors {
	const errors: FormValidationErrors = {};

	// Validate name
	if (!validateName(formData.name)) {
		errors.name = 'Пожалуйста, введите ваше имя (минимум 2 символа)';
	}

	// Validate email
	if (!validateEmail(formData.email)) {
		errors.email = 'Пожалуйста, введите корректный email адрес';
	}

	// Validate phone (optional field)
	if (formData.phone && !validatePhone(formData.phone)) {
		errors.phone = 'Пожалуйста, введите корректный номер телефона';
	}

	// Validate message
	if (!validateMessage(formData.message)) {
		errors.message = 'Пожалуйста, введите сообщение (минимум 10 символов)';
	}

	return errors;
}

/**
 * Checks if form has any validation errors
 * @param errors - Form validation errors object
 * @returns true if form is valid, false otherwise
 */
export function isFormValid(errors: FormValidationErrors): boolean {
	return Object.keys(errors).length === 0;
}
