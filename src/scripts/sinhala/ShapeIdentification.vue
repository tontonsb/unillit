<script setup lang="ts">
import { ref } from 'vue'
import CharBadge, { type BadgeDef } from '@/components/CharBadge.vue'
import SinhalaBadge, { type SinhalaTag } from './SinhalaBadge.vue'
import ConsonantPicker from '@/components/ConsonantPicker.vue'
import GlyphFamily from '@/components/GlyphFamily.vue'

const baseCons = ref('◌')

function replaceConsonant(glyph: string): string {
	return glyph.replace(/◌/g, baseCons.value)
}

interface Char {
	glyph: string
	translit: string
	length?: 'short' | 'long'
	tags?: SinhalaTag[]
	badges?: BadgeDef[]
}

interface Family {
	name: string
	characters: Char[]
}

const primaryCharacters: Family[] = [
	{
		name: 'Leftward loop on top',
		characters: [
			{ glyph: 'ට', translit: 't', tags: ['fusedAl'] },
			{ glyph: 'ව', translit: 'w/v', tags: ['fusedAl'] },
			{ glyph: 'ච', translit: 'ch', tags: ['fusedAl'] },
			{ glyph: 'බ', translit: 'b', tags: ['fusedAl'] },
			{ glyph: 'ඛ', translit: 'kh', tags: ['fusedAl'] },
			{ glyph: 'ම', translit: 'm', tags: ['fusedAl'] },
		],
	},
	{
		name: 'Loops with buttcheeks (AmongUs fellas)',
		characters: [
			{ glyph: 'ඩ', translit: 'd', tags: ['fusedAl'] },
			{ glyph: 'ඬ', translit: 'nd', tags: ['fusedAl'] },
			{ glyph: 'ඞ', translit: 'ng', tags: ['fusedAl'] },
			{ glyph: 'ධ', translit: 'dh', tags: ['fusedAl'] },
			{ glyph: 'ඔ', translit: 'o', length: 'short', tags: ['vowel'] },
			{ glyph: 'ඕ', translit: 'o', length: 'long', tags: ['vowel'] },
			{ glyph: 'ඹ', translit: 'mb', tags: ['fusedAl'] },
			{ glyph: 'ඖ', translit: 'au', tags: ['vowel'] },
			{ glyph: 'ඣ', translit: 'jh', tags: ['fusedAl'] },
		],
	},
	{
		name: 'Ducks (including headless ones) — looped top loop',
		characters: [
			{ glyph: 'එ', translit: 'e', length: 'short', tags: ['vowel'] },
			{ glyph: 'ඒ', translit: 'e', length: 'long', tags: ['vowel'] },
			{ glyph: 'ඵ', translit: 'ph' },
			{ glyph: 'ඪ', translit: 'dh' },
			{ glyph: 'ඨ', translit: 'th' },
			{ glyph: 'ථ', translit: 'th' },
		],
	},
	{
		name: 'Frogs — eyes on top',
		characters: [
			{ glyph: 'ප', translit: 'p' },
			{ glyph: 'ෂ', translit: 'sh' },
			{ glyph: 'ජ', translit: 'j' },
			{ glyph: 'ඦ', translit: 'nj' },
			{ glyph: 'ඡ', translit: 'chh' },
			{ glyph: 'ස', translit: 's' },
			{ glyph: 'ඝ', translit: 'gh' },
			{ glyph: 'ය', translit: 'y' },
			{ glyph: 'ඍ', translit: 'ru/ri', tags: ['vowel'] },
		],
	},
	{
		name: 'Infininty turkeys — downward loop on right',
		characters: [
			{ glyph: 'ග', translit: 'g', tags: ['oddU'] },
			{ glyph: 'හ', translit: 'h' },
			{ glyph: 'භ', translit: 'bh', tags: ['oddU'] },
			{ glyph: 'න', translit: 'n' },
			{ glyph: 'ත', translit: 't/th', tags: ['oddU'] },
			{ glyph: 'ක', translit: 'k', tags: ['oddU'] },
			{ glyph: 'ක්‍ර', translit: 'kr' },
			{ glyph: 'ක්‍ය', translit: 'ky' },
			{ glyph: 'ඟ', translit: 'ng', tags: ['oddU'] },
			{ glyph: 'ශ', translit: 'sh/s', tags: ['oddU'] },
			{ glyph: 'ශ්‍රී', translit: 'sri' },
		],
	},
	{
		name: 'One-off shapes',
		characters: [
			{ glyph: 'ර', translit: 'r', tags: ['oddU'] },
			{ glyph: 'ෆ', translit: 'f' },
			{ glyph: 'ඊ', translit: 'i', length: 'long', tags: ['vowel'] },
			{ glyph: 'ල', translit: 'l' },
			{ glyph: 'ළ', translit: 'l', tags: ['oddU'] },
		],
	},
	{
		name: 'Snakes and friends — head and tail (and more)',
		characters: [
			{ glyph: 'උ', translit: 'u', length: 'short', tags: ['vowel'] },
			{ glyph: 'ඌ', translit: 'u', length: 'long', tags: ['vowel'] },
			{ glyph: 'ද', translit: 'd' },
			{ glyph: 'ඳ', translit: 'nd' },
			{ glyph: 'ඥ', translit: 'gn' },
			{ glyph: 'ඤ', translit: 'ny' },
		],
	},
	{
		name: 'Pole-dancing snakes',
		characters: [
			{ glyph: 'අ', translit: 'a', length: 'short', tags: ['vowel'] },
			{ glyph: 'ආ', translit: 'a', length: 'long', tags: ['vowel'] },
			{ glyph: 'ඇ', translit: 'a/e', length: 'short', tags: ['vowel'] },
			{ glyph: 'ඈ', translit: 'e/ae', length: 'long', tags: ['vowel'] },
		],
	},
	{
		name: 'Swirls',
		characters: [
			{ glyph: 'ඉ', translit: 'i', length: 'short', tags: ['vowel'] },
			{ glyph: 'ඓ', translit: 'ai', tags: ['vowel'] },
			{ glyph: 'ණ', translit: 'n' },
		],
	},
]

