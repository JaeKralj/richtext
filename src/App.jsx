// we have used react-draft-wysiwyg because it's just nicer to work with compared to default draft.js Editor, we have used draft.js because it is our main rich text editor, we have added draft convert to convert the text to html, dompurify to ensure we have the right format of data

import DOMPurify from 'dompurify'
import { convertToHTML } from 'draft-convert'
import { EditorState } from 'draft-js'
import { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './App.css'

// purify converted text.
function purifyContent(html) {
  return {
    __html: DOMPurify.sanitize(html),
  }
}

function App() {
  // editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  // converted text
  const [convertedContent, setConvertedContent] = useState(null)

  // convert to html
  useEffect(() => {
    const html = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'IMAGE') {
          return <img src={entity.data.src} />
        }
        return originalText
      },
    })(editorState.getCurrentContent())

    setConvertedContent(html)
  }, [editorState])

  return (
    <div className='App'>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName='editorwrapper'
        toolbarClassName='toolbar'
        editorClassName='editor'
        toolbar={{
          className: 'toolbar-options',
        }}
        placeholder='Write Something interesting!'
      />

      <div
        dangerouslySetInnerHTML={purifyContent(convertedContent)}
        className='preview'
      />
    </div>
  )
}

export default App
