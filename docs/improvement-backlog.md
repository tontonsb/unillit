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
- [x] **Extract the hairline, plate white and measures to tokens.** `--hairline`,
  `--c-on-sign`, `--c-border-plate`, and `--measure-prose` / `--measure-wide` /
  `--w-quiz-control`. DESIGN.md's colour list gains Plate Ink and Plate Rule.
- [x] **Extract the spacing scale — step 1 of 3.** 154 values across 21 files resolve to
  eleven `--sp-*` tokens (`2 4 6 8 10 12 16 20 24 28 32`) at unchanged rendered values.
  Written in rem, chosen in px, like the type ramp, so spacing scales with the browser's
  font-size preference; the widths moved to rem for the same reason. Strays and the
  sheet register left literal for step 2. DESIGN.md's spacing sidecar rewritten from
  measured usage.

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
- [x] ✅ **✓/✗ icons in multiple choice.** Each choice has a fixed icon gutter, so
  answering adds ✓/✗ without shifting the labels.
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
- [x] **No `aria-live` anywhere.** A visually-hidden `role="status"` in QuizPanel
  announces the verdict, the answer and the hint, for all three quiz modes.
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
  derived from the dataset. (The double-Enter-burns-a-question issue was separate, and
  is now fixed by timing: an empty submit within 400ms of a new card is ignored, so a
  deliberate blank still works.)

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
- [ ] **22 type steps where far fewer would do.** The absolute ramp is one unit system
  in one file (§1), which makes the redundancy legible: **seven pairs of tokens sit
  0.2–0.4px apart** — 10/10.4, 11/11.2, 12.8/13, 14/14.4, 15/15.2, 17.6/18, 22/22.4.
  Nobody could name the difference in any pair, so by the Shrinking Scale Rule each is
  one step. Merging all seven takes 22 → 15 and touches only token values plus the call
  sites of the losing token.

  Beyond that the merges stop being mechanical and need per-register judgement:
  `--fs-9`/`--fs-micro` and `--fs-17`/`--fs-18` are 1px apart.

  The `em` system stays out of it and is the best-designed thing in the codebase —
  sheets scale as one unit off a clamped base, exactly right for a printable handout.
  **Leave it alone.** (Type only — the *spacing* in those registers is absolute, see
  "Spacing has no scale" below.)
- [x] **Tracking: 6 values → 2 tokens**, split by case rather than by value.
  `--tracking-caps` (0.07em, collapsing a 0.06/0.07/0.08 spread) for uppercase
  micro-labels; `--tracking-wide` (0.04em) for sentence case. The menu label's `0.01em`
  was dropped as below perception, and `letter-spacing: 0` stays literal as a reset.
- [ ] **HomeView is the highest-leverage single edit in this document.** Its script
  card is the sole consumer of three of the value-named tokens (`--fs-10-4`,
  `--fs-11-2`, `--fs-28`) *and* the worst opacity stacking — from one root cause: five
  typographic levels (28px glyph / 16px name / 12px meta / 11.2px countries / 10.4px
  "soon") crammed into a ~200px card. Size and colour were exhausted, so opacity became
  the next level. Fix the card's composition — merge or drop a level — and a chunk of
  both problems disappears at once, along with two of the seven sub-pixel pairs.

### Spacing has no scale

**230 literal margin/padding/gap values, 26 distinct steps, zero tokens in `:root`.**

#### The mess is localised, and the reference ramp already exists

Split by register, the disorder is not evenly spread. Uses-per-step is the tell:

