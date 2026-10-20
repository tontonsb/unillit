<script setup lang="ts">
const checked = defineModel<boolean>({ required: true })
</script>

<template>
	<label class="sheet-toggle">
		<input v-model="checked" type="checkbox">
		<slot></slot>
	</label>
</template>

<style scoped>
.sheet-toggle {
	display: inline-flex;
	align-items: center;
	gap: var(--sp-4);
	margin-left: auto;
	cursor: pointer;
}

.sheet-toggle input {
	margin: 0;
	accent-color: var(--c-sign);
}
</style>
