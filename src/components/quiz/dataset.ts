export type QuizMode = 'typein' | 'multiplechoice' | 'multiselect'

// determines the result share text flavour
export type QuizKind = 'letters' | 'toponyms' | 'language'

export interface Question {
	prompt: string
	answer: string | string[]
	hint?: string
}

export interface QuizDataset {
	label: string
	questions: Question[]
	maxTolerance?: number
	instructions?: string
	modes?: QuizMode[]
	kind?: QuizKind
}
