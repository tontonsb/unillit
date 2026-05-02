<script setup lang="ts">
import { ref } from 'vue'
import type { QuizDataset } from './dataset'
import QuizPanel from './QuizPanel.vue'
import StatsPanel from './StatsPanel.vue'
import RunsPanel from './RunsPanel.vue'

const props = defineProps<{
	dataset: QuizDataset
	promptClass?: string
	promptFontFamily?: string
	scriptId?: string
}>()

type Tab = 'quiz' | 'stats' | 'runs'
const activeTab = ref<Tab>('quiz')
</script>

<template>
	<div class="quiz">
		<QuizPanel
			v-if="activeTab === 'quiz'"
			:dataset="props.dataset"
			:prompt-class="promptClass"
			:prompt-font-family="promptFontFamily"
			:script-id="scriptId"
		/>

		<StatsPanel
			v-else-if="activeTab === 'stats'"
			:script-id="scriptId"
			:prompt-class="promptClass"
			:dataset="props.dataset"
		/>

		<RunsPanel
			v-else-if="activeTab === 'runs'"
			:script-id="scriptId"
			:dataset="props.dataset"
		/>

		<div class="bottom-bar">
			<button
				v-for="tab in ['quiz', 'stats', 'runs'] as Tab[]"
				:key="tab"
				type="button"
				class="tab-btn"
				:class="{ active: activeTab === tab }"
				@click="activeTab = tab"
			>
				{{ tab }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.quiz {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: var(--c-bg);
}

.bottom-bar {
	display: flex;
	border-top: 1px solid var(--c-border);
	background: var(--c-cell);
}

.tab-btn {
	flex: 1;
	padding: 8px;
	border: none;
	background: none;
	color: var(--c-muted);
	font-size: 11px;
	font-weight: 600;
	font-family: var(--sans);
	letter-spacing: 0.06em;
	text-transform: uppercase;
	cursor: pointer;
	transition: background 0.15s, color 0.15s;
}

.tab-btn:hover { background: var(--c-alt); }

.tab-btn.active {
	color: var(--c-accent);
	border-top: 2px solid var(--c-accent);
	margin-top: -1px;
}
</style>
