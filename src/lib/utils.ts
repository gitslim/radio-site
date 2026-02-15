import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Transliterate Cyrillic to Latin and create URL-safe slug
 * @param text - Input text (can contain Cyrillic)
 * @returns URL-safe slug (a-z, 0-9, hyphens only)
 */
export function slugify(text: string): string {
	const translitMap: Record<string, string> = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
		'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k',
		'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
		'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
		'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
		'э': 'e', 'ю': 'yu', 'я': 'ya'
	};

	return text
		.toLowerCase()
		.trim()
		// Transliterate Cyrillic to Latin
		.replace(/[а-яё]/g, (char) => translitMap[char] || char)
		// Remove all non-ASCII-alphanumeric except spaces and hyphens
		.replace(/[^a-z0-9\s-]/g, '')
		// Replace spaces with hyphens
		.replace(/\s+/g, '-')
		// Collapse multiple hyphens
		.replace(/-+/g, '-')
		// Trim hyphens from ends
		.replace(/^-+|-+$/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
