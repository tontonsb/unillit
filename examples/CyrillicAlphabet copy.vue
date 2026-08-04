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

// Upright + cursive pair (cursive / Bulgarian / Serbian-Macedonian sections).
interface Pair {
	char: string
	rom: string
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

const coreAlphabet: Letter[] = [
	{ cyr: 'А а', rom: 'a' },
	{ cyr: 'Б б', rom: 'b' },
	{ cyr: 'В в', rom: 'v' },
	{ cyr: 'Г г', rom: 'g' },
	{ cyr: 'Д д', rom: 'd' },
	{ cyr: 'Е е', rom: 'ye / e', gloss: 'ye- after vowel or word-start' },
	{ cyr: 'Ё ё', rom: 'yo', gloss: 'often written as е in text', langs: ['ru', 'be'] },
	{ cyr: 'Ж ж', rom: 'zh', gloss: 'like <em>s</em> in <em>measure</em>' },
	{ cyr: 'З з', rom: 'z' },
	{ cyr: 'И и', rom: 'i' },
	{ cyr: 'Й й', rom: 'y', gloss: 'short <em>i</em>; glide' },
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
	{ cyr: 'Щ щ', rom: 'shch', gloss: 'or long <em>sh</em>' },
	{ cyr: 'Ъ ъ', rom: '"', gloss: 'hard sign — no sound, marks hard consonant (a vowel in Bulgarian)', langs: ['ru', 'bg'] },
	{ cyr: 'Ы ы', rom: 'y', gloss: 'back unrounded vowel; like <em>i</em> said deep in throat', langs: ['ru', 'be'] },
	{ cyr: 'Ь ь', rom: '\'', gloss: 'soft sign — palatalises preceding consonant' },
	{ cyr: 'Э э', rom: 'e', gloss: 'plain <em>e</em>, not palatal', langs: ['ru', 'be'] },
	{ cyr: 'Ю ю', rom: 'yu' },
	{ cyr: 'Я я', rom: 'ya' },
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
		],
	},
	{
		label: 'Shared Central Asian letters — uvulars, front rounded vowels & nasal',
		letters: [
			{ cyr: 'Қ қ', rom: 'q', gloss: 'uvular stop, further back than к', langs: ['kk', 'ky', 'tg', 'uz'] },
			{ cyr: 'Ғ ғ', rom: 'gh', gloss: 'voiced uvular fricative', langs: ['kk', 'tg', 'uz'] },
			{ cyr: 'Ң ң', rom: 'ng', gloss: 'velar nasal, like <em>sing</em>', langs: ['kk', 'ky', 'mn'] },
			{ cyr: 'Ө ө', rom: 'ö', gloss: 'like German <em>ö</em>', langs: ['kk', 'ky', 'mn'] },
			{ cyr: 'Ү ү', rom: 'ü', gloss: 'like German <em>ü</em>', langs: ['kk', 'ky', 'mn'] },
			{ cyr: 'Ҳ ҳ', rom: 'h', gloss: 'pharyngeal/glottal h', langs: ['tg', 'uz'] },
		],
	},
	{
		label: 'Kazakh only  Қазақ  — 9 extra letters total',
		note: 'Cyrillic still in everyday use; a Latin alphabet is being phased in.',
		letters: [
			{ cyr: 'Ә ә', rom: 'ä', gloss: 'open front vowel', langs: ['kk'] },
			{ cyr: 'Ұ ұ', rom: 'u', gloss: 'back unrounded vowel', langs: ['kk'] },
			{ cyr: 'І і', rom: 'i', gloss: 'front vowel (≠ Russian и)', langs: ['kk'] },
			{ cyr: 'Һ һ', rom: 'h', gloss: 'lighter h than Ҳ', langs: ['kk'] },
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
]

const cursive: Pair[] = [
	{ char: 'а', rom: 'a' },
	{ char: 'б', rom: 'b' },
	{ char: 'в', rom: 'v' },
	{ char: 'г', rom: 'g' },
	{ char: 'д', rom: 'd' },
	{ char: 'е', rom: 'e' },
	{ char: 'ё', rom: 'yo' },
	{ char: 'ж', rom: 'zh' },
	{ char: 'з', rom: 'z' },
	{ char: 'и', rom: 'i' },
	{ char: 'й', rom: 'y' },
	{ char: 'к', rom: 'k' },
	{ char: 'л', rom: 'l' },
	{ char: 'м', rom: 'm' },
	{ char: 'н', rom: 'n' },
	{ char: 'о', rom: 'o' },
	{ char: 'п', rom: 'p' },
	{ char: 'р', rom: 'r' },
	{ char: 'с', rom: 's' },
	{ char: 'т', rom: 't' },
	{ char: 'у', rom: 'u' },
	{ char: 'ф', rom: 'f' },
	{ char: 'х', rom: 'kh' },
	{ char: 'ц', rom: 'ts' },
	{ char: 'ч', rom: 'ch' },
	{ char: 'ш', rom: 'sh' },
	{ char: 'щ', rom: 'shch' },
	{ char: 'ъ', rom: '"' },
	{ char: 'ы', rom: 'y' },
	{ char: 'ь', rom: '\'' },
	{ char: 'э', rom: 'e' },
	{ char: 'ю', rom: 'yu' },
	{ char: 'я', rom: 'ya' },
]

const bulgarian: Pair[] = [
	{ char: 'б', rom: 'b' },
	{ char: 'в', rom: 'v' },
	{ char: 'г', rom: 'g' },
	{ char: 'д', rom: 'd' },
	{ char: 'ж', rom: 'zh' },
	{ char: 'з', rom: 'z' },
	{ char: 'и', rom: 'i' },
	{ char: 'й', rom: 'y' },
	{ char: 'к', rom: 'k' },
	{ char: 'л', rom: 'l' },
	{ char: 'н', rom: 'n' },
	{ char: 'п', rom: 'p' },
	{ char: 'т', rom: 't' },
	{ char: 'ц', rom: 'ts' },
	{ char: 'ш', rom: 'sh' },
	{ char: 'щ', rom: 'sht' },
	{ char: 'ю', rom: 'yu' },
]

const serbianMac: Pair[] = [
	{ char: 'б', rom: 'b' },
	{ char: 'г', rom: 'g' },
	{ char: 'д', rom: 'd' },
	{ char: 'п', rom: 'p' },
	{ char: 'т', rom: 't' },
	{ char: 'ш', rom: 'sh' },
]

// Macedonian-only letters with their cursive form
const macOnly = [
	{ cyr: 'Ѓ ѓ', italic: 'ѓ', rom: 'gj' },
	{ cyr: 'Ќ ќ', italic: 'ќ', rom: 'kj' },
	{ cyr: 'Ѕ ѕ', italic: 'ѕ', rom: 'dz' },
]

const abkhaz: Letter[] = [
	{ cyr: 'Ҕ ҕ', rom: 'ǧ', gloss: 'voiced uvular' },
	{ cyr: 'Ҟ ҟ', rom: 'q̇', gloss: 'aspirated uvular' },
	{ cyr: 'Ҩ ҩ', rom: 'ò / w', gloss: 'labialized' },
	{ cyr: 'Ҧ ҧ', rom: 'ph', gloss: 'aspirated p (as in Аҧсны)' },
	{ cyr: 'Ԥ ԥ', rom: 'ph', gloss: 'modern form of ҧ' },
	{ cyr: 'Ҭ ҭ', rom: 't', gloss: 'aspirated t' },
	{ cyr: 'Ҵ ҵ', rom: 'c̣', gloss: 'ejective ts' },
	{ cyr: 'Ҷ ҷ', rom: 'ç̣', gloss: 'ejective ch' },
	{ cyr: 'Ҽ ҽ', rom: 'ch', gloss: 'retroflex ch' },
	{ cyr: 'Ҿ ҿ', rom: 'ç̇', gloss: 'ejective retroflex ch' },
	{ cyr: 'Ҳ ҳ', rom: 'h', gloss: 'voiceless pharyngeal' },
	{ cyr: 'Ӡ ӡ', rom: 'dz' },
	{ cyr: 'Џ џ', rom: 'dzh' },
]

const bashkir: Letter[] = [
	{ cyr: 'Ғ ғ', rom: 'ğ', gloss: 'voiced velar fricative', langs: ['ba'], locl: 'ba' },
	{ cyr: 'Ҙ ҙ', rom: 'ź / dh', gloss: 'voiced interdental, like <em>th</em> in <em>this</em>', langs: ['ba'], locl: 'ba' },
	{ cyr: 'Ҫ ҫ', rom: 'ś / th', gloss: 'voiceless interdental, like <em>th</em> in <em>thin</em>', langs: ['ba'], locl: 'ba' },
	{ cyr: 'Ҡ ҡ', rom: 'q', gloss: 'uvular stop', langs: ['ba'] },
	{ cyr: 'Ң ң', rom: 'ñ', gloss: 'velar nasal', langs: ['ba'] },
	{ cyr: 'Һ һ', rom: 'h', gloss: 'glottal h', langs: ['ba'] },
	{ cyr: 'Ә ә', rom: 'ä', gloss: 'open front vowel', langs: ['ba'] },
	{ cyr: 'Ө ө', rom: 'ö', gloss: 'like German <em>ö</em>', langs: ['ba'] },
	{ cyr: 'Ү ү', rom: 'ü', gloss: 'like German <em>ü</em>', langs: ['ba'] },
]
</script>

<template>
	<article class="sheet">

		<!-- CORE ALPHABET -->
		<section>
			<h2>Common Cyrillic core &nbsp;·&nbsp; uppercase / lowercase</h2>
			<p class="section-note">The letters shared across most Cyrillic alphabets. A few (badged) are limited to certain languages rather than pan-Cyrillic.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in coreAlphabet" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
					<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
				</div>
			</div>
		</section>

		<!-- EXTENDED LETTERS -->
		<section>
			<h2>Language-specific letters — Slavic &amp; Central Asian</h2>
			<p class="section-note">Letters beyond the common core, grouped by the language that uses them, each with its own romanisation standard.</p>
			<div class="char-grid ruled">
				<template v-for="g in extendedGroups" :key="g.label">
					<div class="group-label">
						{{ g.label }}
						<span v-if="g.note" class="group-note">{{ g.note }}</span>
					</div>
					<div class="cell" v-for="l in g.letters" :key="l.cyr">
						<span class="cyr lg">{{ l.cyr }}</span>
						<span class="rom">{{ l.rom }}</span>
						<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
						<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
					</div>
				</template>

				<div class="group-label">Core-only &amp; other alphabets</div>
				<div class="cell">
					<span class="cyr lg">Ў ў</span><span class="rom">oʻ</span><span class="gloss">rounded back vowel</span><l-b uz />
				</div>
				<div class="cell note-cell">
					<strong>Russian <l-b ru /></strong> &amp; <strong>Bulgarian <l-b bg /></strong> use only common-core letters — no additions of their own.<br>
					<strong>Uzbek <l-b uz /></strong> officially switched to Latin in 2000; Cyrillic still seen on older maps &amp; signs. Beyond the core: Қ Ғ Ҳ Ў.<br>
					<strong>Mongolian <l-b mn /></strong> = common core + Ө + Ү. No further additions.
				</div>
			</div>
		</section>

		<!-- CURSIVE / ITALIC FORMS -->
		<section>
			<h2>Cursive — italic letterforms &nbsp;·&nbsp; upright / cursive</h2>
			<p class="section-note">Lowercase letters with their italic (cursive) shape beside them. Several differ sharply from the upright; switch the font to compare.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="p in cursive" :key="p.char">
					<span class="forms">
						<span class="cyr lg">{{ p.char }}</span>
						<span class="cyr lg it" lang="ru">{{ p.char }}</span>
					</span>
					<span class="rom">{{ p.rom }}</span>
				</div>
			</div>
		</section>

		<!-- BULGARIAN FORMS -->
		<section>
			<h2>Bulgarian forms <l-b bg /> &nbsp;·&nbsp; upright / cursive</h2>
			<p class="section-note">Letters whose Bulgarian shape differs from Russian. Needs a font carrying the Bulgarian (BGR) locl feature, otherwise these mirror the Russian forms above.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="p in bulgarian" :key="p.char">
					<span class="forms">
						<span class="cyr lg" lang="bg">{{ p.char }}</span>
						<span class="cyr lg it" lang="bg">{{ p.char }}</span>
					</span>
					<span class="rom">{{ p.rom }}</span>
				</div>
			</div>
		</section>

		<!-- SERBIAN / MACEDONIAN FORMS -->
		<section>
			<h2>Serbian / Macedonian cursive <l-b sr /> <l-b mk /> &nbsp;·&nbsp; upright / SR / MK</h2>
			<p class="section-note">The famous italic divergences. Serbian and Macedonian share the tradition; Macedonian prefers a tailed д (and sometimes barred г/т) where Serbian doesn't, so the SR and MK cells can differ. Needs a font with SRB/MKD locl.</p>
			<div class="char-grid ruled wide">
				<div class="cell" v-for="p in serbianMac" :key="p.char">
					<span class="forms">
						<span class="cyr lg">{{ p.char }}</span>
						<span class="pair"><span class="cyr lg it" lang="sr">{{ p.char }}</span><l-b sr /></span>
						<span class="pair"><span class="cyr lg it" lang="mk">{{ p.char }}</span><l-b mk /></span>
					</span>
					<span class="rom">{{ p.rom }}</span>
				</div>
			</div>
			<p class="section-note">Macedonian-only letters (not in Serbian). ѓ is the one that actually carries a Macedonian (MKD) locl form in these fonts — upright and cursive shown.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="m in macOnly" :key="m.cyr">
					<span class="forms">
						<span class="cyr lg" lang="mk">{{ m.cyr }}</span>
						<span class="cyr lg it" lang="mk">{{ m.italic }}</span>
					</span>
					<span class="rom">{{ m.rom }}</span>
					<l-b mk />
				</div>
			</div>
		</section>

		<!-- ABKHAZ -->
		<section>
			<h2>Abkhaz &nbsp;Аҧсны &nbsp;— letters beyond Russian</h2>
			<p class="section-note">Abkhaz-specific Cyrillic letters (the toponym Аҧсны itself uses ҧ). Many fall in the supplement block U+0500–U+052F and may not be covered by every font.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in abkhaz" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span v-if="l.gloss" class="gloss">{{ l.gloss }}</span>
				</div>
			</div>
		</section>

		<!-- BASHKIR -->
		<section>
			<h2>Bashkir <l-b ba /> &nbsp;Башҡорт &nbsp;— extra letters &amp; localized forms</h2>
			<p class="section-note">Bashkir adds nine letters to Russian. Three of them — Ғ, Ҙ, Ҫ — also get Bashkir-specific shapes via the locl feature (tagged BA below); the rest are shared with neighbouring Turkic alphabets.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in bashkir" :key="l.cyr">
					<span class="cyr lg" :lang="l.locl">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span v-if="l.gloss" class="gloss" v-html="l.gloss"></span>
					<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
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
.char-grid.wide { --cell-min: 150px; } /* three letterforms + badges per cell */

/* upright reference + cursive form(s) side by side */
.forms {
	display: flex;
	align-items: baseline;
	gap: 8px;
}

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
.cyr.it { font-style: italic; color: var(--c-label); }

.pair {
	display: inline-flex;
	align-items: center;
	gap: 3px;
}

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
