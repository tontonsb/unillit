<script setup lang="ts">
defineProps<{ fonts: { id: string, label: string }[] }>()
const model = defineModel<string>({ required: true })
</script>

<template>
	<div class="font-picker">
		<label class="picker-label">Font</label>
		<select v-model="model" class="picker-select">
			<option v-for="f in fonts" :key="f.id" :value="f.id">{{ f.label }}</option>
		</select>
	</div>
</template>

<style scoped>
.font-picker {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-left: auto;
	flex-shrink: 0;
}

.picker-label {
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.07em;
	color: var(--c-muted);
}

.picker-select {
	font-size: 12px;
	font-family: var(--sans);
	color: var(--c-head);
	background: var(--c-cell);
	border: 1px solid var(--c-border);
	border-radius: 3px;
	padding: 2px 4px;
	cursor: pointer;
}

.picker-select:focus {
	outline: 1px solid var(--c-accent);
}
</style>
