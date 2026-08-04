# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: GeoGuessr players, studying — not playing.** They want to recognise a
script well enough to read a toponym off a street sign or map label during a
round. The intended use of Unillit is *practice between rounds*, so the reading
becomes their own skill. It is explicitly **not** a lookup aid to consult mid-game
— that would be cheating, and the product is not shaped to support it.

**Secondary: travellers and the script-curious.** People heading somewhere with
an unfamiliar script who want to parse station and street names, and people who
simply enjoy writing systems and want the script without committing to the
language. Served, but not the audience that settles design trade-offs.

## Product Purpose

Teach a person to *transliterate* an unfamiliar script into Latin characters —
to look at a sign and parse the characters into a name — without teaching them
the language. No pronunciation mastery, no vocabulary, no grammar, no
comprehension.

The end goal is reading a sign unaided. But **most of the product's value is
delivered before the user gets there**, while they are still learning — looking
things up, building familiarity, and gradually needing the sheet less. The
unaided state (info panel set to *None*) is the destination, not the place users
are expected to spend time; by the time they live there comfortably they are
close to not needing the app at all, and the internet already has plenty of
plain quizzes. Design for the learning phase first.

## Positioning

Other resources treat the script as step one of learning the whole language.
Unillit treats the script as the entire goal, and organises everything around
recognition:

- Characters are grouped by **visual traits and similarity** rather than by
  alphabetic order, meaning, role, or pronunciation. Recognition ordering is the
  organising principle and the differentiator; it is not an absolute ban on ever
  presenting a conventional ordering. A traditional-order sheet can earn its
  place as a secondary reference — the Thai Alphabet sheet does, and says so in
  its own heading.
- Reading tips are **radically shorter than the real alternatives**, and strictly
  scoped to what changes a transliteration (reading direction, skipped vowels,
  letters out of order, per-language letterform differences). The benchmark is
  not a 2,000-word article: it is the ~200-page "Learning to Read Thai for
  GeoGuessr" community doc (plus ~50 pages of appendices) and full
  learn-the-language courses. Against those, Thai's ~1,300 words is the whole
  point. Concepts still get however many words a total newcomer needs — the goal
  is brevity relative to the alternatives, never compressing the material into
  slogans that only make sense once you already know them.
- The lookup sheet and the practice quiz sit **side by side**, so recognition is
  built in one place rather than across a sheet you read and a drill you do later.

Aim: become the resource the GeoGuessr community points newcomers to for script
reading. Reach and credibility matter; content accuracy is what earns them.

## Operating Context

- **Primary scene: desktop, two panels side by side.** The `ScriptView` split
  (info sheet left, practice right) is the product's working surface and the
  scene design serves first. Mobile must work and must not regress, but it does
  not drive layout decisions.
- Sessions are self-directed study, not a fixed curriculum. Users swap back and
  forth between sheets, tips and quizzes; the site documents two entry
  strategies ("step in feet first" — tips → sheet → type-in quiz → *None*; and
  "jump in head first" — shape sheet → multiple choice → tips on demand).
- A per-script roadmap page suggests an order through the material; a progress
  page shows run history and freshness once logged in.
- Practice is deliberately gradable down to no support: switching the info panel
  to **None** is the "training wheels off" step, and the product should keep
  offering it — as an available end state, not as the screen the page is
  arranged around.
- **The info panel's job is to be looked things up in.** It teaches lookup
  itself, and aids memorisation through repeated searching: the sheets are
  ordered so a user first learns to recognise a general shape group, then
  gradually picks up the individual characters within it. Automatically steering
  the user to the right group would remove the exercise that produces the
  learning. Guided highlighting belongs in a possible "how to use this site"
  tutorial mode, never in the primary flow.

## Capabilities and Constraints

- Vue 3 + TypeScript, Vite, vue-router. Supabase for Discord OAuth and stats.
  No state-management library — shared state is module-level refs.
- Scripts covered: **Thai** (live), **Cyrillic** and **Arabic** (beta),
  **Bengali**, **Greek**, **Lao** (planned, greyed out in the menu). Adding a
  script means registering a `ScriptConfig` with info tabs and practice tabs.
- Quiz modes: type-in (Levenshtein fuzzy matching with a user-set error
  tolerance), multiple choice, multi-select. Sampling includes a *revision* mode
  that favours unseen and previously missed questions.
