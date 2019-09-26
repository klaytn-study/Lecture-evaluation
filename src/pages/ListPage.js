import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import Loading from 'components/Loading'
import SearchBar from 'components/SearchBar';
import UploadButton from 'components/UploadButton';
import LectureList from 'components/LectureList';
import LectureDetail from 'components/LectureDetail';

import './ListPage.scss';
import * as cousreActions from 'redux/actions/courses'


class ListPage extends Component {
  constructor(props) {
    super(props)
    this.handleTest = this.handleTest.bind(this)
    this.state = {
      isLoading: !props.courses,
      courseId: 0,
      lname: '',
      pname: '',

    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.courses !== prevState.courses) && (nextProps.courses !== null)
    const isUpdatedCour = (nextProps.list !== prevState.list) && (nextProps.list !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }else if (isUpdatedCour) {
      return { isLoading: false }
    }
    return null
  }
  componentDidMount() {
    console.log('tlqkf')
    const { courses, getCourse, list, getEvaluationList } = this.props
    if (!courses) getCourse()
    console.log(this.state.courseId)
    if (this.state.courseId != 0) 
      getEvaluationList(this.state.courseId)
  }

  handleTest = (lname, pname, courseId) => {
    this.setState({ 
      lname: lname,
      courseId: parseInt(courseId, 10),
      pname: pname,
    })
  }

  render() {
    const { courses, list } = this.props
    console.log(this.state.lname)
    console.log(this.state.pname)
    console.log(this.state.courseId)
    console.log('??', courses)
    console.log('didmount', list)
    
    if (this.state.isLoading) return <Loading />

    return (
      <div className="listPage__div">
        <SearchBar 
            items={this.props.courses}
            Test={this.handleTest} />
        <UploadButton />
        <div className="row">
          <LectureList
            courseId={this.state.courseId}
          />
          <LectureDetail
            className="col-8"
            lecturePro={this.state.pname}
            courseId={this.state.courseId}
            listItems={list}
        />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);