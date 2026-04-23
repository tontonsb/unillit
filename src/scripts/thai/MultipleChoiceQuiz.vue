<script setup lang="ts">
import MultipleChoiceQuiz from '@/components/quiz/MultipleChoiceQuiz.vue'
import { syllableQuestions, provinceQuestions, provincePrefixQuestions } from './questions'

const datasets = [
	{ label: 'Syllables', questions: syllableQuestions },
	{ label: 'Provinces', questions: provinceQuestions },
	{ label: 'Prefixed provinces', questions: provincePrefixQuestions },
]
</script>

<template>
	<MultipleChoiceQuiz
		:datasets="datasets"
		prompt-class="thai"
		script-id="thai"
	/>
</template>

<style scoped>
:deep(.prompt.thai) {
	font-family: var(--font-thai);
}
</style>
