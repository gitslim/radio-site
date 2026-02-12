/**
 * Интерфейсы данных для оборудования
 * Data interfaces for equipment
 */

/**
 * Импортируем спецификацию из services.ts
 * Import Specification from services.ts
 */
import type { Specification } from './services';

/**
 * Интерфейс фильтра для оборудования
 * Equipment filter interface
 */
export interface EquipmentFilter {
	/** Категория оборудования (опционально) / Equipment category (optional) */
	category?: string;

	/** Доступность оборудования (опционально) / Equipment availability (optional) */
	available?: boolean;
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
	category: string;

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
}
