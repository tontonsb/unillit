# Improvement backlog

Consolidated 2026-08-04 from: `docs/audit-2026-08-03.md`,
`.impeccable/critique/2026-08-03T21-16-06Z__src-views-scriptview-vue.md` (read its
**Corrections after author review** section — several findings were withdrawn or
downgraded), plus a microcopy/UI pass and a design-system critique that were
discussed in session but never written down.

Author-confirmed items are marked ✅. Unmarked items are proposals not yet ruled on.

---

## 1. Low-hanging fruit

- [x] ✅ **Quiz state resets on tab switch.** `v-show` on QuizPanel; STATS/RUNS keep
  `v-if` so they refetch on open.
- [x] ✅ **Empty `<h1>` on every script page.** The heading is conditional, and a
  `tabsLabel` prop names both tablists ("Cyrillic sheets" / "Cyrillic practice").
  The practice panel now has no heading at all.
- [x] ✅ **Warn before destroying a started run.** Native `confirm()` in QuizPanel,
  covering quiz mode, sampling mode and count. Deliberately not guarded: the practice
  tab bar, the main menu, page navigation, and share links applying prefs on load.
- [x] **Unlabelled form controls** — font `<select>` (both FontPickers) and the
  answer input (placeholder is not an accessible name). Also the count input.
- [x] **`border-radius: 3px`** in 4 places, outside the 2px/4px scale.
- [x] **Extract the font sizes to a palette.** 92 absolute declarations now resolve to
  23 `--fs-*` tokens in `main.css`, at unchanged sizes. Tokens are written in rem but
  chosen in px, so the chrome register keeps 1px resolution; `em` ratios and `clamp()`
  bases stay literal. Residue: DESIGN.md → "Open: the type ramp is extracted, not yet
  resolved".
- [x] **`prefers-reduced-motion`** — about five lines, and the valuable half of the
  motion item.

## 2. Quiz — the big cluster

The quiz panel is where the product is most generic. The sheets could belong to no
other product; the quiz could be swapped to chemistry formulae unchanged. ✅ Author
agrees this is worth investing product-specific design in.

- [ ] ✅ **Promote the hint after a wrong answer.** It is the moment of learning and
  currently the smallest, most muted thing on the card. Set its comparison glyphs at
  specimen size (32px+) in the active script font; rule it as a term row, not a caption.
  *Not* in scope: auto-navigating to the sheet cell — see §6.
- [ ] ✅ **List the missed characters on completion.** Currently the done screen shows
  only a score the user already knows from the tally. The misses are the one thing they
  cannot reconstruct, and for a logged-out user this app is the only place that
  information ever existed.
- [ ] ✅ **✓/✗ icons in multiple choice.** Correct/wrong are currently red-vs-green
  border and fill only, with no icon — while type-in mode has ✓/✗ and a strikethrough.
  Deuteranopia is ~5% of men and GeoGuessr's audience skews male.
- [ ] ✅ **Disabled pill with a tooltip when a mode is unavailable.** Consonants,
  Vowels and All vowels are `modes: ['typein']`, so the Type-in/Multiple-choice toggle
  vanishes with no explanation — including for a user following the site's own
  documented "jump in head first" strategy.
- [ ] ✅ **Confusable-by-design MC distractors.** Weight selection toward similar
  source length (±1 glyph) and shared leading syllables. The datasets already encode
  the confusion pairs — the hints name them. *Downgraded from the critique's original
  severity:* testing shows users do decipher the first character rather than
  eliminating by glyph count, so this is an improvement, not a defect.
- [ ] **The prompt glyph jumps on feedback.** `card-body` is `margin: auto`, so the
  card grows and the glyph moves 463px → 391px at the exact moment the user needs to
  compare it. Reserve the space.
- [ ] **No `aria-live` anywhere.** Submitting announces nothing; focus then lands on
  "Next". Wrap the feedback block in `role="status"`.
- [ ] **`[beta, set will change]`** renders on every one of 66 Cyrillic questions;
  the sidebar badge already carries this.
- [ ] **"Shuffled" vs "Random"** names nothing a user can decode. The real difference
  is all-questions vs N-with-replacement.
- [ ] **Copy results is unrefined.** Its purpose is real — comparing scores on Discord,
  since there are no social features and none are planned — but the emoji rank ladder
  (`🏔️ I'm at peak Thai literacy!`) is sillier than the rest of the product's voice,
  and the tiers exist only in the clipboard while the done screen shows a bare score.
  ✅ Worth a polish pass, explicitly not worth major investment.

