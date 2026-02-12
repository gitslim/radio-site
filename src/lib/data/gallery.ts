/**
 * Интерфейсы данных для галереи
 * Data interfaces for gallery
 */

/**
 * Категории изображений галереи
 * Gallery image categories
 */
export type GalleryCategory =
	| 'equipment-in-action' // Оборудование в работе
	| 'facilities' // Производственные площадки
	| 'film-set' // Киносъемки
	| 'behind-scenes'; // За кулисами

/**
 * Изображение галереи
 * Gallery image
 */
export interface GalleryImage {
	/** Уникальный идентификатор / Unique identifier */
	id: string;

	/** Путь к оптимизированному изображению / Path to optimized image */
	src: string;

	/** Путь к миниатюре / Path to thumbnail */
	thumbnail: string;

	/** Альтернативный текст (на русском) / Alt text (Russian) */
	alt: string;

	/** Категория изображения / Image category */
	category: GalleryCategory;

	/** Подпись к изображению (опционально) / Image caption (optional) */
	caption?: string;
}
