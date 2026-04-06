import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{vue,ts,mts,tsx}'],
	},

	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	...pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,

	{
		rules: {
			'vue/max-attributes-per-line': [
				'warn',
				{
					singleline: 3,
					multiline: 1,
				},
			],
			'vue/html-indent': ['warn', 'tab'],
			'vue/script-indent': ['warn', 'tab'],
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'vue/html-self-closing': [
				'warn',
				{
					html: {
						void: 'never',
						normal: 'never',
						component: 'always',
					},
					svg: 'any',
					math: 'any',
				},
			],
			semi: ['warn', 'never'],
			quotes: ['warn', 'single'],
		},
	},

	{
		...pluginPlaywright.configs['flat/recommended'],
		files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
	},

	{
		...pluginVitest.configs.recommended,
		files: ['src/**/__tests__/*'],
	},

	...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
)
