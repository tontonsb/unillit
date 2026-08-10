<script setup lang="ts">
const version = __APP_VERSION__
</script>

<template>
	<article class="prose">
		<Markdown>
			# About Unillit <span class="version">v{{ version }}</span>

			## The goal of the project

			Most of the other resources are focused on the whole language: reading correctly, pronouncing, understanding.
			Learning the script is treated as a part of a bigger journey.

			But if you're looking at a map or at a sign while travelling or playing GeoGuessr?
			You only need
			to parse the characters and make some sense of them.

			The idea here is to arrange the characters for recognition --- to group them by visual traits and
			order them by similarity rather than alphabetic order, meaning, role or pronunciation.
			You can look at a sign, take the sheet and quickly look up the characters you see on the sign.

			Of course, each script has its quirks so we also need some reading tips, but those will be kept
			to minimum here and strongly focused on transliterating.

			To provide you with the "road signs", there is a quiz panel put side-by-side with the info sheets so you
			can practice it all in one place. And once you feel like you start to remember the shapes, you can
			switch the info panel to None and test yourself.

			## Changelog

			I sometimes bump the version on bugfixes (and sometimes don't), but those won't appear here, that's why
			you may notice skipped versions.
		</Markdown>

		<dl class="changelog">
			<dt>1.0.2</dt>
			<dd>
				This is a large under-the-hood update that should have very few noticable effects.
				<ul>
					<li>Switching to stats no longer resets the quiz run</li>
					<li>Changing settings still has to reset it, but you get a warning that it will happen</li>
					<li>Some accessibility and performance improvements have also landed</li>
					<li>We have a custom favicon now, inspired by u, μ and ч</li>
					<li>Fonts are now locally hosted, no more requests to Google Fonts so a bit more privacy to you</li>
				</ul>
			</dd>

			<dt>1.0</dt>
			<dd>
				The project seems stable enough to pin v1 now.
				<ul>
					<li>Another design polish, mainly menus</li>
				</ul>
			</dd>

			<dt>0.7.2</dt>
			<dd>
				<ul>
					<li>Improve typography & color branding</li>
					<li>Redesign Thai Alphabet (consonant listing)</li>
				</ul>
			</dd>

			<dt>0.7.1</dt>
			<dd>
				<ul>
					<li>Sketch some cyrillic quizzes</li>
				</ul>
			</dd>

			<dt>0.7</dt>
			<dd>
				<ul>
					<li>Add beta Cyrillic section</li>
				</ul>
			</dd>

			<dt>0.6.2</dt>
			<dd>
				<ul>
					<li>Script view with specific tabs is now linkable</li>
					<li>You can copy your quiz result to share it</li>
				</ul>
			</dd>

			<dt>0.6</dt>
			<dd>
				<ul>
					<li>Increase sizes on Thai Alphabet, homogenize styles, centralize sheet styles</li>
					<li>Describe Thai typogaphy quirks</li>
					<li>Review Thai quiz explanations — describe key observables and overlapping transliterations with similar chars</li>
					<li>Regroup some Thai chars after reviewing multiple fonts</li>
					<li>Added some vowel questions to quizzes</li>
				</ul>
			</dd>

			<dt>0.5.2</dt>
			<dd>
				<ul>
					<li>Redesign: fixed contrast issues, made colors more fun, improved style consistency across pages</li>
					<li>Privacy page</li>
				</ul>
			</dd>

			<dt>0.5</dt>
			<dd>
				<ul>
					<li><em>Revision</em> sampling mode for quizzes — increased probability for unseen/missed questions</li>
					<li>Rework/extend history page into progress page</li>
					<li>A roadmap page</li>
				</ul>
			</dd>

			<dt>0.4</dt>
			<dd>
				<ul>
					<li>Swap mode & dataset hierarchy for quizzes</li>
					<li>Question set of prefixed Thai provinces</li>
					<li>You can choose the consonant that Thai vowels are displayed with</li>
					<li>Improve scaling/responsiveness (this should become better on large screens and at least somewhat usable on mobile)</li>
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

		<Markdown>
			## Errors and feedback

			I'm just learning most of these scripts myself by reading wikipedia, docs and resources curated by
			the GeoGuessr community as well as consulting with AI chat bots. And practicing on this site.

			If you see something wrong on this site, let me know.

			- Github: [Unillit project](https://github.com/tontonsb/unillit)
			- Discord: Džuris (@tontonsb)

			## Privacy

			See the <RouterLink to="/privacy">privacy page</RouterLink> to
			know what data and when we're gathering.
		</Markdown>
	</article>
</template>

<style scoped>
.version {
	font-size: var(--fs-prose);
	font-weight: 400;
	color: var(--c-muted);
	vertical-align: middle;
}

.changelog {
	display: flex;
	flex-direction: column;
	gap: var(--sp-12);
	margin: var(--sp-12) 0 var(--sp-16);
}

.changelog dt {
	font-size: var(--fs-12-8);
	font-weight: 600;
	color: var(--c-muted);
	letter-spacing: var(--tracking-wide);
	margin-bottom: 0.2rem;
}

.changelog dd {
	margin: 0;
}

.changelog ul {
	margin: 0;
	padding-left: var(--sp-20);
}
</style>
