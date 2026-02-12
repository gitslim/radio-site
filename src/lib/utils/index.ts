/**
 * Utility modules export index
 * Centralized exports for all utility functions
 */

// Image utilities
export {
	loadHeroImage,
	loadServiceImage,
	loadEquipmentImage,
	loadGalleryImage,
	getResponsiveImageSrc,
	isWebPSupported
} from './image.js';

export type { ImageSize } from './image.js';

// Form utilities
export {
	validateEmail,
	validateRequired,
	validatePhone,
	validateName,
	validateMessage,
	validateForm,
	isFormValid
} from './form.js';

export type { ContactFormData, FormValidationErrors } from './form.js';

// SEO utilities
export {
	getRussianLocale,
	generateMetaTags,
	generateOpenGraphTags,
	generatePageMetadata,
	generatePageTitle,
	generateBusinessStructuredData
} from './seo.js';

export type { MetaTag, RussianLocale } from './seo.js';

// Lenis smooth scroll utilities
export { initializeLenis } from './lenis.js';

export type { LenisConfig } from './lenis.js';
