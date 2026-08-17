---
name: Unillit
description: A printed map-shop reference sheet, rebuilt as a web app for reading foreign scripts.
colors:
  signal-teal: "#0a8f6f"
  highway-green: "#006747"
  mint-wash: "#e3f3ec"
  mint-rule: "#c2dccb"
  warm-sheet: "#fafaf8"
  cell-white: "#ffffff"
  plate-ink: "#ffffff"
  plate-rule: "rgba(255, 255, 255, 0.6)"
  deep-ink: "#242b26"
  body-ink: "#3e4842"
  faded-ink: "#67716b"
  tally-good: "#3a7d44"
  tally-warn: "#8a5e10"
  tally-bad: "#b94040"
  feedback-correct-bg: "#edf7ee"
  feedback-wrong-bg: "#fdf0f0"
  feedback-fuzzy-bg: "#eef5df"
  feedback-fuzzy-ink: "#5a7030"
  feedback-fuzzy-user-bg: "#f5f5e8"
  feedback-fuzzy-user-ink: "#726c3c"
typography:
  display:
    fontFamily: "Lora, 'Noto Serif', Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 500
    lineHeight: 1.4
  headline:
    fontFamily: "Lora, 'Noto Serif', Georgia, serif"
    fontSize: "1.1rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "'Noto Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "'Noto Sans', system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    letterSpacing: "0.07em"
  letterform:
    fontFamily: "Lora, 'Noto Serif', Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 400
  glyph:
    fontFamily: "var(--font-thai), var(--font-cyrillic), var(--font-arabic)"
    fontSize: "clamp(24px, 1.56vw, 30px)"
    fontWeight: 400
    lineHeight: 1.15
  prompt:
    fontFamily: "var(--font-thai), var(--font-cyrillic), var(--font-arabic)"
    fontSize: "4rem"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  sm: "2px"
  md: "4px"
  full: "50%"
spacing:
  sp-2: "0.125rem"
  sp-4: "0.25rem"
  sp-6: "0.375rem"
  sp-8: "0.5rem"
  sp-10: "0.625rem"
  sp-12: "0.75rem"
  sp-16: "1rem"
  sp-20: "1.25rem"
  sp-24: "1.5rem"
  sp-28: "1.75rem"
  sp-32: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-teal}"
    textColor: "{colors.cell-white}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.faded-ink}"
    rounded: "{rounded.md}"
    padding: "2px 10px"
  pill-active:
    backgroundColor: "{colors.mint-wash}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.md}"
    padding: "2px 10px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.faded-ink}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  tab-active:
    backgroundColor: "{colors.highway-green}"
    textColor: "{colors.cell-white}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  nav-item-active:
    backgroundColor: "{colors.highway-green}"
    textColor: "{colors.cell-white}"
    rounded: "0 4px 4px 0"
    padding: "8px 10px"
  sheet-section-header:
    backgroundColor: "{colors.highway-green}"
    textColor: "{colors.cell-white}"
    typography: "{typography.label}"
    padding: "3px 8px"
  cell:
    backgroundColor: "{colors.cell-white}"
    textColor: "{colors.deep-ink}"
    padding: "3px 4px 2px"
  input-text:
    backgroundColor: "{colors.cell-white}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  choice:
    backgroundColor: "{colors.cell-white}"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  script-card:
    backgroundColor: "{colors.cell-white}"
    rounded: "{rounded.md}"
    padding: "12px 16px 16px"
  badge-beta:
    backgroundColor: "{colors.highway-green}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 4px"
---

# Design System: Unillit

## Overview

**Creative North Star: "The Map Shop Handout"**

The system is designed as though it were an A4/A5 reference sheet on sturdy glossy
stock, made by a typographer whose day job is maps, and sold in a bookshop beside
bird-species posters and wall maps of places worth visiting. That single image
settles most questions before they are asked. Density is not a constraint to
apologise for — a handout you paid for does not waste the sheet. Nothing is at a
default value, because somebody competent set this. And the sheets are an *object*:
if a sheet could not be printed on paper and still work, it has drifted.

Its typographic lineage is textbooks, map legends, the supplementary lists tucked
into a map's corner, and a little newspaper. The layout target is an engineering
manual, not a magazine: condensed, tabulated, ruled. The system aims to be roughly
80–90% faithful to Matthew Butterick's *Practical Typography*, and the interesting
part is the remaining 10–20%, where a screen and an interactive quiz demand things a
printed page never had to answer.

Roadsign iconography is the **flavour, not the foundation** — the kind of thematic
nod a print designer might reach for anyway, since textbook and map design were never
uniform either. It shows up as a highway-green plate under white lettering, and only
where something genuinely behaves like a plate. Everything else is the paper, the
rules, and the ink.

