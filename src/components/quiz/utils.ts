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

export function isMatch(input: string, answer: string | string[]): boolean {
	const n = input.toLowerCase().trim()
	const answers = Array.isArray(answer) ? answer : [answer]
	return answers.some(a => a.toLowerCase().trim() === n)
}
