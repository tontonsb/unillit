<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { fetchScriptProgress, type ScriptProgress } from '@/composables/useProgress'
import { roadmaps } from '@/scripts/roadmaps'
import { scriptList } from '@/scripts/scripts'
import RoadmapGraph from '@/components/progress/RoadmapGraph.vue'

const { user, loginWithDiscord } = useAuth()
const scriptData = ref<ScriptProgress[]>([])
const loading = ref(false)

async function load() {
	if (!user.value)
		return

	loading.value = true
	scriptData.value = await fetchScriptProgress()
	loading.value = false
}

const roadmapScripts = computed(() => roadmaps.map(roadmap => {
	const script = scriptList.find(s => s.id === roadmap.scriptId)!
	const data = scriptData.value.find(s => s.id === roadmap.scriptId)
	const datasets = data?.datasets ?? []

	return {
		id: roadmap.scriptId,
		name: script.name,
		nativeName: script.nativeName,
		steps: roadmap.steps.map(step => ({
			id: step.id,
			label: step.label,
			hint: step.hint,
			requires: step.requires,
			placeholder: step.placeholder,
			status: step.getStatus(datasets),
			date: step.getDate(datasets),
		})),
	}
}))

onMounted(load)
</script>

<template>
	<article>
		<h1>Roadmap</h1>

		<p v-if="!user" class="login-nudge">
			<button type="button" class="btn-link" @click="loginWithDiscord">Log in</button>
			to track your progress.
		</p>
		<div v-else-if="loading" class="empty">Loading…</div>

		<div class="script-list" :class="{ untracked: !user || loading }">
			<section v-for="script in roadmapScripts" :key="script.id">
				<header>
					<h2>
						<span class="script-name">{{ script.name }}</span>
						<span class="script-native" :lang="script.id">{{ script.nativeName }}</span>
					</h2>
					<RouterLink :to="`/scripts/${script.id}`" class="practice-link">Practice →</RouterLink>
				</header>

				<RoadmapGraph
					:steps="script.steps.map(s => ({ ...s, status: user ? s.status : 'untracked' }))"
				/>
			</section>
		</div>
	</article>
</template>

<style scoped>
article {
	padding: 2rem;
	max-width: 640px;
	margin: 0 auto;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 1.5rem;
}

.empty {
	color: var(--c-muted);
	font-size: 0.9rem;
	margin-bottom: 1rem;
}

.login-nudge {
	font-size: 13px;
	color: var(--c-muted);
	margin-bottom: 1.5rem;
}

.btn-link {
	background: none;
	border: none;
	padding: 0;
	color: var(--c-accent);
	font: inherit;
	cursor: pointer;
	text-decoration: underline;
}

.script-list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

section header {
	display: flex;
	align-items: baseline;
	gap: 12px;
	margin-bottom: 0.75rem;
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
	color: var(--c-accent);
}

.practice-link {
	font-size: 12px;
	color: var(--c-muted);
	text-decoration: none;
	margin-left: auto;
}

.practice-link:hover { color: var(--c-accent); }
</style>
