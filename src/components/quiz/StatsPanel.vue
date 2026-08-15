<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { QuizDataset } from './dataset'
import { useStats, type QuestionStats } from '@/composables/useStats'
import { useAuth } from '@/composables/useAuth'
import { relativeDate } from './utils'
import PillControl from '@/components/PillControl.vue'

const props = defineProps<{
	scriptId?: string
	promptClass?: string
	dataset: QuizDataset
}>()

const { user, loginWithDiscord } = useAuth()

const statsData = ref<QuestionStats[]>([])
const statsLoading = ref(false)

const stats = computed(() =>
	props.scriptId ? useStats(props.scriptId, props.dataset.label) : null
)

async function loadStats() {
	if (!stats.value || !user.value) return
	statsLoading.value = true
	statsData.value = await stats.value.fetchStats()
	statsLoading.value = false
}

onMounted(loadStats)
// Supabase re-emits a fresh user object on every tab/window re-focus. Watch
// the nested id instead to only reload (and reset scroll) when user changes.
watch(() => user.value?.id, loadStats)

// Collect distinct non-null values for each dimension
const availableQuizTypes = computed(() => [...new Set(statsData.value.map(s => s.quizType).filter(Boolean))] as string[])
const availableFonts = computed(() => [...new Set(statsData.value.map(s => s.font).filter(Boolean))] as string[])
const availableInfoSheets = computed(() => [...new Set(statsData.value.map(s => s.infoSheet).filter(Boolean))] as string[])
const availableTolerances = computed(() => [...new Set(statsData.value.map(s => s.tolerance))].sort((a, b) => a - b))
const availableErrors = computed(() => [...new Set(statsData.value.map(s => s.errors))].sort((a, b) => a - b))

const filterQuizType = ref<string | null>(null)
const filterFont = ref<string | null>(null)
const filterInfoSheet = ref<string | null>(null)
const filterTolerance = ref<number | null>(null)
const filterErrors = ref<number | null>(null)

// Reset filters when data changes
watch(statsData, () => {
	filterQuizType.value = null
	filterFont.value = null
	filterInfoSheet.value = null
	filterTolerance.value = null
	filterErrors.value = null
})

const filteredStats = computed(() => statsData.value.filter(s =>
	(filterQuizType.value === null || s.quizType === filterQuizType.value) &&
	(filterFont.value === null || s.font === filterFont.value) &&
	(filterInfoSheet.value === null || s.infoSheet === filterInfoSheet.value) &&
	(filterTolerance.value === null || s.tolerance === filterTolerance.value) &&
	(filterErrors.value === null || s.errors === filterErrors.value)
))

