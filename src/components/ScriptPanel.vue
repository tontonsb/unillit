<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { ScriptTab } from '@/scripts/scripts'
import { activeInfoSheet } from '@/composables/useScriptContext'

const props = defineProps<{
	tabs: ScriptTab[]
	title?: string
	titleNative?: string
	titleLang?: string
	contextRole?: 'info'
}>()

const activeIndex = ref(0)

watch(() => props.tabs, () => {
	activeIndex.value = 0
})

const activeTab = computed(() => props.tabs[activeIndex.value])
const id = useId()

watch(activeTab, tab => {
	if (props.contextRole === 'info' && tab) activeInfoSheet.value = tab.label
}, { immediate: true })
</script>

<template>
	<section>
		<header>
			<h1>
				<span class="panel-name">{{ title }}</span>
				<span v-if="titleNative" class="panel-native" :lang="titleLang">{{ titleNative }}</span>
			</h1>

			<nav role="tablist">
				<button
					v-for="(tab, i) in tabs"
					:key="i"
					:id="`${id}-tab-${i}`"
					type="button"
					role="tab"
					class="tab"
					:class="{ active: activeIndex === i }"
					:aria-selected="activeIndex === i"
					:aria-controls="`${id}-panel`"
					@click="activeIndex = i"
				>
					{{ tab.label }}
				</button>
			</nav>

			<slot name="header-end" ></slot>
		</header>

		<div
			:id="`${id}-panel`"
			:aria-labelledby="`${id}-tab-${activeIndex}`"
			role="tabpanel"
			class="panel-content"
		>
			<component :is="activeTab?.component" v-bind="activeTab?.props" :key="activeIndex" />
		</div>
	</section>
</template>

<style scoped>
section {
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

header {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 0 12px;
	background: var(--c-cell);
	border-bottom: 1px solid var(--c-border);
	min-height: 36px;
}

h1 {
	display: flex;
	align-items: baseline;
	gap: 6px;
	flex-shrink: 0;
	padding: 6px 0;
}

.panel-name {
	font-size: 13px;
	font-weight: 600;
	color: var(--c-head);
}

.panel-native {
	font-size: 15px;
	color: var(--c-accent);
}

nav {
	display: flex;
	gap: 2px;
	overflow-x: auto;
	scrollbar-width: none;
	flex: 1;
	padding-right: 16px;
	mask-image: linear-gradient(to right, black calc(100% - 28px), transparent);
}

nav::-webkit-scrollbar { display: none; }

.tab {
	padding: 8px 12px;
	border: none;
	background: transparent;
	color: var(--c-muted);
	font-size: 12px;
	font-family: var(--sans);
	cursor: pointer;
	border-bottom: 2px solid transparent;
	white-space: nowrap;
	transition: color 0.15s, border-color 0.15s;
}

.tab:hover {
	color: var(--c-label);
}

.tab.active {
	color: var(--c-head);
	border-bottom-color: var(--c-accent);
}

.panel-content {
	flex: 1;
	overflow-y: auto;
	overflow-x: auto;
	background: var(--c-bg);
}
</style>
