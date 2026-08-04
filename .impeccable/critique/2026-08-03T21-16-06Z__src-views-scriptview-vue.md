---
target: src/views/ScriptView.vue
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-08-03T21-16-06Z
slug: src-views-scriptview-vue
---
Method: dual-agent (A: abeeccf3cbc3fb2df · B: a017a102ebf2c1390)

Target: `src/views/ScriptView.vue` — the two-panel script page. Mode: **Operate**.
Reviewed at 1440×900 and 390×844, Thai and Cyrillic, logged out.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Progress `1 / 44` and ✓/✗ tally at 11px in a corner; the mint progress *track* reads as a full bar at 0%; "Random" stays active while an emptied count field silently reverts to all 77 questions |
| 2 | Match System / Real World | 3 | Domain language is excellent (*transliterate*, *RTGS*, *changwat*); but "Shuffled" vs "Random" names nothing a user can decode — the real difference is all-questions vs N-with-replacement |
| 3 | User Control and Freedom | 1 | No undo on a submitted answer. **Opening STATS destroys the run in progress** (5/77 → STATS → 0/77, silently). No skip, no "retry what I missed" |
| 4 | Consistency and Standards | 2 | Type-in feedback uses ✓/✗ + strikethrough, multiple choice uses colour only. Two `<h1>`s, one empty. Bottom-bar labels are raw enum strings |
| 5 | Error Prevention | 1 | Enter on an empty input scores a blank answer wrong and writes it to stats; Enter is also the advance key on the preceding card, so a double-tap burns a question |
| 6 | Recognition Rather Than Recall | 3 | The sheets are the best thing here — undercut by badge codes at 6.6px whose meanings live only in `title` attributes, and no legend at all on the shape sheet |
| 7 | Flexibility and Efficiency | 3 | Real craft: Enter-to-submit/advance, autofocus, `?t=` tab-share links, localStorage prefs, font picker, tolerance slider. No 1–5 keys in MC, no arrow-key tabs |
| 8 | Aesthetic and Minimalist Design | 3 | Sheets exemplary; the quiz card is ~85% empty at 1440×900 and the *None* state is 46% of the viewport holding one sentence |
| 9 | Error Recovery | 2 | The per-question hint is the most valuable content in the product and is styled as the least important thing on the card |
| 10 | Help and Documentation | 2 | Reading tips = 1286 words, 14 `<h2>`s, 4.1 screens, no index — and it is the *default* tab |
| **Total** | | **22/40** | **Low-typical (most interfaces land 20–32)** |

No heuristics are n/a; this is a full Operate surface.

## Design Specificity Verdict

**Split down the middle — and the split runs exactly along the panel divider.**

**LLM assessment.** The left panel could not belong to another product. The Thai
"Identify by shape" sheet groups consonants under *Crates*, *Minions holding a
sword*, *Pacman ghosts/AmongUs — side gap*, *Squiggles — N-like*, *Flags*,
*Hooks*, *W-shape*. That taxonomy is a person looking hard at glyphs and naming
what they actually look like to a Westerner who has never seen Thai. No template
produces it. The `–p / –k / –t` final-sound annotations, the `.rom` in Highway
Green under each specimen, the ruled auto-fill grid, the full-bleed uppercase
green section plate — the map-shop handout, executed.

The right panel is a generic quiz. Prompt centred, input, Check, feedback rows,
progress bar, big score, Play another. Swap the glyph for a chemistry formula or
a Kanji and nothing else changes. It has no memory of the sheet six inches to its
left — no shape vocabulary, no recognition framing. At 1440×900 the quiz card is
~85% empty warm-sheet against a left panel that spends every pixel: the Handout
Density Rule is obeyed on one side of a 1px mint border and ignored on the other.

