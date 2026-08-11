<template>
	<span class="beta-badge">beta</span>
</template>

<style scoped>
/**
 * Contextual variants (hidden in the collapsed menu rail, reversed on the active
 * nav plate) stay with the parent — Vue puts the parent's scope on this root too.
 */
.beta-badge {
	/* inline-block, or the padding would be painted around the font's ascent+descent
	   rather than the line box, and the plate would ignore line-height */
	display: inline-block;
	font-size: var(--fs-micro);
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: var(--tracking-caps);
	background: var(--c-sign);
	color: var(--c-on-sign);

	/* transparent rather than absent so the plate keeps its geometry when a context
	   needs an outline to separate it from a plate underneath */
	border: 1px solid transparent;
	border-radius: var(--radius-sm);
	padding: var(--sp-2) var(--sp-4);
	line-height: 1;
	vertical-align: middle;
}
</style>
