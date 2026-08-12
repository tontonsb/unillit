import type { Router } from 'vue-router'

/* Every deploy renames the hashed chunks, so a tab left open on the previous build asks
   for files that no longer exist as soon as it lazy-loads a view or a panel. Reloading
   fetches the current index.html; the timestamp guard keeps a chunk that is genuinely
   missing from looping. */

const GUARD_KEY = 'unillit:stale-reload'
const GUARD_MS = 30_000

function reloadOnce(target: string): boolean {
	const last = Number(sessionStorage.getItem(GUARD_KEY))

	if (Date.now() - last < GUARD_MS)
		return false

	sessionStorage.setItem(GUARD_KEY, String(Date.now()))
	location.assign(target)

	return true
}

export function reloadOnStaleChunks(router: Router) {
	let pending: string | null = null

	router.beforeEach(to => {
		pending = to.fullPath
	})

	router.afterEach(() => {
		pending = null
	})

	/* Vite routes every failed dynamic import here — lazy routes, async tab components
	   and dataset loads alike. Leaving the event uncancelled rethrows, which is what we
	   want when the guard says we already tried. */
	window.addEventListener('vite:preloadError', event => {
		if (reloadOnce(pending ?? location.href))
			event.preventDefault()
	})
}
