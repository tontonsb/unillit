<script setup lang="ts">
import LB from '@/components/LangBadge.vue'

interface Marker {
	cyr: string
	langs: string[]
	gloss?: string
}

// Unmistakable letters that pin down (or narrow) the language on a sign.
const markers: Marker[] = [
	{ cyr: 'Ї ї', langs: ['uk'], gloss: 'unique to Ukrainian' },
	{ cyr: 'Є є', langs: ['uk'], gloss: 'unique to Ukrainian' },
	{ cyr: 'Ґ ґ', langs: ['uk'], gloss: 'unique to Ukrainian' },
	{ cyr: 'Ў ў', langs: ['be', 'uz'], gloss: 'Belarusian or Uzbek Cyrillic — context disambiguates' },
	{ cyr: 'Ђ ђ', langs: ['sr'], gloss: 'Serbian only' },
	{ cyr: 'Ћ ћ', langs: ['sr'], gloss: 'Serbian only' },
	{ cyr: 'Ѓ ѓ', langs: ['mk'], gloss: 'Macedonian only' },
	{ cyr: 'Ќ ќ', langs: ['mk'], gloss: 'Macedonian only' },
	{ cyr: 'Ѕ ѕ', langs: ['mk'], gloss: 'Macedonian only' },
	{ cyr: 'Ј ј', langs: ['sr', 'mk'], gloss: 'Serbian or Macedonian — check for Ђ/Ћ vs Ѓ/Ќ/Ѕ' },
	{ cyr: 'Љ љ', langs: ['sr', 'mk'], gloss: 'Serbian or Macedonian' },
	{ cyr: 'Њ њ', langs: ['sr', 'mk'], gloss: 'Serbian or Macedonian' },
	{ cyr: 'Џ џ', langs: ['sr', 'mk'], gloss: 'Serbian or Macedonian (also Abkhaz)' },
	{ cyr: 'Ә ә', langs: ['kk'], gloss: 'Kazakh (with Қ)' },
	{ cyr: 'Ұ ұ', langs: ['kk'], gloss: 'Kazakh' },
	{ cyr: 'Һ һ', langs: ['kk'], gloss: 'Kazakh' },
	{ cyr: 'Ҷ ҷ', langs: ['tg'], gloss: 'Tajik' },
	{ cyr: 'Ӣ ӣ', langs: ['tg'], gloss: 'Tajik' },
	{ cyr: 'Ӯ ӯ', langs: ['tg'], gloss: 'Tajik' },
	{ cyr: 'Ҙ ҙ', langs: ['ba'], gloss: 'Bashkir' },
	{ cyr: 'Ҫ ҫ', langs: ['ba', 'cv'], gloss: 'Bashkir or Chuvash — different sound, same glyph' },
	{ cyr: 'Җ җ', langs: ['tt', 'xal'], gloss: 'Tatar or Kalmyk' },
	{ cyr: 'Ҩ ҩ', langs: ['ab'], gloss: 'Abkhaz' },
	{ cyr: 'Ҵ ҵ', langs: ['ab'], gloss: 'Abkhaz' },
	{ cyr: 'Ҽ ҽ', langs: ['ab'], gloss: 'Abkhaz' },
	{ cyr: 'Ҕ ҕ', langs: ['sah'], gloss: 'Yakut/Sakha' },
	{ cyr: 'Ҥ ҥ', langs: ['bua', 'sah'], gloss: 'Buryat or Yakut' },
	{ cyr: 'Ӑ ӑ', langs: ['cv'], gloss: 'Chuvash' },
	{ cyr: 'Ӗ ĕ', langs: ['cv'], gloss: 'Chuvash' },
	{ cyr: 'Ӳ ӳ', langs: ['cv'], gloss: 'Chuvash' },
	{ cyr: 'Ӓ ӓ', langs: ['mhr'], gloss: 'Mari' },
	{ cyr: 'Ӱ ӱ', langs: ['mhr'], gloss: 'Mari' },
	{ cyr: 'Ӥ ӥ', langs: ['udm'], gloss: 'Udmurt' },
	{ cyr: 'Ӝ ӝ', langs: ['udm'], gloss: 'Udmurt' },
	{ cyr: 'Ӟ ӟ', langs: ['udm'], gloss: 'Udmurt' },
	{ cyr: 'Ӧ ӧ', langs: ['mhr', 'udm', 'kv'], gloss: 'Mari, Udmurt, or Komi — Komi has no other extra letters' },
	{ cyr: 'Æ æ', langs: ['os'], gloss: 'Ossetian — its only addition beyond core + pack' },
	{ cyr: 'Ӏ', langs: ['ce'], gloss: 'Chechen palochka — marks ejective/pharyngealized consonants in digraphs (къ, хь, гӏ…), not a letter of its own' },
]

