<template>
	<span class="beta-badge">beta</span>
</template>

<style scoped>
/**
 * Contextual variants (hidden in the collapsed menu rail, reversed on the active
 * nav plate) stay with the parent — Vue puts the parent's scope on this root too.
 */
.beta-badge {
	font-size: var(--fs-9);
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--c-sign);
	border: 1px solid var(--c-sign);
	border-radius: var(--radius-sm);
	padding: 0 3px;
	vertical-align: middle;
}
</style>
