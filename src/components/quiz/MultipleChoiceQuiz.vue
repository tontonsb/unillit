<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Question, QuizDataset } from './dataset'
import type { Phase } from './useSession'
import { shuffle, canonicalAnswer, allAnswers, isMatch } from './utils'

const props = defineProps<{
	current: Question
	phase: Phase
	dataset: QuizDataset
}>()

const emit = defineEmits<{
	answer: [correct: boolean, errors?: number]
}>()

const choices = ref<string[]>([])
const selectedChoice = ref<string | null>(null)

function buildChoices() {
	const correct = canonicalAnswer(props.current)
	const distractors = shuffle([...new Set(
		props.dataset.questions
			.filter(q => canonicalAnswer(q) !== correct)
			.map(q => canonicalAnswer(q))
	)])
	choices.value = shuffle([correct, ...distractors.slice(0, 4)])
}

watch([() => props.phase, () => props.current], ([phase]) => {
	if (phase === 'question') {
		selectedChoice.value = null
		buildChoices()
	}
}, { immediate: true })

function handleSelect(choice: string) {
	selectedChoice.value = choice
	const correct = isMatch(choice, props.current.answer)
	emit('answer', correct, correct ? 0 : undefined)
}

function choiceState(choice: string): 'correct' | 'wrong' | 'dim' | null {
	if (props.phase !== 'answered') return null
	if (isMatch(choice, props.current.answer)) return 'correct'
	if (choice === selectedChoice.value) return 'wrong'
	return 'dim'
}
</script>

<template>
	<div class="choices">
		<button
			v-for="choice in choices"
			:key="choice"
			type="button"
			class="choice"
			:class="choiceState(choice)"
			:disabled="phase === 'answered'"
			@click="handleSelect(choice)"
		>{{ choice }}</button>
	</div>
	<p v-if="phase === 'answered' && allAnswers(current).length > 1" class="also-accepted">
		accepted: {{ allAnswers(current).join(' / ') }}
	</p>
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

.choice:disabled { cursor: default; }

.choice:hover:not(:disabled) {
	border-color: var(--c-accent-ink);
	background: var(--c-alt);
}

.choice.correct { background: var(--fb-ok-bg); border-color: var(--c-good); color: var(--c-good); }
.choice.wrong   { background: var(--fb-wrong-bg); border-color: var(--c-bad); color: var(--c-bad); }
.choice.dim     { opacity: 0.4; }

.also-accepted {
	font-size: 13px;
	color: var(--c-muted);
	text-align: center;
	margin: 0;
}
</style>
