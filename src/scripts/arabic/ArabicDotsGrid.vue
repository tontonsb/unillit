<template>
	<div class="sheet">

		<!-- CROSS-REFERENCE GRID -->
		<div class="section">
			<div class="section-title">Consonants — shape × dots cross-reference</div>
			<div class="section-note">
				Each row = base shape (ignoring dots), each column = dot count and position,
				<span style="background:var(--c-nc); padding:0 3px; border-radius:2px; color:#7b6e5a">tan = non-connecting</span>,
				empty cell = no letter with that combination,
				<span class="badge mg">MG</span> Maghrebi, <span class="badge fa">FA</span> Farsi/Dari/Pashto
			</div>
			<div class="table-scroll">
				<table class="gtable">
					<thead>
						<tr>
							<th class="corner">shape ↓ &nbsp; dots →</th>
							<th class="ch"><div class="dp"><div class="dp-a">···</div><div class="dp-line"></div><div class="dp-b dp-empty">·</div></div><div class="ch-lbl">3 above</div></th>
							<th class="ch"><div class="dp"><div class="dp-a">· ·</div><div class="dp-line"></div><div class="dp-b dp-empty">·</div></div><div class="ch-lbl">2 above</div></th>
							<th class="ch"><div class="dp"><div class="dp-a">·</div><div class="dp-line"></div><div class="dp-b dp-empty">·</div></div><div class="ch-lbl">1 above</div></th>
							<th class="ch"><div class="dp"><div class="dp-a dp-empty">·</div><div class="dp-line"></div><div class="dp-b dp-empty">·</div></div><div class="ch-lbl">no mark</div></th>
							<th class="ch"><div class="dp"><div class="dp-a dp-empty">·</div><div class="dp-line"></div><div class="dp-b">·</div></div><div class="ch-lbl">1 below</div></th>
							<th class="ch"><div class="dp"><div class="dp-a dp-empty">·</div><div class="dp-line"></div><div class="dp-b">· ·</div></div><div class="ch-lbl">2 below</div></th>
							<th class="ch"><div class="dp"><div class="dp-a dp-empty">·</div><div class="dp-line"></div><div class="dp-b">···</div></div><div class="ch-lbl">3 below</div></th>
							<th class="ch"><div class="ch-hamza">ء</div><div class="ch-lbl">hamza / special</div></th>
						</tr>
					</thead>
					<tbody>
						<!-- ba / tooth -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ب</span><div class="rh-t"><span class="rh-n">bowl</span><span class="rh-d">small tick</span></div></div></th>
							<td><div class="lc"><span class="lg">ث</span><span class="lr">th</span><span class="ln">tha</span></div></td>
							<td><div class="lc"><span class="lg">ت</span><span class="lr">t</span><span class="ln">ta</span></div></td>
							<td><div class="lc"><span class="lg">ن</span><span class="lr">n</span><span class="ln">nun †</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ب</span><span class="lr">b</span><span class="ln">ba</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">پ</span><span class="lr">p</span><span class="ln">pa</span><span class="badge fa">FA</span></div></td>
							<td class="e"></td>
						</tr>
						<!-- fa / round head -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ف</span><div class="rh-t"><span class="rh-n">loop</span><span class="rh-d"></span></div></div></th>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ق</span><span class="lr">q</span><span class="ln">qaf</span></div></td>
							<td>
								<div class="lc2">
									<div class="s"><span class="lg">ف</span><span class="lr">f</span><span class="ln">fa</span></div>
									<div class="hr"></div>
									<div class="s"><span class="lg">ڧ</span><span class="lr">q !</span><span class="ln">qaf</span><span class="badge mg">MG</span></div>
								</div>
							</td>
							<td class="nc"><div class="lc"><span class="lg">و</span><span class="lr">w / ū</span><span class="ln">waw</span><span class="badge ncb">non-conn</span></div></td>
							<td><div class="lc"><span class="lg">ڢ</span><span class="lr">f</span><span class="ln">fa</span><span class="badge mg">MG</span></div></td>
							<td class="e"></td><td class="e"></td>
							<td class="nc"><div class="lc"><span class="lg">ؤ</span><span class="lr">ʾ</span><span class="ln">waw + hamza</span></div></td>
						</tr>
						<!-- jim / hook -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ح</span><div class="rh-t"><span class="rh-n">hook</span><span class="rh-d"></span></div></div></th>
							<td class="e"></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">خ</span><span class="lr">kh</span><span class="ln">kha</span></div></td>
							<td><div class="lc"><span class="lg">ح</span><span class="lr">ḥ</span><span class="ln">ha</span></div></td>
							<td><div class="lc"><span class="lg">ج</span><span class="lr">j</span><span class="ln">jim</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">چ</span><span class="lr">ch</span><span class="ln">che</span><span class="badge fa">FA</span></div></td>
							<td class="e"></td>
						</tr>
						<!-- dal / wedge -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">د</span><div class="rh-t"><span class="rh-n">dal / wedge</span><span class="rh-d">short angular</span><span class="rh-nc">non-conn</span></div></div></th>
							<td class="e"></td>
							<td class="e"></td>
							<td class="nc"><div class="lc"><span class="lg">ذ</span><span class="lr">dh</span><span class="ln">dhal</span></div></td>
							<td class="nc"><div class="lc"><span class="lg">د</span><span class="lr">d</span><span class="ln">dal</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- ra / curved tail -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ر</span><div class="rh-t"><span class="rh-n">ra / curved tail</span><span class="rh-d">drops below baseline</span><span class="rh-nc">non-conn</span></div></div></th>
							<td class="nc"><div class="lc"><span class="lg">ژ</span><span class="lr">zh</span><span class="ln">zhe</span><span class="badge fa">FA</span></div></td>
							<td class="e"></td>
							<td class="nc"><div class="lc"><span class="lg">ز</span><span class="lr">z</span><span class="ln">zay</span></div></td>
							<td class="nc"><div class="lc"><span class="lg">ر</span><span class="lr">r</span><span class="ln">ra</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- sin / wave -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">س</span><div class="rh-t"><span class="rh-n">sin / wave</span><span class="rh-d">3 humps = shape, not dots</span></div></div></th>
							<td><div class="lc"><span class="lg">ش</span><span class="lr">sh</span><span class="ln">shin</span></div></td>
							<td class="e"></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">س</span><span class="lr">s</span><span class="ln">sin</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- sad -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ص</span><div class="rh-t"><span class="rh-n">sad</span><span class="rh-d">round blob + tooth</span></div></div></th>
							<td class="e"></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ض</span><span class="lr">ḍ</span><span class="ln">dad</span></div></td>
							<td><div class="lc"><span class="lg">ص</span><span class="lr">ṣ</span><span class="ln">sad</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- ṭa -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ط</span><div class="rh-t"><span class="rh-n">ṭa</span><span class="rh-d">loop + tall stroke</span></div></div></th>
							<td class="e"></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ظ</span><span class="lr">ẓ</span><span class="ln">dha</span></div></td>
							<td><div class="lc"><span class="lg">ط</span><span class="lr">ṭ</span><span class="ln">ṭa</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- ʿayn / eye -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ع</span><div class="rh-t"><span class="rh-n">ʿayn / eye</span><span class="rh-d">pinched loop</span></div></div></th>
							<td class="e"></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">غ</span><span class="lr">gh</span><span class="ln">ghayn</span></div></td>
							<td><div class="lc"><span class="lg">ع</span><span class="lr">ʿ</span><span class="ln">ʿayn</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- kaf -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ك</span><div class="rh-t"><span class="rh-n">kaf</span><span class="rh-d">angular + inner mark</span></div></div></th>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td>
								<div class="lc2">
									<div class="s"><span class="lg">ك</span><span class="lr">k</span><span class="ln">kaf</span></div>
									<div class="hr"></div>
									<div class="s"><span class="lg">گ</span><span class="lr">g</span><span class="ln">gaf †</span><span class="badge fa">FA</span></div>
								</div>
							</td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- lam -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ل</span><div class="rh-t"><span class="rh-n">lam</span><span class="rh-d">tall ascending stroke</span></div></div></th>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td><div class="lc"><span class="lg">ل</span><span class="lr">l</span><span class="ln">lam</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- mim -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">م</span><div class="rh-t"><span class="rh-n">mim</span><span class="rh-d">circle + tail</span></div></div></th>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td><div class="lc"><span class="lg">م</span><span class="lr">m</span><span class="ln">mim</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- ha / four-lobed -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ه</span><div class="rh-t"><span class="rh-n">ha / four-lobed</span><span class="rh-d">changes shape medially</span></div></div></th>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ة</span><span class="lr">h / t</span><span class="ln">tā marbūṭa ‡</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ه</span><span class="lr">h</span><span class="ln">ha</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td><td class="e"></td>
						</tr>
						<!-- ya -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ي</span><div class="rh-t"><span class="rh-n">ya / long tooth</span><span class="rh-d">sweeping final tail</span></div></div></th>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td><div class="lc"><span class="lg">ى</span><span class="lr">ā / a</span><span class="ln">alif maqṣūra</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ي</span><span class="lr">y / ī</span><span class="ln">ya</span></div></td>
							<td class="e"></td>
							<td><div class="lc"><span class="lg">ئ</span><span class="lr">ʾ</span><span class="ln">ya + hamza</span></div></td>
						</tr>
						<!-- alif -->
						<tr>
							<th class="rh"><div class="rh-in"><span class="rh-g">ا</span><div class="rh-t"><span class="rh-n">alif</span><span class="rh-d">tall stroke</span><span class="rh-nc">non-conn</span></div></div></th>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td class="nc"><div class="lc"><span class="lg">ا</span><span class="lr">ā / a</span><span class="ln">alif</span></div></td>
							<td class="e"></td><td class="e"></td><td class="e"></td>
							<td>
								<div class="lc4">
									<div class="s"><span class="lg">أ</span><span class="lr">ʾa/ʾu</span><span class="ln">hamza ↑</span></div>
									<div class="hr"></div>
									<div class="s"><span class="lg">إ</span><span class="lr">ʾi</span><span class="ln">hamza ↓</span></div>
									<div class="hr"></div>
									<div class="s"><span class="lg">آ</span><span class="lr">ʾā</span><span class="ln">maddah</span></div>
									<div class="hr"></div>
									<div class="s"><span class="lg">ء</span><span class="lr">ʾ</span><span class="ln">alone</span></div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-note">
				<strong>†</strong> Nun ن — isolated looks like a bowl; medially ـنـ it is a tooth like ب ت ث.
				<strong>†</strong> Gaf گ — kaf + added stroke (not a dot); no separate dot column.
				<strong>‡</strong> Tā marbūṭa ة — word-final only; romanised <em>h</em> in pause, <em>t</em> in construct (Madīnat al-Nūr).
				<strong>Maghrebi swap:</strong> in North Africa <span class="ar">ف</span>-shape + 1 dot above = <em>q</em> (not f); the f-sound uses 1 dot below.
			</div>
		</div>

		<!-- DIACRITICS -->
		<div class="section">
			<div class="section-title">Diacritics (vowel marks)</div>
			<div class="section-note">Omitted in most text — Quran, children's books, dictionaries only.</div>
			<div class="dgrid">
				<div class="dcell"><span class="dglyph">بَ</span><div class="dtext"><strong>fatḥa ◌َ</strong>short <em>a</em></div></div>
				<div class="dcell"><span class="dglyph">بِ</span><div class="dtext"><strong>kasra ◌ِ</strong>short <em>i</em></div></div>
				<div class="dcell"><span class="dglyph">بُ</span><div class="dtext"><strong>ḍamma ◌ُ</strong>short <em>u</em></div></div>
				<div class="dcell"><span class="dglyph">بّ</span><div class="dtext"><strong>shadda ◌ّ</strong>doubled consonant</div></div>
				<div class="dcell"><span class="dglyph">بْ</span><div class="dtext"><strong>sukūn ◌ْ</strong>no vowel follows</div></div>
				<div class="dcell"><span class="dglyph">بً</span><div class="dtext"><strong>tanwīn ◌ً</strong><em>-an</em> nunation</div></div>
			</div>
			<div class="table-note">Long vowels written with letters: ا = ā, و = ū, ي = ī</div>
		</div>

		<!-- SUN / MOON -->
		<div class="section">
			<div class="section-title">The definite article الـ</div>
			<div class="sun-moon-grid">
				<div class="sun-side">
					<div class="sm-label sun">☀ Sun letters — al- assimilates</div>
					<div class="sm-letters sun">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</div>
				</div>
				<div class="moon-side">
					<div class="sm-label moon">◑ Moon letters — al- stays</div>
					<div class="sm-letters moon">ب ج ح خ ع غ ف ق ك م ه و ي + ا</div>
				</div>
			</div>
			<div class="sm-ex">
				<span><span class="ar-ex">النِّيل</span> <em>an-Nīl</em> (ن sun)</span>
				<span><span class="ar-ex">الشَّمْس</span> <em>ash-shams</em> (ش sun)</span>
				<span><span class="ar-ex">القَاهِرَة</span> <em>al-Qāhira</em> (ق moon)</span>
				<span><span class="ar-ex">الجَبَل</span> <em>al-Jabal</em> (ج moon)</span>
			</div>
		</div>

		<!-- GEO PREFIXES -->
		<div class="section">
			<div class="section-title">Common geographic elements</div>
			<div class="prefix-grid">
				<div class="pcell"><span class="par">جَبَل</span><span class="prom">Jabal</span><span class="pmean">mountain</span></div>
				<div class="pcell"><span class="par">وَادِي</span><span class="prom">Wādī</span><span class="pmean">valley · seasonal riverbed</span></div>
				<div class="pcell"><span class="par">نَهْر</span><span class="prom">Nahr</span><span class="pmean">river (perennial)</span></div>
				<div class="pcell"><span class="par">بَحْر</span><span class="prom">Baḥr</span><span class="pmean">sea · large lake</span></div>
				<div class="pcell"><span class="par">خَلِيج</span><span class="prom">Khalīj</span><span class="pmean">gulf · bay</span></div>
				<div class="pcell"><span class="par">رَأْس</span><span class="prom">Raʾs</span><span class="pmean">cape · headland</span></div>
				<div class="pcell"><span class="par">عَيْن</span><span class="prom">ʿAyn</span><span class="pmean">spring · well (lit. eye)</span></div>
				<div class="pcell"><span class="par">بِئْر</span><span class="prom">Biʾr</span><span class="pmean">well (dug)</span></div>
				<div class="pcell"><span class="par">مَدِينَة</span><span class="prom">Madīna</span><span class="pmean">city</span></div>
				<div class="pcell"><span class="par">قَرْيَة</span><span class="prom">Qarya</span><span class="pmean">village</span></div>
				<div class="pcell"><span class="par">أَبُو</span><span class="prom">Abū</span><span class="pmean">father of (common toponym element)</span></div>
				<div class="pcell"><span class="par">بَنِي</span><span class="prom">Banī</span><span class="pmean">sons of (tribal place names)</span></div>
				<div class="pcell"><span class="par">دَار</span><span class="prom">Dār</span><span class="pmean">house · land · region (Darfur = Dār Fūr)</span></div>
				<div class="pcell"><span class="par">بَاب</span><span class="prom">Bāb</span><span class="pmean">gate · strait (Bab-el-Mandeb)</span></div>
				<div class="pcell"><span class="par">أَرْض</span><span class="prom">Arḍ</span><span class="pmean">land · earth</span></div>
				<div class="pcell"><span class="par">صَحْرَاء</span><span class="prom">Ṣaḥrāʾ</span><span class="pmean">desert · the Sahara</span></div>
			</div>
		</div>

		<div class="footnote">
			<span>Romanisation: <abbr title="BGN/PCGN 1956; diacritics on ḥ ṣ ḍ ṭ ẓ mark emphatic consonants">BGN/PCGN 1956</abbr>, ʿ = ʿayn, <span class="badge fa">FA</span> Farsi/Dari/Pashto, <span class="badge mg">MG</span> Maghrebi variant</span>
			<span>Arabic Unicode: U+0600–U+06FF, Extended: U+0750–U+077F</span>
		</div>

	</div>
