<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { StepStatus } from '@/scripts/roadmaps'
import { relativeDate } from '@/components/quiz/utils'

const STATUS_LABEL: Record<StepStatus | 'untracked', string> = {
	fresh:     'Practiced recently',
	stale:     'Practiced over 2 weeks ago',
	never:     'Haven\'t done yet',
	untracked: '',
}

function dateTitle(date: string): string {
	return 'Last attempted on ' + new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' })
}

interface ComputedStep {
	id: string
	label: string
	hint?: string
	requires?: string[]
	placeholder?: boolean
	status: StepStatus | 'untracked'
	date: string | null
}

const props = defineProps<{ steps: ComputedStep[] }>()

const levels = computed(() => {
	const map = new Map<string, number>()
	const byId = new Map(props.steps.map(s => [s.id, s]))

	function level(id: string): number {
		if (map.has(id))
			return map.get(id)!

		const step = byId.get(id)
		const l = step?.requires?.length
			? Math.max(...step.requires.map(level)) + 1
			: 0

		map.set(id, l)

		return l
	}

	for (const s of props.steps)
		level(s.id)

	return map
})

const rows = computed(() => {
	const maxLevel = Math.max(0, ...levels.value.values())
	const result: ComputedStep[][] = Array.from({ length: maxLevel + 1 }, () => [])

	for (const step of props.steps)
		result[levels.value.get(step.id) ?? 0]!.push(step)

	return result
})

const graphEl = ref<HTMLElement | null>(null)
const stepEls = new Map<string, Element>()
const edges = ref<{ id: string, d: string }[]>([])
const svgW = ref(0)
const svgH = ref(0)

function setRef(id: string, el: unknown) {
	if (el instanceof Element) stepEls.set(id, el)
	else stepEls.delete(id)
}

function recompute() {
	const g = graphEl.value
	if (!g)
		return;

	const gr = g.getBoundingClientRect()
	svgW.value = gr.width
	svgH.value = gr.height

	const newEdges: { id: string, d: string }[] = []

	for (const step of props.steps) {
		if (step.placeholder)
			continue;

		for (const reqId of step.requires ?? []) {
			const from = stepEls.get(reqId)
			const to = stepEls.get(step.id)

			if (!from || !to)
				continue;

			const fr = from.getBoundingClientRect()
			const tr = to.getBoundingClientRect()

			const x1 = fr.left + fr.width / 2 - gr.left
			const y1 = fr.bottom - gr.top
			const x2 = tr.left + tr.width / 2 - gr.left
			const y2 = tr.top - gr.top
			const my = (y1 + y2) / 2

			newEdges.push({
				id: `${reqId}→${step.id}`,
				d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
			})
		}
	}

	edges.value = newEdges
}

let ro: ResizeObserver | null = null

onMounted(() => {
	nextTick(recompute)

	if (graphEl.value) {
		ro = new ResizeObserver(recompute)
		ro.observe(graphEl.value)
	}
})

onUnmounted(() => ro?.disconnect())
watch(() => props.steps, () => nextTick(recompute), { deep: true })
</script>

<template>
	<div class="graph" ref="graphEl">
		<svg class="edges" :viewBox="`0 0 ${svgW} ${svgH}`">
			<path
				v-for="edge in edges"
				:key="edge.id"
				:d="edge.d"
				class="edge"
			/>
		</svg>

		<div v-for="(row, i) in rows" :key="i" class="row">
			<div
				v-for="step in row"
				:key="step.id"
				class="step"
				:class="[step.status, { placeholder: step.placeholder }]"
				:ref="(el) => setRef(step.id, el)"
			>
				<template v-if="!step.placeholder">
					<div class="step-header">
						<span class="step-dot" aria-hidden="true" :title="STATUS_LABEL[step.status]"></span>
						<span v-if="step.date" class="step-date" :title="dateTitle(step.date)">
							{{ relativeDate(step.date) }}
						</span>
					</div>
					<span class="step-body">
						<span class="step-label">
							{{ step.label }}
						</span>
						<span v-if="step.hint" class="step-hint">
							{{ step.hint }}
						</span>
					</span>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
.graph {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.edges {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: visible;
}

.edge {
	fill: none;
	stroke: var(--c-border);
	stroke-width: 1.5;
}

.row {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.step {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 10px 14px;
	border: 1px solid var(--c-border);
	border-radius: 6px;
	background: var(--c-cell);
	flex: 1;
	min-width: 160px;
	max-width: 280px;
}

.step-header {
	display: flex;
	align-items: center;
	gap: 8px;
}

.step-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	flex-shrink: 0;
	border: 2px solid var(--c-border);
	background: transparent;
}

.step.fresh .step-dot     { background: #3a7d44; border-color: #3a7d44; }
.step.stale .step-dot     { background: #a07020; border-color: #a07020; }
.step.never .step-dot     { border-color: var(--c-muted); }
.step.untracked .step-dot { border-color: var(--c-border); }

.step-body {
	display: flex;
	flex-direction: column;
	gap: 3px;
}

.step-label {
	font-size: 13px;
	color: var(--c-label);
	line-height: 1.3;
}

.step.fresh .step-label { color: var(--c-head); }
.step.never .step-label { color: var(--c-muted); }

.step-hint {
	font-size: 11px;
	color: var(--c-muted);
	line-height: 1.3;
}

.step-date {
	font-size: 11px;
	color: var(--c-muted);
	white-space: nowrap;
}

.step.placeholder {
	border-color: transparent;
	background: transparent;
	pointer-events: none;
}
</style>
