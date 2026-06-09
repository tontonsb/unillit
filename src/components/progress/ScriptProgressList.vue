<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ScriptProgress } from '@/composables/useProgress'
import { relativeDate } from '@/components/quiz/utils'

defineProps<{ scripts: ScriptProgress[] }>()

function urgencyClass(lastRunAt: string | null): string {
	if (!lastRunAt)
		return 'never'

	const days = (Date.now() - new Date(lastRunAt).getTime()) / 86400000

	if (days > 14)
		return 'stale'

	return 'fresh'
}
</script>

<template>
	<div class="script-list">
		<section v-for="script in scripts" :key="script.id">
			<header>
				<h2>
					<span class="script-name">{{ script.name }}</span>
					<span class="script-native" :lang="script.id">{{ script.nativeName }}</span>
				</h2>
				<RouterLink :to="`/scripts/${script.id}`" class="practice-link">Practice →</RouterLink>
			</header>

			<p v-if="!script.datasets.length" class="note">No quiz available yet.</p>
			<p v-else-if="!script.anyRuns" class="note">Never practiced.</p>

			<table v-else class="dataset-table">
				<thead>
					<tr>
						<th>Dataset</th>
						<th>Last practiced</th>
						<th>Practiced with</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="ds in script.datasets" :key="ds.label">
						<td class="ds-name">{{ ds.label }}</td>
						<td class="ds-date" :class="urgencyClass(ds.lastRunAt)">
							{{ ds.lastRunAt ? relativeDate(ds.lastRunAt) : 'never' }}
						</td>
						<td class="ds-tags">
							<span v-for="font in ds.fonts" :key="font" class="tag">{{ font }}</span>
							<span v-for="sheet in ds.infoSheets" :key="sheet" class="tag">{{ sheet }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<style scoped>
.script-list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

section header {
	display: flex;
	align-items: baseline;
	gap: 12px;
	margin-bottom: 0.5rem;
}

h2 {
	display: flex;
	align-items: baseline;
	gap: 8px;
	font-size: 1rem;
	font-weight: 600;
}

.script-name { color: var(--c-head); }

.script-native {
	font-size: 1.1em;
	color: var(--c-accent-ink);
}

.practice-link {
	font-size: 12px;
	color: var(--c-muted);
	text-decoration: none;
	margin-left: auto;
}

.practice-link:hover { color: var(--c-accent-ink); }

.note {
	font-size: 13px;
	color: var(--c-muted);
	padding-left: 2px;
}

.dataset-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 13px;
}

.dataset-table th {
	color: var(--c-muted);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	font-size: 10px;
	padding: 4px 8px 6px;
	text-align: left;
	border-bottom: 1px solid var(--c-border);
}

.dataset-table td {
	padding: 5px 8px;
	border-bottom: 1px solid var(--c-border);
	vertical-align: middle;
}

.dataset-table tr:last-child td { border-bottom: none; }

.ds-name {
	color: var(--c-label);
	white-space: nowrap;
}

.ds-date {
	white-space: nowrap;
	padding-right: 16px;
}

.ds-date.never { color: var(--c-muted); }
.ds-date.stale { color: var(--c-warn); }
.ds-date.fresh { color: var(--c-good); }

.ds-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
}

.tag {
	font-size: 11px;
	color: var(--c-muted);
	background: var(--c-alt);
	border: 1px solid var(--c-border);
	border-radius: var(--radius-pill);
	padding: 1px 7px;
	white-space: nowrap;
}
</style>
