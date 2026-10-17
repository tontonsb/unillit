<script lang="ts">
export type Swatch = 'orange' | 'yellow' | 'amber' | 'blue' | 'steel' | 'red' | 'green' | 'violet'

export interface BadgeDef {
	label: string
	title: string
	swatch: Swatch
}

export const lengthBadges = {
	short: { label: 's', title: 'Short vowel', swatch: 'amber' },
	long: { label: 'l', title: 'Long vowel', swatch: 'blue' },
} satisfies Record<string, BadgeDef>
</script>

<script setup lang="ts">
defineProps<BadgeDef>()
</script>

<template>
	<span :class="swatch" :title="title">{{ label }}</span>
</template>

<style scoped>
/* metrics mirror LangBadge so all badges read as one family */
span {
	font-size: 0.6em;
	font-weight: 700;
	padding: 0 var(--sp-2);
	border-radius: var(--radius-sm);
	line-height: 1.5;
	vertical-align: middle;
	text-transform: uppercase;
	letter-spacing: var(--tracking-caps);
}

/* docs/badge-palette-options.md */
.orange { background: #fde8d8; color: #9a3412; border: 1px solid #fca97e; }
.yellow { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
.amber { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
.blue { background: #e8f0fe; color: #1a56a0; border: 1px solid #a8c4f0; }
.steel { background: #ddeaf5; color: #1a5c8a; border: 1px solid #a9c9e2; }
.red { background: #fbe5e7; color: #a52834; border: 1px solid #f0b3ba; }
.green { background: #e3f2e5; color: #2e7d32; border: 1px solid #abd5af; }
.violet { background: #ede9fe; color: #5b21b6; border: 1px solid #c4b5fd; }
</style>
