<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sortedScriptList, scriptStatus } from '@/scripts/scripts'
import { useAuth } from '@/composables/useAuth'
import BetaBadge from '@/components/BetaBadge.vue'

const collapsed = ref(true)
const route = useRoute()
const { user, loginWithDiscord, logout } = useAuth()

// Windows Chrome renders a ~15px scrollbar; it eats enough of the collapsed
// sidebar to make the buttons awkward. Measure whatever the scrollbar actually
// takes and widen the sidebar by that much, but only while nav overflows.
const nav = useTemplateRef<HTMLElement>('nav')
const scrollbarWidth = ref(0)

function measure() {
	const el = nav.value
	if (!el) return

	scrollbarWidth.value = el.offsetWidth - el.clientWidth
}

let observer: ResizeObserver | undefined

onMounted(() => {
	observer = new ResizeObserver(measure)
	if (nav.value) observer.observe(nav.value)
	measure()
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<aside :class="{ collapsed }" :style="{ '--scrollbar-width': `${scrollbarWidth}px` }">
		<button class="toggle-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
			<span class="toggle-icon">{{ collapsed ? '›' : '‹' }}</span>
		</button>

		<nav ref="nav">
			<RouterLink to="/"
				class="nav-item"
				:class="{ active: route.name === 'home' }"
				title="Home">
				<span class="item-label">Home</span>
				<span class="item-abbr" aria-hidden="true">⌂</span>
			</RouterLink>

			<div class="nav-divider"></div>

			<RouterLink
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) !== 'coming')"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="nav-item"
				:class="{ active: route.params.id === script.id, beta: scriptStatus(script) === 'beta' }"
				:title="scriptStatus(script) === 'beta' ? `${script.name} — beta` : script.name"
			>
				<span class="item-label">
					{{ script.name }}
					<BetaBadge v-if="scriptStatus(script) === 'beta'" />
				</span>
				<span class="item-native" :lang="script.id">{{ script.nativeName }}</span>
				<span class="item-abbr" :lang="script.id" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
			</RouterLink>

			<div class="nav-divider"></div>

			<div
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) === 'coming')"
				:key="script.id"
				class="nav-item coming-soon"
				:title="`${script.name} — coming soon`"
			>
				<span class="item-label">{{ script.name }}</span>
				<span class="item-native" :lang="script.id">{{ script.nativeName }}</span>
				<span class="item-abbr" :lang="script.id" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
			</div>

			<div class="nav-divider"></div>

			<RouterLink to="/about"
				class="nav-item"
				:class="{ active: route.name === 'about' }"
				title="About">
				<span class="item-label">About</span>
				<span class="item-abbr" aria-hidden="true">?</span>
			</RouterLink>

			<RouterLink to="/roadmap"
				class="nav-item push-end"
				:class="{ active: route.name === 'roadmap' }"
				title="Roadmap">
				<span class="item-label">Roadmap</span>
				<span class="item-abbr" aria-hidden="true">🗺️</span>
			</RouterLink>

			<RouterLink to="/progress"
				class="nav-item"
				:class="{ active: route.name === 'progress' }"
				title="Progress">
				<span class="item-label">Progress</span>
				<span class="item-abbr" aria-hidden="true">◷</span>
			</RouterLink>

			<div class="user-section">
				<template v-if="!user">
					<button
						class="nav-item nav-btn"
						title="Login with Discord"
						@click="collapsed ? (collapsed = false) : loginWithDiscord()"
					>
						<span class="item-label">Login with Discord</span>
						<span class="item-abbr" aria-hidden="true">👤</span>
					</button>
				</template>
				<template v-else>
					<button
						v-if="collapsed"
						class="nav-item nav-btn user-item"
						:title="user.user_metadata.full_name ?? user.email"
						@click="collapsed = false"
					>
						<img
							v-if="user.user_metadata.avatar_url"
							:src="user.user_metadata.avatar_url"
							class="user-avatar"
							alt="User avatar"
						>
					</button>
					<template v-else>
						<div class="nav-item user-item">
							<img
								v-if="user.user_metadata.avatar_url"
								:src="user.user_metadata.avatar_url"
								class="user-avatar"
								alt="User avatar"
							>
							<span class="user-name">{{ user.user_metadata.full_name ?? user.email }}</span>
						</div>
						<button class="nav-item nav-btn" title="Log out" @click="logout">
							<span class="item-label">Logout</span>
						</button>
					</template>
				</template>
			</div>
		</nav>
	</aside>
