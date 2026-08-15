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

let cardShownAt = Date.now()

onMounted(() => answerInput.value?.focus())

defineExpose({ focus: () => answerInput.value?.focus() })

watch(() => props.phase, (phase) => {
	if (phase === 'question') {
		userInput.value = ''
		cardShownAt = Date.now()
		nextTick(() => answerInput.value?.focus())
	}
})

watch(maxTolerance, (max) => {
	if (props.modelValue > max) emit('update:modelValue', max)
})

function handleSubmit() {
	/**
	 * Enter on the answered card advances, and a second tap arrives while the next
	 * card is already focused — scoring a blank the user never meant, with no undo.
	 * Empty *is* a valid answer for silent characters, so this filters by timing,
	 * not by emptiness: a deliberate blank comes after reading the prompt.
	 */
	if (!userInput.value && Date.now() - cardShownAt < 400) return

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
			aria-label="Romanisation"
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
	gap: var(--sp-8);
	width: 100%;
	max-width: var(--w-quiz-control);
}

.answer-input {
	flex: 1;

	/* an input's intrinsic width tracks its font-size, and a flex item will not
	   shrink past that on its own — without this the row overflows once the
	   reader raises their browser font size */
	min-width: 0;
	padding: var(--sp-8) var(--sp-12);
	border: var(--hairline);
	border-radius: var(--radius);
	font-size: var(--fs-body);
	font-family: var(--sans);
	background: var(--c-cell);
	color: var(--c-head);
	transition: border-color var(--dur);
}

.answer-input:focus {
	border-color: var(--c-sign);
}

.feedback {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--sp-8);
	width: 100%;
	max-width: var(--w-quiz-control);
}

.feedback-row {
	display: flex;
	align-items: center;
	gap: var(--sp-8);
	font-size: var(--fs-body);
	padding: var(--sp-6) var(--sp-12);
	border-radius: var(--radius);
	width: 100%;
}

.feedback-row.correct  { background: var(--fb-ok-bg); color: var(--c-good); }
.feedback-row.fuzzy    { background: var(--fb-fuzzy-bg); color: var(--fb-fuzzy-text); }
.feedback-row.fuzzy-user { background: var(--fb-fuzzy-user-bg); color: var(--fb-fuzzy-user-text); }
.feedback-row.wrong    { background: var(--fb-wrong-bg); color: var(--c-bad); text-decoration: line-through; }

.feedback-icon {
	font-size: var(--fs-body);
	flex-shrink: 0;
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

.tolerance-row {
	display: flex;
	align-items: center;
	gap: var(--sp-10);
	width: 100%;
	max-width: var(--w-quiz-control);
}

.tolerance-label {
	font-size: var(--fs-11);
	color: var(--c-muted);
	white-space: nowrap;
	min-width: 80px;
}

.tolerance-slider {
	flex: 1;
	cursor: pointer;
}

.instructions {
	font-size: var(--fs-12);
	color: var(--c-muted);
	text-align: center;
	max-width: var(--w-quiz-control);
}
</style>
