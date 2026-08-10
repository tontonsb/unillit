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
	<article class="prose">
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
.empty {
	color: var(--c-muted);
	font-size: var(--fs-prose);
	margin-bottom: var(--sp-16);
}

.login-nudge {
	font-size: var(--fs-chrome);
	color: var(--c-muted);
	margin-bottom: var(--sp-24);
}

.btn-link {
	background: none;
	border: none;
	padding: 0;
	color: var(--c-sign);
	font: inherit;
	cursor: pointer;
	text-decoration: underline;
}

.script-list {
	display: flex;
	flex-direction: column;
	gap: var(--sp-32);
}

section header {
	display: flex;
	align-items: baseline;
	gap: var(--sp-12);
	margin-bottom: var(--sp-12);
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
</style>
