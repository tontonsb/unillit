<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ fonts: { id: string, label: string }[] }>()
const model = defineModel<string>({ required: true })

const id = useId()
</script>

<template>
	<div class="font-picker">
		<label class="picker-label" :for="id">Font</label>
		<select :id v-model="model" class="picker-select">
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
	font-size: var(--fs-micro);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.07em;
	color: var(--c-muted);
}

.picker-select {
	font-size: var(--fs-12);
	font-family: var(--sans);
	color: var(--c-head);
	background: var(--c-cell);
	border: 1px solid var(--c-border);
	border-radius: var(--radius);
	padding: 2px 4px;
	cursor: pointer;
}

</style>
