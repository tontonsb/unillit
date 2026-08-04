<template>
	<div class="sheet">

		<!-- CONSONANTS BY SHAPE FAMILY -->
		<div class="section">
			<div class="section-title">Consonants — grouped by shape family. Large = isolated, small = medial, <span style="background:#fefcf5; padding:0 3px; border-radius:2px; color:#7b6e5a">tan = non-connecting</span></div>
			<div class="families">

				<div class="cluster"><div class="cluster-head">bowl &nbsp;<span class="shape">small tick</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ب</span><span class="ar med">ـبـ</span><span class="lname">ba</span><span class="lrom">b</span></div>
					<div class="lcell"><span class="ar iso">ت</span><span class="ar med">ـتـ</span><span class="lname">ta</span><span class="lrom">t</span></div>
					<div class="lcell"><span class="ar iso">ث</span><span class="ar med">ـثـ</span><span class="lname">tha</span><span class="lrom">th</span></div>
					<div class="lcell"><span class="ar iso">پ</span><span class="ar med">ـپـ</span><span class="lname">pa</span><span class="lrom">p</span><span class="badge fa">FA</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">hook &nbsp;<span class="shape">trampoline</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ج</span><span class="ar med">ـجـ</span><span class="lname">jim</span><span class="lrom">j</span></div>
					<div class="lcell"><span class="ar iso">ح</span><span class="ar med">ـحـ</span><span class="lname">ha</span><span class="lrom">ḥ</span></div>
					<div class="lcell"><span class="ar iso">خ</span><span class="ar med">ـخـ</span><span class="lname">kha</span><span class="lrom">kh</span></div>
					<div class="lcell"><span class="ar iso">چ</span><span class="ar med">ـچـ</span><span class="lname">che</span><span class="lrom">ch</span><span class="badge fa">FA</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">dal &nbsp;<span class="shape">wedge</span></div><div class="cluster-letters">
					<div class="lcell nc"><span class="ar iso">د</span><span class="ar med">ـد</span><span class="lname">dal</span><span class="lrom">d</span><span class="badge nc-badge">non-conn</span></div>
					<div class="lcell nc"><span class="ar iso">ذ</span><span class="ar med">ـذ</span><span class="lname">dhal</span><span class="lrom">dh</span><span class="badge nc-badge">non-conn</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">ra &nbsp;<span class="shape">curved tail</span></div><div class="cluster-letters">
					<div class="lcell nc"><span class="ar iso">ر</span><span class="ar med">ـر</span><span class="lname">ra</span><span class="lrom">r</span><span class="badge nc-badge">non-conn</span></div>
					<div class="lcell nc"><span class="ar iso">ز</span><span class="ar med">ـز</span><span class="lname">zay</span><span class="lrom">z</span><span class="badge nc-badge">non-conn</span></div>
					<div class="lcell nc"><span class="ar iso">ژ</span><span class="ar med">ـژ</span><span class="lname">zhe</span><span class="lrom">zh</span><span class="badge fa">FA</span><span class="badge nc-badge">non-conn</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">sin &nbsp;<span class="shape">three teeth</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">س</span><span class="ar med">ـسـ</span><span class="lname">sin</span><span class="lrom">s</span></div>
					<div class="lcell"><span class="ar iso">ش</span><span class="ar med">ـشـ</span><span class="lname">shin</span><span class="lrom">sh</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">sad &nbsp;<span class="shape">loop + tooth</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ص</span><span class="ar med">ـصـ</span><span class="lname">sad</span><span class="lrom">ṣ</span></div>
					<div class="lcell"><span class="ar iso">ض</span><span class="ar med">ـضـ</span><span class="lname">dad</span><span class="lrom">ḍ</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">ṭa &nbsp;<span class="shape">loop + vertical</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ط</span><span class="ar med">ـطـ</span><span class="lname">ṭa</span><span class="lrom">ṭ</span></div>
					<div class="lcell"><span class="ar iso">ظ</span><span class="ar med">ـظـ</span><span class="lname">dha</span><span class="lrom">ẓ</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">ʿayn &nbsp;<span class="shape">eye</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ع</span><span class="ar med">ـعـ</span><span class="lname">ʿayn</span><span class="lrom">ʿ</span></div>
					<div class="lcell"><span class="ar iso">غ</span><span class="ar med">ـغـ</span><span class="lname">ghayn</span><span class="lrom">gh</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">fa &nbsp;<span class="shape">round head</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ف</span><span class="ar med">ـفـ</span><span class="lname">fa</span><span class="lrom">f</span></div>
					<div class="lcell"><span class="ar iso">ق</span><span class="ar med">ـقـ</span><span class="lname">qaf</span><span class="lrom">q</span></div>
					<div class="lcell" style="border-left:1px dashed var(--c-border)"><span class="ar iso">ڢ</span><span class="ar med">ـڢـ</span><span class="lname">fa</span><span class="lrom">f</span><span class="badge mg">MG</span></div>
					<div class="lcell"><span class="ar iso">ڧ</span><span class="ar med">ـڧـ</span><span class="lname">qaf</span><span class="lrom">q</span><span class="badge mg">MG</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">kaf &nbsp;<span class="shape">angular</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ك</span><span class="ar med">ـكـ</span><span class="lname">kaf</span><span class="lrom">k</span></div>
					<div class="lcell"><span class="ar iso">گ</span><span class="ar med">ـگـ</span><span class="lname">gaf</span><span class="lrom">g</span><span class="badge fa">FA</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">lam</div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ل</span><span class="ar med">ـلـ</span><span class="lname">lam</span><span class="lrom">l</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">mim &nbsp;<span class="shape">circle</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">م</span><span class="ar med">ـمـ</span><span class="lname">mim</span><span class="lrom">m</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">nun &nbsp;<span class="shape">curved bowl</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ن</span><span class="ar med">ـنـ</span><span class="lname">nun</span><span class="lrom">n</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">ha &nbsp;<span class="shape">four-lobed</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ه</span><span class="ar med">ـهـ</span><span class="lname">ha</span><span class="lrom">h</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">waw &nbsp;<span class="shape">head + tail</span></div><div class="cluster-letters">
					<div class="lcell nc"><span class="ar iso">و</span><span class="ar med">ـو</span><span class="lname">waw</span><span class="lrom">w / ū</span><span class="badge nc-badge">non-conn</span></div>
				</div></div>

				<div class="cluster"><div class="cluster-head">ya &nbsp;<span class="shape">extended tooth</span></div><div class="cluster-letters">
					<div class="lcell"><span class="ar iso">ي</span><span class="ar med">ـيـ</span><span class="lname">ya</span><span class="lrom">y / ī</span></div>
					<div class="lcell"><span class="ar iso">ى</span><span class="ar med">ـى</span><span class="lname">alif maqṣ.</span><span class="lrom">ā / a</span></div>
				</div></div>

				<div class="cluster" style="border-color:#b08040"><div class="cluster-head" style="background:#fdf5e0;color:#7a5c10;border-color:#c8b070">mandatory ligature</div><div class="cluster-letters">
					<div class="lcell" style="min-width:60px"><span class="ar iso" style="font-size:28px">لا</span><span class="lname">lam + alif</span><span class="lrom">la</span></div>
					<div class="lcell" style="min-width:60px"><span class="ar iso" style="font-size:28px">لأ</span><span class="lname">lam + alif hamza</span><span class="lrom">laʾ / la</span></div>
				</div></div>

			</div>
		</div>

		<!-- ALIF VARIANTS -->
		<div class="section">
			<div class="section-title">Alif &amp; hamza variants</div>
			<div class="section-note">Alif ا is non-connecting. Hamza ء (glottal stop) sits on a seat or alone.</div>
			<div class="vgrid">
				<div class="vcell"><span class="ar iso">ا</span><span class="lname">alif</span><span class="lrom">ā / a</span></div>
				<div class="vcell"><span class="ar iso">أ</span><span class="lname">alif + hamza above</span><span class="lrom">ʾa / ʾu</span></div>
				<div class="vcell"><span class="ar iso">إ</span><span class="lname">alif + hamza below</span><span class="lrom">ʾi</span></div>
				<div class="vcell"><span class="ar iso">آ</span><span class="lname">alif maddah</span><span class="lrom">ʾā</span></div>
				<div class="vcell"><span class="ar iso">ء</span><span class="lname">hamza (alone)</span><span class="lrom">ʾ</span></div>
				<div class="vcell"><span class="ar iso">ئ</span><span class="lname">hamza on ya seat</span><span class="lrom">ʾ</span></div>
				<div class="vcell"><span class="ar iso">ؤ</span><span class="lname">hamza on waw seat</span><span class="lrom">ʾ</span></div>
				<div class="vcell"><span class="ar iso">ة</span><span class="lname">tāʾ marbūṭa</span><span class="lrom">h / t</span></div>
			</div>
			<div class="table-note"><strong>tāʾ marbūṭa ة</strong> — looks like ه with 2 dots; only word-final; romanised <em>h</em> in pause, <em>t</em> in construct (Madīnat al-Nūr).</div>
		</div>

		<!-- DIACRITICS -->
		<div class="section">
			<div class="section-title">Diacritics (vowel marks)</div>
			<div class="section-note">Omitted in most text. Written only in Quran, children's books, and dictionaries.</div>
			<div class="dgrid">
				<div class="dcell"><span class="dglyph">بَ</span><div class="dtext"><strong>fatḥa &nbsp;◌َ</strong>short <em>a</em></div></div>
				<div class="dcell"><span class="dglyph">بِ</span><div class="dtext"><strong>kasra &nbsp;◌ِ</strong>short <em>i</em></div></div>
				<div class="dcell"><span class="dglyph">بُ</span><div class="dtext"><strong>ḍamma &nbsp;◌ُ</strong>short <em>u</em></div></div>
				<div class="dcell"><span class="dglyph">بّ</span><div class="dtext"><strong>shadda &nbsp;◌ّ</strong>doubled consonant</div></div>
				<div class="dcell"><span class="dglyph">بْ</span><div class="dtext"><strong>sukūn &nbsp;◌ْ</strong>no vowel follows</div></div>
				<div class="dcell"><span class="dglyph">بً</span><div class="dtext"><strong>tanwīn &nbsp;◌ً</strong><em>-an</em> (nunation)</div></div>
			</div>
			<div class="table-note">Long vowels are written with letters: ا = ā, و = ū, ي = ī</div>
		</div>

		<!-- SUN / MOON -->
		<div class="section">
			<div class="section-title">The definite article الـ and sun / moon letters</div>
			<div class="sun-moon-grid">
				<div class="sun-side">
					<div class="sm-label sun-label">☀ Sun letters (14) — الـ assimilates: al- → a[x]-</div>
					<div class="sun-letters">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</div>
				</div>
				<div>
					<div class="sm-label moon-label">◑ Moon letters (14) — الـ stays al-</div>
					<div class="moon-letters">ب ج ح خ ع غ ف ق ك م ه و ي + ا</div>
				</div>
			</div>
			<div class="assimil">
				<span class="assimil-note">Examples — the article ال is always written in full, only the pronunciation assimilates:</span>
				<div class="assimil-examples">
					<div class="ex"><span class="ar" style="font-size:16px">الشَّمْس</span> <span>→ <em>ash-shams</em> (the sun) — ش is a sun letter</span></div>
					<div class="ex"><span class="ar" style="font-size:16px">النِّيل</span> <span>→ <em>an-Nīl</em> (the Nile) — ن is a sun letter</span></div>
					<div class="ex"><span class="ar" style="font-size:16px">القَاهِرَة</span> <span>→ <em>al-Qāhira</em> (Cairo) — ق is a moon letter</span></div>
					<div class="ex"><span class="ar" style="font-size:16px">الجَبَل</span> <span>→ <em>al-Jabal</em> (the mountain) — ج is a moon letter</span></div>
				</div>
			</div>
		</div>

		<!-- GEO PREFIXES -->
		<div class="section">
			<div class="section-title">Common geographic elements in Arabic place names</div>
			<div class="prefix-grid">
				<div class="pcell"><span class="ar pcell-ar">جَبَل</span> <span class="prom">Jabal</span> <span class="pmean">mountain</span></div>
				<div class="pcell"><span class="ar pcell-ar">وَادِي</span> <span class="prom">Wādī</span> <span class="pmean">valley · seasonal riverbed</span></div>
				<div class="pcell"><span class="ar pcell-ar">نَهْر</span> <span class="prom">Nahr</span> <span class="pmean">river (perennial)</span></div>
				<div class="pcell"><span class="ar pcell-ar">بَحْر</span> <span class="prom">Baḥr</span> <span class="pmean">sea · large lake</span></div>
				<div class="pcell"><span class="ar pcell-ar">خَلِيج</span> <span class="prom">Khalīj</span> <span class="pmean">gulf · bay</span></div>
				<div class="pcell"><span class="ar pcell-ar">رَأْس</span> <span class="prom">Raʾs</span> <span class="pmean">cape · headland (lit. head)</span></div>
				<div class="pcell"><span class="ar pcell-ar">عَيْن</span> <span class="prom">ʿAyn</span> <span class="pmean">spring · well (lit. eye)</span></div>
				<div class="pcell"><span class="ar pcell-ar">بِئْر</span> <span class="prom">Biʾr</span> <span class="pmean">well (dug)</span></div>
				<div class="pcell"><span class="ar pcell-ar">مَدِينَة</span> <span class="prom">Madīna</span> <span class="pmean">city</span></div>
				<div class="pcell"><span class="ar pcell-ar">قَرْيَة</span> <span class="prom">Qarya</span> <span class="pmean">village</span></div>
				<div class="pcell"><span class="ar pcell-ar">أَبُو</span> <span class="prom">Abū</span> <span class="pmean">father of (common toponym element)</span></div>
				<div class="pcell"><span class="ar pcell-ar">بَنِي</span> <span class="prom">Banī</span> <span class="pmean">sons of (tribal place names)</span></div>
				<div class="pcell"><span class="ar pcell-ar">دَار</span> <span class="prom">Dār</span> <span class="pmean">house · land · region (Darfur = Dār Fūr)</span></div>
				<div class="pcell"><span class="ar pcell-ar">بَاب</span> <span class="prom">Bāb</span> <span class="pmean">gate · strait (Bab-el-Mandeb)</span></div>
				<div class="pcell"><span class="ar pcell-ar">أَرْض</span> <span class="prom">Arḍ</span> <span class="pmean">land · earth</span></div>
				<div class="pcell"><span class="ar pcell-ar">صَحْرَاء</span> <span class="prom">Ṣaḥrāʾ</span> <span class="pmean">desert · the Sahara</span></div>
			</div>
		</div>

		<div class="footnote">
			<span>Romanisation: <abbr title="BGN/PCGN 1956, as used on US/UK official maps">BGN/PCGN 1956</abbr>, ʿ = ʿayn, <span class="badge fa">FA</span> = Farsi/Dari/Pashto, <span class="badge mg">MG</span> = Maghrebi dot variant</span>
			<span>Arabic Unicode block: U+0600–U+06FF, Extended: U+0750–U+077F</span>
		</div>

	</div>
