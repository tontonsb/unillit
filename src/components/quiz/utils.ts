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

export function isMatch(input: string, answer: string | string[], tolerance = 0): boolean {
	const n = input.toLowerCase().trim()
	const answers = Array.isArray(answer) ? answer : [answer]

	if (0 === tolerance)
		return answers.some(a => a.toLowerCase().trim() === n)

	return answers.some(a => levenshtein(n, a.toLowerCase().trim()) <= tolerance)
}
