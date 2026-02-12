/**
 * Интерфейсы данных для контактной формы
 * Data interfaces for contact form
 */

/**
 * Данные контактной формы
 * Contact form data
 */
export interface ContactFormData {
	/** Имя отправителя / Sender name */
	name: string;

	/** Название компании (опционально) / Company name (optional) */
	company?: string;

	/** Email отправителя / Sender email */
	email: string;

	/** Телефон (опционально) / Phone (optional) */
	phone?: string;

	/** Выбранная услуга (опционально) / Selected service (optional) */
	service?: string;

	/** Сообщение / Message */
	message: string;
}

/**
 * Ошибки валидации формы
 * Form validation errors
 */
export interface FormValidationErrors {
	/** Ошибка валидации имени / Name validation error */
	name?: string;

	/** Ошибка валидации email / Email validation error */
	email?: string;

	/** Ошибка валидации сообщения / Message validation error */
	message?: string;
}
