import { ref, watch } from 'vue'
import { activeFont } from '@/composables/useScriptContext'

export interface CyrillicFont {
	id: string
	label: string
	family: string
	style?: 'normal' | 'italic'
}

export const cyrillicFonts: CyrillicFont[] = [
	{ id: 'lora', label: 'Serif (Lora)', family: "'Lora', serif" },
	{ id: 'spectral', label: 'Serif (Spectral)', family: "'Spectral', serif" },
	{ id: 'ysabeau', label: 'Sans-serif (Ysabeau)', family: "'Ysabeau', sans-serif" },
	{ id: 'ysabeau-italic', label: 'Cursive (Ysabeau)', family: "'Ysabeau', sans-serif", style: 'italic' },
	{ id: 'lora-italic', label: 'Cursive (Lora)', family: "'Lora', serif", style: 'italic' },
	{ id: 'pacifico', label: 'Handwriting (Pacifico)', family: "'Pacifico', cursive" },
	{ id: 'greatvibes', label: 'Handwriting (Great Vibes)', family: "'Great Vibes', cursive" },
]

export const activeCyrillicFontId = ref('lora')

watch(activeCyrillicFontId, id => { activeFont.value = id }, { immediate: true })

export function activeCyrillicFontFamily(): string {
	return cyrillicFonts.find(f => f.id === activeCyrillicFontId.value)?.family
		?? cyrillicFonts[0]?.family
		?? 'system-ui'
}

export function activeCyrillicFontStyle(): string {
	return cyrillicFonts.find(f => f.id === activeCyrillicFontId.value)?.style
		?? 'normal'
}
