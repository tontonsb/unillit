<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
	<div class="app-layout">
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
