<script setup lang="ts">
import { ref, computed, watch, toRef, nextTick } from 'vue'
import type { QuizDataset, QuizMode } from './dataset'
import { useQuizSession } from './useSession'
import { useStats } from '@/composables/useStats'
import { activeFont, activeInfoSheet } from '@/composables/useScriptContext'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'
import { useResultShare } from '@/composables/useResultShare'
import { useAuth } from '@/composables/useAuth'
import { formatAnswers, revisionSample } from './utils'
import PillControl from '@/components/PillControl.vue'
import TypeInQuiz from './TypeInQuiz.vue'
import MultipleChoiceQuiz from './MultipleChoiceQuiz.vue'
import MultiSelectQuiz from './MultiSelectQuiz.vue'

function modeLabel(m: QuizMode): string {
	if (m === 'typein') return 'Type-in'
	if (m === 'multiplechoice') return 'Multiple choice'

	return 'Multi-select'
}

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
const answeredCorrect = ref(false)

/**
 * Submitting is otherwise silent to a screen reader: focus lands on a button
 * labelled only "Next", so the verdict never reaches the user.
 */
const verdict = computed(() => {
	if (phase.value !== 'answered' || !current.value) return ''

	const outcome = answeredCorrect.value
		? 'Correct.'
		: `Incorrect. Answer: ${formatAnswers(current.value)}.`

	return current.value.hint ? `${outcome} ${current.value.hint}` : outcome
})
const typeIn = ref<InstanceType<typeof TypeInQuiz> | null>(null)
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

/** A run worth warning about: at least one answer given, not yet finished. */
const runInProgress = computed(() =>
	phase.value !== 'done' && (index.value > 0 || phase.value === 'answered')
)

function confirmAbandon() {
	if (!runInProgress.value) return true

	return confirm(`Changing the settings will end the current run (${progress.value}). Change them?`)
}

function switchMode(newMode: QuizMode) {
	if (mode.value === newMode) return
	if (!confirmAbandon()) return

	mode.value = newMode
	preferredMode.value = newMode
	startSession()
}

function switchSampling(newMode: typeof samplingMode.value) {
	if (samplingMode.value === newMode) return
	if (!confirmAbandon()) return

	samplingMode.value = newMode
}

/**
 * Bound to @change rather than v-model: the count only takes effect once the
 * field is committed, so typing "20" doesn't restart the run twice.
 */
function setCount(event: Event) {
	const input = event.target as HTMLInputElement
	const n = Math.trunc(Number(input.value))

	if (!Number.isFinite(n) || n < 1 || n === randomCount.value || !confirmAbandon()) {
		input.value = String(randomCount.value)

		return
	}

	randomCount.value = n
	input.value = String(n)
}

async function handleSubmit(correct: boolean, errors?: number) {
	answeredCorrect.value = correct
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

/** Called by QuizShell when the quiz tab comes back into view. */
defineExpose({
	focus: () => {
		if (phase.value === 'answered') nextBtn.value?.focus()
		else typeIn.value?.focus()
	},
})

const { resultCopied, copyResults } = useResultShare({
	mode: () => mode.value,
	correct: () => tally.value.correct,
	total: () => session.value.length,
})
</script>

<template>
	<div class="quiz-panel">
		<!-- always rendered: a live region added at the same time as its text stays silent -->
		<p class="sr-only" role="status">{{ verdict }}</p>

		<div class="toolbar">
			<div v-if="currentModes.length > 1" class="mode-toggle">
				<PillControl
					v-for="m in currentModes"
					:key="m"
					:active="mode === m"
					@click="switchMode(m)"
				>{{ modeLabel(m) }}</PillControl>
			</div>
			<div class="mode-picker">
				<PillControl
					:active="samplingMode === 'shuffled'"
					@click="switchSampling('shuffled')"
				>Shuffled</PillControl>
				<PillControl
					:active="samplingMode === 'random'"
					@click="switchSampling('random')"
				>Random</PillControl>
				<PillControl
					v-if="user"
					:active="samplingMode === 'revision'"
					@click="switchSampling('revision')"
				>Revision</PillControl>
				<PillControl
					v-else
					locked
					title="Log in to store stats and use Revision mode"
				>Revision</PillControl>
				<input
					v-if="samplingMode !== 'shuffled'"
					:value="randomCount"
					type="number"
					min="1"
					class="count-input"
					title="Questions per run"
					@change="setCount"
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
				<div class="done-actions">
					<button type="button" class="btn-primary" @click="startSession">Play another</button>
					<button type="button" class="btn-secondary" @click="copyResults">{{ resultCopied ? '✓ Copied' : 'Copy results' }}</button>
				</div>
			</div>
		</div>

		<div v-else-if="current" class="card">
			<div class="card-body">
				<div class="prompt" :class="promptClass" :style="promptFontFamily ? { fontFamily: promptFontFamily } : {}">{{ current.prompt }}</div>
				<TypeInQuiz
					v-if="mode === 'typein'"
					ref="typeIn"
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
				<MultiSelectQuiz
					v-if="mode === 'multiselect'"
					:current
					:phase
					:dataset="props.dataset"
					@answer="handleSubmit"
				/>
				<template v-if="phase === 'answered'">
					<p
						v-if="current.hint"
						class="hint"
						:style="promptFontFamily ? { fontFamily: promptFontFamily } : {}"
					>{{ current.hint }}</p>
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
	padding: var(--sp-8) var(--sp-12);
	gap: var(--sp-8);
	flex-shrink: 0;
	border-bottom: var(--hairline);
	background: var(--c-cell);
	overflow-x: auto;
}

