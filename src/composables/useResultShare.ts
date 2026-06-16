import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { QuizKind, QuizMode } from '@/components/quiz/dataset'
import { scriptsById, datasetsById } from '@/scripts/scripts'
import { practiceTab } from '@/composables/useScriptContext'
import { encodeResult } from '@/lib/tabLink'
import { samplingMode, randomCount } from '@/composables/useQuizPrefs'

type TierSet = [top: string, high: string, mid: string, low: string, none: string]

function tier(kind: QuizKind | undefined, pct: number, name: string): string {
	const tiers: Record<QuizKind, TierSet> = {
		letters: [
			`🏔️ I'm at peak ${name} literacy! 🏔️`,
			`🎓 I'm certifiedly literate in ${name}! 🎓`,
			`📝 On my way to fight ${name} illiteracy 📝`,
			`✍️ I'm becoming a ${name} alphabet explorer ✍️`,
			`🙈 I can confirm that the ${name} script exists 🙈`,
		],
		toponyms: [
			`🧭 I'm an officially certified ${name} toponymist! 🧭`,
			`🗺️ I'm the ${name} border expert! 🗺️`,
			`📍 In ${name} I feel like a regional expert 📍`,
			`✍️ I'm a junior ${name} decipherer ✍️`,
			`🙈 I'm an honest ${name} tourist 🙈`,
		],
		language: [
			`🕵️ I'm an officially certified ${name} scriptologist! 🕵️`,
			`📐 I got the ${name} scriptorito dorito! 📐`,
			`🔎 I'm an apprentice ${name} script detective 🔎`,
			`✍️ I'm kind of a scriptguesser of ${name} ✍️`,
			`🙈 The ${name} script is the confusingest... 🙈`,
		],
	}

	const set = tiers[kind ?? 'letters']

	if (pct >= 97) return set[0]
	if (pct >= 90) return set[1]
	if (pct >= 70) return set[2]
	if (pct >= 40) return set[3]

	return set[4]
}

interface RunResult {
	mode: () => QuizMode
	correct: () => number
	total: () => number
}

export function useResultShare(run: RunResult) {
	const route = useRoute()
	const router = useRouter()
	const resultCopied = ref(false)
	let resultCopiedTimer: ReturnType<typeof setTimeout> | undefined

	const scriptId = computed(() => route.params.id as string | undefined)
	const dataset = computed(() =>
		scriptId.value ? datasetsById[scriptId.value]?.[practiceTab.value] : undefined
	)

	// link to view, including the quiz config
	function quizLink(): string {
		if (!scriptId.value) return location.origin

		const href = router.resolve({
			path: `/scripts/${scriptId.value}`,
			query: { t: encodeResult(run.mode(), samplingMode.value, randomCount.value) },
		}).href

		return location.origin + href
	}

	function shareText(): string {
		const name = (scriptId.value && scriptsById[scriptId.value]?.name) || 'Unillit'
		const label = dataset.value?.label ?? ''
		const correct = run.correct()
		const total = run.total()
		const pct = total ? Math.round((correct / total) * 100) : 0

		return [
			tier(dataset.value?.kind, pct, name),
			`I scored ${correct}/${total} (${pct}%) on the ${name} ${label} quiz`,
			'Can you match my score?',
			quizLink(),
		].join('\n')
	}

	function copyResults() {
		navigator.clipboard.writeText(shareText())

		resultCopied.value = true
		clearTimeout(resultCopiedTimer)
		resultCopiedTimer = setTimeout(() => { resultCopied.value = false }, 1500)
	}

	return { resultCopied, copyResults }
}
