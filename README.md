# Labcraft 🧪

> **The complete NotebookLM Prompt Studio — craft expert prompts for every feature, instantly.**

Labcraft is a free, open-source prompt generator that covers the full surface area of [Google NotebookLM](https://notebooklm.google.com). Whether you're creating a slide deck, audio overview, infographic, quiz, mind map, or data table — Labcraft builds you a structured, expert-grade prompt that tells NotebookLM exactly what to produce and how.

No more generic one-liner prompts. No more missed details. Just paste and go.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/labcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ What Labcraft Does

Labcraft generates optimized, structured prompts for **all 12 NotebookLM Studio features**:

| Feature | What it does |
|---|---|
| 🗂️ **Slide Deck** | Builds presentation prompts with completeness rules, speaker notes, and structure |
| 🎙️ **Audio Overview** | Configures podcast-style AI conversations by tone, length, and host dynamic |
| 🎬 **Video Overview** | Scripts scene-by-scene video prompts with visual direction |
| 🧠 **Mind Map** | Deep concept mapping with cross-links, citations, and contradiction markers |
| 📖 **Study Guide** | Full learning guides with summaries, glossary, quizzes, and essay prompts |
| 📋 **Briefing Doc** | Executive-ready briefings with action items, risks, and recommendations |
| ❓ **FAQ Generator** | Natural-language Q&A from any document for any audience |
| ⏱️ **Timeline** | Chronological event breakdowns with cause/effect and turning points |
| 🃏 **Flashcards** | Spaced-repetition-ready cards with hints and difficulty levels |
| 🧩 **Quiz / Assessment** | Bloom's Taxonomy-spanning assessments with full answer keys |
| 📊 **Infographic** | Visual content briefs with layout, sizing, and style direction |
| 📑 **Data Table** | Structured extraction prompts for Google Sheets-ready tables |

---

## 🚀 Quick Start

### Option 1 — Deploy to Vercel (recommended, 1 click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/labcraft)

Or via CLI:
```bash
npx vercel --prod
```

### Option 2 — Run locally (zero install)

```bash
git clone https://github.com/yourusername/labcraft.git
cd labcraft
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 3 — GitHub Pages

1. Fork this repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Live at `https://yourusername.github.io/labcraft`

---

## 🗂️ Project Structure

```
labcraft/
├── index.html      # Entire application — self-contained, zero dependencies
├── vercel.json     # Vercel static deployment configuration
├── README.md       # This file
└── LICENSE         # MIT License
```

Labcraft is intentionally a **single-file application**. All HTML, CSS, and JavaScript live in `index.html` for maximum portability. Fork it, host it anywhere, modify it freely.

---

## 🧭 How to Use

1. **Open Labcraft** in your browser
2. **Pick a NotebookLM feature** from the feature grid (Slide Deck, Audio Overview, Quiz, etc.)
3. **Fill in the prompt fields** — topic, audience, detail level, what to include, style preferences
4. **Click "Generate Prompt"**
5. **Copy the prompt** and paste it into NotebookLM's chat panel with your sources uploaded

### Pro Tips

- **Upload all sources first** in NotebookLM before pasting the prompt — the model needs context
- For **long documents** (50+ pages), increase slide/question count to "as many as needed"
- For **Audio/Video Overviews**, use the `Interactive Mode` option to enable the join/Q&A feature
- The **Coverage Checklist** at the end of Slide Deck prompts helps you verify nothing was missed
- **Data Tables** work best when you name the exact columns you need in the "Key Columns" field

---

## 🛠️ Customization

Everything lives in `index.html`. Here's how to extend it:

### Add a new feature

In the `features` array, add a new object following this schema:

```javascript
{
  id: 'your_feature_id',
  icon: '🔧',
  name: 'Feature Name',
  desc: 'Short description',
  tag: 'Category',
  fields: [
    { id: 'topic', label: 'Topic Title', type: 'text', placeholder: '...', required: true },
    { id: 'style', label: 'Style', type: 'pills', options: ['Option A', 'Option B'], default: 0 },
    { id: 'include', label: 'Include', type: 'multipill', options: ['X', 'Y', 'Z'], defaultAll: true },
    { id: 'extra', label: 'Additional Instructions', type: 'textarea' }
  ],
  generate: (v) => `Your prompt template here using ${v.topic} and ${v.style}`
}
```

**Field types available:**
- `text` — single-line input
- `textarea` — multi-line input
- `select` — dropdown with options array
- `pills` — single-select pill buttons (use `default: index`)
- `multipill` — multi-select pill buttons (use `defaultAll: true` to pre-check all)

### Modify a prompt template

Each feature has a `generate(v)` function where `v` is the collected form values object. Edit the template literal to change the prompt structure, wording, or sections.

### Restyle

CSS variables in `:root` control the entire theme:
```css
:root {
  --bg: #f5f2eb;       /* Page background */
  --accent: #e8420a;   /* Primary accent (buttons, highlights) */
  --ink: #1a1714;      /* Main text color */
  /* ... */
}
```

---

## 🤝 Contributing

Contributions are welcome and encouraged!

1. **Fork** this repo
2. **Create a branch** — `git checkout -b feature/add-deep-research-prompt`
3. **Edit** `index.html`
4. **Test** by opening locally in a browser
5. **Submit a pull request** with a clear description

### Ideas for contributions

- [ ] Add a **Deep Research** prompt generator (web-sourced research plans)
- [ ] Add **Discover Sources** prompt templates
- [ ] Add **Learning Guide** prompt type
- [ ] Add prompt **history** (save last 5 generated prompts in session)
- [ ] Add **preset templates** for common use cases (competitor analysis, exam prep, meeting notes)
- [ ] Add **NotebookLM Plus** specific prompts (collaborative notebooks, advanced limits)
- [ ] Add **language selector** for non-English prompt output
- [ ] Add a **"prompt tips"** panel per feature

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
- Feature research based on NotebookLM's Studio panel: Slide Decks, Audio & Video Overviews, Mind Maps, Reports, Flashcards, Quizzes, Infographics, Data Tables
- Fonts: [IBM Plex Mono + IBM Plex Sans + Syne](https://fonts.google.com) via Google Fonts

---

<p align="center">
  <strong>LABCRAFT</strong> · NotebookLM Prompt Studio · MIT License<br>
  <a href="https://github.com/theChandrayMurmu/labcraft">github.com/theChandrayMurmu/labcraft</a>
</p>
