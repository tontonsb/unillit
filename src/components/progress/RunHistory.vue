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
	padding-top: var(--sp-32);
	border-top: var(--hairline);
}

h2 {
	font-size: var(--fs-16);
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: var(--sp-16);
}

.empty {
	font-size: var(--fs-prose);
	color: var(--c-muted);
}

.runs-table {
	width: 100%;
	border-collapse: collapse;
	font-size: var(--fs-chrome);
}

.runs-table th {
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
	padding: 7px var(--sp-12);
	border-bottom: var(--hairline);
	color: var(--c-label);
}

.incomplete { opacity: 0.5; }

.accuracy.good { color: var(--c-good); }
.accuracy.ok   { color: var(--c-warn); }
.accuracy.bad  { color: var(--c-bad); }

.muted { color: var(--c-muted); }

.pagination {
	display: flex;
	align-items: center;
	gap: var(--sp-12);
	margin-top: var(--sp-12);
}

.page-btn {
	padding: var(--sp-4) var(--sp-12);
	border: var(--hairline);
	border-radius: var(--radius);
	background: transparent;
	color: var(--c-label);
	font-size: var(--fs-12);
	font-family: var(--sans);
	cursor: pointer;
	transition: background 0.15s;
}

.page-btn:disabled { opacity: 0.35; cursor: default; }
.page-btn:hover:not(:disabled) { background: var(--c-alt); }

.page-label {
	font-size: var(--fs-12);
	color: var(--c-muted);
}
</style>
