/**
 * Интерфейс данных о компании
 * Company information interface
 */

/**
 * Информация о компании ООО "Радиотехника-к"
 * Company information for Radiotexnika-K LLC
 */
export interface CompanyInfo {
	/** Название компании / Company name */
	name: string; // "ООО 'Радиотехника-к'"

	/** ОГРН (Основной государственный регистрационный номер) / Primary State Registration Number */
	ogrn: string; // "1037700198821"

	/** Юридический адрес / Legal address */
	legalAddress: string; // "115533, город Москва, Нагатинская наб., д. 10 к. 3, кв. 56"

	/** Веб-сайт компании / Company website */
	website: string; // "radiotexnika-k.ru"

	/** Email для связи / Contact email */
	email: string; // "chdp1975@gmail.com"

	/** Описание деятельности компании / Company description */
	description: string;
}

/**
 * Информация о компании ООО "Радиотехника-к"
 * Company information for Radiotexnika-K LLC
 */
export const companyInfo: CompanyInfo = {
	name: 'ООО "Радиотехника-к"',
	ogrn: '1037700198821',
	legalAddress: '115533, город Москва, Нагатинская наб., д. 10 к. 3, кв. 56',
	website: 'radiotexnika-k.ru',
	email: 'chdp1975@gmail.com',
	description:
		'Компания ООО "Радиотехника-к" специализируется на профессиональной аренде оборудования для производства кино- и видеопродукции. Мы предоставляем широкий спектр высококачественной техники, включая осветительное оборудование, генераторы, системы бесперебойного питания, мобильные комплексы и многое другое. Наш опытный персонал обеспечит надежную поддержку ваших съемочных проектов любого масштаба.'
};
