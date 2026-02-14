#!/usr/bin/env tsx
/**
 * Cleanup Orphaned Images Script
 * 
 * This script identifies and optionally deletes image files in /static/images/equipment/
 * that are not referenced in equipment-data.ts.
 * 
 * Usage:
 *   Dry run (list only): npx tsx scripts/cleanup-orphaned-images.ts
 *   Delete orphans:       npx tsx scripts/cleanup-orphaned-images.ts --delete
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ANSI color codes for console output
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	gray: '\x1b[90m'
};

// Console helpers with emojis
const log = {
	info: (msg: string) => console.log(`${colors.blue}ℹ️${colors.reset} ${msg}`),
	success: (msg: string) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
	warning: (msg: string) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
	error: (msg: string) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
	file: (msg: string) => console.log(`${colors.gray}  📄${colors.reset} ${msg}`),
	deleted: (msg: string) => console.log(`${colors.green}  🗑️${colors.reset} Deleted: ${msg}`),
	header: () => console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`),
	section: (msg: string) => console.log(`\n${colors.magenta}▶${colors.reset} ${msg}`)
};

// Parse CLI arguments
const args = process.argv.slice(2);
const shouldDelete = args.includes('--delete');

/**
 * Read equipment-data.ts and extract referenced image paths
 */
async function getReferencedImagePaths(): Promise<Set<string>> {
	const equipmentDataPath = path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		'../src/lib/data/equipment-data.ts'
	);

	log.info(`Reading equipment data from: ${equipmentDataPath}`);

	const content = await fs.readFile(equipmentDataPath, 'utf-8');

	// Extract image paths using regex
	const imageRegex = /images:\s*\[([^\]]+)\]/g;
	const pathRegex = /['"]([^'"]+)['"]/g;

	const referencedPaths = new Set<string>();

	let match: RegExpExecArray | null;
	while ((match = imageRegex.exec(content)) !== null) {
		const imagesArray = match[1];
		let pathMatch: RegExpExecArray | null;
		while ((pathMatch = pathRegex.exec(imagesArray)) !== null) {
			const imagePath = pathMatch[1];
			// Store the path relative to static/ directory
			if (imagePath.startsWith('/images/')) {
				referencedPaths.add(imagePath.substring(1)); // Remove leading /
			}
		}
	}

	return referencedPaths;
}

/**
 * Recursively scan a directory and return all file paths
 */
async function scanDirectory(dir: string, basePath: string = dir): Promise<string[]> {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		const files: string[] = [];

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				const subFiles = await scanDirectory(fullPath, basePath);
				files.push(...subFiles);
			} else if (entry.isFile()) {
				// Get relative path from basePath
				const relativePath = path.relative(basePath, fullPath);
				// Normalize to use forward slashes (web-style)
				files.push(relativePath.replace(/\\/g, '/'));
			}
		}

		return files;
	} catch (error) {
		log.error(`Error scanning directory ${dir}: ${error}`);
		return [];
	}
}

/**
 * Check if file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Delete a file
 */
async function deleteFile(filePath: string): Promise<boolean> {
	try {
		await fs.unlink(filePath);
		return true;
	} catch (error) {
		log.error(`Failed to delete ${filePath}: ${error}`);
		return false;
	}
}

/**
 * Get human-readable file size
 */
function formatFileSize(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Main execution function
 */
async function main() {
	log.header();
	log.info('🧹 Orphaned Images Cleanup Script');
	log.header();

	// Paths
	const staticImagesDir = path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		'../static/images/equipment'
	);

	log.section('Configuration');
	log.info(`Scanning directory: ${staticImagesDir}`);
	log.info(`Mode: ${shouldDelete ? `${colors.red}DELETE MODE${colors.reset}` : `${colors.yellow}DRY RUN${colors.reset}`}`);

	try {
		// Check if directory exists
		if (!(await fileExists(staticImagesDir))) {
			log.error(`Directory does not exist: ${staticImagesDir}`);
			process.exit(1);
		}

		// Step 1: Get referenced image paths
		log.section('Step 1: Reading Equipment Data');
		const referencedPaths = await getReferencedImagePaths();
		log.success(`Found ${referencedPaths.size} referenced image(s) in equipment-data.ts`);

		if (referencedPaths.size > 0) {
			referencedPaths.forEach((refPath) => log.file(refPath));
		}

		// Step 2: Scan actual files on disk
		log.section('Step 2: Scanning Disk Files');
		const actualFiles = await scanDirectory(staticImagesDir);
		log.success(`Found ${actualFiles.length} file(s) in /static/images/equipment/`);

		// Step 3: Identify orphaned files
		log.section('Step 3: Identifying Orphaned Files');
		const orphanedFiles: Array<{ path: string; fullPath: string; size: number }> = [];
		let totalOrphanedSize = 0;

		for (const actualFile of actualFiles) {
			const actualPath = `images/equipment/${actualFile}`;

			// File is orphaned if it's not in referenced paths
			if (!referencedPaths.has(actualPath)) {
				const fullPath = path.join(staticImagesDir, actualFile);
				const stats = await fs.stat(fullPath);
				orphanedFiles.push({ path: actualFile, fullPath, size: stats.size });
				totalOrphanedSize += stats.size;
			}
		}

		// Step 4: Display results
		log.section('Step 4: Results');
		console.log('');

		if (orphanedFiles.length === 0) {
			log.success('🎉 No orphaned files found! All images are referenced.');
			console.log('');
			process.exit(0);
		}

		// Summary
		log.warning(`⚠️ Found ${orphanedFiles.length} orphaned file(s)`);
		log.info(`Total space used: ${formatFileSize(totalOrphanedSize)}`);

		console.log('');
		log.section('Orphaned Files List');

		// Display each orphaned file
		for (const orphan of orphanedFiles) {
			log.file(`${orphan.path} (${formatFileSize(orphan.size)})`);
		}

		// Step 5: Delete or confirm (if --delete flag)
		if (shouldDelete) {
			log.section('Step 5: Deleting Orphaned Files');
			console.log('');
			log.warning('🚨 DELETION MODE ACTIVE - Files will be permanently deleted!');
			console.log('');

			// Delete files
			let deletedCount = 0;
			let failedCount = 0;

			for (const orphan of orphanedFiles) {
				const success = await deleteFile(orphan.fullPath);
				if (success) {
					log.deleted(orphan.path);
					deletedCount++;
				} else {
					failedCount++;
				}
			}

			// Final summary
			console.log('');
			log.section('Final Summary');
			if (deletedCount > 0) {
				log.success(`✅ Deleted ${deletedCount} file(s) successfully`);
			}
			if (failedCount > 0) {
				log.error(`❌ Failed to delete ${failedCount} file(s)`);
			}
			log.info(`Space freed: ${formatFileSize(totalOrphanedSize)}`);
		} else {
			// Dry run mode
			console.log('');
			log.section('Dry Run Summary');
			log.info('Run with --delete flag to actually delete these files:');
			console.log('');
			log.info(`${colors.cyan}npx tsx scripts/cleanup-orphaned-images.ts --delete${colors.reset}`);
			console.log('');
		}

		log.header();
		log.success('✨ Script completed successfully');
		log.header();

		process.exit(0);
	} catch (error) {
		log.error(`Fatal error: ${error}`);
		process.exit(1);
	}
}

// Run main function
main();
