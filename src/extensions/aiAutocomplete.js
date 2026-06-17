import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

// --- CONFIG — edit these to point at your local LLM ---
const AI_BASE_URL = import.meta.env.VITE_AI_BASE_URL || 'http://localhost:11434/v1'
const AI_TOKEN   = import.meta.env.VITE_AI_TOKEN    || 'ollama'
const AI_MODEL   = import.meta.env.VITE_AI_MODEL    || 'llama3'

let debounceTimer = null
let ghostText = ''
let ghostPos  = null

async function fetchCompletion(text) {
  try {
    const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_TOKEN}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: 'user', content: `Continue this text (reply with continuation only, max 10 words): "${text}"` }],
        max_tokens: 20,
        stream: false,
      }),
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || ''
  } catch {
    return ''
  }
}

const aiPluginKey = new PluginKey('aiAutocomplete')

export const aiAutocompleteExtension = Extension.create({
  name: 'aiAutocomplete',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: aiPluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply(tr, old) {
            if (ghostText && ghostPos !== null) {
              const deco = Decoration.widget(ghostPos, () => {
                const span = document.createElement('span')
                span.className = 'ai-ghost'
                span.textContent = ghostText
                return span
              })
              try {
                return DecorationSet.create(tr.doc, [deco])
              } catch { return DecorationSet.empty }
            }
            return DecorationSet.empty
          },
        },
        props: {
          decorations(state) { return this.getState(state) },
          handleKeyDown(view, event) {
            // Tab = accept suggestion
            if (event.key === 'Tab' && ghostText) {
              event.preventDefault()
              const { tr } = view.state
              const pos = view.state.selection.from
              view.dispatch(tr.insertText(ghostText, pos))
              ghostText = ''
              ghostPos  = null
              return true
            }
            // Escape = dismiss
            if (event.key === 'Escape') {
              ghostText = ''
              ghostPos  = null
              view.dispatch(view.state.tr)
              return false
            }
            return false
          },
        },
        view() {
          return {
            update(view) {
              clearTimeout(debounceTimer)
              debounceTimer = setTimeout(async () => {
                const { from } = view.state.selection
                const text = view.state.doc.textBetween(0, from, ' ')
                if (text.length < 10) { ghostText = ''; ghostPos = null; view.dispatch(view.state.tr); return }
                ghostText = await fetchCompletion(text)
                ghostPos  = from
                view.dispatch(view.state.tr)
              }, 800)
            },
          }
        },
      }),
    ]
  },
})
