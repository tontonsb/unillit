import MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const md = new MarkdownIt({ html: true, typographer: true })

function dedent(str: string): string {
	const lines = str.split('\n')
	const nonEmpty = lines.filter(l => l.trim().length > 0)

	if (!nonEmpty.length) return ''

	const minIndent = Math.min(...nonEmpty.map(l => l.match(/^(\s*)/)?.[1].length ?? 0))

	return lines.map(l => l.slice(minIndent)).join('\n').trim()
}

export default function markdown(): Plugin {
	return {
		name: 'vue-inline-md',
		transform(code, id) {
			if (!id.endsWith('.vue') || !code.includes('<Markdown')) return null

			return code.replace(/<Markdown(\s[^>]*)?>(\s[\s\S]*?)<\/Markdown>/g, (_, attrs, content) => {
				const wrap = attrs?.match(/wrap="([^"]+)"/)?.[1]
				const rendered = md.render(dedent(content))

				return wrap ? `<${wrap}>${rendered}</${wrap}>` : rendered
			})
		},
	}
}
