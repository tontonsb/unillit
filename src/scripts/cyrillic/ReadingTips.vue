<script setup lang="ts">
import LB from '@/components/LangBadge.vue'
</script>

<template>
	<article class="reading-tips">
		<dl>
			<div>
				<dt>left → right</dt>
				<dd>Direction</dd>
			</div>
			<div>
				<dt>Alphabet</dt>
				<dd>Script type</dd>
			</div>
			<div>
				<dt>Roadsign (similar to BGN/PCGN)</dt>
				<dd>Romanisation</dd>
			</div>
		</dl>

		<Markdown wrap="section">
			## Alphabet

			Just like in Latin and Greek, in Cyrillic both consonants and
			vowels are represented by separate letters.
		</Markdown>

		<Markdown wrap="section">
			## Latin lookalikes

			Some Cyrillic letters look like their Latin counterparts. Some
			others look like Latin characters, but actually represent a
			different sound (many of these are shared with their Greek
			counterparts tho):

			| Cyrillic | Romanised | Example               |
			|----------|-----------|-----------------------|
			| С с      | s         | Омск → Omsk           |
			| Р р      | r         | Самара → Samara       |
			| В в      | v         | Ростов → Rostov       |
			| Н н      | n         | Саранск → Saransk     |
			| У у      | u         | Курск → Kursk         |
			| Х х      | kh        | Астрахань → Astrakhan |
		</Markdown>

		<Markdown wrap="section">
			## Bicamerality

			In Cyrillic each letter has two variations: upper and lower case,
			e.g. Ж and ж are pronounced exactly the same and both are romanised
			as *zh*. Unless you want to keep the capitalisation for the first
			one in which case it's *Zh*.

			Contrary to Latin, the uppercase and lowercase letters usually look
			alike. E.g. the minuscule version of Т is just т. Except for
			cursive and Bulgarian. See below.
		</Markdown>

		<Markdown wrap="section">
			## Cursive

			As if two cases weren't enough, Cyrillic cursive brings two more sets of
			glyphs into play, some of which differ from upright forms significantly
			and some even overlap with unrelated Latin characters.

			On top of that, the cursive shape of several letters is *language-specific*:
			Russian and Serbian have different representations for the same letter.

			<table>
				<thead>
					<tr>
						<th></th>
						<th>b</th>
						<th>v</th>
						<th>g</th>
						<th>d</th>
						<th>i</th>
						<th>y</th>
						<th>p</th>
						<th>t</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Upright</th>
						<td class="cyr-up">б</td>
						<td class="cyr-up">в</td>
						<td class="cyr-up">г</td>
						<td class="cyr-up">д</td>
						<td class="cyr-up">и</td>
						<td class="cyr-up">й</td>
						<td class="cyr-up">п</td>
						<td class="cyr-up">т</td>
					</tr>
					<tr>
						<th>Russian</th>
						<td class="cur" lang="ru">б</td>
						<td class="cur" lang="ru">в</td>
						<td class="cur" lang="ru">г</td>
						<td class="cur" lang="ru">д</td>
						<td class="cur" lang="ru">и</td>
						<td class="cur" lang="ru">й</td>
						<td class="cur" lang="ru">п</td>
						<td class="cur" lang="ru">т</td>
					</tr>
					<tr>
						<th>Serbian</th>
						<td class="cur" lang="sr">б</td>
						<td class="cur" lang="sr">в</td>
						<td class="cur" lang="sr">г</td>
						<td class="cur" lang="sr">д</td>
						<td class="cur" lang="sr">и</td>
						<td class="cur" lang="sr">й</td>
						<td class="cur" lang="sr">п</td>
						<td class="cur" lang="sr">т</td>
					</tr>
				</tbody>
			</table>

			Use the font picker in the top right of the quiz panel to get
			familiar with the cursive forms. I wasn't able to find a complete
			handwriting font. *Pacifico* has most characters, but is thicker
			than typical handwriting while *Great Vibes* lacks support for
			Abkhaz, Bashkir and Central Asian languages.
		</Markdown>

		<Markdown wrap="section">
			## Letter Й

			Despite being called the "short i", й is classified as a consonant
			or semivowel and functions similarly to *y* in English.

			It's mostly transliterated as *y* on road signs, but you will also
			come across seeing it as *i*, especially when it forms a glide after
			a vowel like in край which is *krai* (region). Except -ий which is
			*-iy*, but mostly simplified to *-y* for traditional toponyms.

			| Cyrillic        | Romanised      |
			|-----------------|----------------|
			| Приморский край | Primorsky krai |
			| Байкал          | Baikal         |
			| Йошкар-Ола      | Yoshkar-Ola    |

			The last one is a Mari toponym. In Russian words йо does not form,
			*yo* is written using ё.
		</Markdown>

		<Markdown wrap="section">
			## Hardness and softness

			> The rules described here are specific to East Slavic languages
			> (Ukrainian, Belarusian, Russian, Rusyn). Some alphabets share
			> characters like я and ю, but usually only represent the pair
			> *ya*/*yu* instead of palatalizing the previous consonant.

			### Hard and soft vowels

			Hard vowels represent the vowel sound. Soft vowels either
			palatalise the preceding consonant or indicate a "y" sound before
			them. The table below uses the Russian hard/soft framing and tags
			each letter with the East Slavic languages that use it.

			<small>The "soft" are properly called *iotated* since they carry a
			leading iota, e.g. я represents *ia* or *ja*.</small>

			| Hard | Rom | Lang | | Soft | Rom | Lang |
			|------|-----|------|-|------|-----|------|
			| а | a | <l-b ru uk be rue /> | | я | ya | <l-b ru uk be rue /> |
			| у | u | <l-b ru uk be rue /> | | ю | yu | <l-b ru uk be rue /> |
			| о | o | <l-b ru uk be rue /> | | ё | yo | <l-b ru be rue /> |
			| э | e | <l-b ru be /> | | е | ye / e | <l-b ru be /> |
			| е | e | <l-b uk rue /> | | є | ye | <l-b uk rue /> |
			| ы | y | <l-b ru be rue /> | | и | i | <l-b ru /> |
			| и | y | <l-b uk rue /> | | і | i | <l-b uk be rue /> |
			| — | — | — | | ї | yi | <l-b uk rue /> |

			<small>Beware that и and е are soft in Russian and Belarusian, but hard in
			Ukrainian and Rusyn. So they appear in both columns. Ukrainian
			separates iotated ї from the soft і explicitly.</small>

			Palatalisation is transliterated by the same "y", but on road signs
			it is only transliterated when caused by ю, я or ё. I.e. Брянск is,
			*Bryansk*, but Липецк is just *Lipetsk* not Lyipyetsk which would
			display the palatalisation.

			The leading "y" appears when a soft vowel is at the start of a word
			or after another vowel (or й). E.g. Екатеринбург is *Yekaterinburg*
			and Дмитриев is *Dmitriyev*. Except for и which is just *i* even in
			these cases.

			### Always-hard consonants

			Consonants ж, ш and ц are always hard in Russian and that is also
			reflected in romanisation: парашют would be *parashut* despite the
			above table suggesting *yu* there.

			In other East Slavic languages you can also have a soft ць, but ж
			and ш are still hard.

			### Hard sign and soft sign

			Some symbols carry no sound of their own but modify the consonant
			before them:

			- **Ь ь** (soft sign) palatalises the preceding consonant
			- **Ъ ъ** (hard sign) indicates the preceding consonant stays hard
			- **'** (hard sign) is used in Ukrainian and Belarusian instead of ъ

			For transliteration you should know that these signs "separate" the
			consonant from the following vowel and it's transliterated as if it
			was at the start of a word or after another vowel. E.g. Усолье
			is *Usolye* not *Usole*.

			This can happen even after a hard consonant, e.g. Медвежьегорск is
			*Medvezhyegorsk*.

			Sometimes Ъ is transliterated as `"` and Ь as `'`: Пермь → *Perm'*,
			contradicting `'` being the hard sign in Ukrainian and Belarusian.

			Note that in Bulgarian Ъ ъ is a vowel that's romanised as *a*
			(e.g. Търново → *Tarnovo*). In other languages ь can form compound
			letters like Дь and Нь in Yakut which leads to combinations that
			would be impossible in Russian like Дьокуускай → *Djokuuskay* (*Yakutsk*).

			| Cyrilllic | Romanised  | Decomposed      | Explained               |
			|-----|------|-----------------|-------------------------|
			| Ду  | Du   | hard *d* + *u*  | default                 |
			| Дю  | Dyu  | soft *d* + *u*  | ю softens Д             |
			| Дъю | Dyu  | hard *d* + *yu* | ъ prevents softening    |
			| Дью | Dyu  | soft *d* + *yu* | ь softens and separates |
			| Дьу | —    | —               | Yakut *dyu*/*dju*/*d'u* |
			| Дъу | —    | —               | Bulgarian *dau*         |
			| Жу  | Zhu  | *zh* + *u*      | default                 |
			| Жю  | Zhu  | *zh* + *u*      | ж is unsoftenable       |
			| Жью | Zhyu | *zh* + *yu*     | ь separates ю           |
			| Жъю | —    | —               | Bulgarian *zhayu*       |
			| Жьу | —    | —               | Doesn't exist           |
			| Жъу | —    | —               | Bulgarian *zhau*        |

			### Ё vs Е

			Despite being a separate letter, Ё is often written as Е. You are
			usually expected to know from context which one it is
		</Markdown>

		<Markdown wrap="section">
			## Bulgarian Cyrillic

			In the middle of the 20th century Bulgarians re-thought how the
			letters should look like. The main difference is that many
			lowercase letters look more like their cursive counterparts instead
			of being scaled-down versions of the uppercase character.

			<figure>
				<img
					src="/bulgarian-vs-russian-cyrillic.png"
					alt="Bulgarian and Russian Cyrillic letterforms with differences highlighted"
				>
				<figcaption>
					Differences between Bulgarian Cyrillic (left) and Russian Cyrillic (right) from <a href=https://cyrillic.bgweb.bg/en/>BG Web</a>.
				</figcaption>
			</figure>

			The font used on official road signs does NOT use the Bulgarian cyrillic.
		</Markdown>

		<Markdown wrap="section">
			## Resources

			- [*Cyrillic script* on Wikipedia](https://en.wikipedia.org/wiki/Cyrillic_script)
			- [Romanization systems of Russian on Wikipedia](https://en.wikipedia.org/wiki/Romanization_of_Russian)
			- [*Bulgarian Cyrillic*](https://cyrillic.bgweb.bg/en/)
		</Markdown>
	</article>
</template>

<style scoped>
/* Cyrillic-specific: letterform font for the first table column and cursive cells.
   Shared prose/table/blockquote styles live in assets/reading-tips.css */
.cyr-up {
	font-family: Lora, serif;
	font-size: 18px;
	text-align: center;
}

.cur {
	font-family: Lora, serif;
	font-style: italic;
	font-size: 22px;
	text-align: center;
}

.legend {
	display: block;
	margin-top: 0.3rem;
	font-size: 0.8em;
	color: var(--c-muted);
}
</style>
