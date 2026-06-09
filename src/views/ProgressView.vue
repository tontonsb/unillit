<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { fetchScriptProgress, type ScriptProgress } from '@/composables/useProgress'
import ScriptProgressList from '@/components/progress/ScriptProgressList.vue'
import RunHistory from '@/components/progress/RunHistory.vue'

const { user, loginWithDiscord } = useAuth()
const scripts = ref<ScriptProgress[]>([])
const loading = ref(false)

async function load() {
	if (!user.value)
		return

	loading.value = true
	scripts.value = await fetchScriptProgress()
	loading.value = false
}

onMounted(load)
</script>

<template>
	<article>
		<h1>Progress</h1>

		<div v-if="!user" class="login">
			<p>Log in to see your progress.</p>
			<button type="button" class="btn-primary" @click="loginWithDiscord">Login with Discord</button>
		</div>

		<div v-else-if="loading" class="muted">Loading…</div>

		<template v-else>
			<ScriptProgressList :scripts="scripts" />
			<RunHistory />
		</template>
	</article>
</template>

<style scoped>
article {
	padding: 2rem;
	max-width: 720px;
	margin: 0 auto;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 1.5rem;
}

.login {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.muted { color: var(--c-muted); }

.btn-primary {
	padding: 8px 20px;
	border: none;
	border-radius: var(--radius);
	background: var(--c-accent);
	color: #fff;
	font-size: 13px;
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity 0.15s;
	align-self: flex-start;
}

.btn-primary:hover { opacity: 0.85; }
</style>
