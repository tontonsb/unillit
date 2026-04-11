<script setup lang="ts">
import CharBadge from './CharBadge.vue'

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

interface VowelChar {
	thai: string
	translit: string
	length: 'short' | 'long'
}

interface VowelFamily {
	name: string
	vowels: VowelChar[]
}

const vowelFamilies: VowelFamily[] = [
	{
		name: 'Diacritic above',
		vowels: [
			{ thai: 'กั', translit: 'a', length: 'short' },
			{ thai: 'กิ', translit: 'i', length: 'short' },
			{ thai: 'กี', translit: 'i', length: 'long' },
			{ thai: 'กึ', translit: 'ue', length: 'short' },
			{ thai: 'กื', translit: 'ue', length: 'long' },
		],
	},
	{
		name: 'Diacritic below',
		vowels: [
			{ thai: 'กุ', translit: 'u', length: 'short' },
			{ thai: 'กู', translit: 'u', length: 'long' },
		],
	},
	{
		name: 'Character on left',
		vowels: [
			{ thai: 'เก', translit: 'e', length: 'long' },
			{ thai: 'แก', translit: 'ae', length: 'long' },
			{ thai: 'โก', translit: 'o', length: 'long' },
			{ thai: 'ใก', translit: 'ai', length: 'long' },
			{ thai: 'ไก', translit: 'ai', length: 'long' },
		],
	},
	{
		name: 'Char on right',
		vowels: [
			{ thai: 'กา', translit: 'a', length: 'long' },
			{ thai: 'กอ', translit: 'o', length: 'long' },
		],
	},
	{
		name: 'Compound — multi-part or wrapping',
		vowels: [
			{ thai: 'กะ', translit: 'a', length: 'short' },
			{ thai: 'เกะ', translit: 'e', length: 'short' },
			{ thai: 'แกะ', translit: 'ae', length: 'short' },
			{ thai: 'เกาะ', translit: 'o', length: 'short' },
			{ thai: 'กือ', translit: 'ue', length: 'long' },
			{ thai: 'เกอ', translit: 'oe', length: 'long' },
		],
	},
	{
		name: 'Diphthong patterns (vowel combos and glides with consonant glyphs ย / ว / อ)',
		vowels: [
			{ thai: 'เกา', translit: 'ao', length: 'long' },
			{ thai: 'กาย', translit: 'ai', length: 'long' },
			{ thai: 'กัย', translit: 'ai', length: 'short' },
			{ thai: 'กอย', translit: 'oi', length: 'long' },
			{ thai: 'กุย', translit: 'ui', length: 'short' },
			{ thai: 'เกย', translit: 'oei', length: 'long' },
			{ thai: 'เกีย', translit: 'ia', length: 'long' },
			{ thai: 'กาว', translit: 'ao', length: 'long' },
			{ thai: 'กิว', translit: 'iu', length: 'short' },
			{ thai: 'กัว', translit: 'ua', length: 'long' },
			{ thai: 'เกือ', translit: 'uea', length: 'long' },
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
			{ thai: 'ฃ', translit: 'kh', final: 'k', tags: ['obsolete'] },
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
			{ thai: 'ฎ', translit: 'd', final: 't', tags: ['rare'] },
			{ thai: 'ฏ', translit: 't', final: 't', tags: ['rare'] },
			{ thai: 'ด', translit: 'd', final: 't' },
			{ thai: 'ค', translit: 'kh', final: 'k' },
			{ thai: 'ศ', translit: 's', final: 't' },
			{ thai: 'ต', translit: 't', final: 't' },
			{ thai: 'ฅ', translit: 'kh', final: 'k', tags: ['obsolete'] },
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
		name: 'Pac-man ghosts/AmongUs — gap on side',
		characters: [
			{ thai: 'อ', translit: '–', final: null, tags: ['vowel'] },
			{ thai: 'ฮ', translit: 'h', final: null },
			{ thai: 'ฉ', translit: 'ch', final: null },
			{ thai: 'ส', translit: 's', final: 't' },
			{ thai: 'ล', translit: 'l', final: 'n' },
		],
	},
	{
		name: 'Hooks',
		characters: [
			{ thai: 'จ', translit: 'ch', final: 't' },
			{ thai: 'ง', translit: 'ng', final: 'ng' },
			{ thai: 'ร', translit: 'r', final: 'n/–' },
			{ thai: 'ว', translit: 'w', final: 'o/u', tags: ['vowel'] },
		],
	},
	{
		name: 'Back & forth squiggles — N-like, Z-like',
		characters: [
			{ thai: 'ห', translit: 'h', final: null },
			{ thai: 'ท', translit: 'th', final: 't' },
			{ thai: 'ฑ', translit: 'th', final: 't' },
			{ thai: 'ฐ', translit: 'th', final: 't' },
			{ thai: 'ธ', translit: 'th', final: 't' },
		],
	},
	{
		name: 'W-shape',
		characters: [
			{ thai: 'ผ', translit: 'ph', final: null },
			{ thai: 'ฝ', translit: 'f', final: null },
			{ thai: 'พ', translit: 'ph', final: 'p' },
			{ thai: 'ฟ', translit: 'f', final: 'p' },
			{ thai: 'ฬ', translit: 'l', final: 'n', tags: ['rare'] },
		],
	},
]
</script>

<template>
	<article>
		<section>
			<h2>Consonants — translit: initial / –final sound</h2>

			<figure v-for="family in consonantFamilies" :key="family.name">
				<figcaption>{{ family.name }}</figcaption>
				<ul>
					<li v-for="(char, ci) in family.characters" :key="ci">
						<span class="thai">{{ char.thai }}</span>
						<span class="rom">{{ char.translit }}</span>
						<span v-if="char.final" class="final">–{{ char.final }}</span>
						<CharBadge v-for="tag in char.tags" :key="tag" :tag="tag" />
					</li>
				</ul>
			</figure>
		</section>

		<section>
			<h2>Vowels (displayed with consonant ก)</h2>

			<figure v-for="family in vowelFamilies" :key="family.name">
				<figcaption>{{ family.name }}</figcaption>
				<ul>
					<li v-for="(vowel, vi) in family.vowels" :key="vi">
						<span class="thai">{{ vowel.thai }}</span>
						<span class="rom">{{ vowel.translit }}</span>
						<CharBadge :tag="vowel.length" />
					</li>
				</ul>
			</figure>
		</section>
	</article>
</template>

<style scoped>
article {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 10px;
	font-size: 11px;
}

section {
	border: 1px solid var(--c-border);
	border-radius: 4px;
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	padding: 6px;
}

section > h2 {
	flex-basis: calc(100% + 12px);
	margin: -6px -6px 0;
	background: var(--c-head);
	color: #fff;
	font-size: 9px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 3px 7px;
}

figure {
	margin: 0;
	border: 1px solid var(--c-border);
	border-radius: 3px;
	overflow: hidden;
	min-width: 0;
}

figcaption {
	background: var(--c-alt);
	color: var(--c-label);
	font-size: 8px;
	font-weight: 600;
	padding: 2px 6px;
	border-bottom: 1px solid var(--c-border);
	white-space: nowrap;
	letter-spacing: 0.04em;
}

ul {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}

li {
	background: var(--c-cell);
	border-right: 1px solid var(--c-border);
	padding: 4px 5px 3px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1px;
	min-width: 38px;
	min-height: 74px;
}
li:last-child { border-right: none; }

.thai { font-family: var(--font-thai); font-size: 24px; line-height: 1.15; }
.rom { font-size: 8px; color: var(--c-accent); font-weight: 600; }
.final { font-size: 7px; color: var(--c-muted); }
</style>
