import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'utils/ui'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import DropdownBtn from 'components/DropdownBtn'
import InputStar from 'components/InputStar'

import * as photoActions from 'redux/actions/photos'
import * as evalActions from 'redux/actions/evaluations'
import Data from './data'

class UploadEvaluation extends Component {
  state = {
    score: 0,
    campus: '',
    university: '',
    major: '',
    lectureName: '',
    professorName: '',
    evaluation: '',
    univList: [],
    majorList: [],
  }
  onChange = (e) => {
    if (e.target.value == 1) {
      alert('다른 것을 선택해주세요!!')
    } else if (e.target.value < 10) {
      this.setState({
        [e.target.name]: e.target.value,
        univList: Data.list__univ.filter((item) => item.campVal == e.target.value || item.campVal == 1),
        majorList: Data.list__major.filter((item) => item.univVal == 1),
      })
    } else if (e.target.value < 100) {
      this.setState({
        [e.target.name]: e.target.value,
        majorList: Data.list__major.filter((item) => item.univVal == e.target.value || item.univVal == 1),
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }
  youHave2ChooseOpt = () => {
    console.log(this.state)
    if (this.state.campus <= 1 || this.state.major <= 1 || this.state.university <= 1) {
      alert('선택을 완료해라~!')
      console.log('다 완료되지 안흠!!')
    } else {
      console.log('다 선택함?')
      if (this.state.lectureName.length < 1 || this.state.lectureName.length > 15) {
        alert('강의명이 이상한데..? :( 안썻거나 너무 긴거 같아')
      } else if (this.state.professorName.length < 1 || this.state.professorName.length > 4) {
        alert('교수명이 뭔가 이상한데..? :(')
      } else if (this.state.evaluation.length < 1) {
        alert('아무 평가도 안쓴거임??? 코인 받을 자격이 없네;;;')
      } else {
        // const {  } = this.state
        // this.props.uploadEvaluation()
        ui.hideModal()
      }
    }
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.youHave2ChooseOpt()
  }
  

  render() {
    const { campus, score, university, major, lectureName, professorName, evaluation, univList, majorList } = this.state
    return (
      <form className="UploadEvaluation" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-3">
            <DropdownBtn
              className="Evaluation__campus"
              name="campus"
              label="campus"
              value={campus}
              item={Data.list__campus}
              onChange={this.onChange}
            />
          </div>
          <div className="col-3">
            <DropdownBtn
              className="Evaluation__university"
              name="university"
              label="university"
              value={university}
              item={univList}
              onChange={this.onChange}
            />
          </div>
          <div className="col-3">
            <DropdownBtn
              className="Evaluation__major"
              name="major"
              label="major"
              value={major}
              item={majorList}
              onChange={this.onChange}
            />
          </div>
          <div className="col-3">
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
          className="Evaluation__lectureName"
          name="lectureName"
          label="강의명"
          value={lectureName}
          onChange={this.handleInputChange}
          placeholder="강의명을 입력하세요"
          required
        />
        <Input
          className="Evaluation__professorName"
          name="professorName"
          label="교수명"
          value={professorName}
          onChange={this.handleInputChange}
          placeholder="교수명을 입력하세요"
          required
        />
        <Textarea
          className="Evaluation__evaluation"
          name="evaluation"
          value={evaluation}
          label="강의평가"
          onChange={this.handleInputChange}
          placeholder="강의평가를 작성해주세요. 보다 자세히 적을 수록 많은 사람들의 코인을 "
          required
        />
        <Button
          className="Evaluation__upload"
          type="submit"
          title="Upload"
          // disabled="true"
        />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (file, fileName, location, caption) =>
    dispatch(photoActions.uploadPhoto(file, fileName, location, caption)),
  uploadEvaluation: () => dispatch(evalActions.uploadEvaluation()),
})

export default connect(null, mapDispatchToProps)(UploadEvaluation)
