<template>
	<article class="sheet">

		<!-- TRUE FRIENDS -->
		<section>
			<h2>True friends — same shape, same sound</h2>
			<p class="section-note">Mostly the common core; a handful of extended-alphabet letters (badged) are honorary members too.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in trueFriends" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
				</div>
			</div>
		</section>

		<!-- FALSE FRIENDS -->
		<section>
			<h2>False friends — familiar shape, different sound!</h2>
			<p class="section-note">Mostly the common core; a handful of extended-alphabet letters (badged) trip up the same way.</p>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in falseFriends" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span class="looks-like">≠ {{ l.looksLike }}</span>
					<l-b v-if="l.langs" v-bind="langAttrs(l.langs)" />
				</div>
			</div>
		</section>

		<!-- NEW LETTERS -->
		<section>
			<h2>New letters — no Latin shape equivalent</h2>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in newLetters" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
				</div>
			</div>
		</section>

		<!-- GREEK SHAPES -->
		<section>
			<h2>Greek look-alikes — shapes shared with Greek</h2>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in greekShapes" :key="l.cyr">
					<span class="cyr lg">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span class="greek">≈ {{ l.greek }}</span>
				</div>
			</div>
		</section>

		<!-- CURSIVE FALSE FRIENDS -->
		<section>
			<h2>False friends in cursive — italic forms that mislead</h2>
			<div class="char-grid ruled">
				<div class="cell" v-for="l in cursiveFalseFriends" :key="l.cyr">
					<span class="cyr lg cursive">{{ l.cyr }}</span>
					<span class="rom">{{ l.rom }}</span>
					<span class="looks-like">≈ {{ l.looksLike }}</span>
				</div>
			</div>
		</section>

	</article>
</template>

<script setup lang="ts">
import LB from '@/components/LangBadge.vue'

// turn ['kk', 'ky'] into { kk: true, ky: true } for v-bind onto <l-b>
function langAttrs(codes: string[]): Record<string, boolean> {
	return Object.fromEntries(codes.map(c => [c, true]))
}

const trueFriends = [
	{ cyr: 'А а', rom: 'a' },
	{ cyr: 'Е е', rom: 'ye/e' },
	{ cyr: 'К к', rom: 'k' },
	{ cyr: 'М м', rom: 'm' },
	{ cyr: 'О о', rom: 'o' },
	{ cyr: 'Т т', rom: 't' },
	{ cyr: 'І і', rom: 'i', langs: ['uk', 'be', 'kk'] },
	{ cyr: 'Һ һ', rom: 'h', langs: ['kk', 'ba', 'tt'] },
	{ cyr: 'Ј ј', rom: 'j', langs: ['sr', 'mk'] },
	{ cyr: 'Æ æ', rom: 'æ', langs: ['os'] },
	{ cyr: 'Ӓ ӓ', rom: 'ä', langs: ['mhr'] },
	{ cyr: 'Ӧ ӧ', rom: 'ö', langs: ['mhr', 'udm', 'kv'] },
	{ cyr: 'Ӱ ӱ', rom: 'ü', langs: ['mhr'] },
]

const falseFriends = [
	{ cyr: 'В в', rom: 'v', looksLike: 'B' },
	{ cyr: 'Н н', rom: 'n', looksLike: 'H' },
	{ cyr: 'Р р', rom: 'r', looksLike: 'P' },
	{ cyr: 'С с', rom: 's', looksLike: 'C' },
	{ cyr: 'У у', rom: 'u', looksLike: 'Y' },
	{ cyr: 'Х х', rom: 'kh', looksLike: 'X' },
	{ cyr: 'Қ қ', rom: 'q', looksLike: 'К', langs: ['kk', 'ky', 'tg', 'uz'] },
	{ cyr: 'Ғ ғ', rom: 'gh', looksLike: 'Г', langs: ['kk', 'tg', 'uz'] },
	{ cyr: 'Ѕ ѕ', rom: 'dz', looksLike: 'S', langs: ['mk'] },
	{ cyr: 'Ў ў', rom: 'w / ŭ', looksLike: 'Y', langs: ['be', 'uz'] },
	{ cyr: 'Ҫ ҫ', rom: 'ś / th', looksLike: 'Ç', langs: ['ba', 'cv'] },
	{ cyr: 'Ӏ', rom: 'marks a consonant, no sound of its own', looksLike: 'I / l', langs: ['ce'] },
]

const newLetters = [
	{ cyr: 'Б б', rom: 'b' },
	{ cyr: 'Г г', rom: 'g' },
	{ cyr: 'Д д', rom: 'd' },
	{ cyr: 'Ж ж', rom: 'zh' },
	{ cyr: 'З з', rom: 'z' },
	{ cyr: 'И и', rom: 'i' },
	{ cyr: 'Й й', rom: 'y' },
	{ cyr: 'Л л', rom: 'l' },
	{ cyr: 'П п', rom: 'p' },
	{ cyr: 'Ф ф', rom: 'f' },
	{ cyr: 'Ц ц', rom: 'ts' },
	{ cyr: 'Ч ч', rom: 'ch' },
	{ cyr: 'Ш ш', rom: 'sh' },
	{ cyr: 'Щ щ', rom: 'shch' },
	{ cyr: 'Ъ ъ', rom: '"' },
	{ cyr: 'Ы ы', rom: 'y' },
	{ cyr: 'Ь ь', rom: '\'' },
	{ cyr: 'Э э', rom: 'e' },
	{ cyr: 'Ю ю', rom: 'yu' },
	{ cyr: 'Я я', rom: 'ya' },
	{ cyr: 'Ё ё', rom: 'yo' },
]

// repeats letters from above whose shape matches a Greek letter
const greekShapes = [
	{ cyr: 'Г г', rom: 'g', greek: 'Γ γ' },
	{ cyr: 'Д д', rom: 'd', greek: 'Δ δ' },
	{ cyr: 'Л л', rom: 'l', greek: 'Λ λ' },
	{ cyr: 'П п', rom: 'p', greek: 'Π π' },
	{ cyr: 'Р р', rom: 'r', greek: 'Ρ ρ' },
	{ cyr: 'У у', rom: 'u', greek: 'Υ υ' },
	{ cyr: 'Ф ф', rom: 'f', greek: 'Φ φ' },
	{ cyr: 'Х х', rom: 'kh', greek: 'Χ χ' },
]

// repeats letters whose cursive (italic) form surprises Latin readers
const cursiveFalseFriends = [
	{ cyr: 'и', rom: 'i', looksLike: 'u' },
	{ cyr: 'й', rom: 'y', looksLike: 'ŭ' },
	{ cyr: 'п', rom: 'p', looksLike: 'n' },
	{ cyr: 'т', rom: 't', looksLike: 'm' },
	{ cyr: 'д', rom: 'd', looksLike: 'g' },
	{ cyr: 'г', rom: 'g', looksLike: 'r' },
]
</script>

<style scoped>
.char-grid { --cell-min: 88px; }

.cyr { font-family: var(--font-cyrillic); }
.cyr.lg { font-size: var(--glyph); line-height: 1.15; }
.cyr.cursive { font-style: italic; }

.looks-like { font-size: 0.7em; color: var(--c-muted); }
.greek { font-size: 0.8em; color: var(--c-sign); }
</style>
