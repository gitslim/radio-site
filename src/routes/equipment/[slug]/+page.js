import { equipmentData } from '$lib/data/equipment-data';
import { error } from '@sveltejs/kit';

// Disable prerendering for dynamic routes (using SPA mode with fallback)
export const prerender = false;

export function load({ params }) {
	const { slug } = params;

	// Find equipment by slug
	const equipment = equipmentData.find((item) => item.slug === slug);

	// Return 404 if equipment not found
	if (!equipment) {
		error(404, 'Оборудование не найдено');
	}

	// Get related equipment
	const relatedEquipment = equipment.relatedIds
		?.map((id) => equipmentData.find((item) => item.id === id))
		.filter((item) => item !== undefined)
		.slice(0, 4) || [];

	return {
		equipment,
		relatedEquipment
	};
}
