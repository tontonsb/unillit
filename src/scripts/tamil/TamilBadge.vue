<script lang="ts">
import { lengthBadges, type BadgeDef } from '@/components/CharBadge.vue'

const badges = {
	...lengthBadges,
	vowel: { label: 'vow', title: 'Standalone vowel', swatch: 'violet' },
} satisfies Record<string, BadgeDef>

export type TamilTag = keyof typeof badges
</script>

<script setup lang="ts">
import CharBadge from '@/components/CharBadge.vue'

defineProps<{ tag: TamilTag }>()
</script>

<template>
	<CharBadge v-bind="badges[tag]" />
</template>
