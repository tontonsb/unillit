<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sortedScriptList, scriptStatus } from '@/scripts/scripts'
import { useAuth } from '@/composables/useAuth'
import { collapsed } from '@/composables/useMenuPrefs'
import BetaBadge from '@/components/BetaBadge.vue'
import BrandMark from '@/components/BrandMark.vue'

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
				<BrandMark class="item-abbr" />
			</RouterLink>

			<div class="nav-divider"></div>

			<RouterLink
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) !== 'coming')"
				:key="script.id"
				:to="`/scripts/${script.id}`"
				class="nav-item script-item"
				:class="{ active: route.params.id === script.id, beta: scriptStatus(script) === 'beta' }"
				:style="{ '--label-scale': script.labelScale ?? 1 }"
				:title="scriptStatus(script) === 'beta' ? `${script.name} — beta` : script.name"
			>
				<span class="item-label">{{ script.name }}</span>
				<BetaBadge v-if="scriptStatus(script) === 'beta'" />
				<span class="item-native" :lang="script.lang">{{ script.nativeName }}</span>
				<span class="item-abbr" :lang="script.lang" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
			</RouterLink>

			<div class="nav-divider"></div>

			<div
				v-for="script in sortedScriptList.filter(s => scriptStatus(s) === 'coming')"
				:key="script.id"
				class="nav-item script-item coming-soon"
				:style="{ '--label-scale': script.labelScale ?? 1 }"
				:title="`${script.name} — not published yet`"
			>
				<span class="item-label">{{ script.name }}</span>
				<span class="item-native" :lang="script.lang">{{ script.nativeName }}</span>
				<span class="item-abbr" :lang="script.lang" aria-hidden="true">{{ script.abbr ?? script.nativeName[0] }}</span>
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
				<div class="nav-divider"></div>

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
	--sidebar-width: 200px;
	--sidebar-collapsed-width: 40px;

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
	height: var(--h-chrome-row);
	width: 100%;
	border: none;
	background: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: var(--hairline);
	color: var(--c-label);
	font-family: inherit;
	font-size: var(--fs-display);
	transition: background var(--dur);
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

/* Fixed to the destination width and deliberately not transitioned: the aside animates
   its width, and a nav that animated with it would re-wrap every row on every frame. */
nav {
	display: flex;
	flex-direction: column;
	width: calc(var(--sidebar-width) + var(--scrollbar-width, 0px));
	padding: var(--sp-8) 0;
	overflow-y: auto;
	scrollbar-width: thin;
	flex: 1;
	min-height: 0;
}

.collapsed nav {
	width: calc(var(--sidebar-collapsed-width) + var(--scrollbar-width, 0px));
}

.nav-divider {
	flex-shrink: 0;
	border-top: var(--hairline);
	margin: var(--sp-4) var(--sp-10);
}

.nav-item {
	display: flex;
	align-items: baseline;
	flex-shrink: 0;
	padding: var(--sp-8) var(--sp-10);
	margin-inline: var(--sp-6);
	border-radius: var(--radius);
	text-decoration: none;
	font-size: var(--fs-chrome);
	color: var(--c-label);
	transition: background var(--dur), color var(--dur);

	/* name and specimen share a baseline; only the beta badge ever needs the second
	   line, and it lands where the index card puts it */
	flex-wrap: wrap;
	gap: var(--sp-4) var(--sp-8);
	overflow: hidden;
}

.nav-item:hover {
	background: var(--c-alt);
}

/* the plate bleeds to the sidebar edge, so the margin it drops is added back as padding
   — otherwise selecting a row shifts its own text 6px left */
.nav-item.active {
	background: var(--c-sign);
	color: var(--c-on-sign);
	margin-left: 0;
	padding-left: calc(var(--sp-10) + var(--sp-6));
	border-radius: 0 var(--radius) var(--radius) 0;
}

.nav-item.coming-soon {
	opacity: var(--o-inert);
	cursor: default;
}

.nav-item.coming-soon:hover {
	background: none;
}

.collapsed .beta-badge {
	display: none;
}

/* the badge is a plate sitting on the nav plate — an outline is what separates them */
.nav-item.active .beta-badge {
	border-color: var(--c-border-plate);
}

.item-label,
.item-native {
	white-space: nowrap;
}

.item-label {
	font-weight: 600;
}

/* A script is named the way the index cards and the panel header name it: editorial
   face, brand green, specimen set opposite on the same baseline. The utility rows stay
   sans and inked, so the column says which five items are apparatus. */
.script-item .item-label {
	font-family: var(--serif);
	color: var(--c-accent);
}

.item-native {
	margin-left: auto;
	font-size: calc(1em * var(--label-scale, 1));
	color: var(--c-head);

	/* line height in px so the native font can be scaled optically without scaling the line */
	line-height: calc(var(--fs-chrome) * var(--lh-tight));
}

.item-abbr {
	display: none;
	font-size: calc(var(--fs-headline) * var(--label-scale, 1));
	color: var(--c-sign);
	line-height: var(--fs-headline);
}

.collapsed .item-label,
.collapsed .item-native {
	display: none;
}

.collapsed .item-abbr {
	display: block;
}

/* the ground lifts and the name deepens together, so it holds its contrast through the
   change instead of fading into the hover fill */
.script-item:hover .item-label {
	color: var(--c-sign);
}

/* Beta only loses its greens; unwritten also loses the specimen and dims as one row.
   Both stay below the hover rule, so a beta name is inert on hover as on the card, and
   above the active rule — Faded Ink on the plate is invisible. */
.script-item:is(.beta, .coming-soon) :is(.item-label, .item-abbr) {
	color: var(--c-muted);
}

.coming-soon .item-native {
	color: var(--c-muted);
}

.nav-item.active :is(.item-label, .item-native, .item-abbr) {
	color: var(--c-on-sign);
}

.collapsed .nav-item {
	align-items: center;
	justify-content: center;
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

.nav-btn {
	border: none;
	background: none;
	cursor: pointer;
	text-align: left;
	font-family: inherit;
	line-height: inherit;
}

.user-item {
	flex-direction: row;
	align-items: center;
	gap: var(--sp-8);
}

.user-avatar {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	flex-shrink: 0;
}

.user-name {
	overflow: hidden;
	text-overflow: ellipsis;
}

.collapsed .user-item {
	justify-content: center;
}
</style>
