<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAllRuns, type AllRunRecord } from '@/composables/useStats'
import { relativeDate } from '@/components/quiz/utils'

const runs = ref<AllRunRecord[]>([])
const page = ref(0)
const hasMore = ref(false)
const loading = ref(false)

async function goToPage(n: number) {
	loading.value = true

	const data = await fetchAllRuns(n)

	runs.value = data.runs
	hasMore.value = data.hasMore

	page.value = n

	loading.value = false
}

onMounted(() => goToPage(0))
</script>

<template>
	<section class="run-history">
		<h2>History</h2>

		<p v-if="loading" class="empty">Loading…</p>
		<p v-else-if="runs.length === 0" class="empty">No runs yet.</p>

		<template v-else>
			<table class="runs-table">
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
							<span
								v-if="run.completed"
								class="accuracy"
								:class="run.correct / run.total >= 0.8 ? 'good' : run.correct / run.total >= 0.5 ? 'ok' : 'bad'"
							>{{ Math.round(run.correct / run.total * 100) }}%</span>
							<span v-else class="muted">incomplete</span>
						</td>
					</tr>
				</tbody>
			</table>

			<div v-if="page > 0 || hasMore" class="pagination">
				<button
					type="button"
					class="page-btn"
					:disabled="page === 0"
					@click="goToPage(page - 1)"
				>← Newer</button>

				<span class="page-label">Page {{ page + 1 }}</span>

				<button
					type="button"
					class="page-btn"
					:disabled="!hasMore"
					@click="goToPage(page + 1)"
				>Older →</button>
			</div>
		</template>
	</section>
</template>

<style scoped>
.run-history {
	margin-top: 3rem;
	padding-top: 2rem;
	border-top: 1px solid var(--c-border);
}

h2 {
	font-size: 1rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 1rem;
}

.empty {
	font-size: 0.9rem;
	color: var(--c-muted);
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

.pagination {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 12px;
}

.page-btn {
	padding: 4px 12px;
	border: 1px solid var(--c-border);
	border-radius: 4px;
	background: transparent;
	color: var(--c-label);
	font-size: 12px;
	font-family: var(--sans);
	cursor: pointer;
	transition: background 0.15s;
}

.page-btn:disabled { opacity: 0.35; cursor: default; }
.page-btn:hover:not(:disabled) { background: var(--c-alt); }

.page-label {
	font-size: 12px;
	color: var(--c-muted);
}
</style>
