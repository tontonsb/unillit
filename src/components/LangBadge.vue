<script setup lang="ts">
// Used as <l-b ru uk be ry /> — each bare attribute is a language code.
// Unknown codes still render (neutral colour, code as the title).
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

// full names for the title tooltip
const NAMES: Record<string, string> = {
	ru: 'Russian', uk: 'Ukrainian', be: 'Belarusian', rue: 'Rusyn',
	bg: 'Bulgarian', sr: 'Serbian', mk: 'Macedonian',
	kk: 'Kazakh', ky: 'Kyrgyz', uz: 'Uzbek', ba: 'Bashkir',
	tt: 'Tatar', cv: 'Chuvash', sah: 'Yakut', tyv: 'Tuvan',
	tg: 'Tajik', os: 'Ossetian',
	mn: 'Mongolian', bua: 'Buryat', xal: 'Kalmyk',
	mhr: 'Mari', udm: 'Udmurt', kv: 'Komi',
	ab: 'Abkhaz', ce: 'Chechen',
}

// colours assigned from D3 category20 by this fixed order
const ORDER = [
	'ru', 'uk', 'be', 'rue', 'bg', 'sr', 'mk', 'kk', 'ky', 'uz', 'ba', 'tt',
	'cv', 'sah', 'tyv', 'tg', 'os', 'mn', 'bua', 'xal', 'mhr', 'udm', 'kv', 'ab', 'ce',
]

const D3_CATEGORY20 = [
	'#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728',
	'#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2',
	'#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5',
]

const FALLBACK = '#777777'

const COLORS: Record<string, string> = Object.fromEntries(
	ORDER.map((code, i) => [code, D3_CATEGORY20[i % D3_CATEGORY20.length]!]),
)

const attrs = useAttrs()

const codes = computed(() => Object.keys(attrs).filter(k => attrs[k] !== false))

function colorFor(code: string): string {
	return COLORS[code] ?? FALLBACK
}

function nameFor(code: string): string {
	return NAMES[code] ?? code.toUpperCase()
}

// readable text colour for a given background
function textOn(hex: string): string {
	const c = hex.replace('#', '')
	const r = parseInt(c.slice(0, 2), 16)
	const g = parseInt(c.slice(2, 4), 16)
	const b = parseInt(c.slice(4, 6), 16)
	const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return lum > 0.6 ? '#222' : '#fff'
}
</script>

<template><span
	v-for="c in codes"
	:key="c"
	class="lang"
	:style="{ background: colorFor(c), color: textOn(colorFor(c)) }"
	:title="nameFor(c)"
>{{ c.toUpperCase() }}</span></template>

<style scoped>
.lang {
	display: inline-block;
	font-size: 0.6em;
	font-weight: 700;
	letter-spacing: 0.04em;
	border-radius: var(--radius-sm);
	padding: 0 3px;
	line-height: 1.5;
	vertical-align: middle;
	cursor: help;
}

.lang + .lang { margin-left: 2px; }
</style>
