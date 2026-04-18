import { supabase } from '@/lib/supabase'

export interface QuestionStats {
	prompt: string
	total: number
	correct: number
	lastAnsweredAt: string
}

export function useStats(scriptId: string, dataset: string) {
	let runId: string | null = null
	let correctCount = 0

	async function startRun(total: number) {
		runId = null
		correctCount = 0

		const { data: { user } } = await supabase.auth.getUser()
		if (!user) return

		const { data } = await supabase
			.from('quiz_runs')
			.insert({ user_id: user.id, script_id: scriptId, dataset, total })
			.select('id')
			.single()

		runId = data?.id ?? null
	}

	async function recordAnswer(prompt: string, correct: boolean) {
		const { data: { user } } = await supabase.auth.getUser()
		if (!user || !runId) return

		if (correct) correctCount++

		await supabase.from('quiz_answers').insert({ run_id: runId, user_id: user.id, prompt, correct })
	}

	async function completeRun() {
		if (!runId) return
		await supabase
			.from('quiz_runs')
			.update({ correct: correctCount, completed: true, completed_at: new Date().toISOString() })
			.eq('id', runId)
	}

	async function fetchStats(): Promise<QuestionStats[]> {
		const { data, error } = await supabase
			.from('question_stats')
			.select('prompt, total, correct, last_answered_at')
			.eq('script_id', scriptId)
			.eq('dataset', dataset)

		if (error || !data) return []

		return data.map(row => ({
			prompt: row.prompt,
			total: row.total,
			correct: row.correct,
			lastAnsweredAt: row.last_answered_at,
		}))
	}

	return { startRun, recordAnswer, completeRun, fetchStats }
}
