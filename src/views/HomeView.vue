<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { sortedScriptList, scriptStatus } from '@/scripts/scripts'
import BetaBadge from '@/components/BetaBadge.vue'
</script>

<template>
	<article class="prose">
		<h1>Unillit</h1>

		<p class="home-sub">
			Road signs in a foreign land make you feel illiterate? Well un-illiterate yourself!
		</p>

		<p>
			What's here? Lookup sheets that are crafted for quickly learning to
			transliterate different scripts into Latin characters.
		</p>

		<p>
			This is mostly made with GeoGuessr in mind: read the basics,
			develop the skill using sheets and quizzes, and off you go:
			decipher the foreign-script signs without having to learn the language itself.
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
				:style="{ '--label-scale': script.labelScale ?? 1 }"
			>
				<header>
					<span class="card-name">{{ script.name }}</span>
					<span class="card-native">{{ script.nativeName }}</span>
				</header>
				<span class="card-detail">{{ script.meta }}</span>
				<footer v-if="script.countries || scriptStatus(script) === 'beta'">
					<span v-if="script.countries" class="card-where">{{ script.countries }}</span>
					<BetaBadge v-if="scriptStatus(script) === 'beta'" />
				</footer>
			</RouterLink>
			<div
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) === 'coming')"
				:key="script.id"
				class="script-card coming-soon"
				:style="{ '--label-scale': script.labelScale ?? 1 }"
			>
				<header>
					<span class="card-name">{{ script.name }}</span>
					<span class="card-native">{{ script.nativeName }}</span>
				</header>
				<span class="card-detail">{{ script.meta }}</span>
				<footer>
					<span v-if="script.countries" class="card-where">{{ script.countries }}</span>
					<span class="card-soon">Not here yet…</span>
				</footer>
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
/* The wide cap is for the grids: at the prose measure the card grid drops to two
   columns. Prose children keep the shared measure so the text stays put across pages. */
article {
	max-width: var(--measure-wide);
}

article > :is(h1, h2, p, dl) {
	max-width: var(--measure-prose);
	margin-inline: auto;
}

.home-sub {
	font-family: var(--serif);
	font-style: italic;
	color: var(--c-muted);
	margin-bottom: var(--sp-20);
}

.approaches {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--sp-16);
	margin-top: var(--sp-28);
	margin-bottom: var(--sp-28);
}

dl {
	display: grid;
	grid-template-columns: max-content 1fr;
	gap: var(--sp-4) var(--sp-20);
	margin: var(--sp-12) 0 var(--sp-16);
}

dt {
	font-size: var(--fs-prose);
	font-weight: 600;
}

.script-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: var(--sp-24) var(--sp-20);
	margin-top: var(--sp-28);
	margin-bottom: var(--sp-28);
}

.script-card {
	display: flex;
	flex-direction: column;
	gap: var(--sp-8);
	padding: var(--sp-12) var(--sp-16) var(--sp-16);
	border-radius: var(--radius);
	background: var(--c-cell);
	text-decoration: none;
	color: inherit;
	transition: background var(--dur), color var(--dur);
}

.script-card header {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: var(--sp-8);
	padding-bottom: var(--sp-8);
	border-bottom: var(--hairline);
	font-size: var(--fs-prose);
}

.card-name {
	font-family: var(--serif);
	font-weight: 600;
	color: var(--c-accent);
}

.card-native {
	font-size: calc(1em * var(--label-scale, 1));
	color: var(--c-head);
}

.card-detail {
	font-size: var(--fs-12);
	color: var(--c-muted);
	line-height: var(--lh-tight);
}

/* the foot of the card: where you meet the script, then what state it is in. Stacked
   rather than a row, so the status keeps one position no matter how long the country
   list runs — the five-entry one would otherwise push it to a line of its own. */
.script-card footer {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: var(--sp-4);
	margin-top: auto;
	padding-top: var(--sp-8);
}

.card-where {
	font-size: var(--fs-12);
	color: var(--c-muted);
	line-height: var(--lh-tight);
}

.card-soon {
	font-size: var(--fs-micro);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: var(--tracking-caps);
	color: var(--c-muted);
}

/* the ground lifts and the ink deepens by about as much, so the name holds its
   contrast through the change instead of fading into the hover fill */
.script-card:hover {
	background: var(--c-alt);
}

.script-card:hover .card-name {
	color: var(--c-sign);
}

/* beta: still mounted and interactive — the greens fall back rather than dim, and
   the name stays inert on hover, which is half of what separates it from live */
.script-card.beta :is(.card-name, .card-native) {
	color: var(--c-muted);
}

/* unwritten: the same fallback, then unmounted and dimmed as one card */
.script-card.coming-soon {
	background: transparent;
	cursor: default;
	opacity: var(--o-inert);
}

.script-card.coming-soon :is(.card-name, .card-native) {
	color: var(--c-muted);
}
</style>
