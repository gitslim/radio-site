/**
 * Данные об оборудовании
 * Equipment data
 */

import type { Equipment } from './equipment';

/**
 * Список оборудования компании
 * Company equipment list
 */
export const equipmentData: Equipment[] = [
	{
		id: 'equipment-001',
		name: 'Профессиональное осветительное оборудование ARRI',
		slug: 'arri-lighting',
		category: 'освещение',
		description: 'Высококачественное осветительное оборудование для профессиональной съемки. Включает различные типы светильников и аксессуаров.',
		specifications: [
			{ label: 'Мощность', value: '2000W' },
			{ label: 'Цветовая температура', value: '5600K' }
		],
		images: ['/images/equipment/equipment-001.jpg'],
		available: true,
		featured: true,
		relatedIds: ['equipment-002', 'equipment-003', 'equipment-008']
	},
	{
		id: 'equipment-002',
		name: 'Студийный свет Kino Flo',
		slug: 'kino-flo-studio-light',
		category: 'освещение',
		description: 'Профессиональные студийные светильники Kino Flo для мягкого и равномерного освещения в студии.',
		specifications: [
			{ label: 'Мощность', value: '1200W' },
			{ label: 'Цветовая температура', value: '3200K' }
		],
		images: ['/images/equipment/equipment-002.jpg'],
		available: true,
		featured: true,
		relatedIds: ['equipment-001', 'equipment-003', 'equipment-009']
	},
	{
		id: 'equipment-003',
		name: 'Профессиональные светильники Aputure',
		slug: 'aputure-pro-lights',
		category: 'освещение',
		description: 'Передовые светильники Aputure с регулировкой цветовой температуры и высоким CRI.',
		specifications: [
			{ label: 'Мощность', value: '600W' },
			{ label: 'CRI', value: '96+' },
			{ label: 'TLCI', value: '97+' }
		],
		images: ['/images/equipment/equipment-003.jpg'],
		available: true,
		relatedIds: ['equipment-001', 'equipment-002', 'equipment-009']
	},
	{
		id: 'equipment-004',
		name: 'Техническое оборудование для кинопроизводства',
		slug: 'tech-equipment-cinema',
		category: 'камеры',
		description: 'Комплексное техническое оснащение для полномасштабного кинопроизводства.',
		specifications: [
			{ label: 'Тип', value: 'Универсальное' },
			{ label: 'Назначение', value: 'Кинопроизводство' }
		],
		images: ['/images/equipment/equipment-004.jpg'],
		available: true,
		relatedIds: ['equipment-006', 'equipment-007', 'equipment-010']
	},
	{
		id: 'equipment-005',
		name: 'Осветительные приборы для натурных съемок',
		slug: 'location-lighting',
		category: 'освещение',
		description: 'Мощные осветительные приборы для работы в полевых условиях и на натурных площадках.',
		specifications: [
			{ label: 'Мощность', value: '4000W' },
			{ label: 'Защита', value: 'IP65' }
		],
		images: ['/images/equipment/equipment-005.jpg'],
		available: true,
		relatedIds: ['equipment-001', 'equipment-008', 'equipment-009']
	},
	{
		id: 'equipment-006',
		name: 'Специализированное оборудование для съемок',
		slug: 'specialized-equipment',
		category: 'камеры',
		description: 'Специализированное оборудование для сложных съемочных задач и спецэффектов.',
		specifications: [
			{ label: 'Тип', value: 'Специализированное' },
			{ label: 'Сложность', value: 'Высокая' }
		],
		images: ['/images/equipment/equipment-006.jpg'],
		available: true,
		relatedIds: ['equipment-004', 'equipment-007', 'equipment-010']
	},
	{
		id: 'equipment-007',
		name: 'Кинотехника и аксессуары',
		slug: 'cinema-accessories',
		category: 'камеры',
		description: 'Полный набор кинотехники и аксессуаров для профессиональной съемки.',
		specifications: [
			{ label: 'Тип', value: 'Комплект' },
			{ label: 'Количество позиций', value: '50+' }
		],
		images: ['/images/equipment/equipment-007.jpg'],
		available: false,
		relatedIds: ['equipment-004', 'equipment-006', 'equipment-010']
	},
	{
		id: 'equipment-008',
		name: 'Осветительное оборудование для натурных съемок',
		slug: 'natural-lighting',
		category: 'освещение',
		description: 'Специализированное освещение для работы в естественных условиях и на локациях.',
		specifications: [
			{ label: 'Мощность', value: '2500W' },
			{ label: 'Вес', value: '15 кг' }
		],
		images: ['/images/equipment/equipment-008.jpg'],
		available: true,
		featured: true,
		relatedIds: ['equipment-001', 'equipment-002', 'equipment-005']
	},
	{
		id: 'equipment-009',
		name: 'Видеоосвещение профессионального класса',
		slug: 'video-lighting-pro',
		category: 'освещение',
		description: 'Профессиональное видеоосвещение для качественной видеосъемки.',
		specifications: [
			{ label: 'Мощность', value: '1800W' },
			{ label: 'CRI', value: '95+' }
		],
		images: ['/images/equipment/equipment-009.jpg'],
		available: true,
		relatedIds: ['equipment-001', 'equipment-002', 'equipment-003']
	},
	{
		id: 'equipment-010',
		name: 'Кинотехнические средства',
		slug: 'cinema-tech-means',
		category: 'камеры',
		description: 'Современные кинотехнические средства для производства фильмов и видео.',
		specifications: [
			{ label: 'Тип', value: 'Универсальное' },
			{ label: 'Применение', value: 'Кино и видео' }
		],
		images: ['/images/equipment/equipment-010.jpg'],
		available: true,
		relatedIds: ['equipment-004', 'equipment-006', 'equipment-007']
	}
];

/**
 * Получить список всех уникальных категорий оборудования
 * Get list of all unique equipment categories
 */
export function getCategories(): string[] {
	const categories = new Set(equipmentData.map((item) => item.category));
	return Array.from(categories).sort();
}