</template>

<style scoped>
aside {
	width: calc(var(--sidebar-width) + var(--scrollbar-width, 0px));
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	background: var(--c-cell);
	border-right: var(--hairline);
	transition: width 0.2s ease;
	overflow: hidden;
	position: relative;
}

aside.collapsed {
	width: calc(var(--sidebar-collapsed-width) + var(--scrollbar-width, 0px));
}

.toggle-btn {
	flex-shrink: 0;
	height: 36px;
	width: 100%;
	border: none;
	background: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: var(--hairline);
	color: var(--c-label);
	font-size: var(--fs-18);
	transition: background 0.15s;
}

.toggle-btn:hover {
	background: var(--c-alt);
}

.toggle-btn:focus-visible {
	outline-offset: -2px;
}

.toggle-icon {
	line-height: 1;
	font-style: normal;
}

nav {
	display: flex;
	flex-direction: column;
	padding: var(--sp-8) 0;
	overflow-y: auto;
	scrollbar-width: thin;
	flex: 1;
	min-height: 0;
}

.nav-divider {
	height: 1px;
	flex-shrink: 0;
	background: var(--c-border);
	margin: var(--sp-4) var(--sp-10);
}

.nav-item {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	padding: var(--sp-8) var(--sp-10);
	margin-block: 1px;
	margin-inline: var(--sp-6);
	border-radius: var(--radius);
	text-decoration: none;
	color: var(--c-label);
	transition: background 0.15s, color 0.15s;
	gap: var(--sp-2);
	overflow: hidden;
}

.nav-item:hover {
	background: var(--c-alt);
}

.nav-item.active {
	background: var(--c-sign);
	color: var(--c-on-sign);
	margin-left: 0;
	border-radius: 0 var(--radius) var(--radius) 0;
}

.nav-item.coming-soon {
	opacity: 0.4;
	cursor: default;
}

.nav-item.coming-soon:hover {
	background: none;
}

.nav-item.beta {
	opacity: 0.75;
}

.nav-item.beta:hover,
.nav-item.beta.active {
	opacity: 1;
}

.collapsed .beta-badge {
	display: none;
}

.nav-item.active .beta-badge {
	color: var(--c-on-sign);
	border-color: var(--c-border-plate);
}

.item-label,
.item-native {
	white-space: nowrap;
}

.item-label {
	font-size: var(--fs-chrome);
	font-weight: 600;
	letter-spacing: 0.01em;
}

.item-native {
	font-size: var(--fs-15);
	color: var(--c-sign);
	line-height: 1.3;
}

.item-abbr {
	display: none;
	font-size: var(--fs-17);
	color: var(--c-sign);
	line-height: 1;
}

.collapsed .item-label,
.collapsed .item-native {
	display: none;
}

.collapsed .item-abbr {
	display: block;
}

.nav-item.active .item-native,
.nav-item.active .item-abbr {
	color: var(--c-on-sign);
}

.collapsed .nav-item {
	align-items: center;
	padding: var(--sp-8) 0;
	margin-inline: var(--sp-4);
}

.collapsed .nav-item.active {
	margin-left: var(--sp-4);
	border-radius: var(--radius);
}

.user-section {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
}

.push-end {
	margin-top: auto;
}

.user-section::before {
	content: '';
	display: block;
	height: 1px;
	background: var(--c-border);
	margin: var(--sp-4) var(--sp-10);
}

.nav-btn {
	border: none;
	background: none;
	cursor: pointer;
	text-align: left;
	font: inherit;
}

.user-item {
	flex-direction: row;
	align-items: center;
	gap: var(--sp-8);
}

.user-avatar {
	width: 22px;
	height: 22px;
	border-radius: 50%;
	flex-shrink: 0;
}

.user-name {
	overflow: hidden;
	text-overflow: ellipsis;
}

.collapsed .user-avatar {
	width: 20px;
	height: 20px;
}

.collapsed .user-item {
	justify-content: center;
}
</style>
