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

/** On the critical path — scripts.ts reads `label` at module scope. Keep it small. */
interface QuizDatasetMeta {
	label: string
	maxTolerance?: number
	instructions?: string
	modes?: QuizMode[]
	kind?: QuizKind
}

/** Loaded only when a quiz opens. */
export interface QuizDatasetData {
	questions: Question[]
	options?: string[] // for multiselect — the full list of selectables
}

/** The authored form, held by scripts.ts. */
export interface QuizDatasetConfig extends QuizDatasetMeta {
	load: () => Promise<QuizDatasetData>
}

/** The resolved form. QuizShell awaits `load`; everything below it sees this. */
export interface QuizDataset extends QuizDatasetMeta, QuizDatasetData {}
