# Badge palette — options explored

Background for the backlog's **No categorical palette** item. Nothing here is decided:
the number of categories the palette must eventually serve is unknown, and that number
is what picks the option.

Live comparison: <https://claude.ai/code/artifact/ccfa27ec-cc4c-4cab-8a82-d7402beb61a4>
(controls for ground, badge size and hue count; all values recomputed in the page).

Run `node tools/badge-palette.mjs` to regenerate every table below, or
`--hues N` to optimise and print a set of any size. It carries the same WCAG 2.x and
APCA-W3 implementations as `tools/contrast.mjs` and runs the same validation gate
(white-on-teal Lc −72.8, black-on-teal +36.8, Deep Ink on Warm Sheet +98.2).
Separability is CIEDE2000 between the closest pair in a set — the two a reader is
likeliest to confuse.

---

## What the two components do today

`LangBadge` — 25 language codes over D3 Category 20, flat saturated fill, no border,
label colour chosen by `textOn()`.

- 7 of 25 fail WCAG AA. All 7 are fixable by comparing both candidates and taking the
  higher ratio; `textOn()` instead thresholds YIQ luminance at `0.6`.
- Audit 2026-08-09 finding 2 says `ky` and `tyv` need darker swatches because no text
  colour rescues them. That was an artifact of testing `#222` rather than black:
  `ky` 3.74 → **4.93**, `tyv` 3.97 → **5.24**. With white and pure black as the two
  candidates, every swatch clears AA and **no swatch has to change**.
- WCAG and APCA disagree about the better label on four swatches — `#2ca02c`,
  `#9467bd`, `#e377c2`, `#7f7f7f`. All are mid-tone saturated, the class DESIGN.md
  already says to read APCA first on. On `#2ca02c`, black scores 6.17:1 but Lc +43,
  white fails at 3.40:1 but reaches Lc −66.
- `ORDER` has 25 entries and the palette 20, so five pairs share a swatch:
  `mhr`=`ru`, `udm`=`uk`, `kv`=`be`, `ab`=`rue`, `ce`=`bg`. Latent — only
  `ru uk be rue` currently appear.
- Rendered at **7.68px** (table cell, `0.6em` of the reading-tips ramp minimum) to
  9.6px at full column width.

`CharBadge` — 8 taxonomy tags, each a pale fill + hue-matched ink + pale border.

- **Label contrast is the healthy part**: 7 of 8 pass AA (`low` misses at 4.42), all 8
  sit in APCA's 60+ band. No re-map is needed for legibility of the label.
- **The chip is the defect.** Border vs its own fill 1.23–1.59; fill vs ground
  1.00–1.22; border vs ground 1.15–1.96 — nothing reaches 1.4.11's 3:1. On the Mint
  Wash zebra row `long`'s fill is **1.00:1**: the chip vanishes and only a 1.55 border
  suggests one was there.
- Fills are not separable: closest pair ΔE **3.34** (`long` vs `mid`). Two collisions
  cross axes — `rare` 55° vs `short` 48°, `mid` 208° vs `long` 218°.
- 10 of 24 hexes are literal Tailwind defaults; `rare`, `vowel` and `short` are
  wholesale Tailwind triples, plus `obsolete`'s ink. The other five tags are native.
- Rendered at **6.6px** in table cells and **4.95px** in the legend, both from
  `sheet.css`'s `clamp(11px, 0.75vw, 14px)` basis (audit 2026-08-09 #5).

---

## The geometry that constrains any fix

D3 Category 20 is **10 hues × 2 lightnesses**, not 20 independent colours. Its own
light/dark pairs give only 1.39–2.79:1 as ink-on-fill, so the pairing cannot be reused
for text.

Chroma available at each lightness — how much hue there is to spend:

| Lightness | Max chroma across hues | Contrast vs Cell White |
|---|---|---|
| 0.96 (CharBadge fill level) | 0.02 – 0.21 | 1.12:1 |
| 0.93 | 0.03 – 0.22 | 1.23:1 |
| 0.70 | 0.12 – 0.32 | 2.66:1 |
| **0.62** | **0.11 – 0.30** | **3.63:1** |
| 0.55 | 0.09 – 0.29 | 4.84:1 |

L 0.62 is the lightest a border can be and still clear 1.4.11's 3:1; at 0.70 it fails.
Minimum chroma at tint level is 0.02 — for some hues there is effectively no colour
available, which is why CharBadge's fills collapse.

**Capacity** — closest-pair ΔE2000 as the set grows:

