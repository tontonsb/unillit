// Regenerates the tables in docs/badge-palette-options.md.
//
//   node tools/badge-palette.mjs            full report
//   node tools/badge-palette.mjs --hues 12  optimise and print a 12-hue set
//
// The WCAG/APCA pair is duplicated from tools/contrast.mjs rather than imported:
// that file prints its report on load, so importing it would emit DESIGN.md's
// contrast table alongside this one. Both copies run the same validation gate.

const arg = n => {
	const i = process.argv.indexOf(n)
	return i < 0 ? null : process.argv[i + 1]
}

const hex = h => {
	const c = h.replace('#', '')
	return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16))
}

const toHex = a => '#' + a
	.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
	.join('')

const lin = v => {
	const s = v / 255
	return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const unlin = v => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055) * 255

// --- WCAG 2.x ---
const wcagLum = h => {
	const [r, g, b] = hex(h).map(lin)
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const wcag = (txt, bg) => {
	const a = wcagLum(txt), b = wcagLum(bg)
	const [hi, lo] = a > b ? [a, b] : [b, a]
	return (hi + 0.05) / (lo + 0.05)
}

// --- APCA 0.98G-4g. Power curve, not the sRGB piecewise transfer function ---
const apcaY = h => {
	const [r, g, b] = hex(h).map(v => (v / 255) ** 2.4)
	const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b
	return y < 0.022 ? y + (0.022 - y) ** 1.414 : y
}

const apca = (txt, bg) => {
	const Ytxt = apcaY(txt), Ybg = apcaY(bg)
	if (Math.abs(Ybg - Ytxt) < 0.0005) return 0

	let out
	if (Ybg > Ytxt) {
		const s = (Ybg ** 0.56 - Ytxt ** 0.57) * 1.14
		out = s < 0.1 ? 0 : s - 0.027
	} else {
		const s = (Ybg ** 0.65 - Ytxt ** 0.62) * 1.14
		out = s > -0.1 ? 0 : s + 0.027
	}

	return out * 100
}

// --- OKLab / OKLCH, for building palettes at a fixed lightness ---
const oklab2srgb = ([L, a, b2]) => {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b2) ** 3
	const m = (L - 0.1055613458 * a - 0.0638541728 * b2) ** 3
	const s = (L - 0.0894841775 * a - 1.2914855480 * b2) ** 3

	return [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
	].map(unlin)
}

const srgb2oklab = h => {
	const [r, g, b] = hex(h).map(lin)
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

	return [
		0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
		1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
		0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
	]
}

const oklch = h => {
	const [L, a, b] = srgb2oklab(h)
	return [L, Math.hypot(a, b), (Math.atan2(b, a) * 180 / Math.PI + 360) % 360]
}

const inGamut = r => r.every(v => v >= -0.5 && v <= 255.5)

const lch = (L, C, H) => {
	const rad = H * Math.PI / 180
	let lo = 0, hi = C
	if (inGamut(oklab2srgb([L, C * Math.cos(rad), C * Math.sin(rad)]))) lo = C
	else for (let i = 0; i < 24; i++) {
		const m = (lo + hi) / 2
		inGamut(oklab2srgb([L, m * Math.cos(rad), m * Math.sin(rad)])) ? lo = m : hi = m
	}

	return toHex(oklab2srgb([L, lo * Math.cos(rad), lo * Math.sin(rad)]))
}

const maxC = (L, H) => {
	const rad = H * Math.PI / 180
	let lo = 0, hi = 0.4
	for (let i = 0; i < 24; i++) {
		const m = (lo + hi) / 2
		inGamut(oklab2srgb([L, m * Math.cos(rad), m * Math.sin(rad)])) ? lo = m : hi = m
	}

	return lo
}

// --- CIEDE2000, for "can a reader tell these two apart" ---
const cielab = h => {
	const [r, g, b] = hex(h).map(lin)
	const X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
	const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b
	const Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
	const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116)

	return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]
}

