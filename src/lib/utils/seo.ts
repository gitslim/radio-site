/**
 * SEO utilities for TechKino website
 * Generates meta tags and Open Graph tags with Russian language support
 */

/**
 * Meta tag structure
 */
export interface MetaTag {
	name?: string;
	property?: string;
	content?: string;
	httpEquiv?: string;
	charset?: string;
}

/**
 * Locale settings for Russian language
 */
export type RussianLocale = 'ru-RU';

/**
 * Returns Russian locale
 * @returns Russian locale string
 */
export function getRussianLocale(): RussianLocale {
	return 'ru-RU';
}

/**
 * Default site metadata
 */
const DEFAULT_SITE_NAME = 'ТехКино — Прокат оборудования для кинопроизводства';
const DEFAULT_DESCRIPTION = 'Прокат профессионального оборудования для кино и видеосъемки. Осветительное оборудование, генераторы, стабилизация и другая техника.';
const DEFAULT_OG_TYPE = 'website';
const DEFAULT_TWITTER_CARD = 'summary_large_image';

/**
 * Generates standard HTML meta tags
 * All text is in Russian
 * @param title - Page title
 * @param description - Page description
 * @param image - Optional image URL for social sharing
 * @param url - Optional canonical URL
 * @returns Array of meta tag objects
 */
export function generateMetaTags(
	title: string,
	description: string,
	image?: string,
	url?: string
): MetaTag[] {
	const metaTags: MetaTag[] = [];

	// Charset
	metaTags.push({ charset: 'utf-8' });

	// Viewport
	metaTags.push({
		name: 'viewport',
		content: 'width=device-width, initial-scale=1.0'
	});

	// Language
	metaTags.push({
		httpEquiv: 'content-language',
		content: getRussianLocale()
	});

	// Title
	metaTags.push({
		name: 'title',
		content: title
	});

	// Description
	metaTags.push({
		name: 'description',
		content: description
	});

	// Robots
	metaTags.push({
		name: 'robots',
		content: 'index, follow'
	});

	// Canonical URL
	if (url) {
		metaTags.push({
			property: 'og:url',
			content: url
		});
		metaTags.push({
			name: 'canonical',
			content: url
		});
	}

	// Image for social sharing
	if (image) {
		metaTags.push({
			name: 'image',
			content: image
		});
	}

	return metaTags;
}

/**
 * Generates Open Graph meta tags for social sharing
 * All text is in Russian
 * @param title - Page title
 * @param description - Page description
 * @param image - Optional image URL for social sharing
 * @param url - Optional canonical URL
 * @returns Array of Open Graph meta tag objects
 */
export function generateOpenGraphTags(
	title: string,
	description: string,
	image?: string,
	url?: string
): MetaTag[] {
	const ogTags: MetaTag[] = [];

	// Basic Open Graph tags
	ogTags.push({
		property: 'og:title',
		content: title
	});

	ogTags.push({
		property: 'og:description',
		content: description
	});

	ogTags.push({
		property: 'og:type',
		content: DEFAULT_OG_TYPE
	});

	ogTags.push({
		property: 'og:site_name',
		content: DEFAULT_SITE_NAME
	});

	ogTags.push({
		property: 'og:locale',
		content: getRussianLocale()
	});

	ogTags.push({
		property: 'og:locale:alternate',
		content: getRussianLocale()
	});

	// URL
	if (url) {
		ogTags.push({
			property: 'og:url',
			content: url
		});
	}

	// Image
	if (image) {
		ogTags.push({
			property: 'og:image',
			content: image
		});

		ogTags.push({
			property: 'og:image:alt',
			content: title
		});

		ogTags.push({
			property: 'og:image:type',
			content: 'image/webp'
		});
	}

	// Twitter Card tags
	ogTags.push({
		name: 'twitter:card',
		content: DEFAULT_TWITTER_CARD
	});

	ogTags.push({
		name: 'twitter:title',
		content: title
	});

	ogTags.push({
		name: 'twitter:description',
		content: description
	});

	ogTags.push({
		name: 'twitter:site',
		content: '@cinematechnologies'
	});

	if (image) {
		ogTags.push({
			name: 'twitter:image',
			content: image
		});
	}

	return ogTags;
}

/**
 * Generates complete page metadata including standard and Open Graph tags
 * @param title - Page title
 * @param description - Page description
 * @param options - Optional metadata (image, url)
 * @returns Object with title and all meta tags
 */
export function generatePageMetadata(
	title: string,
	description: string,
	options?: {
		image?: string;
		url?: string;
	}
) {
	const { image, url } = options || {};

	return {
		title,
		metaTags: [
			...generateMetaTags(title, description, image, url),
			...generateOpenGraphTags(title, description, image, url)
		]
	};
}

/**
 * Generates page title with site name suffix
 * @param pageTitle - Specific page title
 * @returns Full page title with site name
 */
export function generatePageTitle(pageTitle: string): string {
	if (!pageTitle || pageTitle.trim().length === 0) {
		return DEFAULT_SITE_NAME;
	}
	return `${pageTitle} | ${DEFAULT_SITE_NAME}`;
}

/**
 * Generates structured data (JSON-LD) for local business
 * @returns JSON-LD object for TechKino business
 */
export function generateBusinessStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'ТехКино',
		description: DEFAULT_DESCRIPTION,
		email: 'info@techkino.com',
		url: 'https://techkino.com',
		sameAs: ['https://www.instagram.com/cinematechnologies'],
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'RU'
		},
		priceRange: '₽₽₽'
	};
}
