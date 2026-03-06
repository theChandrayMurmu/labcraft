export type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'check'

export interface Field {
  id: string
  label: string
  type: FieldType
  ph?: string
  req?: boolean
  opts?: string[]
  def?: number | string
  defAll?: boolean
}

export interface Feature {
  id: string
  icon: string
  name: string
  desc: string
  tag: string
  fields: Field[]
  gen: (v: Record<string, string>) => string
}

function L(val: string, fallback: string): string {
  return (val || fallback).split(',').map((s, i) => `${i + 1}. ${s.trim()}`).join('\n')
}

export const FEATURES: Feature[] = [
  {
    id: 'slide_deck', icon: '🗂️', name: 'Slide Deck', desc: 'Presentation slides', tag: 'VISUAL OUTPUT',
    fields: [
      { id: 'topic', label: 'Report / Document Title', type: 'text', ph: 'e.g. Q3 2025 Financial Performance Report', req: true },
      { id: 'desc', label: 'Report Context or Key Themes', type: 'textarea', ph: 'Briefly describe what the report covers — key findings, audience, main sections…' },
      { id: 'slide_count', label: 'Approximate Slide Count', type: 'select', opts: ['10–12 slides', '15–20 slides', '25–30 slides', '30–40 slides', 'As many as needed'], def: '15–20 slides' },
      { id: 'audience', label: 'Target Audience', type: 'select', opts: ['Executive Leadership', 'General Business Stakeholders', 'Technical Team', 'Investors / Board', 'Clients / Customers', 'Students / Academic', 'General Public'], def: 'General Business Stakeholders' },
      { id: 'detail', label: 'Slide Detail Level', type: 'radio', opts: ['Concise bullets', 'Detailed + Sub-bullets', 'Full paragraph descriptions'], def: 1 },
      { id: 'style', label: 'Presentation Style', type: 'radio', opts: ['Formal / Corporate', 'Academic / Research', 'Storytelling narrative', 'Minimal / Clean'], def: 0 },
      { id: 'include', label: 'Must-Include Elements', type: 'check', opts: ['All data & statistics', 'Key findings & conclusions', 'Recommendations & action items', 'Direct quotes', 'Charts & table descriptions', 'Methodology', 'Executive summary slides', 'Appendix slides'], defAll: true },
      { id: 'structure', label: 'Slide Structure', type: 'check', opts: ['Title slide', 'Table of contents', 'Section divider slides', 'Speaker notes for every slide', 'Source references', 'Conclusion & next steps slide'], defAll: true },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Follow the exact order of the report. Use report headings as slide titles.' },
    ],
    gen: (v) => `You are creating a comprehensive slide deck from the source titled "${v.topic || '[Your Report]'}".
${v.desc ? `\nCONTEXT: ${v.desc}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create a fully structured slide deck (${v.slide_count || '15–20 slides'}) from ALL content in my sources.
Target audience: ${v.audience || 'General Business Stakeholders'}
Presentation style: ${v.style || 'Formal / Corporate'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE FORMAT — EVERY SLIDE MUST HAVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• SLIDE [#] — [TITLE]
• Content: ${v.detail || 'Detailed + Sub-bullets'}
• Speaker Notes: A full paragraph explaining context, talking points, and transitions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${L(v.structure, 'Title slide, Table of contents, Section divider slides, Speaker notes for every slide, Conclusion & next steps slide')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT COMPLETENESS RULES — CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MUST include: ${v.include || 'All data & statistics, Key findings & conclusions, Recommendations & action items, Charts & table descriptions, Executive summary slides'}

DO NOT:
- Paraphrase or condense any data point into vague language
- Skip any section, subsection, or appendix of the source
- Merge distinct findings unless truly redundant

DO:
- Follow the source document's exact order and structure
- Use source headings as slide titles wherever possible
- Create additional slides if needed — completeness beats slide count
- Mark charts and visuals with [VISUAL: description] placeholders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After all slides include:
- TOTAL SLIDE COUNT
- COVERAGE CHECKLIST: confirm each major source section is represented
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Begin generating the complete slide deck now.`
  },
  {
    id: 'audio_overview', icon: '🎙️', name: 'Audio Overview', desc: 'Podcast-style dialogue', tag: 'AUDIO OUTPUT',
    fields: [
      { id: 'topic', label: 'Topic / Source Title', type: 'text', ph: 'e.g. Machine Learning Fundamentals Paper', req: true },
      { id: 'length', label: 'Overview Length', type: 'radio', opts: ['Brief (5–8 min)', 'Standard (10–15 min)', 'In-depth (20+ min)'], def: 1 },
      { id: 'tone', label: 'Conversation Tone', type: 'radio', opts: ['Professional & Formal', 'Conversational & Friendly', 'Academic & Analytical', 'Engaging & Energetic'], def: 1 },
      { id: 'audience', label: 'Listener Audience', type: 'select', opts: ['General public', 'Domain experts', 'Students', 'Business professionals', 'Researchers'], def: 'General public' },
      { id: 'focus', label: 'Focus Areas (comma-separated)', type: 'text', ph: 'e.g. key findings, implications, controversies' },
      { id: 'humor', label: 'Humor Level', type: 'radio', opts: ['None', 'Light touches', 'Moderately casual'], def: 1 },
      { id: 'mode', label: 'Mode', type: 'radio', opts: ['Standard overview', 'Enable join / Q&A mode'], def: 0 },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Start with a surprising fact. Cover both pros and cons.' },
    ],
    gen: (v) => `Generate an Audio Overview discussion about "${v.topic || '[Your Topic]'}" using all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERVIEW PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Length: ${v.length || 'Standard (10–15 min)'}
Tone: ${v.tone || 'Conversational & Friendly'}
Listener: ${v.audience || 'General public'}
Humor: ${v.humor || 'Light touches'}
Mode: ${v.mode || 'Standard overview'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The two AI hosts must:
• Open with a compelling hook or surprising fact from the sources
• Cover ALL major sections and findings — nothing skipped
• ${v.focus ? `Especially focus on: ${v.focus}` : 'Cover all topics with equal depth'}
• Use analogies and real-world comparisons to aid understanding
• Refer to specific evidence from the sources
• Disagree or debate nuanced points naturally — avoid robotic agreement
• Close with key takeaways and a thought-provoking final insight

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONVERSATION STYLE GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Vary rhythm — mix short punchy lines with longer explanations
• Natural transitions: "That's interesting because…", "But here's what surprised me…"
• One host = curious questioner; other = knowledgeable explainer
• Avoid jargon unless immediately explained
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the full audio overview script now, formatted as a two-host dialogue.`
  },
  {
    id: 'video_overview', icon: '🎬', name: 'Video Overview', desc: 'Scene-by-scene video script', tag: 'VIDEO OUTPUT',
    fields: [
      { id: 'topic', label: 'Topic / Source Title', type: 'text', ph: 'e.g. Climate Change Research Report 2025', req: true },
      { id: 'format', label: 'Video Format', type: 'radio', opts: ['Brief (1–2 min)', 'Explainer (6–10 min)'], def: 1 },
      { id: 'visual_style', label: 'Visual Style', type: 'radio', opts: ['Clean / Minimal', 'Illustrated', 'Data-driven charts', 'Documentary-style'], def: 0 },
      { id: 'audience', label: 'Viewer Audience', type: 'select', opts: ['General public', 'Students', 'Business executives', 'Researchers', 'Clients / Customers'], def: 'General public' },
      { id: 'focus', label: 'Key Topics to Cover', type: 'text', ph: 'e.g. methodology, results, recommendations' },
      { id: 'language', label: 'Output Language', type: 'select', opts: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hindi', 'Japanese', 'Chinese (Simplified)', 'Arabic'], def: 'English' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Open with a compelling statistic. Use diagrams for process flows.' },
    ],
    gen: (v) => `Create a Video Overview for "${v.topic || '[Your Topic]'}" based on all uploaded source material.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIDEO PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format: ${v.format || 'Explainer (6–10 min)'}
Visual style: ${v.visual_style || 'Clean / Minimal'}
Audience: ${v.audience || 'General public'}
Language: ${v.language || 'English'}
${v.focus ? `Key topics: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT STRUCTURE — PER SCENE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SCENE #] — [Section Title]
NARRATION: (spoken text)
VISUAL: (what appears on screen — diagrams, text overlays, charts)
DURATION: (estimated seconds)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cover every major finding and section — nothing skipped
• Open with an attention-grabbing statistic or question
• Include on-screen text overlays for all key data points
• End with clear takeaways and a call-to-action if appropriate
• Pacing must feel natural — not rushed, not padded
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete video overview script with all scene descriptions now.`
  },
  {
    id: 'mind_map', icon: '🧠', name: 'Mind Map', desc: 'Visual concept web', tag: 'VISUAL OUTPUT',
    fields: [
      { id: 'topic', label: 'Central Topic / Document Title', type: 'text', ph: 'e.g. Coral Reef Ecosystem Decline Research', req: true },
      { id: 'depth', label: 'Map Depth', type: 'radio', opts: ['Overview (2 levels)', 'Detailed (3–4 levels)', 'Deep dive (5+ levels)'], def: 1 },
      { id: 'focus', label: 'Areas to Emphasise', type: 'text', ph: 'e.g. causes, effects, solutions, timeline' },
      { id: 'connections', label: 'Connection Types to Surface', type: 'check', opts: ['Causal relationships', 'Chronological links', 'Hierarchical structure', 'Contradictions & debates', 'Key people & roles', 'Definitions & terms'], defAll: true },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Flag areas of scientific uncertainty. Emphasise cross-disciplinary links.' },
    ],
    gen: (v) => `Generate a detailed Mind Map for "${v.topic || '[Your Topic]'}" based on all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Depth: ${v.depth || 'Detailed (3–4 levels)'}
${v.focus ? `Emphasise: ${v.focus}` : ''}
Connection types: ${v.connections || 'Causal relationships, Hierarchical structure, Key people & roles, Definitions & terms'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRUCTURE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CENTRAL TOPIC: [topic name]
│
├── BRANCH 1: [Main concept]
│   ├── Sub-concept 1.1
│   │   └── Detail / evidence 1.1.1
│   └── Sub-concept 1.2
├── BRANCH 2: [Main concept]
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL MARKERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Every branch traces to source evidence — include brief citations
• Mark CONTRADICTIONS with ⚡  •  DEFINITIONS with 📌  •  KEY PEOPLE with 👤
• Include cross-links between branches where concepts connect
• End with CONNECTIONS SUMMARY: the 5 most surprising or important links discovered
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the full mind map now.`
  },
  {
    id: 'study_guide', icon: '📖', name: 'Study Guide', desc: 'Structured learning material', tag: 'REPORT OUTPUT',
    fields: [
      { id: 'topic', label: 'Subject / Document Title', type: 'text', ph: 'e.g. Introduction to Organic Chemistry Textbook', req: true },
      { id: 'level', label: 'Study Level', type: 'radio', opts: ['Beginner / Introductory', 'Intermediate', 'Advanced / Expert'], def: 1 },
      { id: 'format', label: 'Format Preference', type: 'radio', opts: ['Outline format', 'Detailed prose', 'Mixed (outline + notes)'], def: 0 },
      { id: 'include', label: 'Include These Sections', type: 'check', opts: ['Chapter summaries', 'Key terms & definitions', 'Quiz questions', 'Essay prompts', 'Answer key', 'Common misconceptions', 'Exam tips', 'Real-world applications'], defAll: true },
      { id: 'focus', label: 'Topics to Emphasise', type: 'text', ph: 'e.g. chapters 3–5, reaction mechanisms, periodic trends' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Include mnemonics where helpful. Highlight formula sheets.' },
    ],
    gen: (v) => `Create a comprehensive Study Guide for "${v.topic || '[Your Subject]'}" based on all uploaded source material.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Level: ${v.level || 'Intermediate'}
Format: ${v.format || 'Outline format'}
${v.focus ? `Emphasise: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED SECTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${L(v.include, 'Chapter summaries, Key terms & definitions, Quiz questions, Essay prompts, Answer key, Real-world applications')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cover EVERY chapter, section, and subsection — nothing omitted
• Key terms: exact definition AND a plain-language explanation
• Quiz questions span all levels: recall, comprehension, application, analysis
• Essay prompts require synthesis across multiple sections
• Flag commonly confusing concepts with ⚠️
• Include memory aids or mnemonics where helpful
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete study guide now, covering the full source material.`
  },
  {
    id: 'briefing_doc', icon: '📋', name: 'Briefing Doc', desc: 'Executive summary & insights', tag: 'REPORT OUTPUT',
    fields: [
      { id: 'topic', label: 'Document / Report Title', type: 'text', ph: 'e.g. Competitive Analysis: SaaS Market 2025', req: true },
      { id: 'audience', label: 'Briefing Audience', type: 'select', opts: ['C-Suite / Executives', 'Board of Directors', 'Department Managers', 'Policy Makers', 'Investors', 'New Hires / Onboarding', 'General Team'], def: 'C-Suite / Executives' },
      { id: 'length', label: 'Briefing Length', type: 'radio', opts: ['1 page (ultra-concise)', '2–3 pages (standard)', 'Full detailed summary'], def: 1 },
      { id: 'urgency', label: 'Decision Urgency', type: 'radio', opts: ['Informational only', 'Needs decision soon', 'Urgent / Immediate action'], def: 0 },
      { id: 'include', label: 'Must Include', type: 'check', opts: ['Executive summary', 'Key findings', 'Critical data points', 'Risks & challenges', 'Recommendations', 'Action items', 'Background context', 'Glossary of terms'], defAll: true },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Prioritise financial implications. Flag anything needing legal review.' },
    ],
    gen: (v) => `Generate a professional Briefing Document for "${v.topic || '[Your Document]'}" from all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Audience: ${v.audience || 'C-Suite / Executives'}
Length: ${v.length || '2–3 pages (standard)'}
Decision urgency: ${v.urgency || 'Informational only'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED SECTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${L(v.include, 'Executive summary, Key findings, Critical data points, Risks & challenges, Recommendations, Action items')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WRITING STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lead with the most critical insight — readers must get value in the first paragraph
• Every finding must cite its source section
• Active voice, decisive language — no hedging unless genuinely uncertain
• Quantify everything: percentages, figures, timelines, impact metrics
• Risks must be paired with mitigations where possible
• Action items must be specific: who, what, by when
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete briefing document now.`
  },
  {
    id: 'faq', icon: '❓', name: 'FAQ', desc: 'Q&A from your sources', tag: 'REPORT OUTPUT',
    fields: [
      { id: 'topic', label: 'Document / Source Title', type: 'text', ph: 'e.g. Employee Handbook 2025', req: true },
      { id: 'audience', label: 'FAQ Audience', type: 'select', opts: ['Customers / Clients', 'New Employees', 'Students', 'General Public', 'Technical Team', 'Regulators / Compliance'], def: 'General Public' },
      { id: 'count', label: 'Number of Questions', type: 'select', opts: ['10–15 questions', '20–25 questions', '30+ questions', 'As many as the content warrants'], def: '20–25 questions' },
      { id: 'depth', label: 'Answer Depth', type: 'radio', opts: ['Short (1–2 sentences)', 'Medium (1 paragraph)', 'Detailed with examples'], def: 1 },
      { id: 'categories', label: 'Group Questions By', type: 'radio', opts: ['No grouping', 'By topic / category', 'By audience role', 'By importance level'], def: 1 },
      { id: 'focus', label: 'Priority Topics', type: 'text', ph: 'e.g. onboarding process, benefits, leave policies' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Include a "still have questions?" note at the end.' },
    ],
    gen: (v) => `Generate a comprehensive FAQ document for "${v.topic || '[Your Document]'}" based on all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Audience: ${v.audience || 'General Public'}
Quantity: ${v.count || '20–25 questions'}
Answer depth: ${v.depth || 'Medium (1 paragraph)'}
Organisation: ${v.categories || 'By topic / category'}
${v.focus ? `Priority topics: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORMAT PER ENTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q[#]: [Question — written as a real person would ask it]
A: [Answer — direct, clear, citing source where relevant]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Questions must sound natural — not formal headers
• Anticipate both beginner questions AND nuanced follow-ups
• Answers directly sourced from the uploaded material — no speculation
• Flag any question where the source gives conflicting or unclear answers
• At least one "what if…" or edge-case question per major topic
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the full FAQ document now.`
  },
  {
    id: 'timeline', icon: '⏱️', name: 'Timeline', desc: 'Chronological event breakdown', tag: 'REPORT OUTPUT',
    fields: [
      { id: 'topic', label: 'Subject / Document Title', type: 'text', ph: 'e.g. History of the Internet — Source Collection', req: true },
      { id: 'format', label: 'Timeline Format', type: 'radio', opts: ['Linear chronological', 'Parallel streams', 'Milestone-based'], def: 0 },
      { id: 'granularity', label: 'Time Granularity', type: 'radio', opts: ['By decade', 'By year', 'By month', 'By day / event'], def: 1 },
      { id: 'include', label: 'Include Per Entry', type: 'check', opts: ['Dates & periods', 'Key people & roles', 'Cause & effect links', 'Turning points', 'Quotes & evidence', 'Outcome & impact'], defAll: true },
      { id: 'focus', label: 'Time Period or Focus', type: 'text', ph: 'e.g. 1990–2025, or focus on policy changes only' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Highlight disputed dates. Group by geography.' },
    ],
    gen: (v) => `Create a detailed Timeline for "${v.topic || '[Your Subject]'}" using all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format: ${v.format || 'Linear chronological'}
Granularity: ${v.granularity || 'By year'}
${v.focus ? `Period / focus: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTRY FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[DATE / PERIOD] — [EVENT TITLE]
→ Description: What happened and why it matters
→ Key people: Names and roles
→ Cause: What led to this event
→ Effect: What changed as a result
→ Source: [citation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INCLUDE PER ENTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${L(v.include, 'Dates & periods, Key people & roles, Cause & effect links, Turning points, Outcome & impact')}

SPECIAL MARKERS:
• Major turning points — ★  •  Disputed dates — ?  •  Conflicting interpretations — ⚡
• End with TURNING POINTS SUMMARY: the 3–5 most consequential events and why
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete timeline now, covering all events in the sources.`
  },
  {
    id: 'flashcards', icon: '🃏', name: 'Flashcards', desc: 'Study cards for memorisation', tag: 'LEARNING OUTPUT',
    fields: [
      { id: 'topic', label: 'Subject / Document Title', type: 'text', ph: 'e.g. Medical Terminology Textbook Chapter 4', req: true },
      { id: 'count', label: 'Number of Flashcards', type: 'select', opts: ['20–30 cards', '40–50 cards', '60–80 cards', 'As many as needed'], def: '40–50 cards' },
      { id: 'types', label: 'Card Types', type: 'check', opts: ['Term → Definition', 'Question → Answer', 'Concept → Example', 'Formula → Application', 'Date → Event'], defAll: false },
      { id: 'difficulty', label: 'Difficulty Distribution', type: 'radio', opts: ['All beginner', 'Mixed levels', 'Focus on hard concepts'], def: 1 },
      { id: 'hints', label: 'Include Hints?', type: 'radio', opts: ['No hints', 'Yes, include hints', 'Memory aids / mnemonics'], def: 1 },
      { id: 'focus', label: 'Specific Topics to Cover', type: 'text', ph: 'e.g. prefixes, suffixes, body systems, procedures' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Include at least 10 cards on diagnosis terminology.' },
    ],
    gen: (v) => `Generate a complete flashcard set for "${v.topic || '[Your Subject]'}" from all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quantity: ${v.count || '40–50 cards'}
Card types: ${v.types || 'Term → Definition, Question → Answer'}
Difficulty: ${v.difficulty || 'Mixed levels'}
Hints: ${v.hints || 'Yes, include hints'}
${v.focus ? `Priority topics: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD [#] — [Type] — [Difficulty: Easy / Medium / Hard]
FRONT:  [Term, question, or prompt]
BACK:   [Answer or definition]
HINT:   [Memory cue or mnemonic — if enabled]
SOURCE: [Brief reference to source location]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Each card tests ONE clear concept — no multi-part answers
• Hard cards require synthesis, not just recall
• Terms match exact source language — don't paraphrase definitions
• Group similar cards by topic in the output
• Include at least one "Why does this matter?" card per major concept
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate all flashcards now, covering the full source content.`
  },
  {
    id: 'quiz', icon: '🧩', name: 'Quiz', desc: 'Assessment with answer key', tag: 'LEARNING OUTPUT',
    fields: [
      { id: 'topic', label: 'Subject / Document Title', type: 'text', ph: 'e.g. World War II — Historical Sources', req: true },
      { id: 'count', label: 'Number of Questions', type: 'select', opts: ['10 questions', '15–20 questions', '25–30 questions', '40+ questions'], def: '15–20 questions' },
      { id: 'types', label: 'Question Types', type: 'check', opts: ['Multiple choice (4 options)', 'True / False', 'Short answer', 'Fill in the blank', 'Essay prompt', 'Case study'], defAll: false },
      { id: 'difficulty', label: 'Difficulty Level', type: 'radio', opts: ['Easy', 'Mixed', 'Challenging', 'Expert-level'], def: 1 },
      { id: 'include', label: 'Quiz Extras', type: 'check', opts: ['Full answer key', 'Explanations for each answer', 'Point values', 'Time suggestions', 'Difficulty label per question'], defAll: true },
      { id: 'focus', label: 'Specific Topics to Test', type: 'text', ph: 'e.g. causes, key figures, battles, treaties' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Make all wrong answers plausible. Avoid trick questions.' },
    ],
    gen: (v) => `Create a complete Quiz / Assessment for "${v.topic || '[Your Subject]'}" based on all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total questions: ${v.count || '15–20 questions'}
Question types: ${v.types || 'Multiple choice (4 options), Short answer, Essay prompt'}
Difficulty: ${v.difficulty || 'Mixed'}
${v.focus ? `Emphasise: ${v.focus}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q[#] [Type] [Difficulty]
[Question text]
  A) …  B) …  C) …  D) …  (for MCQ)
ANSWER: [Correct answer]
EXPLANATION: [Why this is correct, citing source]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INCLUDED EXTRAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${L(v.include, 'Full answer key, Explanations for each answer')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• All MCQ wrong answers must be plausible — no silly distractors
• Questions span Bloom's Taxonomy: recall → synthesis
• No trick questions — test knowledge, not reading traps
• Every question answerable from uploaded sources only
• Essay prompts require cross-source synthesis
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete quiz with all questions and a separate answer key now.`
  },
  {
    id: 'infographic', icon: '📊', name: 'Infographic', desc: 'Visual summary brief', tag: 'VISUAL OUTPUT',
    fields: [
      { id: 'topic', label: 'Topic / Source Title', type: 'text', ph: 'e.g. Global Renewable Energy Report 2025', req: true },
      { id: 'orientation', label: 'Orientation / Format', type: 'radio', opts: ['Landscape (16:9)', 'Portrait (9:16)', 'Square (1:1)'], def: 0 },
      { id: 'detail', label: 'Complexity Level', type: 'radio', opts: ['Simple & scannable', 'Moderately detailed', 'Data-rich & comprehensive'], def: 1 },
      { id: 'style', label: 'Visual Style', type: 'radio', opts: ['Clean / Corporate', 'Illustrated / Colourful', 'Minimalist / Typographic', 'Data visualisation'], def: 0 },
      { id: 'audience', label: 'Target Audience', type: 'select', opts: ['General public', 'Business professionals', 'Students', 'Social media audience', 'Press / Media'], def: 'Business professionals' },
      { id: 'priority', label: 'Prioritise in Design', type: 'check', opts: ['Statistics & numbers', 'Process / flow', 'Comparisons', 'Timeline', 'Key quotes', 'Geographic data', 'Hierarchy / org chart'], defAll: false },
      { id: 'color', label: 'Colour / Branding Notes', type: 'text', ph: 'e.g. brand blues and greens, avoid red' },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Designed for LinkedIn. Include source attribution footer.' },
    ],
    gen: (v) => `Generate an Infographic content brief for "${v.topic || '[Your Topic]'}" from all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Orientation: ${v.orientation || 'Landscape (16:9)'}
Complexity: ${v.detail || 'Moderately detailed'}
Visual style: ${v.style || 'Clean / Corporate'}
Audience: ${v.audience || 'Business professionals'}
${v.color ? `Colour notes: ${v.color}` : ''}
Prioritise: ${v.priority || 'Statistics & numbers, Comparisons, Key quotes'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION [#] — [Title]
TYPE: [chart / icon block / text callout / timeline / comparison / quote / process flow]
CONTENT: [Exact text, data, or description to display]
VISUAL NOTES: [How it should look — colours, layout, icon suggestions]
SIZE: [small / medium / large / hero]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lead with the most powerful statistic as the hero element
• Every data point from uploaded sources only
• 5-second rule: main message graspable in 5 seconds
• Include headline, subheadline, and source attribution footer
• Flag sections that benefit from icon suggestions
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete infographic content brief and visual layout outline now.`
  },
  {
    id: 'data_table', icon: '📑', name: 'Data Table', desc: 'Sheets-ready structured data', tag: 'DATA OUTPUT',
    fields: [
      { id: 'topic', label: 'Document / Source Title', type: 'text', ph: 'e.g. Clinical Trial Reports — 12 Studies', req: true },
      { id: 'purpose', label: 'Table Purpose', type: 'select', opts: ['Compare entities side-by-side', 'Extract action items', 'Track events / milestones', 'Summarise research findings', 'Competitive analysis', 'Build inventory / catalogue', 'Map standards / criteria'], def: 'Compare entities side-by-side' },
      { id: 'columns', label: 'Key Columns / Variables', type: 'text', ph: 'e.g. Study year, sample size, outcome, p-value, limitations' },
      { id: 'rows', label: 'Each Row Represents', type: 'text', ph: 'e.g. each individual study, each competitor, each product' },
      { id: 'sort', label: 'Sort / Order By', type: 'radio', opts: ['Default order', 'Alphabetical', 'By date', 'By importance', 'By numerical value'], def: 0 },
      { id: 'export', label: 'Export Format', type: 'radio', opts: ['Google Sheets ready', 'CSV format', 'Markdown table'], def: 0 },
      { id: 'extra', label: 'Additional Instructions', type: 'textarea', ph: 'e.g. Flag missing data as N/A. Include a summary row at the bottom.' },
    ],
    gen: (v) => `Create a structured Data Table from "${v.topic || '[Your Document]'}" using all uploaded sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Purpose: ${v.purpose || 'Compare entities side-by-side'}
Columns / variables: ${v.columns || 'Extract all key variables from sources'}
Each row represents: ${v.rows || 'Each individual item / entity in the sources'}
Sort order: ${v.sort || 'Default order'}
Export format: ${v.export || 'Google Sheets ready'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TABLE FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Present as a clean markdown table:
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value    | Value    | Value    |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Extract EVERY relevant row — do not sample or truncate
• Mark missing data as N/A — never leave cells blank
• Mark conflicting data with * and add a footnote below the table
• Include a TOTALS or SUMMARY row at the bottom if data is numerical
• End with DATA GAPS (variables not found) and DATA NOTES (caveats / conflicts)
${v.extra ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nADDITIONAL INSTRUCTIONS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${v.extra}` : ''}

Generate the complete data table now, extracting all available data from the sources.`
  },
]
