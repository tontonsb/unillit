<template>
	<article class="reading-tips">
		<dl class="colophon">
			<div>
				<dt>Direction</dt>
				<dd>left → right</dd>
			</div>
			<div>
				<dt>Script type</dt>
				<dd>Abugida</dd>
			</div>
			<div>
				<dt>Romanisation</dt>
				<dd>Conventional roadsigny</dd>
			</div>
		</dl>

		<Markdown wrap="section">
			## Abugida

			Sinhala script is an *abugida* which means that consonants are the primary characters.
			Vowels that follow a consonant are notated as a diacritic on the preceding consonant.

			- Consonants are written left to right.
			- The vowel is a diacritic written above, below, after or even before the consonant.
			- Consonants without a diacritic have the short *a* as a default vowel.
			- The default vowel can be suppressed using the ් diacritic.

			| Sinhala | Latin | Why????                  |
			|---------|-------|--------------------------|
			| න      | na    | *n* with the inherent *a* |
			| නන    | nana   | twice of the above |
			| නුන    | nuna   | ◌ු changes the first vowel to *u* |
			| නෙන   | nena   | ෙ changes the first vowel to *e* |
			| නන්    | nan    | න් has the vowel suppressing diacritic, making it just *n* |
		</Markdown>

		<Markdown wrap="section">
			## Standalone vowels

			Syllable-leading vowels are represented by a standalone character:
			උන is *una* since උ is the standalone *u*.

			They can appear in the middle of a word as well, e.g. මහඔය is *Maha Oya*
			with ඔ (*o*) starting the second part.
		</Markdown>

		<Markdown wrap="section">
			## Diacritic shapes

			Beware that the vowel diacritic can take multiple forms depending on the consonant.

			Instead of the default short and long *u* shapes ◌ු and ◌ූ, consonants
			ක, ග, ඟ, ත, භ, ශ have a little hook on the bottom right.

			Consonants ර (*r*) and ළ (*l*) have specific ligatures with *u* shapes.
			Quirkily, the *ru* ligature රු appears like a combination of ර *r* and ◌ැ *e*,
			while the *re* is in turn written as රැ. Same with රූ *ru* and ළූ *lu*.

			The vowel suppressor ් bends along the upper curve of the consonant
			if it has one, e.g. with ට (*ta*) it becomes ට් (*t*) while with
			ක (*ka*) it is just ක් (*k*).

			| Case              | Default | Suppressed ් | short *u* ◌ු | long *u* ◌ූ |
			|-------------------|---------|--------------|--------------|-------------|
			| Standard          | න *na*  | න් *n*      | නු *nu*      | නූ *nu*     |
			| Variant *u*       | ක *ka*  | ක් *k*      | කු *ku*      | කූ *ku*     |
			| Sneaky suppressor | ට *ta*  | ට් *t*       | ටු *tu*       | ටූ *tu*     |
			| The ර             | ර *ra*  | ර් *r*       | රු *ru*      | රූ *ru*     |
			| The ළ             | ළ *la*  | ළ් *l*       | ළු *lu*      | ළූ *lu*     |
		</Markdown>

		<Markdown wrap="section">
			## Consonant clusters

			Many consonant clusters are written explicitly by suppressing the
			vowel of the first consonant, e.g. ගාල්ල is *Galla* — the first ල
			has its vowel suppressed.

			But some consonant clusters have specific ligatures. An *r* after a
			suppressed consonant collapses into a hook below, e.g. *kr* is ක්‍ර
			and *sri* is ශ්‍රී.
		</Markdown>

		<Markdown wrap="section">
			## Established names

			Sure enough, some toponyms have established names that don't line
			up with the transliteration rules. E.g. මහනුවර would read as
			*Mahanuwara* but is usually Kandy.

			| Sinhala      | Would read as | But is obviously |
			|--------------|---------------|------------------|
			| මහනුවර     | Mahanuwara    | Kandy            |
			| කොළඹ      | Kolamba       | Colombo          |
			| ගාල්ල        | Galla         | Galle            |
			| නුවරඑළිය    | Nuwaraeliya   | Nuwara Eliya     |
			| ත්‍රිකුණාමලය  | Trikunamalaya | Trincomalee      |
			| මඩකලපුව    | Madakalapuwa  | Batticaloa       |
			| යාපනය      | Yapanaya      | Jaffna           |

			The names Trincomalee, Batticaloa and Jaffna are derived from the
			Tamil names of these places. That's why the Sinhala version is so
			different.
		</Markdown>

		<section>
			<h2>Common elements in place names</h2>

			<dl class="terms">
				<div>
					<dt><span class="sinhala">මහ</span> Maha</dt>
					<dd>great / big</dd>
				</div>
				<div>
					<dt><span class="sinhala">ගම</span> Gama</dt>
					<dd>village</dd>
				</div>
				<div>
					<dt><span class="sinhala">පුර</span> Pura</dt>
					<dd>city</dd>
				</div>
				<div>
					<dt><span class="sinhala">නුවර</span> Nuwara</dt>
					<dd>city</dd>
				</div>
				<div>
					<dt><span class="sinhala">වෙල</span> Wela</dt>
					<dd>paddy field</dd>
				</div>
				<div>
					<dt><span class="sinhala">ගොඩ</span> Goda</dt>
					<dd>high ground</dd>
				</div>
				<div>
					<dt><span class="sinhala">තොට</span> Tota</dt>
					<dd>ford / landing place</dd>
				</div>
				<div>
					<dt><span class="sinhala">පිටිය</span> Pitiya</dt>
					<dd>open plain</dd>
				</div>
				<div>
					<dt><span class="sinhala">වත්ත</span> Watta</dt>
					<dd>garden / estate</dd>
				</div>
				<div>
					<dt><span class="sinhala">දෙණිය</span> Deniya</dt>
					<dd>low-lying field</dd>
				</div>
				<div>
					<dt><span class="sinhala">ඔය</span> Oya</dt>
					<dd>river / stream</dd>
				</div>
				<div>
					<dt><span class="sinhala">වැව</span> Wewa</dt>
					<dd>reservoir</dd>
				</div>
				<div>
					<dt><span class="sinhala">ගල</span> Gala</dt>
					<dd>rock</dd>
				</div>
			</dl>
		</section>

		<Markdown wrap="section">
			## Resources

			- [*Sinhala script* on Wikipedia](https://en.wikipedia.org/wiki/Sinhala_script)
			- [Wikidata-based Sinhala toponymy quiz on Helloquiz](https://helloquiz.app/quiz/q6sGh8iKuG7E)
		</Markdown>
	</article>
</template>

<style scoped>
.sinhala {
	color: var(--c-head);
	font-family: var(--font-sinhala);
	font-size: var(--fs-letterform);
	font-weight: 400;
}
</style>
