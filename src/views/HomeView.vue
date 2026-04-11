<script setup lang="ts">
import { scriptList } from '@/scripts/scripts'
</script>

<template>
	<article>
		<h1>Transliteration Reference</h1>
		<p class="home-sub">
			Tips and lookup sheets to transliterate different scripts into Latin characters.
			Mostly assembled for GeoGuessr purposes — to learn how to decipher what a sign in a foreign script says.
			Compared to other resources I tried to make the descriptions even shorter, i.e. just the basics, lookup sheets and off you go.
		</p>

		<h2>Suggested approach</h2>

		<p>Learning is generally non-linear and we are likely to swap back and forth between resources.
		But generally this is made with two strategies in mind:</p>

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

		<section class="script-grid">
			<RouterLink
				v-for="script in scriptList.filter(s => !s.comingSoon)"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="script-card"
			>
				<span class="card-native">{{ script.nativeName }}</span>
				<span class="card-name">{{ script.name }}</span>
				<span class="card-meta">{{ script.meta }}</span>
				<span v-if="script.countries" class="card-countries">{{ script.countries }}</span>
			</RouterLink>
			<div
				v-for="script in scriptList.filter(s => s.comingSoon)"
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

		<h2>Any errors?</h2>
		<p>
			I'm just learning most of these scripts myself by reading wikipedia, docs and resources curated by the GeoGuessr community as well as consulting with AI chat bots.
			If you spot any errors, hit me up on Discord: Džuris (@tontonsb) or email juris@glaive.pro.
		</p>
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
	font-size: 0.9rem;
	line-height: 1.6;
}

p {
	font-size: 0.9rem;
	line-height: 1.6;
	color: var(--c-label);
}

h2 {
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--c-muted);
	margin-top: 1.75rem;
	margin-bottom: 0.5rem;
}

h1 + h2 {
	margin-top: 0;
}

.approaches {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-top: 1.75rem;
	margin-bottom: 1.75rem;
}

h3 {
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--c-label);
	margin-bottom: 0.4rem;
}

ol {
	margin-bottom: 0;
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
	margin-bottom: 1.75rem;
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

.script-card.coming-soon {
	opacity: 0.5;
	cursor: default;
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
	font-size: 0.95rem;
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
