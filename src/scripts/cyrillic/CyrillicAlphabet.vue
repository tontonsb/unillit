<script setup lang="ts">
import LB from '@/components/LangBadge.vue'

// A letter cell: glyph(s), romanisation, optional gloss (may carry <em>) and
// language badges. `locl` applies the lang attr to the glyph so the font's
// language-specific (locl) form shows.
interface Letter {
	cyr: string
	rom: string
	gloss?: string
	langs?: string[]
	locl?: string
}

interface Group {
	label: string
	note?: string   // per-language romanisation standard / scope note
	letters: Letter[]
}

// turn ['kk', 'ky'] into { kk: true, ky: true } for v-bind onto <l-b>
function langAttrs(codes: string[]): Record<string, boolean> {
	return Object.fromEntries(codes.map(c => [c, true]))
}

// The universal core — present in every covered Cyrillic alphabet (Russian,
// Ukrainian, Belarusian, Bulgarian, Serbian, Macedonian, and the
// Russian-sphere non-Slavic alphabets). No badges: that's the point.
const universalCore: Letter[] = [
	{ cyr: 'А а', rom: 'a' },
	{ cyr: 'Б б', rom: 'b' },
	{ cyr: 'В в', rom: 'v' },
	{ cyr: 'Г г', rom: 'g', gloss: '<em>h</em> in Ukrainian &amp; Belarusian' },
	{ cyr: 'Д д', rom: 'd' },
	{ cyr: 'Е е', rom: 'ye / e', gloss: 'ye- after vowel or word-start; varies by language — see Reading tips' },
	{ cyr: 'Ж ж', rom: 'zh', gloss: 'like <em>s</em> in <em>measure</em>' },
	{ cyr: 'З з', rom: 'z' },
	{ cyr: 'К к', rom: 'k' },
	{ cyr: 'Л л', rom: 'l' },
	{ cyr: 'М м', rom: 'm' },
	{ cyr: 'Н н', rom: 'n' },
	{ cyr: 'О о', rom: 'o' },
	{ cyr: 'П п', rom: 'p' },
	{ cyr: 'Р р', rom: 'r', gloss: 'rolled' },
	{ cyr: 'С с', rom: 's' },
	{ cyr: 'Т т', rom: 't' },
	{ cyr: 'У у', rom: 'u' },
	{ cyr: 'Ф ф', rom: 'f' },
	{ cyr: 'Х х', rom: 'kh', gloss: 'like Scottish <em>loch</em>' },
	{ cyr: 'Ц ц', rom: 'ts' },
	{ cyr: 'Ч ч', rom: 'ch' },
	{ cyr: 'Ш ш', rom: 'sh' },
]

