<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { allAnswers, formatAnswers, isMatch, levenshtein } from './utils'
import QuizShell from './QuizShell.vue'

const props = defineProps<{
	datasets: QuizDataset[]
	promptClass?: string
	scriptId?: string
}>()

const userInput = ref('')
const lastCorrect = ref(false)
const lastExact = ref(false)
const answerInput = ref<HTMLInputElement | null>(null)
const currentDatasetIndex = ref(0)
const tolerance = ref(0)

const maxTolerance = computed(() => props.datasets[currentDatasetIndex.value]?.maxTolerance ?? 0)

watch(maxTolerance, (max) => {
	if (tolerance.value > max) tolerance.value = max
})

function onQuestion({ datasetIndex }: { question: Question; session: Question[]; datasetIndex: number }) {
	currentDatasetIndex.value = datasetIndex
	userInput.value = ''
	nextTick(() => answerInput.value?.focus())
}

function handleSubmit(current: Question, submit: (correct: boolean, errors?: number) => void) {
	const inputNorm = userInput.value.toLowerCase().trim()
	const minErrors = Math.min(...allAnswers(current).map(a => levenshtein(inputNorm, a.toLowerCase().trim())))
	lastExact.value = isMatch(userInput.value, current.answer)
	lastCorrect.value = lastExact.value || isMatch(userInput.value, current.answer, tolerance.value)
	submit(lastCorrect.value, minErrors)
}
</script>

<template>
	<QuizShell
		:datasets="datasets"
		:prompt-class="promptClass"
		:script-id="scriptId"
		:tolerance="tolerance"
		quiz-type="typein"
		@question="onQuestion"
	>
		<template #default="{ current, phase, submit }">
			<form v-if="phase === 'question'" class="input-row" @submit.prevent="handleSubmit(current, submit)">
				<input
					ref="answerInput"
					v-model="userInput"
					class="answer-input"
					type="text"
					placeholder="Type romanisation…"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					autofocus
				>
				<button type="submit" class="btn-primary">Check</button>
			</form>

			<div v-else class="feedback">
				<div v-if="!lastExact" class="feedback-row" :class="lastCorrect ? 'fuzzy-user' : 'wrong'">
					<span class="feedback-icon">{{ lastCorrect ? '≈' : '✗' }}</span>
					<span class="feedback-user">{{ userInput || '(blank)' }}</span>
				</div>
				<div class="feedback-row" :class="lastExact ? 'correct' : (lastCorrect ? 'fuzzy' : 'correct')">
					<span class="feedback-icon">✓</span>
					<span class="feedback-answer">{{ formatAnswers(current) }}</span>
				</div>
			</div>

			<div v-if="maxTolerance > 0" class="tolerance-row">
				<label class="tolerance-label" for="tolerance-slider">
					Allowed errors: {{ tolerance }}
				</label>
				<input
					id="tolerance-slider"
					v-model.number="tolerance"
					type="range"
					min="0"
					:max="maxTolerance"
					step="1"
					class="tolerance-slider"
				>
			</div>
		</template>
	</QuizShell>
</template>

<style scoped>
.input-row {
	display: flex;
	gap: 8px;
	width: 100%;
	max-width: 360px;
}

.answer-input {
	flex: 1;
	padding: 8px 12px;
	border: 1px solid var(--c-border);
	border-radius: 4px;
	font-size: 14px;
	font-family: var(--sans);
	background: var(--c-cell);
	color: var(--c-head);
	outline: none;
	transition: border-color 0.15s;
}

.answer-input:focus {
	border-color: var(--c-accent);
}

.feedback {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	max-width: 360px;
}

.feedback-row {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 14px;
	padding: 6px 12px;
	border-radius: 4px;
	width: 100%;
}

.feedback-row.correct {
	background: #d4edda;
	color: #1a5228;
}

.feedback-row.fuzzy {
	background: #eef5df;
	color: #5a7030;
}

.feedback-row.fuzzy-user {
	background: #f5f5e8;
	color: #888860;
}

.feedback-row.wrong {
	background: #fdf0f0;
	color: #a03030;
	text-decoration: line-through;
}

.feedback-icon {
	font-size: 14px;
	flex-shrink: 0;
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

.tolerance-row {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	max-width: 360px;
}

.tolerance-label {
	font-size: 11px;
	color: var(--c-muted);
	white-space: nowrap;
	min-width: 80px;
}

.tolerance-slider {
	flex: 1;
	accent-color: var(--c-accent);
	cursor: pointer;
}
</style>
