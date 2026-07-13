<script setup lang="ts">
import FontPicker from '@/components/FontPicker.vue'
import { cyrillicFonts, activeCyrillicFontId } from './font'
</script>

<template>
	<FontPicker :fonts="cyrillicFonts" v-model="activeCyrillicFontId" />
</template>
