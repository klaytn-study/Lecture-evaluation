import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import '../pages/LectureListPage.scss';

class LectureList extends Component {
  renderList(lectures) {
    return lectures.map(lecture => (
      <li 
        key={lecture.campus, lecture.title, lecture.professor} 
        onClick={() => this.props.selectLecture(lecture)}
        className='list-group-item'
      >
        { lecture.campus }<br></br>
        { lecture.title } &nbsp; 
        { lecture.professor }
      </li>
    ));
  }

  render() {
    if (!this.props.lectures) {
      return <div> No lectures </div>;
    }
    return (
      <ul className='list-group col-sm-4'>
        {this.renderList(this.props.lectures)}      

      </ul>
    );
  }
}

function mapStateToProps({lectures}) {
  return {
    lectures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectLecture}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LectureList);

