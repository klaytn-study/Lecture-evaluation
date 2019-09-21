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
    this.state = {
      isLoading: !props.courses,
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

  render() {
    const { courses } = this.props
    console.log('??', courses)
    if (this.state.isLoading) return <Loading />

    return (
      <div className="listPage__div">
        <SearchBar items={this.props.courses}/>
        <UploadButton/>
        <div className="row">
          <LectureList />
          <LectureDetail />
        </div>
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