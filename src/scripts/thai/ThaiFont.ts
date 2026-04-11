import { ref } from 'vue'

export interface ThaiFont {
	id: string
	label: string
	family: string
}

export const thaiFonts: ThaiFont[] = [
	{ id: 'sans', label: 'Sans',   family: '\'Noto Sans Thai\', system-ui, sans-serif' },
	{ id: 'sarabun', label: 'Sarabun', family: '\'Sarabun\', system-ui, sans-serif' },
	{ id: 'serif', label: 'Serif',  family: '\'Noto Serif Thai\', serif' },
	{ id: 'trirong', label: 'Trirong', family: '\'Trirong\', serif' },
]

export const activeThaiFontId = ref('sarabun')

export function activeThaiFontFamily() {
	return thaiFonts.find(f => f.id === activeThaiFontId.value)?.family
		?? thaiFonts[0]?.family
		?? 'system-ui'
}
