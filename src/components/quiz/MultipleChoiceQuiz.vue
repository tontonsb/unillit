<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Question } from './dataset'
import type { Phase } from './useSession'
import { shuffle, canonicalAnswer, allAnswers, isMatch } from './utils'

const props = defineProps<{
	current: Question
	phase: Phase
	session: Question[]
}>()

const emit = defineEmits<{
	answer: [correct: boolean, errors?: number]
}>()

const choices = ref<string[]>([])
const selectedChoice = ref<string | null>(null)

function buildChoices() {
	const correct = canonicalAnswer(props.current)
	const distractors = shuffle([...new Set(
		props.session
			.filter(q => canonicalAnswer(q) !== correct)
			.map(q => canonicalAnswer(q))
	)])
	choices.value = shuffle([correct, ...distractors.slice(0, 4)])
}

watch(() => props.current, () => {
	selectedChoice.value = null
	buildChoices()
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

.choice:hover:not(:disabled) {
	border-color: var(--c-accent);
	background: var(--c-alt);
}

.choice:disabled { cursor: default; }

.choice.correct { background: #edf7ee; border-color: #5a9e64; color: #2d6a35; }
.choice.wrong   { background: #fdf0f0; border-color: #c47878; color: #a03030; }
.choice.dim     { opacity: 0.4; }

.also-accepted {
	font-size: 13px;
	color: var(--c-muted);
	text-align: center;
	margin: 0;
}
</style>
