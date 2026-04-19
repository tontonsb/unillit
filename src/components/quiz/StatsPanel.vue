<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { QuizDataset } from './dataset'
import { useStats, type QuestionStats } from '@/composables/useStats'
import { useAuth } from '@/composables/useAuth'

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

const statsRows = computed(() => {
	const questions = props.datasets[props.datasetIndex]?.questions ?? []
	const byPrompt = new Map(statsData.value.map(s => [s.prompt, s]))
	return questions.map(q => ({
		prompt: q.prompt,
		stats: byPrompt.get(q.prompt) ?? null,
	})).sort((a, b) => {
		const ra = a.stats ? a.stats.correct / a.stats.total : -1
		const rb = b.stats ? b.stats.correct / b.stats.total : -1
		return ra - rb
	})
})

function relativeDate(iso: string): string {
	const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
	if (days === 0) return 'today'
	if (days === 1) return 'yesterday'
	if (days < 14) return `${days}d ago`
	if (days < 60) return `${Math.floor(days / 7)}w ago`
	return `${Math.floor(days / 30)}mo ago`
}
</script>

<template>
	<div class="stats-panel">
		<div v-if="!user" class="stats-empty stats-login">
			<p>Log in to track your progress and see per-question accuracy.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
		</div>
		<div v-else-if="statsLoading" class="stats-empty">Loading…</div>
		<div v-else-if="!scriptId" class="stats-empty">Stats not available for this quiz.</div>
		<table v-else class="stats-table">
			<thead>
				<tr>
					<th>Question</th>
					<th>Correct</th>
					<th>Accuracy</th>
					<th>Last seen</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in statsRows" :key="row.prompt">
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
