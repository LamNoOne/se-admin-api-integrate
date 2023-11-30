import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

import React from "react"

const Description = ({ description, setDescription }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={description || ""}
            onChange={(event, editor) => {
                const data = editor.getData()
                // console.log({ event, editor, data })
                setDescription(data)
            }}
        />
    )
}

export default Description
