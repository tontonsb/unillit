# Unillit

## Overview

Teaches users to read (transliterate) a script without learning the language —
just recognize characters on a sign and read the toponym.

## Architecture

Vue 3 + TypeScript, Supabase backend (auth + stats). No state management library;
shared state lives in module-level refs (composables).

## Conventions

- No semicolons unless needed
- Split long arrays, argument lists, attribute lists over multiple lines
- Use semantic HTML, keep DOM depth minimal — use grid instead of layered flex divs
- Use tabs for indent. Or 4 spaces when tabs are not possible.
- Don't compress JS lines too close together, e.g. leave empty lines before a `return` unless it's the first statement.
- Extract components whenever it makes sense

### Comments and docs: don't narrate

A comment earns its place only when the code would otherwise read as a mistake — a
non-obvious constraint, a footgun, a decision someone would reasonably undo. A normal
choice needs no defence.

- Don't justify ordinary decisions (`<!-- a div, not a <nav> ... -->`), restate what
  the next line does, or narrate the history of a change ("changed X to Y because Z").
- In docs, write what is true now. When something is done, collapse it to the outcome
  and delete the superseded description.

## Tools

- Check types: `npm run type-check`
- Build: `npm run build`
- Style checks: `npm run lint:eslint` and `npm run lint:stylelint`

## Docs

`docs/audit-*.md` and `.impeccable/critique/*` are dated records of impeccable's audit and
critique sessions. `docs/improvement-backlog.md` collects the proposed solutions to their
findings and tracks which are done.

- Tick an audit finding once it's fixed, but never reword the audit.
- Tick a backlog item only when all of it is done, noting the outcome, not the steps.

## Fonts

Self-hosted via Fontsource, imported in `src/assets/fonts.ts`. Adding a picker font
means editing **both** that file and the relevant `src/scripts/{script}/font.ts`.

Fontsource names variable builds `'<Family> Variable'`; static packages keep the plain
name. **A name matching no `@font-face` falls back to a system font silently** — after
touching fonts, check every declared family appears in `document.fonts`.

Use the `wght` / `wght-italic` entrypoints, not `standard` / `wdth`.

---

## Script page layout

`ScriptView` renders two `ScriptPanel` components side-by-side (grid, collapses to rows on mobile).
Left panel = `infoTabs`, right panel = one `QuizShell` tab per entry in `datasets` (a single
`PracticePlaceholder` tab when there are none). Each panel has a tab bar; the active info tab
label is written to the global `activeInfoSheet` ref (used for stats context).

## Registering a script

Add a `ScriptConfig` entry to `src/scripts/scripts.ts`. What the interface doesn't say:

- `lang` is the BCP-47 tag of `nativeName`, not the script id (`und-Cyrl` for Cyrillic).
- `status: 'coming'` only hides the menu link; `/scripts/:id` still renders.
- The script's glyph font needs a `--font-{id}` token in `main.css` and its import in `fonts.ts`.

## Reading tips

Each script's info panel has a `ReadingTips.vue`. They share typography via
`src/assets/reading-tips.css` (scoped under `.reading-tips`, applied by putting
`class="reading-tips"` on the root `<article>`); only script-specific bits
(letterform fonts, term-card badges) live in each component's scoped `<style>`.

### Markdown blocks

Prose is authored inside `<Markdown wrap="section">…</Markdown>`. The
`plugins/markdown.ts` Vite transform runs **before** `@vitejs/plugin-vue`
(plugin order in `vite.config.ts`), so it string-replaces each block with
markdown-it output (`html: true`) directly into the SFC source, which Vue then
compiles as template. Consequences:
- Raw HTML works in the markdown (tables, `<figure>`, spans).
- **Vue components work too** — import them in `<script setup>` and use the tag
  inside the markdown (e.g. `<l-b ru uk />`). They must not contain a blank line
  (markdown-it would split the HTML block).
- Scoped styles still apply, because the injected HTML is part of the template.

### Language badges

`src/components/LangBadge.vue` (used as `<l-b ru uk be />`, one bare attribute
per language code) is the single source of truth for the language-tag palette
(D3 Category 20), full names (title tooltip), and badge styling. Add languages
to its `NAMES`/`ORDER` maps. Codes are **BCP-47** (ISO 639): use `kk ky tg rue`,
not the country codes `kz kg tj ry`. The same codes are used as `lang="…"`
attributes elsewhere to trigger OpenType `locl` substitutions, so they must stay
valid BCP-47.

### Text highlighting conventions

Applies to all reading-tips prose and tables:
- **Foreign script** (Cyrillic/Thai glyphs, toponyms): bare. Even when a letter
  is the subject being discussed — except inside the hard/soft-sign style lists,
  which keep **bold**.
- **Transliteration / romanised sound**: *italic*, inline and inside phrase
  table cells (e.g. `hard *d* + *u*`).
- **Table cells**: bare by default. Italicise transliteration only when it is
  part of longer phrase content in the cell; a cell that is just a rom token
  stays bare.
- **Established English exonyms / proper names / dataset names**: bare (Bangkok,
  Kalasin), or italic for dataset names (*Prefixed provinces*).
- **Literal sign characters** (`` `"` ``, `` `'` ``): backticks, so they stand
  out from surrounding punctuation.
- **Technical terms** on first mention: *italic* (*abugida*, *changwat*).
- **Glosses, scare quotes, letter nicknames**: "double quotes".

Callouts: a `> blockquote` is the prominent callout (accent border, italic) for
conversational asides or important scope notes; `<small>…</small>` is the
low-key muted side note for minor "by the way" remarks.
