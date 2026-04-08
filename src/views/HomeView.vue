<script setup lang="ts">
import { scriptList } from '@/scripts/scripts'
</script>

<template>
	<article>
		<h1>Transliteration Reference</h1>
		<p class="home-sub">Tips and lookup sheets to transliterate different scripts into Latin characters.</p>

		<h2>Suggested approach</h2>
		<ol>
			<li>Choose a script and open its page.</li>
			<li>Read the <em>Reading tips</em> in the info panel. It might cover important details like reading direction, skipped vowels, letters out of order, etc.</li>
			<li>Switch tabs on the info panel to see the sheets we have.</li>
			<li>Choose a quiz on the practice panel.</li>
			<li>Swap the lookup sheet as often as you wish, or select <em>None</em> once you feel like trying it on your own.</li>
		</ol>

		<section class="script-grid">
			<RouterLink
				v-for="script in scriptList"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="script-card"
			>
				<span class="card-native">{{ script.nativeName }}</span>
				<span class="card-name">{{ script.name }}</span>
				<span class="card-meta">{{ script.meta }}</span>
			</RouterLink>
		</section>
	</article>
</template>

<style scoped>
article {
	padding: 2rem;
	max-width: 800px;
	margin: 0 auto;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 0.25rem;
}

.home-sub {
	color: var(--c-muted);
	margin-bottom: 1.25rem;
}

h2 {
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--c-muted);
	margin-bottom: 0.5rem;
}

ol {
	margin-bottom: 1.75rem;
	padding-left: 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	color: var(--c-label);
	font-size: 0.9rem;
	line-height: 1.5;
}

.script-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
}

.script-card {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 1rem 1.25rem;
	border: 1px solid var(--c-border);
	border-radius: 4px;
	background: var(--c-cell);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.15s, background 0.15s;
}

.script-card:hover {
	border-color: var(--c-accent);
	background: var(--c-alt);
}

.card-native {
	font-size: 1.75rem;
	line-height: 1.2;
	color: var(--c-head);
}

.card-name {
	font-size: 0.95rem;
	font-weight: 600;
	color: var(--c-label);
}

.card-meta {
	font-size: 0.75rem;
	color: var(--c-muted);
	line-height: 1.4;
}
</style>
