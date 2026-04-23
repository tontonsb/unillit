<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import { activeThaiFontFamily } from '@/scripts/thai/font'

const fontVars = computed(() => ({ '--font-thai': activeThaiFontFamily() }))
</script>

<template>
	<div class="app-layout" :style="fontVars">
		<MainMenu />
		<main class="app-main">
			<RouterView />
		</main>
	</div>
</template>

<style scoped>
div {
	display: flex;
	height: 100%;
	overflow: hidden;
}

main {
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}
</style>