// Aggregate filtered rows per prompt
const statsRows = computed(() => {
	const questions = props.dataset.questions

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
	availableTolerances.value.length > 1 ||
	availableErrors.value.length > 1
)

const MONTH_MS = 30 * 24 * 60 * 60 * 1000

const masteredPrompts = computed(() => new Set(
	statsData.value
		.filter(s =>
			s.quizType === 'typein' &&
			s.infoSheet === 'None' &&
			s.errors === 0 &&
			s.correct > 0 &&
			s.lastCorrectAt !== null &&
			Date.now() - new Date(s.lastCorrectAt).getTime() < MONTH_MS
		)
		.map(s => s.prompt)
))

const nudge = computed(() => {
	if (!statsData.value.length) return null

	const parts: string[] = []

	if (availableFonts.value.length <= 1) parts.push('a different font')

	const hasWithSheet = statsData.value.some(s => s.infoSheet !== 'None')
	const hasWithoutSheet = statsData.value.some(s => s.infoSheet === 'None')

	if (hasWithSheet && !hasWithoutSheet) parts.push('without the info sheet open')

	if (!parts.length) return null

	return `Try practicing with ${parts.join(', or ')} to compare your accuracy and earn smarty badges for unassisted recall.`
})

</script>

<template>
	<div class="stats-panel">
		<div v-if="!user" class="stats-empty stats-login">
			<p>Log in to track your progress and see per-question accuracy.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
			<p class="login-note">See the <RouterLink to="/privacy">privacy page</RouterLink> for what's stored.</p>
		</div>
		<div v-else-if="statsLoading" class="stats-empty">Loading…</div>
		<div v-else-if="!scriptId" class="stats-empty">Stats not available for this quiz.</div>
		<template v-else>
			<div v-if="hasFilters" class="filter-bar">
				<template v-if="availableQuizTypes.length > 1">
					<PillControl
						v-for="v in availableQuizTypes"
						:key="v"
						small
						:active="filterQuizType === v"
						:title="`Filter by quiz type: ${v}`"
						@click="filterQuizType = filterQuizType === v ? null : v"
					>{{ v }}</PillControl>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableFonts.length > 1">
					<PillControl
						v-for="v in availableFonts"
						:key="v"
						small
						:active="filterFont === v"
						:title="`Filter by font: ${v}`"
						@click="filterFont = filterFont === v ? null : v"
					>{{ v }}</PillControl>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableInfoSheets.length > 1">
					<PillControl
						v-for="v in availableInfoSheets"
						:key="v"
						small
						:active="filterInfoSheet === v"
						:title="`Filter by info sheet tab: ${v}`"
						@click="filterInfoSheet = filterInfoSheet === v ? null : v"
					>{{ v }}</PillControl>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableTolerances.length > 1">
					<PillControl
						v-for="v in availableTolerances"
						:key="v"
						small
						:active="filterTolerance === v"
						:title="`Filter by allowed errors setting: ${v}`"
						@click="filterTolerance = filterTolerance === v ? null : v"
					>±{{ v }}</PillControl>
					<span class="filter-sep"></span>
				</template>
				<template v-if="availableErrors.length > 1">
					<PillControl
						v-for="v in availableErrors"
						:key="v"
						small
						:active="filterErrors === v"
						:title="v === 0 ? 'Filter to exact matches only' : `Filter to answers with ${v} typo(s)`"
						@click="filterErrors = filterErrors === v ? null : v"
					>{{ v === 0 ? 'exact' : `${v} err` }}</PillControl>
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
							<span v-if="masteredPrompts.has(row.prompt)" class="mastery-badge" title="Typed with zero errors and no lookup in the last 30 days">🤓</span>
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
	font-size: var(--fs-prose);
}

.stats-login {
	flex-direction: column;
	gap: var(--sp-16);
	padding: var(--sp-32);
	text-align: center;
}

.filter-bar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--sp-4);
	padding: var(--sp-6) var(--sp-12);
	border-bottom: var(--hairline);
	background: var(--c-cell);
}

.filter-sep {
	width: 1px;
	height: 14px;
	background: var(--c-border);
	margin: 0 var(--sp-2);
}

.nudge-bar {
	padding: var(--sp-6) var(--sp-12);
	border-bottom: var(--hairline);
	background: var(--c-cell);
	font-size: var(--fs-11);
	color: var(--c-muted);
}

.badge-col {
	width: 20px;
	padding: 0 !important;
}

.badge-cell {
	width: 20px;
	padding: 0 var(--sp-4) !important;
	text-align: center;
}

.mastery-badge {
	font-size: var(--fs-11);
	line-height: 1;
}

.stats-table {
	width: 100%;
	border-collapse: collapse;
	font-size: var(--fs-12);
}

.stats-table th {
	position: sticky;
	top: 0;
	background: var(--c-cell);
	color: var(--c-muted);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: var(--tracking-caps);
	font-size: var(--fs-micro);
	padding: var(--sp-6) var(--sp-12);
	text-align: left;
	border-bottom: var(--hairline);
}

.stats-table td {
	padding: 5px var(--sp-12);
	border-bottom: var(--hairline);
	color: var(--c-label);
}

.prompt-cell {
	font-size: var(--fs-letterform);
	line-height: 1.3;
	color: var(--c-head);
}

.accuracy.good { color: var(--c-good); }
.accuracy.ok   { color: var(--c-warn); }
.accuracy.bad  { color: var(--c-bad); }

.never { color: var(--c-muted); }
.muted { color: var(--c-muted); }

.btn-primary {
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

.btn-primary:hover { opacity: 0.85; }

.login-note {
	font-size: var(--fs-11);
	color: var(--c-muted);
}

.login-note a { color: var(--c-sign); }
</style>
