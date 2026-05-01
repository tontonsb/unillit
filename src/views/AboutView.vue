<template>
	<article>
		<h1>About</h1>

		<h2>The goal of the project</h2>
		<p>
			Most of the other resources are focused on the whole language: reading correctly, pronouncing, understanding.
			Learning the script is treated as a part of a bigger journey.
		</p>

		<p>
			But if you're looking at a map or at a sign while travelling or playing GeoGuessr?
			You only need
			to parse the characters and make some sense of them.
		</p>

		<p>
			The idea here is to arrange the characters for recognition — to group them by visual traits and
			order them by similarity rather than alphabetic order, meaning, role or pronunciation.
			You can look at a sign, take the sheet and quickly look up the characters you see on the sign.
		</p>

		<p>
			Of course, each script has its quirks so we also need some reading tips, but those will be kept
			to minimum here and strongly focused on transliterating.
		</p>

		<p>
			To provide you with the "road signs", there is a quiz panel put side-by-side with the info sheets so you
			can practice it all in one place. And once you feel like you start to remember the shapes, you can
			switch the info panel to None and test yourself.
		</p>

		<h2>Changelog</h2>

		<dl class="changelog">
			<dt>0.4</dt>
			<dd>
				<ul>
					<li>Question set of prefixed Thai provinces</li>
					<li>You can choose the consonant that Thai vowels are displayed with</li>
					<li>Improve scaling/responsiveness</li>
				</ul>
			</dd>

			<dt>0.3</dt>
			<dd>
				<ul>
					<li>Change answer ordering in stats</li>
					<li>Stats by run for quiz and overall</li>
					<li>Improve logout UI</li>
					<li>Track quiz type, font, info sheet, tolerance and errors for your answers</li>
					<li>Increase font sizes on sheets</li>
				</ul>
			</dd>

			<dt>0.2</dt>
			<dd>
				<ul>
					<li>Login with Discord</li>
					<li>Stats tracking</li>
					<li>Display answer alternatives</li>
					<li>Allow fuzzy answers (configurable tolerance)</li>
					<li>Reviewed Thai quiz contents</li>
					<li>And added this changelog :)</li>
				</ul>
			</dd>

			<dt>0.1</dt>
			<dd>
				<ul>
					<li>Initial release with sheet/quiz view</li>
					<li>Thai info sheets</li>
					<li>Thai quizzes with LLM-generated content</li>
				</ul>
			</dd>
		</dl>

		<h2>Errors and feedback</h2>

		<p>
			I'm just learning most of these scripts myself by reading wikipedia, docs and resources curated by
			the GeoGuessr community as well as consulting with AI chat bots. And practicing on this site.
		</p>

		<p>
			Currently this site is in a beta release.
			The content for Thai quizzes was compiled using AI and has not been entirely proofread yet.
			Same goes for the placeholder content of the other (non-Thai) scripts.
		</p>

		<p>
			If you see something wrong on this site, let me know.
		</p>
		<ul>
			<li>Github: <a href="https://github.com/tontonsb/unillit">Unillit project</a></li>
			<li>Discord: Džuris (@tontonsb)</li>
		</ul>
	</article>
</template>

<style scoped>
article {
	padding: 2rem;
	max-width: 640px;
	margin: 0 auto;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--c-head);
	margin-bottom: 0.25rem;
}

h2 {
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--c-muted);
	margin-top: 1.75rem;
	margin-bottom: 0.5rem;
}

h1 + h2 {
	margin-top: 0;
}

p {
	font-size: 0.9rem;
	line-height: 1.6;
	color: var(--c-label);
	margin-bottom: 0.75rem;
}

ul {
	padding-left: 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

li {
	font-size: 0.9rem;
	line-height: 1.6;
	color: var(--c-label);
}

a {
	color: var(--c-accent);
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

.changelog {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin: 0.75rem 0 1rem;
}

.changelog dt {
	font-size: 0.8rem;
	font-weight: 600;
	color: var(--c-muted);
	letter-spacing: 0.04em;
	margin-bottom: 0.2rem;
}

.changelog dd {
	margin: 0;
}

.changelog ul {
	margin: 0;
	padding-left: 1.25rem;
}
</style>
