import { supabase } from '@/lib/supabase'
import { scriptList, scriptStatus } from '@/scripts/scripts'
import type { QuizDataset } from '@/components/quiz/dataset'

export interface DatasetProgress {
	label: string
	lastRunAt: string | null
	quizTypeLastRun: Record<string, string>
	fonts: string[]
	infoSheets: string[]
}

export interface ScriptProgress {
	id: string
	name: string
	nativeName: string
	datasets: DatasetProgress[]
	anyRuns: boolean
}

export async function fetchScriptProgress(): Promise<ScriptProgress[]> {
	const { data, error } = await supabase
		.from('quiz_runs')
		.select('script_id, dataset, started_at, font, info_sheet, quiz_type')
		.order('started_at', { ascending: false })

	if (error || !data) return []

	const runMap = new Map<string, {
		lastRunAt: string
		quizTypeLastRun: Map<string, string>
		fonts: Set<string>
		infoSheets: Set<string>
	}>()

	for (const row of data) {
		const key = `${row.script_id}::${row.dataset}`
		const existing = runMap.get(key)

		if (existing) {
			if (row.quiz_type && !existing.quizTypeLastRun.has(row.quiz_type))
				existing.quizTypeLastRun.set(row.quiz_type, row.started_at)
			if (row.font) existing.fonts.add(row.font)
			if (row.info_sheet) existing.infoSheets.add(row.info_sheet)
		} else {
			runMap.set(key, {
				lastRunAt: row.started_at,
				quizTypeLastRun: new Map(row.quiz_type ? [[row.quiz_type, row.started_at]] : []),
				fonts: new Set(row.font ? [row.font] : []),
				infoSheets: new Set(row.info_sheet ? [row.info_sheet] : []),
			})
		}
	}

	return scriptList
		.filter(s => scriptStatus(s) !== 'coming')
		.map(script => {
			const expectedDatasets = (script.practiceTabs ?? [])
				.map(tab => (tab.props?.dataset as QuizDataset | undefined)?.label)
				.filter((l): l is string => !!l)

			const datasets: DatasetProgress[] = expectedDatasets.map(label => {
				const entry = runMap.get(`${script.id}::${label}`)

				return {
					label,
					lastRunAt: entry?.lastRunAt ?? null,
					quizTypeLastRun: entry ? Object.fromEntries(entry.quizTypeLastRun) : {},
					fonts: entry ? [...entry.fonts] : [],
					infoSheets: entry ? [...entry.infoSheets] : [],
				}
			})

			datasets.sort((a, b) => {
				if (!a.lastRunAt && !b.lastRunAt) return 0
				if (!a.lastRunAt) return -1
				if (!b.lastRunAt) return 1

				return a.lastRunAt < b.lastRunAt ? -1 : 1
			})

			const anyRuns = datasets.some(d => d.lastRunAt !== null)

			return { id: script.id, name: script.name, nativeName: script.nativeName, datasets, anyRuns }
		})
}
