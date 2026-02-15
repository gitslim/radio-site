/**
 * Validation utilities for admin panel
 * Shared validation logic for equipment and categories
 */

import type { Equipment, Category } from '$lib/data/equipment';
import { slugify } from '$lib/utils';

/**
 * Validation result interface
 */
export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

/**
 * Slug format validation regex
 * ASCII-only: lowercase letters, numbers, and hyphens
 * (Cyrillic is transliterated before validation)
 */
const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Generate URL-friendly slug from name
 * Transliterates Cyrillic to Latin, creates ASCII-only slug
 */
export function generateSlug(name: string): string {
	return slugify(name);
}

/**
 * Validate equipment data structure
 * Checks all required fields and slug format
 */
export function validateEquipment(data: Partial<Equipment>): ValidationResult {
	const errors: string[] = [];

	// Required fields
	if (!data.id || typeof data.id !== 'string' || data.id.trim() === '') {
		errors.push('id is required and must be a non-empty string');
	}

	if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
		errors.push('name is required and must be a non-empty string');
	}

	if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
		errors.push('slug is required and must be a non-empty string');
	} else if (!SLUG_REGEX.test(data.slug)) {
		errors.push('slug must contain only lowercase letters, numbers, and hyphens');
	}

	if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
		errors.push('category is required and must be a non-empty string');
	}

	if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
		errors.push('description is required and must be a non-empty string');
	}

	if (!data.images || !Array.isArray(data.images)) {
		errors.push('images is required and must be an array');
	}

	// Optional fields with type checking
	if (data.specifications !== undefined && !Array.isArray(data.specifications)) {
		errors.push('specifications must be an array');
	}

	if (data.available !== undefined && typeof data.available !== 'boolean') {
		errors.push('available must be a boolean');
	}

	if (data.featured !== undefined && typeof data.featured !== 'boolean') {
		errors.push('featured must be a boolean');
	}

	if (data.relatedIds !== undefined && !Array.isArray(data.relatedIds)) {
		errors.push('relatedIds must be an array');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

/**
 * Validate category data structure
 * Checks all required fields and slug format
 */
export function validateCategory(data: Partial<Category>): ValidationResult {
	const errors: string[] = [];

	// Required fields
	if (!data.id || typeof data.id !== 'string' || data.id.trim() === '') {
		errors.push('id is required and must be a non-empty string');
	}

	if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
		errors.push('name is required and must be a non-empty string');
	}

	if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
		errors.push('slug is required and must be a non-empty string');
	} else if (!SLUG_REGEX.test(data.slug)) {
		errors.push('slug must contain only lowercase letters, numbers, and hyphens');
	}

	// Optional field with type checking
	if (data.description !== undefined && typeof data.description !== 'string') {
		errors.push('description must be a string');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}