</template>

<style scoped>
:root { --c-nc: #fefcf5; }

.sheet {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 11px;
}

.section {
  border: 1px solid var(--c-border);
  border-radius: 4px;
  overflow: hidden;
}

.section-title {
  background: var(--c-head);
  color: #fff;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 7px;
}

.section-note {
  font-size: 8.5px;
  color: var(--c-muted);
  padding: 3px 7px 2px;
  background: var(--c-alt);
  border-bottom: 1px solid var(--c-border);
}

.table-note {
  padding: 3px 8px 4px;
  font-size: 8px;
  color: var(--c-muted);
  background: var(--c-alt);
  border-top: 1px solid var(--c-border);
}

.table-scroll { overflow-x: auto; }

/* grid table */
.gtable {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.gtable .corner {
  background: var(--c-alt);
  border: 1px solid var(--c-border);
  font-size: 7.5px;
  color: var(--c-muted);
  padding: 4px 6px;
  vertical-align: bottom;
  text-align: center;
  width: 88px;
}

.gtable .ch {
  background: var(--c-alt);
  border: 1px solid var(--c-border);
  padding: 4px 2px 3px;
  text-align: center;
  vertical-align: bottom;
}
.dp { display: flex; flex-direction: column; align-items: center; gap: 0; margin-bottom: 2px; }

.dp-a, .dp-b {
  font-size: 10px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  color: var(--c-head);
  min-width: 26px;
}

.dp-line { width: 22px; height: 1px; background: var(--c-border); margin: 1px 0; }
.dp-empty { visibility: hidden; }
.ch-lbl { font-size: 7px; color: var(--c-muted); white-space: nowrap; }
.ch-hamza { font-family: var(--font-arabic); font-size: 16px; direction: rtl; color: var(--c-head); line-height: 1; margin-bottom: 2px; }

.gtable .rh {
  background: var(--c-alt);
  border: 1px solid var(--c-border);
  padding: 3px 5px;
  text-align: left;
}

.rh-in { display: flex; align-items: center; gap: 5px; }
.rh-g { font-family: var(--font-arabic); font-size: 22px; direction: rtl; line-height: 1; min-width: 24px; text-align: center; }
.rh-t { display: flex; flex-direction: column; }
.rh-n { font-size: 8px; font-weight: 600; color: var(--c-label); white-space: nowrap; }
.rh-d { font-size: 7px; color: var(--c-muted); white-space: nowrap; }
.rh-nc { display: inline-block; font-size: 6px; font-weight: 700; color: #7b6e5a; background: #fefcf5; border-radius: 2px; padding: 0 2px; margin-top: 1px; }

.gtable td {
  border: 1px solid var(--c-border);
  padding: 2px;
  text-align: center;
  vertical-align: middle;
  background: var(--c-cell);
}

.gtable td.e  { background: var(--c-alt); }
.gtable td.nc { background: #fefcf5; }
.lc { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 2px; }
.lg { font-family: var(--font-arabic); font-size: 20px; direction: rtl; line-height: 1.2; }
.lr { font-size: 8.5px; color: var(--c-sign); font-weight: 700; }
.ln { font-size: 7px; color: var(--c-muted); white-space: nowrap; }
.lc2 { display: flex; flex-direction: column; align-items: center; }
.lc2 .s { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 2px; }
.lc2 .hr { width: 80%; height: 1px; background: var(--c-border); }
.lc4 .hr { width: 80%; height: 1px; background: var(--c-border); }
.lc4 .s { display: flex; flex-direction: column; align-items: center; gap: 0; padding: 1px 2px; }
.lc4 .lg { font-size: 17px; }
.lc4 .lr { font-size: 7.5px; }
.lc4 .ln { font-size: 6.5px; }
.ar { font-family: var(--font-arabic); direction: rtl; }

/* badges */
.badge {
  font-size: 6px; font-weight: 700; letter-spacing: 0.03em;
  border-radius: 2px; padding: 0 2px; line-height: 1.6;
  display: inline-block; color: #fff; margin-top: 1px;
}

.fa  { background: #1565c0; }
.mg  { background: #b06000; }
.ncb { background: #7b6e5a; }

/* diacritics */
.dgrid { display: grid; grid-template-columns: repeat(3, 1fr); }

.dcell {
  padding: 4px 5px;
  border-right: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dcell:nth-child(3n) { border-right: none; }
.dcell:nth-last-child(-n+3) { border-bottom: none; }
.dglyph { font-family: var(--font-arabic); font-size: 26px; direction: rtl; min-width: 32px; text-align: center; }
.dtext { font-size: 8px; line-height: 1.5; }
.dtext strong { display: block; font-size: 9px; color: var(--c-head); }

/* sun / moon */
.sun-moon-grid { display: grid; grid-template-columns: 1fr 1fr; }
.sun-side { border-right: 1px solid var(--c-border); }
.sm-label { font-size: 8px; font-weight: 600; padding: 2px 8px; background: var(--c-alt); border-bottom: 1px solid var(--c-border); }
.sm-label.sun { color: #c0392b; }
.sm-label.moon { color: #1a5c8a; }
.sm-letters { font-family: var(--font-arabic); direction: rtl; font-size: 15px; letter-spacing: 2px; line-height: 2; padding: 3px 8px; }
.sm-letters.sun { color: #c0392b; border-bottom: none; }
.sm-letters.moon { color: #1a5c8a; }
.sm-ex { padding: 4px 8px; font-size: 8.5px; display: flex; gap: 14px; flex-wrap: wrap; border-top: 1px solid var(--c-border); }
.sm-ex span { display: flex; align-items: baseline; gap: 5px; }
.ar-ex { font-family: var(--font-arabic); font-size: 14px; direction: rtl; }

/* geo prefixes */
.prefix-grid { display: grid; grid-template-columns: 1fr 1fr; }

.pcell {
  padding: 3px 7px;
  border-bottom: 1px solid var(--c-border);
  border-right: 1px solid var(--c-border);
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 9px;
}
.pcell:nth-child(2n) { border-right: none; }
.pcell:last-child, .pcell:nth-last-child(2):nth-child(odd) { border-bottom: none; }
.par { font-family: var(--font-arabic); font-size: 14px; direction: rtl; }
.prom { color: var(--c-sign); font-weight: 600; min-width: 46px; }
.pmean { color: var(--c-muted); }

.footnote {
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