**Key Characteristics:**
- Condensed to engineering-manual density; whitespace is earned, never default
- Mint hairlines and tonal fills do all the work that shadows would do elsewhere
- The foreign glyph is the only element permitted to be large
- Chrome is set at 10–13px and recedes; the sheet is the subject
- A near-neutral ink with a faint green cast, so the greens read as deliberate
- Print-plausible: a sheet should survive being printed on A5 and still function

## Colors

A near-neutral, faintly green ink on warm paper, with the entire brand carried by
three greens: a deep highway green that does the legible work, a mint that rules and
tints, and a brighter teal that exists to misbehave.

### Primary
- **Highway Green** (`#006747`): the load-bearing brand colour and the only green
  trusted with text. It carries links in running prose, the romanisation tokens in
  sheet cells (`.rom`), native script names in the sidebar, term-card headings, input
  focus borders, and — reversed to white — every plate: sheet section headers, the
  active panel tab, the active nav item, the active quiz-shell tab. 6.6:1 on Warm
  Sheet, 6.9:1 reversed under white.

### Secondary
- **Signal Teal** (`#0a8f6f`): the mischief. Brighter and less orthodox than the
  brand strictly needs, and that is the point — it is the one element breaking the
  reference-sheet decorum. It fills primary buttons and the quiz progress bar, colours
  page headings (`h1`/`h2`), list markers, blockquote borders, the `abbr` underline,
  and the focus ring and `accent-color`.

### Tertiary
- **Mint Wash** (`#e3f3ec`): the tint. Table zebra striping, sheet row bands, hover
  backgrounds on tabs and nav items, active-pill fills, inline `code` backgrounds, and
  text selection. It is how a group gets bounded without a box.
- **Mint Rule** (`#c2dccb`): the hairline. Every cell boundary, panel divider, section
  outline, table underscore and progress-bar track. In a system with no shadows, this
  is the entire vocabulary of separation.

### Neutral
- **Warm Sheet** (`#fafaf8`): the page. Body background and the ground behind panel
  content — off-white and slightly warm, so white cells read as *paper laid on paper*.
- **Cell White** (`#ffffff`): the specimen ground. Sheet cells, sidebar, panel headers,
  toolbars, cards, inputs. It is the colour of "something is mounted here".
- **Plate Ink** (`#ffffff`, `--c-on-sign`): the same white, but reversed *onto* a plate
  rather than laid *under* content. Its own token because the two move independently —
  see "Room the palette already has, unused" below.
- **Plate Rule** (`rgba(255, 255, 255, 0.6)`, `--c-border-plate`): the hairline reversed
  on a plate, for controls that sit inside one (the beta badge on an active nav item,
  the Thai consonant picker). Mint Rule is invisible on Highway Green; this is its
  counterpart.
- **Deep Ink** (`#242b26`): glyphs, specimens, headings inside sheets, emphasised
  values. 13.9:1.
- **Body Ink** (`#3e4842`): running prose, table cells, nav labels. 9.1:1.
- **Faded Ink** (`#67716b`): metadata, captions, inactive controls, micro-labels,
  gloss text, "never"/"—" placeholders. 4.8:1 — still AA at body size, which is why
  it can be used this freely.

### Status
- **Tally Good** (`#3a7d44`) / **Tally Warn** (`#8a5e10`) / **Tally Bad** (`#b94040`):
  accuracy tiers, roadmap freshness dots, correct/wrong tallies. Deliberately *not*
  the brand greens — the brand must not be mistaken for a score.
- The four quiz feedback fills (`feedback-*`) are pastel grounds only; their borders
  and text reuse the status colours above. The fuzzy pair is olive-tinted rather than
  green, so "almost right" is visibly neither correct nor brand.

### Named Rules

**The Plate Rule.** White-on-Highway-Green is reserved for surfaces that genuinely
behave like a plate: sheet section headers, the active tab, the active nav item, and the
beta badge. It is the roadsign nod, and it works because it is rationed — a handful per
screen. Applied to anything that is merely selected, prominent, or in need of attention,
the nod becomes a costume. A plate laid on a plate takes a Plate Rule outline to
separate the two, as the badge does on the active nav item.

**The Neutral Ink Rule.** All three ink tones carry a faint green cast (`#242b26`,
`#3e4842`, `#67716b`) rather than being true greys. Never substitute a pure neutral;
the greens only read as deliberate because the ink quietly agrees with them.

### Measured contrast — both systems

Run `node tools/contrast.mjs` to regenerate. The script's WCAG and APCA
implementations are validated against apcacontrast.com (white-on-teal Lc −72.8,
black-on-teal Lc +36.8, both exact).

