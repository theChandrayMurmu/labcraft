# Labcraft 🧪

> **The complete NotebookLM Prompt Studio — craft expert prompts for every feature, instantly.**

Labcraft is a free, open-source prompt generator that covers the full surface area of [Google NotebookLM](https://notebooklm.google.com). Whether you're creating a slide deck, audio overview, infographic, quiz, mind map, or data table — Labcraft builds you a structured, expert-grade prompt that tells NotebookLM exactly what to produce and how.

No more generic one-liner prompts. No more missed details. Just paste and go.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/labcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)

---

## ✨ What Labcraft Does

Labcraft generates optimised, structured prompts for **all 12 NotebookLM Studio features**:

| Feature | What it does |
|---|---|
| 🗂️ **Slide Deck** | Builds presentation prompts with completeness rules, speaker notes, and structure |
| 🎙️ **Audio Overview** | Configures podcast-style AI conversations by tone, length, and host dynamic |
| 🎬 **Video Overview** | Scripts scene-by-scene video prompts with visual direction |
| 🧠 **Mind Map** | Deep concept mapping with cross-links, citations, and contradiction markers |
| 📖 **Study Guide** | Full learning guides with summaries, glossary, quizzes, and essay prompts |
| 📋 **Briefing Doc** | Executive-ready briefings with action items, risks, and recommendations |
| ❓ **FAQ** | Natural-language Q&A from any document for any audience |
| ⏱️ **Timeline** | Chronological event breakdowns with cause/effect and turning points |
| 🃏 **Flashcards** | Spaced-repetition-ready cards with hints and difficulty levels |
| 🧩 **Quiz / Assessment** | Bloom's Taxonomy-spanning assessments with full answer keys |
| 📊 **Infographic** | Visual content briefs with layout, sizing, and style direction |
| 📑 **Data Table** | Structured extraction prompts for Google Sheets-ready tables |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **UI** | React 18 — Client Components |
| **Styling** | CSS Modules + CSS Custom Properties |
| **Fonts** | Google Fonts — Playfair Display, DM Mono, DM Sans |
| **Deployment** | [Vercel](https://vercel.com) (zero-config) |

---

## 🚀 Quick Start

### Prerequisites

Make sure you have **Node.js 18.17 or later** installed. Check with:
```bash
node -v
```
If not installed, download from [nodejs.org](https://nodejs.org).

---

### Option 1 — Deploy to Vercel (recommended, 1 click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/labcraft)

Vercel auto-detects Next.js — no build settings needed. Your site will be live in ~30 seconds.

---

### Option 2 — Run locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/labcraft.git
cd labcraft

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

---

### Option 3 — Build for production locally

```bash
npm run build    # Compile and optimise for production
npm run start    # Start the production server on port 3000
```

---

## 🗂️ Project Structure

```
labcraft/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — metadata, fonts, global CSS
│   │   ├── page.tsx                # Home route — renders LabcraftApp
│   │   └── globals.css             # Global styles: CSS vars, grain overlay, fonts
│   ├── components/
│   │   ├── LabcraftApp.tsx         # Main client component — all UI and state logic
│   │   └── LabcraftApp.module.css  # Scoped CSS module — full dark aesthetic
│   └── data/
│       └── features.ts             # All 12 feature definitions + prompt generators
├── public/                         # Static assets (favicon, og image, etc.)
├── .gitignore
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies and npm scripts
├── tsconfig.json                   # TypeScript configuration
├── vercel.json                     # Vercel deployment config
├── LICENSE
└── README.md
```

### Key files explained

**`src/data/features.ts`**
The single source of truth for all features. Each feature is a fully typed object with:
- `id`, `icon`, `name`, `desc`, `tag` — display metadata
- `fields: Field[]` — typed form field definitions (text, textarea, select, radio, check)
- `gen(v: Record<string, string>)` — pure function that takes form values and returns the prompt string

**`src/components/LabcraftApp.tsx`**
The entire interactive UI as a React client component (`'use client'`). Manages:
- Active feature selection state (`useState`)
- Per-feature form values (`useState`)
- Prompt generation and output
- Clipboard copy with feedback

**`src/components/LabcraftApp.module.css`**
All component-scoped visual styling using CSS Modules. References the design tokens from `globals.css` via CSS custom properties.

**`src/app/globals.css`**
Defines the design system: CSS custom properties, the grain noise texture overlay, keyframe animations, and the Google Fonts import.

**`src/app/layout.tsx`**
Next.js root layout. Sets page `<title>`, meta description, Open Graph tags, and wraps all pages. Edit this file to update SEO metadata.

---

## 🧭 How to Use

1. **Open Labcraft** in your browser
2. **Pick a NotebookLM feature** from the feature grid
3. **Fill in the prompt fields** — topic, audience, detail level, what to include, style preferences
4. **Click "Generate Prompt"**
5. **Copy the prompt** and paste it into NotebookLM's chat panel with your sources uploaded

### Pro Tips

- **Upload all sources first** in NotebookLM before pasting the prompt — the model needs full context
- For **long documents** (50+ pages), set slide/question count to "as many as needed"
- For **Audio/Video Overviews**, use the `Interactive Mode` option to enable the join/Q&A feature
- The **Coverage Checklist** at the end of Slide Deck prompts helps verify nothing was missed
- **Data Tables** work best when you name the exact columns you need in the "Key Columns" field

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:3000` with hot reload |
| `npm run build` | Build the app for production (outputs to `.next/`) |
| `npm run start` | Start the production server (run `build` first) |
| `npm run lint` | Run ESLint across the project |

### Environment Variables

No environment variables required. Labcraft is a fully client-side app — no API keys, no backend, no secrets.

### Node.js Version

Requires **Node.js 18.17+**. Recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage versions:
```bash
nvm install 18
nvm use 18
```

---

## 🎨 Customisation

### Adding a new feature

Open `src/data/features.ts` and add a new object to the `FEATURES` array. No other files need to be touched — the UI renders dynamically from the data.

```typescript
{
  id: 'your_feature_id',       // unique snake_case string
  icon: '🔧',                  // emoji displayed on the feature card
  name: 'Feature Name',        // short display name
  desc: 'Short description',   // subtitle on the card
  tag: 'CATEGORY OUTPUT',      // badge shown on the form panel
  fields: [
    {
      id: 'topic',
      label: 'Document Title',
      type: 'text',
      ph: 'e.g. My Report 2025',   // placeholder text
      req: true                     // marks field as required
    },
    {
      id: 'style',
      label: 'Style',
      type: 'radio',                // single-select pill buttons
      opts: ['Option A', 'Option B', 'Option C'],
      def: 0                        // index of the default selected option
    },
    {
      id: 'include',
      label: 'Include',
      type: 'check',                // multi-select pill buttons
      opts: ['Item X', 'Item Y', 'Item Z'],
      defAll: true                  // pre-select all options by default
    },
    {
      id: 'audience',
      label: 'Audience',
      type: 'select',               // dropdown
      opts: ['General public', 'Experts', 'Students'],
      def: 'General public'         // default selected value (string)
    },
    {
      id: 'extra',
      label: 'Additional Instructions',
      type: 'textarea',
      ph: 'Any extra context…'
    }
  ],
  gen: (v) => `Your prompt for "${v.topic}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Style: ${v.style || 'Default'}
Audience: ${v.audience || 'General public'}
Include: ${v.include || 'All elements'}
${v.extra ? `\nExtra instructions: ${v.extra}` : ''}

Your full prompt body here.`
}
```

**All available field types:**

| Type | UI element | Key properties |
|---|---|---|
| `text` | Single-line input | `ph` (placeholder), `req` (required star) |
| `textarea` | Multi-line input | `ph` (placeholder) |
| `select` | Dropdown | `opts[]`, `def` (default string) |
| `radio` | Single-select pills | `opts[]`, `def` (default index number) |
| `check` | Multi-select pills | `opts[]`, `defAll` (pre-check all) |

---

### Modifying a prompt template

Each feature's `gen(v)` is a pure TypeScript function. `v` is a `Record<string, string>` where keys match field `id`s. Edit the template literal to restructure the prompt:

```typescript
gen: (v) => `Your prompt heading for "${v.topic || '[Your Document]'}"

Section header
${someHelper(v.include, 'fallback value')}

Instruction line using ${v.style || 'default style'}.
${v.extra ? `\nAdditional: ${v.extra}` : ''}`
```

The `L()` helper in `features.ts` converts a comma-separated string into a numbered list — use it for any "include" type fields:
```typescript
// L(value, fallback) → "1. Item\n2. Item\n3. Item"
${L(v.include, 'Finding 1, Finding 2, Finding 3')}
```

---

### Restyling the theme

All design tokens are CSS custom properties in `src/app/globals.css`. Changing them updates every component automatically:

```css
:root {
  --bg: #0d0d0f;        /* Page background */
  --surface: #141416;   /* Card / input backgrounds */
  --surface2: #1c1c20;  /* Secondary surfaces (dropdowns, etc.) */
  --border: #2a2a30;    /* Border colour */
  --accent: #c8f04a;    /* Primary accent — lime green */
  --accent2: #4af0c8;   /* Secondary accent — teal */
  --text: #e8e8ec;      /* Body text colour */
  --muted: #6b6b78;     /* Muted / label text */
  --highlight: #f5f5f0; /* Heading text */
}
```

Component-specific overrides go in `src/components/LabcraftApp.module.css`.

---

### Adding a new page (Next.js App Router)

Create a new route by adding a folder with a `page.tsx` inside `src/app/`:

```
src/app/
├── page.tsx           →  /
├── about/
│   └── page.tsx       →  /about
└── features/
    └── page.tsx       →  /features
```

Shared UI (navbar, footer) can be added to `src/app/layout.tsx`.

---

## 📦 Deployment

### Vercel (recommended)

Vercel is the zero-config deployment platform built for Next.js.

**Steps:**
1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Vercel auto-detects Next.js — leave all settings as default
4. Click **Deploy**
5. Your app is live at `https://your-project.vercel.app`

The `vercel.json` in this repo contains:
```json
{ "framework": "nextjs" }
```
This is the only config Vercel needs. No build command or output directory changes required.

**Auto-redeploy:** Every `git push` to `main` triggers a new production deployment automatically.

---

### Netlify

1. Connect your GitHub repo in the Netlify dashboard
2. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. Add the Next.js plugin in `netlify.toml`:
```toml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

---

### Self-hosted (VPS / server)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start the server (defaults to port 3000)
npm run start

# Custom port
PORT=8080 npm run start
```

For containerised deployments, use the official [Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker).

---

## 🤝 Contributing

Contributions are welcome and encouraged!

```bash
# 1. Fork this repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/labcraft.git
cd labcraft

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Start the dev server and make your changes
npm run dev

# 5. Lint and verify the build
npm run lint
npm run build

# 6. Commit and push
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature-name

# 7. Open a Pull Request on GitHub
```

### Contribution guidelines

- Keep TypeScript types accurate — avoid `any`
- New features go in `src/data/features.ts` — no UI component changes needed for most additions
- CSS changes go in `LabcraftApp.module.css` — always use the existing CSS variables
- Test at multiple viewport widths (mobile 375px, tablet 768px, desktop 1280px)
- Commit messages should follow conventional commits: `feat:`, `fix:`, `docs:`, `style:`

### Ideas for contributions

- [ ] **Deep Research** prompt generator
- [ ] **Discover Sources** prompt templates
- [ ] **Learning Guide** prompt type
- [ ] Prompt **history** — persist last 5 prompts using `localStorage`
- [ ] **Preset templates** for common use cases (competitor analysis, exam prep, meeting notes)
- [ ] **NotebookLM Plus** specific prompt options
- [ ] **Language selector** for non-English prompt output
- [ ] **"Prompt tips"** tooltip per feature
- [ ] **Dark/light theme toggle**
- [ ] **URL sharing** — encode prompt config as URL query params
- [ ] **Export to PDF** — download generated prompt as a formatted PDF

---

## 🏷️ Brand

**Labcraft** — *Lab* mirrors NotebookLM's research laboratory identity. *Craft* signals the precision and intentionality that goes into a well-built prompt. Together: the craft of prompting a lab-grade AI tool.

---

## 📄 License

**MIT License** — see [LICENSE](./LICENSE) for full terms.

Free to use, fork, modify, sell, or build upon. Attribution appreciated but not required.

---

## 🙏 Acknowledgements

- Built for use with [Google NotebookLM](https://notebooklm.google.com)
- Feature research based on NotebookLM's Studio panel
- Built with [Next.js](https://nextjs.org) by Vercel
- Fonts: [Playfair Display, DM Mono, DM Sans](https://fonts.google.com) via Google Fonts

---

<p align="center">
  <strong>LABCRAFT</strong> · NotebookLM Prompt Studio · MIT License<br>
  <a href="https://github.com/theChandrayMurmu/labcraft">github.com/theChandrayMurmu/labcraft</a>
</p>
