/**
 * Every webfont the app ships. A picker font added to
 * src/scripts/{cyrillic,thai}/font.ts needs its import added here too.
 *
 * `wght` rather than the `standard`/`wdth` entrypoints: those carry a width axis
 * this design never varies.
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
