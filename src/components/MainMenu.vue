<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { scriptList } from '@/scripts/scripts'
import { useAuth } from '@/composables/useAuth'

const collapsed = ref(true)
const route = useRoute()
const { user, loginWithDiscord, logout } = useAuth()
</script>

<template>
	<aside :class="{ collapsed }">
		<button class="toggle-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
			<span class="toggle-icon">{{ collapsed ? '›' : '‹' }}</span>
		</button>

		<nav>
			<RouterLink to="/"
				class="nav-item"
				:class="{ active: route.name === 'home' }"
				title="Home">
				<span class="script-name">Home</span>
				<span class="script-abbr" aria-hidden="true">⌂</span>
			</RouterLink>

			<div class="nav-divider"></div>

			<RouterLink
				v-for="script in scriptList.filter(s => !s.comingSoon)"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="nav-item"
				:class="{ active: route.params.id === script.id }"
				:title="script.name"
			>
				<span class="script-name">{{ script.name }}</span>
				<span class="script-native" :lang="script.id">{{ script.nativeName }}</span>
				<span class="script-abbr" :lang="script.id" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
			</RouterLink>

			<div class="nav-divider"></div>

			<div
				v-for="script in scriptList.filter(s => s.comingSoon)"
				:key="script.id"
				class="nav-item coming-soon"
				:title="`${script.name} — coming soon`"
			>
				<span class="script-name">{{ script.name }}</span>
				<span class="script-native" :lang="script.id">{{ script.nativeName }}</span>
				<span class="script-abbr" :lang="script.id" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
			</div>

			<div class="nav-divider"></div>

			<RouterLink to="/about"
				class="nav-item"
				:class="{ active: route.name === 'about' }"
				title="About">
				<span class="script-name">About</span>
				<span class="script-abbr" aria-hidden="true">?</span>
			</RouterLink>

		</nav>

		<div class="user-section">
			<button
				v-if="!user"
				class="nav-item nav-btn"
				title="Login with Discord"
				@click="loginWithDiscord"
			>
				<span class="script-name">Login with Discord</span>
				<span class="script-abbr" aria-hidden="true">👤</span>
			</button>
			<button
				v-else
				class="nav-item nav-btn user-item"
				:title="`Logged in as ${user.user_metadata.full_name ?? user.email} — click to log out`"
				@click="logout"
			>
				<img
					v-if="user.user_metadata.avatar_url"
					:src="user.user_metadata.avatar_url"
					class="user-avatar"
					alt="User avatar"
				>
				<span class="script-name user-name">{{ user.user_metadata.full_name ?? user.email }}</span>
				<span class="script-abbr" aria-hidden="true">⏻</span>
			</button>
		</div>
	</aside>
</template>

<style scoped>
aside {
	width: var(--sidebar-width);
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	background: var(--c-cell);
	border-right: 1px solid var(--c-border);
	transition: width 0.2s ease;
	overflow: hidden;
	position: relative;
}

aside.collapsed {
	width: var(--sidebar-collapsed-width);
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
	border-bottom: 1px solid var(--c-border);
	color: var(--c-label);
	font-size: 18px;
	transition: background 0.15s;
}

.toggle-btn:hover {
	background: var(--c-alt);
}

.toggle-icon {
	line-height: 1;
	font-style: normal;
}

nav {
	display: flex;
	flex-direction: column;
	padding: 8px 0;
	overflow-y: auto;
	flex: 1;
}

.nav-divider {
	height: 1px;
	background: var(--c-border);
	margin: 4px 0;
}

.nav-item {
	display: flex;
	flex-direction: column;
	padding: 10px 14px;
	text-decoration: none;
	color: var(--c-label);
	border-left: 3px solid transparent;
	transition: background 0.15s, border-color 0.15s;
	gap: 2px;
	overflow: hidden;
}

.nav-item:hover {
	background: var(--c-alt);
}

.nav-item.active {
	background: var(--c-alt);
	border-left-color: var(--c-accent);
	color: var(--c-head);
}

.nav-item.coming-soon {
	opacity: 0.4;
	cursor: default;
}

.script-name,
.script-native {
	white-space: nowrap;
}

.script-name {
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.01em;
}

.script-native {
	font-size: 15px;
	color: var(--c-accent);
	line-height: 1.3;
}

.nav-item.active .script-native {
	color: var(--c-accent);
}

.script-abbr {
	display: none;
	font-size: 17px;
	color: var(--c-accent);
	line-height: 1;
}

.collapsed .script-name,
.collapsed .script-native {
	display: none;
}

.collapsed .script-abbr {
	display: block;
}

.collapsed .nav-item {
	align-items: center;
	padding: 10px 0;
}

.user-section {
	flex-shrink: 0;
	border-top: 1px solid var(--c-border);
}

.nav-btn {
	border: none;
	background: none;
	cursor: pointer;
	width: 100%;
	text-align: left;
	font: inherit;
}

.user-item {
	flex-direction: row;
	align-items: center;
	gap: 8px;
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
</style>
