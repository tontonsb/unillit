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
		meta: 'Abugida · left → right · 44 consonants · 20+ vowel forms',
		countries: 'Thailand',
		infoHeaderEnd: defineAsyncComponent(() => import('@/scripts/thai/ThaiFontPicker.vue')),
		practiceTabs: [
			{
				label: 'Type-in',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiQuiz.vue')),
			},
			{
				label: 'Multiple choice',
				component: defineAsyncComponent(() => import('@/scripts/thai/ThaiMultipleChoiceQuiz.vue')),
			},
		],
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
		meta: 'Abjad · right → left · 28 letters · up to 4 forms each',
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
		meta: 'Abugida · left → right · 39 consonants · 11 vowels',
		countries: 'Bangladesh · West Bengal',
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
		meta: 'Alphabet · left → right · 33 letters',
		countries: 'Russia · Ukraine · Bulgaria',
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
		meta: 'Alphabet · left → right · 24 letters',
		countries: 'Greece · Cyprus',
		comingSoon: true,
	},
	{
		id: 'lao',
		name: 'Lao',
		nativeName: 'ພາສາລາວ',
		meta: 'Abugida · left → right · 27 consonants',
		countries: 'Laos',
		comingSoon: true,
	},
]

export const scriptsById = Object.fromEntries(scriptList.map((s) => [s.id, s]))
