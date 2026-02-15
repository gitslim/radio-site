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
		'id': 'kamery',
		'name': 'Камеры, объективы, стабилизаторы',
		'slug': 'kamery-obektivy-stabilizatory'
	},
	{
		'name': 'Гримерные, костюмерные, актерки, штабы',
		'slug': 'grimernye-kostyumernye-akterki-shtaby',
		'id': 'grimernye-kostyumernye-akterki-shtaby'
	},
	{
		'name': 'Светобазы и генераторы',
		'slug': 'svetobazy-i-generatory',
		'id': 'svetobazy-i-generatory'
	}
];
