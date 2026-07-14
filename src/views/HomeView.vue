<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { sortedScriptList, scriptStatus } from '@/scripts/scripts'
</script>

<template>
	<article class="prose">
		<h1>Unillit</h1>

		<p class="home-sub">
			Some road signs in a foreign land make you feel illiterate? Well un-illiterate yourself!
		</p>

		<p>
			Tips and lookup sheets to transliterate different scripts into Latin characters.
			Mostly assembled for GeoGuessr purposes — to learn how to decipher what a sign in a foreign script says.
			Compared to other resources I tried to make the descriptions even shorter, i.e. just the basics, lookup sheets and off you go.
		</p>

		<h2>Suggested approach</h2>

		<p>
			Learning is generally non-linear and we are likely to swap back and forth between resources.
			But generally this is made with two strategies in mind:
		</p>

		<div class="approaches">
			<div>
				<h3>Step in feet first</h3>
				<ol>
					<li>Read the <em>Reading tips</em> in the info panel. It might cover details like reading direction, skipped vowels, letters out of order, etc.</li>
					<li>Switch tabs and get familiar with the info sheets.</li>
					<li>Choose a type-in quiz on the practice panel.</li>
					<li>Confident now? Select <em>None</em> and try to ride without the training wheels.</li>
				</ol>
			</div>
			<div>
				<h3>Jump in head first</h3>
				<ol>
					<li>Select the shape recognition tab on the info panel.</li>
					<li>Choose a multiple choice quiz in the other panel.</li>
					<li>Use the sheet to decipher which option fits best.</li>
					<li>Absorb. And see reading tips once you have questions.</li>
				</ol>
			</div>
		</div>

		<p>
			The <RouterLink to="/roadmap">roadmap</RouterLink> lays out some
			script-specific suggested approaches.
		</p>

		<section class="script-grid">
			<RouterLink
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) !== 'coming')"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="script-card"
				:class="{ beta: scriptStatus(script) === 'beta' }"
			>
				<span class="card-native">{{ script.nativeName }}</span>
				<span class="card-name">
					{{ script.name }}
					<span v-if="scriptStatus(script) === 'beta'" class="beta-badge">beta</span>
				</span>
				<span class="card-meta">{{ script.meta }}</span>
				<span v-if="script.countries" class="card-countries">{{ script.countries }}</span>
			</RouterLink>
			<div
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) === 'coming')"
				:key="script.id"
				class="script-card coming-soon"
			>
				<span class="card-native">{{ script.nativeName }}</span>
				<span class="card-name">{{ script.name }}</span>
				<span class="card-meta">{{ script.meta }}</span>
				<span v-if="script.countries" class="card-countries">{{ script.countries }}</span>
				<span class="card-soon">Maybe in future...</span>
			</div>
		</section>

		<h2>Abu- what?</h2>

		<p>
			Writing systems (scripts) differ in what the characters represent.
			Currently you should be aware of these three categories:
		</p>

		<dl>
			<dt>Abjads</dt>
			<dd>Only consonants are written, e.g. Arabic, Hebrew</dd>

			<dt>Abugidas</dt>
			<dd>Consonants are primary. Vowels are either inherent or modified by diacritics, e.g. Thai, Bengali.</dd>

			<dt>Alphabets</dt>
			<dd>Consonants and vowels are treated equally as separate letters e.g. Latin, Cyrillic, Greek.</dd>
		</dl>

		<p>
			As most classifications, this does not convey the whole truth.
			For example, Hangul (the Korean script) is alphabetic, but the letters are arranged in syllable blocks.
		</p>
	</article>
</template>

<style scoped>
article {
	max-width: 800px;
}

.home-sub {
	color: var(--c-muted);
	margin-bottom: 1.25rem;
	font-size: 0.9rem;
}

.approaches {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-top: 1.75rem;
	margin-bottom: 1.75rem;
}

dl {
	display: grid;
	grid-template-columns: max-content 1fr;
	gap: 0.25rem 1.25rem;
	margin: 0.75rem 0 1rem;
}

dt {
	font-size: 0.9rem;
	font-weight: 600;
	color: var(--c-head);
	padding-top: 0.1em;
}

dd {
	font-size: 0.9rem;
	color: var(--c-label);
}

.script-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 1.75rem;
	margin-bottom: 1.75rem;
}

.script-card {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 1rem 1.25rem;
	border: 1px solid var(--c-border);
	border-radius: var(--radius);
	background: var(--c-cell);
	text-decoration: none;
	color: inherit;
	transition: border-color 0.15s, background 0.15s;
}

.script-card:hover {
	border-color: var(--c-accent-ink);
	background: var(--c-alt);
}

.script-card.coming-soon {
	opacity: 0.5;
	cursor: default;
}

.script-card.beta {
	opacity: 0.8;
}

.script-card.beta:hover {
	opacity: 1;
}

.beta-badge {
	font-size: 0.6rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--c-accent-ink);
	border: 1px solid var(--c-accent-ink);
	border-radius: 3px;
	padding: 0 0.25em;
	vertical-align: middle;
}

.card-soon {
	font-size: 0.65rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--c-muted);
	margin-top: auto;
}

.card-native {
	font-size: 1.75rem;
	line-height: 1.2;
	color: var(--c-head);
}

.card-name {
	font-family: var(--serif);
	font-size: 1rem;
	font-weight: 600;
	color: var(--c-label);
}

.card-meta {
	font-size: 0.75rem;
	color: var(--c-muted);
	line-height: 1.4;
}

.card-countries {
	font-size: 0.7rem;
	color: var(--c-muted);
	line-height: 1.4;
	opacity: 0.7;
}
</style>
