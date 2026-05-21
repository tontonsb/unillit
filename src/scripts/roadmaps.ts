import type { DatasetProgress } from '@/composables/useProgress'

export type StepStatus = 'fresh' | 'stale' | 'never'

export interface RoadmapStep {
	id: string
	label: string
	hint?: string
	requires?: string[]
	placeholder?: boolean
	getStatus: (datasets: DatasetProgress[]) => StepStatus
	getDate: (datasets: DatasetProgress[]) => string | null
}

export interface ScriptRoadmap {
	scriptId: string
	steps: RoadmapStep[]
}

interface StepOpts {
	hint?: string
	requires?: string[]
}

function recency(lastRunAt: string | null): StepStatus {
	if (!lastRunAt) return 'never'

	const days = (Date.now() - new Date(lastRunAt).getTime()) / 86400000

	return days > 14 ? 'stale' : 'fresh'
}

function find(datasets: DatasetProgress[], label: string) {
	return datasets.find(d => d.label === label)
}

function datasetStep(id: string, datasetLabel: string, opts: StepOpts = {}): RoadmapStep {
	return {
		id,
		label: datasetLabel,
		...opts,
		getStatus: (datasets) => recency(find(datasets, datasetLabel)?.lastRunAt ?? null),
		getDate: (datasets) => find(datasets, datasetLabel)?.lastRunAt ?? null,
	}
}

function datasetModeStep(id: string, datasetLabel: string, mode: string, label: string, opts: StepOpts = {}): RoadmapStep {
	return {
		id,
		label,
		...opts,
		getStatus: (datasets) => recency(find(datasets, datasetLabel)?.quizTypeLastRun[mode] ?? null),
		getDate: (datasets) => find(datasets, datasetLabel)?.quizTypeLastRun[mode] ?? null,
	}
}

function withInfoSheet(id: string, datasetLabel: string, infoSheet: string, label: string, opts: StepOpts = {}): RoadmapStep {
	return {
		id,
		label,
		...opts,
		getStatus: (datasets) => find(datasets, datasetLabel)?.infoSheets.includes(infoSheet) ? 'fresh' : 'never',
		getDate: () => null,
	}
}

function spacer(id: string, opts: StepOpts = {}): RoadmapStep {
	return {
		id,
		label: '',
		placeholder: true,
		...opts,
		getStatus: () => 'never',
		getDate: () => null,
	}
}

function withMultipleFonts(id: string, datasetLabel: string, label: string, opts: StepOpts = {}): RoadmapStep {
	return {
		id,
		label,
		...opts,
		getStatus: (datasets) => (find(datasets, datasetLabel)?.fonts.length ?? 0) > 1 ? 'fresh' : 'never',
		getDate: () => null,
	}
}

export const roadmaps: ScriptRoadmap[] = [
	{
		scriptId: 'thai',
		steps: [
			// Starters
			datasetStep('consonants', 'Consonants', { hint: 'Start from the basics' }),
			datasetStep('vowels', 'Vowels', { hint: 'Start from the basics' }),
			datasetModeStep(
				'syllables_mc',
				'Syllables',
				'multiplechoice',
				'Syllables — multiple choice',
				{ hint: 'Or just try to read!' },
			),

			// Level 2
			datasetModeStep('syllables_typein', 'Syllables', 'typein', 'Syllables — type in', {
				requires: ['consonants', 'vowels'],
			}),
			datasetStep('all_vowels', 'All vowels', {
				requires: ['vowels'],
				hint: 'If you wanna learn it all',
			}),
			datasetModeStep('provinces_mc', 'Provinces', 'multiplechoice', 'Provinces — multiple choice', {
				requires: ['syllables_mc'],
			}),

			// Lvl 3 has a spacer for visual purposes, it's kinda between 2/3
			spacer('spacer_l2', { requires: ['syllables_typein'] }),
			datasetModeStep('prefixed_provinces_mc', 'Prefixed provinces', 'multiplechoice', 'Prefixed provinces — multiple choice', {
				requires: ['provinces_mc'],
			}),

			// Level 3 -- here's where you learn to read
			datasetModeStep('provinces_typein', 'Provinces', 'typein', 'Provinces — type in', {
				requires: ['syllables_typein', 'prefixed_provinces_mc'],
			}),

			// Level 4 -- advancing the skills
			withInfoSheet('provinces_no_ref', 'Provinces', 'None', 'Provinces — no lookup sheet', {
				requires: ['provinces_typein'],
				hint: 'Set the info sheet to None and see if you know em!',
			}),
			withMultipleFonts('provinces_font', 'Provinces', 'Provinces — different font', {
				requires: ['provinces_typein'],
				hint: 'Thai sans fonts can look very different',
			}),
			datasetModeStep('prefixed_typein', 'Prefixed provinces', 'typein', 'Prefixed provinces — type in', {
				requires: ['provinces_typein'],
			}),

			// Final boss :))
			{
				id: 'prefixed_mastery',
				label: 'Prefixed provinces — mastery',
				hint: 'Type in prefixed provinces, no reference sheet, in multiple fonts',
				requires: ['prefixed_typein', 'provinces_no_ref', 'provinces_font'],
				getStatus: (datasets) => {
					const d = find(datasets, 'Prefixed provinces')
					if (!d) return 'never'
					if (!d.infoSheets.includes('None') || d.fonts.length <= 1) return 'never'

					return recency(d.quizTypeLastRun['typein'] ?? null)
				},
				getDate: (datasets) => find(datasets, 'Prefixed provinces')?.quizTypeLastRun['typein'] ?? null,
			},
		],
	},
	{
		scriptId: 'cyrillic',
		steps: [
			datasetModeStep('letters_typein', 'All letters', 'typein', 'All letters — type in'),
			datasetModeStep('letters_mc', 'All letters', 'multiplechoice', 'All letters — multiple choice'),
			datasetModeStep('toponyms_typein', 'Toponyms', 'typein', 'Toponyms — type in', {
				requires: ['letters_typein'],
			}),
			datasetModeStep('toponyms_mc', 'Toponyms', 'multiplechoice', 'Toponyms — multiple choice', {
				requires: ['letters_mc'],
			}),
			withInfoSheet('toponyms_no_ref', 'Toponyms', 'None', 'Toponyms — no reference sheet', {
				requires: ['toponyms_typein'],
				hint: 'Practice recalling from memory',
			}),
			withMultipleFonts('toponyms_font', 'Toponyms', 'Toponyms — different font', {
				requires: ['toponyms_typein'],
				hint: 'Cursive Cyrillic has noticeably different letterforms',
			}),
		],
	},
]

export const roadmapsByScriptId = Object.fromEntries(roadmaps.map(r => [r.scriptId, r]))
