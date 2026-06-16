import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'
import type { QuizDataset } from '@/components/quiz/dataset'
import { thaiDatasets } from './thai/datasets'

export interface ScriptTab {
	label: string
	component: Component
	props?: Record<string, unknown>
}

export interface ScriptConfig {
	id: string
	name: string
	nativeName: string
	abbr?: string     // icon char for collapsed menu; defaults to nativeName[0]
	meta: string
	countries?: string
	comingSoon?: boolean
	infoTabs?: ScriptTab[]
	practiceTabs?: ScriptTab[]
	infoHeaderEnd?: Component
}

const NoContent = defineAsyncComponent(() => import('@/scripts/NoContent.vue'))
const PracticePlaceholder = defineAsyncComponent(() => import('@/scripts/PracticePlaceholder.vue'))

export const scriptList: ScriptConfig[] = [
	{
		id: 'thai',
		name: 'Thai',
		nativeName: 'อักษรไทย',
		abbr: 'ภ',
		meta: 'Abugida written left to right, 44 consonants and 20+ vowel forms',
		countries: 'Thailand',
		infoHeaderEnd: defineAsyncComponent(() => import('@/scripts/thai/FontPicker.vue')),
		practiceTabs: (() => {
			const c = defineAsyncComponent(() => import('@/components/quiz/QuizShell.vue'))
			return thaiDatasets.map(dataset => ({ label: dataset.label, component: c, props: { dataset, scriptId: 'thai', promptClass: 'thai', promptFontFamily: 'var(--font-thai)' } }))
		})(),
		infoTabs: [
			{
				label: 'Reading tips',
				component: defineAsyncComponent(() => import('@/scripts/thai/ReadingTips.vue')),
			},
			{
				label: 'Alphabet',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiAlphabet.vue')),
			},
			{
				label: 'Identify by shape',
				component: defineAsyncComponent(() => import('@/scripts/thai/ShapeIdentification.vue')),
			},
			{ label: 'None', component: NoContent },
		],
	},
	{
		id: 'arabic',
		name: 'Arabic',
		nativeName: 'العربية',
		abbr: 'ع',
		meta: 'Abjad written right to left, 28 letters with up to 4 forms each',
		comingSoon: true,
		infoTabs: [
			/*{
				label: 'Shape × Dots',
				component: defineAsyncComponent(() => import('@/scripts/arabic/ArabicDotsGrid.vue')),
			},
			{
				label: 'Shape families',
				component: defineAsyncComponent(() => import('@/scripts/arabic/ArabicShapeFamilies.vue')),
			},
			{
				label: 'Shape families +',
				component: defineAsyncComponent(() => import('@/scripts/arabic/ArabicShapeFamiliesPlus.vue')),
			},*/
			{ label: 'None', component: NoContent },
		],
		practiceTabs: [
			{ label: 'Practice', component: PracticePlaceholder },
		],
	},
	{
		id: 'bengali',
		name: 'Bengali',
		nativeName: 'বাংলা',
		abbr: 'ব',
		meta: 'Abugida written left to right, 39 consonants and 11 vowels',
		countries: 'Bangladesh, West Bengal',
		comingSoon: true,
		infoTabs: [
			/*{
				label: 'Reading tips',
				component: defineAsyncComponent(() => import('@/scripts/bengali/BengaliTips.vue')),
			},
			{
				label: 'Alphabet',
				component: defineAsyncComponent(() => import('@/scripts/bengali/BengaliSheet.vue')),
			},*/
			{ label: 'None', component: NoContent },
		],
		practiceTabs: [
			{ label: 'Practice', component: PracticePlaceholder },
		],
	},
	{
		id: 'cyrillic',
		name: 'Cyrillic',
		nativeName: 'Кириллица',
		abbr: 'Ж',
		meta: 'Alphabet written left to right, 33 letters',
		countries: 'Russia, Ukraine, Bulgaria',
		comingSoon: true,
		infoTabs: [
			/*{
				label: 'Reading tips',
				component: defineAsyncComponent(() => import('@/scripts/cyrillic/CyrillicTips.vue')),
			},
			{
				label: 'Alphabet',
				component: defineAsyncComponent(() => import('@/scripts/cyrillic/CyrillicSheet.vue')),
			},*/
			{ label: 'None', component: NoContent },
		],
		practiceTabs: [
			{ label: 'Practice', component: PracticePlaceholder },
		],
	},
	{
		id: 'greek',
		name: 'Greek',
		nativeName: 'Ελληνικά',
		abbr: 'Ω',
		meta: 'Alphabet written left to right, 24 letters',
		countries: 'Greece, Cyprus',
		comingSoon: true,
	},
	{
		id: 'lao',
		name: 'Lao',
		nativeName: 'ພາສາລາວ',
		meta: 'Abugida written left to right, 27 consonants',
		countries: 'Laos',
		comingSoon: true,
	},
]

export const scriptsById = Object.fromEntries(scriptList.map((s) => [s.id, s]))

// indexed the same as the practice tabs (which are built from these)
export const datasetsById: Record<string, QuizDataset[]> = {
	thai: thaiDatasets,
}
