<script setup lang="ts">
import { ref } from 'vue'
import CharBadge from './CharBadge.vue'
import ConsonantPicker from './ConsonantPicker.vue'

const baseCons = ref('◌')

function replaceConsonant(thai: string): string {
	return thai.replace(/ก/g, baseCons.value)
}

type ConsonantClass = 'mid' | 'high' | 'low'

interface Consonant {
	thai: string
	rom: string
	fin?: string // only set when final differs from initial
	gloss?: string
	tags?: string[] // CharBadge tags (obsolete, rare, …)
	cls: ConsonantClass
}

interface Mark {
	thai: string
	rom: string
	gloss?: string
}

const consonants: Consonant[] = [
	{ thai: 'ก', rom: 'k', cls: 'mid' },
	{ thai: 'ข', rom: 'kh', fin: 'k', cls: 'high' },
	{ thai: 'ฃ', rom: 'kh', fin: 'k', cls: 'high', tags: ['obsolete'] },
	{ thai: 'ค', rom: 'kh', fin: 'k', cls: 'low' },
	{ thai: 'ฅ', rom: 'kh', fin: 'k', cls: 'low', tags: ['obsolete'] },
	{ thai: 'ฆ', rom: 'kh', fin: 'k', cls: 'low' },
	{ thai: 'ง', rom: 'ng', cls: 'low' },
	{ thai: 'จ', rom: 'ch', fin: 't', cls: 'mid' },
	{ thai: 'ฉ', rom: 'ch', fin: '—', cls: 'high' },
	{ thai: 'ช', rom: 'ch', fin: 't', cls: 'low' },
	{ thai: 'ซ', rom: 's', fin: 't', cls: 'low' },
	{ thai: 'ฌ', rom: 'ch', fin: 't', cls: 'low' },
	{ thai: 'ญ', rom: 'y', fin: 'n', cls: 'low' },
	{ thai: 'ฎ', rom: 'd', fin: 't', cls: 'mid', tags: ['rare'] },
	{ thai: 'ฏ', rom: 't', cls: 'mid', tags: ['rare'] },
	{ thai: 'ฐ', rom: 'th', fin: 't', cls: 'high' },
	{ thai: 'ฑ', rom: 'th', fin: 't', cls: 'low' },
	{ thai: 'ฒ', rom: 'th', fin: 't', cls: 'low' },
	{ thai: 'ณ', rom: 'n', cls: 'low' },
	{ thai: 'ด', rom: 'd', fin: 't', cls: 'mid' },
	{ thai: 'ต', rom: 't', cls: 'mid' },
	{ thai: 'ถ', rom: 'th', fin: 't', cls: 'high' },
	{ thai: 'ท', rom: 'th', fin: 't', cls: 'low' },
	{ thai: 'ธ', rom: 'th', fin: 't', cls: 'low' },
	{ thai: 'น', rom: 'n', cls: 'low' },
	{ thai: 'บ', rom: 'b', fin: 'p', cls: 'mid' },
	{ thai: 'ป', rom: 'p', cls: 'mid' },
	{ thai: 'ผ', rom: 'ph', fin: '—', cls: 'high' },
	{ thai: 'ฝ', rom: 'f', fin: '—', cls: 'high' },
	{ thai: 'พ', rom: 'ph', fin: 'p', cls: 'low' },
	{ thai: 'ฟ', rom: 'f', fin: 'p', cls: 'low' },
	{ thai: 'ภ', rom: 'ph', fin: 'p', cls: 'low' },
	{ thai: 'ม', rom: 'm', cls: 'low' },
	{ thai: 'ย', rom: 'y', cls: 'low', tags: ['vowel'] },
	{ thai: 'ร', rom: 'r', fin: 'n/—', cls: 'low' },
	{ thai: 'ล', rom: 'l', fin: 'n', cls: 'low' },
	{ thai: 'ว', rom: 'w', fin: 'o/u', cls: 'low', tags: ['vowel'] },
	{ thai: 'ศ', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ษ', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ส', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ห', rom: 'h', fin: '—', cls: 'high' },
	{ thai: 'ฬ', rom: 'l', fin: 'n', cls: 'low', tags: ['rare'] },
	{ thai: 'อ', rom: '—', fin: '(glottal)', cls: 'mid', gloss: 'vowel carry' },
	{ thai: 'ฮ', rom: 'h', fin: '—', cls: 'low' },
]

const toneMarks: Mark[] = [
	{ thai: 'ก่', rom: 'mai ek', gloss: '◌่ — low or falling' },
	{ thai: 'ก้', rom: 'mai tho', gloss: '◌้ — falling or high' },
	{ thai: 'ก๊', rom: 'mai tri', gloss: '◌๊ — high (rare)' },
	{ thai: 'ก๋', rom: 'mai chattawa', gloss: '◌๋ — rising (rare)' },
]

const numerals: Mark[] = [
	{ thai: '๐', rom: '0' },
	{ thai: '๑', rom: '1' },
	{ thai: '๒', rom: '2' },
	{ thai: '๓', rom: '3' },
	{ thai: '๔', rom: '4' },
	{ thai: '๕', rom: '5' },
	{ thai: '๖', rom: '6' },
	{ thai: '๗', rom: '7' },
	{ thai: '๘', rom: '8' },
	{ thai: '๙', rom: '9' },
]

interface VowelRow {
	short: string
	long: string
	rtgs: string
	position: string
	notes?: string
}

const vowelRows: VowelRow[] = [
	{ short: 'กะ / กั◌', long: 'กา', rtgs: 'a', position: 'after (sara a / sara aa)', notes: 'Short ั used before a final consonant' },
	{ short: 'กิ', long: 'กี', rtgs: 'i', position: 'above' },
	{ short: 'กึ', long: 'กือ / กื◌', rtgs: 'ue', position: 'above / above+after', notes: 'Unrounded back vowel; no English equivalent. The long form drops the อ before a final consonant' },
	{ short: 'กุ', long: 'กู', rtgs: 'u', position: 'below' },
	{ short: 'เกะ / เก็◌', long: 'เก', rtgs: 'e', position: 'before', notes: 'Short form เ◌็ used before final' },
	{ short: 'แกะ / แก็◌', long: 'แก', rtgs: 'ae', position: 'before', notes: 'Like <em>a</em> in <em>cat</em>' },
	{ short: 'โกะ', long: 'โก', rtgs: 'o', position: 'before' },
	{ short: 'เกาะ / ก็อ', long: 'กอ', rtgs: 'o', position: 'wrap / after', notes: 'Open-mid <em>o</em> as in <em>or</em>; ◌็อ is the short form before a final consonant' },
	{ short: 'เกอะ / เกิ◌', long: 'เกอ / เกิ◌', rtgs: 'oe', position: 'before+after', notes: 'Schwa-like; เ◌ิ before a final consonant can be short (เงิน <em>ngoen</em>) or long (เดิน <em>doen</em>)' },
	{ short: 'เกียะ', long: 'เกีย', rtgs: 'ia', position: 'before+above+after', notes: 'Diphthong; long form far more common' },
	{ short: 'กัวะ', long: 'กัว / กว', rtgs: 'ua', position: 'above / glide', notes: 'Diphthong; ว acts as second element' },
	{ short: 'เกือะ', long: 'เกือ', rtgs: 'uea', position: 'before+above+after', notes: 'Triphthong; long form common in place names' },
	{ short: 'กำ', long: '—', rtgs: 'am', position: 'above+after (◌ํ+า)', notes: 'Sara am — implied final m; e.g. กำแพง Kamphaeng' },
	{ short: 'ใก / ไก / ไกย', long: '—', rtgs: 'ai', position: 'before', notes: 'Mai muan ใ◌ in a fixed set of ~20 words, mai malai ไ◌ elsewhere; ไ◌ย adds a silent ย, as in ไทย <em>Thai</em>' },
	{ short: 'เกา', long: '—', rtgs: 'ao', position: 'wrap (เ◌+า)', notes: 'Sara ao — the า belongs to the vowel, not to a following syllable; e.g. เขาใหญ่ Khao Yai' },
	{ short: 'กรร', long: '—', rtgs: 'an / a', position: 'after (◌รร)', notes: 'Ro han — <em>an</em> at syllable end; short <em>a</em> before a final consonant' },
]

const specialMarks: Mark[] = [
	{ thai: 'ๆ', rom: 'mai yamok', gloss: 'repeat preceding word' },
	{ thai: 'ก์', rom: 'thanthakhat', gloss: '◌์ silences a consonant' },
	{ thai: 'ฯ', rom: 'paiyannoi', gloss: 'abbreviation / etc.' },
	{ thai: 'กํ', rom: 'nikhahit', gloss: '◌ํ — nasal /m/ or /ng/' },
	{ thai: 'ก็', rom: 'mai taikhu', gloss: '◌็ — short vowel before final (เ◌ะ → เ◌็, แ◌ะ → แ◌็)' },
]
</script>

<template>
	<article class="sheet">
		<section>
			<h2>Consonants — traditional alphabetical order</h2>
			<p class="section-note">
				<span>Class (affects tone):</span>
				<CharBadge tag="mid" />
				<CharBadge tag="high" />
				<CharBadge tag="low" />
				<small>Rom = initial · <em>final in italics</em> (when different) · — = no final/silent</small>
			</p>
			<ol class="cols-fill ruled">
				<li
					v-for="c in consonants"
					:key="c.thai"
					class="cell"
				>
					<span class="thai">{{ c.thai }}</span>
					<span class="rom">
						{{ c.rom }}
						<em v-if="c.fin" class="final">{{ c.fin }}</em>
					</span>
					<span class="badges">
						<CharBadge :tag="c.cls" />
						<CharBadge v-for="t in c.tags" :key="t" :tag="t" />
					</span>
					<span v-if="c.gloss" class="gloss">{{ c.gloss }}</span>
				</li>
			</ol>
		</section>

		<section>
			<h2>
				Vowels — base consonant {{ baseCons }}
				<ConsonantPicker v-model="baseCons" />
			</h2>
			<p class="section-note">Short and long pairs share the same quality; length is phonemic. In place names, length distinction is often lost in romanisation.</p>
			<div class="vtable-wrap">
				<table>
					<thead>
						<tr>
							<th>Short form</th><th>RTGS</th><th>Long form</th><th>RTGS</th><th>Position</th><th>Notes</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(row, i) in vowelRows" :key="i">
							<td><span class="thai sm">{{ replaceConsonant(row.short) }}</span></td>
							<td><span class="rom">{{ row.rtgs }}</span></td>
							<td><span class="thai sm">{{ replaceConsonant(row.long) }}</span></td>
							<td><span class="rom">{{ row.rtgs }}</span></td>
							<td>{{ row.position }}</td>
							<td v-html="row.notes ?? ''"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section>
			<h2>Numerals</h2>
			<ol class="cols-fill">
				<li v-for="m in numerals" :key="m.thai" class="cell">
					<span class="thai xl">{{ m.thai }}</span>
					<span class="rom">{{ m.rom }}</span>
				</li>
			</ol>
		</section>

		<div class="two-col">
			<section>
				<h2>Tone marks</h2>
				<p class="section-note">Written above the consonant. Actual tone depends on consonant class + mark combination.</p>
				<ol class="cols-fit">
					<li v-for="m in toneMarks" :key="m.thai" class="cell">
						<span class="thai xl">{{ replaceConsonant(m.thai) }}</span>
						<span class="rom">{{ m.rom }}</span>
						<span v-if="m.gloss" class="gloss">{{ m.gloss }}</span>
					</li>
				</ol>
			</section>

			<section>
				<h2>Special marks</h2>
				<ol class="cols-fit">
					<li v-for="m in specialMarks" :key="m.thai" class="cell">
						<span class="thai xl">{{ replaceConsonant(m.thai) }}</span>
						<span class="rom">{{ m.rom }}</span>
						<span v-if="m.gloss" class="gloss">{{ m.gloss }}</span>
					</li>
				</ol>
			</section>
		</div>

		<footer>
			<span>Romanisation follows <abbr title="Royal Thai General System of Transcription, revised 1999">RTGS 1999</abbr> as used on Thai road signs and official maps. Tones are not marked in RTGS.</span>
		</footer>
	</article>
</template>

<style scoped>
.two-col {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
	gap: 8px;
}

ol { display: grid; gap: 0; }

.cols-fit { grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); }
.cols-fill { grid-template-columns: repeat(auto-fill, minmax(56px, 1fr)); }

.thai { font-family: var(--font-thai); font-size: var(--glyph); line-height: var(--lh-glyph); }
.thai.xl { font-size: calc(var(--glyph) * 1.2); }
.thai.sm { font-size: calc(var(--glyph) * 0.8); }

.vtable-wrap { overflow-x: auto; }

table {
	width: 100%;
	border-collapse: collapse;
	font-size: 0.75em;
}

th {
	background: var(--c-alt);
	color: var(--c-label);
	font-size: 0.75em;
	font-weight: 600;
	padding: 2px 5px;
	text-align: left;
}

td {
	padding: 2px 5px;
	vertical-align: middle;
}

tr:nth-child(even) td { background: var(--c-alt); }
</style>
