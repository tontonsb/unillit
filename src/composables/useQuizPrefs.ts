import { ref, watch } from 'vue'
import type { QuizMode } from '@/components/quiz/dataset'

const storageKey = 'quiz-prefs'

function load() {
	try { return JSON.parse(localStorage.getItem(storageKey) ?? '{}') } catch { return {} }
}

const stored = load()

export const samplingMode = ref<'shuffled' | 'random'>(stored.samplingMode ?? 'shuffled')
export const randomCount  = ref<number>(stored.randomCount ?? 10)
export const preferredMode = ref<QuizMode>(stored.preferredMode ?? 'typein')

watch([samplingMode, randomCount, preferredMode], () => {
	try {
		localStorage.setItem(storageKey, JSON.stringify({
			samplingMode: samplingMode.value,
			randomCount: randomCount.value,
			preferredMode: preferredMode.value,
		}))
	} catch {}
}, { flush: 'post' })