// turn ['kk', 'ky'] into { kk: true, ky: true } for v-bind onto <l-b>
function langAttrs(codes: string[]): Record<string, boolean> {
	return Object.fromEntries(codes.map(c => [c, true]))
}
</script>

<template>
	<article class="sheet">

		<!-- MARKER LETTERS -->
		<section>
			<h2>Marker letters — "which language am I looking at?"</h2>
			<p class="section-note">Letters that are rare or unique enough to pin down (or narrow) the language on a sign at a glance.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="m in markers" :key="m.cyr">
					<span class="cyr lg">{{ m.cyr }}</span>
					<l-b v-bind="langAttrs(m.langs)" />
					<span v-if="m.gloss" class="gloss">{{ m.gloss }}</span>
				</div>
			</div>
		</section>

		<!-- DECISION TREE -->
		<section>
			<h2>Decision tree</h2>
			<p class="section-note">A rough branch order for narrowing down from a handful of letters on a sign. Structure over completeness — refine as needed.</p>
			<ol class="tree">
				<li>
					Ј anywhere → Serbian or Macedonian
					<ul>
						<li>Ђ or Ћ present → <l-b sr /> Serbian</li>
						<li>Ѓ, Ќ, or Ѕ present → <l-b mk /> Macedonian</li>
					</ul>
				</li>
				<li>Ъ common <em>inside</em> words (e.g. Търново) → <l-b bg /> Bulgarian</li>
				<li>
					І present
					<ul>
						<li>Ї also present → <l-b uk /> Ukrainian</li>
						<li>Ў also present → <l-b be /> Belarusian</li>
						<li>Қ or Ә also present → <l-b kk /> Kazakh</li>
					</ul>
				</li>
				<li>
					Қ, Ғ, or Ҳ present → Central Asian
					<ul>
						<li>Ә, Ұ, or Һ present → <l-b kk /> Kazakh</li>
						<li>Ҷ, Ӣ, or Ӯ present → <l-b tg /> Tajik</li>
						<li>Ў present, no І → <l-b uz /> Uzbek</li>
					</ul>
				</li>
				<li>Ң, Ө, Ү present, no Қ → <l-b ky /> Kyrgyz (or <l-b tyv /> Tuvan — check for Ы/Э, which Tuvan also uses)</li>
				<li>Only Ө and Ү present (no Ң) → <l-b mn /> Mongolian</li>
				<li>
					Ә, Ө, Ү, Ң, Һ present but no Latin-shaped diacritics or uvular Қ/Ғ
					<ul>
						<li>Җ also present → <l-b tt /> Tatar</li>
						<li>Ҙ or Ҫ also present → <l-b ba /> Bashkir</li>
						<li>Ҕ or Ҥ present (not Ң) → <l-b sah /> Yakut/Sakha</li>
						<li>Ҥ present, no Ҕ, no Ы/Э → <l-b bua /> Buryat</li>
						<li>Җ present, no І/Ы → <l-b xal /> Kalmyk</li>
					</ul>
				</li>
				<li>Ӑ, Ӗ, or Ӳ present → <l-b cv /> Chuvash</li>
				<li>
					Ӧ present (umlaut dots, not barred Ө)
					<ul>
						<li>Ӓ or Ӱ also present → <l-b mhr /> Mari</li>
						<li>Ӥ, Ӝ, or Ӟ also present → <l-b udm /> Udmurt</li>
						<li>none of the above → <l-b kv /> Komi</li>
					</ul>
				</li>
				<li>Æ present → <l-b os /> Ossetian</li>
				<li>Ӏ (palochka) used inside digraphs, otherwise plain Russian letters → <l-b ce /> Chechen</li>
				<li>
					None of the above
					<ul>
						<li>likely <l-b ru /> Russian</li>
						<li>unless Ы, Э, and Ё are all absent — then check again for <l-b bg /> Bulgarian, or for <l-b rue /> Rusyn if І/Ї/Є appear alongside otherwise-Russian spelling</li>
					</ul>
				</li>
			</ol>
		</section>

	</article>
</template>

<style scoped>
.char-grid { --cell-min: 88px; }

.cyr {
	font-family: var(--font-cyrillic);
	font-size: var(--glyph);
	line-height: 1.15;
}

.tree {
	list-style: decimal;
	padding: 8px 10px 8px 26px;
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.tree > li {
	display: list-item;
}

.tree > li::marker {
	color: var(--c-sign);
	font-weight: 600;
}

.tree ul {
	list-style: disc;
	margin: 4px 0 0 1.4em;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 2px;
}

.tree ul li {
	display: list-item;
}
</style>
