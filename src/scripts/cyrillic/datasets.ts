import type { QuizDatasetConfig } from '@/components/quiz/dataset'

const letters = () => import('./cyrillicQuestions')
const languages = () => import('./languageIdQuestions')

export const cyrillicDatasets: QuizDatasetConfig[] = [
	{
		label: 'Letters',
		load: () => letters().then(m => ({ questions: m.allLettersQuestions })),
		maxTolerance: 1,
		modes: ['typein'],
		instructions: '[beta, set will change]',
	},
	{
		label: 'Toponyms',
		load: () => letters().then(m => ({ questions: m.toponymQuestions })),
		maxTolerance: 3,
		modes: ['typein', 'multiplechoice'],
		kind: 'toponyms',
		instructions: '[beta, only few cities for now]',
	},
	{
		label: 'Identification',
		load: () => languages().then(m => ({
			questions: m.languageIdQuestions,
			options: m.LANGUAGE_OPTIONS,
		})),
		modes: ['multiselect'],
		instructions: '[minimal beta set as proof of concept] Select every language whose alphabet this spelling fits.',
		kind: 'language',
	},
]
