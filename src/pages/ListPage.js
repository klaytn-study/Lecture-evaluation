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
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.courses !== prevState.courses) && (nextProps.courses !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }
    return null
  }
  componentDidMount() {
    const { courses, getCourse } = this.props
    console.log(getCourse())
    if (!courses) getCourse()
  }

  handleTest = (courseId) => {
    this.setState({ courseId: parseInt(courseId, 10) })
  }

  render() {
    const { courses } = this.props
    console.log(this.state.courseId)
    console.log('??', courses)
    if (this.state.isLoading) return <Loading />

    return (
      <div className="listPage__div">
        <SearchBar 
            items={this.props.courses}
            Test={this.handleTest} />
        <UploadButton />
        <LectureList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.course,
})
const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(cousreActions.getCourse()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);