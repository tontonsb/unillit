/**
 * Rasterise public/favicon.svg into the two binary icons browsers still need.
 * One-shot: run `node tools/icons.mjs` after editing the SVG, commit the output.
 * Not wired into the build — the icon changes about once a year.
 */
import { readFile, writeFile } from 'node:fs/promises'
import puppeteer from 'puppeteer'

const SVG = new URL('../public/favicon.svg', import.meta.url)
const OUT = (name) => new URL(`../public/${name}`, import.meta.url)

/** iOS applies its own corner mask, so the Apple icon ships square and bleeds to the edge. */
const squared = (svg) => svg.replace(/ rx="\d+"/, ' rx="0"')

async function png(browser, svg, size) {
	const page = await browser.newPage()

	await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 })
	await page.setContent(
		`<style>html,body{margin:0;padding:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
		{ waitUntil: 'load' },
	)

	const shot = await page.screenshot({ type: 'png', omitBackground: true })
	await page.close()

	return shot
}

/** Single-image .ico wrapping a PNG — valid since Vista, and every browser we target reads it. */
function ico(pngBuffer) {
	const header = Buffer.alloc(22)

	header.writeUInt16LE(0, 0)   // reserved
	header.writeUInt16LE(1, 2)   // type: icon
	header.writeUInt16LE(1, 4)   // one image
	header.writeUInt8(32, 6)     // width
	header.writeUInt8(32, 7)     // height
	header.writeUInt8(0, 8)      // palette size: not paletted
	header.writeUInt8(0, 9)      // reserved
	header.writeUInt16LE(1, 10)  // colour planes
	header.writeUInt16LE(32, 12) // bits per pixel
	header.writeUInt32LE(pngBuffer.length, 14)
	header.writeUInt32LE(22, 18) // offset of the image data

	return Buffer.concat([header, pngBuffer])
}

const svg = await readFile(SVG, 'utf8')
const browser = await puppeteer.launch()

try {
	await writeFile(OUT('favicon.ico'), ico(await png(browser, svg, 32)))
	await writeFile(OUT('apple-touch-icon.png'), await png(browser, squared(svg), 180))
} finally {
	await browser.close()
}

console.log('wrote public/favicon.ico (32) and public/apple-touch-icon.png (180)')
