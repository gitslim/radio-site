/**
 * Данные о категориях оборудования
 * Equipment category data
 */

import type { Category } from './equipment';

export type { Category };

/**
 * Список категорий оборудования
 * Equipment categories list
 */
export const categoryData: Category[] = [
	{
		'id': 'category-lighting',
		'name': 'освещение',
		'slug': 'osveshchenie',
		'description': 'Профессиональное осветительное оборудование для студийной и натурной съемки'
	},
	{
		'id': 'category-cameras',
		'name': 'камеры',
		'slug': 'kamery',
		'description': 'Киносъемочное оборудование и кинотехника для профессионального производства'
	},
	{
		'id': 'category-sound',
		'name': 'звук',
		'slug': 'zvuk',
		'description': 'Звуковое оборудование для профессиональной аудиозаписи и озвучивания'
	},
	{
		'id': 'category-grip',
		'name': 'grip',
		'slug': 'grip',
		'description': 'Оснастка и вспомогательное оборудование для кино и видеопроизводства'
	},
	{
		'id': 'category-packaging',
		'name': 'упаковки',
		'slug': 'upakovki',
		'description': 'Транспортные упаковки и кейсы для безопасной перевозки оборудования'
	}
];
