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
    }
  }

  // static getDerivedStateFromProps = (nextProps, prevState) => {
  //   const isUpdatedCourse = (nextProps.courses !== prevState.courses) && (nextProps.courses !== null)
  //   if (isUpdatedCourse) {
  //     return { isLoading: false }
  //   }
  //   return null
  // }
  // componentDidMount() {
  //   const { courses, getCourse } = this.props
  //   console.log(getCourse())
  //   if (!courses) getCourse()
  // }

  renderList(lectures) {
    const { list } = this.props
    return lectures.map((lecture, index) => (
      <li 
        key={index} 
        onClick={(e) => {
          this.props.getEvaluationList(lecture.id)
          console.log(lecture.id)
          console.log(list)
        }}
        // onClick={this}
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
    return (
      <div className="row">
        <div className="lectureList__list col-4">
          <ul className="list-group">
            {this.renderList(courses)}
          </ul>
        </div>
        <LectureDetail
          className="col-8"
          listItems={list}
        />
      </div>
    );
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

