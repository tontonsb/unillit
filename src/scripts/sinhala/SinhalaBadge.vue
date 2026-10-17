<script lang="ts">
import { lengthBadges, type BadgeDef } from '@/components/CharBadge.vue'

const badges = {
	...lengthBadges,
	vowel: { label: 'vow', title: 'Standalone vowel', swatch: 'violet' },
	oddU: { label: 'u', title: 'Non-standard u diacritic shape', swatch: 'green' },
	fusedAl: { label: 'al', title: 'Al-lakuna ◌් joins into the top arc', swatch: 'red' },
} satisfies Record<string, BadgeDef>

export type SinhalaTag = keyof typeof badges
</script>

<script setup lang="ts">
import CharBadge from '@/components/CharBadge.vue'

defineProps<{ tag: SinhalaTag }>()
</script>

<template>
	<CharBadge v-bind="badges[tag]" />
</template>
