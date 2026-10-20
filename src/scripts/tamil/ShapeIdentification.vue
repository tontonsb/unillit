<script setup lang="ts">
import { computed, ref } from 'vue'
import TamilBadge, { type TamilTag } from './TamilBadge.vue'
import CharBadge, { type BadgeDef } from '@/components/CharBadge.vue'
import ConsonantPicker from '@/components/ConsonantPicker.vue'
import GlyphFamily, { filterFamilies } from '@/components/GlyphFamily.vue'
import SheetToggle from '@/components/SheetToggle.vue'

const baseCons = ref('◌')
const showUForms = ref(true)

function replaceConsonant(glyph: string): string {
	return glyph.replace(/◌/g, baseCons.value)
}

interface Char {
	glyph: string
	translit: string
	voiced?: string
	length?: 'short' | 'long'
	tags?: TamilTag[]
	badges?: BadgeDef[]
}

interface Family {
	name: string
	characters: Char[]
}

const primaryCharacters: Family[] = [
	{
		name: 'Angled bottom left',
		characters: [
			{ glyph: 'ட', translit: 't', voiced: 'd' },
			{ glyph: 'ப', translit: 'p', voiced: 'b' },
			{ glyph: 'பு', translit: 'pu', length: 'short' },
			{ glyph: 'பூ', translit: 'pu', length: 'long' },
			{ glyph: 'ம', translit: 'm' },
			{ glyph: 'ழ', translit: 'zh/l' },
			{ glyph: 'ஸ்ரீ', translit: 'sri' },
		],
	},
	{
		name: 'U and lines',
		characters: [
			{ glyph: 'ய', translit: 'y' },
			{ glyph: 'யு', translit: 'yu', length: 'short' },
			{ glyph: 'யூ', translit: 'yu', length: 'long' },
		],
	},
	{
		name: 'Cursive m',
		characters: [
			{ glyph: 'ற', translit: 'r' },
			{ glyph: 'று', translit: 'ru', length: 'short' },
			{ glyph: 'றூ', translit: 'ru', length: 'long' },
		],
	},
	{
		name: 'Pi-shape',
		characters: [
			{ glyph: 'ர', translit: 'r' },
			{ glyph: 'ந', translit: 'n' },
			{ glyph: 'நு', translit: 'nu', length: 'short' },
			{ glyph: 'நூ', translit: 'nu', length: 'long' },
			{ glyph: 'ங', translit: 'ng' },
			{ glyph: 'ஙு', translit: 'ngu', length: 'short' },
			{ glyph: 'ஙூ', translit: 'ngu', length: 'long' },
			{ glyph: 'ஈ', translit: 'i/ee', length: 'long', tags: ['vowel'] },
		],
	},
	{
		name: 'Box on circle',
		characters: [
			{ glyph: 'ச', translit: 's/ch', voiced: 'j' },
			{ glyph: 'சு', translit: 'su', length: 'short' },
			{ glyph: 'க', translit: 'k', voiced: 'g' },
			{ glyph: 'த', translit: 'th/t', voiced: 'd' },
			{ glyph: 'து', translit: 'thu', length: 'short' },
			{ glyph: 'தூ', translit: 'thu', length: 'long' },
			{ glyph: 'கூ', translit: 'ku', length: 'long' },
			{ glyph: 'க்ஷ', translit: 'ksh' },
		],
	},
	{
		name: 'Cobra',
		characters: [
			{ glyph: 'உ', translit: 'u', length: 'short', tags: ['vowel'] },
			{ glyph: 'அ', translit: 'a', length: 'short', tags: ['vowel'] },
			{ glyph: 'ஆ', translit: 'a', length: 'long', tags: ['vowel'] },
			{ glyph: 'ஊ', translit: 'u/oo', length: 'long', tags: ['vowel'] },
		],
	},
	{
		name: 'Name TBD',
		characters: [
			{ glyph: 'ஒ', translit: 'o', length: 'short', tags: ['vowel'] },
			{ glyph: 'ஓ', translit: 'o', length: 'long', tags: ['vowel'] },
			{ glyph: 'ஔ', translit: 'au', tags: ['vowel'] },
			{ glyph: 'ஐ', translit: 'ai', tags: ['vowel'] },
			{ glyph: 'ஜ', translit: 'j' },
		],
	},
	{
		name: 'Hanging cherry on left',
		characters: [
			{ glyph: 'எ', translit: 'e', length: 'short', tags: ['vowel'] },
			{ glyph: 'ஏ', translit: 'e', length: 'long', tags: ['vowel'] },
			{ glyph: 'ல', translit: 'l' },
			{ glyph: 'வ', translit: 'v' },
			{ glyph: 'வு', translit: 'vu', length: 'short' },
			{ glyph: 'ள', translit: 'l' },
			{ glyph: 'ன', translit: 'n' },
			{ glyph: 'ண', translit: 'n' },
			{ glyph: 'ஷ', translit: 'sh' },
			{ glyph: 'ஸ', translit: 's' },
		],
	},
	{
		name: 'Underlined cherry',
		characters: [
			{ glyph: 'வூ', translit: 'vu', length: 'long' },
			{ glyph: 'லு', translit: 'lu', length: 'short' },
			{ glyph: 'லூ', translit: 'lu', length: 'long' },
			{ glyph: 'ஹ', translit: 'h' },
			{ glyph: 'ஞு', translit: 'nju', length: 'short' },
			{ glyph: 'ஞூ', translit: 'nju', length: 'long' },
			{ glyph: 'னு', translit: 'nu', length: 'short' },
			{ glyph: 'னூ', translit: 'nu', length: 'long' },
			{ glyph: 'ணு', translit: 'nu', length: 'short' },
			{ glyph: 'ணூ', translit: 'nu', length: 'long' },
		],
	},
	{
		name: 'Overhead loop',
		characters: [
			{ glyph: 'டு', translit: 'tu', length: 'short' },
			{ glyph: 'டூ', translit: 'tu', length: 'long' },
			{ glyph: 'இ', translit: 'i', length: 'short', tags: ['vowel'] },
		],
	},
	{
		name: 'In a clockwise circle',
		characters: [
			{ glyph: 'மு', translit: 'mu', length: 'short' },
			{ glyph: 'ழு', translit: 'zhu', length: 'short' },
			{ glyph: 'கு', translit: 'ku', length: 'short' },
			{ glyph: 'சூ', translit: 'su', length: 'long' },
			{ glyph: 'ஞ', translit: 'nj' },
			{ glyph: 'ளு', translit: 'lu', length: 'short' },
			{ glyph: 'ரு', translit: 'ru', length: 'short' },
		],
	},
	{
		name: 'In a loopy circle (all long U)',
		characters: [
			{ glyph: 'மூ', translit: 'mu', length: 'long' },
			{ glyph: 'ழூ', translit: 'zhu', length: 'long' },
			{ glyph: 'ளூ', translit: 'lu', length: 'long' },
			{ glyph: 'ரூ', translit: 'ru', length: 'long' },
		],
	},
]

