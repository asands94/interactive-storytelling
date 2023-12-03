import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function TinyMCE() {
  const editorRef = useRef(null)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_APP_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=''
        init={{
          resize: false,
          menubar: 'file edit view',
          plugins: [
            'autosave',
            'advlist',
            'lists',
            'link',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'fullscreen',
            'wordcount',
          ],
          toolbar:
            'restoredraft undo redo | blocks | | hr blockquote | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | indent outdent | removeformat',
        }}
      />
      <button onClick={log}>Submit</button>
    </>
  )
}