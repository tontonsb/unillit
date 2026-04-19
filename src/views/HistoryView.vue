<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { fetchAllRuns, type AllRunRecord } from '@/composables/useStats'
import { relativeDate } from '@/components/quiz/utils'

const { user, loginWithDiscord } = useAuth()
const runs = ref<AllRunRecord[]>([])
const loading = ref(false)

async function load() {
	if (!user.value) return
	loading.value = true
	runs.value = await fetchAllRuns()
	loading.value = false
}

onMounted(load)
</script>

<template>
	<article>
		<h1>History</h1>

		<div v-if="!user" class="empty login">
			<p>Log in to see your quiz history.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
		</div>
		<div v-else-if="loading" class="empty">Loading…</div>
		<div v-else-if="runs.length === 0" class="empty">No runs yet.</div>
		<table v-else class="runs-table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Script</th>
					<th>Dataset</th>
					<th>Score</th>
					<th>Accuracy</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="run in runs" :key="run.id" :class="{ incomplete: !run.completed }">
					<td class="muted">{{ relativeDate(run.startedAt) }}</td>
					<td>{{ run.scriptId }}</td>
					<td>{{ run.dataset }}</td>
					<td>{{ run.correct }} / {{ run.total }}</td>
					<td>
						<span v-if="run.completed" class="accuracy" :class="run.correct / run.total >= 0.8 ? 'good' : run.correct / run.total >= 0.5 ? 'ok' : 'bad'">
							{{ Math.round(run.correct / run.total * 100) }}%
						</span>
						<span v-else class="muted">incomplete</span>
					</td>
				</tr>
			</tbody>
		</table>
	</article>
</template>

<style scoped>
article {
	padding: 2rem;
	max-width: 720px;
	margin: 0 auto;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 1.5rem;
}

.empty {
	color: var(--c-muted);
	font-size: 0.9rem;
}

.login {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.runs-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 13px;
}

.runs-table th {
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
	padding: 7px 12px;
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