const dE2000 = (h1, h2) => {
	const [L1, a1, b1] = cielab(h1), [L2, a2, b2] = cielab(h2)
	const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2)
	const G = 0.5 * (1 - Math.sqrt(((C1 + C2) / 2) ** 7 / (((C1 + C2) / 2) ** 7 + 25 ** 7)))
	const A1 = a1 * (1 + G), A2 = a2 * (1 + G)
	const Cp1 = Math.hypot(A1, b1), Cp2 = Math.hypot(A2, b2)
	const ang = (x, y) => {
		if (!x && !y) return 0
		const t = Math.atan2(y, x) * 180 / Math.PI
		return t < 0 ? t + 360 : t
	}
	const hp1 = ang(A1, b1), hp2 = ang(A2, b2)
	const dL = L2 - L1, dC = Cp2 - Cp1

	let dh = 0
	if (Cp1 * Cp2) {
		dh = hp2 - hp1
		if (dh > 180) dh -= 360
		else if (dh < -180) dh += 360
	}

	const dH = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin(dh * Math.PI / 360)
	const Lb = (L1 + L2) / 2, Cpb = (Cp1 + Cp2) / 2

	let hb
	if (!(Cp1 * Cp2)) hb = hp1 + hp2
	else {
		hb = hp1 + hp2
		if (Math.abs(hp1 - hp2) > 180) hb += hb < 360 ? 360 : -360
		hb /= 2
	}

	const T = 1 - 0.17 * Math.cos((hb - 30) * Math.PI / 180)
		+ 0.24 * Math.cos(2 * hb * Math.PI / 180)
		+ 0.32 * Math.cos((3 * hb + 6) * Math.PI / 180)
		- 0.20 * Math.cos((4 * hb - 63) * Math.PI / 180)
	const Sl = 1 + 0.015 * (Lb - 50) ** 2 / Math.sqrt(20 + (Lb - 50) ** 2)
	const Sc = 1 + 0.045 * Cpb
	const Sh = 1 + 0.015 * Cpb * T
	const Rt = -2 * Math.sqrt(Cpb ** 7 / (Cpb ** 7 + 25 ** 7))
		* Math.sin(60 * Math.exp(-(((hb - 275) / 25) ** 2)) * Math.PI / 180)

	return Math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh))
}

const closest = list => {
	const uniq = [...new Set(list)]
	let min = Infinity, pair = null
	for (let i = 0; i < uniq.length; i++) {
		for (let j = i + 1; j < uniq.length; j++) {
			const d = dE2000(uniq[i], uniq[j])
			if (d < min) { min = d; pair = [uniq[i], uniq[j]] }
		}
	}

	return { min: min === Infinity ? 0 : min, pair }
}

// --- validation, same reference points as tools/contrast.mjs ---
const checks = [
	['#ffffff', '#0a8f6f', -72.8],
	['#000000', '#0a8f6f', 36.8],
	['#242b26', '#fafaf8', 98.2],
]

console.log('VALIDATION (target from apcacontrast.com)')
let sound = true
for (const [t, b, want] of checks) {
	const got = apca(t, b)
	const pass = Math.abs(got - want) < 0.5
	if (!pass) sound = false
	console.log(`  ${t} on ${b}: got ${got.toFixed(1)}, want ${want}  ${pass ? 'MATCH' : 'MISMATCH'}`)
}
console.log(sound ? '  → implementation validated\n' : '  → DO NOT TRUST OUTPUT\n')

// --- the palettes as they ship ---
const D3 = [
	'#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728',
	'#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2',
	'#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5',
]

const CODES = [
	'ru', 'uk', 'be', 'rue', 'bg', 'sr', 'mk', 'kk', 'ky', 'uz', 'ba', 'tt',
	'cv', 'sah', 'tyv', 'tg', 'os', 'mn', 'bua', 'xal', 'mhr', 'udm', 'kv', 'ab', 'ce',
]

// fill, ink, border — CharBadge.vue
const TAGS = {
	obsolete: ['#fde8d8', '#9a3412', '#fca97e'],
	rare: ['#fef9c3', '#854d0e', '#fde047'],
	vowel: ['#ede9fe', '#5b21b6', '#c4b5fd'],
	short: ['#fef3c7', '#b45309', '#fcd34d'],
	long: ['#e8f0fe', '#1a56a0', '#a8c4f0'],
	mid: ['#ddeaf5', '#1a5c8a', '#a9c9e2'],
	high: ['#fbe5e7', '#a52834', '#f0b3ba'],
	low: ['#e3f2e5', '#2e7d32', '#abd5af'],
}

const GROUNDS = { 'Cell White': '#ffffff', 'Warm Sheet': '#fafaf8', 'Mint Wash': '#e3f3ec' }
const INK = '#242b26'
const BRAND = ['#006747', '#0a8f6f', '#3a7d44']

// --- recipes. C/D/E are hue-parameterised, so they regenerate at any set size ---
const yiqPick = bg => {
	const [r, g, b] = hex(bg)
	return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? '#222222' : '#ffffff'
}

