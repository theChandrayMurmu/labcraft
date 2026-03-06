import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Labcraft — NotebookLM Prompt Studio',
  description: 'Generate expert-grade prompts for all 12 NotebookLM Studio features. Nothing missed, nothing skipped.',
  keywords: 'NotebookLM, prompt generator, AI prompts, Google NotebookLM, slide deck, study guide',
  openGraph: {
    title: 'Labcraft — NotebookLM Prompt Studio',
    description: 'Generate expert prompts for every NotebookLM feature instantly.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
