import React, { memo , useCallback } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default memo(function mine() {

  const handleEditorChange = (e) => {
    console.log(e.target.getContent())
  }

  return (
    <div>
      <h1>Mine</h1>
      <Editor
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={handleEditorChange}
      />
    </div>
  )
})
