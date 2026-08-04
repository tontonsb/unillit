<script setup lang="ts">
import LB from '@/components/LangBadge.vue'

interface Entry {
	cyr: string        // "Г г"
	rom: string         // romanisations joined with " · " when languages disagree
	gloss?: string
	langs?: string[]    // omitted when the letter is universal
}

// turn ['kk', 'ky'] into { kk: true, ky: true } for v-bind onto <l-b>
function langAttrs(codes: string[]): Record<string, boolean> {
	return Object.fromEntries(codes.map(c => [c, true]))
}

// Flat scan-a-sign index of every glyph across all covered languages.
// Sort order: Russian alphabetical spine, with derived/lookalike letters
// slotted right after their base letter.
const entries: Entry[] = [
	{ cyr: 'А а', rom: 'a' },
	{ cyr: 'Б б', rom: 'b' },
	{ cyr: 'В в', rom: 'v' },
	{ cyr: 'Г г', rom: 'g · h', gloss: 'h in Ukrainian & Belarusian' },
	{ cyr: 'Ґ ґ', rom: 'g', gloss: 'hard g', langs: ['uk'] },
	{ cyr: 'Ғ ғ', rom: 'gh', gloss: 'voiced uvular fricative', langs: ['kk', 'tg', 'uz', 'ba'] },
	{ cyr: 'Ҕ ҕ', rom: 'ğ', gloss: 'voiced velar fricative, Yakut\'s counterpart to Ғ', langs: ['sah'] },
	{ cyr: 'Ѓ ѓ', rom: 'gj', langs: ['mk'] },
	{ cyr: 'Д д', rom: 'd' },
	{ cyr: 'Ђ ђ', rom: 'đ / dj', langs: ['sr'] },
	{ cyr: 'Е е', rom: 'ye / e', gloss: 'ye- after vowel or word-start' },
	{ cyr: 'Є є', rom: 'ye', langs: ['uk'] },
	{ cyr: 'Ё ё', rom: 'yo', gloss: 'often written е', langs: ['ru', 'be', 'kk', 'ky', 'mn', 'tt', 'ba'] },
	{ cyr: 'Ж ж', rom: 'zh' },
	{ cyr: 'Җ җ', rom: 'zh / j', langs: ['tt', 'xal'] },
	{ cyr: 'Ӝ ӝ', rom: 'zh', gloss: 'palatal affricate', langs: ['udm'] },
	{ cyr: 'З з', rom: 'z' },
	{ cyr: 'Ѕ ѕ', rom: 'dz', langs: ['mk'] },
	{ cyr: 'Ӡ ӡ', rom: 'dz', langs: ['ab'] },
	{ cyr: 'Ҙ ҙ', rom: 'ź / dh', langs: ['ba'] },
	{ cyr: 'Ӟ ӟ', rom: 'dz', gloss: 'palatal affricate', langs: ['udm'] },
	{ cyr: 'И и', rom: 'i · y', gloss: 'y in Ukrainian (uses І for i)' },
	{ cyr: 'І і', rom: 'i', langs: ['uk', 'be', 'kk'] },
	{ cyr: 'Ї ї', rom: 'yi', langs: ['uk'] },
	{ cyr: 'Ӥ ӥ', rom: 'ï', gloss: 'palatalized i', langs: ['udm'] },
	{ cyr: 'Й й', rom: 'y', gloss: 'short i; glide' },
	{ cyr: 'Ј ј', rom: 'j', langs: ['sr', 'mk'] },
	{ cyr: 'К к', rom: 'k' },
	{ cyr: 'Қ қ', rom: 'q', gloss: 'uvular stop', langs: ['kk', 'ky', 'tg', 'uz'] },
	{ cyr: 'Ҡ ҡ', rom: 'q', langs: ['ba'] },
	{ cyr: 'Ҟ ҟ', rom: 'q̇', gloss: 'aspirated uvular', langs: ['ab'] },
	{ cyr: 'Л л', rom: 'l' },
	{ cyr: 'Љ љ', rom: 'lj', langs: ['sr', 'mk'] },
	{ cyr: 'М м', rom: 'm' },
	{ cyr: 'Н н', rom: 'n' },
	{ cyr: 'Ң ң', rom: 'ng / ñ', gloss: 'velar nasal', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv'] },
	{ cyr: 'Ҥ ҥ', rom: 'ng', gloss: 'velar nasal, Buryat/Yakut\'s own letter for the same sound as Ң', langs: ['bua', 'sah'] },
	{ cyr: 'Њ њ', rom: 'nj', langs: ['sr', 'mk'] },
	{ cyr: 'О о', rom: 'o' },
	{ cyr: 'Ө ө', rom: 'ö', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv', 'bua', 'sah', 'xal'] },
	{ cyr: 'Ӧ ӧ', rom: 'ö', gloss: 'umlaut o — distinct glyph from Ө', langs: ['mhr', 'udm', 'kv'] },
	{ cyr: 'П п', rom: 'p' },
	{ cyr: 'Ҧ ҧ', rom: 'ph', gloss: 'aspirated p', langs: ['ab'] },
	{ cyr: 'Ԥ ԥ', rom: 'ph', gloss: 'modern form of ҧ', langs: ['ab'] },
	{ cyr: 'Р р', rom: 'r', gloss: 'rolled' },
	{ cyr: 'С с', rom: 's' },
	{ cyr: 'Ҫ ҫ', rom: 'ś / th', gloss: 'sh-like affricate in Chuvash; th-like in Bashkir', langs: ['ba', 'cv'] },
	{ cyr: 'Т т', rom: 't' },
	{ cyr: 'Ћ ћ', rom: 'ć', gloss: 'soft ch', langs: ['sr'] },
	{ cyr: 'Ҭ ҭ', rom: 't', gloss: 'aspirated t', langs: ['ab'] },
	{ cyr: 'Ќ ќ', rom: 'kj', langs: ['mk'] },
	{ cyr: 'У у', rom: 'u' },
	{ cyr: 'Ў ў', rom: 'w / ŭ · oʻ', gloss: 'Belarusian glide, or Uzbek rounded vowel', langs: ['be', 'uz'] },
	{ cyr: 'Ұ ұ', rom: 'u', gloss: 'back unrounded vowel', langs: ['kk'] },
	{ cyr: 'Ү ү', rom: 'ü', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv', 'bua', 'sah', 'xal'] },
	{ cyr: 'Ӱ ӱ', rom: 'ü', gloss: 'umlaut u — distinct glyph from Ү', langs: ['mhr'] },
	{ cyr: 'Ӳ ӳ', rom: 'ü', gloss: 'umlaut u, Chuvash', langs: ['cv'] },
	{ cyr: 'Ф ф', rom: 'f' },
	{ cyr: 'Х х', rom: 'kh', gloss: 'like Scottish loch' },
	{ cyr: 'Ҳ ҳ', rom: 'h', gloss: 'pharyngeal/glottal h', langs: ['tg', 'uz', 'ab'] },
	{ cyr: 'Ц ц', rom: 'ts' },
	{ cyr: 'Ҵ ҵ', rom: 'c̣', gloss: 'ejective ts', langs: ['ab'] },
	{ cyr: 'Ч ч', rom: 'ch' },
	{ cyr: 'Ҷ ҷ', rom: 'j · ç̣', gloss: 'Tajik j-sound, or Abkhaz ejective ch', langs: ['tg', 'ab'] },
	{ cyr: 'Ҽ ҽ', rom: 'ch', gloss: 'retroflex ch', langs: ['ab'] },
	{ cyr: 'Ҿ ҿ', rom: 'ç̇', gloss: 'ejective retroflex ch', langs: ['ab'] },
	{ cyr: 'Џ џ', rom: 'dž / dzh', langs: ['sr', 'mk', 'ab'] },
	{ cyr: 'Ш ш', rom: 'sh' },
	{ cyr: 'Щ щ', rom: 'shch', gloss: 'sht in Bulgarian; be writes шч', langs: ['ru', 'uk', 'bg'] },
	{ cyr: 'Ъ ъ', rom: '"', gloss: 'silent separator (ru); a vowel a (bg)', langs: ['ru', 'bg'] },
	{ cyr: 'Ы ы', rom: 'y', gloss: 'back unrounded vowel', langs: ['ru', 'be'] },
	{ cyr: 'Ь ь', rom: '\'', gloss: 'soft sign — palatalises', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Э э', rom: 'e', gloss: 'plain e, not palatal', langs: ['ru', 'be'] },
	{ cyr: 'Ю ю', rom: 'yu', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Я я', rom: 'ya', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Ә ә', rom: 'ä', gloss: 'open front vowel', langs: ['kk', 'ba', 'tt', 'xal'] },
	{ cyr: 'Ӓ ӓ', rom: 'ä', gloss: 'umlaut a', langs: ['mhr'] },
	{ cyr: 'Ӑ ӑ', rom: 'ă', gloss: 'reduced a (breve)', langs: ['cv'] },
	{ cyr: 'Æ æ', rom: 'æ', gloss: 'open front vowel, Ossetian\'s one addition', langs: ['os'] },
	{ cyr: 'Ӗ ĕ', rom: 'ĕ', gloss: 'reduced e (breve)', langs: ['cv'] },
	{ cyr: 'Ӣ ӣ', rom: 'ī', gloss: 'long i', langs: ['tg'] },
	{ cyr: 'Ӯ ӯ', rom: 'ū', gloss: 'long u', langs: ['tg'] },
	{ cyr: 'Ҩ ҩ', rom: 'ò / w', gloss: 'labialized', langs: ['ab'] },
	{ cyr: 'Һ һ', rom: 'h', gloss: 'lighter h', langs: ['kk', 'ba', 'tt', 'sah', 'bua', 'xal'] },
]
</script>

<template>
	<article class="sheet">
		<section>
			<h2>All letters — scan-a-sign index</h2>
			<p class="section-note">Every glyph covered across all languages in one flat, alphabetically-anchored grid. Badges mark letters that aren't universal; glosses are kept only for genuine traps.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="e in entries" :key="e.cyr">
					<span class="cyr lg">{{ e.cyr }}</span>
					<span class="rom">{{ e.rom }}</span>
					<span v-if="e.gloss" class="gloss">{{ e.gloss }}</span>
					<l-b v-if="e.langs" v-bind="langAttrs(e.langs)" />
				</div>
			</div>
		</section>
	</article>
</template>

<style scoped>
.char-grid { --cell-min: 72px; }

.cyr {
	font-family: var(--font-cyrillic);
	font-size: var(--glyph);
	line-height: 1.15;
}
</style>
