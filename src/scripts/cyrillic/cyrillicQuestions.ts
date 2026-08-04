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
	{ prompt: 'Казань', answer: 'Kazan', hint: 'capital of Tatarstan' },
	{ prompt: 'Красноярск', answer: 'Krasnoyarsk' },
	{ prompt: 'Пермь', answer: 'Perm', hint: 'ь at end — soft sign, not romanised in place names' },
	{ prompt: 'Волгоград', answer: 'Volgograd' },
	{ prompt: 'Краснодар', answer: 'Krasnodar' },
	{ prompt: 'Тюмень', answer: 'Tyumen', hint: 'ю = yu' },
	{ prompt: 'Хабаровск', answer: 'Khabarovsk' },
	{ prompt: 'Владивосток', answer: 'Vladivostok' },
	{ prompt: 'Иркутск', answer: 'Irkutsk' },
	{ prompt: 'Якутск', answer: 'Yakutsk', hint: 'Я = ya' },
	{ prompt: 'Мурманск', answer: 'Murmansk' },
	{ prompt: 'Архангельск', answer: 'Arkhangelsk' },
	{ prompt: 'Петрозаводск', answer: 'Petrozavodsk' },
	{ prompt: 'Грозный', answer: 'Grozny', hint: 'capital of Chechnya' },
	{ prompt: 'Махачкала', answer: 'Makhachkala', hint: 'capital of Dagestan' },
	{ prompt: 'Владикавказ', answer: 'Vladikavkaz', hint: 'capital of North Ossetia' },
	{ prompt: 'Улан-Удэ', answer: 'Ulan-Ude', hint: 'capital of Buryatia; Э = e' },
	{ prompt: 'Кызыл', answer: 'Kyzyl', hint: 'capital of Tuva; ы = y' },
	{ prompt: 'Элиста', answer: 'Elista', hint: 'capital of Kalmykia; Э = e' },
	// Russia — geography
	{ prompt: 'Сибирь', answer: 'Siberia' },
	{ prompt: 'Байкал', answer: 'Baikal' },
	{ prompt: 'Камчатка', answer: 'Kamchatka' },
	{ prompt: 'Сахалин', answer: 'Sakhalin' },
	{ prompt: 'Урал', answer: 'Ural' },
	{ prompt: 'Кавказ', answer: 'Caucasus' },
	{ prompt: 'Волга', answer: 'Volga' },
	// Ukraine — Ukrainian Cyrillic: і = i, ї = yi, є = ye, ґ = g; Г = h in romanisation
	{ prompt: 'Київ', answer: 'Kyiv', hint: 'Ukrainian і = i (not Russian и); not "Kiev"' },
	{ prompt: 'Харків', answer: 'Kharkiv', hint: 'Ukrainian і = i' },
	{ prompt: 'Одеса', answer: 'Odesa' },
	{ prompt: 'Львів', answer: 'Lviv', hint: 'ь = soft sign (not romanised); і = i' },
	{ prompt: 'Дніпро', answer: 'Dnipro' },
	{ prompt: 'Запоріжжя', answer: 'Zaporizhzhia', hint: 'жж = zhzh; final я → zhia in official romanisation' },
	{ prompt: 'Чернігів', answer: 'Chernihiv', hint: 'Ukrainian Г = h in romanisation' },
	{ prompt: 'Ужгород', answer: 'Uzhhorod', hint: 'Г doubles to hh at the boundary in Ukrainian romanisation' },
	// Belarus — Belarusian Cyrillic: і = i, ў = w; Г = h in romanisation
	{ prompt: 'Мінск', answer: 'Minsk', hint: 'Belarusian і = i' },
	{ prompt: 'Брэст', answer: 'Brest', hint: 'Э = e' },
	{ prompt: 'Гродна', answer: 'Hrodna', hint: 'Belarusian Г = h' },
	{ prompt: 'Гомель', answer: ['Homel', 'Gomel'], hint: 'Belarusian Г = h' },
	{ prompt: 'Магілёў', answer: ['Mahilyow', 'Mogilev'], hint: 'Г = h; Ё = yo; ў is unique to Belarusian — romanised as w' },
	// Bulgaria — Bulgarian Cyrillic: ъ is a full vowel /ɐ/, romanised as a (not a hard sign!)
	{ prompt: 'София', answer: 'Sofia' },
	{ prompt: 'Пловдив', answer: 'Plovdiv' },
	{ prompt: 'Варна', answer: 'Varna' },
	{ prompt: 'Бургас', answer: 'Burgas' },
	{ prompt: 'Велико Търново', answer: ['Veliko Tarnovo', 'Veliko Turnovo'], hint: 'Bulgarian ъ = a (a full vowel, unlike Russian hard sign)' },
	// Serbia — Serbian Cyrillic adds Ј (j), Љ (lj), Њ (nj), Ђ (đ), Ћ (ć), Џ (dž)
	{ prompt: 'Београд', answer: ['Belgrade', 'Beograd'] },
	{ prompt: 'Нови Сад', answer: 'Novi Sad' },
	{ prompt: 'Ниш', answer: ['Niš', 'Nis'] },
	{ prompt: 'Крагујевац', answer: 'Kragujevac', hint: 'Serbian Ј = j' },
	{ prompt: 'Зрењанин', answer: 'Zrenjanin', hint: 'Serbian Њ = nj' },
	// North Macedonia — same extra letters as Serbian
	{ prompt: 'Скопје', answer: 'Skopje', hint: 'Macedonian Ј = j' },
	{ prompt: 'Охрид', answer: 'Ohrid' },
	{ prompt: 'Битола', answer: 'Bitola' },
	// Kazakhstan — Kazakh Cyrillic adds Ә (ä), Ғ (gh), Қ (q), Ң (ng), Ө (ö), Ұ/Ү (ü), Һ (h)
	{ prompt: 'Астана', answer: 'Astana' },
	{ prompt: 'Алматы', answer: 'Almaty' },
	{ prompt: 'Шымкент', answer: 'Shymkent', hint: 'ы = y' },
	{ prompt: 'Қарағанды', answer: 'Karaganda', hint: 'Қ = q/k; Ғ = gh/g — Kazakh-specific letters' },
	{ prompt: 'Өскемен', answer: 'Oskemen', hint: 'Ө = ö — Kazakh/Mongolian vowel' },
	{ prompt: 'Қонаев', answer: ['Qonayev', 'Konayev'], hint: 'Қ = Q; named after Kazakh leader Dinmukhamed Konayev' },
	{ prompt: 'Қостанай', answer: ['Kostanay', 'Qostanay'], hint: 'Қ = Q' },
	{ prompt: 'Қызылорда', answer: 'Kyzylorda', hint: 'Қ = Q; ы = y' },
	{ prompt: 'Қапшағай', answer: 'Kapshagay', hint: 'Қ = Q; Ғ = gh — both Kazakh-specific letters' },
	// Kyrgyzstan — Kyrgyz Cyrillic adds Ң (ng), Ө (ö), Ү (ü)
	{ prompt: 'Бишкек', answer: 'Bishkek' },
	{ prompt: 'Ош', answer: 'Osh' },
	{ prompt: 'Нарын', answer: 'Naryn' },
	{ prompt: 'Ысык-Көл', answer: ['Issyk-Kul', 'Ysyk-Köl'], hint: 'ы = y; Ө = ö — the famous mountain lake' },
	{ prompt: 'Өзгөн', answer: 'Uzgen', hint: 'Ө = ö, appears twice' },
	{ prompt: 'Таш-Көмүр', answer: 'Tash-Kumyr', hint: 'Ө = ö; Ү = ü' },
	{ prompt: 'Кеңеш', answer: 'Kenesh', hint: 'Ң = ng — Kyrgyz velar nasal' },
	// Tajikistan — Tajik Cyrillic adds ғ (gh), қ (q), ҳ (h), ҷ (j), ӣ/ӯ (long vowels)
	{ prompt: 'Душанбе', answer: 'Dushanbe' },
	{ prompt: 'Хуҷанд', answer: 'Khujand', hint: 'ҷ = j — Tajik-specific letter' },
	// Mongolia — Mongolian Cyrillic adds Ө (ö) and Ү (ü); double vowels mark length
	{ prompt: 'Улаанбаатар', answer: 'Ulaanbaatar', hint: 'double vowels mark long vowels in Mongolian' },
	{ prompt: 'Эрдэнэт', answer: 'Erdenet', hint: 'Э = e' },
	{ prompt: 'Дархан', answer: 'Darkhan' },
	{ prompt: 'Мөрөн', answer: ['Moron', 'Mörön'], hint: 'Ө = ö — Mongolian vowel not in Russian Cyrillic' },
	// Tatar — adds Ә (ä), Ө (ö), Ү (ü), Ң (ng), Җ (j), Һ (h)
	{ prompt: 'Татарстан', answer: 'Tatarstan' },
	{ prompt: 'Казан', answer: 'Kazan', hint: 'Tatar spelling — no soft sign unlike Russian Казань' },
	{ prompt: 'Мәскәү', answer: 'Moscow', hint: 'Tatar name for Moscow; Ә = ä, Ү = ü' },
	{ prompt: 'Яр Чаллы', answer: 'Naberezhnye Chelny', hint: 'Tatar name; Яр = bank/shore' },
	{ prompt: 'Чиләбе', answer: 'Chelyabinsk', hint: 'Tatar name; Ä = ä' },
	// Bashkir — adds Ҡ (uvular q), Ғ (gh), Ҙ (voiced th), Ҫ (voiceless th), Ә/Ө/Ү/Ң shared with Tatar
	{ prompt: 'Башҡортостан', answer: 'Bashkortostan', hint: 'Ҡ = uvular stop (like Arabic ق), distinct from velar К' },
	{ prompt: 'Өфө', answer: 'Ufa', hint: 'Bashkir/Tatar name; Ө = ö' },
	{ prompt: 'Стәрлетамаҡ', answer: 'Sterlitamak', hint: 'Ҡ = uvular q at the end' },
	{ prompt: 'Ырымбур', answer: 'Orenburg', hint: 'Bashkir name; ы = y' },
	// Yakut/Sakha — adds Ҕ (gh), Ҥ (ng); Дь/Нь mark palatalised consonants
	{ prompt: 'Саха', answer: 'Sakha', hint: 'official name of the Yakutia republic' },
	{ prompt: 'Дьокуускай', answer: ['Yakutsk', 'D\'okuuskay', 'Dyokuuskay', 'Djokuuskay'], hint: 'Yakut name; Дь = palatalised d (a Yakut digraph)' },
	{ prompt: 'Нерүнгри', answer: 'Neryungri', hint: 'Ү = ü in Yakut' },
	// Russian Caucasus capitals
	{ prompt: 'Нальчик', answer: 'Nalchik', hint: 'capital of Kabardino-Balkaria' },
	{ prompt: 'Черкесск', answer: 'Cherkessk', hint: 'capital of Karachay-Cherkessia' },
	{ prompt: 'Майкоп', answer: 'Maykop', hint: 'capital of Adygea' },
	{ prompt: 'Магас', answer: 'Magas', hint: 'capital of Ingushetia; one of the newest capitals in Russia (1999)' },
	// Ossetian — adds Æ/æ (ae), used both as a standalone vowel and in digraphs
	{ prompt: 'Дзæуджыхъæу', answer: 'Vladikavkaz', hint: 'Ossetian name; æ = ae sound, unique to Ossetian Cyrillic' },
	{ prompt: 'Ирыстон', answer: 'Ossetia', hint: 'Ossetian self-name; ы = y' },
	// Chechen/Ingush — Ӏ (palochka) marks ejective and pharyngeal consonants
	{ prompt: 'Соьлжа-ГӀала', answer: ['Solzha-Gala', 'Grozny'], hint: 'Chechen name; Ӏ (palochka) marks pharyngeal consonants' },
	{ prompt: 'Нохчийчоь', answer: ['Nokhchiycho', 'Chechnya'], hint: 'Chechen self-name for the republic' },
	// Abkhazia
	{ prompt: 'Аҧсны', answer: ['Apsny', 'Abkhazia'], hint: 'Abkhaz self-name; Ҧ = bilabial fricative, unique to Abkhaz Cyrillic' },
	{ prompt: 'Аҟəа', answer: ['Aqwa', 'Sukhum', 'Sukhumi'], hint: 'Abkhaz name; Ҟ = ejective uvular, ə = schwa' },
]