| Categories | Hue in a saturated border | Hue in a tinted fill |
|---|---|---|
| 8 | 20.42 | 7.70 |
| 10 | 15.84 | 6.60 |
| 12 | 12.60 | 5.67 |
| 14 | 11.33 | 4.75 |
| 16 | 10.44 | 4.16 |
| 20 | 7.54 | 3.25 |
| 25 | 6.76 | 2.48 |

Evenly spaced hues. Holding every hue clear of the brand greens costs a little of
this: 19.95 / 15.31 / 12.24 at 8 / 10 / 12.

Baselines on the same yardstick: LangBadge's 20 fills **12.13**, CharBadge's 8 fills
**3.34**, its 8 borders **4.50**.

Hue-in-fill never reaches the shipped LangBadge baseline, even at 8 categories.
Hue-in-border beats it up to ~14 and degrades past that.

---

## Options measured

Values are for the 25 language codes; C–E shown at 10 hues.

| | Recipe | Labels failing AA | Label contrast | APCA Lc | Closest ΔE | Chip edge vs ground | One palette? |
|---|---|---|---|---|---|---|---|
| **A** | ships today | 7 of 25 | 2.26–11.01:1 | 48–85 | 12.13 | 1.45:1 | no |
| **B** | same fills, label = better of white/black | none | 4.82–14.53:1 | 35–85 | 12.13 | 1.45:1 | no |
| **C** | tint fill + same-hue dark ink + mid border | none | 6.12–6.64:1 | 73–75 | 9.49 | 1.81:1 | yes |
| **D** | near-white fill + one dark ink + saturated border | none | 11.60–11.96:1 | 86–88 | 15.31 | 3.48:1 | yes |
| **E** | as D, fill dark enough to read as filled | none | 9.49–10.04:1 | 75–78 | 15.31 | 3.48:1 | yes |

Recipes in OKLCH, so they regenerate at any hue count:

- **C** — fill `L 0.94 C 0.055`, ink `L 0.45 C 0.13`, border `L 0.80 C 0.10`, all at hue H.
- **D** — fill `L 0.93 C 0.045`, ink `--c-head`, border `L 0.62` at max in-gamut chroma.
- **E** — as D with fill `L 0.87 C 0.075`.

B is the minimal repair: about five lines in `textOn()`, fixes every AA failure, unifies
nothing. D and E take the colour out of the fill, which is what lets a single ink token
serve every chip and puts badge labels in APCA's preferred-body band for the first time.

E exists for the second dimension — filled vs hollow as a way past the hue ceiling. D's
fill is only 1.21–1.25:1 against Cell White and 1.07:1 against Mint Wash, so the two
treatments would not read apart; E's darker fill is what makes that distinction visible,
at the cost of Lc 86–88 → 75–78.

---

## A 10-hue set, if one is wanted

Optimised for maximum separation with every hue held ≥18 ΔE from Highway Green, Signal
Teal and Tally Good. An earlier 12-hue attempt put a hue at ΔE **8.48** from Signal Teal
— a categorical badge that reads as the brand accent.

| Hue | Border (D) | Fill (D) | Border vs Cell | Border vs Mint | Ink on fill |
|---|---|---|---|---|---|
| 7 | `#f4006c` | `#ffdee3` | 4.15 | 3.61 | 11.60:1 |
| 28 | `#fb0013` | `#ffdfdb` | 4.11 | 3.58 | 11.62:1 |
| 56 | `#c96900` | `#ffe1cd` | 3.82 | 3.32 | 11.67:1 |
| 89 | `#a58100` | `#f4e7c6` | 3.66 | 3.19 | 11.80:1 |
| 122 | `#779300` | `#e2edcc` | 3.52 | 3.07 | 11.89:1 |
| 207 | `#0098a6` | `#c6f1f7` | 3.48 | 3.03 | 11.96:1 |
| 237 | `#0090cd` | `#d0edff` | 3.58 | 3.12 | 11.90:1 |
| 267 | `#4f79ff` | `#dee8ff` | 3.81 | 3.32 | 11.80:1 |
| 297 | `#9957ff` | `#eae3ff` | 4.07 | 3.54 | 11.69:1 |
| 338 | `#e200bd` | `#fdddf2` | 4.23 | 3.68 | 11.60:1 |

Closest pair ΔE 15.31. Brand separation 26.8 / 18.1 / 18.1.

---

## Open

- **How many categories the palette must serve.** Below ~14, hue-in-border is
  comfortably the strongest option; past that it degrades below what LangBadge already
  has, and the saturated register becomes the honest answer for the large set.
- **Whether the two components stay separate.** Independent of the palette question.
- **Whether WCAG or APCA decides the four mid-tone swatches**, if A or B is kept.

Size is not part of this. 4.95px and 7.68px badges fail every option equally; the floor
is a separate fix and the one that changes what a reader can see.
