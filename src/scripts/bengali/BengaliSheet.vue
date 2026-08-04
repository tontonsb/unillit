<template>
	<div class="sheet">

		<div class="layout">

			<!-- INDEPENDENT VOWELS -->
			<div class="section">
				<div class="section-title">Independent Vowels &nbsp;স্বরবর্ণ</div>
				<div class="section-note">Used at the start of a word or syllable. Each carries an inherent sound.</div>
				<div class="char-grid cols-4">
					<div class="cell"><span class="bn lg">অ</span><span class="rom">o / ô</span><span class="gloss">short</span></div>
					<div class="cell"><span class="bn lg">আ</span><span class="rom">a</span><span class="gloss">long</span></div>
					<div class="cell"><span class="bn lg">ই</span><span class="rom">i</span><span class="gloss">short</span></div>
					<div class="cell"><span class="bn lg">ঈ</span><span class="rom">ī</span><span class="gloss">long</span></div>
					<div class="cell"><span class="bn lg">উ</span><span class="rom">u</span><span class="gloss">short</span></div>
					<div class="cell"><span class="bn lg">ঊ</span><span class="rom">ū</span><span class="gloss">long</span></div>
					<div class="cell"><span class="bn lg">ঋ</span><span class="rom">ri</span><span class="gloss">vocalic r</span></div>
					<div class="cell"><span class="bn lg">এ</span><span class="rom">e / æ</span><span class="gloss"></span></div>
					<div class="cell"><span class="bn lg">ঐ</span><span class="rom">oi</span><span class="gloss">diphthong</span></div>
					<div class="cell"><span class="bn lg">ও</span><span class="rom">o</span><span class="gloss"></span></div>
					<div class="cell"><span class="bn lg">ঔ</span><span class="rom">ou</span><span class="gloss">diphthong</span></div>
					<div class="cell" style="background:var(--c-alt)"></div>
				</div>
			</div>

			<!-- VOWEL SIGNS -->
			<div class="section">
				<div class="section-title">Vowel Signs (কার) &nbsp;— attached to consonants</div>
				<div class="section-note">Shown with ক (k) as host. Inherent vowel <em>o</em> is silent when a sign is present.</div>
				<div class="char-grid cols-4">
					<div class="cell"><span class="bn lg">কা</span><span class="rom">k<b>a</b></span></div>
					<div class="cell"><span class="bn lg">কি</span><span class="rom">k<b>i</b></span></div>
					<div class="cell"><span class="bn lg">কী</span><span class="rom">k<b>ī</b></span></div>
					<div class="cell"><span class="bn lg">কু</span><span class="rom">k<b>u</b></span></div>
					<div class="cell"><span class="bn lg">কূ</span><span class="rom">k<b>ū</b></span></div>
					<div class="cell"><span class="bn lg">কৃ</span><span class="rom">k<b>ri</b></span></div>
					<div class="cell"><span class="bn lg">কে</span><span class="rom">k<b>e</b></span></div>
					<div class="cell"><span class="bn lg">কৈ</span><span class="rom">k<b>oi</b></span></div>
					<div class="cell"><span class="bn lg">কো</span><span class="rom">k<b>o</b></span></div>
					<div class="cell"><span class="bn lg">কৌ</span><span class="rom">k<b>ou</b></span></div>
					<div class="cell"><span class="bn lg">ক্</span><span class="rom">k</span><span class="gloss">hasanta: no vowel</span></div>
					<div class="cell"><span class="bn lg">কং</span><span class="rom">k<b>ṃ</b></span><span class="gloss">anusvara</span></div>
				</div>
			</div>

			<!-- CONSONANTS -->
			<div class="section full-width">
				<div class="section-title">Consonants &nbsp;ব্যঞ্জনবর্ণ &nbsp;— inherent vowel <em>o</em> follows each unless marked otherwise</div>
				<div class="char-grid cols-5">

					<div class="group-label">Velars &nbsp;কণ্ঠ্য</div>
					<div class="cell"><span class="bn">ক</span><span class="rom">k</span></div>
					<div class="cell"><span class="bn">খ</span><span class="rom">kh</span></div>
					<div class="cell"><span class="bn">গ</span><span class="rom">g</span></div>
					<div class="cell"><span class="bn">ঘ</span><span class="rom">gh</span></div>
					<div class="cell"><span class="bn">ঙ</span><span class="rom">ṅ / ng</span></div>

					<div class="group-label">Palatals &nbsp;তালব্য</div>
					<div class="cell"><span class="bn">চ</span><span class="rom">ch</span></div>
					<div class="cell"><span class="bn">ছ</span><span class="rom">chh</span></div>
					<div class="cell"><span class="bn">জ</span><span class="rom">j</span></div>
					<div class="cell"><span class="bn">ঝ</span><span class="rom">jh</span></div>
					<div class="cell"><span class="bn">ঞ</span><span class="rom">ñ / n</span></div>

					<div class="group-label">Retroflexes &nbsp;মূর্ধন্য — tip of tongue curled back</div>
					<div class="cell"><span class="bn">ট</span><span class="rom">ṭ</span></div>
					<div class="cell"><span class="bn">ঠ</span><span class="rom">ṭh</span></div>
					<div class="cell"><span class="bn">ড</span><span class="rom">ḍ</span></div>
					<div class="cell"><span class="bn">ঢ</span><span class="rom">ḍh</span></div>
					<div class="cell"><span class="bn">ণ</span><span class="rom">ṇ / n</span></div>

					<div class="group-label">Dentals &nbsp;দন্ত্য — tip of tongue at teeth</div>
					<div class="cell"><span class="bn">ত</span><span class="rom">t</span></div>
					<div class="cell"><span class="bn">থ</span><span class="rom">th</span></div>
					<div class="cell"><span class="bn">দ</span><span class="rom">d</span></div>
					<div class="cell"><span class="bn">ধ</span><span class="rom">dh</span></div>
					<div class="cell"><span class="bn">ন</span><span class="rom">n</span></div>

					<div class="group-label">Labials &nbsp;ওষ্ঠ্য</div>
					<div class="cell"><span class="bn">প</span><span class="rom">p</span></div>
					<div class="cell"><span class="bn">ফ</span><span class="rom">ph / f</span></div>
					<div class="cell"><span class="bn">ব</span><span class="rom">b</span></div>
					<div class="cell"><span class="bn">ভ</span><span class="rom">bh / v</span></div>
					<div class="cell"><span class="bn">ম</span><span class="rom">m</span></div>

					<div class="group-label">Approximants &amp; sibilants</div>
					<div class="cell"><span class="bn">য</span><span class="rom">j / y</span></div>
					<div class="cell"><span class="bn">র</span><span class="rom">r</span></div>
					<div class="cell"><span class="bn">ল</span><span class="rom">l</span></div>
					<div class="cell"><span class="bn">শ</span><span class="rom">sh / ś</span></div>
					<div class="cell"><span class="bn">ষ</span><span class="rom">sh / ṣ</span></div>

					<div class="group-label">Remaining</div>
					<div class="cell"><span class="bn">স</span><span class="rom">s</span></div>
					<div class="cell"><span class="bn">হ</span><span class="rom">h</span></div>
					<div class="cell"><span class="bn">ড়</span><span class="rom">ṛ / r</span></div>
					<div class="cell"><span class="bn">ঢ়</span><span class="rom">ṛh / rh</span></div>
					<div class="cell"><span class="bn">য়</span><span class="rom">y / o</span></div>

				</div>
			</div>

			<!-- NUMERALS -->
			<div class="section">
				<div class="section-title">Numerals &nbsp;সংখ্যা</div>
				<div class="char-grid cols-5">
					<div class="cell"><span class="bn lg">০</span><span class="rom">0</span></div>
					<div class="cell"><span class="bn lg">১</span><span class="rom">1</span></div>
					<div class="cell"><span class="bn lg">২</span><span class="rom">2</span></div>
					<div class="cell"><span class="bn lg">৩</span><span class="rom">3</span></div>
					<div class="cell"><span class="bn lg">৪</span><span class="rom">4</span></div>
					<div class="cell"><span class="bn lg">৫</span><span class="rom">5</span></div>
					<div class="cell"><span class="bn lg">৬</span><span class="rom">6</span></div>
					<div class="cell"><span class="bn lg">৭</span><span class="rom">7</span></div>
					<div class="cell"><span class="bn lg">৮</span><span class="rom">8</span></div>
					<div class="cell"><span class="bn lg">৯</span><span class="rom">9</span></div>
				</div>
			</div>

			<!-- SPECIAL MARKS -->
			<div class="section">
				<div class="section-title">Special Marks</div>
				<div class="char-grid cols-5">
					<div class="cell"><span class="bn lg">ঁ</span><span class="rom">ñ / ~</span><span class="gloss">chandrabindu nasalises vowel</span></div>
					<div class="cell"><span class="bn lg">ং</span><span class="rom">ṃ / ng</span><span class="gloss">anusvara</span></div>
					<div class="cell"><span class="bn lg">ঃ</span><span class="rom">h</span><span class="gloss">visarga</span></div>
					<div class="cell"><span class="bn lg">ৎ</span><span class="rom">t</span><span class="gloss">khanda ta, final stop</span></div>
					<div class="cell"><span class="bn lg">্</span><span class="rom">—</span><span class="gloss">hasanta: suppresses inherent vowel</span></div>
				</div>
			</div>

		</div>

		<div class="footnote">
			<span>Romanisation follows a practical IAST-lite scheme suited for toponyms (ṭ ḍ ṇ ṣ ṛ diacritics mark retroflex/special sounds; <em>ī ū</em> mark long vowels). Scholarly ISO 15919 differs slightly.</span>
			<span>বাংলা script · Unicode block U+0980–U+09FF</span>
		</div>

	</div>
