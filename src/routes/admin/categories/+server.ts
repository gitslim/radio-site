import { json, error } from '@sveltejs/kit';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { Category } from '$lib/data/category-data';
import type { Equipment } from '$lib/data/equipment';
import { generateSlug, validateCategory } from '$lib/admin/validation';

// Get directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to data files
const CATEGORY_DATA_PATH = join(__dirname, '../../../lib/data/category-data.ts');
const EQUIPMENT_DATA_PATH = join(__dirname, '../../../lib/data/equipment-data.ts');

/**
 * Parse category data from the TypeScript file
 */
async function parseCategoryData(): Promise<Category[]> {
	try {
		const content = await readFile(CATEGORY_DATA_PATH, 'utf-8');

		// Extract categoryData array from the TypeScript file
		const match = content.match(/export const categoryData: Category\[] = (\[[\s\S]*?\]);/);

		if (!match) {
			throw new Error('Could not find categoryData array in file');
		}

		let jsonStr = match[1];

		// Convert TypeScript array to valid JSON
		jsonStr = jsonStr.replace(/'/g, '"'); // Replace single quotes with double quotes
		jsonStr = jsonStr.replace(/(\w+):/g, '"$1":'); // Add quotes around property names
		jsonStr = jsonStr.replace(/\/\/.*$/gm, ''); // Remove comments
		jsonStr = jsonStr.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
		jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

		const categoryData = JSON.parse(jsonStr) as Category[];
		return categoryData;
	} catch (err) {
		console.error('Error parsing category data:', err);
		throw error(500, 'Failed to read category data');
	}
}

/**
 * Write category data back to the TypeScript file
 */
async function writeCategoryData(categoryData: Category[]): Promise<void> {
	try {
		const originalContent = await readFile(CATEGORY_DATA_PATH, 'utf-8');

		const dataString = JSON.stringify(categoryData, null, '\t').replace(/"/g, "'");

		const newContent = originalContent.replace(
			/export const categoryData: Category\[] = \[[\s\S]*?\];/,
			`export const categoryData: Category[] = ${dataString};`
		);

		await writeFile(CATEGORY_DATA_PATH, newContent, 'utf-8');
	} catch (err) {
		console.error('Error writing category data:', err);
		throw error(500, 'Failed to save category data');
	}
}

/**
 * Parse equipment data to check references
 */
async function parseEquipmentData(): Promise<Equipment[]> {
	try {
		const content = await readFile(EQUIPMENT_DATA_PATH, 'utf-8');

		const match = content.match(/export const equipmentData: Equipment\[] = (\[[\s\S]*?\]);/);

		if (!match) {
			throw new Error('Could not find equipmentData array in file');
		}

		let jsonStr = match[1];
		jsonStr = jsonStr.replace(/'/g, '"');
		jsonStr = jsonStr.replace(/(\w+):/g, '"$1":');
		jsonStr = jsonStr.replace(/\/\/.*$/gm, '');
		jsonStr = jsonStr.replace(/\/\*[\s\S]*?\*\//g, '');
		jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');

		const equipmentData = JSON.parse(jsonStr) as Equipment[];
		return equipmentData;
	} catch (err) {
		console.error('Error parsing equipment data:', err);
		throw error(500, 'Failed to read equipment data');
	}
}

/**
 * Count equipment items that reference a specific category
 * Checks against category name (current equipment data uses category names)
 */
async function countEquipmentByCategory(categoryName: string): Promise<number> {
	try {
		const equipmentData = await parseEquipmentData();
		return equipmentData.filter((item) => item.category === categoryName).length;
	} catch (err) {
		console.error('Error counting equipment by category:', err);
		return 0;
	}
}

/**
 * GET handler - List all categories
 */
export async function GET() {
	try {
		const categories = await parseCategoryData();
		return json(categories);
	} catch (err) {
		console.error('GET error:', err);
		throw error(500, 'Failed to fetch category data');
	}
}

/**
 * POST handler - Create new category
 */
export async function POST({ request }: { request: Request }) {
	try {
		const newCategory = await request.json();

		// Auto-generate slug from name if not provided
		if (!newCategory.slug && newCategory.name) {
			newCategory.slug = generateSlug(newCategory.name);
		}

		// Auto-generate id from name if not provided
		if (!newCategory.id && newCategory.name) {
			newCategory.id = generateSlug(newCategory.name);
		}

		// Validate data
		const validation = validateCategory(newCategory);
		if (!validation.valid) {
			return json(
				{ error: 'Validation failed', details: validation.errors },
				{ status: 400 }
			);
		}

		// Check if ID already exists
		const categories = await parseCategoryData();
		const existing = categories.find((item) => item.id === newCategory.id);

		if (existing) {
			return json(
				{ error: `Category with id '${newCategory.id}' already exists` },
				{ status: 400 }
			);
		}

		// Add new category
		const updatedCategories = [...categories, newCategory as Category];
		await writeCategoryData(updatedCategories);

		return json(newCategory, { status: 201 });
	} catch (err) {
		console.error('POST error:', err);
		throw error(500, 'Failed to create category');
	}
}

/**
 * PUT handler - Update category
 */
export async function PUT({ request }: { request: Request }) {
	try {
		const updatedCategory = await request.json();

		// Auto-generate slug from name if name changed
		const categories = await parseCategoryData();
		const existingCategory = categories.find((item) => item.id === updatedCategory.id);

		if (existingCategory && existingCategory.name !== updatedCategory.name) {
			updatedCategory.slug = generateSlug(updatedCategory.name);
		}

		// Validate data
		const validation = validateCategory(updatedCategory);
		if (!validation.valid) {
			return json(
				{ error: 'Validation failed', details: validation.errors },
				{ status: 400 }
			);
		}

		// Find and update category
		const index = categories.findIndex((item) => item.id === updatedCategory.id);

		if (index === -1) {
			return json(
				{ error: `Category with id '${updatedCategory.id}' not found` },
				{ status: 404 }
			);
		}

		// Update category
		categories[index] = updatedCategory as Category;
		await writeCategoryData(categories);

		return json(updatedCategory);
	} catch (err) {
		console.error('PUT error:', err);
		throw error(500, 'Failed to update category');
	}
}

/**
 * DELETE handler - Delete category
 */
export async function DELETE({ url }: { url: URL }) {
	try {
		const id = url.searchParams.get('id');

		if (!id) {
			return json({ error: 'id query parameter is required' }, { status: 400 });
		}

		// Find category to get its name
		const categories = await parseCategoryData();
		const category = categories.find((item) => item.id === id);

		if (!category) {
			return json({ error: `Category with id '${id}' not found` }, { status: 404 });
		}

		// Check for equipment references (equipment data uses category names)
		const equipmentCount = await countEquipmentByCategory(category.name);

		if (equipmentCount > 0) {
			return json(
				{
					error: `Cannot delete category '${category.name}' because it is associated with ${equipmentCount} equipment item(s)`,
					equipmentCount
				},
				{ status: 400 }
			);
		}

		// Remove category
		const index = categories.findIndex((item) => item.id === id);
		categories.splice(index, 1);
		await writeCategoryData(categories);

		return json({
			success: true,
			message: `Category with id '${id}' deleted successfully`
		});
	} catch (err) {
		console.error('DELETE error:', err);
		throw error(500, 'Failed to delete category');
	}
}
