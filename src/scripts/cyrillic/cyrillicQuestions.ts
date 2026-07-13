import type { Question } from '@/components/quiz/dataset'

/**
 * TODO: extend or split sets
 * either full
 * or core, east slavic, turkic
 * or mby core & extended
 * for now it's just russian, should fix it a bit...
 */
const alphabet: { upper: string; lower: string; rom: string | string[]; hint?: string }[] = [
	{ upper: 'А', lower: 'а', rom: 'a' },
	{ upper: 'Б', lower: 'б', rom: 'b' },
	{ upper: 'В', lower: 'в', rom: 'v' },
	{ upper: 'Г', lower: 'г', rom: 'g' },
	{ upper: 'Д', lower: 'д', rom: 'd' },
	{ upper: 'Е', lower: 'е', rom: ['ye', 'e'], hint: 'ye at word start or after a vowel, e elsewhere' },
	{ upper: 'Ё', lower: 'ё', rom: 'yo', hint: 'often written as Е in running text' },
	{ upper: 'Ж', lower: 'ж', rom: 'zh' },
	{ upper: 'З', lower: 'з', rom: 'z' },
	{ upper: 'И', lower: 'и', rom: 'i' },
	{ upper: 'Й', lower: 'й', rom: 'y' },
	{ upper: 'К', lower: 'к', rom: 'k' },
	{ upper: 'Л', lower: 'л', rom: 'l' },
	{ upper: 'М', lower: 'м', rom: 'm' },
	{ upper: 'Н', lower: 'н', rom: 'n' },
	{ upper: 'О', lower: 'о', rom: 'o' },
	{ upper: 'П', lower: 'п', rom: 'p' },
	{ upper: 'Р', lower: 'р', rom: 'r' },
	{ upper: 'С', lower: 'с', rom: 's' },
	{ upper: 'Т', lower: 'т', rom: 't' },
	{ upper: 'У', lower: 'у', rom: 'u' },
	{ upper: 'Ф', lower: 'ф', rom: 'f' },
	{ upper: 'Х', lower: 'х', rom: 'kh' },
	{ upper: 'Ц', lower: 'ц', rom: 'ts' },
	{ upper: 'Ч', lower: 'ч', rom: 'ch' },
	{ upper: 'Ш', lower: 'ш', rom: 'sh' },
	{ upper: 'Щ', lower: 'щ', rom: 'shch' },
	{ upper: 'Ъ', lower: 'ъ', rom: ['"', ''], hint: 'hard sign — marks a hard consonant, no sound of its own' },
	{ upper: 'Ы', lower: 'ы', rom: 'y' }, // check lang differences or exclude from core
	{ upper: 'Ь', lower: 'ь', rom: ["'", ''], hint: "soft sign — palatalizes the preceding consonant, written as apostrophe" },
	{ upper: 'Э', lower: 'э', rom: 'e', hint: 'plain e, not palatal — contrast with Е' },
	{ upper: 'Ю', lower: 'ю', rom: 'yu' },
	{ upper: 'Я', lower: 'я', rom: 'ya' },
]

export const uppercaseQuestions: Question[] = alphabet.map(l => ({
	prompt: l.upper,
	answer: l.rom,
	hint: l.hint,
}))

export const lowercaseQuestions: Question[] = alphabet.map(l => ({
	prompt: l.lower,
	answer: l.rom,
	hint: l.hint,
}))

export const allLettersQuestions: Question[] = [
	...uppercaseQuestions,
	...lowercaseQuestions,
]

export const toponymQuestions: Question[] = [
	// Russia — cities
	{ prompt: 'Москва', answer: 'Moscow' },
	{ prompt: 'Санкт-Петербург', answer: ['Saint Petersburg', 'Sankt-Peterburg', 'St Petersburg'] },
	{ prompt: 'Новосибирск', answer: 'Novosibirsk' },
	{ prompt: 'Екатеринбург', answer: 'Yekaterinburg' },
	{ prompt: 'Нижний Новгород', answer: 'Nizhny Novgorod' },
]
