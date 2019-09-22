import React from 'react'
import ui from 'utils/ui'
import UploadEvaluation from 'components/UploadEvaluation'

import './UploadButton.scss'

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Upload Evaluation',
      content: <UploadEvaluation />,
    })}
  >
    Upload Eval
  </button>
)

export default UploadButton
