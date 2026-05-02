<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { QuizDataset } from './dataset'
import { useStats, type RunRecord } from '@/composables/useStats'
import { useAuth } from '@/composables/useAuth'
import { relativeDate } from './utils'

const props = defineProps<{
	scriptId?: string
	dataset: QuizDataset
}>()

const { user, loginWithDiscord } = useAuth()
const runsData = ref<RunRecord[]>([])
const runsLoading = ref(false)

const stats = computed(() =>
	props.scriptId ? useStats(props.scriptId, props.dataset.label) : null
)

async function loadRuns() {
	if (!stats.value || !user.value) return
	runsLoading.value = true
	runsData.value = await stats.value.fetchRuns()
	runsLoading.value = false
}

onMounted(loadRuns)
watch(user, loadRuns)
</script>

<template>
	<div class="runs-panel">
		<div v-if="!user" class="runs-empty runs-login">
			<p>Log in to track your progress and see your run history.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
		</div>
		<div v-else-if="runsLoading" class="runs-empty">Loading…</div>
		<div v-else-if="!scriptId" class="runs-empty">Runs not available for this quiz.</div>
		<div v-else-if="runsData.length === 0" class="runs-empty">No runs yet.</div>
		<table v-else class="runs-table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Score</th>
					<th>Accuracy</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="run in runsData" :key="run.id" :class="{ incomplete: !run.completed }">
					<td class="muted">{{ relativeDate(run.startedAt) }}</td>
					<td>
						<span v-if="run.completed">{{ run.correct }} / {{ run.total }}</span>
						<span v-else class="muted">{{ run.correct }} / {{ run.total }} (incomplete)</span>
					</td>
					<td>
						<span v-if="run.completed" class="accuracy" :class="run.correct / run.total >= 0.8 ? 'good' : run.correct / run.total >= 0.5 ? 'ok' : 'bad'">
							{{ Math.round(run.correct / run.total * 100) }}%
						</span>
						<span v-else class="muted">—</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.runs-panel {
	flex: 1;
	overflow-y: auto;
}

.runs-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: var(--c-muted);
	font-size: 0.9rem;
}

.runs-login {
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;
	text-align: center;
}

.runs-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 12px;
}

.runs-table th {
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

.runs-table td {
	padding: 5px 12px;
	border-bottom: 1px solid var(--c-border);
	color: var(--c-label);
}

.incomplete { opacity: 0.5; }

.accuracy.good { color: #3a7d44; }
.accuracy.ok   { color: #a07020; }
.accuracy.bad  { color: #b94040; }

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
