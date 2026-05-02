export type QuizMode = 'typein' | 'multiplechoice'

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
}
