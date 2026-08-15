<script setup lang="ts">

defineProps<{
	active?: boolean
	locked?: boolean
	small?: boolean
}>()
</script>

<template>
	<!-- a span, because title not worketh on disabelered butōn -->
	<component
		:is="locked ? 'span' : 'button'"
		:type="locked ? undefined : 'button'"
		class="pill"
		:class="{ active, locked, small }"
	><slot></slot></component>
</template>

<style scoped>
.pill {
	padding: var(--sp-2) var(--sp-8);
	border: var(--hairline);
	border-radius: var(--radius);
	background: transparent;
	color: var(--c-muted);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	cursor: pointer;
	white-space: nowrap;
	flex-shrink: 0;
	transition: color var(--dur), border-color var(--dur), background-color var(--dur);
}

.pill:hover {
	color: var(--c-label);
	border-color: var(--c-label);
}

.pill.active {
	background: var(--c-alt);
	border-color: var(--c-sign);
	color: var(--c-head);
}

.pill.small {
	font-size: var(--fs-micro);
	font-weight: 600;
	letter-spacing: var(--tracking-wide);
}

.pill.locked {
	opacity: var(--o-inert);
	cursor: default;
}

.pill.locked:hover {
	color: var(--c-muted);
	border-color: var(--c-border);
}
</style>
