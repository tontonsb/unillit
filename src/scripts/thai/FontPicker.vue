<script setup lang="ts">
import FontPicker from '@/components/FontPicker.vue'
import { thaiFonts, activeThaiFontId } from './font'
</script>

<template>
	<FontPicker :fonts="thaiFonts" v-model="activeThaiFontId" />
</template>
