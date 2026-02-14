# ParallaxHero Component

A flexible, production-ready hero section with parallax scrolling effect for SvelteKit applications.

## Features

- **Parallax Effect**: Smooth parallax scrolling using GPU-accelerated transforms
- **Scroll Reveal Animation**: Integrated ScrollReveal component for content animations
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Flexible Content**: Slot-based API for maximum flexibility or use props for quick setup
- **Accessibility**: Proper ARIA labels and reduced motion support
- **Performance**: Uses `will-change` and `translate3d` for hardware acceleration
- **Svelte 5 Runes**: Built with Svelte 5 runes ($props, $state)

## Installation

The component is already included in your project at:
```
src/lib/components/hero/ParallaxHero.svelte
```

## Required Image

Make sure the hero image is available at:
```
static/images/hero-cinema.jpg
```

The component uses the highest quality image from `/tmp/parallax/1_converted.jpg` (copied to static folder).

## Usage

### Basic Usage with Props

```svelte
<script>
	import ParallaxHero from '$lib/components/hero/ParallaxHero.svelte';
</script>

<ParallaxHero
	title="Аренда профессионального оборудования для съемок"
	subtitle="Высококачественное оборудование, проверенное временем и профессионалами"
	ctaText="Перейти в каталог"
	ctaLink="/equipment"
/>
```

### Using Slot for Custom Content

```svelte
<script>
	import ParallaxHero from '$lib/components/hero/ParallaxHero.svelte';
</script>

<ParallaxHero title="Почему выбираем нас?" align="center">
	<div class="max-w-4xl text-center">
		<h2 class="text-6xl font-bold text-white mb-6">
			Почему выбирают нас?
		</h2>
		<p class="text-2xl text-gray-100 mb-8">
			Опыт, качество и надежность
		</p>
		<div class="grid grid-cols-3 gap-6">
			<div class="bg-white/10 p-6 rounded-lg">
				<h3 class="text-xl font-bold">10+ лет опыта</h3>
			</div>
			<!-- More cards... -->
		</div>
	</div>
</ParallaxHero>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | `'/images/hero-cinema.jpg'` | Path to hero image |
| `speed` | `number` | `0.3` | Parallax speed multiplier (0.1-1.0) |
| `title` | `string` | - | Main headline |
| `subtitle` | `string` | - | Optional subheadline |
| `ctaText` | `string` | - | CTA button text |
| `ctaLink` | `string` | - | CTA button link |
| `animationDirection` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | ScrollReveal animation direction |
| `animationDelay` | `number` | `0` | Animation delay in milliseconds |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Content alignment |
| `children` | `Snippet` | - | Custom slot content |

## Technical Details

### Parallax Implementation

The component uses `ParallaxSection` internally which:
- Implements JavaScript-based parallax with scroll listeners
- Uses `requestAnimationFrame` for smooth performance
- Applies `translate3d` transforms for hardware acceleration
- Respects `prefers-reduced-motion` preference
- Uses `will-change: transform` for performance optimization

### Scroll Reveal

The content is wrapped in `ScrollReveal` which:
- Uses IntersectionObserver API for viewport detection
- Supports animation direction and delay
- Respects `prefers-reduced-motion` preference
- Has smooth 700ms transitions

### Responsive Breakpoints

- **Mobile**: 60vh height
- **Desktop (md+)**: 80vh height
- **Text size**: Scales from text-3xl (mobile) to text-6xl (xl+)

### Gradient Overlay

The overlay uses:
```
bg-gradient-to-br from-black/70 via-black/40 to-black/60
```

This provides excellent text readability while maintaining visual interest.

## Examples

See the demo page at `/parallax-hero-demo` for:
- Basic usage with props
- Slot-based custom content
- Different alignment options
- Different parallax speeds
- Multiple sections demonstrating scroll behavior

## Accessibility

- **ARIA Labels**: Proper `aria-label` on section
- **Reduced Motion**: Respects user preferences
- **Alt Text**: Image marked as decorative with `aria-hidden="true"`
- **Keyboard Navigation**: CTA button is keyboard accessible

## Browser Support

Works in all modern browsers that support:
- ES6+ (Svelte 5 requirement)
- CSS Grid and Flexbox
- IntersectionObserver API
- CSS Transforms

## Dependencies

Internal dependencies:
- `$lib/components/animations/ParallaxSection.svelte`
- `$lib/components/animations/ScrollReveal.svelte`
- `$lib/components/ui/button`
- `$lib/utils.js` (for `cn()` utility)

## Performance Tips

1. **Image Optimization**: Use WebP format for production
2. **Parallax Speed**: Keep speed between 0.1-0.5 for best performance
3. **Reduced Motion**: Component automatically handles `prefers-reduced-motion`
4. **Hardware Acceleration**: Uses `translate3d` and `will-change` internally

## Troubleshooting

### Image Not Loading

Make sure the image exists at `static/images/hero-cinema.jpg`. The image was copied from `/tmp/parallax/1_converted.jpg`.

### Parallax Not Working

- Check browser console for errors
- Verify JavaScript is enabled
- Check if reduced motion is enabled in browser settings

### Text Not Readable

The gradient overlay should provide sufficient contrast. If needed, adjust the overlay opacity in the component or pass a custom overlay through the slot.

## License

Part of the cinema equipment website project.
