<script setup lang="ts">
import TypeInQuiz from '@/components/quiz/TypeInQuiz.vue'
import { consonantQuestions, vowelQuestions, allVowelQuestions, syllableQuestions, provinceQuestions, provincePrefixQuestions } from './questions'

const VOWEL_NOTE = 'Type the full syllable — include the k (e.g. ka, not just a)'

const datasets = [
	{ label: 'Consonants', questions: consonantQuestions },
	{ label: 'Vowels', questions: vowelQuestions, instructions: VOWEL_NOTE },
	{ label: 'All vowels', questions: allVowelQuestions, instructions: VOWEL_NOTE },
	{ label: 'Syllables', questions: syllableQuestions, maxTolerance: 1 },
	{ label: 'Provinces', questions: provinceQuestions, maxTolerance: 3 },
	{ label: 'Prefixed provinces', questions: provincePrefixQuestions, maxTolerance: 3, instructions: 'Type only the province name — ignore the prefix' },
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
