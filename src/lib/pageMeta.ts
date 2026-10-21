/* Also run by the build in Node, so it takes the scripts as an argument instead of
   importing the registry, which pulls in Vue components. */

const SITE = 'Unillit'

export interface ScriptSummary {
	name: string
	meta: string
}

export interface PageMeta {
	title: string
	description?: string // absent = keep the site-wide one from index.html
}

export function pageMeta(path: string, scripts: Record<string, ScriptSummary>): PageMeta {
	const [section, id] = path.split('/').filter(Boolean)

	if (!section)
		return { title: SITE }

	if (section === 'scripts') {
		const script = id ? scripts[id] : undefined

		if (!script)
			return { title: SITE }

		return {
			title: `${script.name} on ${SITE}`,
			description: `Learn to read some of the ${script.name} script.`,
		}
	}

	return { title: `${section[0]!.toUpperCase()}${section.slice(1)} — ${SITE}` }
}
