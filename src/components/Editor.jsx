import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import { aiAutocompleteExtension } from '../extensions/aiAutocomplete'
import '../styles/editor.css'

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      aiAutocompleteExtension,
    ],
    content: '<p>بسم الله الرحمن الرحيم — start writing here...</p>',
  })

  return (
    <div className="editor-wrapper">
      <MenuBar editor={editor} />
      <div className="editor-container">
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  )
}
