import type { Question, QuizDatasetConfig } from '@/components/quiz/dataset'

const load = (pick: (m: typeof import('./questions')) => Question[]) =>
	() => import('./questions').then(m => ({ questions: pick(m) }))

export const sinhalaDatasets: QuizDatasetConfig[] = [
	{ label: 'Letters', load: load(m => m.letterQuestions), modes: ['typein'] },
	{ label: 'Diacritics', load: load(m => m.diacriticQuestions), instructions: 'Type the full syllable — include the consonant  (e.g. ka, not just a)', modes: ['typein'] },
	{ label: 'Toponyms', load: load(m => m.toponymQuestions), maxTolerance: 3, modes: ['typein', 'multiplechoice'], kind: 'toponyms' },
]