**Read APCA first.** WCAG 2.x's ratio mis-ranks mid-tone saturated colours, and this
palette is full of them — see the two inversions marked ⚠ below, where WCAG and APCA
disagree about which choice is *better*, and APCA is right. Negative Lc means light
text on a dark ground. APCA bands: |Lc| 90 preferred body · 75 min body · 60
large/secondary · 45 headlines · 30 spot · 15 non-text floor.

| Text / mark | Ground | WCAG | APCA Lc | Usable for |
|---|---|---|---|---|
| **Ink on paper** | | | | |
| Deep Ink `#242b26` | Warm Sheet | 13.87:1 | +98.2 | body, preferred |
| Deep Ink `#242b26` | Cell White | 14.50:1 | +101.3 | body, preferred |
| Body Ink `#3e4842` | Warm Sheet | 9.09:1 | +88.9 | body, min |
| Body Ink `#3e4842` | Cell White | 9.50:1 | +92.0 | body, preferred |
| Faded Ink `#67716b` | Warm Sheet | 4.84:1 | +71.9 | large/secondary |
| Faded Ink `#67716b` | Cell White | 5.06:1 | +75.0 | body, min |
| Highway Green `#006747` | Warm Sheet | 6.63:1 | +80.3 | body, min |
| Highway Green `#006747` | Cell White | 6.93:1 | +83.4 | body, min |
| Signal Teal `#0a8f6f` | Warm Sheet | 3.89:1 | +64.2 | large/secondary |
| Signal Teal `#0a8f6f` | Cell White | 4.06:1 | +67.3 | large/secondary |
| **On Mint Wash** (zebra, hover, active pill) | | | | |
| Deep Ink | Mint Wash | 12.63:1 | +91.9 | body, preferred |
| Body Ink | Mint Wash | 8.28:1 | +82.6 | body, min |
| Faded Ink | Mint Wash | 4.41:1 | +65.6 | large/secondary |
| Highway Green | Mint Wash | 6.04:1 | +74.0 | large/secondary |
| Signal Teal | Mint Wash | 3.54:1 | +57.9 | headlines only |
| **Reversed on Highway Green** | | | | |
| Cell White `#ffffff` | Highway Green | 6.93:1 | **−88.4** | body, min |
| Warm Sheet `#fafaf8` | Highway Green | 6.63:1 | −85.0 | body, min |
| Mint Wash `#e3f3ec` | Highway Green | 6.04:1 | −78.1 | body, min |
| Mint Rule `#c2dccb` | Highway Green | 4.75:1 | −62.0 | large/secondary |
| Deep Ink `#242b26` | Highway Green | 2.09:1 | +15.9 | non-text only |
| Body Ink `#3e4842` | Highway Green | 1.37:1 | **+0.0** | invisible |
| Faded Ink `#67716b` | Highway Green | 1.37:1 | **+0.0** | invisible |
| ⚠ Pure Black | Highway Green | 3.03:1 | +20.6 | non-text only |
| **Reversed on Signal Teal** | | | | |
| Cell White `#ffffff` | Signal Teal | 4.06:1 | **−72.8** | large/secondary |
| Warm Sheet `#fafaf8` | Signal Teal | 3.89:1 | −69.4 | large/secondary |
| Mint Wash `#e3f3ec` | Signal Teal | 3.54:1 | −62.4 | large/secondary |
| Mint Rule `#c2dccb` | Signal Teal | 2.78:1 | −46.4 | headlines only |
| Deep Ink `#242b26` | Signal Teal | 3.57:1 | +32.0 | spot text only |
| Body Ink `#3e4842` | Signal Teal | 2.34:1 | +22.8 | non-text only |
| Faded Ink `#67716b` | Signal Teal | 1.25:1 | **+0.0** | invisible |
| ⚠ Pure Black | Signal Teal | 5.17:1 | +36.8 | spot text only |
| **Status on feedback grounds** | | | | |
| Tally Good | ok-bg | 4.56:1 | +68.0 | large/secondary |
| Tally Bad | wrong-bg | 4.88:1 | +68.9 | large/secondary |
| Fuzzy Ink | fuzzy-bg | 4.94:1 | +69.8 | large/secondary |
| Fuzzy Echo Ink | fuzzy-user-bg | 4.87:1 | +70.1 | large/secondary |
| Tally Warn | Cell White | 5.69:1 | +78.2 | body, min |
| Tally Bad | Cell White | 5.43:1 | +76.1 | body, min |
| **Non-text marks** (WCAG 1.4.11 wants 3:1) | | | | |
| Mint Rule `#c2dccb` | Cell White | 1.46:1 | +21.8 | non-text only |
| Mint Rule `#c2dccb` | Warm Sheet | 1.40:1 | +18.7 | non-text only |
| Mint Wash `#e3f3ec` | Cell White | 1.15:1 | +0.0 | below threshold |
| Mint Wash `#e3f3ec` | Warm Sheet | 1.10:1 | +0.0 | below threshold |

