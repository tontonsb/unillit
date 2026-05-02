<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import type { Question, QuizDataset } from './dataset'
import type { Phase } from './useSession'
import { allAnswers, formatAnswers, isMatch, levenshtein } from './utils'

const props = defineProps<{
	current: Question
	phase: Phase
	dataset: QuizDataset
	modelValue: number
}>()

const emit = defineEmits<{
	answer: [correct: boolean, errors?: number]
	'update:modelValue': [number]
}>()

const userInput = ref('')
const lastCorrect = ref(false)
const lastExact = ref(false)
const answerInput = ref<HTMLInputElement | null>(null)

const maxTolerance = computed(() => props.dataset.maxTolerance ?? 0)
const instructions = computed(() => props.dataset.instructions)

onMounted(() => answerInput.value?.focus())

watch(() => props.phase, (phase) => {
	if (phase === 'question') {
		userInput.value = ''
		nextTick(() => answerInput.value?.focus())
	}
})

watch(maxTolerance, (max) => {
	if (props.modelValue > max) emit('update:modelValue', max)
})

function handleSubmit() {
	const inputNorm = userInput.value.toLowerCase().trim()
	const minErrors = Math.min(...allAnswers(props.current).map(a => levenshtein(inputNorm, a.toLowerCase().trim())))
	lastExact.value = isMatch(userInput.value, props.current.answer)
	lastCorrect.value = lastExact.value || isMatch(userInput.value, props.current.answer, props.modelValue)
	emit('answer', lastCorrect.value, minErrors)
}
</script>

<template>
	<p v-if="phase === 'question' && instructions" class="instructions">{{ instructions }}</p>

	<form v-if="phase === 'question'" class="input-row" @submit.prevent="handleSubmit">
		<input
			ref="answerInput"
			v-model="userInput"
			class="answer-input"
			type="text"
			placeholder="Type romanisation…"
			autocomplete="off"
			autocorrect="off"
			spellcheck="false"
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
			Allowed errors: {{ modelValue }}
		</label>
		<input
			id="tolerance-slider"
			:value="modelValue"
			type="range"
			min="0"
			:max="maxTolerance"
			step="1"
			class="tolerance-slider"
			@input="emit('update:modelValue', +($event.target as HTMLInputElement).value)"
		>
	</div>
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

.feedback-row.correct  { background: #d4edda; color: #1a5228; }
.feedback-row.fuzzy    { background: #eef5df; color: #5a7030; }
.feedback-row.fuzzy-user { background: #f5f5e8; color: #888860; }
.feedback-row.wrong    { background: #fdf0f0; color: #a03030; text-decoration: line-through; }

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

.instructions {
	font-size: 12px;
	color: var(--c-muted);
	text-align: center;
	max-width: 360px;
}
</style>
