<script setup lang="ts">
// Base-consonant selector shown inside a sheet section h2 (white-on-green).
const model = defineModel<string>({ required: true })

const placeholders = ['◌', 'ก', 'ข', 'ด', 'ท', 'น']
</script>

<template>
	<span class="cons-picker">
		<button
			v-for="c in placeholders"
			:key="c"
			type="button"
			class="cons-btn"
			:class="{ active: model === c }"
			@click="model = c"
		>
			{{ c }}
		</button>
	</span>
</template>

<style scoped>
.cons-picker {
	display: flex;
	gap: 2px;
	margin-left: auto;
}

.cons-btn {
	font-family: var(--font-thai);
	font-size: 14px;
	font-weight: 400;
	line-height: 1;
	padding: 0 5px 1px;
	border: 1px solid rgba(255, 255, 255, 0.6);
	border-radius: var(--radius);
	background: transparent;
	color: rgba(255, 255, 255, 0.92);
	cursor: pointer;
	text-transform: none;
	letter-spacing: 0;
}

.cons-btn.active {
	background: rgba(255, 255, 255, 0.9);
	border-color: transparent;
	color: var(--c-head);
}
</style>