const better = (bg, a, b) => (wcag(a, bg) >= wcag(b, bg) ? a : b)

const RECIPES = {
	C: H => ({
		fill: lch(0.94, Math.min(0.055, maxC(0.94, H)), H),
		ink: lch(0.45, Math.min(0.13, maxC(0.45, H)), H),
		line: lch(0.80, Math.min(0.10, maxC(0.80, H)), H),
	}),
	D: H => ({ fill: lch(0.93, Math.min(0.045, maxC(0.93, H)), H), ink: INK, line: lch(0.62, maxC(0.62, H), H) }),
	E: H => ({ fill: lch(0.87, Math.min(0.075, maxC(0.87, H)), H), ink: INK, line: lch(0.62, maxC(0.62, H), H) }),
}

// Greedy farthest-point over integer hues, restarted across the wheel. Every hue is
// held away from the brand greens so a category never reads as the accent.
const pickHues = (n, apart = 18) => {
	const pool = Array.from({ length: 360 }, (_, i) => i)
		.filter(H => BRAND.every(b => dE2000(lch(0.62, maxC(0.62, H), H), b) >= apart))

	let best = null, bestScore = -1
	for (let start = 0; start < pool.length; start += 7) {
		const sel = [pool[start]]
		while (sel.length < n) {
			let pick = null, score = -1
			for (const H of pool) {
				if (sel.includes(H)) continue
				const s = Math.min(...sel.map(x => dE2000(lch(0.62, maxC(0.62, x), x), lch(0.62, maxC(0.62, H), H))))
				if (s > score) { score = s; pick = H }
			}
			sel.push(pick)
		}
		const s = closest(sel.map(H => lch(0.62, maxC(0.62, H), H))).min
		if (s > bestScore) { bestScore = s; best = sel.sort((a, b) => a - b) }
	}

	return { hues: best, sep: bestScore }
}

const f2 = v => v.toFixed(2)
const f0 = v => Math.round(v)

// --- a named set, on request ---
const wanted = arg('--hues')
if (wanted) {
	const n = Number(wanted)
	const { hues, sep } = pickHues(n)
	console.log(`## ${n}-hue set — closest pair dE2000 ${f2(sep)}\n`)
	console.log('| Hue | Border | Fill | Border vs Cell | Border vs Mint | Ink on fill |')
	console.log('|---|---|---|---|---|---|')
	for (const H of hues) {
		const r = RECIPES.D(H)
		console.log(`| ${H} | \`${r.line}\` | \`${r.fill}\` | ${f2(wcag(r.line, GROUNDS['Cell White']))}`
			+ ` | ${f2(wcag(r.line, GROUNDS['Mint Wash']))} | ${f2(wcag(INK, r.fill))}:1 |`)
	}
	const seps = BRAND.map(b => Math.min(...hues.map(H => dE2000(lch(0.62, maxC(0.62, H), H), b))))
	console.log(`\nBrand separation: ${seps.map(f2).join(' / ')} (Highway Green / Signal Teal / Tally Good)`)
	process.exit(0)
}

// --- what ships today ---
console.log('## LangBadge as it ships\n')
console.log('| Code | Swatch | Ink now | WCAG | APCA Lc | Better ink | Note |')
console.log('|---|---|---|---|---|---|---|')
const seen = new Map()
for (const [i, code] of CODES.entries()) {
	const bg = D3[i % D3.length]
	const now = yiqPick(bg)
	const best = better(bg, '#ffffff', '#000000')
	const dup = seen.has(bg) ? `same swatch as \`${seen.get(bg)}\`` : (seen.set(bg, code), '')
	const w = wcag(now, bg)
	console.log(`| ${code} | \`${bg}\` | ${now} | ${f2(w)}:1${w < 4.5 ? ' **fail**' : ''}`
		+ ` | ${f0(apca(now, bg))} | ${best} ${f2(wcag(best, bg))}:1 | ${dup} |`)
}

console.log('\n## CharBadge as it ships — the label is fine, the chip is not\n')
console.log('| Tag | Ink on fill | APCA Lc | Border vs fill | Fill vs Cell | Fill vs Mint | Border vs Mint |')
console.log('|---|---|---|---|---|---|---|')
for (const [t, [fill, ink, line]] of Object.entries(TAGS)) {
	console.log(`| ${t} | ${f2(wcag(ink, fill))}:1 | ${f0(apca(ink, fill))} | ${f2(wcag(line, fill))}`
		+ ` | ${f2(wcag(fill, GROUNDS['Cell White']))} | ${f2(wcag(fill, GROUNDS['Mint Wash']))}`
		+ ` | ${f2(wcag(line, GROUNDS['Mint Wash']))} |`)
}
console.log(`\nFills closest pair dE2000 ${f2(closest(Object.values(TAGS).map(t => t[0])).min)},`
	+ ` borders ${f2(closest(Object.values(TAGS).map(t => t[2])).min)}.`
	+ ' WCAG 1.4.11 wants 3:1 for a boundary that carries meaning.')

