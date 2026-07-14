<script setup lang="ts">
defineProps<{ tag: string }>()

const labels: Record<string, string> = {
	obsolete: 'obs',
	vowel: 'vow',
	short: 's',
	long: 'l',
}

const titles: Record<string, string> = {
	obsolete: 'Obsolete character',
	rare: 'Rare character',
	vowel: 'Can also form a vowel/diphthong pattern',
	short: 'Short vowel',
	long: 'Long vowel',
	mid: 'Mid-class consonant (affects tone)',
	high: 'High-class consonant (affects tone)',
	low: 'Low-class consonant (affects tone)',
}
</script>

<template>
	<span :class="tag" :title="titles[tag]">{{ labels[tag] ?? tag }}</span>
</template>

<style scoped>
/* metrics mirror LangBadge so all badges read as one family */
span {
	font-size: 0.6em;
	font-weight: 700;
	padding: 0 3px;
	border-radius: var(--radius-sm);
	line-height: 1.5;
	vertical-align: middle;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

.obsolete { background: #fde8d8; color: #9a3412; border: 1px solid #fca97e; }
.rare     { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
.vowel    { background: #ede9fe; color: #5b21b6; border: 1px solid #c4b5fd; }
.short    { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
.long     { background: #e8f0fe; color: #1a56a0; border: 1px solid #a8c4f0; }

/* consonant classes — the former cell-fill colors, badge-scale */
.mid  { background: #ddeaf5; color: #1a5c8a; border: 1px solid #a9c9e2; }
.high { background: #fbe5e7; color: #a52834; border: 1px solid #f0b3ba; }
.low  { background: #e3f2e5; color: #2e7d32; border: 1px solid #abd5af; }
</style>
