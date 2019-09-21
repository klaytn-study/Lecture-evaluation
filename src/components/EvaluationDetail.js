import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'components/Loading'
import ui from 'utils/ui'
import './EvaluationDetail.scss'

import * as evalActions from 'redux/actions/evaluations'

import Data from './data'

class EvaluationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.content,
    }
  }
  componentDidMount() {
    const { content, getEvaluationList, getEvalaution } = this.props
    const num = 5669
    if (!content) getEvaluationList(5669)
    if (!content) getEvalaution(this.props.id, this.props.evalId)
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.content !== prevState.content) && (nextProps.content !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }
    return null
  }

  btnClickEvent = (e) => {
    if (e.target.className.indexOf('good') != -1) {
      // eval.good += 1
    } else if (e.target.className.indexOf('bad') != -1) {
      // eval.bad += 1
    } else {
      console.log('soso')
    }
    $('.Button__exp').attr('disabled', true);
  }
  render() {
    console.log('this.props --> ', this.props)
    console.log('content --> ', this.props)
    if (this.state.isLoading) return <Loading />
    // const { content } = this.props
    return (
      <div className="EvaluationDetai">
        <button className="Button__campus" disabled="true">인문캠퍼스</button>
        <div className="Detail__datail">
          <div className="row">
            <div className="col-10">
              <h2 className="Print__lecture" name="lecname">
                인공지능의 세계
                {/* {content.lecture} */}
              </h2>
              <label className="Print__pofessor" name="proname">
                전종훈 교수님
                {/* {content.professor} */}
              </label>
            </div>
            <div className="col-2 Pirnt__score">
              {/* 별점 {content.score} */}
              별점 4.5
            </div>
          </div>
          <label className="Input__label" htmlFor="eval">
            강의평가
          </label>
          <div className="eval" name="eval">
            {/* {content.content} */}
            강의가 너무 재미없어요..ㅠㅠ
            시험도 진짜 어렵구요
            이전 수업 안들으면 이 수업은 모듣는다고 생각하시면 됩니다...
            성적도 일정 이상 안나오면 다 D예요...!!
          </div>
          <div className="row">
            <button className="col Button__exp good" onClick={this.btnClickEvent}>유용했다!</button>
            <button className="col Button__exp soso" onClick={this.btnClickEvent}>그냥그래~</button>
            <button className="col Button__exp bad" onClick={this.btnClickEvent}>너무 별로야</button>
          </div>
          <label className="Explanation__label1">
            평가를 해주시면 &quot;10 klaytn&quot;을 돌려드려요!
          </label>
          <label className="Explanation__label2">
            한번 선택 하시면 되돌릴 수 없어요
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  content: state.evaluations.evalu,
})

const mapDispatchToProps = (dispatch) => ({
  getEvalaution: (courseId, evaluationId) => dispatch(evalActions.getEvalutaion(courseId, evaluationId)),
  getEvaluationList: (courseId) => dispatch(evalActions.getEvaluationList(courseId)),
  uploadGood: () => dispatch(evalActions.uploadEvaluation()),
  uploadBad: () => dispatch(evalActions.uploadEvaluation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationDetail)

