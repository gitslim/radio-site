import { json, error } from '@sveltejs/kit';
import { readFile, readdir, unlink, access, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, relative } from 'node:path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to static directory
// File is at: src/routes/api/files/[...path]/+server.ts
// Need to go up 5 levels: [...path] -> files -> api -> routes -> src -> root
const STATIC_DIR = join(__dirname, '../../../../../static');

// Allowed base directory for equipment images
const EQUIPMENT_IMAGES_DIR = join(STATIC_DIR, 'images', 'equipment');

/**
 * Sanitize path segment to prevent directory traversal
 * Only keeps alphanumeric characters, underscores, hyphens, and dots
 */
function sanitizePathSegment(segment: string): string {
	return segment.replace(/[^a-zA-Z0-9_.-]/g, '');
}

/**
 * Validate that a path is within the equipment images directory
 * Returns true if safe, false if path traversal attempt detected
 */
function validatePathWithinDirectory(targetPath: string, basePath: string): boolean {
	const resolvedTarget = resolve(targetPath);
	const resolvedBase = resolve(basePath);
	const relativePath = relative(resolvedBase, resolvedTarget);

	// Check if path tries to escape the base directory
	return !relativePath.startsWith('..') && !relativePath.startsWith('/') && relativePath !== '';
}

/**
 * Find equipment by slug from equipment data
 */
async function findEquipmentBySlug(slug: string): Promise<{ id: string; images: string[] } | null> {
	try {
		// Dynamic import to avoid circular dependencies
		const { equipmentData } = await import('$lib/data/equipment-data');
		const equipment = equipmentData.find((item) => item.slug === slug);
		return equipment ? { id: equipment.id, images: equipment.images } : null;
	} catch (err) {
		console.error('Error loading equipment data:', err);
		return null;
	}
}

/**
 * GET handler - List all files for a piece of equipment
 * GET /api/files/[equipmentSlug]
 */
export async function GET({ params }: { params: { path: string } }) {
	try {
		// Extract equipment slug from path
		// In SvelteKit catch-all routes, [...path] becomes a string (not array)
		const pathParam = params.path;

		// Handle empty path
		if (!pathParam || pathParam.trim() === '') {
			return json({ error: 'Invalid path format. Expected: /api/files/[equipmentSlug]' }, { status: 400 });
		}

		// Split by '/' to get segments
		const pathSegments = pathParam.split('/').filter((s) => s.length > 0);

		// For GET handler, we expect exactly one segment (the equipment slug)
		if (pathSegments.length !== 1) {
			return json({ error: 'Invalid path format. Expected: /api/files/[equipmentSlug]' }, { status: 400 });
		}

		const equipmentSlug = pathSegments[0];

		// Sanitize the slug
		const sanitizedSlug = sanitizePathSegment(equipmentSlug);

		if (!sanitizedSlug) {
			return json({ error: 'Invalid equipment slug' }, { status: 400 });
		}

		// Construct directory path
		const equipmentDir = join(EQUIPMENT_IMAGES_DIR, sanitizedSlug);

		// Validate path is within allowed directory
		if (!validatePathWithinDirectory(equipmentDir, EQUIPMENT_IMAGES_DIR)) {
			return json({ error: 'Invalid path' }, { status: 403 });
		}

		// Check if directory exists
		try {
			await access(equipmentDir);
		} catch {
			return json({ error: 'Equipment directory not found' }, { status: 404 });
		}

		// Read directory for files
		const fileNames = await readdir(equipmentDir);

		// Find equipment data to determine main/gallery status
		const equipment = await findEquipmentBySlug(sanitizedSlug);

		// Build file metadata
		const files = await Promise.all(
			fileNames.map(async (fileName) => {
				const filePath = join(equipmentDir, fileName);
				const fileStat = await stat(filePath);

				// Check if this is a file (not a directory)
				if (!fileStat.isFile()) {
					return null;
				}

				const url = `/images/equipment/${sanitizedSlug}/${fileName}`;

				// Determine isMain and isGallery status
				let isMain = false;
				let isGallery = false;

				if (equipment && equipment.images) {
					const mainImage = equipment.images[0];
					isMain = mainImage === url;
					isGallery = equipment.images.includes(url) && !isMain;
				}

				return {
					name: fileName,
					url,
					isMain,
					isGallery,
					size: fileStat.size
				};
			})
		);

		// Filter out nulls (directories)
		const validFiles = files.filter((file): file is NonNullable<typeof file> => file !== null);

		// Sort: main image first, then gallery images, then other files
		validFiles.sort((a, b) => {
			if (a.isMain && !b.isMain) return -1;
			if (!a.isMain && b.isMain) return 1;
			if (a.isGallery && !b.isGallery) return -1;
			if (!a.isGallery && b.isGallery) return 1;
			return a.name.localeCompare(b.name);
		});

		return json({
			success: true,
			equipmentSlug: sanitizedSlug,
			files: validFiles,
			total: validFiles.length
		});
	} catch (err) {
		console.error('GET error:', err);
		return json(
			{ error: 'Internal server error', message: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 }
		);
	}
}

/**
 * DELETE handler - Delete a specific file
 * DELETE /api/files/[...path] (e.g., DELETE /api/files/equipment-001/uuid.jpg)
 */
export async function DELETE({ params }: { params: { path: string } }) {
	try {
		// Get the full relative path from the path parameter
		// In SvelteKit catch-all routes, [...path] becomes a string (not array)
		const pathParam = params.path;

		// Handle empty path
		if (!pathParam || pathParam.trim() === '') {
			return json({ error: 'Invalid path format' }, { status: 400 });
		}

		// Split by '/' to get segments
		const pathSegments = pathParam.split('/').filter((s) => s.length > 0);

		if (pathSegments.length === 0) {
			return json({ error: 'Invalid path format' }, { status: 400 });
		}

		// Join segments to get relative path (e.g., 'equipment-001/uuid.jpg')
		const relativePath = pathSegments.join('/');

		// Validate path doesn't contain directory traversal attempts
		if (relativePath.includes('..') || relativePath.startsWith('/')) {
			return json({ error: 'Path contains invalid characters' }, { status: 403 });
		}

		// Sanitize each path segment
		const sanitizedSegments = pathSegments.map((seg) => sanitizePathSegment(seg));
		if (sanitizedSegments.some((seg) => !seg)) {
			return json({ error: 'Invalid path segments' }, { status: 400 });
		}

		// Construct full file path
		const filePath = join(EQUIPMENT_IMAGES_DIR, ...sanitizedSegments);

		// Validate path is within allowed directory
		if (!validatePathWithinDirectory(filePath, EQUIPMENT_IMAGES_DIR)) {
			return json({ error: 'Invalid path: path traversal detected' }, { status: 403 });
		}

		// Check if file exists and is a file (not a directory)
		try {
			const fileStat = await stat(filePath);
			if (!fileStat.isFile()) {
				return json({ error: 'Path is not a file' }, { status: 400 });
			}
		} catch {
			return json({ error: 'File not found' }, { status: 404 });
		}

		// Delete the file
		try {
			await unlink(filePath);
		} catch (deleteErr) {
			console.error('Error deleting file:', deleteErr);
			return json({ error: 'Failed to delete file' }, { status: 500 });
		}

		return json({
			success: true,
			message: 'File deleted successfully',
			deletedPath: relativePath
		});
	} catch (err) {
		console.error('DELETE error:', err);
		return json(
			{ error: 'Internal server error', message: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 }
		);
	}
}
