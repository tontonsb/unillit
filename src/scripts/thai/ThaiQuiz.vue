<script setup lang="ts">
import TypeInQuiz from '@/components/quiz/TypeInQuiz.vue'
import { consonantQuestions, vowelQuestions, allVowelQuestions, syllableQuestions, provinceQuestions } from './thaiQuestions'

const datasets = [
	{ label: 'Consonants',  questions: consonantQuestions },
	{ label: 'Vowels',      questions: vowelQuestions },
	{ label: 'All vowels',  questions: allVowelQuestions },
	{ label: 'Syllables',   questions: syllableQuestions,  maxTolerance: 1 },
	{ label: 'Provinces',   questions: provinceQuestions,  maxTolerance: 3 },
]
</script>

<template>
	<TypeInQuiz
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