console.log('\n## Chroma available at each lightness\n')
console.log('| Lightness | Max chroma across hues | Contrast vs Cell White |')
console.log('|---|---|---|')
for (const L of [0.96, 0.93, 0.88, 0.80, 0.70, 0.62, 0.55]) {
	const cs = Array.from({ length: 36 }, (_, i) => maxC(L, i * 10))
	console.log(`| ${f2(L)} | ${f2(Math.min(...cs))} – ${f2(Math.max(...cs))}`
		+ ` | ${f2(wcag(lch(L, 0.1, 250), GROUNDS['Cell White']))}:1 |`)
}

console.log('\n## Capacity — closest-pair dE2000 as the set grows\n')
console.log('| Categories | Hue in a saturated border | Hue in a tinted fill |')
console.log('|---|---|---|')
for (const n of [8, 10, 12, 14, 16, 20, 25]) {
	const hs = Array.from({ length: n }, (_, i) => i * 360 / n)
	const line = closest(hs.map(H => lch(0.62, maxC(0.62, H), H))).min
	const fill = closest(hs.map(H => lch(0.94, Math.min(0.055, maxC(0.94, H)), H))).min
	console.log(`| ${n} | ${f2(line)} | ${f2(fill)} |`)
}
console.log(`\nShipped baselines: LangBadge 20 fills ${f2(closest(D3).min)},`
	+ ` CharBadge 8 fills ${f2(closest(Object.values(TAGS).map(t => t[0])).min)},`
	+ ` its 8 borders ${f2(closest(Object.values(TAGS).map(t => t[2])).min)}.`)

console.log('\n## Options, over the 25 language codes\n')
const { hues: TEN } = pickHues(10)
const build = key => {
	if (key === 'A') return CODES.map((_, i) => ({ fill: D3[i % D3.length], ink: yiqPick(D3[i % D3.length]), line: null }))
	if (key === 'B') return CODES.map((_, i) => ({ fill: D3[i % D3.length], ink: better(D3[i % D3.length], '#ffffff', '#000000'), line: null }))
	return CODES.map((_, i) => RECIPES[key](TEN[i % TEN.length]))
}

const LABEL = {
	A: 'ships today',
	B: 'same fills, label = better of white/black',
	C: 'tint fill + same-hue dark ink + mid border',
	D: 'near-white fill + one dark ink + saturated border',
	E: 'as D, fill dark enough to read as filled',
}

console.log('| | Recipe | Labels failing AA | Label contrast | APCA Lc | Closest dE | Chip edge vs Cell |')
console.log('|---|---|---|---|---|---|---|')
for (const key of ['A', 'B', 'C', 'D', 'E']) {
	const set = build(key)
	const ws = set.map(b => wcag(b.ink, b.fill))
	const ls = set.map(b => Math.abs(apca(b.ink, b.fill)))
	const carriers = set.map(b => b.line ?? b.fill)
	const edge = set.map(b => wcag(b.line ?? b.fill, GROUNDS['Cell White']))
	const fails = ws.filter(w => w < 4.5).length
	console.log(`| **${key}** | ${LABEL[key]} | ${fails ? `${fails} of 25` : 'none'}`
		+ ` | ${f2(Math.min(...ws))}–${f2(Math.max(...ws))}:1`
		+ ` | ${f0(Math.min(...ls))}–${f0(Math.max(...ls))}`
		+ ` | ${f2(closest(carriers).min)} | ${f2(Math.min(...edge))}:1 |`)
}

console.log('\nD3 Category 20 is 10 hues x 2 lightnesses; its own pairs measure'
	+ ` ${f2(Math.min(...Array.from({ length: 10 }, (_, i) => wcag(D3[i * 2], D3[i * 2 + 1]))))}`
	+ `–${f2(Math.max(...Array.from({ length: 10 }, (_, i) => wcag(D3[i * 2], D3[i * 2 + 1]))))}:1`
	+ ' as ink on fill, so the pairing cannot be reused for text.')
