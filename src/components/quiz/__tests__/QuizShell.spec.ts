import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import QuizShell from '../QuizShell.vue'
import type { QuizDatasetConfig } from '../dataset'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'

vi.mock('@/composables/useAuth', async () => {
	const { ref } = await import('vue')

	return { useAuth: () => ({ user: ref(null) }) }
})

vi.mock('@/composables/useStats', () => ({ useStats: () => null }))

vi.mock('@/composables/useResultShare', async () => {
	const { ref } = await import('vue')

	return { useResultShare: () => ({ resultCopied: ref(false), copyResults: () => {} }) }
})

const datasetConfig: QuizDatasetConfig = {
	label: 'Test',
	load: async () => ({
		questions: [
			{ prompt: 'а', answer: 'a' },
			{ prompt: 'б', answer: 'b' },
			{ prompt: 'в', answer: 'v' },
		],
	}),
}

async function mountShell(options: { attachTo?: HTMLElement } = {}) {
	const wrapper = mount(QuizShell, {
		props: { datasetConfig },
		global: { stubs: { StatsPanel: true, RunsPanel: true } },
		...options,
	})

	await flushPromises()

	return wrapper
}

function tab(wrapper: VueWrapper, label: string) {
	const found = wrapper.findAll<HTMLButtonElement>('button').find(b => b.text() === label)
	if (!found) throw new Error(`no tab labelled "${label}"`)

	return found
}

async function openTab(wrapper: VueWrapper, label: string) {
	await tab(wrapper, label).trigger('click')
	await nextTick()
}

beforeEach(() => {
	samplingMode.value = 'shuffled'
	randomCount.value = 10
	preferredMode.value = 'typein'
})

describe('QuizShell tabs', () => {
	it('keeps the run when stats are opened and closed', async () => {
		const wrapper = await mountShell()

		await wrapper.find('input[type="text"]').setValue('a')
		await wrapper.find('form').trigger('submit')
		expect(wrapper.text()).toContain('1 / 3')

		await openTab(wrapper, 'stats')
		await openTab(wrapper, 'quiz')

		expect(wrapper.text()).toContain('1 / 3')
	})

	it('hands focus back to the answer field on return', async () => {
		const wrapper = await mountShell({ attachTo: document.body })

		const answer = wrapper.find<HTMLInputElement>('input[type="text"]').element
		expect(document.activeElement).toBe(answer)

		/**
		 * A real click moves focus to the tab button; jsdom doesn't do that on
		 * dispatched events, and it won't blur a display:none element either, so
		 * the focus has to be moved by hand for the return trip to mean anything.
		 */
		tab(wrapper, 'stats').element.focus()
		await openTab(wrapper, 'stats')
		expect(document.activeElement).not.toBe(answer)

		await openTab(wrapper, 'quiz')

		expect(document.activeElement).toBe(answer)

		wrapper.unmount()
	})
})
