import type { Question } from './dataset'

export function shuffle<T>(arr: T[]): T[] {
	const a = [...arr]

	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const tmp = a[i]; a[i] = a[j] as T; a[j] = tmp as T
	}

	return a
}

export function canonicalAnswer(q: Question): string {
	return Array.isArray(q.answer) ? (q.answer[0] ?? '') : q.answer
}

export function allAnswers(q: Question): string[] {
	return Array.isArray(q.answer) ? q.answer : [q.answer]
}

export function formatAnswers(q: Question): string {
	return allAnswers(q).join(' / ')
}

export function levenshtein(a: string, b: string): number {
	const m = a.length
	const n = b.length

	let prev = [...Array(n + 1).keys()]

	for (let i = 1; i <= m; i++) {
		const curr: number[] = [i]

		for (let j = 1; j <= n; j++)
			curr[j] = a[i - 1] === b[j - 1]
				? prev[j - 1]!
				: 1 + Math.min(prev[j]!, curr[j - 1]!, prev[j - 1]!)

		prev = curr
	}

	return prev[n]!
}

export function relativeDate(iso: string): string {
	const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)

	if (days === 0) return 'today'
	if (days === 1) return 'yesterday'
	if (days < 14) return `${days}d ago`
	if (days < 60) return `${Math.floor(days / 7)}w ago`

	return `${Math.floor(days / 30)}mo ago`
}

export interface PromptStat {
	total: number
	correct: number
	lastCorrectAt: string | null
}

function basePriority(q: Question, statsMap: Map<string, PromptStat>): number {
	const s = statsMap.get(q.prompt)

	if (!s || s.total === 0) return 0

	if (s.correct / s.total < 0.5 || !s.lastCorrectAt) return 1

	const daysSince = (Date.now() - new Date(s.lastCorrectAt).getTime()) / 86400000

	return daysSince > 7 ? 2 : 3
}

export function revisionSample(
	questions: Question[],
	statsMap: Map<string, PromptStat>,
	count: number,
): Question[] {
	if (!questions.length) return []

	const bucketWeights = [8, 4, 2, 1]
	const shownCounts = new Map<string, number>()
	const result: Question[] = []

	for (let i = 0; i < count; i++) {
		const buckets: Question[][] = [[], [], [], []]

		for (const q of questions) {
			const priority = shownCounts.has(q.prompt) ? 3 : basePriority(q, statsMap)
			buckets[priority]!.push(q)
		}

		const activeBuckets = buckets
			.map((pool, idx) => ({ weight: bucketWeights[idx]!, pool }))
			.filter(b => b.pool.length > 0)

		const totalWeight = activeBuckets.reduce((sum, b) => sum + b.weight, 0)
		let r = Math.random() * totalWeight
		let picked = activeBuckets[activeBuckets.length - 1]!.pool[0]!

		for (const bucket of activeBuckets) {
			r -= bucket.weight

			if (r <= 0) {
				picked = bucket.pool[Math.floor(Math.random() * bucket.pool.length)]!
				break
			}
		}

		result.push(picked)
		shownCounts.set(picked.prompt, (shownCounts.get(picked.prompt) ?? 0) + 1)
	}

	return result
}

export function isMatch(input: string, answer: string | string[], tolerance = 0): boolean {
	const n = input.toLowerCase().trim()
	const answers = Array.isArray(answer) ? answer : [answer]

	if (0 === tolerance)
		return answers.some(a => a.toLowerCase().trim() === n)

	return answers.some(a => levenshtein(n, a.toLowerCase().trim()) <= tolerance)
}
