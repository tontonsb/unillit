<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScriptPanel from '@/components/ScriptPanel.vue'
import { scriptsById } from '@/scripts/scripts'
import { activeInfoSheet } from '@/composables/useScriptContext'

const route = useRoute()
const router = useRouter()
const config = computed(() => scriptsById[route.params.id as string])

const infoIndex = ref(0)
const practiceIndex = ref(0)

function clampIndex(value: unknown, tabs: unknown[] | undefined): number | null {
	const n = Number(value)

	if (value === undefined || Number.isNaN(n))
		return null

	return Math.min(Math.max(0, Math.trunc(n)), Math.max(0, (tabs?.length ?? 1) - 1))
}

// the tab pair is packed into one opaque token ("info.practice" base64'd) so
// the URL doesn't invite manual editing — purely cosmetic, not security
function encodeTabs(info: number, practice: number): string {
	return btoa(`${info}.${practice}`).replace(/=+$/, '')
}

function decodeTabs(token: unknown): [string?, string?] {
	if (typeof token !== 'string') return []

	try {
		return atob(token).split('.') as [string?, string?]
	} catch {
		return []
	}
}

/**
 * Read the ?t= token on load, switch tabs & clean up the URL.
 */
onMounted(() => {
	const [rawInfo, rawPractice] = decodeTabs(route.query.t)
	const info = clampIndex(rawInfo, config.value?.infoTabs)
	const practice = clampIndex(rawPractice, config.value?.practiceTabs)

	if (info !== null)
		infoIndex.value = info

	if (practice !== null)
		practiceIndex.value = practice

	if (route.query.t !== undefined)
		router.replace({ path: route.path })
})

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function copyLink() {
	const href = router.resolve({
		path: route.path,
		query: { t: encodeTabs(infoIndex.value, practiceIndex.value) },
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
				v-model:active-index="infoIndex"
				:tabs="config.infoTabs ?? []"
				:title="config.name"
				:title-native="config.nativeName"
				:title-lang="config.id"
				context-role="info"
			>
				<template #header-end>
					<button
						type="button"
						class="link-btn"
						:title="copied ? 'Link copied' : 'Copy a link to these tabs'"
						@click="copyLink"
					>{{ copied ? '✓ Copied' : '🔗 Link' }}</button>
				</template>
			</ScriptPanel>
			<ScriptPanel
				v-model:active-index="practiceIndex"
				:tabs="config.practiceTabs ?? []"
			>
				<template v-if="config.infoHeaderEnd" #header-end>
					<component :is="config.infoHeaderEnd" />
				</template>
			</ScriptPanel>
		</div>
	</div>

	<div v-else class="not-found">
		Script not found.
	</div>
</template>

<style scoped>
.link-btn {
	flex-shrink: 0;
	padding: 3px 8px;
	border: 1px solid var(--c-border);
	border-radius: var(--radius-pill);
	background: transparent;
	color: var(--c-muted);
	font-size: 11px;
	font-family: var(--sans);
	white-space: nowrap;
	cursor: pointer;
	transition: color 0.15s, border-color 0.15s;
}

.link-btn:hover {
	color: var(--c-label);
	border-color: var(--c-label);
}

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
	border-right: 1px solid var(--c-border);
}

.not-found {
	padding: 32px;
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
