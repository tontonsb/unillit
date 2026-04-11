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
}
</script>

<template>
	<span :class="tag" :title="titles[tag]">{{ labels[tag] ?? tag }}</span>
</template>

<style scoped>
span {
	font-size: 6.5px;
	font-weight: 700;
	padding: 0 3px;
	border-radius: 2px;
	line-height: 1.5;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

.obsolete { background: #fde8d8; color: #9a3412; border: 1px solid #fca97e; }
.rare     { background: #fef9c3; color: #854d0e; border: 1px solid #fde047; }
.vowel    { background: #ede9fe; color: #5b21b6; border: 1px solid #c4b5fd; }
.short    { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
.long     { background: #e8f0fe; color: #1a56a0; border: 1px solid #a8c4f0; }
</style>
