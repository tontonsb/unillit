import type { QuizDataset } from '@/components/quiz/dataset'
import {
	consonantQuestions, vowelQuestions, allVowelQuestions,
	syllableQuestions, provinceQuestions, provincePrefixQuestions,
} from './questions'

const vowelNote = 'Type the full syllable — include the k (e.g. ka, not just a)'

export const thaiDatasets: QuizDataset[] = [
	{ label: 'Consonants', questions: consonantQuestions, modes: ['typein'] },
	{ label: 'Vowels', questions: vowelQuestions, instructions: vowelNote, modes: ['typein'] },
	{ label: 'All vowels', questions: allVowelQuestions, instructions: vowelNote, modes: ['typein'] },
	{ label: 'Syllables', questions: syllableQuestions, maxTolerance: 1, modes: ['typein', 'multiplechoice'] },
	{ label: 'Provinces', questions: provinceQuestions, maxTolerance: 3, modes: ['typein', 'multiplechoice'] },
	{ label: 'Prefixed provinces', questions: provincePrefixQuestions, maxTolerance: 3, instructions: 'Type only the province name — ignore the prefix', modes: ['typein', 'multiplechoice'] },
]
