import { json, error } from '@sveltejs/kit';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the static directory (at project root where SvelteKit serves static files)
const STATIC_DIR = join(process.cwd(), 'static');

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const WEBP_QUALITY = 80;
const MAX_IMAGE_WIDTH = 1920;

/**
 * Sanitize filename to prevent path traversal attacks
 * Only keeps alphanumeric characters, underscores, hyphens, and dots
 */
function sanitizeFilename(filename: string): string {
	return filename.replace(/[^a-zA-Z0-9_.-]/g, '');
}

/**
 * Validate file size
 */
function validateFileSize(size: number): boolean {
	return size <= MAX_FILE_SIZE;
}

/**
 * Validate MIME type
 */
function validateMimeType(mimeType: string): boolean {
	return ALLOWED_MIME_TYPES.includes(mimeType);
}

/**
 * Get file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
	const extensions: Record<string, string> = {
		'image/jpeg': '.jpg',
		'image/png': '.png',
		'image/webp': '.webp',
		'image/avif': '.avif',
		'image/gif': '.gif'
	};

	return extensions[mimeType] || '.bin';
}

/**
 * POST handler - Upload file
 */
export async function POST({ request }: { request: Request }) {
	try {
		// Parse form data
		const formData = await request.formData();

		// Extract fields
		const file = formData.get('file') as File;
		const equipmentSlug = formData.get('equipmentSlug') as string;
		const type = formData.get('type') as string;

		// Validate required fields
		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		if (!equipmentSlug) {
			return json({ error: 'equipmentSlug is required' }, { status: 400 });
		}

		if (!type || (type !== 'main' && type !== 'gallery')) {
			return json({ error: 'type must be either "main" or "gallery"' }, { status: 400 });
		}

		// Validate file size
		if (!validateFileSize(file.size)) {
			return json(
				{
					error: 'File size exceeds limit',
					maxSize: MAX_FILE_SIZE,
					actualSize: file.size
				},
				{ status: 413 } // Payload Too Large
			);
		}

		// Validate MIME type
		if (!validateMimeType(file.type)) {
			return json(
				{
					error: 'Invalid file type',
					allowedTypes: ALLOWED_MIME_TYPES,
					actualType: file.type
				},
				{ status: 415 } // Unsupported Media Type
			);
		}

		// Sanitize equipment slug to prevent path traversal
		const sanitizedSlug = sanitizeFilename(equipmentSlug);

		if (!sanitizedSlug) {
			return json({ error: 'Invalid equipment slug' }, { status: 400 });
		}

		// Generate unique filename (always WebP after optimization)
		const uniqueFilename = `${randomUUID()}.webp`;

		// Create directory path
		const uploadDir = join(STATIC_DIR, 'images', 'equipment', sanitizedSlug);

		// Ensure directory exists
		try {
			await mkdir(uploadDir, { recursive: true });
		} catch (mkdirErr) {
			console.error('Error creating directory:', mkdirErr);
			return json({ error: 'Failed to create upload directory' }, { status: 500 });
		}

		// Optimize and save as WebP using Sharp
		const filePath = join(uploadDir, uniqueFilename);
		const fileBuffer = Buffer.from(await file.arrayBuffer());

		try {
			await sharp(fileBuffer)
				.resize(MAX_IMAGE_WIDTH, undefined, {
					fit: 'inside',
					withoutEnlargement: true
				})
				.webp({ quality: WEBP_QUALITY })
				.toFile(filePath);
		} catch (sharpErr) {
			console.error('Error optimizing image with Sharp:', sharpErr);
			return json({ error: 'Failed to optimize image' }, { status: 500 });
		}

		// Generate URL path (relative to static directory)
		const fileUrl = `/images/equipment/${sanitizedSlug}/${uniqueFilename}`;

		// Return success response with file metadata
		return json({
			success: true,
			fileUrl,
			filename: uniqueFilename,
			size: file.size,
			mimeType: 'image/webp' // Always WebP after optimization
		});
	} catch (err) {
		console.error('POST error:', err);
		return json(
			{ error: 'Internal server error', message: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 }
		);
	}
}
