/**
 * Интерфейсы данных для услуг
 * Data interfaces for services
 */

/**
 * Импортируем типы оборудования из equipment.ts
 * Import equipment types from equipment.ts
 */
import type { Equipment } from './equipment';

/**
 * Спецификация услуги
 * Service specification
 */
export interface Specification {
	/** Метка спецификации (на русском) / Specification label (Russian) */
	label: string;

	/** Значение спецификации (может включать английские номера моделей) / Specification value (may include English model numbers) */
	value: string;
}

/**
 * Услуга компании
 * Company service
 */
export interface Service {
	/** Уникальный идентификатор / Unique identifier */
	id: string;

	/** Название услуги (на русском) / Service name (Russian) */
	name: string;

	/** URL-псевдоним для маршрутизации / URL slug for routing */
	slug: string;

	/** Краткое описание услуги / Short service description */
	shortDescription: string;

	/** Полное описание услуги / Long service description */
	longDescription: string;

	/** Путь к изображению услуги / Path to service image */
	image: string;

	/** Путь к иконке услуги (опционально) / Path to service icon (optional) */
	icon?: string;

	/** Список спецификаций услуги (опционально) / List of service specifications (optional) */
	specifications?: Specification[];

	/** Список оборудования, относящегося к услуге (опционально) / List of equipment related to the service (optional) */
	equipment?: Equipment[];
}

/**
 * Моковые данные для демонстрации / Mock data for demonstration
 * TODO: Заменить на реальные данные из API или файлов
 * TODO: Replace with real data from API or files
 */
export const services: Service[] = [
	{
		id: 'lighting',
		name: 'Осветительное оборудование',
		slug: 'lighting',
		shortDescription: 'Профессиональное осветительное оборудование для съемок любой сложности',
		longDescription: 'Предоставляем полный спектр осветительного оборудования для профессиональных видеосъемок и киносъемок. В наличии более 600 осветительных приборов различной мощности и назначения. Наш парк включает источники света как для студийной съемки, так и для работы в полевых условиях.',
		image: 'hero-001',
		specifications: [
			{ label: 'Общее количество приборов', value: '600+' },
			{ label: 'Типы оборудования', value: 'HMI, LED, Tungsten, Fluorescent' },
			{ label: 'Световые базы', value: 'HINO 300 (Категория B: 18м³, Категория C: 25м³)' },
			{ label: 'Дополнительное оборудование', value: 'Светоформирующие насадки, стойки, кабели' }
		]
	},
	{
		id: 'transport',
		name: 'Транспортные услуги',
		slug: 'transport',
		shortDescription: 'Полный спектр транспортных услуг для съемочных групп',
		longDescription: 'Организуем транспортное сопровождение съемочных групп любого масштаба. Предоставляем спецтехнику для перевозки оборудования и персонала, а также транспортные средства для съемки в движении. Все водители имеют опыт работы на съемках кино и телевидения.',
		image: 'hero-002',
		specifications: [
			{ label: 'Грузовой транспорт', value: 'HINO 300, HINO 700' },
			{ label: 'Пассажирский транспорт', value: 'Микроавтобусы, автобусы' },
			{ label: 'Спецтехника', value: 'Краны, платформы для съемки' },
			{ label: 'Обслуживание', value: '24/7 поддержка съемочных групп' }
		]
	},
	{
		id: 'mobile',
		name: 'Мобильные комплексы',
		slug: 'mobile-complex',
		shortDescription: 'Мобильные видеостудии и постпродакшн комплексы',
		longDescription: 'Мобильные комплексы для работы в полевых условиях и выездных съемок. Полностью оснащенные видеостудии на базе спецтехники с возможностью монтажа и онлайн-трансляции. Идеальное решение для спортивных событий, концертов и новостных репортажей.',
		image: 'hero-003',
		specifications: [
			{ label: 'Типы комплексов', value: 'Мобильная студия, Постпродакшн комплекс' },
			{ label: 'Оборудование', value: 'Микшерный пульт, мониторы, серверы' },
			{ label: 'Связь', value: 'Спутниковая, LTE, VoIP' },
			{ label: 'Автономность', value: 'До 8 часов работы от автономных источников' }
		]
	},
	{
		id: 'aerial',
		name: 'Аэросъемка',
		slug: 'aerial-filming',
		shortDescription: 'Профессиональная аэросъемка с использованием дронов и вертолетов',
		longDescription: 'Выполняем аэросъемку любой сложности с использованием современных беспилотных систем и пилотируемых вертолетов. Опытные пилоты и операторы с сертификацией для съемки в городской черте и сложных условиях. Предоставляем Cineflex V14 стабилизированные системы.',
		image: 'hero-004',
		specifications: [
			{ label: 'БПЛА', value: 'DJI, Freefly Systems, Yuneec' },
			{ label: 'Пилотируемые вертолеты', value: 'Robinson R44, Bell 206' },
			{ label: 'Стабилизированные системы', value: 'Cineflex V14, Apex Stabilization' },
			{ label: 'Лицензии', value: 'Все необходимые разрешения для съемки' }
		]
	},
	{
		id: 'power',
		name: 'Электроснабжение',
		slug: 'power',
		shortDescription: 'Генераторы и системы бесперебойного питания для съемок',
		longDescription: 'Полное обеспечение съемочных групп электроэнергией в любых условиях. Предоставляем дизельные генераторы различной мощности, ИБП (UPS) системы и распределительные щиты. Специалисты по электрике обеспечивают безопасное подключение и работу оборудования.',
		image: 'hero-005',
		specifications: [
			{ label: 'Генераторы', value: 'Atlas Copco 40 kVA, 125 kVA' },
			{ label: 'ИБП системы', value: '100 кВт, 30 кВт' },
			{ label: 'Дополнительное оборудование', value: 'Распределительные щиты, кабели, разъемы' },
			{ label: 'Обслуживание', value: 'Инженеры-электрики на площадке' }
		]
	},
	{
		id: 'props',
		name: 'Реквизит и декорации',
		slug: 'props',
		shortDescription: 'Аренда реквизита и декораций для съемок',
		longDescription: 'Огромный выбор реквизита и декораций для любых постановочных задач. От мебели и интерьерных элементов до спецэффектов и театральных атрибутов. Работаем с профессиональными художниками-постановщиками для создания уникальных образов.',
		image: 'hero-006',
		specifications: [
			{ label: 'Категории реквизита', value: 'Мебель, посуда, текстиль, аксессуары' },
			{ label: 'Декорации', value: 'Фоны, задники, конструкции' },
			{ label: 'Спецэффекты', value: 'Дым, пиротехника, искусственный снег' },
			{ label: 'Услуга дизайнера', value: 'Консультации художника-постановщика' }
		]
	}
];

/**
 * Получить услугу по slug
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}

/**
 * Получить все услуги
 * Get all services
 */
export function getAllServices(): Service[] {
	return services;
}

