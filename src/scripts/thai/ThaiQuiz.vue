<script setup lang="ts">
import TypeInQuiz from '@/components/quiz/TypeInQuiz.vue'
import { consonantQuestions, vowelQuestions, allVowelQuestions, syllableQuestions, placeQuestions, provinceQuestions } from './thaiQuestions'

const datasets = [
	{ label: 'Consonants',  questions: consonantQuestions },
	{ label: 'Vowels',      questions: vowelQuestions },
	{ label: 'All vowels',  questions: allVowelQuestions },
	{ label: 'Syllables',   questions: syllableQuestions },
	{ label: 'Place names', questions: placeQuestions },
	{ label: 'Provinces',   questions: provinceQuestions },
]
</script>

<template>
	<TypeInQuiz :datasets="datasets" prompt-class="thai" />
</template>

<style scoped>
:deep(.prompt.thai) {
	font-family: var(--font-thai);
}
</style>
