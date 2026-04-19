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
			path: '/history',
			name: 'history',
			component: () => import('../views/HistoryView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
	],
})

export default router
