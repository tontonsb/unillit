<script setup lang="ts">
type ConsonantClass = 'mid' | 'high' | 'low'

interface Consonant {
	thai: string
	rom: string
	fin?: string // only set when final differs from initial
	gloss?: string
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
	{ thai: 'ฃ', rom: 'kh', fin: 'k', cls: 'high', gloss: 'obsolete' },
	{ thai: 'ค', rom: 'kh', fin: 'k', cls: 'low' },
	{ thai: 'ฅ', rom: 'kh', fin: 'k', cls: 'low', gloss: 'obsolete' },
	{ thai: 'ฆ', rom: 'kh', fin: 'k', cls: 'low' },
	{ thai: 'ง', rom: 'ng', cls: 'low' },
	{ thai: 'จ', rom: 'ch', fin: 't', cls: 'mid' },
	{ thai: 'ฉ', rom: 'ch', fin: '—', cls: 'high', gloss: 'no final' },
	{ thai: 'ช', rom: 'ch', fin: 't', cls: 'low' },
	{ thai: 'ซ', rom: 's', fin: 't', cls: 'low' },
	{ thai: 'ฌ', rom: 'ch', fin: 't', cls: 'low' },
	{ thai: 'ญ', rom: 'y', fin: 'n', cls: 'low' },
	{ thai: 'ฎ', rom: 'd', fin: 't', cls: 'mid', gloss: 'rare' },
	{ thai: 'ฏ', rom: 't', cls: 'mid', gloss: 'rare' },
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
	{ thai: 'ผ', rom: 'ph', fin: '—', cls: 'high', gloss: 'no final' },
	{ thai: 'ฝ', rom: 'f', fin: '—', cls: 'high', gloss: 'no final' },
	{ thai: 'พ', rom: 'ph', fin: 'p', cls: 'low' },
	{ thai: 'ฟ', rom: 'f', fin: 'p', cls: 'low' },
	{ thai: 'ภ', rom: 'ph', fin: 'p', cls: 'low' },
	{ thai: 'ม', rom: 'm', cls: 'low' },
	{ thai: 'ย', rom: 'y', cls: 'low' },
	{ thai: 'ร', rom: 'r', fin: 'n/—', cls: 'low', gloss: 'often silent in final' },
	{ thai: 'ล', rom: 'l', fin: 'n', cls: 'low' },
	{ thai: 'ว', rom: 'w', fin: 'o/u', cls: 'low', gloss: 'becomes vowel' },
	{ thai: 'ศ', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ษ', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ส', rom: 's', fin: 't', cls: 'high' },
	{ thai: 'ห', rom: 'h', fin: '—', cls: 'high', gloss: 'no final' },
	{ thai: 'ฬ', rom: 'l', fin: 'n', cls: 'low', gloss: 'rare' },
	{ thai: 'อ', rom: '—', cls: 'mid', gloss: 'vowel carrier / glottal' },
	{ thai: 'ฮ', rom: 'h', fin: '—', cls: 'low', gloss: 'no final' },
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
	{ short: 'กึ', long: 'กือ', rtgs: 'ue', position: 'above / above+after', notes: 'Unrounded back vowel; no English equivalent' },
	{ short: 'กุ', long: 'กู', rtgs: 'u', position: 'below' },
	{ short: 'เกะ / เก็◌', long: 'เก', rtgs: 'e', position: 'before', notes: 'Short form เ◌็ used before final' },
	{ short: 'แกะ / แก็◌', long: 'แก', rtgs: 'ae', position: 'before', notes: 'Like <em>a</em> in <em>cat</em>' },
	{ short: 'โกะ', long: 'โก', rtgs: 'o', position: 'before' },
	{ short: 'เกาะ', long: 'กอ', rtgs: 'o', position: 'wrap / after', notes: 'Open-mid <em>o</em> as in <em>or</em>' },
	{ short: 'เกอะ', long: 'เกอ', rtgs: 'oe', position: 'before+after', notes: 'Schwa-like; rare in place names' },
	{ short: 'เกียะ', long: 'เกีย', rtgs: 'ia', position: 'before+above+after', notes: 'Diphthong; long form far more common' },
	{ short: 'กัวะ', long: 'กัว / กว', rtgs: 'ua', position: 'above / glide', notes: 'Diphthong; ว acts as second element' },
	{ short: 'เกือะ', long: 'เกือ', rtgs: 'uea', position: 'before+above+after', notes: 'Triphthong; long form common in place names' },
]

const specialMarks: Mark[] = [
	{ thai: 'ๆ', rom: 'mai yamok', gloss: 'repeat preceding word' },
	{ thai: 'ก์', rom: 'thanthakhat', gloss: '◌์ silences a consonant' },
	{ thai: 'ฯ', rom: 'paiyannoi', gloss: 'abbreviation / etc.' },
	{ thai: 'กํ', rom: 'nikhahit', gloss: '◌ํ — nasal /m/ or /ng/' },
]
</script>

