'use client'

import { useState, useCallback } from 'react'
import { FEATURES, Feature, Field } from '@/data/features'
import styles from './LabcraftApp.module.css'

// ─── helpers ───────────────────────────────────────────────────────────────
type Values = Record<string, string>

function initValues(feature: Feature): Values {
  const v: Values = {}
  feature.fields.forEach((f) => {
    if (f.type === 'radio' && f.opts && f.def !== undefined) {
      v[f.id] = f.opts[f.def as number] ?? ''
    } else if (f.type === 'check' && f.defAll && f.opts) {
      v[f.id] = f.opts.join(', ')
    } else if (f.type === 'select' && f.def) {
      v[f.id] = f.def as string
    } else {
      v[f.id] = ''
    }
  })
  return v
}

// ─── FeatureCard ────────────────────────────────────────────────────────────
function FeatureCard({ feature, active, onClick }: { feature: Feature; active: boolean; onClick: () => void }) {
  return (
    <button className={`${styles.featureCard} ${active ? styles.featureCardActive : ''}`} onClick={onClick}>
      {active && <span className={styles.featureCardCheck}>✓</span>}
      <span className={styles.featureCardIcon}>{feature.icon}</span>
      <div className={styles.featureCardName}>{feature.name}</div>
      <div className={styles.featureCardDesc}>{feature.desc}</div>
    </button>
  )
}

