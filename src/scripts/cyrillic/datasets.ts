import type { QuizDataset } from '@/components/quiz/dataset'
import { allLettersQuestions, toponymQuestions } from './cyrillicQuestions'
import { languageIdQuestions, LANGUAGE_OPTIONS } from './languageIdQuestions'

export const cyrillicDatasets: QuizDataset[] = [
	{
		label: 'Letters',
		questions: allLettersQuestions,
		maxTolerance: 1,
		modes: ['typein'],
		instructions: '[beta, set will change]',
	},
	{
		label: 'Toponyms',
		questions: toponymQuestions,
		maxTolerance: 3,
		modes: ['typein', 'multiplechoice'],
		kind: 'toponyms',
		instructions: '[beta, only few cities for now]',
	},
	{
		label: 'Identification',
		questions: languageIdQuestions,
		modes: ['multiselect'],
		options: LANGUAGE_OPTIONS,
		instructions: '[minimal beta set as proof of concept] Select every language whose alphabet this spelling fits.',
		kind: 'language',
	},
]