| Group | Steps | Uses | per step | Values |
|---|---|---|---|---|
| **prose views** (Home/About/Privacy) | 6 | 19 | 3.2 | `4 12 16 20 28` (+one 3.2 stray) |
| **menu/nav** (MainMenu, ScriptPanel, FontPickers) | 8 | 25 | 3.1 | `2 4 6 8 10 12` (+`1`, `28`) |
| **prose.css** | 7 | 7 | 1.0 | round rem throughout; only `0.4rem` off-grid |
| quiz | 11 | 42 | 3.8 | `8`×18 dominant; `4 6 10 12 16 20`; strays `2 3 24 32` |
| tables (Stats, Runs, RunHistory, ScriptProgressList) | 12 | 50 | 4.2 | good spine `12 8 6 4`; carries `1 5×3 7×2 48` |
| **roadmap** (RoadmapGraph, Roadmap/Progress views) | 11 | 20 | 1.8 | `3 6 10 14 20 40` all ×1 — ad hoc |
| **reading-tips.css** | 12 | 24 | 2.0 | px **and** rem; owns 5 of the 6 off-grid values |

So the answer to "is the non-sheet side a mess" is **no, only two corners of it are.**
Menus and the prose views are disciplined and agree with each other; between them they
establish the ramp without anyone having to invent one:

> **`2 4 6 8 10 12 16 20 28 32`** — 2px resolution to 12, 4px to 20, 8px above.

Quiz and tables already sit on it apart from named strays. **`reading-tips.css` and the
roadmap group are the two files/areas that are genuinely ad hoc**, and they are what
"stats should eventually follow the scale" should mean: snap those two to the ramp
above, don't renegotiate the ramp.

#### Findings

- [x] **The declared scale is unimplemented and wrong.** Was `hair 2 / xs 4 / sm 8 /
  md 12 / lg 1.25rem / xl 2rem`, covering 132 of 230 uses while `6px`×17, `16px`×13 and
  `10px`×10 had no slot. The sidecar now lists the eleven measured steps that step 1
  extracted.
- [ ] **The two-bases residue in spacing — now purely a value question, not a unit one.**
  The off-grid pairs were `3px`/`0.2rem`(3.2) · `5px`/`0.3rem`(4.8) · `6px`/`0.4rem`(6.4)
  · `10px`/`0.6rem`(9.6) · `12px`/`0.8rem`(12.8) · `14px`/`0.9rem`(14.4). Step 1 settled
  the base — **the ramp is one rem set, written in rem and chosen in px** — so what
  remains is snapping each off-grid value to its ramp neighbour. Two survive in scope
  (`0.2rem` in AboutView, `0.4rem` in prose.css); the rest are in `reading-tips.css`,
  which step 1 left alone. Note the old instruction "keep the px neighbour" now means
  "keep the ramp step of that px name", not "author it in px".
- [ ] **The clamped registers spend fixed space.** `.sheet` and `.reading-tips` scale
  `font-size` with `clamp()` and set every margin, padding and gap absolutely. Sheet
  type runs 11→14px (+27%) against `padding: 10px` and cells at `3px 4px 2px`, fixed;
  reading tips 13→16px (+23%) against fixed rem. At 1440px the sheet sits on its 11px
  floor, at 1920px the type is 27% larger and the padding is unchanged — **the sheet
  reads tighter on the big monitor than on the laptop**, which inverts the intent.
- [ ] **Three sibling tables, three metrics.** `StatsPanel` and `RunsPanel` td
  `5px 12px`, `RunHistory` td `7px 12px`, `ScriptProgressList` `5px 8px`. `.runs-table`
  is the same class name in two files with different padding — a component, not a
  convention.
- [ ] **`.btn-primary` is redeclared in 7 scoped blocks**, all at `8px 20px`. Consistent
  today, unenforced.

#### Two sets ✅ (author)

The general ramp covers menus, buttons, prose, tables and stats, so those stay
consistent with each other. The **sheet register is deliberately separate, so that
sheet packing microsteps never leak into the scale offered for controls** — including
genuinely one-off sheet layouts (e.g. planned Arabic baseline alignment that has to fit
font rendering) which are not worth tokenising at all.

The general ramp is rem chosen in px, not px: every value in it is padding, a gap or a
margin around text, all of which should scale when a reader raises their default font
size. The contrast that matters is general-vs-sheet, not px-vs-rem.

