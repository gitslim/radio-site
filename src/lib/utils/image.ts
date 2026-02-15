/**
 * Image loading utilities for TechKino website
 * Images are optimized at upload time using Sharp (WebP, max 1920w, quality 80)
 */

/**
 * Returns equipment image URL.
 * Since images are optimized at upload time, this simply returns the path as-is.
 *
 * @param imageIdOrPath - ID of image (equipment-001) or full path (/images/equipment/slug/file.webp)
 * @returns Full path to equipment image
 */
export function loadEquipmentImage(imageIdOrPath: string): string {
	// If this is already a full path to WebP image in equipment folder
	if (imageIdOrPath.startsWith('/images/equipment/') && imageIdOrPath.endsWith('.webp')) {
		return imageIdOrPath;
	}

	// If this is a path to original image (jpg/png/etc) - convert to WebP
	if (imageIdOrPath.startsWith('/images/equipment/')) {
		return imageIdOrPath.replace(/\.[^.]+$/, '.webp');
	}

	// Legacy format: ID-based path (kept for backward compatibility)
	// Returns path to optimized folder for old data
	return `/images/optimized/equipment/${imageIdOrPath}-1024w.webp`;
}

/**
 * Returns srcset for responsive images.
 * For new uploads (optimized at upload time), returns single WebP source.
 * For legacy images, returns multiple sizes from optimized folder.
 *
 * @param imageIdOrPath - ID of image or full path
 * @returns srcset string for use in img tag
 */
export function getEquipmentImageSrcset(imageIdOrPath: string): string {
	// New format: single optimized WebP
	if (imageIdOrPath.startsWith('/images/equipment/') && imageIdOrPath.endsWith('.webp')) {
		return `${imageIdOrPath} 1920w`;
	}

	// Convert old formats to WebP
	if (imageIdOrPath.startsWith('/images/equipment/')) {
		const webpPath = imageIdOrPath.replace(/\.[^.]+$/, '.webp');
		return `${webpPath} 1920w`;
	}

	// Legacy format: multiple sizes from optimized folder
	let name: string;
	if (imageIdOrPath.startsWith('/images/equipment/')) {
		const fileName = imageIdOrPath.split('/').pop();
		name = fileName?.replace(/\.[^.]+$/, '') || '';
	} else {
		name = imageIdOrPath;
	}

	return [
		`/images/optimized/equipment/${name}-640w.webp 640w`,
		`/images/optimized/equipment/${name}-1024w.webp 1024w`,
		`/images/optimized/equipment/${name}-1920w.webp 1920w`
	].join(', ');
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
