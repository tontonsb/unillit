export type QuizMode = 'typein' | 'multiplechoice' | 'multiselect'

// determines the result share text flavour
export type QuizKind = 'letters' | 'toponyms' | 'language'

export interface Question {
	prompt: string
	/**
	 * typein/multiplechoice: accepted answer(s), first is canonical.
	 * multiselect: the complete set of correct options.
	 */
	answer: string | string[]
	hint?: string
}

export interface QuizDataset {
	label: string
	questions: Question[]
	maxTolerance?: number
	instructions?: string
	modes?: QuizMode[]
	options?: string[] // for multiselect — the full list of selectables
	kind?: QuizKind
}
