import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Question, QuizDataset } from './dataset'
import { shuffle } from './utils'

export type Phase = 'question' | 'answered' | 'done'

function buildSession(questions: Question[], count: number | null): Question[] {
	if (!count) return shuffle(questions)
	if (!questions.length) return []
	
	return Array.from({ length: count }, () => questions[Math.floor(Math.random() * questions.length)]!)
}

export function useQuizSession(dataset: Ref<QuizDataset>) {
	const session = ref<Question[]>([])
	const index = ref(0)
	const phase = ref<Phase>('question')
	const tally = ref({ correct: 0, wrong: 0 })

	const current = computed(() => session.value[index.value] as Question | undefined)
	const progress = computed(() => `${index.value + (phase.value !== 'question' ? 1 : 0)} / ${session.value.length}`)

	function startSession(count?: number | null) {
		session.value = buildSession(dataset.value.questions, count ?? null)
		index.value = 0
		phase.value = 'question'
		tally.value = { correct: 0, wrong: 0 }
	}

	function submit(correct: boolean) {
		if (correct) tally.value.correct++
		else tally.value.wrong++
		phase.value = 'answered'
	}

	function advance() {
		if (index.value + 1 >= session.value.length) {
			phase.value = 'done'
		} else {
			index.value++
			phase.value = 'question'
		}
	}

	return { session, index, phase, tally, current, progress, startSession, submit, advance }
}
