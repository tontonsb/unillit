<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { QuizDataset } from './dataset'
import { useStats, type QuestionStats } from '@/composables/useStats'
import { useAuth } from '@/composables/useAuth'
import { relativeDate } from './utils'

const props = defineProps<{
	scriptId?: string
	promptClass?: string
	datasets: QuizDataset[]
	datasetIndex: number
}>()

const { user, loginWithDiscord } = useAuth()

const statsData = ref<QuestionStats[]>([])
const statsLoading = ref(false)

const stats = computed(() => {
	const dataset = props.datasets[props.datasetIndex]
	return props.scriptId && dataset
		? useStats(props.scriptId, dataset.label)
		: null
})

async function loadStats() {
	if (!stats.value || !user.value) return
	statsLoading.value = true
	statsData.value = await stats.value.fetchStats()
	statsLoading.value = false
}

onMounted(loadStats)
watch(() => props.datasetIndex, loadStats)
watch(user, loadStats)

// Collect distinct non-null values for each dimension
const availableQuizTypes = computed(() => [...new Set(statsData.value.map(s => s.quizType).filter(Boolean))] as string[])
const availableFonts = computed(() => [...new Set(statsData.value.map(s => s.font).filter(Boolean))] as string[])
const availableInfoSheets = computed(() => [...new Set(statsData.value.map(s => s.infoSheet).filter(Boolean))] as string[])
const availableTolerances = computed(() => [...new Set(statsData.value.map(s => s.tolerance))].sort((a, b) => a - b))

const filterQuizType = ref<string | null>(null)
const filterFont = ref<string | null>(null)
const filterInfoSheet = ref<string | null>(null)
const filterTolerance = ref<number | null>(null)

// Reset filters when data changes
watch(statsData, () => {
	filterQuizType.value = null
	filterFont.value = null
	filterInfoSheet.value = null
	filterTolerance.value = null
})

const filteredStats = computed(() => statsData.value.filter(s =>
	(filterQuizType.value === null || s.quizType === filterQuizType.value) &&
	(filterFont.value === null || s.font === filterFont.value) &&
	(filterInfoSheet.value === null || s.infoSheet === filterInfoSheet.value) &&
	(filterTolerance.value === null || s.tolerance === filterTolerance.value)
))

// Aggregate filtered rows per prompt
const statsRows = computed(() => {
	const questions = props.datasets[props.datasetIndex]?.questions ?? []

	const byPrompt = new Map<string, { total: number; correct: number; lastAnsweredAt: string }>()
	for (const s of filteredStats.value) {
		const existing = byPrompt.get(s.prompt)
		if (existing) {
			existing.total += s.total
			existing.correct += s.correct
			if (s.lastAnsweredAt > existing.lastAnsweredAt) existing.lastAnsweredAt = s.lastAnsweredAt
		} else {
			byPrompt.set(s.prompt, { total: s.total, correct: s.correct, lastAnsweredAt: s.lastAnsweredAt })
		}
	}

	return questions.map(q => ({
		prompt: q.prompt,
		stats: byPrompt.get(q.prompt) ?? null,
	})).sort((a, b) => {
		const ra = a.stats ? a.stats.correct / a.stats.total : -1
		const rb = b.stats ? b.stats.correct / b.stats.total : -1
		if (ra !== rb) return rb - ra
		return (b.stats?.total ?? 0) - (a.stats?.total ?? 0)
	})
})

const hasFilters = computed(() =>
	availableQuizTypes.value.length > 1 ||
	availableFonts.value.length > 1 ||
	availableInfoSheets.value.length > 1 ||
	availableTolerances.value.length > 1
)

const MONTH_MS = 30 * 24 * 60 * 60 * 1000

const masteredPrompts = computed(() => new Set(
	statsData.value
		.filter(s =>
			s.quizType === 'typein' &&
			!s.infoSheet &&
			s.avgErrors === 0 &&
			s.correct > 0 &&
			Date.now() - new Date(s.lastAnsweredAt).getTime() < MONTH_MS
		)
		.map(s => s.prompt)
))

const nudge = computed(() => {
	if (!statsData.value.length) return null
	const parts: string[] = []
	if (availableFonts.value.length <= 1) parts.push('a different font')
	const hasWithSheet = statsData.value.some(s => !!s.infoSheet)
	const hasWithoutSheet = statsData.value.some(s => !s.infoSheet)
	if (hasWithSheet && !hasWithoutSheet) parts.push('without the info sheet open')
	if (!parts.length) return null
	return `Try practicing with ${parts.join(', or ')} to compare your accuracy — and earn ★ badges for unassisted recall.`
})

</script>

