/**
 * API client for admin panel
 * Provides typed functions for equipment and category CRUD operations
 */

import type { Equipment, Category } from '$lib/data/equipment';

/**
 * API Error class for handling API-related errors
 */
export class ApiError extends Error {
	constructor(
		message: string,
		public status?: number,
		public data?: unknown
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * Base URL for admin API routes
 */
const ADMIN_API_BASE = '/admin';

/**
 * Helper function to handle fetch responses
 * Throws ApiError for non-200 status codes
 */
async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		let errorMessage = `API error: ${response.status} ${response.statusText}`;
		let data: unknown;

		try {
			data = await response.json();
			if (typeof data === 'object' && data !== null) {
				const errorData = data as { message?: string; error?: string };
				errorMessage = errorData.message || errorData.error || errorMessage;
			}
		} catch {
			// If response is not JSON, use status text
		}

		throw new ApiError(errorMessage, response.status, data);
	}

	return response.json() as Promise<T>;
}

/**
 * Fetch all equipment items
 * @returns Promise<Equipment[]> - Array of all equipment items
 * @throws ApiError if fetch fails
 */
export async function fetchEquipment(): Promise<Equipment[]> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/equipment`);
		return await handleResponse<Equipment[]>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to fetch equipment data');
	}
}

/**
 * Create a new equipment item
 * @param data - Partial equipment data (all required fields should be present)
 * @returns Promise<Equipment> - Created equipment item
 * @throws ApiError if creation fails
 */
export async function createEquipment(data: Partial<Equipment>): Promise<Equipment> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/equipment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await handleResponse<Equipment>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to create equipment');
	}
}

/**
 * Update an existing equipment item
 * @param id - Equipment ID to update
 * @param data - Partial equipment data with fields to update
 * @returns Promise<Equipment> - Updated equipment item
 * @throws ApiError if update fails
 */
export async function updateEquipment(id: string, data: Partial<Equipment>): Promise<Equipment> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/equipment`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, ...data })
		});
		return await handleResponse<Equipment>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to update equipment');
	}
}

/**
 * Delete an equipment item
 * @param id - Equipment ID to delete
 * @returns Promise<void>
 * @throws ApiError if deletion fails
 */
export async function deleteEquipment(id: string): Promise<void> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/equipment?id=${encodeURIComponent(id)}`, {
			method: 'DELETE'
		});
		await handleResponse<{ success: boolean; message: string }>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to delete equipment');
	}
}

/**
 * Fetch all categories
 * @returns Promise<Category[]> - Array of all categories
 * @throws ApiError if fetch fails
 */
export async function fetchCategories(): Promise<Category[]> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/categories`);
		return await handleResponse<Category[]>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to fetch categories');
	}
}

/**
 * Create a new category
 * @param data - Partial category data (all required fields should be present)
 * @returns Promise<Category> - Created category
 * @throws ApiError if creation fails
 */
export async function createCategory(data: Partial<Category>): Promise<Category> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/categories`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await handleResponse<Category>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to create category');
	}
}

/**
 * Update an existing category
 * @param id - Category ID to update
 * @param data - Partial category data with fields to update
 * @returns Promise<Category> - Updated category
 * @throws ApiError if update fails
 */
export async function updateCategory(id: string, data: Partial<Category>): Promise<Category> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/categories`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, ...data })
		});
		return await handleResponse<Category>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to update category');
	}
}

/**
 * Delete a category
 * @param id - Category ID to delete
 * @returns Promise<void>
 * @throws ApiError if deletion fails (e.g., category has associated equipment)
 */
export async function deleteCategory(id: string): Promise<void> {
	try {
		const response = await fetch(`${ADMIN_API_BASE}/categories?id=${encodeURIComponent(id)}`, {
			method: 'DELETE'
		});
		await handleResponse<{ success: boolean; message: string }>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Failed to delete category');
	}
}
