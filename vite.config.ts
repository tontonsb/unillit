import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import markdown from './plugins/markdown'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	build: {
		// Never inline a font as a data: URI. Small subsets would otherwise be
		// base64'd into the CSS, which downloads them regardless of unicode-range
		// — silently undoing the per-subset lazy loading Fontsource ships.
		// Covers .woff too: the non-variable packages ship it as a legacy fallback.
		assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf|eot)$/.test(file) ? false : undefined),
	},
	plugins: [
		markdown(),
		vue(),
		vueDevTools(),
		{
			name: 'inject-version-meta',
			transformIndexHtml(html) {
				return html.replace(
					'</head>',
					`\t<meta name="version" content="${pkg.version}">\n\t</head>`,
				)
			},
		},
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
