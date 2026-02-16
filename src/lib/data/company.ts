/**
 * Интерфейс данных о компании
 * Company information interface
 */
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_PHONE } from '$env/static/public';

/**
 * Информация о компании ООО "Радиотехника-К"
 * Company information for Radiotexnika-K LLC
 */
export interface CompanyInfo {
	/** Название компании / Company name */
	name: string;

	/** ОГРН (Основной государственный регистрационный номер) / Primary State Registration Number */
	ogrn: string;

	/** Юридический адрес / Legal address */
	legalAddress: string;

	/** Веб-сайт компании / Company website */
	website: string;

	/** Email для связи / Contact email */
	email: string;

	/** Телефон для связи / Contact phone */
	phone: string;

	/** Описание деятельности компании / Company description */
	description: string;
}

/**
 * Информация о компании ООО "Радиотехника-К"
 * Company information for Radiotexnika-K LLC
 */
export const companyInfo: CompanyInfo = {
	name: 'ООО "Радиотехника-К"',
	ogrn: '1037700198821',
	legalAddress: '115533, город Москва, Нагатинская наб., д. 10 к. 3',
	website: 'radiotexnika-k.ru',
	email: PUBLIC_CONTACT_EMAIL || 'radiotexnika-k@mail.ru',
	phone: PUBLIC_CONTACT_PHONE || '8 495 921 9550',
	description:
		'Компания ООО "Радиотехника-К" специализируется на профессиональной аренде оборудования для производства кино- и видеопродукции. Мы предоставляем широкий спектр высококачественной техники, включая осветительное оборудование, генераторы, системы бесперебойного питания, мобильные комплексы и многое другое. Наш опытный персонал обеспечит надежную поддержку ваших съемочных проектов любого масштаба.'
};