**The sheet register should not get a px token set either.** Its 11 steps are `1 2 3 4 5 6 7 8 10` — every integer up to 8, which is the
absence of a scale rather than a granular one; tokenising `--sp-sheet-5` and
`--sp-sheet-7` would launder that into doctrine. Convert sheet spacing to `em` first
(previous finding), matching what its type already does. Then the granularity question
is about ratios against the glyph rather than pixels against nothing, and the one-offs
have no scale to leak into.

#### Sequence ✅ (author) — three steps, mirroring the font work

1. **Extract, collapse exact duplicates.** Done — see §1.
2. **Collapse near-neighbours.** The remaining off-grid values (snap to the ramp step of
   that px name), then `1→2`, `3→2 or 4`, `7→8` and the `5`/`7` table paddings —
   the last of which is the "Three sibling tables, three metrics" finding above, so do
   them together. Standalone.
3. **Rethink the ramp.** Best done *with* the type-ramp rethink above, since both are
   per-register judgement calls over the same registers, plus tracking (6 values) and
   line-height (6 values: `1`×10, `1.3`×5, `1.5`×3, `1.4`×2, `1.2`×2, `1.15`×2).

**Do not import a geometric ramp.** A ~2.2×-per-step ladder is built for prose pages;
60% of this product's space sits between 2px and 12px because the Handout Density and
Two Registers rules put it there, and no geometric ladder expresses `3px 4px 2px`.
Extra variety is acceptable here — the target is a discoverable scale, not a short one.

### Prose roles across pages

- [ ] **Logged-out Progress sits narrow and off the shared centre.** `main.app-main` is
  a flex *column*, so the article's width is its cross size, where `margin: 0 auto`
  suppresses the default stretch and leaves it fit-content — 252px when the page holds
  only a title and a login button. `width: 100%` fixes the centring but, under
  `content-box`, overflows by the gutters once the viewport is narrower than the cap, so
  it needs them folded into the cap. Deferred: Progress is a WIP page and not worth
  complicating `.prose` for.
- [ ] **Reading tips are a third prose register.** 13px clamped base, `h2` at 14.95px,
  `p + p` at 8px, against page prose's 14.4px / 17.6px / 12px, plus a Deep Ink `h3`
  where `.prose` uses Faded Ink. The Two Registers Rule is *chrome vs quiz* and requires
  both to share palette and type families, so it does not license this. Also still on
  raw rem spacing and its own `--measure-tips`.
- [ ] **`.prose blockquote` has no styling at all** — no border, indent or italic, so
  the quotation on Privacy is indistinguishable from a paragraph. Reading tips style
  theirs.

### Other literals worth tokenising

Adherence wins in the radius mould: the token exists (or obviously should), and naming
it is what stops the next edit inventing a neighbour.

**Do not ship a border-width palette** (`--border-light/base/thick`): besides
`--hairline` the only widths are one `2px` thead rule and one `3px` blockquote border,
both role-specific, and advertising three widths invites widths this system has
deliberately never had.

- [ ] **`transition: … 0.15s` ×19** across 10 declaration shapes, plus `0.2s` and
  `0.25s` singletons. Already noted under Omissions as low value for *easing*; the
  duration token is separately cheap and is what stops a `0.12s` appearing.

Deliberately excluded: `font-weight: 600`×28 (a CSS keyword with universal meaning, not
a scale) and the five `minmax()` cell minimums (`56 60 96 170 200px` — per-layout
geometry, correctly literal).

### Preserve — do not "improve" these
Radius discipline (2 tokens, held everywhere but 4 stray 3px) · the depth ladder being
explicit and actually followed · the Two Registers distinction surviving contact with
real code · `em`-relative sheet **type** scaling · `outline-offset: -2px` on edge-flush
controls · `autocomplete/autocorrect/spellcheck` off on the answer input · **no
`z-index` anywhere in the codebase** — stacking is pure document order, and the sticky
panel headers work without it.

Also holding on their own, and useful as the reference when snapping other areas:
menu/nav spacing (8 steps, 25 uses, a clean 2px ladder) and the prose views
(6 steps, 19 uses). These are what "follow the existing scale" points at.

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