// Shared across the Russian/Bulgarian sphere, with per-letter caveats.
// Serbian & Macedonian drop this pack entirely (see the callout below).
const iotationPack: Letter[] = [
	{ cyr: 'И и', rom: 'i', gloss: '= <em>y</em> in Ukrainian (which uses І for <em>i</em>)', langs: ['ru', 'uk', 'bg', 'kk', 'ky', 'uz', 'tg', 'mn', 'tt', 'ba'] },
	{ cyr: 'Й й', rom: 'y', gloss: 'short <em>i</em>; glide', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Щ щ', rom: 'shch', gloss: '<em>sht</em> in Bulgarian; Belarusian writes шч instead', langs: ['ru', 'uk', 'bg'] },
	{ cyr: 'Ъ ъ', rom: '"', gloss: 'silent separator in Russian; a full vowel (<em>a</em>) in Bulgarian', langs: ['ru', 'bg'] },
	{ cyr: 'Ы ы', rom: 'y', gloss: 'back unrounded vowel; like <em>i</em> said deep in throat', langs: ['ru', 'be'] },
	{ cyr: 'Ь ь', rom: '\'', gloss: 'soft sign — palatalises preceding consonant', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Э э', rom: 'e', gloss: 'plain <em>e</em>, not palatal', langs: ['ru', 'be'] },
	{ cyr: 'Ю ю', rom: 'yu', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Я я', rom: 'ya', langs: ['ru', 'uk', 'be', 'bg'] },
	{ cyr: 'Ё ё', rom: 'yo', gloss: 'usually written as е in Russian running text', langs: ['ru', 'be', 'kk', 'ky', 'mn', 'tt', 'ba'] },
]

const extendedGroups: Group[] = [
	{
		label: 'Ukrainian  Українська',
		note: 'Romanisation: KMU 2010 (national). Uses И for the y-sound and І for i.',
		letters: [
			{ cyr: 'І і', rom: 'i', langs: ['uk'] },
			{ cyr: 'Ї ї', rom: 'yi', langs: ['uk'] },
			{ cyr: 'Є є', rom: 'ye', langs: ['uk'] },
			{ cyr: 'Ґ ґ', rom: 'g', gloss: 'hard g (rare)', langs: ['uk'] },
		],
	},
	{
		label: 'Belarusian  Беларуская',
		note: 'Romanisation: BGN/PCGN. Note the unique Ў; uses І in place of И.',
		letters: [
			{ cyr: 'Ў ў', rom: 'w / ŭ', gloss: 'non-syllabic <em>u</em>', langs: ['be'] },
			{ cyr: 'І і', rom: 'i', langs: ['be'] },
		],
	},
	{
		label: 'Serbian  Српски  (1:1 mapping with Latin alphabet)',
		note: 'Each letter maps 1:1 to a Latin letter (Gaj’s alphabet) — no digraphs to decode.',
		letters: [
			{ cyr: 'Ј ј', rom: 'j', langs: ['sr'] },
			{ cyr: 'Љ љ', rom: 'lj', langs: ['sr'] },
			{ cyr: 'Њ њ', rom: 'nj', langs: ['sr'] },
			{ cyr: 'Ћ ћ', rom: 'ć', gloss: 'soft <em>ch</em>', langs: ['sr'] },
			{ cyr: 'Ђ ђ', rom: 'đ / dj', gloss: 'soft <em>dj</em>', langs: ['sr'] },
			{ cyr: 'Џ џ', rom: 'dž', langs: ['sr'] },
		],
	},
	{
		label: 'Macedonian  Македонски',
		note: 'Romanisation: official 2019 standard, close to Serbian’s 1:1 Latin.',
		letters: [
			{ cyr: 'Ѓ ѓ', rom: 'gj', langs: ['mk'] },
			{ cyr: 'Ѕ ѕ', rom: 'dz', langs: ['mk'] },
			{ cyr: 'Ќ ќ', rom: 'kj', langs: ['mk'] },
			{ cyr: 'Ј ј', rom: 'j', langs: ['mk'] },
			{ cyr: 'Љ љ', rom: 'lj', langs: ['mk'] },
			{ cyr: 'Њ њ', rom: 'nj', langs: ['mk'] },
			{ cyr: 'Џ џ', rom: 'dž', langs: ['mk'] },
		],
	},
	{
		label: 'Shared Turkic &amp; Mongolic letters — uvulars, front rounded vowels &amp; nasals',
		note: 'The widest-shared non-core letters, spanning Central Asia, the Volga-Ural region, southern Siberia and Mongolia.',
		letters: [
			{ cyr: 'Қ қ', rom: 'q', gloss: 'uvular stop, further back than к', langs: ['kk', 'ky', 'tg', 'uz'] },
			{ cyr: 'Ғ ғ', rom: 'gh', gloss: 'voiced uvular fricative', langs: ['kk', 'tg', 'uz'] },
			{ cyr: 'Ҕ ҕ', rom: 'ğ', gloss: 'voiced velar fricative — Yakut\'s counterpart to Ғ', langs: ['sah'] },
			{ cyr: 'Ң ң', rom: 'ng', gloss: 'velar nasal, like <em>sing</em>', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv'] },
			{ cyr: 'Ҥ ҥ', rom: 'ng', gloss: 'velar nasal — Buryat &amp; Yakut\'s own letter for the same sound as Ң', langs: ['bua', 'sah'] },
			{ cyr: 'Ө ө', rom: 'ö', gloss: 'like German <em>ö</em>', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv', 'bua', 'sah', 'xal'] },
			{ cyr: 'Ү ү', rom: 'ü', gloss: 'like German <em>ü</em>', langs: ['kk', 'ky', 'mn', 'ba', 'tt', 'tyv', 'bua', 'sah', 'xal'] },
			{ cyr: 'Һ һ', rom: 'h', gloss: 'lighter/glottal h', langs: ['kk', 'ba', 'tt', 'sah', 'bua', 'xal'] },
			{ cyr: 'Ҳ ҳ', rom: 'h', gloss: 'pharyngeal/glottal h', langs: ['tg', 'uz'] },
			{ cyr: 'Ә ә', rom: 'ä', gloss: 'open front vowel', langs: ['kk', 'ba', 'tt', 'xal'] },
			{ cyr: 'Җ җ', rom: 'zh / j', gloss: 'like French <em>j</em>', langs: ['tt', 'xal'] },
		],
	},
	{
		label: 'Kazakh only  Қазақ',
		note: 'Cyrillic still in everyday use; a Latin alphabet is being phased in.',
		letters: [
			{ cyr: 'Ұ ұ', rom: 'u', gloss: 'back unrounded vowel', langs: ['kk'] },
			{ cyr: 'І і', rom: 'i', gloss: 'front vowel (≠ Russian и)', langs: ['kk'] },
		],
	},
	{
		label: 'Tajik only  Тоҷик  — long vowels & j-sound',
		note: 'Persian written in Cyrillic; romanisation follows the national standard.',
		letters: [
			{ cyr: 'Ӣ ӣ', rom: 'ī', gloss: 'long i', langs: ['tg'] },
			{ cyr: 'Ӯ ӯ', rom: 'ū', gloss: 'long u', langs: ['tg'] },
			{ cyr: 'Ҷ ҷ', rom: 'j', gloss: 'like English <em>j</em>', langs: ['tg'] },
		],
	},
	{
		label: 'Bashkir  Башҡорт  — 9 extra letters, 3 with localized forms',
		note: 'Shared with neighbouring Turkic alphabets. Ғ, Ҙ, Ҫ also get Bashkir-specific shapes via the locl feature (tagged BA).',
		letters: [
			{ cyr: 'Ғ ғ', rom: 'ğ', gloss: 'voiced velar fricative', langs: ['ba'], locl: 'ba' },
			{ cyr: 'Ҙ ҙ', rom: 'ź / dh', gloss: 'voiced interdental, like <em>th</em> in <em>this</em>', langs: ['ba'], locl: 'ba' },
			{ cyr: 'Ҫ ҫ', rom: 'ś / th', gloss: 'voiceless interdental, like <em>th</em> in <em>thin</em>', langs: ['ba'], locl: 'ba' },
			{ cyr: 'Ҡ ҡ', rom: 'q', gloss: 'uvular stop', langs: ['ba'] },
			{ cyr: 'Ң ң', rom: 'ñ', gloss: 'velar nasal', langs: ['ba'] },
			{ cyr: 'Һ һ', rom: 'h', gloss: 'glottal h', langs: ['ba'] },
			{ cyr: 'Ә ә', rom: 'ä', gloss: 'open front vowel', langs: ['ba'] },
			{ cyr: 'Ө ө', rom: 'ö', gloss: 'like German <em>ö</em>', langs: ['ba'] },
			{ cyr: 'Ү ү', rom: 'ü', gloss: 'like German <em>ü</em>', langs: ['ba'] },
		],
	},
	{
		label: 'Chuvash  Чӑваш  — breve &amp; umlaut vowels',
		note: 'Also reuses Bashkir\'s Ҫ, but for a different sound (a sh-like affricate here, not a th).',
		letters: [
			{ cyr: 'Ӑ ӑ', rom: 'ă', gloss: 'reduced <em>a</em> (breve mark)', langs: ['cv'] },
			{ cyr: 'Ӗ ĕ', rom: 'ĕ', gloss: 'reduced <em>e</em> (breve mark)', langs: ['cv'] },
			{ cyr: 'Ҫ ҫ', rom: 'ś', gloss: 'sh-like affricate (unrelated to Bashkir\'s th-like Ҫ)', langs: ['cv'] },
			{ cyr: 'Ӳ ӳ', rom: 'ü', gloss: 'front rounded <em>u</em> (umlaut mark)', langs: ['cv'] },
		],
	},
	{
		label: 'Volga-Finnic letters  Mari, Udmurt, Komi',
		note: 'Permic &amp; Mari umlaut vowels and affricates — note Ӧ/Ӱ use diaeresis dots, not the barred Ө/Ү above.',
		letters: [
			{ cyr: 'Ӓ ӓ', rom: 'ä', gloss: 'umlaut <em>a</em>', langs: ['mhr'] },
			{ cyr: 'Ӧ ӧ', rom: 'ö', gloss: 'umlaut <em>o</em> — distinct glyph from Ө above', langs: ['mhr', 'udm', 'kv'] },
			{ cyr: 'Ӱ ӱ', rom: 'ü', gloss: 'umlaut <em>u</em> — distinct glyph from Ү above', langs: ['mhr'] },
			{ cyr: 'Ӥ ӥ', rom: 'ï', gloss: 'palatalized <em>i</em>', langs: ['udm'] },
			{ cyr: 'Ӝ ӝ', rom: 'zh', gloss: 'palatal affricate', langs: ['udm'] },
			{ cyr: 'Ӟ ӟ', rom: 'dz', gloss: 'palatal affricate', langs: ['udm'] },
		],
	},
	{
		label: 'Abkhaz  Аҧсны  — letters beyond Russian',
		note: 'Many fall in the supplement block U+0500–U+052F and may not be covered by every font (the toponym Аҧсны itself uses ҧ).',
		letters: [
			{ cyr: 'Ҕ ҕ', rom: 'ǧ', gloss: 'voiced uvular', langs: ['ab'] },
			{ cyr: 'Ҟ ҟ', rom: 'q̇', gloss: 'aspirated uvular', langs: ['ab'] },
			{ cyr: 'Ҩ ҩ', rom: 'ò / w', gloss: 'labialized', langs: ['ab'] },
			{ cyr: 'Ҧ ҧ', rom: 'ph', gloss: 'aspirated p (as in Аҧсны)', langs: ['ab'] },
			{ cyr: 'Ԥ ԥ', rom: 'ph', gloss: 'modern form of ҧ', langs: ['ab'] },
			{ cyr: 'Ҭ ҭ', rom: 't', gloss: 'aspirated t', langs: ['ab'] },
			{ cyr: 'Ҵ ҵ', rom: 'c̣', gloss: 'ejective ts', langs: ['ab'] },
			{ cyr: 'Ҷ ҷ', rom: 'ç̣', gloss: 'ejective ch', langs: ['ab'] },
			{ cyr: 'Ҽ ҽ', rom: 'ch', gloss: 'retroflex ch', langs: ['ab'] },
			{ cyr: 'Ҿ ҿ', rom: 'ç̇', gloss: 'ejective retroflex ch', langs: ['ab'] },
			{ cyr: 'Ҳ ҳ', rom: 'h', gloss: 'voiceless pharyngeal', langs: ['ab'] },
			{ cyr: 'Ӡ ӡ', rom: 'dz', langs: ['ab'] },
			{ cyr: 'Џ џ', rom: 'dzh', langs: ['ab'] },
		],
	},
]
</script>

<template>
	<article class="sheet">

		<!-- UNIVERSAL CORE -->
		<section>
			<h2>Universal core &nbsp;·&nbsp; uppercase / lowercase</h2>
			<p class="section-note">The 23 letters that work in every Cyrillic country — Russian, Ukrainian, Belarusian, Bulgarian, Serbian, Macedonian, and the Russian-sphere non-Slavic alphabets.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in universalCore" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
				</div>
			</div>
		</section>

		<!-- IOTATION & SIGNS -->
		<section>
			<h2>Iotation &amp; signs</h2>
			<p class="section-note">A pack of 10 letters shared across the Russian/Bulgarian sphere — each with its own per-language caveats.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in iotationPack" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
					<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
				</div>
				<div class="cell note-cell">
					<strong>Serbian <l-b sr /></strong> and <strong>Macedonian <l-b mk /></strong> dropped this whole pack — they keep only И. Instead of iotation they use Ј plus dedicated letters Љ Њ Ђ Ћ Ѓ Ќ Џ Ѕ (see the language-additions groups below).
				</div>
			</div>
		</section>

		<!-- LANGUAGE ADDITIONS -->
		<section>
			<h2>Language additions</h2>
			<p class="section-note">Letters each language adds on top of the core + iotation pack, grouped by language, each with its own romanisation standard.</p>
			<div class="char-grid ruled">
				<template v-for="g in extendedGroups" :key="g.label">
					<div class="group-label">
						{{ g.label }}
						<span v-if="g.note" class="group-note">{{ g.note }}</span>
					</div>
					<div class="cell" v-for="l in g.letters" :key="l.cyr">
						<span class="cyr lg" :lang="l.locl">{{ l.cyr }}</span>
						<span class="rom">{{ l.rom }}</span>
						<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
						<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
					</div>
				</template>

				<div class="group-label">Core + pack only &amp; other alphabets</div>
				<div class="cell">
					<span class="cyr lg">Ў ў</span><span class="rom">oʻ</span><span class="gloss">rounded back vowel</span><l-b uz />
				</div>
				<div class="cell">
					<span class="cyr lg">Æ æ</span><span class="rom">æ</span><span class="gloss">open front vowel, the one addition</span><l-b os />
				</div>
				<div class="cell note-cell">
					<strong>Russian <l-b ru /></strong> = core + the full iotation &amp; signs pack + Ё Ы Э.<br>
					<strong>Bulgarian <l-b bg /></strong> = core + И Й Щ Ъ Ь Ю Я only.<br>
					<strong>Uzbek <l-b uz /></strong> officially switched to Latin in 2000; Cyrillic still seen on older maps &amp; signs. Beyond the core + pack: Қ Ғ Ҳ Ў.<br>
					<strong>Mongolian <l-b mn /></strong> = core + pack (Ё) + Ө + Ү. No further additions.<br>
					<strong>Ossetian <l-b os /></strong> = core + pack + one letter, Æ.<br>
					<strong>Chechen <l-b ce /></strong> uses plain Russian letters — no extra letterforms, but pairs them into digraphs (къ, хь, гӏ…) using the palochka Ӏ (U+04C0) to mark ejective/pharyngealized consonants.<br>
					<strong>Rusyn <l-b rue /></strong> rides on the Ukrainian letter set above (І Ї Є) rather than adding its own.
				</div>
			</div>
		</section>

		<footer>
			<span>Each language uses its own romanisation standard (noted per group above); the common core follows <abbr title="United States Board on Geographic Names / Permanent Committee on Geographical Names for British Official Use, 1947 system">BGN/PCGN 1947</abbr>.</span>
			<span>Cyrillic Unicode blocks: U+0400–U+04FF (Slavic) · U+0500–U+052F (supplement)</span>
		</footer>
	</article>
</template>

<style scoped>
.char-grid { --cell-min: 88px; }

.note-cell {
	grid-column: 1 / -1;
	display: block; /* undo the cell's flex column so text flows */
	padding: 4px 6px;
	font-size: 0.75em;
	color: var(--c-muted);
	text-align: left;
}

.note-cell strong { color: var(--c-label); }

.cyr {
	font-family: var(--font-cyrillic);
	font-size: calc(var(--glyph) * 0.8);
	line-height: 1.15;
}

.cyr.lg { font-size: var(--glyph); }

/* full-width group header row inside the grid, figcaption-style */
.group-label {
	grid-column: 1 / -1;
	background: var(--c-alt);
	color: var(--c-label);
	font-size: 0.75em;
	font-weight: 600;
	letter-spacing: 0.04em;
	padding: 2px 6px;
}

.group-note {
	display: block;
	font-weight: 400;
	letter-spacing: 0;
	color: var(--c-muted);
}
</style>
