/**
 * Интерфейсы данных для оборудования
 * Data interfaces for equipment
 */

/**
 * Категории оборудования / Equipment categories
 */
export type EquipmentCategory = 'освещение' | 'камеры' | 'звук' | 'grip' | 'упаковки';

/**
 * Спецификация оборудования
 * Equipment specification
 */
export interface Specification {
	/** Метка спецификации (на русском) / Specification label (Russian) */
	label: string;

	/** Значение спецификации (может включать английские номера моделей) / Specification value (may include English model numbers) */
	value: string;
}

/**
 * Интерфейс фильтра для оборудования
 * Equipment filter interface
 */
export interface EquipmentFilter {
	/** Категория оборудования (опционально) / Equipment category (optional) */
	category?: EquipmentCategory;

	/** Доступность оборудования (опционально) / Equipment availability (optional) */
	available?: boolean;

	/** Поисковый запрос (опционально) / Search query (optional) */
	searchTerm?: string;
}

/**
 * Оборудование компании
 * Company equipment
 */
export interface Equipment {
	/** Уникальный идентификатор / Unique identifier */
	id: string;

	/** Название оборудования (на русском с английскими номерами моделей) / Equipment name (Russian with English model numbers) */
	name: string;

	/** URL-псевдоним для маршрутизации / URL slug for routing */
	slug: string;

	/** Категория оборудования / Equipment category */
	category: EquipmentCategory;

	/** Описание оборудования / Equipment description */
	description: string;

	/** Список спецификаций оборудования / List of equipment specifications */
	specifications: Specification[];

	/** Список изображений оборудования / List of equipment images */
	images: string[];

	/** Доступность оборудования / Equipment availability */
	available: boolean;

	/** Рекомендуемое оборудование (опционально) / Featured equipment (optional) */
	featured?: boolean;

	/** Связанное оборудование (опционально) / Related equipment (optional) */
	relatedIds?: string[];
}