### Do NOT do
- **Do not add a non-empty-input guard to single-character quizzes.** An empty answer
  is valid — Thai's อ ships `answer: ['o', '-', '']` and the Cyrillic hard/soft signs
  ship `rom: ['"', '']` / `["'", '']`. A guard would make correct answers
  unsubmittable. Only defensible on datasets whose answers are always multi-character,
  derived from the dataset. (The double-Enter-burns-a-question issue is separate and
  still real.)

## 3. Microcopy

- [ ] **The middle dot does four unrelated jobs.** 27 separator uses in live content
  (the 30 in `ArabicDotsGrid` are literal i'jām glyphs, not punctuation). Frequency is
  fine; role overload is the problem:
  1. alternation/OR — `rom: 'g · h'`
  2. clause boundary in hints — `'no head (vs ร) · same translit as ฐ'`
  3. title ⇢ sub-label in headings — `Universal core &nbsp;·&nbsp; uppercase / lowercase`
  4. list separator in footers — `U+0400–U+04FF (Slavic) · U+0500–U+052F`

  Job 2 is load-bearing and deserves its own mark: "here are the shape cues" and
  "here's what it collides with" are the two halves of every hint, a structural
  boundary rather than a list comma.
- [ ] **Rewrite the Thai alphabet legend.** `ThaiAlphabet.vue:139`:
  `Rom = RTGS initial · final in italics (when different · — = no final/silent)`
  Two `·` doing different jobs in one sentence, the second nested inside parentheses
  so the structure is ambiguous — and `—` appears as a *literal token* meaning "no
  final" in a panel where dashes are also punctuation. This is the legend for the
  densest sheet in the product.
- [ ] **Document the separator nesting.** `'w / ŭ · oʻ'` uses slash for variants
  within a language and dot across languages. Principled, stated nowhere.
- [ ] **Two spacing conventions:** `&nbsp;·&nbsp;` in headings vs bare ` · ` elsewhere.
- [ ] **Near-duplicate section notes** in `CyrillicFamiliarity.vue` — two notes sharing
  the same eleven-word opening ("Mostly the common core; a handful of
  extended-alphabet letters (badged)…").

## 4. Cards and containers

Not too many cards — one misapplication.

- [ ] **Demote the reading-tips metadata trio out of cards.** Thai has 2 `<dl>` groups
  / 12 term cards. Group 2 (9 cards, `นคร Nakhon / great city`) is a genuine glossary
  and the card is right. Group 1 (3 cards: Direction / Script type / Romanisation) is
  read once and never returned to, yet gets the heaviest non-plate treatment in the
  system — hairline **plus** Cell White fill **plus** serif Highway Green `dt`. Two
  rungs of the depth ladder for a colophon. A ruled strip or run-in caption would do.
- [ ] `HomeView`'s 7 script cards are fine — that is an index, cards are correct.

## 5. Design system — structural

See §"Omissions" below for why these are system gaps rather than discipline failures.

- [ ] ✅ **De-emphasis is done three ways and stacks multiplicatively.** Seven distinct
  opacity values (0.35/0.4/0.5/0.7/0.75/0.8/0.85) layered on top of `--c-muted` and on
  top of smaller sizes. On HomeView they compound because element opacity × card
  opacity:

  | element | effective | WCAG | APCA Lc |
  |---|---|---|---|
  | `card-countries`, live card | `#959c97` | 2.81:1 | +54.0 |
  | `card-countries`, beta card | `#aaafac` | 2.23:1 | +43.9 |
  | `card-meta`, coming-soon | `#b3b8b5` | 2.01:1 | +39.0 |
  | **`card-countries`, coming-soon** | **`#cacdcb`** | **1.60:1** | **+27.2** |
  | sidebar coming-soon label | `#b2b6b3` | 2.05:1 | +40.0 |

  Nobody chose 0.35 — it is the product of two independent reasonable choices.

  **The bug is compounding, not variety.** Standardising to "one or two opacity
  values" would not fix it: two standard values still multiply. And a first count
  mis-grouped `0.85 ×6`, which is *hover dimming on buttons*, not de-emphasis at all.

  **There are four distinct states, and they are not interchangeable** ✅ (author):
  "not written yet" and "written, works, deliberately quiet" carry different
  messages, and beta content is genuinely available to anyone interested enough.

  Recommended treatment — the depth ladder run backwards, using surfaces that already
  exist, with **no text dimming in any state**:

  | State | Treatment | card-name | card-meta |
  |---|---|---|---|
  | live | Cell White fill + border — *mounted* | 9.50:1 | 5.06:1 |
  | beta (works, quiet) | Warm Sheet fill + border — *flush* | 9.09:1 | 4.84:1 |
  | not written | transparent + dashed border — *empty slot* | — | — |
  | control locked pending an action | one opacity token, container level, never nested | — | — |

  Beta reads quieter because the card stops being *mounted*, not because its content
  got harder to read. If literal dimming is preferred for beta instead, the numbers
  say **0.85, not the current 0.75/0.8** — at 0.8 the meta line falls to Lc 61.6, at
  0.85 it holds Lc 65.0 — but 0.85 already means "hover" elsewhere, so it would collide.

  **Rules to add:** de-emphasis is a surface or token change, never an opacity change
  on text; opacity applies at one level only and never nests; each unavailable-ish
  state gets its own named token rather than an ad-hoc value.

### Omissions — missing rungs
- [ ] **The depth ladder was only ever described forwards** — hairline → fill → plate
  all bring things toward the reader, so when something needed to recede the system
  offered nothing and opacity got invented on the spot. **But the backward rung already
  exists and was simply never named:** Cell White on Warm Sheet is *mounted*; Warm
  Sheet fill is *flush*; `transparent` is *unmounted*. Recession is achieved by
  removing the mount, not by adding a darker surface. Name all three rungs in
  DESIGN.md and the ladder becomes bidirectional at zero cost — no new colour, no
  text dimming.
- [ ] **No categorical palette** — in a product whose thesis is categorising glyphs.
  DESIGN.md documents 18 colours (brand, status, feedback). The app needs 20 D3
  Category 20 values for `LangBadge` and 8 taxonomy tags / 24 hexes for `CharBadge`.
  Both reached outside the system; one grabbed Tailwind's defaults. **Biggest single
  gap.**
- [ ] **No token for "unavailable."** One semantic, four values: `pill-locked` 0.4,
  nav `coming-soon` 0.4, card `coming-soon` 0.5, `beta` 0.75/0.8.
- [ ] **Motion has durations but no easing** — three durations, zero easing tokens,
  everything on browser-default `ease`. *Honest value: low.* The 0.15s transitions are
  colour and border, where easing is perceptually irrelevant; only two places have
  geometric motion (sidebar width 0.2s, progress fill 0.25s). One token applied twice.
  Worth doing while already in those files, not worth a session of its own.
  `prefers-reduced-motion` is the valuable half and is listed under low-hanging fruit.
- [ ] **Status covers evaluation but not information.** `good/warn/bad` answers "how
  did I do"; nothing answers "here is a neutral note", so blockquotes spend Signal Teal
  on a routine job.

**Retracted — do not act on this.** An earlier pass claimed the ink ramp was one step
short and proposed a fourth, lighter ink below Faded. That is wrong twice over: a step
below Faded Ink lands around **Lc +55**, under the functional-text floor, so it would
codify the illegibility rather than fix it; and Faded's five "jobs" (metadata,
captions, inactive controls, placeholders, "never" values) are all the same weight, so
that is consistent use rather than overload. The real reason `card-countries` reached
for opacity is **compositional** — see the HomeView note below.

### Redundancies — too many steps
- [ ] **23 type steps where far fewer would do.** The absolute ramp is now one unit
  system in one file (§1), which makes the redundancy legible: **seven pairs of tokens
  sit 0.2–0.4px apart** — 10/10.4, 11/11.2, 12.8/13, 14/14.4, 15/15.2, 17.6/18,
  22/22.4. Nobody could name the difference in any pair, so by the Shrinking Scale
  Rule each is one step. Merging all seven takes 23 → 16 and touches only token values
  plus the call sites of the losing token.

  Beyond that the merges stop being mechanical and need per-register judgement:
  `--fs-9`/`--fs-micro` and `--fs-17`/`--fs-18` are 1px apart, and `--fs-display`
  (25.6px) versus `--fs-24` is one role — the page `h1` — at two sizes.

  The `em` system stays out of it and is the best-designed thing in the codebase —
  sheets scale as one unit off a clamped base, exactly right for a printable handout.
  **Leave it alone.**
- [ ] **Tracking: 6 values where 3 would do** — `0.06em`×7, `0.04em`×6, `0.08em`×2,
  `0`×2, plus singleton strays `0.07em` and `0.01em`.
- [ ] **HomeView is the highest-leverage single edit in this document.** Its script
  card is the sole consumer of three of the value-named tokens (`--fs-10-4`,
  `--fs-11-2`, `--fs-28`) *and* the worst opacity stacking — from one root cause: five
  typographic levels (28px glyph / 16px name / 12px meta / 11.2px countries / 10.4px
  "soon") crammed into a ~200px card. Size and colour were exhausted, so opacity became
  the next level. Fix the card's composition — merge or drop a level — and a chunk of
  both problems disappears at once, along with two of the seven sub-pixel pairs.

### Preserve — do not "improve" these
Radius discipline (2 tokens, held everywhere but 4 stray 3px) · the depth ladder being
explicit and actually followed · the Two Registers distinction surviving contact with
real code · `em`-relative sheet scaling · `outline-offset: -2px` on edge-flush controls
· `autocomplete/autocorrect/spellcheck` off on the answer input.

## 6. Explicitly rejected

- **Auto-navigating from a hint to the sheet cell.** The info panel exists to be looked
  things up *in*; the repeated searching is what produces the memorisation, and the
  sheets are ordered so a user learns the shape group first and the individual
  characters later. Auto-steering removes the exercise. Guided highlighting belongs in
  a possible "how to use this site" tutorial mode, never the primary flow.
- **Arranging the page around the *None* state.** *None* is the end goal but not where
  users are expected to spend time — by then they are close to not needing the app, and
  plain quizzes without a lookup are abundant elsewhere.
- **A legend for the shape sheet.** The badges are secondary metadata on a sheet whose
  job is shape grouping; they do not need explaining for the sheet to work. (The
  *legibility* issue — 6.6px badges, 4.95px legend on the Alphabet sheet — is separate
  and still open.)
- **Changing white-on-Signal-Teal.** Superseded by the two-system contrast table in
  DESIGN.md: WCAG 2.x mis-ranks this palette. White on teal is APCA Lc −72.8 (fine);
  black, which WCAG scores *higher*, is Lc +36.8 (unreadable).

## 7. Performance (from the audit, untouched since)

- [x] **13 render-blocking font stylesheets + 17 font files on every page** — fonts are
  self-hosted via Fontsource, listed in `src/assets/fonts.ts`. Home page: no
  render-blocking font stylesheets, 4 font files, FCP 136ms local. Nothing contacts
  Google any more, so **the Google Fonts paragraph on `/privacy` should be dropped**.
- [x] **All quiz datasets load on every route** — `QuizDatasetConfig` (eager metadata,
  so `scripts.ts` can still build the tab strip) plus a `load()` payload holding the
  questions, resolved by QuizShell. `/about` JS is 96 → 90.5 kB; the audit's 21 kB gzip
  figure counted a shared chunk that also carries vue-router.

## 8. Open questions, not yet decided

- **The type ramp** (DESIGN.md → "Open: the type ramp is extracted, not yet
  resolved"). Extraction is done; the seven sub-pixel merges above need no contentious
  decisions, and only what remains after them needs per-register judgement.
- **Sheet-conventions pass** — DESIGN.md licenses moving the stats table and
  reading-tips panels toward sheet typography (hairline rules, Mint Wash banding,
  uppercase micro-label headers, tight cell padding). Not started.
- **Alphabetical vs recognition ordering emphasis.** The Thai Alphabet sheet
  (traditional order) is tab 2; the recognition-ordered shape sheet is tab 3. Author
  noted this as worth revisiting. Related: the `MID`/`HIGH`/`LOW` badge column runs on
  all 44 consonants for tone class, which the reading tips themselves say is "not
  preserved in RTGS" — the noisiest column on the densest sheet, changing nothing about
  a transliteration.
- **Reading tips length.** Author will revisit content, *not* to compress into slogans.
  The benchmark is the ~200-page GeoGuessr community doc, not a 2,000-word article, so
  ~1,300 words is already radical condensation. The navigability findings are separate
  and stand: no index, and scroll position resetting to 0 on every info-tab switch
  (`:key="activeIndex"` forces a remount).
