import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/scripts/:id',
			name: 'script',
			component: () => import('../views/ScriptView.vue'),
		},
		{
			path: '/progress',
			name: 'progress',
			component: () => import('../views/ProgressView.vue'),
		},
		{
			path: '/roadmap',
			name: 'roadmap',
			component: () => import('../views/RoadmapView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/privacy',
			name: 'privacy',
			component: () => import('../views/PrivacyView.vue'),
		},
	],

	/* `main.app-main` is the scroller, not the window, so returning a position would
	   do nothing. Path-only: query changes are tab links and the share-query cleanup. */
	scrollBehavior(to, from) {
		if (to.path === from.path)
			return false

		document.querySelector('.app-main')?.scrollTo({ top: 0 })

		return false
	},
})

export default router
