<template>
	<article class="prose">
		<h1>Privacy</h1>

		<p>
			We collect as little as possible, i.e. only what's needed to track
			the learning progress and only if you opt in.
		</p>

		<h2>What do we collect?</h2>

		<p>
			Nothing until you log in. Browse the sheets and do quizzes
			anonymously and we will store nothing.
		</p>

		<p>
			Your quiz preferences (sampling mode, preferred quiz mode) are kept
			locally in your own browser and never leave it.
		</p>

		<p>
			If you log in with Discord, the site stores:
		</p>

		<ul>
			<li>
				Your Discord account basics: account id, username, avatar and
				email address, shared by Discord when you authorise the login.
				These identify your account and show your name and avatar in the
				menu.
			</li>
			<li>
				Your quiz activity. For each answer and each run: the question,
				whether you got it right, the number of typos, and the settings
				in effect (quiz type, font, which info sheet was open, the
				allowed-errors tolerance), with timestamps. This is used to
				provide accuracy stats, run history and the revision mode.
			</li>
		</ul>

		<h2>Where is it stored?</h2>

		<p>
			Account and quiz data are stored in <a href="https://supabase.com">Supabase</a>.
			Your login session is kept in your browser's local storage so you
			stay signed in.
		</p>

		<h2>Third parties</h2>

		<ul>
			<li><strong>Discord</strong> — used for logging in.</li>
			<li><strong>Supabase</strong> — stores the data described above.</li>
			<li>
				<strong>Google Fonts</strong> — the typefaces are loaded from
				Google, so opening a page sends a request to Google servers
				which may see your IP address and other request headers as
				part of fetching the fonts.
			</li>
		</ul>

		<p>There are no marketing analytics, no ads, no behaviour data gathering.</p>

		<h2>Your control</h2>

		<p>
			Use the site logged out and nothing is stored about you. If you've
			logged in and want your account and stats deleted, contact me via
			the channels on the <RouterLink to="/about">About</RouterLink> page
			and I'll remove them.
		</p>
	</article>
</template>

<style scoped>
article {
	max-width: 640px;
}
</style>