</template>

<style scoped>
.sheet {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
}
.section { border: 1px solid var(--c-border); border-radius: 4px; overflow: hidden; }
.section-title { background: var(--c-head); color: #fff; font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 7px; }
.section-note { font-size: 8.5px; color: var(--c-muted); padding: 3px 7px 2px; background: var(--c-alt); border-bottom: 1px solid var(--c-border); }
.table-note { padding: 4px 7px; font-size: 8px; color: var(--c-muted); background: var(--c-alt); border-top: 1px solid var(--c-border); }

/* shape families */
.families { display: flex; flex-wrap: wrap; gap: 6px; padding: 7px; background: var(--c-bg); }
.cluster { border: 1px solid var(--c-border); border-radius: 3px; overflow: hidden; background: var(--c-cell); }
.cluster-head { background: var(--c-alt); color: var(--c-label); font-size: 7.5px; font-weight: 600; letter-spacing: 0.04em; padding: 2px 5px; border-bottom: 1px solid var(--c-border); white-space: nowrap; }
.cluster-head .shape { font-weight: 400; color: var(--c-muted); }
.cluster-letters { display: flex; }
.lcell { padding: 4px 6px 3px; text-align: center; border-right: 1px solid var(--c-border); display: flex; flex-direction: column; align-items: center; gap: 1px; min-width: 48px; }
.lcell:last-child { border-right: none; }
.lcell.nc { background: #fefcf5; }
.ar { font-family: var(--font-arabic); direction: rtl; unicode-bidi: bidi-override; }
.iso { font-size: 24px; line-height: 1.2; }
.med { font-size: 14px; color: var(--c-muted); line-height: 1.3; }
.lname { font-size: 7.5px; color: var(--c-label); white-space: nowrap; }
.lrom { font-size: 9px; color: var(--c-sign); font-weight: 700; white-space: nowrap; }

/* alif variants grid */
.vgrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.vcell { padding: 4px 4px 3px; text-align: center; border-right: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); display: flex; flex-direction: column; align-items: center; gap: 1px; }
.vcell:nth-child(4n) { border-right: none; }

.vcell:nth-last-child(-n+4):nth-child(4n+1),
.vcell:nth-last-child(-n+4):nth-child(4n+2),
.vcell:nth-last-child(-n+4):nth-child(4n+3),
.vcell:nth-last-child(-n+4):nth-child(4n+4) { border-bottom: none; }
.vcell .iso { font-size: 22px; }

/* diacritics */
.dgrid { display: grid; grid-template-columns: repeat(3, 1fr); }
.dcell { padding: 4px 5px; border-right: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; gap: 6px; }
.dcell:nth-child(3n) { border-right: none; }
.dglyph { font-family: var(--font-arabic); font-size: 26px; direction: rtl; min-width: 32px; text-align: center; }
.dtext { font-size: 8px; line-height: 1.5; }
.dtext strong { display: block; font-size: 9px; color: var(--c-head); }

/* sun/moon */
.sun-moon-grid { display: grid; grid-template-columns: 1fr 1fr; }
.sun-side { border-right: 1px solid var(--c-border); }
.sm-label { font-size: 8px; font-weight: 600; padding: 2px 8px; background: var(--c-alt); border-bottom: 1px solid var(--c-border); }
.sm-label.sun-label { color: #c0392b; }
.sm-label.moon-label { color: #1a5c8a; }
.sun-letters { font-family: var(--font-arabic); direction: rtl; font-size: 16px; letter-spacing: 2px; line-height: 2; padding: 4px 8px; color: #c0392b; border-bottom: 1px solid var(--c-border); }
.moon-letters { font-family: var(--font-arabic); direction: rtl; font-size: 16px; letter-spacing: 2px; line-height: 2; padding: 4px 8px; color: #1a5c8a; }
.assimil { padding: 5px 8px; font-size: 8.5px; line-height: 1.7; border-top: 1px solid var(--c-border); }
.assimil-note { font-size: 8px; color: var(--c-label); }
.assimil-examples { display: flex; gap: 16px; margin-top: 3px; flex-wrap: wrap; }
.ex { display: flex; align-items: baseline; gap: 6px; }

/* geo prefixes */
.prefix-grid { display: grid; grid-template-columns: 1fr 1fr; }
.pcell { padding: 3px 7px; border-bottom: 1px solid var(--c-border); border-right: 1px solid var(--c-border); display: flex; align-items: baseline; gap: 6px; font-size: 9px; }
.pcell:nth-child(2n) { border-right: none; }
.pcell-ar { font-size: 15px; direction: rtl; }
.prom { color: var(--c-sign); font-weight: 600; min-width: 48px; }
.pmean { color: var(--c-muted); }

/* badges */
.badge { font-size: 6px; font-weight: 700; letter-spacing: 0.04em; border-radius: 2px; padding: 0 2px; line-height: 1.6; display: inline-block; color: #fff; margin-top: 1px; }
.fa { background: #1565c0; }
.mg { background: #b06000; }
.nc-badge { background: #7b6e5a; }

.footnote { font-size: 8px; color: var(--c-muted); border-top: 1px solid var(--c-border); padding: 4px 10px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; }
</style>
