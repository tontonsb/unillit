<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import type { ScriptTab } from '@/scripts/scripts'

const props = defineProps<{
	tabs: ScriptTab[]
	title?: string
	titleNative?: string
	titleLang?: string
	/** accessible name for the tab bar — the panels are told apart by it */
	tabsLabel?: string
}>()

const activeIndex = defineModel<number>('activeIndex', { default: 0 })

watch(() => props.tabs, () => {
	activeIndex.value = 0
})

const activeTab = computed(() => props.tabs[activeIndex.value])
const id = useId()

const tablist = ref<HTMLElement | null>(null)

// queried, not collected via v-for refs — Vue does not guarantee their order
function focusTab(i: number) {
	tablist.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i]?.focus()
}

/**
 * Manual activation (WAI-ARIA APG): arrows move focus, Enter/Space activates.
 * Automatic would mount a panel per keypress, and each one remounts from scratch.
 */
function onTabKeydown(event: KeyboardEvent, i: number) {
	const last = props.tabs.length - 1
	const target: Record<string, number> = {
		ArrowRight: i === last ? 0 : i + 1,
		ArrowLeft: i === 0 ? last : i - 1,
		Home: 0,
		End: last,
	}

	const to = target[event.key]

	if (to === undefined) return

	event.preventDefault()
	focusTab(to)
}
</script>

<template>
	<section>
		<header>
			<h1 v-if="title || titleNative">
				<span class="panel-name">{{ title }}</span>
				<span v-if="titleNative" class="panel-native" :lang="titleLang">{{ titleNative }}</span>
			</h1>

			<div
				ref="tablist"
				class="tabs"
				role="tablist"
				:aria-label="tabsLabel"
			>
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
					:tabindex="activeIndex === i ? 0 : -1"
					@click="activeIndex = i"
					@keydown="onTabKeydown($event, i)"
				>
					{{ tab.label }}
				</button>
			</div>

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
	gap: var(--sp-12);
	padding: 0 var(--sp-12);
	background: var(--c-cell);
	border-bottom: var(--hairline);
	min-height: 36px;
}

h1 {
	display: flex;
	align-items: baseline;
	gap: var(--sp-6);
	flex-shrink: 0;
	padding: var(--sp-6) 0;
}

.panel-name {
	font-family: var(--serif);
	font-size: var(--fs-body);
	font-weight: 600;
	color: var(--c-head);
}

.panel-native {
	font-size: var(--fs-15);
	color: var(--c-sign);
}

.tabs {
	display: flex;
	gap: var(--sp-2);
	overflow-x: auto;
	scrollbar-width: none;
	flex: 1;

	/* matches the fade, so the last tab can scroll clear of it */
	padding-right: var(--sp-28);
	mask-image: linear-gradient(to right, black calc(100% - 28px), transparent);
}

.tabs::-webkit-scrollbar { display: none; }

.tab {
	align-self: center;
	padding: var(--sp-4) var(--sp-10);
	border: none;
	border-radius: var(--radius-sm);
	background: transparent;
	color: var(--c-muted);
	font-size: var(--fs-12);
	font-family: var(--sans);
	cursor: pointer;
	white-space: nowrap;
	transition: color 0.15s, background-color 0.15s;
}

.tab:hover {
	color: var(--c-label);
	background: var(--c-alt);
}

.tab:focus-visible {
	outline-offset: -2px;
}

.tab.active {
	color: var(--c-on-sign);
	background: var(--c-sign);
}

.panel-content {
	flex: 1;
	overflow-y: auto;
	overflow-x: auto;
	background: var(--c-bg);
}
</style>
