/**
 * Every webfont the app ships, self-hosted via Fontsource (same files Google
 * serves, same unicode-range subsetting, no third-party request at runtime).
 *
 * Imported for side effects only — each module is a stylesheet of @font-face
 * rules. Subsets stay unicode-range gated, so listing a family here costs the
 * visitor nothing until a glyph that needs it is actually rendered.
 *
 * `wght` is the variable axis; the `standard`/`wdth` entrypoints ship a second
 * axis this design never varies, so they are deliberately not used.
 *
 * The picker families mirror src/scripts/{cyrillic,thai}/font.ts — a font added
 * there needs its import added here too.
 */

// UI — needed on every route
import '@fontsource-variable/noto-sans/wght.css'                // --sans
import '@fontsource-variable/lora/wght.css'                     // --serif
import '@fontsource-variable/lora/wght-italic.css'

// Cyrillic
import '@fontsource-variable/noto-serif/wght.css'               // --font-cyrillic
import '@fontsource-variable/noto-serif/wght-italic.css'
import '@fontsource-variable/ysabeau/wght.css'
import '@fontsource-variable/ysabeau/wght-italic.css'
import '@fontsource/spectral/400.css'
import '@fontsource/spectral/700.css'
import '@fontsource/pacifico/400.css'
import '@fontsource/great-vibes/400.css'

// Thai
import '@fontsource-variable/noto-sans-thai/wght.css'           // --font-thai
import '@fontsource-variable/noto-serif-thai/wght.css'
import '@fontsource/trirong/400.css'
import '@fontsource/trirong/600.css'
import '@fontsource/sarabun/400.css'
import '@fontsource/sarabun/600.css'
