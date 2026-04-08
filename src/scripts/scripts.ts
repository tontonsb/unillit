import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export interface ScriptTab {
	label: string
	component: Component
}

export interface ScriptConfig {
	id: string
	name: string
	nativeName: string
	meta: string
	infoTabs: ScriptTab[]
	practiceTabs: ScriptTab[]
}

const NoContent = defineAsyncComponent(() => import('@/scripts/NoContent.vue'))
const PracticePlaceholder = defineAsyncComponent(() => import('@/scripts/PracticePlaceholder.vue'))

export const scriptList: ScriptConfig[] = [
	{
		id: 'thai',
		name: 'Thai',
		nativeName: 'ภาษาไทย',
		meta: 'left → right · no spaces',
		infoTabs: [
			{
				label: 'Alphabet',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiSheet.vue')),
			},
			{
				label: 'Reading tips',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiTips.vue')),
			},
			{
				label: 'Alphabet',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiSheet.vue')),
			},
			{ label: 'None', component: NoContent },
		],
		practiceTabs: [
			{ label: 'Practice', component: PracticePlaceholder },
		],
	},
]

export const scriptsById = Object.fromEntries(scriptList.map((s) => [s.id, s]))
