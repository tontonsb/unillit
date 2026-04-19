import { supabase } from '@/lib/supabase'

export interface RunRecord {
	id: string
	total: number
	correct: number
	completed: boolean
	startedAt: string
	completedAt: string | null
}

export interface AllRunRecord extends RunRecord {
	scriptId: string
	dataset: string
}

export async function fetchAllRuns(): Promise<AllRunRecord[]> {
	const { data, error } = await supabase
		.from('quiz_runs')
		.select('id, script_id, dataset, total, correct, completed, started_at, completed_at')
		.order('started_at', { ascending: false })
		.limit(200)

	if (error || !data) return []
	return data.map(row => ({
		id: row.id,
		scriptId: row.script_id,
		dataset: row.dataset,
		total: row.total,
		correct: row.correct,
		completed: row.completed,
		startedAt: row.started_at,
		completedAt: row.completed_at,
	}))
}

export interface QuestionStats {
	prompt: string
	quizType: string | null
	font: string | null
	infoSheet: string | null
	tolerance: number
	total: number
	correct: number
	avgErrors: number
	lastAnsweredAt: string
}

interface RunContext {
	quizType?: string
	font?: string
	infoSheet?: string
	tolerance?: number
}

interface AnswerContext {
	font?: string
	infoSheet?: string
	tolerance?: number
	errors?: number
}

export function useStats(scriptId: string, dataset: string) {
	let runId: string | null = null
	let correctCount = 0

	async function startRun(total: number, context: RunContext = {}) {
		runId = null
		correctCount = 0

		const { data: { user } } = await supabase.auth.getUser()
		if (!user) return

		const { data } = await supabase
			.from('quiz_runs')
			.insert({
				user_id: user.id,
				script_id: scriptId,
				dataset,
				total,
				quiz_type: context.quizType ?? null,
				font: context.font ?? null,
				info_sheet: context.infoSheet ?? null,
				tolerance: context.tolerance ?? 0,
			})
			.select('id')
			.single()

		runId = data?.id ?? null
	}

	async function recordAnswer(prompt: string, correct: boolean, ctx: AnswerContext = {}) {
		const { data: { user } } = await supabase.auth.getUser()
		if (!user || !runId) return

		if (correct) correctCount++

		await supabase.from('quiz_answers').insert({
			run_id: runId,
			user_id: user.id,
			prompt,
			correct,
			font: ctx.font ?? null,
			info_sheet: ctx.infoSheet ?? null,
			tolerance: ctx.tolerance ?? 0,
			errors: ctx.errors ?? 0,
		})
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
			.select('prompt, quiz_type, font, info_sheet, tolerance, total, correct, avg_errors, last_answered_at')
			.eq('script_id', scriptId)
			.eq('dataset', dataset)

		if (error || !data) return []

		return data.map(row => ({
			prompt: row.prompt,
			quizType: row.quiz_type,
			font: row.font,
			infoSheet: row.info_sheet,
			tolerance: row.tolerance ?? 0,
			total: row.total,
			correct: row.correct,
			avgErrors: row.avg_errors ?? 0,
			lastAnsweredAt: row.last_answered_at,
		}))
	}

	async function fetchRuns(): Promise<RunRecord[]> {
		const { data, error } = await supabase
			.from('quiz_runs')
			.select('id, total, correct, completed, started_at, completed_at')
			.eq('script_id', scriptId)
			.eq('dataset', dataset)
			.order('started_at', { ascending: false })
			.limit(100)

		if (error || !data) return []
		return data.map(row => ({
			id: row.id,
			total: row.total,
			correct: row.correct,
			completed: row.completed,
			startedAt: row.started_at,
			completedAt: row.completed_at,
		}))
	}

	return { startRun, recordAnswer, completeRun, fetchStats, fetchRuns }
}
