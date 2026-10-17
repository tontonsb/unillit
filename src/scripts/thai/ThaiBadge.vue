<script lang="ts">
import { lengthBadges, type BadgeDef } from '@/components/CharBadge.vue'

const badges = {
	...lengthBadges,
	obsolete: { label: 'obs', title: 'Obsolete character', swatch: 'orange' },
	rare: { label: 'rare', title: 'Rare character', swatch: 'yellow' },
	mid: { label: 'mid', title: 'Mid-class consonant (affects tone)', swatch: 'steel' },
	high: { label: 'high', title: 'High-class consonant (affects tone)', swatch: 'red' },
	low: { label: 'low', title: 'Low-class consonant (affects tone)', swatch: 'green' },
	open: { label: 'cv', title: 'CV syllable — next char belongs to next syllable', swatch: 'green' },
	prefinal: { label: 'cv_', title: 'CVC syllable — next char will complete this syllable', swatch: 'red' },

	/* both mark a glyph that carries the other category inside it */
	vowel: { label: 'vow', title: 'Can also form a vowel/diphthong pattern', swatch: 'violet' },
	selfclosed: { label: 'cvc', title: 'Complete CVC syllable — next char belongs to next syllable', swatch: 'violet' },
} satisfies Record<string, BadgeDef>

export type ThaiTag = keyof typeof badges
</script>

<script setup lang="ts">
import CharBadge from '@/components/CharBadge.vue'

defineProps<{ tag: ThaiTag }>()
</script>

<template>
	<CharBadge v-bind="badges[tag]" />
</template>
