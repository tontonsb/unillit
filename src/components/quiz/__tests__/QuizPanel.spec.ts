import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import QuizPanel from '../QuizPanel.vue'
import type { QuizDataset } from '../dataset'
import { samplingMode, randomCount, preferredMode } from '@/composables/useQuizPrefs'

/**
 * Three module-level boundaries reach outside the panel: two of them build a
 * Supabase client on import, the third wants a router. Stub them and the panel
 * mounts on its own.
 */
vi.mock('@/composables/useAuth', async () => {
	const { ref } = await import('vue')

	return { useAuth: () => ({ user: ref(null) }) }
})

vi.mock('@/composables/useStats', () => ({ useStats: () => null }))

vi.mock('@/composables/useResultShare', async () => {
	const { ref } = await import('vue')

	return { useResultShare: () => ({ resultCopied: ref(false), copyResults: () => {} }) }
})

const dataset: QuizDataset = {
	label: 'Test',
	questions: [
		{ prompt: 'а', answer: 'a' },
		{ prompt: 'б', answer: 'b' },
		{ prompt: 'в', answer: 'v' },
	],
	modes: ['typein', 'multiplechoice'],
}

const confirmed = vi.fn(() => true)

function button(wrapper: VueWrapper, label: string) {
	const found = wrapper.findAll('button').find(b => b.text() === label)
	if (!found) throw new Error(`no button labelled "${label}"`)

	return found
}

async function answerOne(wrapper: VueWrapper) {
	await wrapper.find('input[type="text"]').setValue('a')
	await wrapper.find('form').trigger('submit')
}

function countField(wrapper: VueWrapper) {
	const field = wrapper.find<HTMLInputElement>('input[type="number"]')

	// mirrors the browser: typing fires input, committing (blur/Enter) fires change
	return {
		el: field.element,
		type: async (value: string) => {
			field.element.value = value
			await field.trigger('input')
		},
		commit: () => field.trigger('change'),
	}
}

beforeEach(() => {
	samplingMode.value = 'shuffled'
	randomCount.value = 10
	preferredMode.value = 'typein'
	confirmed.mockClear().mockReturnValue(true)
	vi.stubGlobal('confirm', confirmed)
})

describe('QuizPanel run guard', () => {
	it('changes settings without asking before the run has started', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })

		await button(wrapper, 'Random').trigger('click')

		expect(confirmed).not.toHaveBeenCalled()
		expect(samplingMode.value).toBe('random')
	})

	it('asks once an answer has been given', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		await button(wrapper, 'Random').trigger('click')

		expect(confirmed).toHaveBeenCalledOnce()
		expect(samplingMode.value).toBe('random')
	})

	it('leaves the run untouched when the warning is declined', async () => {
		confirmed.mockReturnValue(false)
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		await button(wrapper, 'Random').trigger('click')

		expect(samplingMode.value).toBe('shuffled')
		expect(wrapper.text()).toContain('1 / 3')
	})

	it('guards the quiz mode toggle too', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)
		confirmed.mockReturnValue(false)

		await button(wrapper, 'Multiple choice').trigger('click')

		expect(preferredMode.value).toBe('typein')
		expect(wrapper.text()).toContain('1 / 3')
	})

	it('does not re-ask for a run that has finished', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })

		for (let i = 0; i < dataset.questions.length; i++) {
			await answerOne(wrapper)
			await button(wrapper, 'Next →').trigger('click')
		}

		await button(wrapper, 'Random').trigger('click')

		expect(confirmed).not.toHaveBeenCalled()
	})
})

describe('QuizPanel question count', () => {
	beforeEach(() => { samplingMode.value = 'random' })

	it('takes effect on commit, not on every keystroke', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		const count = countField(wrapper)
		await count.type('2')
		await count.type('25')

		expect(confirmed).not.toHaveBeenCalled()
		expect(randomCount.value).toBe(10)

		await count.commit()

		expect(confirmed).toHaveBeenCalledOnce()
		expect(randomCount.value).toBe(25)
	})

	it('puts the old count back when the warning is declined', async () => {
		confirmed.mockReturnValue(false)
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		const count = countField(wrapper)
		await count.type('25')
		await count.commit()

		expect(randomCount.value).toBe(10)
		expect(count.el.value).toBe('10')
	})

	it('rejects a count below 1 without asking', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		const count = countField(wrapper)
		await count.type('0')
		await count.commit()

		expect(confirmed).not.toHaveBeenCalled()
		expect(randomCount.value).toBe(10)
		expect(count.el.value).toBe('10')
	})

	it('does not ask when the committed count is unchanged', async () => {
		const wrapper = mount(QuizPanel, { props: { dataset } })
		await answerOne(wrapper)

		const count = countField(wrapper)
		await count.type('25')
		await count.type('10')
		await count.commit()

		expect(confirmed).not.toHaveBeenCalled()
		expect(randomCount.value).toBe(10)
	})
})
