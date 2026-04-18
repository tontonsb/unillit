<script setup lang="ts">
import { ref } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { shuffle, canonicalAnswer, allAnswers, isMatch } from './utils'
import QuizShell from './QuizShell.vue'

defineProps<{
	datasets: QuizDataset[]
	promptClass?: string
	scriptId?: string
}>()

const choices = ref<string[]>([])
const selectedChoice = ref<string | null>(null)

function buildChoices(question: Question, pool: Question[]): string[] {
	const correct = canonicalAnswer(question)
	const distractors = shuffle([...new Set(
		pool
			.filter(q => canonicalAnswer(q) !== correct)
			.map(q => canonicalAnswer(q))
	)])
	return shuffle([correct, ...distractors.slice(0, 4)])
}

function onQuestion({ question, session }: { question: Question; session: Question[] }) {
	selectedChoice.value = null
	choices.value = buildChoices(question, session)
}

function handleSelect(choice: string, current: Question, submit: (correct: boolean) => void) {
	selectedChoice.value = choice
	submit(isMatch(choice, current.answer))
}

function choiceState(choice: string, current: Question, phase: string): 'correct' | 'wrong' | 'dim' | null {
	if (phase !== 'answered') return null
	if (isMatch(choice, current.answer)) return 'correct'
	if (choice === selectedChoice.value) return 'wrong'
	return 'dim'
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
			<div class="choices">
				<button
					v-for="choice in choices"
					:key="choice"
					type="button"
					class="choice"
					:class="choiceState(choice, current, phase)"
					:disabled="phase === 'answered'"
					@click="handleSelect(choice, current, submit)"
				>{{ choice }}</button>
			</div>
			<p v-if="phase === 'answered' && allAnswers(current).length > 1" class="also-accepted">
				accepted: {{ allAnswers(current).join(' / ') }}
			</p>
		</template>
	</QuizShell>
</template>

<style scoped>
.choices {
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
	max-width: 360px;
}

.choice {
	padding: 10px 16px;
	border: 1px solid var(--c-border);
	border-radius: 4px;
	background: var(--c-cell);
	color: var(--c-label);
	font-size: 14px;
	font-family: var(--sans);
	cursor: pointer;
	text-align: left;
	transition: border-color 0.15s, background 0.15s;
}

.choice:hover:not(:disabled) {
	border-color: var(--c-accent);
	background: var(--c-alt);
}

.choice:disabled { cursor: default; }

.choice.correct {
	background: #edf7ee;
	border-color: #5a9e64;
	color: #2d6a35;
}

.choice.wrong {
	background: #fdf0f0;
	border-color: #c47878;
	color: #a03030;
}

.choice.dim { opacity: 0.4; }

.also-accepted {
	font-size: 11px;
	color: var(--c-muted);
	text-align: center;
	margin: 0;
}
</style>
