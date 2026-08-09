<script setup lang="ts">
import { ref, watch, nextTick, watchEffect } from 'vue'
import type { QuizDataset, QuizDatasetConfig } from './dataset'
import QuizPanel from './QuizPanel.vue'
import StatsPanel from './StatsPanel.vue'
import RunsPanel from './RunsPanel.vue'

const props = defineProps<{
	datasetConfig: QuizDatasetConfig
	promptClass?: string
	promptFontFamily?: string
	scriptId?: string
}>()

const dataset = ref<QuizDataset | null>(null)

watchEffect(async () => {
	const config = props.datasetConfig

	dataset.value = null

	const data = await config.load()

	// a tab switch mid-load must not overwrite the newer dataset
	if (props.datasetConfig === config) dataset.value = { ...config, ...data }
})

type Tab = 'quiz' | 'stats' | 'runs'
const activeTab = ref<Tab>('quiz')
const quizPanel = ref<InstanceType<typeof QuizPanel> | null>(null)

// the panel is only hidden, not remounted, so it needs a nudge to take focus back
watch(activeTab, (tab) => {
	if (tab === 'quiz') nextTick(() => quizPanel.value?.focus())
})
</script>

<template>
	<div class="quiz">
		<template v-if="dataset">
			<QuizPanel
				ref="quizPanel"
				v-show="activeTab === 'quiz'"
				:dataset="dataset"
				:prompt-class="promptClass"
				:prompt-font-family="promptFontFamily"
				:script-id="scriptId"
			/>

			<StatsPanel
				v-if="activeTab === 'stats'"
				:script-id="scriptId"
				:prompt-class="promptClass"
				:dataset="dataset"
			/>

			<RunsPanel
				v-if="activeTab === 'runs'"
				:script-id="scriptId"
				:dataset="dataset"
			/>
		</template>

		<p v-else class="loading">Loading…</p>

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

.loading {
	flex: 1;
	align-content: center;
	color: var(--c-muted);
	font-size: var(--fs-chrome);
	text-align: center;
}

.bottom-bar {
	display: flex;
	border-top: var(--hairline);
	background: var(--c-cell);
}

.tab-btn {
	flex: 1;
	padding: 8px;
	border: none;
	background: none;
	color: var(--c-muted);
	font-size: var(--fs-11);
	font-weight: 600;
	font-family: var(--sans);
	letter-spacing: 0.06em;
	text-transform: uppercase;
	cursor: pointer;
	transition: background 0.15s, color 0.15s;
}

.tab-btn:hover { background: var(--c-alt); }

.tab-btn:focus-visible { outline-offset: -2px; }

.tab-btn.active {
	color: var(--c-on-sign);
	background: var(--c-sign);
}
</style>
