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

## Tools

- Check types: `npm run type-check`
- Build: `npm run build`
- Style checks: `npm run lint:eslint` and `npm run lint:stylelint`

## Fonts

Self-hosted via Fontsource — nothing is fetched from Google at runtime. Every family
is imported in `src/assets/fonts.ts`; adding a picker font means editing **both** that
file and the relevant `src/scripts/{script}/font.ts`.

Fontsource names its variable builds `'<Family> Variable'` (e.g. `'Lora Variable'`);
static packages keep the plain name. **A family name that matches no `@font-face` falls
back to a system font silently**, so after touching fonts, check in the browser that
every declared family shows up in `document.fonts`.

Use the `wght` / `wght-italic` entrypoints, not `standard` / `wdth` — the latter carry
a width axis this design never varies.

## Known issues

If npm is not available, I've forgotten to launch it. Just ask for it and I'll resume Claude with npm launched.

---

## Routing

| Path | View | Notes |
|---|---|---|
| `/` | `HomeView` | landing |
| `/scripts/:id` | `ScriptView` | two-panel split: info left, practice right |
| `/history` | `HistoryView` | all-script run history |
| `/about` | `AboutView` | |

## Script page layout

`ScriptView` renders two `ScriptPanel` components side-by-side (grid, collapses to rows on mobile).
Left panel = `infoTabs`, right panel = `practiceTabs`. Each panel has a tab bar; the active info tab
label is written to the global `activeInfoSheet` ref (used for stats context).

## Registering a script

Add a `ScriptConfig` entry to `src/scripts/scripts.ts`. Key fields:

```ts
{
  id: 'foo',          // used in route and stats
  name: 'Foo',
  nativeName: 'ፉ',
  abbr: 'ፉ',          // single char for collapsed menu; defaults to nativeName[0]
  meta: 'Alphabet · left → right · N letters',
  countries: 'Country A · Country B',
  comingSoon: true,   // hides from practice, shows in menu greyed out
  infoTabs: [...],
  practiceTabs: [...],
  infoHeaderEnd: FontPickerComponent,  // optional slot at end of info panel header
}
```

Practice tabs for a script with a quiz: use `QuizShell` as the component, pass `{ dataset, scriptId, promptClass, promptFontFamily }` as props.

## Quiz system

### Data model (`src/components/quiz/dataset.ts`)

```ts
type QuizMode = 'typein' | 'multiplechoice'

interface Question {
  prompt: string        // the foreign-script string shown to user
  answer: string | string[]  // accepted romanisation(s); first is canonical
  hint?: string         // shown after answering
}

interface QuizDataset {
  label: string
  questions: Question[]
  maxTolerance?: number   // max Levenshtein errors allowed in typein mode
  instructions?: string   // shown above input in typein mode
  modes?: QuizMode[]      // defaults to ['typein'] if omitted
}
```

### Component tree

```
QuizShell           ← tabs: quiz | stats | runs
  QuizPanel         ← toolbar (mode + sampling), progress bar, card
    TypeInQuiz      ← text input, Levenshtein fuzzy matching, tolerance slider
    MultipleChoiceQuiz  ← up to 5 choices drawn from session distractors
  StatsPanel        ← per-question accuracy table (fetches from Supabase)
  RunsPanel         ← run history list (fetches from Supabase)
```

### Session lifecycle (`src/components/quiz/useSession.ts`)

Phase state machine: `question → answered → (next question | done)`.
`startSession(count)`: shuffles questions; if count is set, samples with replacement.
Sampling mode and preferred quiz mode are persisted to `localStorage` via `useQuizPrefs`.

### Adding a new quiz mode

1. Add the mode name to `QuizMode` in `dataset.ts`
2. Create a `FooQuiz.vue` component that emits `answer(correct: boolean, errors?: number)`
3. Wire it in `QuizPanel.vue` (mode toggle pill label + `v-if` render)
4. Opt datasets in via `modes: ['typein', 'multiplechoice', 'foo']`

## Stats (Supabase)

Auth: Discord OAuth via `useAuth()` composable. Stats are only written when a user is logged in.

Tables: `quiz_runs`, `quiz_answers`, `question_stats` (view queried by StatsPanel).

`useStats(scriptId, dataset)` returns `{ startRun, recordAnswer, completeRun, fetchStats, fetchRuns }`.

## Script datasets

Each active script has:
- `src/scripts/{script}/datasets.ts` — exports `{script}Datasets: QuizDataset[]`
- `src/scripts/{script}/{script}Questions.ts` (or `questions.ts`) — exports question arrays

Scripts with `comingSoon: true` appear in the menu greyed out but have no practice tabs.

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

## Global composables

| File | Exports | Notes |
|---|---|---|
| `useAuth.ts` | `user`, `loginWithDiscord()`, `logout()` | module-level singleton |
| `useScriptContext.ts` | `activeInfoSheet`, `activeFont` | written by ScriptPanel/FontPicker, read by stats |
| `useQuizPrefs.ts` | `samplingMode`, `randomCount`, `preferredMode` | localStorage-persisted module-level refs |
| `useStats.ts` | `useStats(scriptId, dataset)` | not a singleton; call per QuizPanel |
