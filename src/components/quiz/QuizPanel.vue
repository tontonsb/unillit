<script setup lang="ts">
import { ref, computed, watch, toRef, nextTick } from 'vue'
import type { QuizDataset, QuizMode } from './dataset'
import { useQuizSession } from './useSession'
import { useStats } from '@/composables/useStats'
import { activeFont, activeInfoSheet } from '@/composables/useScriptContext'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'
import { useAuth } from '@/composables/useAuth'
import { revisionSample } from './utils'
import TypeInQuiz from './TypeInQuiz.vue'
import MultipleChoiceQuiz from './MultipleChoiceQuiz.vue'

const props = defineProps<{
	dataset: QuizDataset
	promptClass?: string
	promptFontFamily?: string
	scriptId?: string
}>()

const {
	session, index, phase, tally, current, progress,
	startSession: _startSession, startSessionWith: _startSessionWith,
	submit: _submit, advance: _advance,
} = useQuizSession(toRef(props, 'dataset'))

const mode = ref<QuizMode>('typein')
const tolerance = ref(0)

const currentModes = computed((): QuizMode[] =>
	props.dataset.modes ?? ['typein']
)

const maxTolerance = computed(() =>
	mode.value === 'typein' ? (props.dataset.maxTolerance ?? 0) : 0
)

watch(maxTolerance, (max) => {
	if (tolerance.value > max) tolerance.value = max
})

const { user } = useAuth()

const nextBtn = ref<HTMLButtonElement | null>(null)
const loadingSession = ref(false)
let runStarted = false

const stats = computed(() =>
	props.scriptId ? useStats(props.scriptId, props.dataset.label) : null
)

function sessionCount() {
	return samplingMode.value !== 'shuffled' ? randomCount.value : null
}

async function buildRevisionSession() {
	const allStats = await (stats.value?.fetchStats() ?? Promise.resolve([]))

	const statsMap = new Map<string, { total: number, correct: number, lastCorrectAt: string | null }>()

	for (const s of allStats) {
		const existing = statsMap.get(s.prompt)

		if (existing) {
			existing.total += s.total
			existing.correct += s.correct
			if (s.lastCorrectAt && (!existing.lastCorrectAt || s.lastCorrectAt > existing.lastCorrectAt))
				existing.lastCorrectAt = s.lastCorrectAt
		} else {
			statsMap.set(s.prompt, { total: s.total, correct: s.correct, lastCorrectAt: s.lastCorrectAt })
		}
	}

	return revisionSample(props.dataset.questions, statsMap, randomCount.value)
}

async function startSession() {
	runStarted = false

	if (samplingMode.value === 'revision') {
		loadingSession.value = true
		_startSessionWith(await buildRevisionSession())
		loadingSession.value = false
	} else {
		_startSession(sessionCount())
	}
}

watch(() => props.dataset, async () => {
	const modes = currentModes.value
	mode.value = modes.includes(preferredMode.value) ? preferredMode.value : modes[0]!
	await startSession()
}, { immediate: true })

watch([samplingMode, randomCount], () => { startSession() })

function switchMode(newMode: QuizMode) {
	if (mode.value === newMode) return
	mode.value = newMode
	preferredMode.value = newMode
	startSession()
}

async function handleSubmit(correct: boolean, errors?: number) {
	_submit(correct)
	nextTick(() => nextBtn.value?.focus())
	if (current.value) {
		if (!runStarted) {
			await stats.value?.startRun(session.value.length, {
				quizType: mode.value,
				font: activeFont.value,
				infoSheet: activeInfoSheet.value,
				tolerance: tolerance.value,
			})
			runStarted = true
		}
		stats.value?.recordAnswer(current.value.prompt, correct, {
			font: activeFont.value,
			infoSheet: activeInfoSheet.value,
			tolerance: tolerance.value,
			errors,
		})
	}
}

function advance() {
	_advance()
	if (phase.value === 'done') stats.value?.completeRun()
}
</script>

