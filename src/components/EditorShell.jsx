import { useEffect, useMemo, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { aiAutocompleteExtension } from '../extensions/aiAutocomplete'
import SidePanel from './SidePanel'

export default function EditorShell() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1800)
    return () => clearTimeout(t)
  }, [])

  const editor = useEditor({
    extensions: [StarterKit, aiAutocompleteExtension],
    autofocus: 'end',
    content: `
      <h1>قلم</h1>
      <p>بسم الله الرحمن الرحیم</p>
      <p>نوشتن را از اینجا آغاز کنید...</p>
    `,
    editorProps: {
      attributes: {
        class: 'qalam-editor',
        dir: 'rtl',
        spellcheck: 'false',
      },
    },
  })

  const stats = useMemo(() => {
    if (!editor) return { words: 0, chars: 0 }
    const text = editor.getText().trim()
    return {
      words: text ? text.split(/\s+/).length : 0,
      chars: text.length,
    }
  }, [editor?.state])

  return (
    <div className="shell" dir="rtl">
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-mark">قلم</div>
          <div className="intro-subtitle">فضایی آرام برای نوشتن</div>
        </div>
      )}

      <button
        className={`panel-handle ${panelOpen ? 'open' : ''}`}
        onClick={() => setPanelOpen(v => !v)}
        aria-label="باز کردن پنل"
      >
        <span>{panelOpen ? '›' : '‹'}</span>
      </button>

      <SidePanel open={panelOpen} editor={editor} stats={stats} />

      <main className="editor-stage">
        <div className="editor-frame">
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  )
}