<template>
	<div class="stats-panel">
		<div v-if="!user" class="stats-empty stats-login">
			<p>Log in to track your progress and see per-question accuracy.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
		</div>
		<div v-else-if="statsLoading" class="stats-empty">Loading…</div>
		<div v-else-if="!scriptId" class="stats-empty">Stats not available for this quiz.</div>
		<template v-else>
			<div v-if="hasFilters" class="filter-bar">
				<template v-if="availableQuizTypes.length > 1">
					<button
						v-for="v in availableQuizTypes"
						:key="v"
						type="button"
						class="filter-pill"
						:class="{ active: filterQuizType === v }"
						@click="filterQuizType = filterQuizType === v ? null : v"
					>{{ v }}</button>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableFonts.length > 1">
					<button
						v-for="v in availableFonts"
						:key="v"
						type="button"
						class="filter-pill"
						:class="{ active: filterFont === v }"
						@click="filterFont = filterFont === v ? null : v"
					>{{ v }}</button>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableInfoSheets.length > 1">
					<button
						v-for="v in availableInfoSheets"
						:key="v"
						type="button"
						class="filter-pill"
						:class="{ active: filterInfoSheet === v }"
						@click="filterInfoSheet = filterInfoSheet === v ? null : v"
					>{{ v }}</button>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableTolerances.length > 1">
					<button
						v-for="v in availableTolerances"
						:key="v"
						type="button"
						class="filter-pill"
						:class="{ active: filterTolerance === v }"
						@click="filterTolerance = filterTolerance === v ? null : v"
					>±{{ v }}</button>
				</template>
			</div>
			<div v-if="nudge" class="nudge-bar">{{ nudge }}</div>
			<table class="stats-table">
				<thead>
					<tr>
						<th class="badge-col"></th>
						<th>Question</th>
						<th>Correct</th>
						<th>Accuracy</th>
						<th>Last seen</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in statsRows" :key="row.prompt">
						<td class="badge-cell">
							<span v-if="masteredPrompts.has(row.prompt)" class="mastery-badge" title="Answered correctly without assistance this month">★</span>
						</td>
						<td class="prompt-cell" :class="promptClass">{{ row.prompt }}</td>
						<td>{{ row.stats ? `${row.stats.correct} / ${row.stats.total}` : '—' }}</td>
						<td>
							<span v-if="row.stats" class="accuracy" :class="row.stats.correct / row.stats.total >= 0.8 ? 'good' : row.stats.correct / row.stats.total >= 0.5 ? 'ok' : 'bad'">
								{{ Math.round(row.stats.correct / row.stats.total * 100) }}%
							</span>
							<span v-else class="never">never</span>
						</td>
						<td class="muted">{{ row.stats ? relativeDate(row.stats.lastAnsweredAt) : '—' }}</td>
					</tr>
				</tbody>
			</table>
		</template>
	</div>
</template>

<style scoped>
.stats-panel {
	flex: 1;
	overflow-y: auto;
}

.stats-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--c-muted);
	font-size: 0.9rem;
}

.stats-login {
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;
	text-align: center;
}

.filter-bar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 4px;
	padding: 6px 12px;
	border-bottom: 1px solid var(--c-border);
	background: var(--c-cell);
	position: sticky;
	top: 0;
}

.filter-pill {
	padding: 2px 8px;
	border: 1px solid var(--c-border);
	border-radius: 10px;
	background: transparent;
	color: var(--c-muted);
	font-size: 10px;
	font-family: var(--sans);
	font-weight: 600;
	letter-spacing: 0.04em;
	cursor: pointer;
	transition: all 0.15s;
}

.filter-pill:hover {
	color: var(--c-label);
	border-color: var(--c-label);
}

.filter-pill.active {
	background: var(--c-alt);
	border-color: var(--c-accent);
	color: var(--c-head);
}

.filter-sep {
	width: 1px;
	height: 14px;
	background: var(--c-border);
	margin: 0 2px;
}

.nudge-bar {
	padding: 6px 12px;
	border-bottom: 1px solid var(--c-border);
	background: var(--c-cell);
	font-size: 11px;
	color: var(--c-muted);
	position: sticky;
	top: 0;
}

.badge-col {
	width: 20px;
	padding: 0 !important;
}

.badge-cell {
	width: 20px;
	padding: 0 4px !important;
	text-align: center;
}

.mastery-badge {
	font-size: 11px;
	color: #c8952a;
	line-height: 1;
}

.stats-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 12px;
}

.stats-table th {
	position: sticky;
	top: 0;
	background: var(--c-cell);
	color: var(--c-muted);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	font-size: 10px;
	padding: 6px 12px;
	text-align: left;
	border-bottom: 1px solid var(--c-border);
}

.stats-table td {
	padding: 5px 12px;
	border-bottom: 1px solid var(--c-border);
	color: var(--c-label);
}

.prompt-cell {
	font-size: 1.4rem;
	line-height: 1.3;
	color: var(--c-head);
}

.accuracy.good { color: #3a7d44; }
.accuracy.ok   { color: #a07020; }
.accuracy.bad  { color: #b94040; }

.never { color: var(--c-muted); }
.muted { color: var(--c-muted); }

.btn-primary {
	padding: 8px 20px;
	border: none;
	border-radius: 4px;
	background: var(--c-accent);
	color: #fff;
	font-size: 13px;
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity 0.15s;
}

.btn-primary:hover { opacity: 0.85; }
</style>
