import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import type { Plugin } from 'vite'
import { pageMeta, type PageMeta, type ScriptSummary } from '../src/lib/pageMeta'

/* Read from source rather than imported: the registry pulls in Vue components. Each
   entry of `scriptList` opens with a lone `\t{` and keeps its own fields two tabs in. */
function scripts(root: string): Record<string, ScriptSummary> {
	const source = readFileSync(resolve(root, 'src/scripts/scripts.ts'), 'utf-8')

	return Object.fromEntries(source.split(/^\t\{$/m).slice(1).map(entry => {
		const field = (key: string) => {
			const value = entry.match(new RegExp(`^\\t\\t${key}:\\s*(['"])(.*?)\\1,?$`, 'm'))?.[2]

			if (value === undefined)
				throw new Error(`route-pages: no \`${key}\` in a scriptList entry`)

			return value
		}

		return [field('id'), { name: field('name'), meta: field('meta') }]
	}))
}

/* Build a static entry point per route so GitHub Pages doesn't serve subsections via
   404.html, which answers 404 with a working page. Routes come from the router, so a
   new page needs nothing here. */
function routes(root: string, ids: string[]): string[] {
	const router = readFileSync(resolve(root, 'src/router/index.ts'), 'utf-8')
	const paths = [...router.matchAll(/path:\s*'([^']+)'/g)].map(m => m[1]!)

	return paths.flatMap(path => {
		if (path === '/') return []
		if (!path.includes('/:')) return [path]

		return ids.map(id => path.replace(/\/:[^/]+/, `/${id}`))
	})
}

const escapeHtml = (text: string) => text
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/"/g, '&quot;')

/* Link previews come from crawlers that don't run the app, so each page carries its
   own title and description. */
function withMeta(shell: string, { title, description }: PageMeta): string {
	let html = shell
		.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
		.replace(/(<meta property="og:title" content=")[^"]*/, (_, open) => open + escapeHtml(title))

	if (description)
		html = html.replace(
			/(<meta (?:name="description"|property="og:description") content=")[^"]*/g,
			(_, open) => open + escapeHtml(description),
		)

	return html
}

export default function routePages(): Plugin {
	let root = process.cwd()
	let outDir = 'dist'

	return {
		name: 'route-pages',
		apply: 'build',
		configResolved(config) {
			root = config.root
			outDir = config.build.outDir
		},
		closeBundle() {
			const dist = resolve(root, outDir)
			const shell = readFileSync(resolve(dist, 'index.html'), 'utf-8')
			const scriptsById = scripts(root)
			const emitted = routes(root, Object.keys(scriptsById))

			writeFileSync(resolve(dist, '404.html'), shell)

			for (const path of emitted) {
				const file = resolve(dist, `${path.replace(/^\//, '')}/index.html`)
				mkdirSync(dirname(file), { recursive: true })
				writeFileSync(file, withMeta(shell, pageMeta(path, scriptsById)))
			}

			this.info(`emitted ${emitted.length} route pages + 404.html`)
		},
	}
}
