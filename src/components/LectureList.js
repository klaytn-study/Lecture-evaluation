import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import './LectureList.scss';

class LectureList extends Component {

  renderList(lectures) {
    return lectures.map((lecture, index) => (
      <li 
        key={index} 
        onClick={(e) => {
          this.props.selectLecture(lecture)
        }}
        // onClick={this}
        className='list-group-item'
      >
        { lecture.campus }<br></br>
        { lecture.title } &nbsp; 
        { lecture.professor }
      </li>
    ));
  }

  render() {
    // if (!this.props.lectures) {
    //   return <div> No lectures </div>;
    // }
    return (
      <div className="lectureList__list col-3">
        <ul className='list-group'>
          {this.renderList(this.props.lectures)}      
        </ul>
      </div>
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

