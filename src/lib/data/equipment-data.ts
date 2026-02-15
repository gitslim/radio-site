/**
 * Данные об оборудовании
 * Equipment data
 */

import type { Equipment } from './equipment';

/**
 * Список оборудования компании
 * Company equipment list
 */
export const equipmentData: Equipment[] = [];

/**
 * Получить список всех уникальных категорий оборудования
 * Get list of all unique equipment categories
 */
export function getCategories(): string[] {
	const categories = new Set(equipmentData.map((item) => item.category));
	return Array.from(categories).sort();
}
