<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { canonicalAnswer, isMatch } from './utils'
import QuizShell from './QuizShell.vue'

defineProps<{
	datasets: QuizDataset[]
	promptClass?: string
	scriptId?: string
}>()

const userInput = ref('')
const lastCorrect = ref(false)
const answerInput = ref<HTMLInputElement | null>(null)

function onQuestion() {
	userInput.value = ''
	nextTick(() => answerInput.value?.focus())
}

function handleSubmit(current: Question, submit: (correct: boolean) => void) {
	lastCorrect.value = isMatch(userInput.value, current.answer)
	submit(lastCorrect.value)
}
</script>

<template>
	<QuizShell
		:datasets="datasets"
		:prompt-class="promptClass"
		:script-id="scriptId"
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
				<div class="feedback-row" :class="lastCorrect ? 'correct' : 'wrong'">
					<span class="feedback-icon">{{ lastCorrect ? '✓' : '✗' }}</span>
					<span v-if="!lastCorrect" class="feedback-user">{{ userInput || '(blank)' }}</span>
				</div>
				<div v-if="!lastCorrect" class="feedback-row correct">
					<span class="feedback-icon">✓</span>
					<span class="feedback-answer">{{ canonicalAnswer(current) }}</span>
				</div>
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
	background: #edf7ee;
	color: #2d6a35;
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
</style>