<template>
	<div class="quiz-panel">
		<div class="toolbar">
			<div v-if="currentModes.length > 1" class="mode-toggle">
				<button
					v-for="m in currentModes"
					:key="m"
					type="button"
					class="pill"
					:class="{ active: mode === m }"
					@click="switchMode(m)"
				>{{ m === 'typein' ? 'Type-in' : 'Multiple choice' }}</button>
			</div>
			<div class="mode-picker">
				<button
					type="button"
					class="pill"
					:class="{ active: samplingMode === 'shuffled' }"
					@click="samplingMode = 'shuffled'"
				>Shuffled</button>
				<button
					type="button"
					class="pill"
					:class="{ active: samplingMode === 'random' }"
					@click="samplingMode = 'random'"
				>Random</button>
				<button
					v-if="user"
					type="button"
					class="pill"
					:class="{ active: samplingMode === 'revision' }"
					@click="samplingMode = 'revision'"
				>Revision</button>
				<span
					v-else
					class="pill pill-locked"
					title="Log in to store stats and use Revision mode"
				>Revision</span>
				<input
					v-if="samplingMode !== 'shuffled'"
					v-model.number="randomCount"
					type="number"
					min="1"
					class="count-input"
				>
			</div>
		</div>

		<div class="progress-row">
			<div class="progress-bar">
				<div class="progress-fill" :style="{ width: `${((index + (phase !== 'question' ? 1 : 0)) / session.length) * 100}%` }"></div>
			</div>
			<span class="progress-label">{{ progress }}</span>
			<span class="tally">
				<span class="tally-correct">✓ {{ tally.correct }}</span>
				<span class="tally-wrong">✗ {{ tally.wrong }}</span>
			</span>
		</div>

		<div v-if="loadingSession" class="card loading-card">
			<div class="card-body">
				<p class="loading-label">Loading…</p>
			</div>
		</div>

		<div v-else-if="phase === 'done'" class="card done-card">
			<div class="card-body">
				<p class="done-score">{{ tally.correct }} / {{ session.length }}</p>
				<p class="done-label">{{ tally.correct === session.length ? 'Perfect!' : 'Session complete' }}</p>
				<button type="button" class="btn-primary" @click="startSession">Play another</button>
			</div>
		</div>

		<div v-else-if="current" class="card">
			<div class="card-body">
				<div class="prompt" :class="promptClass" :style="promptFontFamily ? { fontFamily: promptFontFamily } : {}">{{ current.prompt }}</div>
				<TypeInQuiz
					v-if="mode === 'typein'"
					:current
					:phase
					:dataset="props.dataset"
					v-model="tolerance"
					@answer="handleSubmit"
				/>
				<MultipleChoiceQuiz
					v-if="mode === 'multiplechoice'"
					:current
					:phase
					:dataset="props.dataset"
					@answer="handleSubmit"
				/>
				<template v-if="phase === 'answered'">
					<p v-if="current.hint" class="hint">{{ current.hint }}</p>
					<button
						ref="nextBtn"
						type="button"
						class="btn-primary"
						@click="advance"
					>Next →</button>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
.quiz-panel {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}

.toolbar {
	display: flex;
	align-items: center;
	padding: 8px 12px;
	gap: 8px;
	flex-shrink: 0;
	border-bottom: 1px solid var(--c-border);
	background: var(--c-cell);
	overflow-x: auto;
}

.mode-toggle {
	display: flex;
	gap: 4px;
	flex-shrink: 0;
}

.mode-picker {
	display: flex;
	align-items: center;
	gap: 4px;
	flex-shrink: 0;
	margin-left: auto;
}

.count-input {
	width: 52px;
	padding: 2px 6px;
	border: 1px solid var(--c-border);
	border-radius: 12px;
	background: transparent;
	color: var(--c-label);
	font-size: 11px;
	font-family: var(--sans);
	text-align: center;
}

.count-input:focus {
	outline: none;
	border-color: var(--c-accent-ink);
}

.pill {
	padding: 3px 10px;
	border: 1px solid var(--c-border);
	border-radius: 12px;
	background: transparent;
	color: var(--c-muted);
	font-size: 11px;
	font-family: var(--sans);
	cursor: pointer;
	transition: all 0.15s;
	white-space: nowrap;
	flex-shrink: 0;
}

.pill:hover {
	color: var(--c-label);
	border-color: var(--c-label);
}

.pill-locked {
	opacity: 0.4;
	cursor: default;
}

.pill-locked:hover {
	color: var(--c-muted);
	border-color: var(--c-border);
}

.pill.active {
	background: var(--c-alt);
	border-color: var(--c-accent-ink);
	color: var(--c-head);
}

.progress-row {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 12px;
	border-bottom: 1px solid var(--c-border);
}

.progress-bar {
	flex: 1;
	height: 4px;
	background: var(--c-border);
	border-radius: 2px;
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: var(--c-accent);
	border-radius: 2px;
	transition: width 0.25s ease;
}

.progress-label {
	font-size: 11px;
	color: var(--c-muted);
	white-space: nowrap;
}

.tally {
	display: flex;
	gap: 8px;
	font-size: 11px;
}

.tally-correct { color: var(--c-good); }
.tally-wrong   { color: var(--c-bad); }

.card {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
	overflow-y: auto;
}

.card-body {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	padding: 2rem;
	margin: auto;
	width: 100%;
	box-sizing: border-box;
}

.prompt {
	font-size: 4rem;
	line-height: 1.2;
	color: var(--c-head);
	text-align: center;
}

.hint {
	font-size: 13px;
	color: var(--c-muted);
	text-align: center;
}

.btn-primary {
	padding: 8px 20px;
	border: none;
	border-radius: 4px;
	background: var(--c-accent);
	color: #fff;
	font-size: 13px;
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity 0.15s;
}

.btn-primary:hover { opacity: 0.85; }

.done-card .card-body {
	gap: 0.75rem;
	text-align: center;
}

.done-score {
	font-size: 3rem;
	font-weight: 600;
	color: var(--c-head);
	line-height: 1;
}

.done-label {
	font-size: 14px;
	color: var(--c-muted);
}

.loading-label {
	font-size: 14px;
	color: var(--c-muted);
}
</style>
