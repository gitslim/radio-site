/**
 * Image loading utilities for TechKino website
 * Provides optimized image path generation with WebP support
 */

/**
 * Supported image sizes for responsive loading
 */
export type ImageSize = '640w' | '1024w' | '1920w';

/**
 * Returns optimized hero image path
 * @param imageId - The image identifier
 * @returns Full path to optimized hero image
 */
export function loadHeroImage(imageId: string): string {
	return `/images/optimized/${imageId}-1920w.webp`;
}

/**
 * Returns optimized service image path
 * @param imageId - The image identifier
 * @returns Full path to optimized service image
 */
export function loadServiceImage(imageId: string): string {
	return `/images/optimized/${imageId}-1024w.webp`;
}

/**
 * Returns optimized equipment image path
 * @param imageId - The image identifier
 * @returns Full path to optimized equipment image
 */
export function loadEquipmentImage(imageId: string): string {
	return `/images/optimized/equipment/${imageId}-1024w.webp`;
}

/**
 * Returns responsive gallery image path
 * @param imageId - The image identifier
 * @param size - The desired image size (default: '1024w')
 * @returns Full path to optimized gallery image
 */
export function loadGalleryImage(
	imageId: string,
	size: ImageSize = '1024w'
): string {
	return `/images/optimized/gallery/${imageId}-${size}.webp`;
}

/**
 * Returns responsive image path for any image
 * @param src - Original image source path
 * @param size - The desired image size
 * @returns Path to responsive image version
 */
export function getResponsiveImageSrc(src: string, size: ImageSize): string {
	// Extract filename without extension
	const lastSlash = src.lastIndexOf('/');
	const lastDot = src.lastIndexOf('.');
	const baseName = lastDot > lastSlash ? src.substring(lastSlash + 1, lastDot) : src.substring(lastSlash + 1);
	const directory = src.substring(0, lastSlash);

	// Determine appropriate directory for optimized images
	if (directory.includes('hero')) {
		return `${directory}/${baseName}-${size}.webp`;
	} else if (directory.includes('equipment')) {
		return `${directory}/${baseName}-${size}.webp`;
	} else if (directory.includes('gallery')) {
		return `${directory}/${baseName}-${size}.webp`;
	}

	// Fallback: use gallery directory
	return `/images/optimized/gallery/${baseName}-${size}.webp`;
}

/**
 * Detects WebP browser support
 * Uses a cached result to avoid repeated checks
 * @returns true if WebP is supported, false otherwise
 */
export function isWebPSupported(): boolean {
	// Check if we've already determined support
	const cached = typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).__webp_support__;
	if (typeof cached === 'boolean') {
		return cached;
	}

	// Test WebP support
	const supported = typeof document !== 'undefined' &&
		document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

	// Cache the result
	if (typeof window !== 'undefined') {
		(window as unknown as Record<string, unknown>).__webp_support__ = supported;
	}

	return supported;
}
