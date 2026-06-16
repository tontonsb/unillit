import { ref, computed } from 'vue'
import router from '@/router'
import { scriptsById } from '@/scripts/scripts'

export const activeFont = ref('')

// active tab indices for the two panels (left = info, right = practice)
export const infoTab = ref(0)
export const practiceTab = ref(0)

// label of the active info tab (e.g. "Reading tips", "None")
export const activeInfoSheet = computed(() => {
	const id = router.currentRoute.value.params.id as string | undefined

	return (id && scriptsById[id]?.infoTabs?.[infoTab.value]?.label) || ''
})