const diacritics: Family[] = [
	{
		name: 'Curls on the left',
		characters: [
			{ glyph: '◌ெ', translit: 'e', length: 'short' },
			{ glyph: '◌ொ', translit: 'o', length: 'short' },
			{ glyph: '◌ௌ', translit: 'au' },
			{ glyph: '◌ே', translit: 'e', length: 'long' },
			{ glyph: '◌ோ', translit: 'o', length: 'long' },
			{ glyph: '◌ை', translit: 'ai' },
		],
	},
	{
		name: 'Diacritic above',
		characters: [
			{ glyph: '◌்', translit: '–' },
			{ glyph: '◌ீ', translit: 'i/ee', length: 'long' },
		],
	},
	{
		name: 'Only on the right',
		characters: [
			{ glyph: '◌ா', translit: 'a', length: 'long' },
			{ glyph: '◌ி', translit: 'i', length: 'short' },
		],
	},
	{
		name: 'Inconsistent',
		characters: [
			{ glyph: '◌ு', translit: 'u', length: 'short' },
			{ glyph: '◌ூ', translit: 'u/oo', length: 'long' },
		],
	},
]

const visiblePrimaryCharacters = computed(() => {
	if (showUForms.value) return primaryCharacters

	return filterFamilies(primaryCharacters, char => !/[ுூ]$/.test(char.glyph))
})

const sections = computed(() => [
	{
		title: 'Primary characters: consonants & standalone vowels',
		note: 'The additional transliteration of stops appears inside a word (between vowels, after a nasal)',
		families: visiblePrimaryCharacters.value,
		uToggle: true,
	},
	{
		title: 'Diacritics — base consonant',
		note: 'No sign defaults to <i>a</i>. Note that <i>u</i> forms are available above since they vary a lot.',
		families: diacritics,
		picker: true,
	},
])
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
						script="tamil"
						:consonants="['க', 'ட', 'ம', 'ல', 'ன']"
					/>
				</template>
			</h2>
			<p v-if="section.note" class="section-note">
				<span v-html="section.note"></span>
				<SheetToggle v-if="section.uToggle" v-model="showUForms">
					Include <i>U</i> forms
				</SheetToggle>
			</p>

			<GlyphFamily
				v-for="family in section.families"
				v-slot="{ item: char }"
				:key="family.name"
				:name="family.name"
				:items="family.characters"
			>
				<span class="tamil">{{ replaceConsonant(char.glyph) }}</span>
				<span class="rom">{{ char.translit }}</span>
				<span v-if="char.voiced" class="rom-alt">{{ char.voiced }}</span>
				<span class="badges">
					<TamilBadge v-for="tag in char.tags" :key="tag" :tag="tag" />
					<CharBadge v-for="badge in char.badges" :key="badge.label" v-bind="badge" />
					<TamilBadge v-if="char.length" :tag="char.length" />
				</span>
			</GlyphFamily>
		</section>
	</article>
</template>

<style scoped>
.tamil {
	font-family: var(--font-tamil);
	font-size: var(--glyph);
	line-height: var(--lh-glyph);
	white-space: nowrap;
}
</style>
