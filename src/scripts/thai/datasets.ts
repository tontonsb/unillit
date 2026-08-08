import type { Question, QuizDatasetConfig } from '@/components/quiz/dataset'

const vowelNote = 'Type the full syllable — include the k (e.g. ka, not just a)'

const load = (pick: (m: typeof import('./questions')) => Question[]) =>
	() => import('./questions').then(m => ({ questions: pick(m) }))

export const thaiDatasets: QuizDatasetConfig[] = [
	{ label: 'Consonants', load: load(m => m.consonantQuestions), modes: ['typein'] },
	{ label: 'Vowels', load: load(m => m.vowelQuestions), instructions: vowelNote, modes: ['typein'] },
	{ label: 'All vowels', load: load(m => m.allVowelQuestions), instructions: vowelNote, modes: ['typein'] },
	{ label: 'Syllables', load: load(m => m.syllableQuestions), maxTolerance: 1, modes: ['typein', 'multiplechoice'] },
	{ label: 'Provinces', load: load(m => m.provinceQuestions), maxTolerance: 3, modes: ['typein', 'multiplechoice'], kind: 'toponyms' },
	{ label: 'Prefixed provinces', load: load(m => m.provincePrefixQuestions), maxTolerance: 3, instructions: 'Type only the province name — ignore the prefix', modes: ['typein', 'multiplechoice'], kind: 'toponyms' },
]
