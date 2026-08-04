// WCAG 2.x ratio + APCA 0.98G-4g Lc, computed locally.

const hex = h => {
	const c = h.replace('#', '')
	return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16))
}

// --- WCAG 2.x: piecewise sRGB linearisation ---
const wcagLum = h => {
	const [r, g, b] = hex(h).map(v => {
		const s = v / 255
		return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
	})
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const wcag = (txt, bg) => {
	const a = wcagLum(txt), b = wcagLum(bg)
	const [hi, lo] = a > b ? [a, b] : [b, a]
	return (hi + 0.05) / (lo + 0.05)
}

// --- APCA 0.98G-4g ---
const M = {
	trc: 2.4,
	Rco: 0.2126729, Gco: 0.7151522, Bco: 0.0721750,
	normBG: 0.56, normTXT: 0.57, revTXT: 0.62, revBG: 0.65,
	blkThrs: 0.022, blkClmp: 1.414,
	scale: 1.14, loOffset: 0.027, deltaYmin: 0.0005, loClip: 0.1,
}

// APCA uses a simple power curve, NOT the sRGB piecewise transfer function
const apcaY = h => {
	const [r, g, b] = hex(h).map(v => (v / 255) ** M.trc)
	return M.Rco * r + M.Gco * g + M.Bco * b
}

const clampBlack = y => (y < M.blkThrs ? y + (M.blkThrs - y) ** M.blkClmp : y)

const apca = (txt, bg) => {
	const Ytxt = clampBlack(apcaY(txt))
	const Ybg = clampBlack(apcaY(bg))
	if (Math.abs(Ybg - Ytxt) < M.deltaYmin) return 0

	let out
	if (Ybg > Ytxt) {                                   // dark text on light bg
		const s = (Ybg ** M.normBG - Ytxt ** M.normTXT) * M.scale
		out = s < M.loClip ? 0 : s - M.loOffset
	} else {                                            // light text on dark bg
		const s = (Ybg ** M.revBG - Ytxt ** M.revTXT) * M.scale
		out = s > -M.loClip ? 0 : s + M.loOffset
	}

	return out * 100
}

// APCA Bronze simple lookup, by absolute Lc
const verdict = lc => {
	const a = Math.abs(lc)
	if (a >= 90) return 'body text, preferred'
	if (a >= 75) return 'body text, min'
	if (a >= 60) return 'large/secondary text'
	if (a >= 45) return 'headlines, large only'
	if (a >= 30) return 'spot text only'
	if (a >= 15) return 'non-text only'
	return 'invisible'
}

const C = {
	'Cell White': '#ffffff',
	'Warm Sheet': '#fafaf8',
	'Mint Wash': '#e3f3ec',
	'Mint Rule': '#c2dccb',
	'Signal Teal': '#0a8f6f',
	'Highway Green': '#006747',
	'Deep Ink': '#242b26',
	'Body Ink': '#3e4842',
	'Faded Ink': '#67716b',
	'Pure Black': '#000000',
	'Tally Good': '#3a7d44',
	'Tally Warn': '#8a5e10',
	'Tally Bad': '#b94040',
	'Fuzzy Ink': '#5a7030',
	'Fuzzy Echo Ink': '#726c3c',
	'ok-bg': '#edf7ee',
	'wrong-bg': '#fdf0f0',
	'fuzzy-bg': '#eef5df',
	'fuzzy-user-bg': '#f5f5e8',
}

// --- validation against the user's cited APCA values ---
const checks = [
	['Cell White', 'Signal Teal', -72.8],
	['Pure Black', 'Signal Teal', 36.8],
]
console.log('VALIDATION (target from apcacontrast.com)')
let ok = true
for (const [t, b, want] of checks) {
	const got = apca(C[t], C[b])
	const pass = Math.abs(got - want) < 0.5
	if (!pass) ok = false
	console.log(`  ${t} on ${b}: got ${got.toFixed(1)}, want ${want}  ${pass ? 'MATCH' : 'MISMATCH'}`)
}
console.log(ok ? '  → implementation validated\n' : '  → DO NOT TRUST OUTPUT\n')

const pairs = [
	['-- Ink on paper --'],
	['Deep Ink', 'Warm Sheet'], ['Deep Ink', 'Cell White'],
	['Body Ink', 'Warm Sheet'], ['Body Ink', 'Cell White'],
	['Faded Ink', 'Warm Sheet'], ['Faded Ink', 'Cell White'],
	['Highway Green', 'Warm Sheet'], ['Highway Green', 'Cell White'],
	['Signal Teal', 'Warm Sheet'], ['Signal Teal', 'Cell White'],
	['-- On Mint Wash (zebra / hover / active pill) --'],
	['Deep Ink', 'Mint Wash'], ['Body Ink', 'Mint Wash'],
	['Faded Ink', 'Mint Wash'], ['Highway Green', 'Mint Wash'], ['Signal Teal', 'Mint Wash'],
	['-- Reversed on Highway Green --'],
	['Cell White', 'Highway Green'], ['Warm Sheet', 'Highway Green'],
	['Mint Wash', 'Highway Green'], ['Mint Rule', 'Highway Green'],
	['Faded Ink', 'Highway Green'], ['Body Ink', 'Highway Green'],
	['Deep Ink', 'Highway Green'], ['Pure Black', 'Highway Green'],
	['-- Reversed on Signal Teal --'],
	['Cell White', 'Signal Teal'], ['Warm Sheet', 'Signal Teal'],
	['Mint Wash', 'Signal Teal'], ['Mint Rule', 'Signal Teal'],
	['Faded Ink', 'Signal Teal'], ['Body Ink', 'Signal Teal'],
	['Deep Ink', 'Signal Teal'], ['Pure Black', 'Signal Teal'],
	['-- Status on feedback grounds --'],
	['Tally Good', 'ok-bg'], ['Tally Bad', 'wrong-bg'],
	['Fuzzy Ink', 'fuzzy-bg'], ['Fuzzy Echo Ink', 'fuzzy-user-bg'],
	['Tally Good', 'Cell White'], ['Tally Warn', 'Cell White'], ['Tally Bad', 'Cell White'],
	['-- Non-text: hairlines & rings (WCAG 1.4.11 wants 3:1) --'],
	['Mint Rule', 'Cell White'], ['Mint Rule', 'Warm Sheet'],
	['Signal Teal', 'Warm Sheet'], ['Highway Green', 'Cell White'],
	['Mint Wash', 'Cell White'], ['Mint Wash', 'Warm Sheet'],
]

console.log('| Text / mark | Ground | WCAG | APCA Lc | APCA verdict |')
console.log('|---|---|---|---|---|')
for (const p of pairs) {
	if (p.length === 1) { console.log(`| **${p[0].replace(/-- | --/g, '')}** | | | | |`); continue }
	const [t, b] = p
	const w = wcag(C[t], C[b])
	const lc = apca(C[t], C[b])
	console.log(`| ${t} \`${C[t]}\` | ${b} \`${C[b]}\` | ${w.toFixed(2)}:1 | ${lc >= 0 ? '+' : ''}${lc.toFixed(1)} | ${verdict(lc)} |`)
}