- **An empty answer is a valid answer.** Some characters transliterate to
  nothing — Thai's silent carrier อ already ships `answer: ['o', '-', '']`, and
  the Cyrillic hard and soft signs are the same case. Never add a
  non-empty-input guard to single-character quizzes; it would make correct
  answers unsubmittable. A minimum-length guard is only defensible on datasets
  whose answers are always multi-character (toponyms, syllables), and must be
  derived from the dataset rather than applied globally.
- **Result sharing exists to compare scores on Discord**, since the product has
  no social features and none are planned. It is a supplementary convenience,
  worth occasional polish, explicitly not worth significant investment. Its
  current emoji rank ladder is unrefined and sillier than the rest of the
  product's voice.
- Anonymous use is fully functional; login only adds stats, history and revision
  targeting.
- Terminology the product uses and explains: *abjad*, *abugida*, *alphabet*;
  *transliterate*; *info sheet*; *practice panel*; *reading tips*.
- Multi-script typography is a hard technical constraint: Noto family webfonts
  per script, plus per-script font pickers (Thai, Cyrillic) because letterforms
  differ enough between typefaces to change what a learner recognises. Cyrillic
  additionally needs valid BCP-47 `lang` attributes to trigger `locl`
  substitutions.

## Brand Commitments

- Name: **Unillit**. Voice: first-person, plain, self-deprecating and honest
  about limits ("I'm just learning most of these scripts myself"). Tagline:
  "Feel illiterate in a foreign script? Un-illiterate yourself!"
- Identity is roadsign-derived: highway-sign green as the load-bearing ink,
  quirky teal-green accent, mint borders and stripes, Lora for headings. The
  roadsign motif is a subtle hint, not a costume.
- Contact and issue reporting go through GitHub (`tontonsb/unillit`) and Discord
  (`@tontonsb`).

### Established decisions — changeable, but only with argument

These four are results of multiple iterations, not arbitrary defaults. None is
formally non-negotiable, but replacing one requires a stated alternative with
strong upsides — not "looks better", "more modern", or "closer to a convention":

1. Sheet and practice side by side, with *None* as the final step.
2. Anonymous by default — nothing stored until login, no analytics, no ads, no
   behaviour tracking.
3. Minimum prose, maximum lookup.
4. Recognition-ordered sheets.

## Evidence on Hand

- **Thai is finished content.** Alphabet sheet, shape identification, reading
  tips and the question sets (including prefixed provinces) were originally
  drafted with AI assistance but have since been **fully manually reviewed** —
  quiz explanations rewritten around key observables and overlapping
  transliterations, characters regrouped after checking multiple fonts. Treat
  Thai as trustworthy, reviewed content, not a draft.
- **The product itself is not beta.** Thai content was reviewed in v0.2 and again
  in v0.6, and v1.0 is tagged. Beta is a per-script status, never a site-wide
  disclaimer: **Cyrillic** and **Arabic** carry it while they are work in
  progress; the remaining scripts are placeholder or absent. Do not reintroduce
  blanket "this site is in beta" framing.
- `public/bulgarian-vs-russian-cyrillic.png` — letterform comparison asset.
- Honest provenance, and not to be dressed up: non-Thai script content is
  largely placeholder, and its WIP status is shown through the per-script badge.
  Sources are Wikipedia, docs, GeoGuessr-community resources and AI chatbots,
  with manual review as the step that makes content shippable.
- No testimonials, user counts, endorsements, benchmarks, pricing or partnership
  claims exist. Do not invent any.

## Product Principles

1. **Recognition over knowledge.** Every sheet, order and grouping answers "what
   does this character look like next to its neighbours", not "what does it mean".
2. **Practice is the point, not lookup.** The design must keep pushing the user
   toward reading unaided; anything that makes Unillit a better mid-game cheat
   sheet is off-strategy.
3. **Shorter than the alternatives.** Prose earns its place by changing a
   transliteration. When in doubt, cut it or move it into the sheet.
4. **Store nothing you don't need.** Anonymous is the full experience; logging in
   buys stats, nothing else.
5. **Be honest about maturity, per script.** Maturity is stated where it applies
   — a script that is work in progress wears the beta badge, placeholder is
   labelled placeholder — and reviewed content is presented with confidence
   rather than hedged.

## Accessibility & Inclusion

- WCAG AA text contrast is an established working constraint, already reasoned
  about in the token layer: the light accent green is reserved for fills, large
  text and non-text UI (focus rings, selection, 3:1), while the darker sign green
  carries anything that must be legible as text.
- Foreign-script glyphs are the content, so they must stay large, high-contrast
  and never conveyed by colour alone.
- No further product-specific accessibility standard has been established.
