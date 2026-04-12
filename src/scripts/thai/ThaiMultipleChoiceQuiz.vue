<script setup lang="ts">
import MultipleChoiceQuiz from '@/components/quiz/MultipleChoiceQuiz.vue'
import { syllableQuestions, provinceQuestions } from './thaiQuestions'

const datasets = [
	{ label: 'Syllables', questions: syllableQuestions },
	{ label: 'Provinces', questions: provinceQuestions },
]
</script>

<template>
	<MultipleChoiceQuiz :datasets="datasets" prompt-class="thai" />
</template>

<style scoped>
:deep(.prompt.thai) {
	font-family: var(--font-thai);
}
</style>
