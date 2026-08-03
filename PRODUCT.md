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
comprehension. Success is a user who can look at a Thai or Cyrillic sign and
read the toponym unaided, with the info panel switched to *None*.

## Positioning

Other resources treat the script as step one of learning the whole language.
Unillit treats the script as the entire goal, and organises everything around
recognition:

- Characters are grouped by **visual traits and similarity**, never by
  alphabetic order, meaning, role, or pronunciation.
- Reading tips are deliberately shorter than every competing resource, and
  strictly scoped to what changes a transliteration (reading direction, skipped
  vowels, letters out of order, per-language letterform differences).
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
  to **None** is the "training wheels off" step, and the product must always
  offer it.

## Capabilities and Constraints

- Vue 3 + TypeScript, Vite, vue-router. Supabase for Discord OAuth and stats.
  No state-management library — shared state is module-level refs.
- Scripts covered: **Thai** (live), **Cyrillic** and **Arabic** (beta),
  **Bengali**, **Greek**, **Lao** (planned, greyed out in the menu). Adding a
  script means registering a `ScriptConfig` with info tabs and practice tabs.
- Quiz modes: type-in (Levenshtein fuzzy matching with a user-set error
  tolerance), multiple choice, multi-select. Sampling includes a *revision* mode
  that favours unseen and previously missed questions.
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
