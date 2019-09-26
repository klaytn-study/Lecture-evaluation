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
      courseId: '',
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

  handleTest(lname, pname, courseId) {
    this.props.Test(lname, pname, courseId)
  }
  renderList(lectures) {
    return lectures.map((lecture, index) => (
      <li
        tabIndex="1" 
        key={index} 
        onClick={() => {
          this.props.getEvaluationList(lecture.id)
          this.handleTest(lecture.name, lecture.professor, lecture.id)
          // this.setState({ lectureName: lecture.name, lecturePro: lecture.professor, courseId: lecture.id, lName: lecture.lname, pName: lecture.pname })
        }}
        className='list-group-item'
      >
        <p className="campus" style={{color: 'gray', fontSize: '10px', }}>{ lecture.campus }</p>
        <p>{ lecture.name } - { lecture.professor }</p>
      </li>
    ));
  }

  render() {
    const { courses, list } = this.props
    console.log(list)
    if (this.state.isLoading) return <Loading />
    return (
        <div 
          className="lectureList__list col-4">
          <ul 
            className="list-group">
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