Two places where genuine off-the-shelf leaks in:
- `src/scripts/thai/CharBadge.vue:40-49` hardcodes 24 colour values —
  `#ede9fe/#5b21b6/#c4b5fd` (violet), `#e8f0fe/#1a56a0` (blue),
  `#fef9c3/#854d0e/#fde047` (yellow) — which are Tailwind's default palette, on
  the most-viewed sheet in the product. DESIGN.md names three greens plus three
  status colours and explicitly forbids a "purple/blue tech palette." The most
  brand-specific artefact in the app wears a stock rainbow.
- `useResultShare.ts` ships an emoji rank ladder — `🏔️ I'm at peak Thai
  literacy! 🏔️`, `🎓 I'm certifiedly literate in Thai! 🎓`. That is the
  Wordle/Duolingo share reflex DESIGN.md's Don't list forbids. Worse, the tiers
  exist *only* inside the clipboard; the done screen shows a bare `0 / 2`.

**Deterministic scan.** 61 static findings across the target's component tree; 3
URL scans at two viewports plus a live overlay injection. After exclusions, the
genuinely actionable set is small and the detector **confirmed two of the design
review's measurements independently**:

| Rule | Count | Status |
|---|---|---|
| `design-system-font-size` | 30 | Known deferred (DESIGN.md's open ramp question) |
| `design-system-color` | 24 | 23 = CharBadge taxonomy; **1 new**: `StatsPanel.vue:324` `#c8952a` |
| `low-contrast` | 15 / 15 / 9 | Real — accent-on-warm-sheet 3.9:1, white-on-accent **4.1:1** |
| `undersized-ui-text` | 1 / 1 / 43 | Real — `FontPicker.vue:25` 10px; `LangBadge.vue:78` → **7.02px** |
| `text-occlusion` | 11–12 (mobile) | Real — header/toolbar/answer-input over list and table text at 390px |
| `line-length` | 23–26 | Real — 88–91 chars in the reading-tips column |
| `layout-transition` | 2 of 4 | Real — `QuizPanel.vue:369`, `MainMenu.vue:160`; other 2 are devtools |
| `design-system-font` | 4 | False positive — the letterform-comparison table sets the same glyphs in 4 typefaces on purpose |
| `ai-color-palette` | 1 | False positive — devtools panel, confirmed absent in production preview |

Assessment B built a production preview specifically to separate
`vite-plugin-vue-devtools` noise from real findings, and diffed the two. That is
the right method and it cleanly isolated 3 false positives.

**Where the two assessments converge — the strongest signal in this report.**
Working blind of each other, both measured white-on-Signal-Teal at **4.06:1 /
4.1:1** — below AA, and it is the label on `Check`, `Next →`, `Play another` and
`Login with Discord`. Both independently found the badge-size failure from
different directions: A computed the Thai tone badges at 6.6px with their legend
at 4.95px; B measured LangBadge at 7.02px, 43 instances on the Cyrillic page.

**Where the detector was blind.** Every P0 and P1 below is invisible to static
analysis: a tab switch destroying session state, blank submissions polluting the
stats record, distractors eliminable by glyph count, a success state that renders
as a void. Deterministic tooling reads the code, not the consequence.

**Visual overlays.** Injection succeeded — mutation preflight passed,
`live-server.mjs` served `detect.js` on port 8400, and ~60 `impeccable` console
findings corroborated the URL scans 1:1. The server was stopped afterward. The
overlay is no longer live in the browser, so there is no persistent visual layer
to look at now.

## Overall Impression

The content system is world-class and the interaction system is a default quiz
wearing its colours. Everything Unillit is *for* lives in the left panel — the
shape taxonomy, the final-consonant annotations, the recognition ordering. The
right panel, where the user actually spends their attention, was built to a
generic template and never taught what the left panel knows.

The single biggest opportunity is not a visual one: **make the two panels talk to
each other.** PRODUCT.md's third positioning claim is that sheet and quiz sit
side by side "so recognition is built in one place." They are adjacent, not
connected. At the exact moment they should couple — you just failed to tell ธ
from ฐ — the design does nothing.

## What's Working

**The shape sheet is the product's thesis in one artefact.** *Crates*, *Pacman
ghosts — side gap*, *Squiggles — N-like* is a taxonomy no linguistics resource
would produce and no template could generate. It works because it optimises for
the only question the user actually has — "which of these am I looking at?" — and
because cells carry initial *and* final romanisation (`b / –p`) side by side,
which is precisely the information that changes a transliteration.

**The Two Registers Rule is genuinely implemented, not just documented.**
Measured: toolbar pills 23px tall with 11px text and a hairline on transparent;
quiz buttons 37px tall with 13px text on filled Signal Teal; MC choices 14px on
white. The chrome recedes and the quiz is inhabitable. Most systems flatten this
distinction in the name of consistency.

**The type-in feedback vocabulary is precise.** Four distinct states — exact,
fuzzy-accepted, wrong, blank — each with its own pastel ground, deliberately
olive-tinted for "almost" so it reads as neither correct nor brand. Striking
through the rejected input shows users their own error rather than erasing it,
and deleting the answer-key row on an exact match instead of showing a redundant
"correct!" is a real editorial decision.

## Priority Issues

### [P0] Opening STATS silently destroys the run in progress

**Why it matters.** `QuizShell.vue` renders `QuizPanel` behind `v-if`. Switching
to STATS or RUNS unmounts it; returning remounts and the immediate `watch` starts
a fresh session. Verified: 5/77 → STATS → QUIZ → 0/77, no warning, no recovery.
The bottom bar presents QUIZ/STATS/RUNS as three peer tabs of equal weight, so
the affordance actively invites the click that destroys the work. A user 30
questions into a 44-question run loses all of it for checking their accuracy.

**Fix.** Switch `v-if` to `v-show` on `QuizPanel`, or hoist the session into a
composable keyed by dataset, so the run survives tab switches. Separately, guard
the sampling-mode and count watchers behind a confirm when `index > 0`.

**Suggested command:** `/impeccable harden`

### [P0] The success condition is the emptiest screen — and on Cyrillic its control is off-screen

**Why it matters.** PRODUCT.md calls *None* the training-wheels-off step and says
the product "must always offer it." Two failures of that commitment:

(a) `.panels.info-none` collapses to `auto 1fr` only inside
`@media (width <= 768px)`. At 1440×900 — the scene PRODUCT.md says design serves
first — *None* leaves a 700×850px blank half-screen and the quiz gains nothing.
Mobile handles this correctly; desktop does not.

(b) Verified in the live DOM at 1440×900: the Cyrillic info tab bar overflows by
**138px**, and the *None* tab sits at x=731–781 against a nav right edge of 659 —
entirely off-screen, with `scrollbar-width: none` and only a `mask-image` fade as
a cue. A mouse-only user has no affordance to reach it.

The user is visually punished for graduating, on the one script where they can
reach the reward at all.

**Fix.** Move the `info-none` collapse out of the media query so the info panel
shrinks to its tab strip on desktop. Pull *None* out of the scrolling tab list
into a fixed control pinned beside Link, so it can never scroll away and reads as
the mode switch it is rather than a seventh sheet.

**Suggested command:** `/impeccable adapt`

### [P1] The quiz pollutes its own learning record

**Why it matters.** Two mechanisms, one consequence — the data driving Revision
mode is wrong.

`TypeInQuiz.handleSubmit()` has no empty guard: pressing Enter on an empty input
scores a blank answer wrong, advances the counter, and writes it to
`quiz_answers`. Because Enter also advances from the previous card, an over-eager
double-tap burns a question. There is no undo.

`MultipleChoiceQuiz.buildChoices()` draws four distractors at random from the
whole dataset with no similarity constraint. Observed: อุบลราชธานี (6 syllables)
against *Trang*, *Roi Et*, *Kalasin*, *Ubon Ratchathani*, *Nakhon Ratchasima* —
two options eliminable by glyph count alone, without reading a character. So the
mode PRODUCT.md names as the beginner on-ramp trains length-guessing, and inflates
the accuracy record that targets revision.

**Fix.** Disable Check and ignore Enter when the trimmed input is empty; add an
explicit `Reveal` button if a deliberate "I don't know" is wanted. Weight
distractor selection toward prompts of similar source length (±1 glyph) and,
for toponyms, toward answers sharing a leading syllable. The data already
contains the confusion pairs — the hints name them.

**Suggested command:** `/impeccable harden`

### [P1] The teaching payload is the weakest element on the card, and the panels never couple

**Why it matters.** After a wrong answer, `.hint` renders at 16px `--c-muted`,
centred, beneath the feedback rows — and its discriminating glyphs ("no head (vs
ธ), no pedestal (vs ฐ)") render at 16px against a 64px prompt, in a product about
telling shapes apart. There is also no path from the missed letter to its sheet
entry; the left panel does not react to the quiz at all.

Compounding it: the card body is `margin: auto`, so when feedback appears the
prompt glyph **jumps upward** — measured 463px → 391px on a wrong answer. The
glyph you are being asked to memorise physically moves at the instant you need to
compare it, 88 times over a 44-question run.

**Fix.** Promote the hint to the card's primary post-answer content: set its
comparison glyphs at specimen size (or at least 32px) in the active script font,
ruled as a term row rather than a caption. Make the referenced characters
clickable — clicking ฐ switches the info panel to the shape sheet and scrolls to
that cell. That is the two-panel promise actually delivered. Reserve the card's
vertical space so feedback doesn't move the prompt.

**Suggested command:** `/impeccable layout`

### [P2] Measurable accessibility failures that contradict DESIGN.md's own reasoning

**Why it matters.** PRODUCT.md states WCAG AA is "an established working
constraint, already reasoned about in the token layer." These are the cases the
reasoning missed — and both assessments found the first one independently.

- **White on Signal Teal = 4.06:1 / 4.1:1** at 13px, below AA. That is `Check`,
  `Next →`, `Play another`, `Login with Discord` — every primary action.
  DESIGN.md reasons carefully about Signal Teal *as text on* Warm Sheet (3.9:1)
  and never checks the reverse case.
- **Mint Rule on Cell White = 1.46:1**, against WCAG 1.4.11's 3:1 for control
  boundaries. With the No-Shadow Rule in force, hairlines are the entire
  vocabulary of separation — so the depth system is invisible to low-vision users.
- **Badges compute to 6.6–7.02px**, and the legend decoding them to 4.95px. The
  key is set smaller than the thing it explains. 43 instances on Cyrillic alone.
- **No `aria-live` anywhere** in `src/` (grepped: zero hits). Submitting an answer
  announces nothing; focus then lands on a button labelled only "Next", so a
  screen-reader user advances without ever learning whether they were right.
- **Multiple-choice correctness is red/green border and fill with no icon** — the
  type-in mode's ✓/✗ are not carried over.

**Fix.** Darken the primary button fill to Highway Green (`#006747`, 6.93:1
reversed) and let Signal Teal keep fills that carry no text — progress bar, focus
ring, `accent-color`. Add a second, darker mint (~`#8fbba3`, ≈3:1) for
*interactive* boundaries only, keeping `#c2dccb` for sheet rules where 1.4.11
doesn't apply. Wrap the feedback block in `role="status"`. Carry ✓/✗ into the MC
choice states.

**Suggested command:** `/impeccable harden`

## Persona Red Flags

**The studying GeoGuessr player (primary).** Opens `/scripts/thai` between rounds
and lands on **1286 words across 14 sections, 4.1 screens of scroll, no index** —
the longest prose in a product that sells itself on being shorter than every
competitor. The two sheets that serve them are tabs 2 and 3. When they scroll to
*Parsing strategy*, flip to Alphabet to check ฐ, and flip back, the tips panel
**returns to scroll position 0** (`:key="activeIndex"` forces a remount) — and
that swapping is the product's own documented working pattern. When they finish a
44-question run they get `0 / 2` in 3rem and no list of what they missed, so the
next run reshuffles all 44 including the 40 they already know.

**The traveller (secondary).** Arrives on a phone at 390×844. The 40px script rail
permanently eats 10% of the width for glyph-only icons. The info tab bar truncates
at "Alpha…" — Alphabet, Identify by shape and None all sit behind the Link button,
reachable only by horizontal swipe on a bar with hidden scrollbars. The detector
independently found **11–12 text-occlusion hits** at this width, where the header,
toolbar and answer input cover list and table text. The pills they need to tap are
23px high.

**The colour-blind learner (deuteranopia, ~5% of men — and GeoGuessr's audience
skews heavily male).** In multiple choice, wrong and correct are distinguished
*only* by red-vs-green border and fill, no icon. `Trang` and `Ubon Ratchathani`
after a wrong guess look identical; the dimmed options read as the only
difference. The type-in mode, three clicks away, gets ✓/✗ and a strikethrough.
They cannot use the mode PRODUCT.md recommends to beginners.

**The screen-reader user.** Two `<h1>`s, one completely empty. Two unlabelled
`role="tablist"`s. `.progress-bar` is a bare `<div>` with no `role="progressbar"`.
The count input has no label. Submitting an answer produces no announcement at
all — no live region exists in the codebase — so they hear silence, then focus
lands on "Next". The product is unusable for its stated purpose.

## Minor Observations

- `ScriptView.vue:83` passes `config.infoHeaderEnd` to the **practice** panel, so
  the prop named "info" renders the font picker on the right. Not visually wrong
  (the font affects both panels) but it will mislead the next person adding a script.
- The Alphabet sheet is headed `CONSONANTS — TRADITIONAL ALPHABETICAL ORDER` while
  PRODUCT.md's first positioning bullet is "never by alphabetic order." The honest
  labelling is admirable, but the alphabetical sheet is tab 2 and the
  recognition-ordered one is tab 3.
- The Alphabet sheet spends a `MID`/`HIGH`/`LOW` badge on all 44 consonants for
  tone class — which the reading tips themselves say is "not preserved in the
  common transliteration (RTGS)." By the product's own doctrine that content earns
  its place by changing a transliteration, the noisiest column on the densest
  sheet changes nothing.
- The shape sheet uses `VOW`, `RARE`, `OBS`, `S`, `L` with **no legend at all** —
  the Alphabet sheet has one; the shape sheet doesn't.
- `[beta, set will change]` renders in the Cyrillic quiz card on every one of 66
  questions. PRODUCT.md is explicit that maturity is stated by the per-script
  badge, which the sidebar already carries.
- Mode pills appear and disappear between tabs: Consonants/Vowels/All vowels are
  `modes: ['typein']`, so a user following PRODUCT.md's documented "jump in head
  first" strategy opens Consonants and finds multiple choice doesn't exist, with
  no explanation.
- `StatsPanel.vue` computes `masteredPrompts` from exactly PRODUCT.md's criteria
  — typein, `infoSheet === 'None'`, zero errors, within 30 days — and renders it
  as a 🤓 in a 20px table cell, behind a tab, for logged-in users only. The
  product knows precisely when the user has succeeded and says nothing at the
  moment it happens.
- `StatsPanel.vue:324` `#c8952a` is the one genuinely undocumented colour outside
  the CharBadge taxonomy.
- `.tab:focus-visible { outline-offset: -2px }` is correctly and consistently
  applied. `autocomplete/autocorrect/spellcheck` all off on the answer input,
  because the browser must not help transliterate. Exactly right.

---

## Corrections after author review (2026-08-04)

The findings above stand except where noted here. These are author corrections
of fact and framing, not disagreements of taste.

### Withdrawn

**"Blank submits are accepted and permanently scored" — the proposed fix was
wrong.** An empty answer is a *valid* answer: some characters transliterate to
nothing. Thai's silent carrier อ already ships `answer: ['o', '-', '']`, and the
Cyrillic hard/soft signs are the same case. A non-empty guard on single-character
quizzes would make correct answers unsubmittable — a net regression. The
defensible version is a minimum only on datasets whose answers are always
multi-character (toponyms, syllables), derived from the dataset rather than
applied globally. The double-Enter-burns-a-question observation still stands on
its own. Recorded in PRODUCT.md under Capabilities and Constraints.

**"The shape sheet has no legend."** Withdrawn. The badges are secondary metadata
on a sheet whose job is shape grouping; they do not need explaining for the sheet
to do its work. The legibility finding (6.6px badges, 4.95px legend on the
*Alphabet* sheet) is unaffected and stands.

**Question 6, "is Copy results a feature this product wants?"** Answered: yes.
It exists so users can compare results on Discord, since the product has no
social features and none are planned. It is unrefined and sillier than the rest
of the product's voice, worth occasional polish, explicitly not worth major
investment. The Duolingo-reflex framing overstated the problem.

### Downgraded

**P0 "The success condition is the emptiest screen" → P2.** The report
overweighted *None*, and so did PRODUCT.md (since corrected). *None* is the end
goal, but not where users are expected to spend time — by the time they live
there they are close to not needing the app, and plain quizzes without a lookup
are abundant elsewhere. Most of the product's value lands during the learning
phase. Sub-finding (b), the off-screen *None* tab on Cyrillic, dissolves on its
own: those tabs are work-in-progress and the intended end state is ~3 lookup
sheets, which brings *None* back into the visible strip. Sub-finding (a), the
desktop `info-none` void, remains real but is a polish item.

**P1 "Multiple-choice distractors are unmatched" → P2.** The mechanism is real
and confusable distractors remain a good idea. But the claimed consequence was
overstated: user testing shows people do decipher the first character in MC and
pick up the characters over time, rather than eliminating by glyph count. So the
mode is not "measuring nothing."

**P1 "the panels never couple" — half withdrawn.** Making hint characters
navigate to their sheet cell is *against* the product's design: the info panel's
purpose is to be looked things up in, and repeated searching is what produces the
memorisation. Auto-steering would remove the exercise. Any guided highlighting
belongs in a possible tutorial mode, not the primary flow. The other half —
promoting the hint's prominence and setting its comparison glyphs larger —
is accepted and remains P1.

**Heuristic 10 (Help and Documentation), and the reading-tips length framing.**
"Longest prose in a product that sells itself on being shorter" was an unfair
comparison. The benchmark is not a 2,000-word article; it is the ~200-page
"Learning to Read Thai for GeoGuessr" community doc plus ~50 pages of appendices,
and full learn-the-language courses. Against those, ~1,300 words *is* radical
condensation, and introducing concepts to a total newcomer legitimately takes
words. The navigability findings are independent of length and still stand: no
index, and scroll position resetting to 0 on every info-tab switch.

**"Never by alphabetic order."** That phrasing was written into PRODUCT.md during
the documentation pass and was too strong. Recognition ordering is the organising
principle and the differentiator, not an absolute ban; a traditional-order sheet
can earn a place as a secondary reference. PRODUCT.md corrected. The observation
that the alphabetical sheet is tab 2 and the recognition sheet tab 3 is noted by
the author as worth revisiting.

### Accepted and confirmed

- The quiz panel is generic where it could be product-specific — accepted as a
  real direction, not just a critique.
- The Tailwind default palette in `CharBadge.vue`.
- Highlighting hints after answers; listing errors on completion; ✓/✗ icons for
  colour-blind users in multiple choice; less run-resetting, with a warning on
  mode switch mid-run.
- Confusable-by-design MC distractors as a good idea to try.
- The missing multiple-choice mode is genuinely confusing; a disabled pill with
  a tooltip is the intended fix.

### Superseded

The white-on-Signal-Teal contrast finding is superseded by the full two-system
contrast table now in DESIGN.md. WCAG 2.x mis-ranks this palette: white on Signal
Teal is APCA Lc −72.8 (fine), while black — which WCAG scores *higher* — is
Lc +36.8 (unreadable). No change is needed to the primary button.
