export interface Question {
	prompt: string
	answer: string | string[]
	hint?: string
}

export interface QuizDataset {
	label: string
	questions: Question[]
}
