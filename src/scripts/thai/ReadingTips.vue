<template>
	<article>
		<dl>
			<div>
				<dt>left → right</dt>
				<dd>Direction</dd>
			</div>
			<div>
				<dt>Abugida</dt>
				<dd>Script type</dd>
			</div>
			<div>
				<dt>RTGS</dt>
				<dd>Romanisation</dd>
			</div>
		</dl>

		<Markdown wrap="section">
			## No word boundaries

			Thai is written without spaces between words — spaces mark phrase or clause boundaries.
		</Markdown>

		<Markdown wrap="section">
			## Abugida

			Thai script is an *abugida* which means that consonants are the primary characters.
			Vowels can be notated as a diacritic on the consonant that precedes them or even implicit.

			- Consonants are written left to right.
			- The vowel is a diacritic written above, below, after or even before the consonant.
			- Consonants without vowel marks are often read with an inferred vowel (short *o* or *a*).
			- Final consonant of a syllable has no vowel. (But good luck with determining the syllable boundaries.)
			- If a syllable starts with a vowel, the glottal stop อ is used as a silent carrier for the vowel.

			| Thai | Latin    | Why???? |
			|------|----------|---------|
			| น    | n        | น is n |
			| นน   | non      | น has an implicit short *o* |
			| นัน   | nan      | ◌ั is the diacritic for short vowel *a* |
			| เนน  | neen/nen | เ◌ is the diacritic for long vowel *ee* |
		</Markdown>

		<Markdown wrap="section">
			## Final consonants

			A syllable can end in -k, -t, -p, -n, -m, -ng, -w, -y. All the other consonants simplify into these.

			For example, นคร (n kh r) is *nakhon* not *nakhor*.

			A syllable that ends in a consonant is called *closed* and notated as CVC (consonant–vowel–consonant) while the ones without a final consonant are called *open* or CV.

			The inferred vowel (the one if no vowel diacritic is present) is *a* for open (CV) syllables and *o* for closed (CVC) ones. That's why นคร is *na-khon*.
		</Markdown>

		<Markdown wrap="section">
			## Vowels and diphthongs

			Vowels can be on either side of the consonant and there are even circumfix vowels that come on multiple sides.

			Multiple vowel marks can be combined to form diphthongs.
			Sometimes it works counter intuitively, e.g. เนา is *nao*.
			Consonants ว, ย (and อ) can also act as vowels to form diphthongs.

			| Thai | Latin    | | Thai | Latin    |
			|------|----------|-|------|----------|
			| นิ    | ni       | | เนา  | nao      |
			| นุ    | nu       | | นิว   | nio      |
			| เน   | ne       | | นาย  | nai      |
			| นา   | na       | |      |          |
			| โนะ  | no       |	|      |          |
		</Markdown>

		<Markdown wrap="section">
			## Consonant clusters

			> So, if ก is *k* with an implicit *o*, รุ is *ru* (r with that u-diacri-tick) and ง is *ng*, then กรุง is *korung*, rigth?

			No. If the letters make a valid consonant cluster, then they just make that.
			Thus กร makes *kr* and that word is krung. As in Krung Thep (กรุงเทพ).

			The consonant clusters are basically stop + ร / ล / ว, here are some of the common consonant clusters:
			กร (kr), กล (kl), กว (kw), ตร (tr), ปร (pr).

			ห in combination with a sonorant (น ม ง ย ล ว ร) makes somewhat of an "orthographic cluster", i.e. ห is not pronounced, but only affects the tone.
			E.g. ใหม่ is *mai* not *hmai*, หนอง is *nong* not *hnong*.
		</Markdown>

		<Markdown wrap="section">
			## Parsing strategy

			It can be tempting to start by identifying consonants, but some consonant glyphs can be part of vowel or diphthong patterns.
			Similar to how *y* in English can be a consonant in *yes*, diphthong in *my* and part of a diphthong in *day*.
			Vowels define syllables, so try to identify them first.

			1. Find obvious vowel symbols.
			2. Inspect vowel-affected consonants for vowel- or diphthong-forming patterns (e.g. เ◌ีย, ◌าย, ◌าว) which can involve consonant glyphs ย, ว, อ.
			3. Identify consonant clusters.
			4. Identify final consonants and split syllables.
			5. Fill in inferred vowels.

			| Step       | นคร                           | เชียงราย                 | กรุงเทพ           |
			|------------|-------------------------------|------------------------|-------------------|
			| Vowel mark | none                          | เ◌, ◌ี, ◌า              | ◌ุ, เ◌             |
			| Vow. patt. | none                          | เ◌ีย = *ia*, ◌าย = *ai* | ◌ุ = *u*, เ◌ = *e* |
			| Clusters   | none                          | none                   | กร is *kr*        |
			| Syllables  | น-คร                          | เชียง-ราย               | กรุง-เทพ           |
			| Infer vow. | *a* (CV-syllable) & *o* (CVC) | none                   | none              |
			| Result     | *nakhon*                      | *chiangrai*            | *krungthep*       |

			Usually three consonants split into syllables as น-คร, but in เชียงราย the ร has vowels (diphthong in fact) so it's not the final consonant, but a syllable on it's own.
			Meanwhile the middle ง is fine to serve as the final consonant of the first syllable, hence the split is as displayed above.

			The rules above are a simplification, e.g. sometimes final assignments override clustering, CV/CVC rule can be broken and there are a lot of other details that I don't even know about.
			Imo the syllable splitting is trickiest, but [this article](https://blogs.transparent.com/thai/the-invisible-vowel-rules-part-1/) has some simple hints.
		</Markdown>

		<Markdown wrap="section">
			## Silent consonants

			The thanthakhat ◌์ is a diacritic that indicates a silent consonant.

			Example: ศักดิ์ is *sak* since ศั is *sa*, ก is *k* and the third letter has the ignore-me-hat.
		</Markdown>

		<Markdown wrap="section">
			## Established spellings

			As usual, some toponyms have established translations that differ from what you'd obtain using the transliteration rules. Notably กรุงเทพ is usually translated as Bangkok not Krung Thep.
		</Markdown>

		<Markdown wrap="section">
			## Tones

			Thai is a tonal language, the tones are conveyed by consonant classes, vowel length, closing consonant type and diacritic marks.
			But the tones are not preserved in the common transliteration (RTGS) described here.

			For transliteration purposes please ignore these diacritic marks: อ่ (mai ek), อ้ (mai tho), อ๊ (mai tri), อ๋ (mai chattawa).
		</Markdown>

		<Markdown wrap="section">
			## Changwat

			Provinces are called changwats, i.e. จังหวัด or abbreviated as just จ. The province name is what follows it.

			Province centers are called amphoe mueang (อำเภอเมือง) and are usually named after the province. This means that in Kalasin you're likely to see
			- จังหวัดกาฬสินธุ์ = changwat Kalasin = Kalasin province
			- จ.กาฬสินธุ์ = ch. Kalasin = Kalasin province
			- อำเภอเมืองกาฬสินธุ์ = amphoe mueang Kalasin = Mueang Kalasin District

			On one hand these prefixes make it harder to parse, on the other they're like markers that help you spot where the province name might be.
			You can practice these in the *Prefixed provinces* dataset on either the type-in or the multiple choice quiz.
		</Markdown>

		<section>
			<h2>Common elements in place names</h2>
			<dl>
				<div>
					<dt><span class="thai">นคร</span> <span class="rtgs">Nakhon</span></dt>
					<dd>great city</dd>
				</div>
				<div>
					<dt><span class="thai">บุรี</span> <span class="rtgs">Buri / Puri</span></dt>
					<dd>fortified city</dd>
				</div>
				<div>
					<dt><span class="thai">ราช</span> <span class="rtgs">Raat / Ratcha</span></dt>
					<dd>royal/king</dd>
				</div>
				<div>
					<dt><span class="thai">ธานี</span> <span class="rtgs">Thani</span></dt>
					<dd>city</dd>
				</div>
				<div>
					<dt><span class="thai">เชียง</span> <span class="rtgs">Chiang</span></dt>
					<dd>city (northern)</dd>
				</div>
				<div>
					<dt><span class="thai">บาง</span> <span class="rtgs">Bang</span></dt>
					<dd>waterway settlement</dd>
				</div>
				<div>
					<dt><span class="thai">เขา</span> <span class="rtgs">Khao</span></dt>
					<dd>mountain</dd>
				</div>
				<div>
					<dt><span class="thai">แม่</span> <span class="rtgs">Mae</span></dt>
					<dd>river / mother</dd>
				</div>
				<div>
					<dt><span class="thai">อ่าว</span> <span class="rtgs">Ao</span></dt>
					<dd>bay</dd>
				</div>
			</dl>
		</section>

		<Markdown wrap="section">
			## Resources

			This includes both the resources that I used to prepare this and the resources that might be useful for you to check out if you're interested in other approaches.

			- [A collection of Thailand map quizzes on Helloquiz, includes finding subdivisions in Thai](https://helloquiz.app/country/th)
			- [Wikidata-based Thai toponymy quiz on Helloquiz](https://helloquiz.app/quiz/OI12OnzUUQrz)
			- [Info (in French) and practice quizzes on super-duper.fr](https://super-duper.fr/alphabet/thai.php)
			- [*Thai script* on Wikipedia](https://en.wikipedia.org/wiki/Thai_script)
			- [*Romanization of Thai* on Wikipedia](https://en.wikipedia.org/wiki/Romanization_of_Thai)
			- [*Learning to Read Thai for Geoguessr* by Juliette](https://docs.google.com/document/d/1wQg71ZG2w1RoWZVe7FPF4jdC2iomDSQZImgtdOLBD-E)
			- [*Dealing with Thai script in Geoguessr* by @faraban](https://discord.com/channels/854419081813164042/855528394229415966/1236524192237621329)
		</Markdown>
	</article>
</template>

<style scoped>
article {
	padding: 1.25rem 1.5rem;
	max-width: 640px;
	font-size: clamp(13px, 0.9vw, 16px);
	line-height: 1.6;
	color: var(--c-label);
}

h2 {
	font-size: 0.9em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--c-accent);
	margin-top: 1.25rem;
	margin-bottom: 0.3rem;
}

p {
	color: var(--c-label);
}

p + p {
	margin-top: 0.5rem;
}

ul, ol {
	padding-left: 1.25rem;
	margin: 0.4rem 0 0.6rem;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
}

blockquote {
	margin: 0.5rem 0;
	padding: 0.5rem 0.75rem;
	border-left: 3px solid var(--c-border);
	color: var(--c-muted);
	font-style: italic;
}

table {
	border-collapse: collapse;
	margin: 0.5rem 0;
	font-size: 0.9em;
}

th {
	background: var(--c-alt);
	color: var(--c-head);
	font-weight: 600;
	text-align: left;
	padding: 4px 10px;
	border: 1px solid var(--c-border);
}

td {
	padding: 4px 10px;
	border: 1px solid var(--c-border);
	color: var(--c-label);
}

tr:nth-child(even) td {
	background: var(--c-alt);
}

td:first-child {
	font-family: var(--font-thai);
	font-size: 1.15em;
}

a {
	color: var(--c-accent);
	text-decoration: underline;
	text-underline-offset: 2px;
}

a:hover {
	color: var(--c-head);
}

dl {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	gap: 0.5rem;
}

dl > div {
	padding: 0.4rem 0.6rem;
	border: 1px solid var(--c-border);
	border-radius: 4px;
	background: var(--c-cell);
}

dt {
	font-size: 1.15em;
	font-weight: 600;
	color: var(--c-accent);
	font-family: var(--sans);
	display: flex;
	align-items: baseline;
	flex-wrap: wrap;
	gap: 0.4rem;
}

dd {
	font-size: 0.85em;
	color: var(--c-muted);
	margin: 0;
}

.thai {
	color: var(--c-head);
	font-family: var(--font-thai);
}

.rtgs {
	font-size: 0.9em;
	color: var(--c-accent);
}
</style>
