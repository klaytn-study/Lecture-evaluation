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
      lname: '',
      pname: '',
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.list !== prevState.list) && (nextProps.list !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }
    return null
  }
  renderList(lectures) {
    return lectures.map((lecture, index) => (
      <li 
        key={index} 
        onClick={(lname, pname, courseId) => {
          this.props.getEvaluationList(lecture.id)
          this.setState({ lectureName: lecture.name, lecturePro: lecture.professor, courseId: lecture.id, lName: lecture.lname, pName: lecture.pname })
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
    //이부분 고쳐야함
    // if (this.props.courseId) {
    //   this.getSearchList(this.props.courseId)
    // }
    //
    return (

        <div className="lectureList__list col-4">
          <ul className="list-group">
            {this.renderList(courses)}
          </ul>
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