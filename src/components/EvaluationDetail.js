import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'components/Loading'
import ui from 'utils/ui'
import './EvaluationDetail.scss'

import * as evalActions from 'redux/actions/evaluations'


class EvaluationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.content,
      cosid:0,
    }
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.content !== prevState.content) && (nextProps.content !== null)
    // const isUpdatedContent = (nextProps.evalId !== prevState.evalId) && (nextProps.evalId !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    } 
    // else if (!isUpdatedContent) {
    //   getEvaluation(parseInt(this.props.id, 10), parseInt(this.props.evalId, 10))
    //   return { isLoading: false }
    // }
    return null
  }
  componentDidMount() {
    const { content, getEvaluation } = this.props
    getEvaluation(parseInt(this.props.id, 10), parseInt(this.props.evalId, 10))

    // if (!content) getEvaluation(parseInt(this.props.id, 10), parseInt(this.props.evalId, 10))
  }
  btnClickEvent = (e) => {
    if (e.target.className.indexOf('good') != -1) {
      console.log('good')
      console.log('lec : ' + this.props.id + ' eval : ' + this.props.evalId)
      this.props.uploadGood(this.props.id, this.props.evalId);
    } else {
      console.log('bad')
      this.props.uploadBad(this.props.id, this.props.evalId);
    } 
    $('.Button__exp').attr('disabled', true);
  }
  render() {
    const { content, lecName, professor } = this.props
    console.log("cousreID ", parseInt(this.props.id, 10));
    console.log("evaluationID ", parseInt(this.props.evalId, 10));
    // getEvaluation(parseInt(this.props.id, 10), parseInt(this.props.evalId, 10))

    if (this.state.isLoading) return <Loading />
    // const { content } = this.props
    return (
      <div className="EvaluationDetai">
        <button className="Button__campus" disabled="true">인문캠퍼스</button>
        <div className="Detail__datail">
          <div className="row">
            <div className="col-10">
              <h2 className="Print__lecture" name="lecname">
                {lecName}
              </h2>
              <label className="Print__pofessor" name="proname">
                {professor}
              </label>
            </div>
            <div className="col-2 Pirnt__score">
              별점 : {content.score}
            </div>
          </div>
          <label className="Input__label" htmlFor="title">
            제목
          </label>
          <div className="title" name="title">
            {content.title}
          </div>
          <label className="Input__label" htmlFor="eval">
            강의평가
          </label>
          <div className="eval" name="eval">
            {content.content}
          </div>
          <div className="row">
            <button className="col Button__exp good" onClick={this.btnClickEvent}>유용했다!</button>
            {/* <button className="col Button__exp soso" onClick={this.btnClickEvent}>그냥그래~</button> */}
            <button className="col Button__exp bad" onClick={this.btnClickEvent}>너무 별로야</button>
          </div>
          <label className="Explanation__label1">
            평가를 해주시면 &quot;0.5 klay&quot;을 돌려드려요!
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
  content: state.evaluations.evaluD,
})

const mapDispatchToProps = (dispatch) => ({
  getEvaluation: (courseId, evaluationId) => dispatch(evalActions.getEvaluation(courseId, evaluationId)),
  // getEvaluationList: (courseId) => dispatch(evalActions.getEvaluationList(courseId)),
  uploadGood: (courseId, evaluationId) => dispatch(evalActions.uploadGood(courseId, evaluationId)),
  uploadBad: (courseId, evaluationId) => dispatch(evalActions.uploadBad(courseId, evaluationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationDetail)

