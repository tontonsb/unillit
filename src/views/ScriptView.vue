<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ScriptPanel from '@/components/ScriptPanel.vue'
import { scriptsById } from '@/scripts/scripts'

const route = useRoute()
const config = computed(() => scriptsById[route.params.id as string])
</script>

<template>
	<div v-if="config" class="script-page">
		<div class="panels">
			<ScriptPanel
				:tabs="config.infoTabs"
				:title="config.name"
				:title-native="config.nativeName"
				:title-lang="config.id"
			/>
			<ScriptPanel :tabs="config.practiceTabs" />
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
	border-right: 1px solid var(--c-border);
}

.not-found {
	padding: 32px;
	color: var(--c-muted);
}

@media (max-width: 768px) {
	.panels {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
	}
}
</style>
