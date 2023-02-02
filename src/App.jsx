// using quill and react quill
import katex from 'katex'
import 'katex/dist/katex.min.css'
import ImageUploader from 'quill-image-uploader'
import { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './App.css'
// katex required for formulas
window.katex = katex

// register imageuploader module
Quill.register('modules/imageUploader', ImageUploader)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      ['link', 'image', 'formula'],
      [{ header: [1, 2, 3, 4, 5, , 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }, 'code'], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          formData.append('image', file)

          fetch(
            `https://api.imgbb.com/1/upload?key=c3c22220aeb8c2456ff52b1d8fee0604`,
            {
              method: 'POST',
              body: formData,
            }
          )
            .then(response => response.json())
            .then(result => {
              console.log(result)
              resolve(result.data.url)
            })
            .catch(error => {
              reject('Upload failed')
              console.error('Error:', error)
            })
        })
      },
    },
  }
  render() {
    return (
      <div>
        <ReactQuill
          theme='snow'
          placeholder='write something Warisi'
          modules={this.modules}
          value={this.state.text}
        />
      </div>
    )
  }
}

// // we have used react-draft-wysiwyg because it's just nicer to work with compared to default draft.js Editor, we have used draft.js because it is our main rich text editor, we have added draft convert to convert the text to html, dompurify to ensure we have the right format of data

// import DOMPurify from 'dompurify'
// import { convertToHTML } from 'draft-convert'
// import { EditorState } from 'draft-js'
// import { useEffect, useState } from 'react'
// import { Editor } from 'react-draft-wysiwyg'

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import './App.css'

// // purify converted text.
// function purifyContent(html) {
//   return {
//     __html: DOMPurify.sanitize(html),
//   }
// }

// function App() {
//   // editor state
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   )

//   // converted text
//   const [convertedContent, setConvertedContent] = useState(null)

//   // convert to html
//   useEffect(() => {
//     const html = convertToHTML({
//       entityToHTML: (entity, originalText) => {
//         if (entity.type === 'IMAGE') {
//           return <img src={entity.data.src} />
//         }
//         return originalText
//       },
//     })(editorState.getCurrentContent())

//     setConvertedContent(html)
//   }, [editorState])

//   return (
//     <div className='App'>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={setEditorState}
//         wrapperClassName='editorwrapper'
//         toolbarClassName='toolbar'
//         editorClassName='editor'
//         toolbar={{
//           className: 'toolbar-options',
//         }}
//         placeholder='Write Something interesting!'
//       />

//       <div
//         dangerouslySetInnerHTML={purifyContent(convertedContent)}
//         className='preview'
//       />
//     </div>
//   )
// }

// export default App
