import type { QuizMode } from '@/components/quiz/dataset'
import { infoTab, practiceTab } from '@/composables/useScriptContext'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'

type SamplingMode = 'shuffled' | 'random' | 'revision'

const QUIZ_MODES: QuizMode[] = ['typein', 'multiplechoice', 'multiselect']
const SAMPLING_MODES: SamplingMode[] = ['shuffled', 'random', 'revision']

/**
 * Pack view state into a base64 token.
 * For a tiny bit of obscurity — to not invite obvious URL editing.
 */
function pack(parts: (string | number)[]): string {
	return btoa(parts.join('~')).replace(/=+$/, '')
}

// tabs-only link to the current view for the default "Link" feature
export function encodeTabs(): string {
	return pack([infoTab.value, practiceTab.value])
}

// full view with quiz preferences for the results' sharing link
export function encodeResult(mode: QuizMode, sampling: SamplingMode, count: number): string {
	/**
	 * Revision is downgraded to random, cause revision is too user specific to
	 * be comparable and it's only available to logged-in users.
	 */
	const shareable = sampling === 'revision' ? 'random' : sampling

	return pack([infoTab.value, practiceTab.value, mode, shareable, count])
}

/**
 * Apply config carried by the token.
 *
 * The tab indices are returned to caller to handle.
 */
export function applyShare(token: unknown): [info?: string, practice?: string] {
	if (typeof token !== 'string') return []

	let parts: string[]

	try {
		parts = atob(token).split('~')
	} catch {
		return []
	}

	// positions are known; values are still validated against the allowed sets
	const [info, practice, mode, sampling, count] =
		parts as [string, string, QuizMode, SamplingMode, string]

	if (QUIZ_MODES.includes(mode))
		preferredMode.value = mode

	if (SAMPLING_MODES.includes(sampling))
		samplingMode.value = sampling

	const n = Number(count)
	if (!Number.isNaN(n) && n > 0)
		randomCount.value = Math.trunc(n)

	return [info, practice]
}
