import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'utils/ui'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import DropdownBtn from 'components/DropdownBtn'
import InputStar from 'components/InputStar'
import LittleSearchBar from 'components/LittleSearchBar';
import './UploadEvaluation.scss'


import * as cousreActions from 'redux/actions/courses'
import * as evalActions from 'redux/actions/evaluations'

class UploadEvaluation extends Component {
  constructor(props) {
    super(props)
    this.handleTest = this.handleTest.bind(this)
    this.state = {
      score: 0,
      courseId: 0,
      title: '',
      evaluation: '',
    }
  }
  componentDidMount() {
    const { getCourse } = this.props
    getCourse()
  }
  handleTest = (courseId) => {
    this.setState({ courseId: parseInt(courseId, 10) })
  }
  handleInputChange = (e) => {
    if (e.target.name == 'score') {
      this.setState({
        [e.target.name]: parseInt(e.target.value, 10),
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }
  youHave2ChooseOpt = () => {
    console.log(this.state)
    if (this.state.courseId == 0) {
      alert('강의를 선택하세요~!')
      console.log('다 완료되지 안흠!!')
    } else {
      console.log('다 선택함?')
      if (this.state.title.length < 1 || this.state.title.length > 15) {
        alert('강의명이 이상한데..? :( 안썻거나 너무 긴거 같아')
      } else if (this.state.evaluation.length < 1) {
        alert('아무 평가도 안쓴거임??? 코인 받을 자격이 없네;;;')
      } else {
        const { courseId, title, score, evaluation } = this.state
        this.props.uploadEvaluation(courseId, title, score, evaluation)
        // console.log('보내짐!')
        ui.hideModal()
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.youHave2ChooseOpt()
  }
  
  render() {
    const { score, title, evaluation, courseId } = this.state
    return (
      <form className="UploadEvaluation" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-10">
            <LittleSearchBar
              Test={this.handleTest}
              onChange={this.handleChange}
              items={this.props.courses}
            />
          </div>
          <div className="col-2">
            <InputStar
              className="Evaluation__star"
              name="score"
              label="score"
              value={score}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <Input
          className="Evaluation__title Input_mg"
          name="title"
          label="제목"
          value={title}
          onChange={this.handleInputChange}
          placeholder="강의명을 입력하세요"
          required
        />
        <Textarea
          className="Evaluation__evaluation Input_mg"
          name="evaluation"
          value={evaluation}
          label="강의평가"
          onChange={this.handleInputChange}
          placeholder="강의평가를 작성해주세요."
          required
        />
        <Button
          className="Evaluation__upload"
          type="submit"
          title="Upload"
        />
      </form>
    )
  }
}


const mapStateToProps = (state) => ({
  courses: state.courses.course,
})
const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(cousreActions.getCourse()),
  uploadEvaluation: (courseId, title, score, evaluation) => 
  dispatch(evalActions.uploadEvaluation(courseId, title, score, evaluation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadEvaluation)
