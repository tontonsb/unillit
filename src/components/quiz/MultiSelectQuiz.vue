<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Question, QuizDataset } from './dataset'
import type { Phase } from './useSession'
import { allAnswers, shuffle } from './utils'

const MAX_OPTIONS = 5

const props = defineProps<{
	current: Question
	phase: Phase
	dataset: QuizDataset
}>()

const emit = defineEmits<{
	answer: [correct: boolean, errors?: number]
}>()

const selected = ref<Set<string>>(new Set())

/**
 * The option pool.
 *
 * Preferrently defined explicitly as `options` in the dataset.
 * Fallback: extract options from all the question answers.
 */
const pool = computed<string[]>(() => {
	if (props.dataset.options)
		return props.dataset.options

	const set = new Set<string>()
	for (const q of props.dataset.questions)
		for (const a of allAnswers(q))
			set.add(a)

	return [...set]
})

const options = ref<string[]>([])

/**
 * One answer will always be correct (as long as a correct one exists).
 * One will always be wrong (if such exists).
 * The rest are randomly drawn from the pool and may differ on retakes.
 */
function buildOptions(): string[] {
	const answerSet = new Set(allAnswers(props.current))
	const corrects = pool.value.filter(o => answerSet.has(o))
	const wrongs = pool.value.filter(o => !answerSet.has(o))

	const seeded: string[] = []
	if (corrects.length)
		seeded.push(shuffle(corrects)[0]!)

	if (wrongs.length)
		seeded.push(shuffle(wrongs)[0]!)

	// Add the others to seeded, remove dupes (the seeded remain first).
	const list = [...new Set([...seeded, ...shuffle(pool.value)])]

	return shuffle(list.slice(0, MAX_OPTIONS))
}

// Corrects among the shown ones — to know if the answer is right.
const correctSet = computed(() =>
	new Set(options.value.filter(o => allAnswers(props.current).includes(o)))
)

watch(() => props.current, () => {
	selected.value = new Set()
	options.value = buildOptions()
}, { immediate: true })

watch(() => props.phase, (phase) => {
	if (phase === 'question')
		selected.value = new Set()
})

function toggle(opt: string) {
	if (props.phase === 'answered')
		return

	const next = new Set(selected.value)

	if (next.has(opt)) next.delete(opt)
	else next.add(opt)

	selected.value = next
}

function check() {
	let errors = 0

	for (const opt of options.value)
		if (selected.value.has(opt) !== correctSet.value.has(opt))
			errors++

	emit('answer', errors === 0, errors)
}

// Green — hits, red — wrong picks, outlined — missed corrects
function optClass(opt: string): string {
	if (props.phase !== 'answered')
		return selected.value.has(opt) ? 'selected' : ''

	const picked = selected.value.has(opt)
	const right = correctSet.value.has(opt)

	if (picked && right)
		return 'correct'

	if (picked && !right)
		return 'wrong'

	if (!picked && right)
		return 'missed'

	return 'dim'
}
</script>

<template>
	<p v-if="dataset.instructions" class="instructions">{{ dataset.instructions }}</p>
	<div class="choices">
		<button
			v-for="opt in options"
			:key="opt"
			type="button"
			class="choice"
			:class="optClass(opt)"
			:disabled="phase === 'answered'"
			@click="toggle(opt)"
		>
			<span class="box">{{ selected.has(opt) ? '☑' : '☐' }}</span>
			<span>{{ opt }}</span>
		</button>
	</div>
	<button
		v-if="phase === 'question'"
		type="button"
		class="btn-check"
		@click="check"
	>Check</button>
</template>

<style scoped>
.instructions {
	font-size: var(--fs-chrome);
	color: var(--c-muted);
	text-align: center;
	margin: 0;
}

.choices {
	display: flex;
	flex-direction: column;
	gap: var(--sp-8);
	width: 100%;
	max-width: var(--w-quiz-control);
}

.choice {
	display: flex;
	align-items: center;
	gap: var(--sp-8);
	padding: var(--sp-10) var(--sp-16);
	border: var(--hairline);
	border-radius: var(--radius);
	background: var(--c-cell);
	color: var(--c-label);
	font-size: var(--fs-body);
	font-family: var(--sans);
	cursor: pointer;
	text-align: left;
	transition: border-color var(--dur), background var(--dur);
}

.choice:disabled { cursor: default; }

.choice:hover:not(:disabled) {
	border-color: var(--c-sign);
	background: var(--c-alt);
}

.box { font-size: 16px; line-height: 1; }

.choice.selected { border-color: var(--c-sign); background: var(--c-alt); color: var(--c-head); }
.choice.correct  { background: var(--fb-ok-bg); border-color: var(--c-good); color: var(--c-good); }
.choice.wrong    { background: var(--fb-wrong-bg); border-color: var(--c-bad); color: var(--c-bad); }
.choice.missed   { border-color: var(--c-good); color: var(--c-good); border-style: dashed; }
.choice.dim      { opacity: 0.4; }

.btn-check {
	padding: var(--sp-8) var(--sp-20);
	border: none;
	border-radius: var(--radius);
	background: var(--c-accent);
	color: var(--c-on-sign);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity var(--dur);
}

.btn-check:hover { opacity: 0.85; }
</style>
