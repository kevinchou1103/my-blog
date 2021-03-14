import React, { memo , useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from 'antd'

import './index.scss'

export default memo(function Mine(props) {
  const editorDom = useRef()

  const handleSubmit = (e) => {
    console.log(editorDom.current.editor.getContent())
  }
  const resetArticle = () => {
    editorDom.current.editor.setContent('')
  }
  return (
    <div className="Article">
      <div className="container">
        <h1>发表文章：</h1>
        <Editor
          ref={editorDom}
          initialValue=""
          apiKey="1jlkml2y8yh1td0wsoxi1dve9cde3dt473vg2xy1v5k15p1x"
          init={{
            height: 500,
            menubar: false,
            language:'zh_CN',
            plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave formatpainter',
            toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
            fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
            // images_upload_handler: (blobInfo, success, failure)=>{
            //   if (blobInfo.blob()) {
            //     const formData = new window.FormData();
            //     formData.append('myFile', blobInfo.blob(), blobInfo.filename())
            //     // axios.post(``,formData).then((res) => {
            //     //   if(res.data){
            //     //     // 将图片插入到编辑器中
            //     //     success(res.data.data[0])
            //     //   }
            //     // }).catch((error) => {
            //     //   alert(error);
            //     // })
            //   } else {
            //     alert('error');
            //   }
            // }
          }}
          // onChange={e => setData(e.target.getContent())}
        />
        <div className="btn-box">
          <Button size="large" type="primary" onClick={handleSubmit}>提交</Button>
          <Button size="large" onClick={resetArticle}>重置</Button>
        </div>
      </div>
    </div>
  )
})