.mode-toggle {
	display: flex;
	gap: var(--sp-4);
	flex-shrink: 0;
}

.mode-picker {
	display: flex;
	align-items: center;
	gap: var(--sp-4);
	flex-shrink: 0;
	margin-left: auto;
}

.count-input {
	width: 52px;
	padding: var(--sp-2) var(--sp-6);
	border: var(--hairline);
	border-radius: var(--radius);
	background: transparent;
	color: var(--c-label);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	text-align: center;
}

.count-input:focus {
	border-color: var(--c-sign);
}

.progress-row {
	display: flex;
	align-items: center;
	gap: var(--sp-8);
	padding: var(--sp-6) var(--sp-12);
	border-bottom: var(--hairline);
}

.progress-bar {
	flex: 1;
	height: 4px;
	background: var(--c-border);
	border-radius: var(--radius-sm);
	overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: var(--c-accent);
	border-radius: var(--radius-sm);
	transition: width 0.25s ease;
}

.progress-label {
	font-size: var(--fs-11);
	color: var(--c-muted);
	white-space: nowrap;
}

.tally {
	display: flex;
	gap: var(--sp-8);
	font-size: var(--fs-11);
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
	gap: var(--sp-24);
	padding: var(--sp-32);
	margin: auto;
	width: 100%;
	box-sizing: border-box;
}

.prompt {
	/* a long single-word toponym has no wrap opportunity, so it scales instead of
	   clipping; full size from ~500px up, where it already fits */
	font-size: clamp(var(--fs-48), 13vw, var(--fs-prompt));
	line-height: 1.2;
	color: var(--c-head);
	text-align: center;
}

.hint {
	font-size: var(--fs-prose);
	color: var(--c-muted);
	text-align: center;
}

.btn-primary {
	padding: var(--sp-8) var(--sp-20);
	border: none;
	border-radius: var(--radius);
	background: var(--c-accent);
	color: var(--c-on-sign);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity var(--dur);
}

.btn-primary:hover { opacity: 0.85; }

.btn-secondary {
	padding: var(--sp-8) var(--sp-20);
	border: var(--hairline);
	border-radius: var(--radius);
	background: transparent;
	color: var(--c-label);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	cursor: pointer;
	transition: color var(--dur), border-color var(--dur);
}

.btn-secondary:hover {
	color: var(--c-head);
	border-color: var(--c-label);
}

.done-card .card-body {
	gap: var(--sp-12);
	text-align: center;
}

.done-actions {
	display: flex;
	gap: var(--sp-8);
	flex-wrap: wrap;
	justify-content: center;
}

.done-score {
	font-size: var(--fs-48);
	font-weight: 600;
	color: var(--c-head);
	line-height: 1;
}

.done-label {
	font-size: var(--fs-body);
	color: var(--c-muted);
}

.loading-label {
	font-size: var(--fs-body);
	color: var(--c-muted);
}
</style>
