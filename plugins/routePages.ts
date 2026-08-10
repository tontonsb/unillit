import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import type { Plugin } from 'vite'

/* Build a static entry point per route so GitHub Pages doesn't serve subsections via
   404.html, which answers 404 with a working page. Routes come from the router, so a
   new page needs nothing here. */
function routes(root: string): string[] {
	const router = readFileSync(resolve(root, 'src/router/index.ts'), 'utf-8')
	const scripts = readFileSync(resolve(root, 'src/scripts/scripts.ts'), 'utf-8')

	const paths = [...router.matchAll(/path:\s*'([^']+)'/g)].map(m => m[1])
	const ids = [...scripts.matchAll(/^\t\tid:\s*'([^']+)'/gm)].map(m => m[1])

	return paths.flatMap(path => {
		if (path === '/') return []
		if (!path.includes('/:')) return [path]

		return ids.map(id => path.replace(/\/:[^/]+/, `/${id}`))
	})
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
			const emitted = routes(root)

			writeFileSync(resolve(dist, '404.html'), shell)

			for (const path of emitted) {
				const file = resolve(dist, `${path.replace(/^\//, '')}/index.html`)
				mkdirSync(dirname(file), { recursive: true })
				writeFileSync(file, shell)
			}

			this.info(`emitted ${emitted.length} route pages + 404.html`)
		},
	}
}
