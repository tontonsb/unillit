<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScriptPanel from '@/components/ScriptPanel.vue'
import PillControl from '@/components/PillControl.vue'
import { scriptsById } from '@/scripts/scripts'
import { activeInfoSheet, infoTab, practiceTab } from '@/composables/useScriptContext'
import { encodeTabs, applyShare } from '@/lib/tabLink'

const route = useRoute()
const router = useRouter()
const config = computed(() => scriptsById[route.params.id as string])

function clampIndex(value: unknown, tabs: unknown[] | undefined): number | null {
	const n = Number(value)

	if (value === undefined || Number.isNaN(n))
		return null

	return Math.min(Math.max(0, Math.trunc(n)), Math.max(0, (tabs?.length ?? 1) - 1))
}

/**
 * Handle the ?t=.... token on load:
 * - apply quiz config (done by the applyShare)
 * - switch tabs
 * - clean up the URL
 */
onMounted(() => {
	const [rawInfo, rawPractice] = applyShare(route.query.t)
	const info = clampIndex(rawInfo, config.value?.infoTabs)
	const practice = clampIndex(rawPractice, config.value?.practiceTabs)

	if (info !== null)
		infoTab.value = info

	if (practice !== null)
		practiceTab.value = practice

	if (route.query.t !== undefined)
		router.replace({ path: route.path })
})

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function copyLink() {
	const href = router.resolve({
		path: route.path,
		query: { t: encodeTabs() },
	}).href

	navigator.clipboard.writeText(location.origin + href)

	copied.value = true
	clearTimeout(copiedTimer)
	copiedTimer = setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
	<div v-if="config" class="script-page">
		<div class="panels" :class="{ 'info-none': activeInfoSheet === 'None' }">
			<ScriptPanel
				v-model:active-index="infoTab"
				:tabs="config.infoTabs ?? []"
				:title="config.name"
				:title-native="config.nativeName"
				:title-lang="config.lang"
				:style="{ '--label-scale': config.labelScale ?? 1 }"
				:tabs-label="`${config.name} sheets`"
			>
				<template #header-end>
					<PillControl
						:title="copied ? 'Link copied' : 'Copy a link to these tabs'"
						@click="copyLink"
					>{{ copied ? '✓ Copied' : '🔗 Link' }}</PillControl>
				</template>
			</ScriptPanel>
			<ScriptPanel
				v-model:active-index="practiceTab"
				:tabs="config.practiceTabs ?? []"
				:tabs-label="`${config.name} practice`"
			>
				<template v-if="config.headerEnd" #header-end>
					<component :is="config.headerEnd" />
				</template>
			</ScriptPanel>
		</div>
	</div>

	<div v-else class="not-found">
		Script not found.
	</div>
</template>

<style scoped>
.script-page {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}

.panels {
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 1fr;
	overflow: hidden;
}

.panels > :first-child {
	border-right: var(--hairline);
}

.not-found {
	padding: var(--sp-32);
	color: var(--c-muted);
}

@media (width <= 768px) {
	.panels {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.panels.info-none {
		grid-template-rows: auto 1fr;
	}
}
</style>
