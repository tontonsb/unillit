<script setup lang="ts">
import LB from '@/components/LangBadge.vue'

// Upright + cursive pair (cursive / Bulgarian / Serbian-Macedonian sections).
interface Pair {
	char: string
	rom: string
}

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
</script>

<template>
	<article class="sheet">

		<p class="section-note top">The font picker (top right of the quiz panel) switches the letterform set used across all cyrillic sheets — pick a language font here and compare against the upright reference below.</p>

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

	</article>
</template>

<style scoped>
.char-grid { --cell-min: 88px; }
.char-grid.wide { --cell-min: 150px; } /* three letterforms + badges per cell */

.section-note.top {
	border: 1px solid var(--c-border);
	border-radius: var(--radius);
	padding: 4px 8px;
}

/* upright reference + cursive form(s) side by side */
.forms {
	display: flex;
	align-items: baseline;
	gap: 8px;
}

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
</style>
