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

// queried rather than collected through a v-for ref, which Vue does not
// guarantee to keep in source order
function focusTab(i: number) {
	tablist.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i]?.focus()
}

/**
 * Manual activation (WAI-ARIA APG): arrows move focus, Enter/Space activates —
 * the latter for free, since these are real buttons. Automatic activation would
 * mount a panel per keypress, and each one is an async component that remounts
 * from scratch; a quiz is not something to spin up on the way past.
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

			<!-- a div, not a <nav>: role="tablist" would override the landmark anyway -->
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
	gap: 2px;
	overflow-x: auto;
	scrollbar-width: none;
	flex: 1;

	/* matches the fade below, so the last tab can always scroll clear of it —
	   otherwise its focus ring dims at the edge once arrow keys land there */
	padding-right: 28px;
	mask-image: linear-gradient(to right, black calc(100% - 28px), transparent);
}

.tabs::-webkit-scrollbar { display: none; }

.tab {
	align-self: center;
	padding: 4px 10px;
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
	color: #fff;
	background: var(--c-sign);
}

.panel-content {
	flex: 1;
	overflow-y: auto;
	overflow-x: auto;
	background: var(--c-bg);
}
</style>
