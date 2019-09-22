import React from 'react'
import ui from 'utils/ui'
import UploadEvaluation from 'components/UploadEvaluation'

import './UploadButton.scss'
import EvaluationDetail from './EvaluationDetail'

const UploadButton = () => (
  <button
    className="UploadButton"
    // onClick={() => ui.showModal({
    //   header: 'Upload Evaluation',
    //   content: <UploadEvaluation />,
    // })}
    onClick={() => ui.showModal({
      header: 'EvaluationDetail',
      content: <EvaluationDetail
        id="5778"
        evalId="1"
      />,
    })}
  >
    Upload Eval
  </button>
)

export default UploadButton