const diacritics: Family[] = [
	{
		name: 'Swirls on the left',
		characters: [
			{ glyph: '◌ෙ', translit: 'e', length: 'short' },
			{ glyph: '◌ේ', translit: 'e', length: 'long' },
			{ glyph: '◌ො', translit: 'o', length: 'short' },
			{ glyph: '◌ෝ', translit: 'o', length: 'long' },
			{ glyph: '◌ෞ', translit: 'au' },
			{ glyph: '◌ෛ', translit: 'ai' },
		],
	},
	{
		name: 'Diacritic below',
		characters: [
			{
				glyph: '◌ු',
				translit: 'u',
				length: 'short',
				badges: [
					{ label: 'u', title: 'Different shape on consonants with the U tag', swatch: 'green' },
				],
			},
			{
				glyph: '◌ූ',
				translit: 'u',
				length: 'long',
				badges: [
					{ label: 'u', title: 'Different shape on consonants with the U tag', swatch: 'green' },
				],
			},
		],
	},
	{
		name: 'Diacritic above',
		characters: [
			{ glyph: '◌ි', translit: 'i', length: 'short' },
			{ glyph: '◌ී', translit: 'i', length: 'long' },
			{
				glyph: '◌්',
				translit: '–',
				badges: [
					{ label: 'al', title: 'Al-lakuna — vowel suppressor; different shape on consonants with the AL tag', swatch: 'red' },
				],
			},
		],
	},
	{
		name: 'Only chars on the right',
		characters: [
			{ glyph: '◌ා', translit: 'a', length: 'long' },
			{ glyph: '◌ැ', translit: 'a/e', length: 'short' },
			{ glyph: '◌ෑ', translit: 'e/ae', length: 'long' },
			{ glyph: '◌ෘ', translit: 'ru/ri' },
			{ glyph: '◌ං', translit: 'ng/m' },
			{ glyph: '◌ඃ', translit: 'h' },
		],
	},
]

const sections = [
	{
		title: 'Primary characters: consonants & standalone vowels',
		families: primaryCharacters,
	},
	{
		title: 'Diacritics — base consonant',
		families: diacritics,
		picker: true,
	},
]
</script>

<template>
	<article class="sheet">
		<section
			v-for="section in sections"
			:key="section.title"
			class="families"
		>
			<h2>
				{{ section.title }}
				<template v-if="section.picker">
					{{ baseCons }}
					<ConsonantPicker
						v-model="baseCons"
						script="sinhala"
						:consonants="['ක', 'ද', 'ම', 'ර', 'ල', 'ළ']"
					/>
				</template>
			</h2>

			<GlyphFamily
				v-for="family in section.families"
				v-slot="{ item: char }"
				:key="family.name"
				:name="family.name"
				:items="family.characters"
			>
				<span class="sinhala">{{ replaceConsonant(char.glyph) }}</span>
				<span class="rom">{{ char.translit }}</span>
				<span class="badges">
					<SinhalaBadge v-for="tag in char.tags" :key="tag" :tag="tag" />
					<CharBadge v-for="badge in char.badges" :key="badge.label" v-bind="badge" />
					<SinhalaBadge v-if="char.length" :tag="char.length" />
				</span>
			</GlyphFamily>
		</section>
	</article>
</template>

<style scoped>
.sinhala {
	font-family: var(--font-sinhala);
	font-size: var(--glyph);
	line-height: var(--lh-glyph);
	white-space: nowrap;
}
</style>
