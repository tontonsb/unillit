# Cyrillic info-sheet rework — execution plan

Goal: restructure the Cyrillic Alphabet sheet around the true universal core
(no per-language deletions anywhere), split letterform material into its own
tab, and add two new sheets (language-ID decision tree, flat all-letters
index). Build everything; the owner decides afterwards what stays.

Contents are draft-quality by design — get the structure right, reuse the
existing wording where it fits, and don't polish prose. Final tuning happens
in a later content pass.

## Ground rules

- Read `CLAUDE.md` first and follow it (tabs, no semicolons, split long
  arrays/attribute lists, semantic HTML, minimal DOM depth).
- All files live in `src/scripts/cyrillic/`. Tabs are registered in
  `src/scripts/scripts.ts` under the `cyrillic` entry's `infoTabs`.
- Use the shared sheet vocabulary (see `src/assets/sheet.css`), never
  re-invent it:
  - root `<article class="sheet">`, `<section>` per block, `h2` = green
    roadsign bar, `<p class="section-note">` for the note strip under it
  - `.char-grid.ruled` for bordered glyph grids; set the column width with
    a scoped `.char-grid { --cell-min: 88px }` (wider variants get an extra
    class, cf. `.char-grid.wide` in `CyrillicAlphabet.vue`)
  - `.cell` for glyph cells (flex column, centered — beware: raw inline
    text inside a `.cell` stacks per-chunk; use `display: block` overrides
    like `.note-cell` for prose cells)
  - `.rom` for romanisations, `.gloss` for muted notes, `.sheet footer`
    for the bottom strip
  - language badges: `<l-b ru uk />` (`src/components/LangBadge.vue`),
    one bare BCP-47 attribute per language; for dynamic lists use the
    `langAttrs()` helper pattern from `CyrillicAlphabet.vue`
- Existing eslint warnings in the cyrillic files are pre-existing; match
  the existing code patterns and don't chase warnings that the current
  code also produces.
- Verify with `npm run type-check`, `npm run lint:eslint`,
  `npm run lint:stylelint`, `npm run build`. The dev server usually runs
  on http://localhost:5173 (Playwright is in node_modules; browsers are
  the 1208 build — pass `executablePath` if the default errors).

## The linguistic model (data for all tasks)

**Universal core — 23 letters** present in every covered Cyrillic alphabet
(Russian, Ukrainian, Belarusian, Bulgarian, Serbian, Macedonian, and all
Russian-sphere non-Slavic ones):

> А Б В Г Д Е Ж З К Л М Н О П Р С Т У Ф Х Ц Ч Ш

Value-shift notes that belong with the core (not as separate letters):
- Г = *g*, but *h* in Ukrainian/Belarusian (and Rusyn)
- Е = *e* / *ye* depending on language and position (link to Reading tips)

**Iotation-and-signs pack — 10 letters** shared across the Russian/Bulgarian
sphere, with per-letter caveats:

| Letter | Rom | In | Caveats |
|---|---|---|---|
| И | i | all except be | = *y* in uk (uses І for *i*) |
| Й | y | ru uk be bg + CA | — |
| Щ | shch | ru uk bg + CA | *sht* in bg; be writes шч |
| Ъ | " | ru bg + some CA | silent separator in ru; a full vowel (*a*) in bg |
| Ы | y | ru be + CA | — |
| Ь | ' | all except sr/mk | — |
| Э | e | ru be + CA | — |
| Ю | yu | all except sr/mk | — |
| Я | ya | all except sr/mk | — |
| Ё | yo | ru be + kk ky mn tt ba… | usually written as Е in ru text |

**The one subtractive story** (single callout, replaces badge noise):
Serbian and Macedonian dropped this pack entirely (they keep only И) —
instead of iotation they use Ј plus dedicated letters Љ Њ Ђ Ћ Ѓ Ќ Џ Ѕ.

**Per-language additions** (now purely additive over core + pack; reuse
glosses and `langs` badge data from the current `extendedGroups`):
- Ukrainian: Ґ Є І Ї (romanisation KMU 2010; apostrophe replaces Ъ)
- Belarusian: І Ў
- Serbian: Ј Љ Њ Ђ Ћ Џ
- Macedonian: Ј Љ Њ Ѓ Ќ Ѕ Џ
- Central Asian shared: Қ Ғ Ң Ө Ү Ҳ
- Kazakh only: Ә Ұ І Һ
- Tajik only: Ӣ Ӯ Ҷ
- Bashkir: Ғ Ҙ Ҫ Ҡ Ң Һ Ә Ө Ү (three with BA locl forms)
- Abkhaz: keep the existing list
- Keep the existing "core-only & other alphabets" note (Russian, Bulgarian,
  Uzbek, Mongolian) but reword: Russian = core + the full pack + Ё Ы Э;
  Bulgarian = core + И Й Щ Ъ Ь Ю Я only.

Sanity checks the data must satisfy (each language = core + listed parts,
nothing removed): bg 23+7=30, ru 30+3=33, uk 23+6(И Й Щ Ь Ю Я)+4=33,
be 23+7(Й Ё Ы Ь Э Ю Я)+2=32, sr 23+1(И)+6=30, mk 23+1(И)+7=31.

## Task 1 — Restructure `CyrillicAlphabet.vue`

Replace the current two sections (`coreAlphabet` 33 letters + extended
groups) with three tiers:

