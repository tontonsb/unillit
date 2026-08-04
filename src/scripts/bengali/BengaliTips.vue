<template>
	<div class="sheet">
		<div class="section">
			<div class="section-title">Reading tips for place names</div>
			<div class="tips-grid">
				<div class="tip">
					<strong>Inherent vowel</strong><br>
					Every consonant has an inherent <em>o</em> (Bengali realises Sanskrit <em>a</em> as <em>o</em>). At word-end it is often silent: ঢাকা → Dhaka, not Dhakao.
				</div>
				<div class="tip">
					<strong>Aspirated stops</strong><br>
					<em>kh gh ch jh ṭh ḍh th dh ph bh</em> are single consonants with a puff of air — not two-letter clusters as in English.
				</div>
				<div class="tip">
					<strong>Conjuncts</strong><br>
					Two consonants without a vowel between them form a conjunct ligature, often unrecognisable from its parts. Common in place names: ক্ষ (kṣ/kh), জ্ঞ (gñ/gg).
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.sheet { padding: 10px; font-size: 11px; }
.section { border: 1px solid var(--c-border); border-radius: 4px; overflow: hidden; }
.section-title { background: var(--c-head); color: #fff; font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 7px; }
.tips-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; padding: 6px 8px; font-size: 9px; line-height: 1.6; color: var(--c-label); }
.tip { padding: 4px 6px; }
.tip strong { display: block; color: var(--c-head); margin-bottom: 2px; }
</style>
