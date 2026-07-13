import type { Question } from '@/components/quiz/dataset'

export const LANGUAGE_OPTIONS = [
	'Russian',
	'Ukrainian',
	'Belarusian',
	'Bulgarian',
	'Serbian',
	'Macedonian',
]

export const languageIdQuestions: Question[] = [
	{ prompt: 'Київ', answer: ['Ukrainian'], hint: 'ї is unique to Ukrainian.' },
	{ prompt: 'Дніпро', answer: ['Ukrainian', 'Belarusian'], hint: 'і (not и) → Ukrainian or Belarusian.' },
	{ prompt: 'Магілёў', answer: ['Belarusian'], hint: 'ў is unique to Belarusian.' },
	{ prompt: 'Брэст', answer: ['Russian', 'Belarusian'], hint: 'э → Russian or Belarusian (Belarusian spelling here).' },
	{ prompt: 'Орёл', answer: ['Russian', 'Belarusian'], hint: 'ё → Russian or Belarusian.' },
	{ prompt: 'Сыктывкар', answer: ['Russian', 'Belarusian'], hint: 'ы → Russian or Belarusian.' },
	{ prompt: 'Велико Търново', answer: ['Bulgarian'], hint: 'ъ as a vowel → Bulgarian.' },
	{ prompt: 'Кърджали', answer: ['Russian', 'Bulgarian'], hint: 'ъ as a vowel → Bulgarian.' },
	{ prompt: 'Ђердап', answer: ['Serbian'], hint: 'ђ is unique to Serbian.' },
	{ prompt: 'Бања Лука', answer: ['Serbian', 'Macedonian'], hint: 'њ → Serbian or Macedonian.' },
	{ prompt: 'Скопје', answer: ['Serbian', 'Macedonian'], hint: 'ј → Serbian or Macedonian.' },
	{ prompt: 'Ѓорче Петров', answer: ['Macedonian'], hint: 'ѓ is unique to Macedonian.' },
	{
		prompt: 'Самара',
		answer: ['Russian', 'Ukrainian', 'Belarusian', 'Bulgarian', 'Serbian', 'Macedonian'],
		hint: 'No distinctive letters — fits every cyrillic alphabet.',
	},
]