1. **Universal core** section — the 23 letters, no badges (they're
   everywhere; that's the point). Section note: "work in every Cyrillic
   country". Put the Г/Е value-shift notes in cell glosses.
2. **Iotation & signs** section — the 10 pack letters with lang badges and
   caveat glosses from the table above. End the section with the
   Serbian/Macedonian callout as a full-width prose row (reuse the
   `.note-cell` pattern: `grid-column: 1 / -1; display: block`).
3. **Language additions** section — the existing grouped grid
   (`.group-label` rows), with groups updated per the list above.
   Ukrainian gains И-related note in its group note ("uses И for the
   y-sound, І for i").

Keep the footer. Keep `--cell-min: 88px`. The cursive / Bulgarian-forms /
Serbian-Macedonian-cursive sections move out (Task 2) — delete them here.

## Task 2 — New tab: `CyrillicLetterforms.vue`

Move, verbatim (markup, data arrays `cursive`, `bulgarian`, `serbianMac`,
`macOnly`, and their scoped styles `.forms`, `.pair`, `.cyr*`,
`.char-grid.wide`), the three letterform sections out of
`CyrillicAlphabet.vue` into a new sheet component:

- Cursive — italic letterforms (upright / cursive)
- Bulgarian forms (upright / cursive, BGR locl)
- Serbian / Macedonian cursive (upright / SR / MK, incl. mac-only grid)

Add a short intro `section-note` reminding that the font picker (top right
of the quiz panel) switches the letterform set. Register the tab in
`scripts.ts` as `{ label: 'Letterforms' }` between Alphabet and Familiarity.

## Task 3 — New sheet: language identification (`CyrillicWhichLanguage.vue`)

A small decision-tree/marker-letter sheet answering "which language am I
looking at" from a sign. Register as infoTab `Which language?` after
Familiarity. Two sections:

1. **Marker letters** — a ruled char-grid of unmistakable letters, each
   cell: glyph, the language it pins down (use `l-b`), tiny gloss.
   Draft data:
   - Ї Є Ґ → Ukrainian
   - Ў → Belarusian (also Uzbek Cyrillic — gloss the ambiguity;
     context disambiguates)
   - Ђ Ћ → Serbian; Ѓ Ќ Ѕ → Macedonian; Ј Љ Њ Џ → either
   - Ә Ұ Һ (with Қ) → Kazakh; Ҷ Ӣ Ӯ → Tajik; Ҙ Ҫ → Bashkir;
     Җ → Tatar; Ҩ Ҵ Ҽ → Abkhaz
2. **Decision tree** — nested list (semantic `<ol>`/`<ul>`, no custom
   flowchart component), roughly:
   - Ј anywhere → Serbian (Ђ/Ћ) vs Macedonian (Ѓ/Ќ/Ѕ)
   - Ъ common inside words (Търново) → Bulgarian
   - І present → Ї→Ukrainian; Ў→Belarusian; with Қ/Ә→Kazakh
   - Қ/Ғ/Ҳ → Central Asia: Ә Ұ Һ→Kazakh, Ҷ Ӣ Ӯ→Tajik, Ў→Uzbek
   - Ң Ө Ү without Қ → Kyrgyz; Ө Ү only → Mongolian
   - none of the above → likely Russian (or Bulgarian — check for Ы/Э/Ё
     which Bulgarian lacks)

   Content owner will refine the branches; structure > completeness.

## Task 4 — New sheet: all-letters index (`CyrillicIndex.vue`)

A single flat ruled char-grid of every glyph across all covered languages
(~65 cells), for scan-a-sign lookup. Register as infoTab `All letters`
(place directly after `Alphabet`).

- One cell per letter: glyph pair ("Г г"), all romanisations joined with
  `·` or `/` when languages disagree (e.g. `g · h`), lang badges only when
  the letter is NOT universal, gloss only for genuine traps (Ъ, И).
- Sort order: Russian alphabetical order as the spine, with derived/lookalike
  letters slotted after their base (…Г Ґ Ғ Ѓ Д Ђ Е Є Ё Ж Җ З Ѕ Ҙ И І Ї Й Ј
  К Қ Ҡ Ҟ Л Љ М Н Ң Њ О Ө П Р С Ҫ Т Ћ Ќ У Ў Ұ Ү Ф Х Ҳ Ц Ҵ Ч Ҷ Ҽ Џ Ш Щ Ъ Ы
  Ь Э Ю Я + remaining Abkhaz letters at their nearest base).
- Build the array by merging the data already present in
  `CyrillicAlphabet.vue`; it may be worth extracting the letter data into
  `src/scripts/cyrillic/letters.ts` and importing it from both sheets —
  do this if it falls out naturally, skip if it fights the tier structure.
- `--cell-min: 72px` is probably right; check it doesn't wrap badly.

## Task 5 (build last, lowest priority) — hub-and-petals figure

Optional schematic for the top of the Alphabet sheet: core circle (23) in
the center, petals per language group with their additions, one shared
petal for the Central Asian letters. Hand-authored inline SVG, theme
colors from CSS vars (`--c-accent`, `--c-alt`, `--c-border`), text must
stay legible at panel width. If it takes more than ~an hour or looks
cramped, stop and leave a note instead — the tier layout already encodes
the same information.

## Acceptance

- All four tabs render without console errors; tab order: Reading tips,
  Alphabet, All letters, Letterforms, Familiarity, Which language?, None.
- `CyrillicAlphabet.vue` contains no letterform sections and no deletions
  ("except in X" phrasing) — additive framing only.
- Each language's letters reconstruct correctly from core + pack + group
  (spot-check the counts listed above).
- type-check, eslint (no new warnings), stylelint, build all pass.
- Take screenshots of each tab (Playwright against the dev server) and
  eyeball: no exploded cells, badges in rows not columns, ruled grids
  aligned.
