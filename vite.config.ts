import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import markdown from './plugins/markdown'
import routePages from './plugins/routePages'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
	},
	build: {
		// Never inline a font: a base64 subset in the CSS downloads regardless of
		// its unicode-range, silently undoing the per-subset lazy loading.
		assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf|eot)$/.test(file) ? false : undefined),
	},
	plugins: [
		markdown(),
		vue(),
		vueDevTools(),
		routePages(),
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