// ─── PillGroup ──────────────────────────────────────────────────────────────
function PillGroup({ field, values, onChange }: { field: Field; values: Values; onChange: (id: string, val: string) => void }) {
  const current = values[field.id] || ''
  const selected = current ? current.split(', ').filter(Boolean) : []
  const isMulti = field.type === 'check'

  const toggle = (opt: string) => {
    if (isMulti) {
      const next = selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]
      onChange(field.id, next.join(', '))
    } else {
      onChange(field.id, opt)
    }
  }

  return (
    <div className={styles.pillGroup}>
      {field.opts?.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.pill} ${selected.includes(opt) ? styles.pillChecked : ''}`}
          onClick={() => toggle(opt)}
        >
          <span className={styles.pillDot} />
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─── FormField ──────────────────────────────────────────────────────────────
function FormField({ field, values, onChange }: { field: Field; values: Values; onChange: (id: string, val: string) => void }) {
  return (
    <div>
      <label className={styles.fieldLabel}>
        {field.label}
        {field.req && <span className={styles.fieldRequired}> *</span>}
      </label>
      {field.type === 'text' && (
        <input
          type="text"
          className={styles.input}
          placeholder={field.ph || ''}
          value={values[field.id] || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'textarea' && (
        <textarea
          className={styles.textarea}
          placeholder={field.ph || ''}
          value={values[field.id] || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'select' && (
        <select
          className={styles.select}
          value={values[field.id] || ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        >
          <option value="">Select…</option>
          {field.opts?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}
      {(field.type === 'radio' || field.type === 'check') && (
        <PillGroup field={field} values={values} onChange={onChange} />
      )}
    </div>
  )
}

// ─── FormPanel ──────────────────────────────────────────────────────────────
function FormPanel({ feature, values, onChange, onGenerate }: {
  feature: Feature
  values: Values
  onChange: (id: string, val: string) => void
  onGenerate: () => void
}) {
  // Pair consecutive text/select fields side-by-side
  const rows: Array<[Field] | [Field, Field]> = []
  let i = 0
  while (i < feature.fields.length) {
    const f = feature.fields[i]
    const next = feature.fields[i + 1]
    const inlineable = (f: Field) => f.type === 'text' || f.type === 'select'
    if (inlineable(f) && next && inlineable(next)) {
      rows.push([f, next])
      i += 2
    } else {
      rows.push([f])
      i++
    }
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTag}>{feature.tag}</span>
        <h2 className={styles.panelTitle}>
          {feature.icon} <em>{feature.name}</em> Prompt
        </h2>
        <p className={styles.panelSubtitle}>{feature.desc} — configure below, then generate your prompt</p>
      </div>
      <div className={styles.dividerPlain} />
      {rows.map((row, idx) => (
        <div key={idx} className={`${styles.formSection} ${row.length === 2 ? styles.grid2 : ''}`}>
          {row.map((f) => (
            <FormField key={f.id} field={f} values={values} onChange={onChange} />
          ))}
        </div>
      ))}
      <button className={styles.generateBtn} onClick={onGenerate}>
        ⟶ Generate Prompt
      </button>
    </div>
  )
}

// ─── OutputPanel ────────────────────────────────────────────────────────────
function OutputPanel({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className={styles.outputSection}>
      <div className={styles.outputHeader}>
        <div className={styles.outputLabel}>Your NotebookLM Prompt</div>
        <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copy}>
          {copied ? '✓ Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <pre className={styles.promptOutput}>{prompt}</pre>
      <div className={styles.infoNote}>
        <strong>How to use:</strong> In NotebookLM, upload your sources first, then open the Chat panel and paste this prompt. For best results, add the full PDF or document before submitting.
      </div>
    </div>
  )
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function LabcraftApp() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [values, setValues] = useState<Values>({})
  const [prompt, setPrompt] = useState<string | null>(null)

  const activeFeature = FEATURES.find((f) => f.id === activeId) ?? null

  const selectFeature = useCallback((id: string) => {
    const feat = FEATURES.find((f) => f.id === id)!
    setActiveId(id)
    setValues(initValues(feat))
    setPrompt(null)
  }, [])

  const handleChange = useCallback((id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }))
  }, [])

  const handleGenerate = useCallback(() => {
    if (!activeFeature) return
    const result = activeFeature.gen(values)
    setPrompt(result)
    setTimeout(() => {
      document.getElementById('output')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }, [activeFeature, values])

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.tag} style={{ animationDelay: '0.1s' }}>
          Labcraft — NotebookLM Prompt Studio
        </span>
        <h1 className={`${styles.h1} animate-fade-up`} style={{ animationDelay: '0.2s' }}>
          Every feature.<br />One <em>perfect</em> prompt.
        </h1>
        <p className={`${styles.subtitle} animate-fade-up`} style={{ animationDelay: '0.3s' }}>
          Select any NotebookLM Studio feature and Labcraft builds you a structured, expert-grade prompt — so nothing gets missed, skipped, or vaguely summarised.
        </p>
      </header>

      <div className={`${styles.divider} animate-fade-up`} style={{ animationDelay: '0.4s' }} />

      {/* Feature Grid */}
      <p className={`${styles.sectionLabel} animate-fade-up`} style={{ animationDelay: '0.45s' }}>
        Choose a NotebookLM Feature — 12 supported
      </p>
      <div className={`${styles.featureGrid} animate-fade-up`} style={{ animationDelay: '0.5s' }}>
        {FEATURES.map((f) => (
          <FeatureCard
            key={f.id}
            feature={f}
            active={activeId === f.id}
            onClick={() => selectFeature(f.id)}
          />
        ))}
      </div>

      {/* Form or Empty State */}
      {activeFeature ? (
        <FormPanel
          feature={activeFeature}
          values={values}
          onChange={handleChange}
          onGenerate={handleGenerate}
        />
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🧪</div>
          <div className={styles.emptyTitle}>Pick a feature above</div>
          <div className={styles.emptyDesc}>Labcraft will build the right prompt fields for whatever you choose.</div>
        </div>
      )}

      {/* Output */}
      {prompt && (
        <div id="output">
          <OutputPanel prompt={prompt} />
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <span style={{ color: '#c8f04a' }}>LABCRAFT</span>
        {' '}·{' '}NotebookLM Prompt Studio{' '}·{' '}MIT License{' '}·{' '}
        <a href="https://github.com/theChandrayMurmu/labcraft" target="_blank" rel="noopener noreferrer">
          build for the 💚 of NotebookLM by Chandray Murmu.↗
        </a>
      </footer>
    </div>
  )
}
