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

/**
 * The parts a dataset needs before any quiz is opened: scripts.ts reads `label` at
 * module scope to build the tab strip, and scripts.ts is reachable from the menu on
 * every route. Everything here is on the critical path, so keep it small.
 */
interface QuizDatasetMeta {
	label: string
	maxTolerance?: number
	instructions?: string
	modes?: QuizMode[]
	kind?: QuizKind
}

/** The per-question payload — only ever read from inside an open quiz. */
export interface QuizDatasetData {
	questions: Question[]
	options?: string[] // for multiselect — the full list of selectables
}

/**
 * The authored form, held by scripts.ts. `load` keeps the bulk of a script's data
 * out of the entry graph until a quiz tab is actually opened.
 */
export interface QuizDatasetConfig extends QuizDatasetMeta {
	load: () => Promise<QuizDatasetData>
}

/** The resolved form. QuizShell awaits `load`; everything below it sees this. */
export interface QuizDataset extends QuizDatasetMeta, QuizDatasetData {}
