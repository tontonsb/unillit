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
	gap: var(--sp-32);
}

section header {
	display: flex;
	align-items: baseline;
	gap: var(--sp-12);
	margin-bottom: var(--sp-8);
}

header h2 {
	display: flex;
	align-items: baseline;
	gap: var(--sp-8);
	margin: 0;
}

.script-native {
	font-size: 1.1em;
	color: var(--c-sign);
}

.practice-link {
	font-size: var(--fs-12);
	color: var(--c-muted);
	text-decoration: none;
	margin-left: auto;
}

.practice-link:hover { color: var(--c-sign); }

.note {
	font-size: var(--fs-chrome);
	color: var(--c-muted);
	padding-left: var(--sp-2);
}

.dataset-table {
	width: 100%;
	border-collapse: collapse;
	font-size: var(--fs-chrome);
}

.dataset-table th {
	color: var(--c-muted);
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: var(--tracking-caps);
	font-size: var(--fs-micro);
	padding: var(--sp-4) var(--sp-8) var(--sp-6);
	text-align: left;
	border-bottom: var(--hairline);
}

.dataset-table td {
	padding: 5px var(--sp-8);
	border-bottom: var(--hairline);
	vertical-align: middle;
}

.dataset-table tr:last-child td { border-bottom: none; }

.ds-name {
	color: var(--c-label);
	white-space: nowrap;
}

.ds-date {
	white-space: nowrap;
	padding-right: var(--sp-16);
}

.ds-date.never { color: var(--c-muted); }
.ds-date.stale { color: var(--c-warn); }
.ds-date.fresh { color: var(--c-good); }

.ds-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--sp-4);
}

.tag {
	font-size: var(--fs-11);
	color: var(--c-muted);
	background: var(--c-alt);
	border: var(--hairline);
	border-radius: var(--radius);
	padding: 1px 7px;
	white-space: nowrap;
}
</style>