<template>
	<article>
		<section>
			<h2>Consonants — traditional alphabetical order · color shows class</h2>
			<div class="legend">
				<span>Class (affects tone):</span>
				<span class="legend-item"><span class="legend-swatch" style="background:var(--mid)"></span> Mid</span>
				<span class="legend-item"><span class="legend-swatch" style="background:var(--high)"></span> High</span>
				<span class="legend-item"><span class="legend-swatch" style="background:var(--low)"></span> Low</span>
				<span class="legend-note">Rom = RTGS initial · <em>final in italics</em> (shown only when different)</span>
			</div>
			<ol class="cols-11">
				<li v-for="c in consonants" :key="c.thai" :class="`c-${c.cls}`">
					<span class="thai">{{ c.thai }}</span>
					<span class="rom">{{ c.rom }}</span>
					<span v-if="c.fin" class="fin"><em>{{ c.fin }}</em></span>
					<span v-if="c.gloss" class="gloss">{{ c.gloss }}</span>
				</li>
			</ol>
		</section>

		<section>
			<h2>Vowels — written around the consonant (shown here with ก)</h2>
			<p>Short and long pairs share the same quality; length is phonemic. In place names, length distinction is often lost in romanisation.</p>
			<div class="vtable-wrap">
				<table>
					<thead>
						<tr>
							<th>Short form</th><th>RTGS</th><th>Long form</th><th>RTGS</th><th>Position</th><th>Notes</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(row, i) in vowelRows" :key="i">
							<td><span class="thai sm">{{ row.short }}</span></td>
							<td><span class="rom">{{ row.rtgs }}</span></td>
							<td><span class="thai sm">{{ row.long }}</span></td>
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
			<ol class="cols-10">
				<li v-for="m in numerals" :key="m.thai">
					<span class="thai xl">{{ m.thai }}</span>
					<span class="rom">{{ m.rom }}</span>
				</li>
			</ol>
		</section>

		<div class="two-col">
			<section>
				<h2>Tone marks</h2>
				<p>Written above the consonant. Actual tone depends on consonant class + mark combination.</p>
				<ol class="cols-4">
					<li v-for="m in toneMarks" :key="m.thai">
						<span class="thai xl">{{ m.thai }}</span>
						<span class="rom">{{ m.rom }}</span>
						<span v-if="m.gloss" class="gloss">{{ m.gloss }}</span>
					</li>
				</ol>
			</section>

			<section>
				<h2>Special marks</h2>
				<ol class="cols-4">
					<li v-for="m in specialMarks" :key="m.thai">
						<span class="thai xl">{{ m.thai }}</span>
						<span class="rom">{{ m.rom }}</span>
						<span v-if="m.gloss" class="gloss">{{ m.gloss }}</span>
					</li>
				</ol>
			</section>
		</div>

		<footer>
			<span>Romanisation follows <abbr title="Royal Thai General System of Transcription, revised 1999">RTGS 1999</abbr> as used on Thai road signs and official maps. Tones are not marked in RTGS.</span>
			<span>Thai Unicode block: U+0E00–U+0E7F</span>
		</footer>
	</article>
</template>

<style scoped>
article {
	--mid: #1a5c8a;
	--high: #a0320a;
	--low: #2e7d32;
	padding: 10px;
	font-size: 11px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

section { border: 1px solid var(--c-border); border-radius: 4px; overflow: hidden; }

section > h2 {
	background: var(--c-head);
	color: #fff;
	font-size: 9px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 3px 7px;
}

section > p {
	font-size: 8.5px;
	color: var(--c-label);
	padding: 3px 7px 2px;
	border-bottom: 1px solid var(--c-border);
}

.legend {
	display: flex;
	gap: 8px;
	align-items: center;
	padding: 3px 7px;
	font-size: 8px;
	color: var(--c-label);
	border-bottom: 1px solid var(--c-border);
	flex-wrap: wrap;
}
.legend-item {
	display: flex;
	align-items: center;
	gap: 3px;
}
.legend-swatch {
	width: 8px;
	height: 8px;
	border-radius: 1px;
}
.legend-note {
	color: var(--c-muted);
	margin-left: 4px;
}

.two-col {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
}

ol {
	display: grid;
	gap: 0;
	list-style: none;
	margin: 0;
	padding: 0;
}

li {
	background: var(--c-cell);
	padding: 3px 2px 2px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1px;
}

.cols-4 { grid-template-columns: repeat(4, 1fr); }
.cols-10 { grid-template-columns: repeat(10, 1fr); }
.cols-11 { grid-template-columns: repeat(11, 1fr); }

li.c-mid { background: #ddeaf5; }
li.c-high { background: #faeae3; }
li.c-low { background: #e3f2e5; }

.thai { font-family: var(--font-thai); font-size: 18px; line-height: 1.3; }
.thai.xl { font-size: 22px; }
.thai.sm { font-size: 15px; }
.rom { font-size: 8px; color: var(--c-accent); font-weight: 600; }
.fin { font-size: 7px; color: var(--c-muted); }
.gloss { font-size: 7px; color: var(--c-muted); text-align: center; line-height: 1.3; }

.vtable-wrap { overflow-x: auto; }
table {
	width: 100%;
	border-collapse: collapse;
	font-size: 9px;
}
th {
	background: var(--c-alt);
	color: var(--c-label);
	font-size: 8px;
	font-weight: 600;
	padding: 2px 5px;
	text-align: left;
}
td {
	padding: 2px 5px;
	vertical-align: middle;
}
tr:nth-child(even) td { background: var(--c-alt); }

footer {
	font-size: 8px;
	color: var(--c-muted);
	border-top: 1px solid var(--c-border);
	padding-top: 4px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 4px;
}
</style>
