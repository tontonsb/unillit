import { ref, watch } from 'vue'

const storageKey = 'menu-prefs'

function load() {
	try { return JSON.parse(localStorage.getItem(storageKey) ?? '{}') } catch { return {} }
}

const stored = load()

export const collapsed = ref<boolean>(stored.collapsed ?? true)

watch(collapsed, () => {
	try {
		localStorage.setItem(storageKey, JSON.stringify({ collapsed: collapsed.value }))
	} catch {}
}, { flush: 'post' })
