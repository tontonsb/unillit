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
	<article class="prose">
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
/* The wide cap is for the tables; everything that is read as prose keeps the shared
   measure, so the heading sits where it does on every other page. */
article {
	max-width: var(--measure-wide);
}

article > :is(h1, p),
.login {
	max-width: var(--measure-prose);
	margin-inline: auto;
}

.login {
	display: flex;
	flex-direction: column;
	gap: var(--sp-16);
}

.muted { color: var(--c-muted); }

.btn-primary {
	padding: var(--sp-8) var(--sp-20);
	border: none;
	border-radius: var(--radius);
	background: var(--c-accent);
	color: var(--c-on-sign);
	font-size: var(--fs-chrome);
	font-family: var(--sans);
	cursor: pointer;
	transition: opacity 0.15s;
	align-self: flex-start;
}

.btn-primary:hover { opacity: 0.85; }
</style>
