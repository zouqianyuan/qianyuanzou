# Copilot Instructions for Personal Academic Website

## Project Overview
Single-file HTML academic portfolio site for Qianyuan Zou (HCI/XR researcher). Deployed on GitHub Pages with embedded CSS, JavaScript, and responsive design. All content, styling, and interactivity are in `qianyuan_zou_homepage_draft (2).html`.

## Architecture & Key Patterns

### HTML Structure (Semantic Layout)
- **Navigation bar** (`nav-wrap`, `nav`): Sticky header with brand and links. Add scroll-detection class `scrolled` dynamically.
- **Hero section** (`hero` container): Grid layout (1.2fr/0.8fr columns) with copy, portrait placeholder, and metadata.
- **Content sections** (repeated pattern): Eyebrow label → title → intro text → card/project/publication grid
- **Featured sections**: Research Highlights (3-card grid), Projects (full-width cards), Publications (list), Photography (4-column gallery), Contact (2-column card)

### CSS Architecture (CSS Variables & Mobile-First)
- **Root variables** set in `:root`: colors (`--bg`, `--accent`, `--text`, `--muted`), spacing (`--max-width`, `--radius`), effects (`--shadow`)
- **Layout pattern**: `.container` + `width: min(var(--max-width), calc(100% - 32px))` for responsive max-width
- **Card hover effect**: Subtle `translateY(-4px)` + border color change
- **Responsive breakpoints**: `@media (max-width: 1024px)` (2-col → 1-col grids), `@media (max-width: 720px)` (mobile adjustments)
- **Animation**: `.reveal` / `.reveal.visible` for scroll-triggered fade-in (via Intersection Observer)

### JavaScript Interactivity
1. **Particle canvas** (`particle-canvas`): Full-screen animated background with 110 particles, mouse-tracking pointer field, inter-particle connections
2. **Scroll detection** (`navWrap`): Add/remove `scrolled` class based on `scrollY > 12px`
3. **Lazy reveal** (`revealObserver`): IntersectionObserver triggers `.reveal.visible` at 16% threshold
4. **Footer year** (`#year`): Auto-populated with current year via `new Date().getFullYear()`

### Image Handling Pattern
- Images stored in `images/` folder (e.g., `portrait.jpg`, `project-vr-sketching.jpg`, `photo-1.jpg`)
- **Fallback pattern**: `onerror="this.style.display='none'"` hides broken images instead of showing broken links
- **Placeholder labels**: Project images have overlay text `.placeholder-label` (e.g., "Project Image", photo data-labels)

## Content Update Workflow

### Adding Content
1. **Projects**: Add new `.project-card` in `#selected-projects`. Copy section includes title, description, tag row, link.
2. **Publications**: Add `.pub-item` with year and metadata in `#publications-preview`. Keep full list on dedicated `publications.html`.
3. **Gallery photos**: Add `.gallery-item` with `data-label="Label"` in `#photography-preview`.
4. **Research highlights**: Add `.card` with h3, description, tag row in `.grid-3`.

### Image Naming & Path Convention
- Place all images in `images/` folder at workspace root
- Naming: descriptive kebab-case (e.g., `project-vr-sketching.jpg`, `photo-city-01.jpg`)
- Portrait: `images/portrait.jpg` (referenced in hero section placeholder)

## Key Implementation Details

### Custom Properties (CSS Variables)
- Update colors in `:root` block (lines ~13-23) for site-wide theme changes
- `--accent` (#79a8ff) appears in nav underlines, tags, links, particle connections
- `--muted` (#a8b0ba) used for secondary text (descriptions, metadata)

### Particle Animation Algorithm
- Particles have `depth` (0.35-1.25) affecting size, velocity, alpha
- Mouse pointer creates radial velocity field within 320px radius
- Particles wrap at viewport edges; connections drawn between particles < 185px apart
- DPR scaling: uses `Math.min(window.devicePixelRatio, 2)` for high-density displays

### Responsive Breakpoints & Grid Adjustments
- **Desktop (>1024px)**: Hero 1.2fr/0.8fr, projects 2-col layout, gallery 4-col, contact 1.15fr/0.85fr
- **Tablet (1024px and below)**: All grids → single column, nav flex-direction switches
- **Mobile (<720px)**: Publication items stack, nav becomes vertical, hero scales with `clamp()`

## Common Tasks

### Modify Colors
Edit `:root` CSS variables (lines ~13-23). Example: change `--accent: #79a8ff;` to your brand color—updates nav underlines, accents, particle connections automatically.

### Add a New Section
Copy an existing section template (e.g., research highlights) and adjust `.grid-3` or `.project-stack` grid. Remember to add a new element to the sticky nav if creating a new anchor.

### Update Links
Replace placeholder `href="about.html"`, `href="publications.html"` with actual page URLs. Ensure nav links match section IDs for smooth scroll (`#contact`, `#research-highlights`, `#selected-projects`).

### Fix Broken Images
Images with `onerror="this.style.display='none'"` will silently hide if not found. Check `images/` folder for correct filenames (case-sensitive on GitHub Pages).

### Customize Animations
- Scroll fade-in threshold: Modify `.reveal` observer `threshold: 0.16` (line ~1040) to `0.08` for earlier trigger
- Particle behavior: Adjust `particleCount` (line ~1022), `makeParticle()` velocity multiplier `0.22 * depth`, or connection distance `185`

## Cross-Component Communication
- No external dependencies or APIs. All interactivity is client-side via canvas and DOM manipulation.
- Year auto-update: Footer listens to document load, no external service needed.
- Navigation state: Scroll event listener on window updates nav styling without page state library.

## Build & Deployment
- **No build step**: HTML file is directly deployable to GitHub Pages.
- **Filename convention**: Keep filename as-is or rename entire file and update nav links accordingly.
- Deployed via GitHub Pages (mentioned in footer: "Built for GitHub Pages").

## Testing & Validation Notes
- **High DPR displays**: Particle canvas uses DPR scaling; test on 2x/3x displays for visual clarity.
- **Mobile viewports**: Test nav stack, grid collapse, image loading at 375px, 768px, 1024px widths.
- **Accessibility**: Navigation links are proper anchor tags; add `aria-label` to icons if buttons are added.
