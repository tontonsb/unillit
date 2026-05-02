<script setup lang="ts">
import { ref, computed, watch, toRef, nextTick } from 'vue'
import type { QuizDataset, QuizMode } from './dataset'
import { useQuizSession } from './useSession'
import { useStats } from '@/composables/useStats'
import { activeFont, activeInfoSheet } from '@/composables/useScriptContext'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'
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
	startSession: _startSession, submit: _submit, advance: _advance,
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

const nextBtn = ref<HTMLButtonElement | null>(null)
let runStarted = false

const stats = computed(() =>
	props.scriptId ? useStats(props.scriptId, props.dataset.label) : null
)

function sessionCount() {
	return samplingMode.value === 'random' ? randomCount.value : null
}

watch(() => props.dataset, () => {
	const modes = currentModes.value
	mode.value = modes.includes(preferredMode.value) ? preferredMode.value : modes[0]!
	_startSession(sessionCount())
	runStarted = false
}, { immediate: true })

watch([samplingMode, randomCount], () => {
	_startSession(sessionCount())
	runStarted = false
})

function startSession() {
	_startSession(sessionCount())
	runStarted = false
}

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
				<input
					v-if="samplingMode === 'random'"
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

		<div v-if="phase === 'done'" class="card done-card">
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
					:session
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
}

.mode-toggle {
	display: flex;
	gap: 4px;
	flex-shrink: 0;
	border-left: 1px solid var(--c-border);
	padding-left: 8px;
}

.mode-picker {
	display: flex;
	align-items: center;
	gap: 4px;
	flex-shrink: 0;
	border-left: 1px solid var(--c-border);
	padding-left: 8px;
}

.toolbar > :first-child {
	border-left: none;
	padding-left: 0;
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
	border-color: var(--c-accent);
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

.pill.active {
	background: var(--c-alt);
	border-color: var(--c-accent);
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

.tally-correct { color: #3a7d44; }
.tally-wrong   { color: #b94040; }

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
</style>
