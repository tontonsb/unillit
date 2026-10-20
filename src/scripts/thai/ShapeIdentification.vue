<script setup lang="ts">
import { computed, ref } from 'vue'
import ThaiBadge, { type ThaiTag } from './ThaiBadge.vue'
import GlyphFamily, { filterFamilies } from '@/components/GlyphFamily.vue'
import ConsonantPicker from '@/components/ConsonantPicker.vue'
import SheetToggle from '@/components/SheetToggle.vue'

const baseCons = ref('◌')
const showRare = ref(false)

function replaceConsonant(glyph: string): string {
	return glyph.replace(/ก/g, baseCons.value)
}

interface ConsonantChar {
	glyph: string
	translit: string
	final: string | null
	tags?: ThaiTag[]
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
	glyph: string
	translit: string
	length?: 'short' | 'long'
	shape?: SyllableShape
	rare?: boolean
}

interface VowelFamily {
	name: string
	characters: VowelChar[]
}

const vowelFamilies: VowelFamily[] = [
	{
		name: 'That 6-like thing on left',
		characters: [
			{ glyph: 'เก', translit: 'e', length: 'long' },
			{ glyph: 'เก็', translit: 'e', length: 'short', shape: 'prefinal' },
			{ glyph: 'เกะ', translit: 'e', length: 'short', shape: 'open' },

			/* เงิน is short, เดิน is long */
			{ glyph: 'เกิ', translit: 'oe', shape: 'prefinal' },

			{ glyph: 'เกา', translit: 'ao', length: 'short', shape: 'selfclosed' },
			{ glyph: 'เกาะ', translit: 'o', length: 'short', shape: 'open' },

			{ glyph: 'เกอ', translit: 'oe', length: 'long', shape: 'open' },
			{ glyph: 'เกอะ', translit: 'oe', length: 'short', shape: 'open', rare: true },
			{ glyph: 'เกือ', translit: 'uea', length: 'long' },
			{ glyph: 'เกือะ', translit: 'uea', length: 'short', shape: 'open', rare: true },
			{ glyph: 'เกือย', translit: 'ueai', length: 'long', shape: 'selfclosed', rare: true },

			/* only appears in the word เกอว http://www.thai-language.com/id/141803 */
			// { glyph: 'เกอว', translit: 'oeu', length: 'long', shape: 'selfclosed' },

			{ glyph: 'เกย', translit: 'oei', length: 'long', shape: 'selfclosed' },
			{ glyph: 'เกีย', translit: 'ia', length: 'long' },
			{ glyph: 'เกียะ', translit: 'ia', length: 'short', shape: 'open', rare: true },
			{ glyph: 'เกียว', translit: 'iao', length: 'long', shape: 'selfclosed' },

			{ glyph: 'เกว', translit: 'eo', length: 'long', shape: 'selfclosed', rare: true },
			{ glyph: 'เก็ว', translit: 'eo', length: 'short', shape: 'selfclosed', rare: true },
		],
	},
	{
		name: 'Two of the 6-likes. Or one but with an umbrella.',
		characters: [
			{ glyph: 'แก', translit: 'ae', length: 'long' },
			{ glyph: 'แก็', translit: 'ae', length: 'short', shape: 'prefinal' },
			{ glyph: 'แกะ', translit: 'ae', length: 'short', shape: 'open' },

			{ glyph: 'แกว', translit: 'aeo', length: 'long', shape: 'selfclosed' },
			{ glyph: 'แก็ว', translit: 'aeo', length: 'short', shape: 'selfclosed', rare: true },

			{ glyph: 'โก', translit: 'o', length: 'long' },
			{ glyph: 'โกะ', translit: 'o', length: 'short', shape: 'open' },
			{ glyph: 'โกย', translit: 'oi', length: 'long', shape: 'selfclosed' },
			{ glyph: 'ใก', translit: 'ai', length: 'short', shape: 'selfclosed' },
			{ glyph: 'ไก', translit: 'ai', length: 'short', shape: 'selfclosed' },
			{ glyph: 'ไกย', translit: 'ai', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Diacritic below',
		characters: [
			{ glyph: 'กุ', translit: 'u', length: 'short' },
			{ glyph: 'กู', translit: 'u', length: 'long' },
			{ glyph: 'กุย', translit: 'ui', length: 'short', shape: 'selfclosed', rare: true },
		],
	},
	{
		name: 'Diacritic above',
		characters: [
			{ glyph: 'กั', translit: 'a', length: 'short', shape: 'prefinal' },
			{ glyph: 'กัว', translit: 'ua', length: 'long', shape: 'open' },
			{ glyph: 'กัวะ', translit: 'ua', length: 'short', shape: 'open', rare: true },

			{ glyph: 'กัย', translit: 'ai', length: 'short', shape: 'selfclosed' },

			{ glyph: 'กิ', translit: 'i', length: 'short' },
			{ glyph: 'กิว', translit: 'io', length: 'short', shape: 'selfclosed' },

			{ glyph: 'กี', translit: 'i', length: 'long' },

			{ glyph: 'กื', translit: 'ue', length: 'long', shape: 'prefinal' },
			{ glyph: 'กือ', translit: 'ue', length: 'long', shape: 'open' },

			{ glyph: 'กึ', translit: 'ue', length: 'short' },

			{ glyph: 'กำ', translit: 'am', length: 'short', shape: 'selfclosed' },
		],
	},
	{
		name: 'Only chars on the right',
		characters: [
			{ glyph: 'กา', translit: 'a', length: 'long' },
			{ glyph: 'กอ', translit: 'o', length: 'long' },
			{ glyph: 'ก็อ', translit: 'o', length: 'short', shape: 'prefinal', rare: true },
			{ glyph: 'กะ', translit: 'a', length: 'short', shape: 'open' },

			{ glyph: 'กว', translit: 'ua', length: 'long', shape: 'prefinal' },
			{ glyph: 'กวย', translit: 'uai', length: 'long', shape: 'selfclosed' },

			{ glyph: 'กอย', translit: 'oi', length: 'long', shape: 'selfclosed' },
			{ glyph: 'ก็อย', translit: 'oi', length: 'short', shape: 'selfclosed', rare: true },

			{ glyph: 'กาว', translit: 'ao', length: 'long', shape: 'selfclosed' },
			{ glyph: 'กาย', translit: 'ai', length: 'long', shape: 'selfclosed' },
			{ glyph: 'กรร', translit: 'a/an', length: 'short' },
		],
	},
	{
		name: 'Ligatures',
		characters: [
			{ glyph: 'ฤ', translit: 'ri/rue/roe', rare: true },
			{ glyph: 'ฤๅ', translit: 'rue', length: 'long', shape: 'open', rare: true },
			{ glyph: 'ฦ', translit: 'lue', rare: true },
			{ glyph: 'ฦๅ', translit: 'lue', length: 'long', shape: 'open', rare: true },
		],
	},
]

const visibleVowelFamilies = computed(() => {
	if (showRare.value) return vowelFamilies

	return filterFamilies(vowelFamilies, vowel => !vowel.rare)
})

const consonantFamilies: ConsonantFamily[] = [
	{
		name: 'Crates — floor and both sides',
		characters: [
			{ glyph: 'บ', translit: 'b', final: 'p' },
			{ glyph: 'ป', translit: 'p', final: 'p' },
			{ glyph: 'ข', translit: 'kh', final: 'k' },
			{ glyph: 'ฃ', translit: 'kh', final: 'k' },
			{ glyph: 'ช', translit: 'ch', final: 't' },
			{ glyph: 'ซ', translit: 's', final: 't' },
			{ glyph: 'ษ', translit: 's', final: 't' },
			{ glyph: 'ฆ', translit: 'kh', final: 'k' },
			{ glyph: 'น', translit: 'n', final: 'n' },
			{ glyph: 'ม', translit: 'm', final: 'm' },
			{ glyph: 'ย', translit: 'y', final: 'y', tags: ['vowel'] },
		],
	},
	{
		name: 'Minions — roof and both sides',
		characters: [
			{ glyph: 'ก', translit: 'k', final: 'k' },
			{ glyph: 'ถ', translit: 'th', final: 't' },
			{ glyph: 'ภ', translit: 'ph', final: 'p' },
			{ glyph: 'ฎ', translit: 'd', final: 't' },
			{ glyph: 'ฏ', translit: 't', final: 't' },
			{ glyph: 'ด', translit: 'd', final: 't' },
			{ glyph: 'ค', translit: 'kh', final: 'k' },
			{ glyph: 'ศ', translit: 's', final: 't' },
			{ glyph: 'ต', translit: 't', final: 't' },
			{ glyph: 'ฅ', translit: 'kh', final: 'k' },
		],
	},
	{
		name: 'Minions holding a sword',
		characters: [
			{ glyph: 'ฒ', translit: 'th', final: 't' },
			{ glyph: 'ณ', translit: 'n', final: 'n' },
			{ glyph: 'ฌ', translit: 'ch', final: 't' },
			{ glyph: 'ญ', translit: 'y', final: 'n' },
		],
	},
	{
		name: 'Pacman ghosts/AmongUs — side gap',
		characters: [
			{ glyph: 'อ', translit: '–', final: null, tags: ['vowel'] },
			{ glyph: 'ฮ', translit: 'h', final: null },
			{ glyph: 'จ', translit: 'ch', final: 't' },
			{ glyph: 'ฉ', translit: 'ch', final: null },
			{ glyph: 'ล', translit: 'l', final: 'n' },
			{ glyph: 'ส', translit: 's', final: 't' },
		],
	},
	{
		name: 'Flags',
		characters: [
			{ glyph: 'ร', translit: 'r', final: 'n/–' },
			{ glyph: 'ธ', translit: 'th', final: 't' },
			{ glyph: 'ฐ', translit: 'th', final: 't' },
		],
	},
	{
		name: 'Hooks',
		characters: [
			{ glyph: 'ง', translit: 'ng', final: 'ng' },
			{ glyph: 'ว', translit: 'w', final: 'o/u', tags: ['vowel'] },
		],
	},
	{
		name: 'Squiggles — N-like',
		characters: [
			{ glyph: 'ห', translit: 'h', final: null },
			{ glyph: 'ท', translit: 'th', final: 't' },
			{ glyph: 'ฑ', translit: 'th', final: 't' },
		],
	},
	{
		name: 'W-shape',
		characters: [
			{ glyph: 'ผ', translit: 'ph', final: null },
			{ glyph: 'ฝ', translit: 'f', final: null },
			{ glyph: 'พ', translit: 'ph', final: 'p' },
			{ glyph: 'ฟ', translit: 'f', final: 'p' },
			{ glyph: 'ฬ', translit: 'l', final: 'n' },
		],
	},
]
</script>

<template>
	<article class="sheet">
		<section class="families">
			<h2>Consonants — translit: initial / –final sound</h2>

			<GlyphFamily
				v-for="family in consonantFamilies"
				v-slot="{ item: char }"
				:key="family.name"
				:name="family.name"
				:items="family.characters"
			>
				<span class="thai">{{ char.glyph }}</span>
				<span class="rom">{{ char.translit }}</span>
				<span v-if="char.final" class="rom-alt">–{{ char.final }}</span>
				<ThaiBadge v-for="tag in char.tags" :key="tag" :tag="tag" />
			</GlyphFamily>
		</section>

		<section class="families">
			<h2>
				Vowels — base consonant {{ baseCons }}
				<ConsonantPicker
					v-model="baseCons"
					script="thai"
					:consonants="['ก', 'ข', 'ด', 'ท', 'น']"
				/>
			</h2>
			<p class="section-note">
				<span>Syllable shape:</span>
				<span class="shape-key">
					<ThaiBadge tag="open" />
					<small>ends with this vowel</small>
				</span>
				<span class="shape-key">
					<ThaiBadge tag="selfclosed" />
					<small>ends with this glide</small>
				</span>
				<span class="shape-key">
					<ThaiBadge tag="prefinal" />
					<small>next consonant will end this syllable</small>
				</span>
				<SheetToggle v-model="showRare">
					Uncommon forms
				</SheetToggle>
			</p>

			<GlyphFamily
				v-for="family in visibleVowelFamilies"
				v-slot="{ item: vowel }"
				:key="family.name"
				:name="family.name"
				:items="family.characters"
			>
				<span class="thai">{{ replaceConsonant(vowel.glyph) }}</span>
				<span class="rom">{{ vowel.translit }}</span>
				<span class="badges">
					<ThaiBadge v-if="vowel.length" :tag="vowel.length" />
					<ThaiBadge v-if="vowel.shape" :tag="vowel.shape" />
				</span>
			</GlyphFamily>
		</section>
	</article>
</template>

<style scoped>
.shape-key {
	display: inline-flex;
	align-items: center;
	gap: var(--sp-4);
}

.thai {
	font-family: var(--font-thai);
	font-size: var(--glyph);
	line-height: var(--lh-glyph);
}
</style>
