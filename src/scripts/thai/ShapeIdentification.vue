<script setup lang="ts">
import { ref } from 'vue'
import CharBadge from './CharBadge.vue'
import ConsonantPicker from './ConsonantPicker.vue'

const baseCons = ref('◌')

function replaceConsonant(thai: string): string {
	return thai.replace(/ก/g, baseCons.value)
}

interface ConsonantChar {
	thai: string
	translit: string
	final: string | null
	tags?: string[]
}

interface ConsonantFamily {
	name: string
	characters: ConsonantChar[]
}

/**
  * Informs parsing: whether the syllable will consume the next consonant.
  */
type SyllableShape = 'open' | 'prefinal' | 'selfclosed'

interface VowelChar {
	thai: string
	translit: string
	length?: 'short' | 'long'
	shape?: SyllableShape
}

interface VowelFamily {
	name: string
	vowels: VowelChar[]
}

const vowelFamilies: VowelFamily[] = [
	{
		name: 'That 6-like thing on left',
		vowels: [
			{ thai: 'เก', translit: 'e', length: 'long' },
			{ thai: 'เก็', translit: 'e', length: 'short', shape: 'prefinal' },
			{ thai: 'เกะ', translit: 'e', length: 'short', shape: 'open' },

			/* เงิน is short, เดิน is long */
			{ thai: 'เกิ', translit: 'oe', shape: 'prefinal' },

			{ thai: 'เกา', translit: 'ao', length: 'short', shape: 'selfclosed' },
			{ thai: 'เกาะ', translit: 'o', length: 'short', shape: 'open' },

			{ thai: 'เกอ', translit: 'oe', length: 'long', shape: 'open' },
		//	{ thai: 'เกอะ', translit: 'oe', length: 'short', shape: 'open' },
			{ thai: 'เกือ', translit: 'uea', length: 'long' },
		//	{ thai: 'เกือะ', translit: 'uea', length: 'short', shape: 'open' },
		//	{ thai: 'เกือย', translit: 'ueai', length: 'long', shape: 'selfclosed' },

			/* only appears in the word เกอว http://www.thai-language.com/id/141803 */
		//	{ thai: 'เกอว', translit: 'oeu', length: 'long', shape: 'selfclosed' },

			{ thai: 'เกย', translit: 'oei', length: 'long', shape: 'selfclosed' },
			{ thai: 'เกีย', translit: 'ia', length: 'long' },
		//	{ thai: 'เกียะ', translit: 'ia', length: 'short', shape: 'open' },
			{ thai: 'เกียว', translit: 'iao', length: 'long', shape: 'selfclosed' },

		//	{ thai: 'เกว', translit: 'eo', length: 'long', shape: 'selfclosed' },
		//	{ thai: 'เก็ว', translit: 'eo', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Two of the 6-likes. Or one but with an umbrella.',
		vowels: [
			{ thai: 'แก', translit: 'ae', length: 'long' },
			{ thai: 'แก็', translit: 'ae', length: 'short', shape: 'prefinal' },
			{ thai: 'แกะ', translit: 'ae', length: 'short', shape: 'open' },

		//	{ thai: 'แกว', translit: 'aeo', length: 'long', shape: 'selfclosed' },
		//	{ thai: 'แก็ว', translit: 'aeo', length: 'short', shape: 'selfclosed' },

			{ thai: 'โก', translit: 'o', length: 'long' },
			{ thai: 'โกะ', translit: 'o', length: 'short', shape: 'open' },
			{ thai: 'โกย', translit: 'oi', length: 'long', shape: 'selfclosed' },
			{ thai: 'ใก', translit: 'ai', length: 'short', shape: 'selfclosed' },
			{ thai: 'ไก', translit: 'ai', length: 'short', shape: 'selfclosed' },
			{ thai: 'ไกย', translit: 'ai', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Diacritic below',
		vowels: [
			{ thai: 'กุ', translit: 'u', length: 'short' },
			{ thai: 'กู', translit: 'u', length: 'long' },
			{ thai: 'กุย', translit: 'ui', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Diacritic above',
		vowels: [
			{ thai: 'กั', translit: 'a', length: 'short', shape: 'prefinal' },
			{ thai: 'กัว', translit: 'ua', length: 'long', shape: 'open' },
			{ thai: 'กัวะ', translit: 'ua', length: 'short', shape: 'open' },

			{ thai: 'กัย', translit: 'ai', length: 'short', shape: 'selfclosed' },

			{ thai: 'กิ', translit: 'i', length: 'short' },
			{ thai: 'กิว', translit: 'io', length: 'short', shape: 'selfclosed' },

			{ thai: 'กี', translit: 'i', length: 'long' },

			{ thai: 'กื', translit: 'ue', length: 'long', shape: 'prefinal' },
			{ thai: 'กือ', translit: 'ue', length: 'long', shape: 'open' },

			{ thai: 'กึ', translit: 'ue', length: 'short' },

			{ thai: 'กำ', translit: 'am', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Only chars on the right',
		vowels: [
			{ thai: 'กา', translit: 'a', length: 'long' },
			{ thai: 'กอ', translit: 'o', length: 'long' },
		//	{ thai: 'ก็อ', translit: 'o', length: 'short', shape: 'prefinal' },
			{ thai: 'กะ', translit: 'a', length: 'short', shape: 'open' },

			{ thai: 'กว', translit: 'ua', length: 'long', shape: 'prefinal' },
			{ thai: 'กวย', translit: 'uai', length: 'long', shape: 'selfclosed' },
		//	{ thai: 'กวาย', translit: 'uai', length: 'long', shape: 'selfclosed' }, // disputed, awaiting native speaker feedback

			{ thai: 'กอย', translit: 'oi', length: 'long', shape: 'selfclosed' },
		//	{ thai: 'ก็อย', translit: 'oi', length: 'short', shape: 'selfclosed' },

			{ thai: 'กาว', translit: 'ao', length: 'long', shape: 'selfclosed' },
			{ thai: 'กาย', translit: 'ai', length: 'long', shape: 'selfclosed' },
			{ thai: 'กรร', translit: 'an/a', length: 'short' },
		],
	},
	{
		name: 'Ligatures',
		vowels: [
			{ thai: 'ฤ', translit: 'ri/rue/roe' },
			{ thai: 'ฤๅ', translit: 'rue', length: 'long', shape: 'open' },
		//	{ thai: 'ฦ', translit: 'lue' },
		//	{ thai: 'ฦๅ', translit: 'lue', length: 'long', shape: 'open' },
		],
	},
]

const consonantFamilies: ConsonantFamily[] = [
	{
		name: 'Crates — floor and both sides',
		characters: [
			{ thai: 'บ', translit: 'b', final: 'p' },
			{ thai: 'ป', translit: 'p', final: 'p' },
			{ thai: 'ข', translit: 'kh', final: 'k' },
			{ thai: 'ฃ', translit: 'kh', final: 'k' },
			{ thai: 'ช', translit: 'ch', final: 't' },
			{ thai: 'ซ', translit: 's', final: 't' },
			{ thai: 'ษ', translit: 's', final: 't' },
			{ thai: 'ฆ', translit: 'kh', final: 'k' },
			{ thai: 'น', translit: 'n', final: 'n' },
			{ thai: 'ม', translit: 'm', final: 'm' },
			{ thai: 'ย', translit: 'y', final: 'y', tags: ['vowel'] },
		],
	},
	{
		name: 'Minions — roof and both sides',
		characters: [
			{ thai: 'ก', translit: 'k', final: 'k' },
			{ thai: 'ถ', translit: 'th', final: 't' },
			{ thai: 'ภ', translit: 'ph', final: 'p' },
			{ thai: 'ฎ', translit: 'd', final: 't' },
			{ thai: 'ฏ', translit: 't', final: 't' },
			{ thai: 'ด', translit: 'd', final: 't' },
			{ thai: 'ค', translit: 'kh', final: 'k' },
			{ thai: 'ศ', translit: 's', final: 't' },
			{ thai: 'ต', translit: 't', final: 't' },
			{ thai: 'ฅ', translit: 'kh', final: 'k' },
		],
	},
	{
		name: 'Minions holding a sword',
		characters: [
			{ thai: 'ฒ', translit: 'th', final: 't' },
			{ thai: 'ณ', translit: 'n', final: 'n' },
			{ thai: 'ฌ', translit: 'ch', final: 't' },
			{ thai: 'ญ', translit: 'y', final: 'n' },
		],
	},
	{
		name: 'Pacman ghosts/AmongUs — side gap',
		characters: [
			{ thai: 'อ', translit: '–', final: null, tags: ['vowel'] },
			{ thai: 'ฮ', translit: 'h', final: null },
			{ thai: 'จ', translit: 'ch', final: 't' },
			{ thai: 'ฉ', translit: 'ch', final: null },
			{ thai: 'ล', translit: 'l', final: 'n' },
			{ thai: 'ส', translit: 's', final: 't' },
		],
	},
	{
		name: 'Flags',
		characters: [
			{ thai: 'ร', translit: 'r', final: 'n/–' },
			{ thai: 'ธ', translit: 'th', final: 't' },
			{ thai: 'ฐ', translit: 'th', final: 't' },
		],
	},
	{
		name: 'Hooks',
		characters: [
			{ thai: 'ง', translit: 'ng', final: 'ng' },
			{ thai: 'ว', translit: 'w', final: 'o/u', tags: ['vowel'] },
		],
	},
	{
		name: 'Squiggles — N-like',
		characters: [
			{ thai: 'ห', translit: 'h', final: null },
			{ thai: 'ท', translit: 'th', final: 't' },
			{ thai: 'ฑ', translit: 'th', final: 't' },
		],
	},
	{
		name: 'W-shape',
		characters: [
			{ thai: 'ผ', translit: 'ph', final: null },
			{ thai: 'ฝ', translit: 'f', final: null },
			{ thai: 'พ', translit: 'ph', final: 'p' },
			{ thai: 'ฟ', translit: 'f', final: 'p' },
			{ thai: 'ฬ', translit: 'l', final: 'n' },
		],
	},
]
</script>

<template>
	<article class="sheet">
		<section>
			<h2>Consonants — translit: initial / –final sound</h2>

			<figure v-for="family in consonantFamilies" :key="family.name">
				<figcaption>{{ family.name }}</figcaption>
				<ul>
					<li v-for="(char, ci) in family.characters" :key="ci" class="cell">
						<span class="thai">{{ char.thai }}</span>
						<span class="rom">{{ char.translit }}</span>
						<span v-if="char.final" class="final">–{{ char.final }}</span>
						<CharBadge v-for="tag in char.tags" :key="tag" :tag="tag" />
					</li>
				</ul>
			</figure>
		</section>

		<section>
			<h2>
				Vowels — base consonant {{ baseCons }}
				<ConsonantPicker v-model="baseCons" />
			</h2>
			<p class="section-note">
				<span>Syllable shape:</span>
				<span class="shape-key">
					<CharBadge tag="open" />
					<small>ends with this vowel</small>
				</span>
				<span class="shape-key">
					<CharBadge tag="selfclosed" />
					<small>ends with this glide</small>
				</span>
				<span class="shape-key">
					<CharBadge tag="prefinal" />
					<small>next consonant will end this syllable</small>
				</span>
			</p>

			<figure v-for="family in vowelFamilies" :key="family.name">
				<figcaption>{{ family.name }}</figcaption>
				<ul>
					<li v-for="(vowel, vi) in family.vowels" :key="vi" class="cell">
						<span class="thai">{{ replaceConsonant(vowel.thai) }}</span>
						<span class="rom">{{ vowel.translit }}</span>
						<span class="badges">
							<CharBadge v-if="vowel.length" :tag="vowel.length" />
							<CharBadge v-if="vowel.shape" :tag="vowel.shape" />
						</span>
					</li>
				</ul>
			</figure>
		</section>
	</article>
</template>

<style scoped>
section {
	display: flex;
	flex-wrap: wrap;
	gap: var(--sp-6);
	padding: var(--sp-6);
}

section > h2,
section > .section-note {
	flex-basis: calc(100% + var(--sp-6) + var(--sp-6));
	margin: calc(-1 * var(--sp-6)) calc(-1 * var(--sp-6)) 0;
}

.shape-key {
	display: inline-flex;
	align-items: center;
	gap: var(--sp-4);
}

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
	font-size: 0.65em;
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
	min-height: 74px;
}
li:last-child { border-right: none; }

.thai {
	font-family: var(--font-thai);
	font-size: var(--glyph);
	line-height: 1.15;
}
</style>
