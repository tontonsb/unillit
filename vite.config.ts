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
