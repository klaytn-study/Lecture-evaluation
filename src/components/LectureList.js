import React, { Component } from 'react';
import Loading from 'components/Loading'
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
// import { getCourse } from '../redux/actions/courses'
import { bindActionCreators } from 'redux';
import * as cousreActions from 'redux/actions/courses'
import { getEvaluationList } from "../redux/actions/evaluations";
import LectureDetail from 'components/LectureDetail';

import './LectureList.scss';


class LectureList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.courses,
      lectureName: "",
      lecturePro: "",
      courseId: "",
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.list !== prevState.list) && (nextProps.list !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }
    return null
  }
  getSearchList = (id) => {
    this.props.getEvaluationList(id)
  }
  renderList(lectures) {
    return lectures.map((lecture, index) => (
      <li 
        key={index} 
        onClick={(e) => {
          this.props.getEvaluationList(lecture.id)
          this.setState({ lectureName: lecture.name, lecturePro: lecture.professor, courseId: lecture.id })
        }}
        className='list-group-item'
      >
        { lecture.campus }<br></br>
        { lecture.name } &nbsp; 
        { lecture.professor }
      </li>
    ));
  }

  render() {
    const { courses, list } = this.props
    console.log(list)
    if (this.state.isLoading) return <Loading />
    if (this.props.courseId) {
      this.getSearchList(this.props.courseId)
    }
    return (
      <div className="row">
        <div className="lectureList__list col-4">
          <ul className="list-group">
            {this.renderList(courses)}
          </ul>
        </div>
        <LectureDetail
          className="col-8"
          lectureName={this.state.lectureName}
          lecturePro={this.state.lecturePro}
          courseId={this.state.courseId}
          listItems={list}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.course,
  list: state.evaluations.evalu,
})
const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(cousreActions.getCourse()),
  getEvaluationList: (courseId) => dispatch(getEvaluationList(courseId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LectureList);

