<script setup lang="ts">
import { ref, computed, watch, toRef, nextTick } from 'vue'
import type { VNode } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { useQuizSession, type Phase } from './useSession'
import { useStats, type QuestionStats } from '@/composables/useStats'
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{
	datasets: QuizDataset[]
	promptClass?: string
	scriptId?: string
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

type SamplingMode = 'shuffled' | 'random'
const samplingMode = ref<SamplingMode>('shuffled')
const randomCount = ref(10)

const nextBtn = ref<HTMLButtonElement | null>(null)
let runStarted = false

const { user, loginWithDiscord } = useAuth()

const stats = computed(() => {
	const dataset = props.datasets[datasetIndex.value]
	return props.scriptId && dataset
		? useStats(props.scriptId, dataset.label)
		: null
})

// Stats panel
const showStats = ref(false)
const statsData = ref<QuestionStats[]>([])
const statsLoading = ref(false)

async function loadStats() {
	if (!stats.value || !user.value) return
	statsLoading.value = true
	statsData.value = await stats.value.fetchStats()
	statsLoading.value = false
}

watch([showStats, datasetIndex], ([show]) => { if (show) loadStats() })

const statsRows = computed(() => {
	const questions = props.datasets[datasetIndex.value]?.questions ?? []
	const byPrompt = new Map(statsData.value.map(s => [s.prompt, s]))
	return questions.map(q => ({
		prompt: q.prompt,
		stats: byPrompt.get(q.prompt) ?? null,
	})).sort((a, b) => {
		const ra = a.stats ? a.stats.correct / a.stats.total : -1
		const rb = b.stats ? b.stats.correct / b.stats.total : -1
		return ra - rb
	})
})

function relativeDate(iso: string): string {
	const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
	if (days === 0) return 'today'
	if (days === 1) return 'yesterday'
	if (days < 14) return `${days}d ago`
	if (days < 60) return `${Math.floor(days / 7)}w ago`
	return `${Math.floor(days / 30)}mo ago`
}

function emitQuestion() {
	if (current.value) emit('question', { question: current.value, session: session.value })
}

function sessionCount() {
	return samplingMode.value === 'random' ? randomCount.value : null
}

watch(datasetIndex, () => {
	_startSession(sessionCount())
	emitQuestion()
	runStarted = false
}, { immediate: true })

function startSession() {
	_startSession(sessionCount())
	emitQuestion()
	runStarted = false
}

function handleSubmit(correct: boolean) {
	_submit(correct)
	nextTick(() => nextBtn.value?.focus())
	if (current.value) {
		if (!runStarted) {
			stats.value?.startRun(session.value.length)
			runStarted = true
		}
		stats.value?.recordAnswer(current.value.prompt, correct)
	}
}

function advance() {
	_advance()
	if (phase.value === 'question') emitQuestion()
	else if (phase.value === 'done') stats.value?.completeRun()
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
			<div class="mode-picker">
				<button
					type="button"
					class="pill"
					:class="{ active: samplingMode === 'shuffled' }"
					@click="samplingMode = 'shuffled'; startSession()"
				>Shuffled</button>
				<button
					type="button"
					class="pill"
					:class="{ active: samplingMode === 'random' }"
					@click="samplingMode = 'random'; startSession()"
				>Random</button>
				<input
					v-if="samplingMode === 'random'"
					v-model.number="randomCount"
					type="number"
					min="1"
					class="count-input"
					@change="startSession()"
				>
			</div>
		</div>

		<template v-if="!showStats">
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
		</template>

		<div v-else class="stats-panel">
			<div v-if="!user" class="stats-login">
				<p>Log in to track your progress and see per-question accuracy.</p>
				<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
			</div>
			<div v-else-if="statsLoading" class="stats-empty">Loading…</div>
			<div v-else-if="!props.scriptId" class="stats-empty">Stats not available for this quiz.</div>
			<table v-else class="stats-table">
				<thead>
					<tr>
						<th>Question</th>
						<th>Correct</th>
						<th>Accuracy</th>
						<th>Last seen</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in statsRows" :key="row.prompt">
						<td class="prompt-cell" :class="promptClass">{{ row.prompt }}</td>
						<td>{{ row.stats ? `${row.stats.correct} / ${row.stats.total}` : '—' }}</td>
						<td>
							<span v-if="row.stats" class="accuracy" :class="row.stats.correct / row.stats.total >= 0.8 ? 'good' : row.stats.correct / row.stats.total >= 0.5 ? 'ok' : 'bad'">
								{{ Math.round(row.stats.correct / row.stats.total * 100) }}%
							</span>
							<span v-else class="never">never</span>
						</td>
						<td class="muted">{{ row.stats ? relativeDate(row.stats.lastAnsweredAt) : '—' }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="bottom-bar">
			<button
				type="button"
				class="tab-btn"
				:class="{ active: !showStats }"
				@click="showStats = false"
			>
				Quiz
			</button>
			<button
				type="button"
				class="tab-btn"
				:class="{ active: showStats }"
				@click="showStats = true"
			>
				Stats
			</button>
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
	flex: 1;
}

.mode-picker {
	display: flex;
	align-items: center;
	gap: 4px;
	border-left: 1px solid var(--c-border);
	padding-left: 8px;
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

.stats-panel {
	flex: 1;
	overflow-y: auto;
}

.stats-login {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	height: 100%;
	padding: 2rem;
	text-align: center;
	color: var(--c-muted);
	font-size: 0.9rem;
}

.stats-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--c-muted);
	font-size: 0.9rem;
}

.stats-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 12px;
}

.stats-table th {
	position: sticky;
	top: 0;
	background: var(--c-cell);
	color: var(--c-muted);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	font-size: 10px;
	padding: 6px 12px;
	text-align: left;
	border-bottom: 1px solid var(--c-border);
}

.stats-table td {
	padding: 5px 12px;
	border-bottom: 1px solid var(--c-border);
	color: var(--c-label);
}

.prompt-cell {
	font-size: 1.4rem;
	line-height: 1.3;
	color: var(--c-head);
}

.accuracy.good { color: #3a7d44; }
.accuracy.ok   { color: #a07020; }
.accuracy.bad  { color: #b94040; }

.never { color: var(--c-muted); }
.muted { color: var(--c-muted); }

.bottom-bar {
	display: flex;
	border-top: 1px solid var(--c-border);
	background: var(--c-cell);
}

.tab-btn {
	flex: 1;
	padding: 8px;
	border: none;
	background: none;
	color: var(--c-muted);
	font-size: 11px;
	font-weight: 600;
	font-family: var(--sans);
	letter-spacing: 0.06em;
	text-transform: uppercase;
	cursor: pointer;
	transition: background 0.15s, color 0.15s;
}

.tab-btn:hover { background: var(--c-alt); }

.tab-btn.active {
	color: var(--c-accent);
	border-top: 2px solid var(--c-accent);
	margin-top: -1px;
}
</style>
