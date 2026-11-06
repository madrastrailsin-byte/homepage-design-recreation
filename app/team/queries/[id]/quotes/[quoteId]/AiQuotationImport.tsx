'use client'

import { useState } from 'react'
import AiQuotationDraftEditor from './AiQuotationDraftEditor'

export default function AiQuotationImport({
  queryId, quoteId, onApply,
}: {
  queryId: string
  quoteId: string
  onApply: (draft: unknown[], reviewItems: string[]) => Promise<boolean>
}) {
  const [sourceText, setSourceText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState<unknown[] | null>(null)
  const [issues, setIssues] = useState<string[]>([])
  const [resolutions, setResolutions] = useState<string[]>([])
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)

  async function extract() {
    if (!sourceText.trim() || loading) return
    setLoading(true)
    setError('')
    setDraft(null)
    setIssues([])
    setResolutions([])
    setApplied(false)

    try {
      const response = await fetch('/api/team/extract-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryId, quoteId, sourceText }),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Extraction failed.')
      if (!Array.isArray(result.draft) || !Array.isArray(result.issues)) {
        throw new Error('Invalid AI response.')
      }

      setDraft(result.draft)
      setIssues(result.issues.filter(
        (value: unknown): value is string => typeof value === 'string'
      ))
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Extraction failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-[#d8c9ab] bg-white p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-[#96794c]">
        AI Quotation Import
      </p>
      <h2 className="mt-2 font-serif text-2xl">Paste Vendor Quotation</h2>
      <p className="mt-2 text-sm text-[#718080]">
        Extract supplier details for review. Nothing is saved automatically.
      </p>

      <textarea
        aria-label="Vendor quotation"
        value={sourceText}
        onChange={event => setSourceText(event.target.value)}
        maxLength={100000}
        rows={7}
        placeholder="Paste supplier quotation here..."
        className="mt-5 w-full rounded-lg border border-[#ded8cc] p-4 text-sm"
      />

      <button
        type="button"
        onClick={() => void extract()}
        disabled={loading || !sourceText.trim()}
        className="mt-4 rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white disabled:opacity-50"
      >
        {loading ? 'Extracting…' : 'Extract with AI'}
      </button>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

      {draft && (
        <div className="mt-6 border-t pt-5">
          <h3 className="font-serif text-xl">
            AI Draft Preview · {draft.length} option(s)
          </h3>
          <p className="mt-2 text-sm">
            Verify against the original quotation. This draft is not saved.
          </p>

          {issues.length > 0 && (
            <div className="mt-4 rounded-lg bg-[#fff8ed] p-4">
              <strong>Details requiring clarification</strong>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {issues.map((issue, index) => (
                  <li key={index} className="mb-3">
                    {issue}
                    <input
                      aria-label={`Resolution for issue ${index + 1}`}
                      placeholder="How was this clarified with the supplier?"
                      className="mt-2 w-full rounded-lg border border-[#ded8cc] p-2 text-sm"
                      value={resolutions[index] ?? ''}
                      onChange={e => setResolutions(current => {
                        const next = [...current]
                        next[index] = e.target.value
                        return next
                      })}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AiQuotationDraftEditor draft={draft} onChange={setDraft} />

          <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[#f6f3eb] p-4 text-xs">
            {JSON.stringify(draft, null, 2)}
          </pre>

          <button
            type="button"
            disabled={applied || applying || !draft.length || issues.some((_, i) => !(resolutions[i] ?? '').trim())}
            onClick={async () => {
              if (window.confirm(
                'Append these reviewed options to the quotation? Existing options will remain unchanged.'
              )) {
                setApplying(true)
                setError('')
                try {
                  const reviewItems = issues.map((issue, index) =>
                    `${issue} — Staff clarification: ${(resolutions[index] ?? '').trim()}`
                  )
                  if (await onApply(draft, reviewItems)) setApplied(true)
                  else setError('Unable to save AI options. Check the quotation status.')
                } catch {
                  setError('Unable to save AI options.')
                } finally {
                  setApplying(false)
                }
              }
            }}
            className="mt-4 rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white disabled:opacity-40"
          >
            {applied ? 'Added to Package Options' : 'Apply Reviewed Draft'}
          </button>

          {issues.length > 0 && (
            <p className="mt-2 text-sm text-[#9b5550]">
              Correct the details and record how each issue was resolved before applying.
            </p>
          )}
        </div>
      )}
    </section>
  )
}
