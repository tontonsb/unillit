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

			Tamil script is an *abugida* which means that consonants are the primary characters.
			Vowels that follow a consonant are notated as a diacritic on the preceding consonant.

			- Consonants are written left to right.
			- The vowel is a diacritic written above, below, after or even before the consonant.
			- Consonants without a diacritic have the short *a* as a default vowel.
			- The default vowel can be suppressed using the ் diacritic (*pulli*).

			| Tamil | Latin | Why????                                    |
			|-------|-------|--------------------------------------------|
			| வ    | va    | *v* with the inherent *a*                  |
			| வவ  | vava  | twice of the above                         |
			| வ்    | v     | the default vowel is silenced by ்         |
			| வவ்  | vav   | *va* + *v*                                 |
			| வி    | vi    | ◌ி changes the vowel to *i*               |
			| வெவ | veva  | ◌ெ changes the vowel of first *v* to *e* |
		</Markdown>

		<Markdown wrap="section">
			## Standalone vowels

			Syllable-leading vowels are represented by a standalone character:
			உலகம் is *ulagam* since உ is the standalone *u*.

			They are rarely used within words. E.g. *per* (big) is பேர் and *ur*
			(town) is ஊர், but they combine into பேரூர் to make Perur — the *u*
			gets merged in as a diacritic on the preceding consonant.
		</Markdown>

		<Markdown wrap="section">
			## Consonant clusters

			Compared to other abugidas, Tamil has a straightforward way of
			writing consonant clusters. The pulli diacritic (்) silences the
			default vowel, so க் makes just *k* and that's what they use:
			க்க makes *kka*, ங்க makes *nga* and so on.

			There are two exceptions that do have special renderings:
			க்ஷ is *ksha* and ஸ்ரீ is *sri* (or *shri*).
		</Markdown>

		<Markdown wrap="section">
			## Voiced and voiceless consonants

			Some Tamil letters represent stops whose pronunciation depends on
			their position (see the Tamil stop allophones table
			[in this wikipedia section](https://en.wikipedia.org/wiki/Tamil_phonology#Consonants)).

			- Voiceless at the start of the word.
			- Voiceless if doubled.
			- Voiced after nasals (*n*/*m*-like, i.e. ந, ங, ஞ, ன, ண, ம).
			- Voiced or changed to fricatives between vowels.

			| Tamil   | Latin | Explanation                                     |
			|---------|-------|-------------------------------------------------|
			| க      | ka     | The initial stop is a voiceless *k*            |
			| கடல்   | kadal  | The initial stop is still a voiceless *k*      |
			| பக்கம் | pakkam | Doubled க்க makes a voiceless *kk*             |
			| அங்கு  | angu   | கு (*ku*) after nasal *ng* becomes voiced *gu* |
			| பகல்   | pagal  | க makes *ga* when surrounded by vowels        |

			The conventional toponymy transliteration is not super consistent,
			but it often follows these patterns:

			| Letter | Start  | Doubled  | After nasal | Between vowels |
			|--------|--------|----------|-------------|----------------|
			| க      | k     | kk       | g           | g              |
			| ச      | ch, s | ch, chch | j, ch       | s               |
			| ட      | —     | tt       | d           | d              |
			| ப      | p     | pp       | b           | b, v            |
			| த      | th, t | tth, th  | dh, d       | dh, d           |
			| ற      | —     | ttr, tt  | dr          | r               |

			> Note that ற is *r*, not a stop, but it can behave like one, e.g.
			> ஆறு is *aru* but காற்று is *katru*.
		</Markdown>

		<Markdown wrap="section">
			## Consonant ழ

			The ழ represents a sound between *l* and *r*, similar to the *r* in
			some American dialects. It is usually transliterated as either *l*
			or *zh*, e.g. தமிழ் is commonly transliterated as either *Tamil* or
			*Tamizh*. Or even *Thamizh*.
		</Markdown>

		<Markdown wrap="section">
			## The u vowels

			While most diacritics in Tamil are easy to spot, the short and long
			*u* vowel diacritics ு and ூ make elaborate glyphs when combined
			with consonants, e.g. base *ka* is க, but *ku* is கு and *kuu* is கூ.

			Meanwhile the *na* ந forms நு and நூ for *nu* and *nuu*. For this
			reason the shape identification sheet lists the *u* forms along
			standalone characters.

			> This section used *u* and *uu* to make the presentation clearer,
			> but anglicised toponymy often omits the vowel length distinction
			> and uses just *u* for both. There are exceptions like Thoothukudi.
		</Markdown>

		<Markdown wrap="section">
			## Established spellings

			Some places are known in English by conventional names that reflect
			historical romanisations or shortened names.

			| Tamil             | Would read as    | Is known as |
			|-------------------|------------------|-------------|
			| உதகமண்டலம்   | Udhagamandalam   | Ooty        |
			| திருச்சிராப்பள்ளி | Tiruchirappalli  | Trichy     |
			| தூத்துக்குடி       | Thoothukudi      | Tuticorin   |
			| கோயம்புத்தூர்    | Koyambuttur     | Coimbatore  |
			| தஞ்சாவூர்         | Thanjavur       | Tanjore     |
			| புதுச்சேரி         | Puducheri       | Pondicherry |
			| யாழ்ப்பாணம்     | Yazhppanam      | Jaffna      |
			| திருக்கோணமலை | Thirukkonamalai | Trincomalee |
			| மட்டக்களப்பு      | Mattakkalappu   | Batticaloa   |
		</Markdown>

		<section>
			<h2>Common elements in place names</h2>

			<dl class="terms">
				<div>
					<dt><span class="tamil">ஊர்</span> Ur / Oor</dt>
					<dd>town / village</dd>
				</div>
				<div>
					<dt><span class="tamil">பட்டி</span> Patti</dt>
					<dd>village / hamlet</dd>
				</div>
				<div>
					<dt><span class="tamil">பேட்டை</span> Pettai</dt>
					<dd>suburb / market</dd>
				</div>
				<div>
					<dt><span class="tamil">குடி</span> Kudi</dt>
					<dd>settlement</dd>
				</div>
				<div>
					<dt><span class="tamil">கோட்டை</span> Kottai</dt>
					<dd>fort</dd>
				</div>
				<div>
					<dt><span class="tamil">புரம்</span> Puram</dt>
					<dd>town</dd>
				</div>
				<div>
					<dt><span class="tamil">நகர்</span> Nagar</dt>
					<dd>city / neighbourhood</dd>
				</div>
				<div>
					<dt><span class="tamil">பாளையம்</span> Palayam</dt>
					<dd>camp / settlement</dd>
				</div>
				<div>
					<dt><span class="tamil">மலை</span> Malai</dt>
					<dd>hill / mountain</dd>
				</div>
				<div>
					<dt><span class="tamil">குளம்</span> Kulam</dt>
					<dd>pond / tank</dd>
				</div>
				<div>
					<dt><span class="tamil">புது</span> Puthu / Pudu</dt>
					<dd>new</dd>
				</div>
				<div>
					<dt><span class="tamil">திரு</span> Tiru / Thiru</dt>
					<dd>sacred / holy</dd>
				</div>
			</dl>
		</section>

		<Markdown wrap="section">
			## Resources

			- [*Tamil script* on Wikipedia](https://en.wikipedia.org/wiki/Tamil_script)
			- [*Tamil phonology* on Wikipedia](https://en.wikipedia.org/wiki/Tamil_phonology)
			- [Wikidata-based Tamil toponymy quiz on Helloquiz](https://helloquiz.app/quiz/pmoq46EaZdtu)
		</Markdown>
	</article>
</template>

<style scoped>
.tamil {
	color: var(--c-head);
	font-family: var(--font-tamil);
	font-size: var(--fs-letterform);
	font-weight: 400;
}
</style>