**What the two inversions mean.** On both green plates, WCAG scores *black* higher
than white — and APCA says black is unreadable there (Lc +20.6 and +36.8) while white
is excellent (−88.4) or fine (−72.8). Reversing a plate to dark text because a WCAG
ratio told you to would make it materially harder to read. **Light stays on the plates.**

**The ink trap.** Body Ink and Faded Ink sit almost exactly at Highway Green's
luminance, so on a plate they are not merely low-contrast — they are **literally
invisible** (Lc 0.0, WCAG 1.37:1). Faded Ink on Signal Teal is the same. An ink that
reads fine everywhere on paper vanishes the moment it lands on a plate, and both
contrast systems agree. Never demote plate text to an ink tone to make it look
secondary; use a lighter tone instead.

**Room the palette already has, unused.** Reversed text on a plate does not have to be
pure white:
- **Warm Sheet on Highway Green (−85.0)** is within 3 Lc of pure white and is the
  paper colour, so it fits the handout metaphor better than `#fff` does. One edit to
  `--c-on-sign` tries it.
- **Mint Wash on Highway Green (−78.1)** still clears APCA's body-text minimum, which
  means a mint-tinted *secondary* tone on a plate is viable — currently the active nav
  item sets both the Latin name and the native script name to the same pure white, and
  this is the tone that could separate them without weakening either.
- **Mint Rule on Highway Green (−62.0)** goes one step quieter again, for large or
  secondary text only.

Signal Teal is the tighter plate: it supports white, Warm Sheet and Mint Wash for
large/secondary text, but nothing reaches the body-text band, which is consistent with
it being a fill colour that happens to carry short labels.

Two rows to know rather than act on: Mint Wash on paper is *below the perceptual
threshold* (Lc 0.0). That is fine — it bands rows and marks hover, it never has to be
discriminated as a mark. Mint Rule at Lc ~20 is likewise fine as a sheet rule but is
the honest weak point for **interactive** boundaries, where 1.4.11's 3:1 does apply.

### On Signal Teal (working position, not settled)

Signal Teal measures **3.89:1 / Lc +64.2 on Warm Sheet** — a WCAG "fail" for body
text, but squarely in APCA's large/secondary band, which is exactly the role it holds
(`h1`, `h2`, list markers, blockquote borders). The current working split: Signal Teal
takes fills, large text, graphic marks and focus rings; Highway Green takes anything
read as text at body size.

This is a position, not a law. The tension is real and unresolved — the colour is more
characterful than its contrast permits, which is precisely why it is non-standard and
worth keeping. If you want it doing more, the routes that stay honest are: larger type,
larger fills, graphic or iconographic use, and non-text UI.

