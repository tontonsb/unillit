<script setup lang="ts">
import { ref, watch, toRef, nextTick } from 'vue'
import type { VNode } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { useQuizSession, type Phase } from './useSession'

const props = defineProps<{
	datasets: QuizDataset[]
	promptClass?: string
}>()

const emit = defineEmits<{
	question: [{ question: Question; session: Question[] }]
}>()

defineSlots<{
	default(props: { current: Question; phase: Phase; session: Question[]; submit: (correct: boolean) => void }): VNode[]
}>()

const {
	datasetIndex, session, index, phase, tally, current, progress,
	startSession: _startSession, submit: _submit, advance: _advance,
} = useQuizSession(toRef(props, 'datasets'))

const nextBtn = ref<HTMLButtonElement | null>(null)

function emitQuestion() {
	if (current.value) emit('question', { question: current.value, session: session.value })
}

watch(datasetIndex, () => {
	_startSession()
	emitQuestion()
}, { immediate: true })

function startSession() {
	_startSession()
	emitQuestion()
}

function handleSubmit(correct: boolean) {
	_submit(correct)
	nextTick(() => nextBtn.value?.focus())
}

function advance() {
	_advance()
	if (phase.value === 'question') emitQuestion()
}
</script>

<template>
	<div class="quiz">
		<div class="toolbar">
			<div class="set-pills">
				<button
					v-for="(dataset, i) in datasets"
					:key="dataset.label"
					type="button"
					class="pill"
					:class="{ active: datasetIndex === i }"
					@click="datasetIndex = i"
				>{{ dataset.label }}</button>
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
			<p class="done-score">{{ tally.correct }} / {{ session.length }}</p>
			<p class="done-label">{{ tally.correct === session.length ? 'Perfect!' : 'Session complete' }}</p>
			<button type="button" class="btn-primary" @click="startSession">Restart</button>
		</div>

		<div v-else-if="current" class="card">
			<div class="prompt" :class="promptClass">{{ current.prompt }}</div>
			<slot 
				:current="current" 
				:phase="phase" 
				:session="session" 
				:submit="handleSubmit"
			></slot>
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
</template>

<style scoped>
.quiz {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: var(--c-bg);
}

.toolbar {
	display: flex;
	align-items: center;
	padding: 8px 12px;
	border-bottom: 1px solid var(--c-border);
	background: var(--c-cell);
	gap: 8px;
	flex-wrap: wrap;
}

.set-pills {
	display: flex;
	gap: 4px;
	flex-wrap: wrap;
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
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	padding: 2rem;
}

.prompt {
	font-size: 4rem;
	line-height: 1.2;
	color: var(--c-head);
}

.hint {
	font-size: 11px;
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

.done-card {
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