</template>

<style scoped>
.sheet { padding: 10px; font-size: 11px; }
.layout { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.full-width { grid-column: 1 / -1; }

.section { border: 1px solid var(--c-border); border-radius: 4px; overflow: hidden; }
.section-title { background: var(--c-head); color: #fff; font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 7px; }
.section-note { font-size: 8.5px; color: var(--c-muted); padding: 3px 7px 2px; background: var(--c-alt); border-bottom: 1px solid var(--c-border); }

.char-grid { display: grid; gap: 0; }
.char-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.char-grid.cols-5 { grid-template-columns: repeat(5, 1fr); }

.cell {
  background: var(--c-cell);
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  padding: 4px 3px 3px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.cols-4 .cell:nth-child(4n),
.cols-5 .cell:nth-child(5n) { border-right: none; }

/* row stripes */
.cols-4 .cell:nth-child(8n+5), .cols-4 .cell:nth-child(8n+6),
.cols-4 .cell:nth-child(8n+7), .cols-4 .cell:nth-child(8n+8),
.cols-5 .cell:nth-child(10n+6), .cols-5 .cell:nth-child(10n+7),
.cols-5 .cell:nth-child(10n+8), .cols-5 .cell:nth-child(10n+9),
.cols-5 .cell:nth-child(10n+10) { background: var(--c-alt); }

.bn { font-family: var(--font-bengali); font-size: 16px; line-height: 1.2; }
.bn.lg { font-size: 20px; }
.rom { font-size: 8.5px; color: var(--c-sign); font-weight: 600; letter-spacing: 0.02em; }
.gloss { font-size: 7.5px; color: var(--c-muted); }

.group-label {
  grid-column: 1 / -1;
  background: var(--c-alt);
  color: var(--c-label);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-bottom: 1px solid var(--c-border);
}

.footnote {
  margin-top: 8px;
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
