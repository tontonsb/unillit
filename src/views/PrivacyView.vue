<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<article class="prose">
		<Markdown>
			# Privacy

			We collect as little as possible, i.e. only what's needed to track
			the learning progress and only if you opt in.

			## What do we collect?

			Nothing until you log in. Browse the sheets and do quizzes
			anonymously and we will store nothing.

			Your quiz preferences (sampling mode, preferred quiz mode) are kept
			locally in your own browser and never leave it.

			If you log in with Discord, the site stores:

			- Your Discord account basics: account id, username, avatar and
			  email address, shared by Discord when you authorise the login.
			  These identify your account and show your name and avatar in the
			  menu.
			- Your quiz activity. For each answer and each run: the question,
			  whether you got it right, the number of typos, and the settings
			  in effect (quiz type, font, which info sheet was open, the
			  allowed-errors tolerance), with timestamps. This is used to
			  provide accuracy stats, run history and the revision mode.

			## Where is it stored?

			Account and quiz data are stored in [Supabase](https://supabase.com).
			Your login session is kept in your browser's local storage so you
			stay signed in.

			## Third parties

			- **Discord** --- used for logging in.
			- **Supabase** --- stores the data described above.
			- **GitHub** --- the site is hosted on GitHub Pages.
			  According to <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection" target="_blank" rel="noopener noreferrer">them</a>:

			  > When a GitHub Pages site is visited, the visitor's IP address is logged and stored for security purposes [..]

			There are no marketing analytics, no ads, no behaviour data gathering.

			## Your control

			Use the site logged out and nothing is stored about you. If you've
			logged in and want your account and stats deleted, contact me via
			the channels on the <RouterLink to="/about">About</RouterLink> page
			and I'll remove them.
		</Markdown>
	</article>
</template>
