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
// Supabase re-emits a fresh user object on every tab/window re-focus. Watch
// the nested id instead to only reload (and reset scroll) when user changes.
watch(() => user.value?.id, loadRuns)
</script>

<template>
	<div class="runs-panel">
		<div v-if="!user" class="runs-empty runs-login">
			<p>Log in to track your progress and see your run history.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
			<p class="login-note">See the <RouterLink to="/privacy">privacy page</RouterLink> for what's stored.</p>
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
	font-size: var(--fs-prose);
}

.runs-login {
	flex-direction: column;
	gap: var(--sp-16);
	padding: var(--sp-32);
	text-align: center;
}

.runs-table {
	width: 100%;
	border-collapse: collapse;
	font-size: var(--fs-12);
}

.runs-table th {
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

.runs-table td {
	padding: 5px var(--sp-12);
	border-bottom: var(--hairline);
	color: var(--c-label);
}

.incomplete { opacity: 0.5; }

.accuracy.good { color: var(--c-good); }
.accuracy.ok   { color: var(--c-warn); }
.accuracy.bad  { color: var(--c-bad); }

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