**WCAG 2.x is the wrong model for this colour, and the numbers say so.** White on
Signal Teal measures 4.1:1 by the WCAG ratio — nominally a fail — but
[**APCA Lc −72.8**](https://apcacontrast.com/?BG=0a8f6f&TXT=ffffff&DEV=G4g&BUF=A22),
which is comfortably usable for body text. Black on the same ground *passes* WCAG at
5:1 and scores **Lc 36.8** on APCA, which is genuinely unreadable. WCAG 2.x's ratio is
known to mis-rank mid-tone saturated colours in exactly this way, and here it inverts
the correct answer.

So: **white on Signal Teal is fine**, and a WCAG-only reading that says otherwise
should be checked against APCA before anything is changed. The case that stays
genuinely weak is Signal Teal *as* body-size text on Warm Sheet — but even that is a
guideline to weigh, not a prohibition. This colour is here to break rules a bit; the
job is to break them knowingly.

## Typography

**Display Font:** Lora (with Noto Serif, Georgia, serif)
**Body Font:** Noto Sans (with system-ui, sans-serif)
**Script Fonts:** per script and user-swappable — Noto Sans Thai / Noto Serif Thai /
Trirong / Sarabun for Thai; Noto Serif and friends for Cyrillic; Noto Naskh Arabic;
Noto Sans Bengali. Exposed as `--font-thai`, `--font-cyrillic` and set at the app root.

**Character:** A bookish serif for anything that names or titles, a plain humanist
sans for everything that instructs or labels. Lora carries the editorial voice; Noto
Sans stays out of the way and, crucially, has siblings in every script the product
covers — so the specimen and the interface never look like they came from different
publications.

### Hierarchy
- **Display** (Lora 500, 1.6rem): page titles in full-page prose views. Set in Signal
  Teal.
- **Headline** (Lora 500, 1.1rem): section headings in prose views; in reading-tips
  panels the same role runs at 600/1.15em because the smaller panel size needs the
  extra weight.
- **Body** (Noto Sans 400, `--fs-prose` 1rem): running prose, table cells, quiz
  choices. `--fs-body` (14px) is the inherited base, not body copy — chrome sits at or
  below it.
- **Label** (Noto Sans 600–700, 10–11px, `--tracking-caps`, uppercase): sheet section
  headers, stats table headings, quiz-shell tabs, badges. The micro-register that makes
  the interface read as apparatus rather than content.
- **Letterform** (`--fs-letterform`, 22.4px): a single character set inline, large enough
  to read its detail — the reading-tips letterform tables, the stats prompt cell. Sits
  between Headline and Display, and is the only step in that gap. Value unsettled;
  experiment in 1.3–1.4rem as more uses arrive.
- **Glyph** (script font, `clamp(24px, 1.56vw, 30px)`): the specimen in sheet cells,
  exposed as `--glyph` so cells can scale relative to it.
- **Prompt** (script font, 4rem): the single character or toponym under test.

**Sub-headings are body-sized.** A heading distinguishes itself by kind, not by growing
— `.prose h3` is serif 600, tracked and muted at `--fs-prose`. There is no Title step.

**Tracking is two steps, split by case.** `--tracking-caps` (0.07em) opens up uppercase;
`--tracking-wide` (0.04em) is the lighter touch for sentence-case labels. Tracked and
muted is how the system marks something without making it louder. `letter-spacing: 0`
is a reset, not a third step.

**Line-height** is `--lh` 1.4, with `--lh-tight` 1.25 for text that should read as a
block rather than a column of lines: list items and callouts.

**Measures** name the text column, not the box around it — `.prose` is `content-box`
and adds its gutters outside the cap. Running text is capped at `--measure-prose`
(36rem) on every prose page; `--measure-wide` (46rem) is the same kind of content width
for grid and table pages, and a page holding both re-centres its prose children on the
measure. `--w-quiz-control` (22.5rem) is not a measure — it fits the widest control in
the answer card. Reading tips run to ~93 characters on `--measure-tips` (48rem): their
paragraphs are one or two lines, so a tighter measure would spend wraps protecting a
return sweep that barely happens. It also sets the panel's type ramp
(`--fs-prose ÷ --measure-tips`), so line length never shortens as the panel widens.

### Named Rules

**The Butterick Rule.** Target 80–90% fidelity to *Practical Typography*: real
measure limits, no double spaces, proper dashes and quotes, restrained emphasis,
purposeful line length, no decorative type. Where a screen genuinely differs from a
page — interactive states, scroll, live data density — deviate on purpose and be able
to say why. "It looked nicer" is not a why.

**The Specimen Rule.** The foreign glyph is the only thing allowed to be large. Every
other element is set between 10px and 1.6rem. When a new element wants to be big, it
is almost always trying to be the specimen — and it isn't.

**The Weight Split Rule.** Lora runs at 500 in full-page prose and 600 in panels. The
larger prose sizes carry more ink per stroke, so they want the lighter weight; the
compact panel sizes need the heavier one. Do not homogenise these to a single weight.

**The Shrinking Scale Rule.** Every scale in this system — type sizes, spacing steps,
radii, colours — is under permanent pressure to inflate, because each individual
addition looks reasonable in isolation. Treat a smaller palette as the default-correct
answer: reach for an existing step before adding one, and when two steps are close
enough that nobody could name the difference, they are one step.

**The Written-in-rem, Chosen-in-px Rule.** Every absolute size is a `--fs-*` token in
`:root`, written as an exact sixteenth of a rem so type honours the reader's browser
font-size preference — but *chosen* in px, because the chrome register needs 1px
resolution in the 10–15px band and a rem-native ladder (0.05–0.1rem, i.e. 0.8–1.6px
steps) cannot express that. The px in each token's comment is the real intent; the rem
is how it is spelled. Sizes that scale with their container stay in `em` and are
deliberately not tokens — see the ramp note below.

### Native names scale per script

A script's own name sits beside its Latin one on the index card, the sidebar row and the
panel header. Latin-metric scripts (Cyrillic, Greek) read correctly at the Latin name's
size; Thai, Arabic, Bengali and Lao render visibly smaller and lose the detail a learner
is being taught to recognise.

So the native name is a **ratio, not a step** — `calc(1em * var(--label-scale, 1))` off a
base each surface sets for itself, with `labelScale` a per-script field in `ScriptConfig`.
It is an optical correction, so per-script microadjustment is the point and the Shrinking
Scale Rule does not apply.

It corrects rendering, not layout: the row keeps its height whatever the glyph does.

### Open: the type ramp is extracted, not yet resolved

Eleven `--fs-*` tokens in `main.css`, one base (`1rem` is 16px — nothing sets
`html`'s font-size), and no component carrying a literal font-size. Two value-named
tokens remain — `--fs-11` and `--fs-12` — and no two steps now sit under 1px apart.

Tokens named by value are deliberately ugly: each is a size with no role that some other
token does not already serve. A token that earns a name gets one.

Two standing cautions:

- **Do not "fix" this by widening the ramp** to whatever the code happens to contain.
  That would launder the mess into doctrine and make the file useless as a check.
- **Do not collapse sizes wholesale** to make the detector quiet. Each merge is a
  judgment call about a specific surface.

Resolving it means one pass per register — sheets, panel chrome, menu, quiz — deciding
which steps that register needs, then writing the surviving ramp here. Prose, the script
cards and the menu are done: between them they retired ten tokens, all by removing levels
rather than by merging values.

## Layout

Two fixed regions: a collapsible sidebar (200px expanded, 40px collapsed, animated
over 0.2s) and a scrolling main area. The sidebar measures the platform scrollbar at
runtime and widens itself by exactly that amount while its nav overflows, so the
collapsed rail never loses button width to Windows Chrome's 15px scrollbar.

The script page is the product's working surface: a `1fr 1fr` grid of two panels, info
sheet left and practice right, each an independently scrolling column with its own
sticky tab header. Below 768px it becomes two stacked rows; when the info panel is set
to *None* the rows collapse to `auto 1fr` so the practice panel takes the screen. 768px
is the system's only breakpoint — everything else scales fluidly through `clamp()`.

Density is tiered by register. Sheets run on a 2–10px rhythm (`padding: 10px`, `gap:
8px`, cells at `3px 4px 2px`) and place glyph cells on a `repeat(auto-fill,
minmax(var(--cell-min), 1fr))` grid so a listing reflows without ever going ragged.
Panel chrome runs on 4–12px. Full-page prose relaxes to a `0.25–2rem` rhythm, because
those pages are read rather than consulted.

**The spacing ramp is `--sp-2 … --sp-32`** — `2 4 6 8 10 12 16 20 24 28 32`, 2px
resolution to 12 and 4px above. It is measured off the menu and prose registers rather
than imported: a geometric ~2.2×-per-step ladder is built for prose pages and cannot
express `3px 4px 2px`. Extra variety is acceptable — the target is a discoverable scale,
not a short one. Like the type ramp, the tokens are **written in rem and chosen in px**,
so spacing and type scale together under a font-size preference.

Two things sit outside it. **The sheet register** keeps its own microsteps and is heading
for `em`, so sheet packing never leaks into the scale offered for controls. **The
strays** — `1 3 5 7 14 40 48` and the off-grid rem values — stay literal until a pass
collapses them; naming one would launder it into the scale.

Sheet type scales with the viewport rather than stepping at breakpoints:
`font-size: clamp(11px, 0.75vw, 14px)` with `--glyph: clamp(24px, 1.56vw, 30px)`. The
sheet stays proportionally itself from a laptop to a wide desktop.

### Named Rules

**The Handout Density Rule.** A handout you paid for does not waste the sheet. Before
adding padding, ask whether a printed reference sheet would spend that space. Usually
it would not. Whitespace here is structural — it separates groups — and is not applied
for comfort.

**The Print Test.** A sheet should be printable on A5 and still work. If a design
depends on hover, scroll position, or viewport height to be legible, it has stopped
being a handout.

## Elevation & Depth

**There are no shadows.** Not one `box-shadow`, `filter` or `backdrop-filter` exists in
the codebase, and this is doctrine rather than an omission. The system is a printed
sheet; ink does not float.

Depth is expressed three ways, in order of strength: a **1px Mint Rule hairline**
(`--hairline`, on cell boundaries, section outlines, panel dividers and table
underscores); a **tonal
fill** (Cell White mounted on Warm Sheet to say "specimen here", Mint Wash to band a
row or mark a hover); and **a plate** (white on Highway Green, for the small set of
surfaces that are genuinely active). Ruled sheet grids clip their outer edges with
negative margins (`margin: 0 -1px -1px 0`) against the section's `overflow: hidden`, so
a grid reads as internally ruled rather than double-bordered.

The ladder runs backwards too, on the same surfaces: **Cell White on Warm Sheet is
mounted, Warm Sheet is flush, `transparent` is unmounted.** Something recedes by losing
its mount, not by gaining a darker surface.

### Named Rules

**The No-Shadow Rule.** Never introduce a shadow, glow, blur or gradient to signal
depth, state or importance. If something needs to come forward, give it a hairline, a
tonal fill, or a plate — in that order.

**The De-emphasis Rule.** Something recedes by changing surface or ink, never by dimming
text. Drop the greens to Faded Ink, or unmount the surface. Opacity applies to a whole
inert element (`--o-inert`), at one level only — nested opacities multiply, and that is
how the script cards once arrived at 1.6:1. The script card is the worked example: live
is Cell White with a Signal Teal name, beta is the same card with the greens fallen back
to Faded Ink, and unwritten is unmounted and dimmed as one element.

## Shapes

Two radii and nothing else: **2px** (`--radius-sm`) for small inline marks — language
badges, sheet-grid corners, the progress track, panel tabs — and **4px** (`--radius`)
for everything with an interior: buttons, pills, inputs, cards, nav items, term cards,
figures. `50%` appears once, on the user avatar, because it is a photograph.

The form language is rectangular and ruled. Cells are square-shouldered and share
hairlines with their neighbours rather than each carrying an outline; sections are the
only elements with an outer border, and they clip their contents so interior rules meet
the edge cleanly. Nothing is a capsule, nothing is a blob, nothing is circular except
the avatar and the 10px roadmap status dots.

One asymmetry is deliberate: the **active nav item flattens its left corners**
(`border-radius: 0 4px 4px 0`) and drops its left margin so it bleeds into the sidebar
edge. That is the plate motif — a sign fixed to a post, not a floating chip.

## Components

Components exist in two registers, and the difference is intentional rather than
inconsistent. See **The Two Registers Rule** below.

### Buttons
- **Shape:** softly squared (4px radius), never capsule.
- **Primary:** Signal Teal ground, white text, no border, `8px 20px`, 13px Noto Sans.
  Hover dims to `opacity: 0.85`. Used for the single forward action in a view: Check,
  Next, Play another, Login.
- **Secondary:** transparent ground, Mint Rule hairline, Body Ink text, same metrics.
  Hover deepens text to Deep Ink and border to Body Ink. Used for Copy results and
  other optional actions.
- **Focus:** the global 2px Signal Teal ring at `outline-offset: 2px`; controls flush
  against a panel edge (tabs, toggles, quiz-shell tabs) use `outline-offset: -2px` so
  the ring stays inside the surface.

### Pills (toolbar controls)
- **Style:** `2px 10px`, 11px, Mint Rule hairline on transparent, Faded Ink text.
- **Hover:** text and border step up to Body Ink — no fill.
- **Active:** Mint Wash fill, Highway Green border, Deep Ink text.
- **Locked:** `opacity: 0.4`, rendered as a `<span>` rather than a disabled button, with
  a `title` explaining what unlocks it (Revision mode needs an account).
- **Filter pills** in the stats panel are the same component one step smaller (10px,
  `2px 8px`, 600 weight) and toggle off when re-clicked.

### Cards / Containers
- **Sheet sections** are the signature container: 1px Mint Rule border, 4px radius,
  `overflow: hidden`, opened by a full-bleed Highway Green header bar in white uppercase
  micro-label type. An optional `.section-note` strip sits under the header, and a
  `footer` closes it with a hairline and Faded Ink metadata.
- **Term cards** (reading-tips `dl > div`): Cell White on a `minmax(170px, 1fr)` grid,
  hairline border, Lora 600 Highway Green `dt` over Faded Ink `dd`.
- **Script cards** (the Home index): fill, no border. Three levels only — a header row
  pairing the Latin name (Lora 600 Signal Teal) with the native specimen over a
  hairline, the description at `--fs-12`, and a footer carrying the countries and the
  state mark. Hover lifts the ground *and* deepens the name to Highway Green: moving
  only the ground would drop the name to Lc 57.9.
- **Roadmap steps:** Cell White, hairline, 160–280px wide, led by a 10px status dot
  that fills Tally Good / Tally Warn / hollow-muted by practice recency.
- **Internal padding:** `10px` for sheets, `10–14px` for chrome cards, `2rem` for quiz
  card bodies.

### Inputs / Fields
- **Style:** Cell White ground, 1px Mint Rule border, 4px radius, `8px 12px`, 14px.
- **Focus:** border shifts to Highway Green (plus the global teal focus ring).
- **Count input:** the compact variant — 52px wide, `2px 6px`, 11px, centred, transparent.
- Text answer inputs disable `autocomplete`, `autocorrect` and `spellcheck`, because the
  browser must never help transliterate.

### Navigation
- **Sidebar:** Cell White with a Mint Rule right border. A script row pairs its name
  (Lora 600, Signal Teal) with the native specimen (Deep Ink) on one baseline, specimen
  set right, as the index card does; utility rows stay Noto Sans in Body Ink, so the
  column separates content from apparatus. Rows collapse to a single Headline-sized
  glyph in the 40px rail, Home to the brand mark. Hover fills Mint Wash and deepens the
  name to Highway Green; active is the left-bled Highway Green plate with everything
  reversed to white. Beta drops the name and rail glyph to Faded Ink and keeps its badge;
  coming-soon carries that into the specimen, takes `--o-inert` as one row, and is an
  inert `<div>`.
- **Panel tabs:** chrome size, `4px 10px`, 2px radius, Faded Ink; hover tints Mint Wash; active
  is the Highway Green plate. The tab strip scrolls horizontally with hidden scrollbars
  and a `mask-image` fade at the right edge that signals more tabs without spending a
  chevron.
- **Quiz-shell bottom bar:** three equal-flex uppercase 11px micro-labels; active takes
  the Highway Green plate.

### Signature: the character cell
The atom of the whole product. A flex column inside an `auto-fill` grid: the specimen
glyph in the script font at `--glyph` size, the romanisation beneath it in Highway
Green 600, then optional final-form and gloss lines in Faded Ink at `0.8em`. Cells sit
on Cell White with no border of their own; `.ruled` variants add shared hairlines for
dense listings where the borderless look stops tracking. Rows band with Mint Wash where
a listing is long enough to lose the reader.

Everything else in the system is in service of this cell being scannable.

### Named Rules

**The Two Registers Rule.** Chrome and quiz are set differently on purpose.
*Chrome* — sidebar, panel tabs, toolbars, stats filters — is the fixture around the
handout: restrained, near-muted, typographic, 10–13px, hairline-bordered, no fills
except on hover and active. *The quiz* is inhabited for an uninterrupted stretch, so
its controls are frankly interactive: 14px targets, real buttons with fills, coloured
feedback rows, generous `2rem` card padding. Both obey the same palette, radii and type
families; they differ in how much presence they are allowed. Do not flatten one into
the other — a quiz button set like a toolbar pill is unusable, and a toolbar set like a
quiz button shouts over the sheet.

**The Muted Chrome Rule.** Interface controls rest at Faded Ink and step up to Body Ink
on hover. A control at full Deep Ink is either active or a bug.

## Do's and Don'ts

### Do:
- **Do** ask "would a map-shop handout do this?" before adding space, weight or colour.
  It answers most layout questions correctly.
- **Do** carry the sheet's typographic conventions into every dense listing —
  hairline rules, Mint Wash banding, uppercase micro-label headers, tight cell padding.
  The sheets are the house style, not a special case. *Known drift: the stats table and
  the reading-tips panels were built as app UI that happens to sit near sheets; moving
  them toward sheet conventions is a licensed improvement, not a redesign.*
- **Do** use the hairline → tonal fill → plate ladder, in that order, to express depth.
- **Do** keep new radii to 2px or 4px.
- **Do** spend an existing scale step before inventing one — for type, spacing, radii
  and colour alike. Scales only ever inflate; the smaller palette is the default-correct
  answer.
- **Do** reserve white-on-Highway-Green for surfaces that genuinely act as plates.
- **Do** let the glyph be the only large thing on screen.
- **Do** state maturity per script with the existing beta badge and dimming, rather than
  hedging the whole interface.
- **Do** deviate from Butterick when a screen genuinely demands it — and record why.

### Don't:
- **Don't** add a shadow, glow, blur, gradient or glassmorphic surface. Not for depth,
  not for state, not for emphasis.
- **Don't** treat a WCAG 2.x ratio as the last word on Signal Teal. Check APCA before
  changing anything — white-on-teal is Lc −72.8 and fine, despite reading as a 4.1:1
  "fail". Signal Teal *as* body-size text on Warm Sheet stays the weak case, but it is
  a guideline to weigh, not a prohibition. See "On Signal Teal" above.
- **Don't** drift toward a gamified language app: no mascots, streak flames, confetti,
  bouncy oversized rounded buttons, cartoon illustration or celebratory motion.
- **Don't** drift toward a generic SaaS dashboard: no card-on-card stacking, gradient
  headers, purple/blue tech palette, floating widgets or comfort padding.
- **Don't** chase trends: no neon, no heavy blur, no animated gradients, no
  dark-mode-first inversion of a system built as printed paper.
- **Don't** produce undifferentiated walls of prose. Academic *typography* is part of
  the lineage; unstructured academic *text* is the failure mode — tabulate, rule and
  group instead.
- **Don't** homogenise the two registers, or the Lora 500/600 split, in the name of
  consistency. Both differences are decisions.
- **Don't** use the brand greens for status. Accuracy, freshness and correctness have
  their own palette so a score is never mistaken for branding.
- **Don't** exceed one breakpoint's worth of complexity — reach for `clamp()` before
  reaching for a media query.
