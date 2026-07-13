<template>
	<article class="reading-tips">
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
			## Typography

			Most Thai letter strokes start with the *head* — a small loop in
			traditional fonts. Some pairs of letters like ค (*kh*) and ด (*d*)
			only differ in head position.

			Loopless fonts (analogue to sans-serif for Latin typefaces) replace
			loops with a notch and often omit loops that are not crucial in
			identifying the letters. Such fonts are common on public signage.

			Here's how features may appear in different fonts:

			| Feature     | Description   | Sarabun                                           | Serif                                           | Sans                                           | Trirong                                          | Rom.                   |
			|-------------|---------------|---------------------------------------------------|-------------------------------------------------|------------------------------------------------|--------------------------------------------------|------------------------|
			| Head        | Terminal loop | <span class="f-sarabun">ผ พ<br>ค ด<br>ถ ภ</span> | <span class="f-serif">ผ พ<br>ค ด<br>ถ ภ</span> | <span class="f-sans">ผ พ<br>ค ด<br>ถ ภ</span> | <span class="f-trirong">ผ พ<br>ค ด<br>ถ ภ</span> | ph ph<br>kh d<br>th kh |
			| Crown       | Curled loop   | <span class="f-sarabun">ข</span>                  | <span class="f-serif">ข</span>                  | <span class="f-sans">ข</span>                  | <span class="f-trirong">ข</span>                 | kh                     |
			| Serration   | Broken line   | <span class="f-sarabun">ฃ ฅ</span>                | <span class="f-serif">ฃ ฅ</span>               | <span class="f-sans">ฃ ฅ</span>                | <span class="f-trirong">ฃ ฅ</span>               | s kh                   |
			| Mid loop    | On stroke     | <span class="f-sarabun">ฆ<br>น ม</span>           | <span class="f-serif">ฆ<br>น ม</span>          | <span class="f-sans">ฆ<br>น ม</span>           |  <span class="f-trirong">ฆ<br>น ม</span>         | kh<br>n m              |
			| Tail        | Line outwards | <span class="f-sarabun">ส ช ฟ</span>              | <span class="f-serif">ส ช ฟ</span>             | <span class="f-sans">ส ช ฟ</span>              | <span class="f-trirong">ส ช ฟ</span>             | s ch f                 |
		</Markdown>

		<Markdown wrap="section">
			## Final consonants

			A syllable can end in -k, -t, -p, -n, -m, -ng, -w, -y. All the other consonants simplify into these.

			For example, นคร (*n kh r*) is *nakhon* not *nakhor*.
		</Markdown>

		<Markdown wrap="section">
			## Syllables

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

			The same vowel can have multiple orthographies, sometimes the syllable split can be deduced from that.
			I.e. ะ is used for short vowels in open syllables while forms like ◌ั are always in a closed syllable.
		</Markdown>

		<Markdown wrap="section">
			## Consonant clusters

			> So, if ก is *k* with an implicit *o*, รุ is *ru* (r with that u-diacri-tick) and ง is *ng*, then กรุง is *korung*, right?

			No. If the letters make a valid consonant cluster, then they just make that.
			Thus กร makes *kr* and that word is *krung*. As in Krung Thep (กรุงเทพ).

			The consonant clusters are basically stop + ร / ล / ว, here are some of the common consonant clusters:
			กร (*kr*), กล (*kl*), กว (*kw*), ตร (*tr*), ปร (*pr*).

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
			| Result     | nakhon                        | chiangrai              | krungthep         |

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

			Provinces are called *changwats*, i.e. จังหวัด or abbreviated as just จ. The province name is what follows it.

			Province centers are called *amphoe mueang* (อำเภอเมือง) and are usually named after the province. This means that in Kalasin you're likely to see
			- จังหวัดกาฬสินธุ์ = *changwat Kalasin* = Kalasin province
			- จ.กาฬสินธุ์ = *ch. Kalasin* = Kalasin province
			- อำเภอเมืองกาฬสินธุ์ = *amphoe mueang Kalasin* = Mueang Kalasin District

			On one hand these prefixes make it harder to parse, on the other they're like markers that help you spot where the province name might be.
			You can practice these in the *Prefixed provinces* dataset on either the type-in or the multiple choice quiz.

			If you're a GeoGuessr player, a great choice for your next step
			would be practice spotting province names on information boards
			using [this map](https://www.geoguessr.com/maps/69678c812577944ef560706b)
			that's made by Juliette who've also written a [Thai guide for GG players](https://docs.google.com/document/d/1wQg71ZG2w1RoWZVe7FPF4jdC2iomDSQZImgtdOLBD-E).
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

			- [*Thai script* on Wikipedia](https://en.wikipedia.org/wiki/Thai_script)
			- [*Romanization of Thai* on Wikipedia](https://en.wikipedia.org/wiki/Romanization_of_Thai)
			- [*Type anatomy*  on Wikipedia](https://en.wikipedia.org/wiki/Thai_typography#Type_anatomy)
			- [*Reading course* on Thai Notes](https://thai-notes.com/reading/index.html)
			- [*Learning to Read Thai for Geoguessr* by Juliette](https://docs.google.com/document/d/1wQg71ZG2w1RoWZVe7FPF4jdC2iomDSQZImgtdOLBD-E)
			- [*Dealing with Thai script in Geoguessr* by @faraban](https://discord.com/channels/854419081813164042/855528394229415966/1236524192237621329)
			- [A collection of Thailand map quizzes on Helloquiz, includes finding subdivisions in Thai](https://helloquiz.app/country/th)
			- [Wikidata-based Thai toponymy quiz on Helloquiz](https://helloquiz.app/quiz/OI12OnzUUQrz)
			- [Info (in French) and practice quizzes on super-duper.fr](https://super-duper.fr/alphabet/thai.php)
		</Markdown>
	</article>
</template>

<style scoped>
/* Thai term cards carry inline badges, so the dt is a flex row */
dt {
	display: flex;
	align-items: baseline;
	flex-wrap: wrap;
	gap: 0.4rem;
}

.thai {
	color: var(--c-head);
	font-family: var(--font-thai);
}

.rtgs {
	font-size: 0.9em;
	color: var(--c-accent-ink);
}

.f-sans {
	font-family: 'Noto Sans Thai', sans-serif;
	font-size: 1.6em;
	line-height: 1;
}

.f-sarabun {
	font-family: 'Sarabun', sans-serif;
	font-size: 1.6em;
	line-height: 1;
}

.f-serif {
	font-family: 'Noto Serif Thai', serif;
	font-size: 1.6em;
	line-height: 1;
}

.f-trirong {
	font-family: 'Trirong', serif;
	font-size: 1.6em;
	line-height: 1;
}
</style>
