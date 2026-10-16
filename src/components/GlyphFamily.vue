<script setup lang="ts" generic="T">
defineProps<{
	name: string
	items: T[]
}>()

defineSlots<{
	default(props: { item: T }): unknown
}>()
</script>

<template>
	<figure>
		<figcaption>{{ name }}</figcaption>
		<ul>
			<li v-for="(item, i) in items" :key="i" class="cell">
				<slot :item="item"></slot>
			</li>
		</ul>
	</figure>
</template>

<style scoped>
figure {
	margin: 0;
	border: var(--hairline);
	border-radius: var(--radius);
	overflow: hidden;
	min-width: 0;
	display: flex;
	flex-direction: column;
}

figcaption {
	background: var(--c-alt);
	color: var(--c-label);
	font-size: 0.75em;
	font-weight: 600;
	padding: var(--sp-2) var(--sp-6);
	white-space: nowrap;
	letter-spacing: var(--tracking-wide);
}

ul {
	display: flex;
	flex-wrap: wrap;
	flex: 1;
}

li {
	border-right: var(--hairline);
	min-width: 38px;
}
li:last-child { border-right: none; }
</style>
