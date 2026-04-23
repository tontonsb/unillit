<script setup lang="ts">
import { thaiFonts, activeThaiFontId } from './font'
</script>

<template>
	<div class="font-picker">
		<label for="thai-font-select" class="picker-label">Font</label>
		<select id="thai-font-select" v-model="activeThaiFontId" class="picker-select">
			<option v-for="font in thaiFonts" :key="font.id" :value="font.id">
				{{ font.label }}
			</option>
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
