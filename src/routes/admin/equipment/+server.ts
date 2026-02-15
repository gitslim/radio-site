import { json, error } from '@sveltejs/kit';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { Equipment } from '$lib/data/equipment';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the equipment data file (go up from src/routes/admin/equipment to src/lib/data)
const DATA_FILE_PATH = join(__dirname, '../../../lib/data/equipment-data.ts');

/**
 * Validate equipment data structure
 */
function validateEquipment(data: Partial<Equipment>): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	// Required fields
	if (!data.id || typeof data.id !== 'string' || data.id.trim() === '') {
		errors.push('id is required and must be a non-empty string');
	}

	if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
		errors.push('name is required and must be a non-empty string');
	}

	if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
		errors.push('slug is required and must be a non-empty string');
	}

	// Validate slug format (lowercase, alphanumeric, hyphens only)
	const slugRegex = /^[a-z0-9-]+$/;
	if (data.slug && !slugRegex.test(data.slug)) {
		errors.push('slug must contain only lowercase letters, numbers, and hyphens');
	}

	if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
		errors.push('category is required and must be a non-empty string');
	}

	if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
		errors.push('description is required and must be a non-empty string');
	}

	if (!data.images || !Array.isArray(data.images)) {
		errors.push('images is required and must be an array');
	}

	if (!data.specifications || !Array.isArray(data.specifications)) {
		errors.push('specifications is required and must be an array');
	}

	if (typeof data.available !== 'boolean') {
		errors.push('available is required and must be a boolean');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

/**
 * Parse equipment data from the TypeScript file
 */
async function parseEquipmentData(): Promise<Equipment[]> {
	try {
		const content = await readFile(DATA_FILE_PATH, 'utf-8');

		// Extract the equipmentData array from the TypeScript file
		const match = content.match(/export const equipmentData: Equipment\[] = (\[[\s\S]*?\]);/);

		if (!match) {
			throw new Error('Could not find equipmentData array in file');
		}

		let jsonStr = match[1];

		// Convert TypeScript array to valid JSON
		// 1. Replace single quotes with double quotes
		jsonStr = jsonStr.replace(/'/g, '"');

		// 2. Add quotes around property names (they're unquoted in TypeScript objects)
		//    This regex matches property names followed by a colon and adds quotes
		jsonStr = jsonStr.replace(/(\w+):/g, '"$1":');

		// 3. Remove TypeScript comments if any
		jsonStr = jsonStr.replace(/\/\/.*$/gm, '');
		jsonStr = jsonStr.replace(/\/\*[\s\S]*?\*\//g, '');

		// 4. Remove trailing commas (common in TypeScript but not valid in JSON)
		jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');

		// Parse as JSON
		const equipmentData = JSON.parse(jsonStr) as Equipment[];

		return equipmentData;
	} catch (err) {
		console.error('Error parsing equipment data:', err);
		throw error(500, 'Failed to read equipment data');
	}
}

/**
 * Write equipment data back to the TypeScript file
 */
async function writeEquipmentData(equipmentData: Equipment[]): Promise<void> {
	try {
		const originalContent = await readFile(DATA_FILE_PATH, 'utf-8');

		// Convert equipment data to a formatted string with single quotes for TypeScript
		// Note: JSON.stringify already includes the array brackets
		const dataString = JSON.stringify(equipmentData, null, '\t')
			// Convert double quotes back to single quotes for TypeScript
			.replace(/"/g, "'");

		// Replace the equipmentData array in the original file
		// The regex captures [ and ] as part of the pattern, so we just replace the whole thing
		const newContent = originalContent.replace(
			/export const equipmentData: Equipment\[] = \[[\s\S]*?\];/,
			`export const equipmentData: Equipment[] = ${dataString};`
		);

		await writeFile(DATA_FILE_PATH, newContent, 'utf-8');
	} catch (err) {
		console.error('Error writing equipment data:', err);
		throw error(500, 'Failed to save equipment data');
	}
}

/**
 * GET handler - List all equipment
 */
export async function GET() {
	try {
		const equipmentData = await parseEquipmentData();
		return json(equipmentData);
	} catch (err) {
		console.error('GET error:', err);
		throw error(500, 'Failed to fetch equipment data');
	}
}

/**
 * POST handler - Create new equipment
 */
export async function POST({ request }: { request: Request }) {
	try {
		const newEquipment = await request.json();

		// Validate the data
		const validation = validateEquipment(newEquipment);
		if (!validation.valid) {
			return json(
				{ error: 'Validation failed', details: validation.errors },
				{ status: 400 }
			);
		}

		// Check if ID already exists
		const equipmentData = await parseEquipmentData();
		const existing = equipmentData.find((item) => item.id === newEquipment.id);

		if (existing) {
			return json(
				{ error: `Equipment with id '${newEquipment.id}' already exists` },
				{ status: 400 }
			);
		}

		// Add new equipment
		const updatedData = [...equipmentData, newEquipment as Equipment];
		await writeEquipmentData(updatedData);

		return json(newEquipment, { status: 201 });
	} catch (err) {
		console.error('POST error:', err);
		throw error(500, 'Failed to create equipment');
	}
}

/**
 * PUT handler - Update equipment
 */
export async function PUT({ request }: { request: Request }) {
	try {
		const updatedEquipment = await request.json();

		// Validate the data
		const validation = validateEquipment(updatedEquipment);
		if (!validation.valid) {
			return json(
				{ error: 'Validation failed', details: validation.errors },
				{ status: 400 }
			);
		}

		// Find and update equipment
		const equipmentData = await parseEquipmentData();
		const index = equipmentData.findIndex((item) => item.id === updatedEquipment.id);

		if (index === -1) {
			return json(
				{ error: `Equipment with id '${updatedEquipment.id}' not found` },
				{ status: 404 }
			);
		}

		// Update the equipment
		equipmentData[index] = updatedEquipment as Equipment;
		await writeEquipmentData(equipmentData);

		return json(updatedEquipment);
	} catch (err) {
		console.error('PUT error:', err);
		throw error(500, 'Failed to update equipment');
	}
}

/**
 * DELETE handler - Delete equipment
 */
export async function DELETE({ url }: { url: URL }) {
	try {
		// Get id from query parameters
		const id = url.searchParams.get('id');

		if (!id) {
			return json({ error: 'id query parameter is required' }, { status: 400 });
		}

		// Find and delete equipment
		const equipmentData = await parseEquipmentData();
		const index = equipmentData.findIndex((item) => item.id === id);

		if (index === -1) {
			return json({ error: `Equipment with id '${id}' not found` }, { status: 404 });
		}

		// Save images for deletion before removing from array
		const deletedItem = equipmentData[index];
		const imagesToDelete = deletedItem.images || [];

		// Remove the equipment
		equipmentData.splice(index, 1);
		await writeEquipmentData(equipmentData);

		// Delete physical image files after successful data write
		for (const imageUrl of imagesToDelete) {
			// imageUrl format: /images/equipment/filename.jpg
			const relativePath = imageUrl.replace('/images/equipment/', '');
			const filePath = join(process.cwd(), 'static/images/equipment', relativePath);
			try {
				await unlink(filePath);
				console.log('Deleted file:', filePath);
			} catch (e) {
				// File might already not exist — that's ok
				console.warn('Could not delete file:', filePath, (e as Error).message);
			}
		}

		return json({ success: true, message: `Equipment with id '${id}' deleted successfully` });
	} catch (err) {
		console.error('DELETE error:', err);
		throw error(500, 'Failed to delete equipment');
	}
}
